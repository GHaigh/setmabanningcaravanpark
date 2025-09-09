import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Generate a unique booking number
function generateBookingNumber(): string {
  const prefix = 'SCP'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${timestamp}-${random}`
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate booking number
    const bookingNumber = generateBookingNumber()
    
    // Calculate pricing
    const calculatePrice = (accommodationType: string, arrivalDate: string, departureDate: string) => {
      const arrival = new Date(arrivalDate)
      const departure = new Date(departureDate)
      const nights = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24))
      
      const basePrices = {
        'tent-pitches': 25,
        'campervan-spots': 35,
        'holiday-homes': 120,
      }
      
      const basePrice = basePrices[accommodationType as keyof typeof basePrices] || 0
      return basePrice * nights
    }

    const totalPrice = calculatePrice(body.accommodationType, body.arrivalDate, body.departureDate)
    const arrival = new Date(body.arrivalDate)
    const departure = new Date(body.departureDate)
    const nights = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24))

    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Booking Enquiry Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .booking-number { background: #059669; color: white; padding: 15px; text-align: center; border-radius: 8px; font-size: 24px; font-weight: bold; margin: 20px 0; }
            .price { color: #059669; font-size: 24px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Enquiry Received!</h1>
              <p>Setmabanning Caravan Park</p>
            </div>
            <div class="content">
              <p>Dear ${body.name},</p>
              <p>Thank you for your booking enquiry! We've received your request and will review it within 24 hours.</p>
              
              <div class="booking-number">
                Booking Reference: ${bookingNumber}
              </div>
              
              <div class="booking-details">
                <h3>Booking Details</h3>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Phone:</strong> ${body.phone}</p>
                <p><strong>Arrival:</strong> ${arrival.toLocaleDateString('en-GB')}</p>
                <p><strong>Departure:</strong> ${departure.toLocaleDateString('en-GB')}</p>
                <p><strong>Nights:</strong> ${nights}</p>
                <p><strong>Guests:</strong> ${body.guests}</p>
                <p><strong>Accommodation:</strong> ${body.accommodationType.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</p>
                ${body.specialRequests ? `<p><strong>Special Requests:</strong> ${body.specialRequests}</p>` : ''}
                <p><strong>Estimated Total:</strong> <span class="price">£${totalPrice}</span></p>
              </div>
              
              <p>Once we confirm availability, you'll receive a payment link to secure your booking.</p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/payment?booking=${bookingNumber}" class="button">
                  View Payment Page
                </a>
              </div>
              
              <p>If you have any questions, please don't hesitate to contact us:</p>
              <p>Phone: +44 17687 12345<br>
              Email: bookings@setmabanningcaravanpark.co.uk</p>
              
              <div class="footer">
                <p>Best regards,<br>The Setmabanning Caravan Park Team</p>
                <p>This is an automated email. Please keep this booking reference safe.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.BOOKINGS_EMAIL || 'bookings@setmabanningcaravanpark.co.uk',
      to: body.email,
      subject: `Booking Enquiry Confirmation - ${bookingNumber}`,
      html: emailHtml,
    })

    // Send notification email to park
    await transporter.sendMail({
      from: process.env.BOOKINGS_EMAIL || 'bookings@setmabanningcaravanpark.co.uk',
      to: process.env.BOOKINGS_EMAIL || 'bookings@setmabanningcaravanpark.co.uk',
      subject: `New Booking Enquiry - ${bookingNumber}`,
      html: `
        <h2>New Booking Enquiry</h2>
        <p><strong>Booking Reference:</strong> ${bookingNumber}</p>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Dates:</strong> ${arrival.toLocaleDateString('en-GB')} - ${departure.toLocaleDateString('en-GB')}</p>
        <p><strong>Guests:</strong> ${body.guests}</p>
        <p><strong>Accommodation:</strong> ${body.accommodationType}</p>
        <p><strong>Estimated Total:</strong> £${totalPrice}</p>
        ${body.specialRequests ? `<p><strong>Special Requests:</strong> ${body.specialRequests}</p>` : ''}
      `,
    })

    return NextResponse.json({
      success: true,
      bookingNumber,
      message: 'Booking enquiry sent successfully'
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process booking enquiry' },
      { status: 500 }
    )
  }
}

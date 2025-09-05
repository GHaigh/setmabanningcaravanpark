import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  arrivalDate: z.string(),
  departureDate: z.string(),
  guests: z.string(),
  accommodationType: z.string(),
  specialRequests: z.string().optional(),
  gdprConsent: z.boolean(),
  honeypot: z.string().optional(),
  totalPrice: z.number(),
  nights: z.number(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = enquirySchema.parse(body)
    
    // Check honeypot (anti-spam)
    if (validatedData.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 })
    }
    
    // Check GDPR consent
    if (!validatedData.gdprConsent) {
      return NextResponse.json(
        { error: 'GDPR consent is required' },
        { status: 400 }
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530; border-bottom: 2px solid #2c5530; padding-bottom: 10px;">
          New Booking Enquiry - Setmabanning Caravan Park
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Booking Details</h3>
          <p><strong>Arrival Date:</strong> ${new Date(validatedData.arrivalDate).toLocaleDateString('en-GB')}</p>
          <p><strong>Departure Date:</strong> ${new Date(validatedData.departureDate).toLocaleDateString('en-GB')}</p>
          <p><strong>Nights:</strong> ${validatedData.nights}</p>
          <p><strong>Guests:</strong> ${validatedData.guests}</p>
          <p><strong>Accommodation Type:</strong> ${validatedData.accommodationType}</p>
          <p><strong>Estimated Total:</strong> £${validatedData.totalPrice}</p>
        </div>
        
        ${validatedData.specialRequests ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Special Requests</h3>
          <p>${validatedData.specialRequests}</p>
        </div>
        ` : ''}
        
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #2c5530;"><strong>Next Steps:</strong></p>
          <ul style="margin: 10px 0 0 20px; color: #2c5530;">
            <li>Check availability for the requested dates</li>
            <li>Confirm pricing and any special requirements</li>
            <li>Send confirmation email to the customer</li>
            <li>Process booking if confirmed</li>
          </ul>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          This enquiry was submitted through the Setmabanning Caravan Park website.
        </p>
      </div>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.BOOKINGS_EMAIL,
      subject: `New Booking Enquiry from ${validatedData.name} - ${validatedData.arrivalDate}`,
      html: emailHtml,
    })

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530; text-align: center;">Thank You for Your Enquiry!</h2>
        
        <p>Dear ${validatedData.name},</p>
        
        <p>Thank you for your interest in staying at Setmabanning Caravan Park. We've received your enquiry and will get back to you within 24 hours with availability and pricing details.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Your Enquiry Summary</h3>
          <p><strong>Arrival:</strong> ${new Date(validatedData.arrivalDate).toLocaleDateString('en-GB')}</p>
          <p><strong>Departure:</strong> ${new Date(validatedData.departureDate).toLocaleDateString('en-GB')}</p>
          <p><strong>Guests:</strong> ${validatedData.guests}</p>
          <p><strong>Accommodation:</strong> ${validatedData.accommodationType}</p>
        </div>
        
        <p>In the meantime, feel free to explore our website or contact us directly if you have any questions:</p>
        <ul>
          <li>Phone: ${process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost') ? '+44 1768 779229' : '+44 1768 779229'}</li>
          <li>Email: bookings@setmabanningcaravanpark.co.uk</li>
        </ul>
        
        <p>We look forward to welcoming you to the beautiful Lake District!</p>
        
        <p>Best regards,<br>
        The Setmabanning Caravan Park Team</p>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: validatedData.email,
      subject: 'Booking Enquiry Confirmation - Setmabanning Caravan Park',
      html: customerEmailHtml,
    })

    // Optional: Send to webhook/CRM
    if (process.env.ENQUIRY_WEBHOOK_URL) {
      try {
        await fetch(process.env.ENQUIRY_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'booking_enquiry',
            data: validatedData,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error('Webhook error:', error)
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Enquiry error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to send enquiry' },
      { status: 500 }
    )
  }
}

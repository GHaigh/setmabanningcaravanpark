"use strict";(()=>{var e={};e.id=324,e.ids=[324],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},2361:e=>{e.exports=require("events")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},1808:e=>{e.exports=require("net")},2037:e=>{e.exports=require("os")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},4404:e=>{e.exports=require("tls")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},9369:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>m,originalPathname:()=>b,patchFetch:()=>k,requestAsyncStorage:()=>u,routeModule:()=>c,serverHooks:()=>d,staticGenerationAsyncStorage:()=>l,staticGenerationBailout:()=>h});var r={};o.r(r),o.d(r,{POST:()=>g});var a=o(5419),n=o(9108),s=o(9678),i=o(8070);let p=o(8140).createTransport({host:process.env.SMTP_HOST||"smtp.ethereal.email",port:parseInt(process.env.SMTP_PORT||"587"),secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});async function g(e){try{let t=await e.json(),o=function(){let e=Date.now().toString().slice(-6),t=Math.floor(1e3*Math.random()).toString().padStart(3,"0");return`SCP-${e}-${t}`}(),r=((e,t,o)=>{let r=new Date(t),a=new Date(o),n=Math.ceil((a.getTime()-r.getTime())/864e5);return(({"tent-pitches":25,"campervan-pitches":35,"holiday-homes":120})[e]||0)*n})(t.accommodationType,t.arrivalDate,t.departureDate),a=new Date(t.arrivalDate),n=new Date(t.departureDate),s=Math.ceil((n.getTime()-a.getTime())/864e5),g=`
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
              <p>Dear ${t.name},</p>
              <p>Thank you for your booking enquiry! We've received your request and will review it within 24 hours.</p>
              
              <div class="booking-number">
                Booking Reference: ${o}
              </div>
              
              <div class="booking-details">
                <h3>Booking Details</h3>
                <p><strong>Name:</strong> ${t.name}</p>
                <p><strong>Email:</strong> ${t.email}</p>
                <p><strong>Phone:</strong> ${t.phone}</p>
                <p><strong>Arrival:</strong> ${a.toLocaleDateString("en-GB")}</p>
                <p><strong>Departure:</strong> ${n.toLocaleDateString("en-GB")}</p>
                <p><strong>Nights:</strong> ${s}</p>
                <p><strong>Guests:</strong> ${t.guests}</p>
                <p><strong>Accommodation:</strong> ${t.accommodationType.replace("-"," ").replace(/\b\w/g,e=>e.toUpperCase())}</p>
                ${t.specialRequests?`<p><strong>Special Requests:</strong> ${t.specialRequests}</p>`:""}
                <p><strong>Estimated Total:</strong> <span class="price">\xa3${r}</span></p>
              </div>
              
              <p>Once we confirm availability, you'll receive a payment link to secure your booking.</p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/payment?booking=${o}" class="button">
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
    `;await p.sendMail({from:process.env.BOOKINGS_EMAIL||"bookings@setmabanningcaravanpark.co.uk",to:t.email,subject:`Booking Enquiry Confirmation - ${o}`,html:g}),await p.sendMail({from:process.env.BOOKINGS_EMAIL||"bookings@setmabanningcaravanpark.co.uk",to:process.env.BOOKINGS_EMAIL||"bookings@setmabanningcaravanpark.co.uk",subject:`New Booking Enquiry - ${o}`,html:`
        <h2>New Booking Enquiry</h2>
        <p><strong>Booking Reference:</strong> ${o}</p>
        <p><strong>Name:</strong> ${t.name}</p>
        <p><strong>Email:</strong> ${t.email}</p>
        <p><strong>Phone:</strong> ${t.phone}</p>
        <p><strong>Dates:</strong> ${a.toLocaleDateString("en-GB")} - ${n.toLocaleDateString("en-GB")}</p>
        <p><strong>Guests:</strong> ${t.guests}</p>
        <p><strong>Accommodation:</strong> ${t.accommodationType}</p>
        <p><strong>Estimated Total:</strong> \xa3${r}</p>
        ${t.specialRequests?`<p><strong>Special Requests:</strong> ${t.specialRequests}</p>`:""}
      `});let c={id:o,name:t.name,email:t.email,phone:t.phone,accommodationType:t.accommodationType,arrivalDate:t.arrivalDate,departureDate:t.departureDate,guests:t.guests,specialRequests:t.specialRequests,status:"pending",totalPrice:r,createdAt:new Date().toISOString()};return console.log("New booking created:",c),i.Z.json({success:!0,bookingNumber:o,message:"Booking enquiry sent successfully"})}catch(e){return console.error("Booking error:",e),i.Z.json({success:!1,message:"Failed to process booking enquiry"},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/booking/route",pathname:"/api/booking",filename:"route",bundlePath:"app/api/booking/route"},resolvedPagePath:"/Users/greghaigh/Desktop/setmabanningcaravanpark/nextjs/app/api/booking/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:u,staticGenerationAsyncStorage:l,serverHooks:d,headerHooks:m,staticGenerationBailout:h}=c,b="/api/booking/route";function k(){return(0,s.patchFetch)({serverHooks:d,staticGenerationAsyncStorage:l})}}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[638,206,140],()=>o(9369));module.exports=r})();
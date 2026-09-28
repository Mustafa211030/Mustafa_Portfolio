const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST   || 'smtp.gmail.com',
  port:   parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

const NOTIFY_EMAIL = 'cmustafasaeed665@gmail.com'

const base  = 'font-family:"Segoe UI",Arial,sans-serif;max-width:600px;margin:0 auto;'
const head  = 'background:linear-gradient(135deg,#1e3a5f,#2563EB);padding:32px 40px;color:#fff;border-radius:12px 12px 0 0;'
const body  = 'background:#fff;padding:32px 40px;'
const foot  = 'background:#f3f4f6;padding:16px 40px;text-align:center;font-size:12px;color:#9ca3af;border-radius:0 0 12px 12px;'
const badge = 'display:inline-block;background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;margin-bottom:12px;'
const row   = 'padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;'
const lbl   = 'font-weight:600;color:#374151;display:inline-block;width:100px;'
const val   = 'color:#6b7280;'

async function sendBookingNotification({ name, email, date, time, topic, notes }) {
  return transporter.sendMail({
    from:    process.env.EMAIL_FROM || `"Mustafa Saeed Portfolio" <${process.env.EMAIL_USER}>`,
    to:      NOTIFY_EMAIL,
    subject: `📅 New Booking: ${date} at ${time} — ${name}`,
    html: `<div style="${base}">
  <div style="${head}">
    <div style="${badge}">NEW BOOKING</div>
    <h2 style="margin:0;font-size:22px;font-weight:700;">New Call Scheduled</h2>
    <p style="margin:6px 0 0;opacity:.8;font-size:14px;">Someone booked a 30-min consultation</p>
  </div>
  <div style="${body}">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="${row}"><span style="${lbl}">Name</span><span style="${val}">${name}</span></td></tr>
      <tr><td style="${row}"><span style="${lbl}">Email</span><span style="${val}"><a href="mailto:${email}" style="color:#2563EB;">${email}</a></span></td></tr>
      <tr><td style="${row}"><span style="${lbl}">Date</span><span style="${val}">${date}</span></td></tr>
      <tr><td style="${row}"><span style="${lbl}">Time</span><span style="${val}">${time} PKT (Asia/Karachi)</span></td></tr>
      <tr><td style="${row}"><span style="${lbl}">Topic</span><span style="${val}">${topic}</span></td></tr>
      ${notes ? `<tr><td style="${row}"><span style="${lbl}">Notes</span><span style="${val}">${notes}</span></td></tr>` : ''}
    </table>
    <div style="margin-top:20px;padding:16px 20px;background:#eff6ff;border-radius:10px;border-left:4px solid #2563EB;">
      <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">Action Required</p>
      <p style="margin:4px 0 0;font-size:13px;color:#374151;">Add a Google Meet link and reply to confirm. The client is waiting!</p>
    </div>
  </div>
  <div style="${foot}">Received at ${new Date().toLocaleString('en-PK',{timeZone:'Asia/Karachi'})} PKT · mustafasaeed.dev</div>
</div>`,
  })
}

async function sendBookingConfirmation({ name, email, date, time, topic }) {
  return transporter.sendMail({
    from:    process.env.EMAIL_FROM || `"Mustafa Saeed" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `✅ Booking Confirmed — ${date} at ${time}`,
    html: `<div style="${base}">
  <div style="${head}">
    <h2 style="margin:0;font-size:22px;font-weight:700;">You're Booked! 🎉</h2>
    <p style="margin:6px 0 0;opacity:.8;font-size:14px;">Your free consultation is confirmed</p>
  </div>
  <div style="${body}">
    <p style="font-size:15px;color:#374151;">Hi ${name},</p>
    <p style="font-size:14px;color:#6b7280;line-height:1.7;">Your 30-minute consultation with <strong style="color:#374151;">Mustafa Saeed</strong> is confirmed.</p>
    <div style="background:#eff6ff;border-radius:12px;padding:20px 24px;margin:20px 0;border:1px solid #bfdbfe;">
      <p style="margin:0 0 4px;font-size:12px;color:#1d4ed8;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Your Booking</p>
      <p style="margin:8px 0;font-size:16px;font-weight:700;color:#1e3a5f;">📅 ${date}</p>
      <p style="margin:4px 0;font-size:16px;font-weight:700;color:#1e3a5f;">⏰ ${time} PKT</p>
      <p style="margin:4px 0;font-size:14px;color:#374151;">📋 ${topic}</p>
    </div>
    <ul style="font-size:14px;color:#6b7280;line-height:2.2;padding-left:20px;">
      <li>A <strong style="color:#374151;">Google Meet link</strong> will be sent 30 min before</li>
      <li>Duration: <strong style="color:#374151;">30 minutes</strong></li>
      <li>To reschedule, reply to this email</li>
    </ul>
    <p style="font-size:14px;color:#374151;margin-top:24px;">Looking forward to speaking with you!<br/><strong>Mustafa Saeed</strong></p>
  </div>
  <div style="${foot}">mustafasaeed.dev</div>
</div>`,
  })
}

async function sendContactNotification({ name, email, company, budget, message }) {
  return transporter.sendMail({
    from:    process.env.EMAIL_FROM || `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:      NOTIFY_EMAIL,
    subject: `💬 New Inquiry from ${name}`,
    html: `<div style="${base}">
  <div style="${head}">
    <div style="${badge}">CONTACT FORM</div>
    <h2 style="margin:0;font-size:22px;font-weight:700;">New Message Received</h2>
  </div>
  <div style="${body}">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="${row}"><span style="${lbl}">Name</span><span style="${val}">${name}</span></td></tr>
      <tr><td style="${row}"><span style="${lbl}">Email</span><span style="${val}"><a href="mailto:${email}" style="color:#2563EB;">${email}</a></span></td></tr>
      ${company ? `<tr><td style="${row}"><span style="${lbl}">Company</span><span style="${val}">${company}</span></td></tr>` : ''}
      ${budget  ? `<tr><td style="${row}"><span style="${lbl}">Budget</span><span style="${val}">${budget}</span></td></tr>` : ''}
    </table>
    <div style="margin-top:20px;padding:20px;background:#f9fafb;border-radius:8px;border-left:3px solid #2563EB;">
      <p style="margin:0 0 6px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Message</p>
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${message}</p>
    </div>
  </div>
  <div style="${foot}">Sent at ${new Date().toLocaleString('en-PK',{timeZone:'Asia/Karachi'})} PKT</div>
</div>`,
  })
}

async function sendContactAutoReply({ name, email }) {
  return transporter.sendMail({
    from:    process.env.EMAIL_FROM || `"Mustafa Saeed" <${process.env.EMAIL_USER}>`,
    to:      email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `<div style="${base}">
  <div style="${head}"><h2 style="margin:0;font-size:22px;">Message Received!</h2></div>
  <div style="${body}">
    <p style="font-size:15px;color:#374151;">Hi ${name},</p>
    <p style="font-size:14px;color:#6b7280;line-height:1.7;">Thanks for reaching out! I've received your message and will reply within <strong style="color:#374151;">2 hours</strong>.</p>
    <p style="font-size:14px;color:#6b7280;line-height:1.7;">Prefer to talk directly? <a href="${process.env.CLIENT_URL||'http://localhost:5173'}/book-call" style="color:#2563EB;font-weight:600;">Book a free 30-min call →</a></p>
    <p style="font-size:14px;color:#374151;margin-top:24px;">Best,<br/><strong>Mustafa Saeed</strong><br/><span style="color:#6b7280;font-size:12px;">MERN Stack Developer & Automation Engineer</span></p>
  </div>
  <div style="${foot}">mustafasaeed.dev</div>
</div>`,
  })
}

module.exports = { sendBookingNotification, sendBookingConfirmation, sendContactNotification, sendContactAutoReply }

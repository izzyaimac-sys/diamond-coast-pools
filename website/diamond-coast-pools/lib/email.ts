import nodemailer from 'nodemailer'

// Create transporter only if SMTP is configured
const createTransporter = () => {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  
  // Only create transporter if all required SMTP settings are present
  if (!host || !user || !pass) {
    console.log('SMTP not configured - email notifications disabled')
    return null
  }
  
  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user,
      pass,
    },
  })
}

const transporter = createTransporter()

export async function sendLeadNotification(lead: {
  name: string
  phone: string
  email?: string | null
  address: string
  poolType?: string | null
  serviceType: string
  message?: string | null
}) {
  // If SMTP is not configured, just log and return success
  if (!transporter) {
    console.log('Lead notification (email disabled):', lead.name, lead.serviceType)
    return { success: true, skipped: true }
  }
  
  const emailHtml = `
    <h2>New Lead from Diamond Coast Pools Website</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Email:</strong> ${lead.email || 'Not provided'}</p>
    <p><strong>Address:</strong> ${lead.address}</p>
    <p><strong>Pool Type:</strong> ${lead.poolType || 'Not specified'}</p>
    <p><strong>Service Needed:</strong> ${lead.serviceType}</p>
    <p><strong>Message:</strong></p>
    <p>${lead.message || 'No additional message'}</p>
    <hr />
    <p>Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</p>
    <p><a href="${process.env.NEXT_PUBLIC_URL}/admin">View in Admin Dashboard</a></p>
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `New Lead: ${lead.name} - ${lead.serviceType}`,
      html: emailHtml,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}
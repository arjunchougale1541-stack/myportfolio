import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'arjunchougale1541@gmail.com',
    pass: process.env.GMAIL_PASS || 'jdeqmvjobtyhzbjn',
  },
});

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use as is
      }
    }

    const { name, email, service, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (Name, Email, and Project Summary).',
      });
    }

    const targetEmail = process.env.GMAIL_USER || 'arjunchougale1541@gmail.com';

    const info = await transporter.sendMail({
      from: `"Arjun Chougale Portfolio" <${targetEmail}>`,
      to: targetEmail,
      replyTo: email,
      subject: `New Portfolio Inquiry – ${name}`,
      text: `New Collaboration Request Received!\n\nClient Name: ${name}\nClient Email: ${email}\nService Interested In: ${service || 'Brand Identity & Logo Design'}\n\nProject Summary:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0c16; color: #f3f4f6; padding: 32px 24px; border-radius: 16px; max-width: 600px; border: 1px solid rgba(71, 87, 254, 0.3);">
          <div style="margin-bottom: 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px;">
            <span style="font-size: 11px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; color: #818cf8; background-color: rgba(71, 87, 254, 0.15); padding: 4px 10px; border-radius: 9999px;">
              PORTFOLIO INQUIRY
            </span>
            <h2 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 16px 0 4px 0;">
              New Collaboration Request Received!
            </h2>
            <p style="margin: 0; font-size: 13px; color: #9ca3af;">
              A potential client has submitted an inquiry from your portfolio website.
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; font-weight: 600; width: 160px; text-transform: uppercase; letter-spacing: 0.5px;">Client Name:</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Client Email:</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">
                <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; font-weight: 600;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Service Interested In:</td>
              <td style="padding: 10px 0; color: #a78bfa; font-size: 14px; font-weight: 600;">${service || 'Brand Identity & Logo Design'}</td>
            </tr>
          </table>

          <div style="background-color: rgba(255, 255, 255, 0.04); padding: 20px; border-radius: 12px; border-left: 4px solid #4757fe; margin-bottom: 24px;">
            <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af;">Project Summary:</p>
            <p style="margin: 0; color: #e5e7eb; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; padding-top: 8px;">
            <a href="mailto:${email}?subject=Re: Portfolio Inquiry – ${encodeURIComponent(name)}" style="display: inline-block; background-color: #4757fe; color: #ffffff; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">
              Reply Directly to ${name} &rarr;
            </a>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Failed to send email via Nodemailer.',
    });
  }
}


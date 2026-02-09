import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = 'support@shadowcc.shop'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

// ── Customer confirmation for custom service orders ──
export async function sendServiceOrderConfirmation({
  customerEmail,
  customerName,
  serviceName,
  tierName,
  tierPrice,
  discord,
  details,
}: {
  customerEmail: string
  customerName: string
  serviceName: string
  tierName: string
  tierPrice: string
  discord?: string
  details: string
}) {
  try {
    await resend.emails.send({
      from: `Shadow.CC <${FROM_EMAIL}>`,
      to: customerEmail,
      subject: `Order Confirmed - ${serviceName} (${tierName})`,
      html: `
        <div style="font-family: monospace; background: #030303; color: #e4e4e7; padding: 40px 20px; max-width: 600px; margin: 0 auto;">
          <div style="border: 1px solid #27272a; border-radius: 8px; padding: 32px; background: #0a0a0a;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px 0; letter-spacing: 2px;">SHADOW<span style="color: #dc2626;">.</span>CC</h1>
              <p style="color: #71717a; font-size: 10px; letter-spacing: 3px; margin: 0;">ORDER CONFIRMATION</p>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 20px;">Hey ${customerName},</p>
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 20px;">
              We received your <strong style="color: #ffffff;">${serviceName}</strong> order for the <strong style="color: #dc2626;">${tierName}</strong> tier (${tierPrice}).
            </p>
            <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
              <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">YOUR PROJECT DETAILS</p>
              <p style="color: #d4d4d8; font-size: 13px; white-space: pre-wrap; margin: 0;">${details}</p>
            </div>
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 6px;">
              We will reach out to you within <strong style="color: #ffffff;">24 hours</strong> to discuss your project and get started.
            </p>
            <p style="color: #71717a; font-size: 12px; margin-bottom: 20px;">
              If you have questions, reply to this email or join our Discord.
            </p>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <p style="color: #52525b; font-size: 10px; text-align: center; letter-spacing: 2px; margin: 0;">2026 SHADOW.CC - ALL RIGHTS RESERVED</p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send customer confirmation email:', error)
    return { success: false, error }
  }
}

// ── Admin notification for new service orders ──
export async function sendAdminOrderNotification({
  customerName,
  customerEmail,
  serviceName,
  tierName,
  tierPrice,
  discord,
  details,
}: {
  customerName: string
  customerEmail: string
  serviceName: string
  tierName: string
  tierPrice: string
  discord?: string
  details: string
}) {
  try {
    await resend.emails.send({
      from: `Shadow.CC Orders <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Order: ${serviceName} - ${tierName} (${tierPrice})`,
      html: `
        <div style="font-family: monospace; background: #030303; color: #e4e4e7; padding: 40px 20px; max-width: 600px; margin: 0 auto;">
          <div style="border: 1px solid #27272a; border-radius: 8px; padding: 32px; background: #0a0a0a;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px 0; letter-spacing: 2px;">NEW ORDER</h1>
              <p style="color: #dc2626; font-size: 10px; letter-spacing: 3px; margin: 0;">${serviceName.toUpperCase()} - ${tierName.toUpperCase()}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 6px 0; letter-spacing: 1px;">NAME</td>
                <td style="color: #ffffff; font-size: 13px; padding: 6px 0; text-align: right;">${customerName}</td>
              </tr>
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 6px 0; letter-spacing: 1px;">EMAIL</td>
                <td style="color: #ffffff; font-size: 13px; padding: 6px 0; text-align: right;">
                  <a href="mailto:${customerEmail}" style="color: #dc2626; text-decoration: none;">${customerEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 6px 0; letter-spacing: 1px;">DISCORD</td>
                <td style="color: #ffffff; font-size: 13px; padding: 6px 0; text-align: right;">${discord || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 6px 0; letter-spacing: 1px;">TIER</td>
                <td style="color: #ffffff; font-size: 13px; padding: 6px 0; text-align: right;">${tierName} (${tierPrice})</td>
              </tr>
            </table>
            <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
              <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">PROJECT DETAILS</p>
              <p style="color: #d4d4d8; font-size: 13px; white-space: pre-wrap; margin: 0;">${details}</p>
            </div>
            <p style="color: #a1a1aa; font-size: 12px;">
              Reply directly to the customer at <a href="mailto:${customerEmail}" style="color: #dc2626;">${customerEmail}</a>${discord ? ` or reach them on Discord: ${discord}` : ''}.
            </p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send admin notification email:', error)
    return { success: false, error }
  }
}

// ── Key delivery email for Roblox script purchases ──
export async function sendKeyDeliveryEmail({
  customerEmail,
  keys,
}: {
  customerEmail: string
  keys: { productId: string; key: string }[]
}) {
  const productNames: Record<string, string> = {
    'shadow-weekly': 'Weekly Key',
    'shadow-monthly': 'Monthly Key',
    'shadow-lifetime': 'Lifetime Key',
  }

  const keysHtml = keys
    .map(
      (k, i) => `
      <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 12px;">
        <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">${(productNames[k.productId] || 'LICENSE KEY').toUpperCase()} #${i + 1}</p>
        <code style="color: #ffffff; font-size: 16px; letter-spacing: 2px; word-break: break-all;">${k.key}</code>
      </div>
    `
    )
    .join('')

  try {
    await resend.emails.send({
      from: `Shadow.CC <${FROM_EMAIL}>`,
      to: customerEmail,
      subject: `Your Shadow.CC License Key${keys.length > 1 ? 's' : ''}`,
      html: `
        <div style="font-family: monospace; background: #030303; color: #e4e4e7; padding: 40px 20px; max-width: 600px; margin: 0 auto;">
          <div style="border: 1px solid #27272a; border-radius: 8px; padding: 32px; background: #0a0a0a;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px 0; letter-spacing: 2px;">SHADOW<span style="color: #dc2626;">.</span>CC</h1>
              <p style="color: #71717a; font-size: 10px; letter-spacing: 3px; margin: 0;">KEY DELIVERY</p>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 20px;">Thank you for your purchase. Here ${keys.length > 1 ? 'are your license keys' : 'is your license key'}:</p>
            ${keysHtml}
            <div style="background: #dc262610; border: 1px solid #dc262630; border-radius: 6px; padding: 12px; margin: 20px 0;">
              <p style="color: #f87171; font-size: 12px; margin: 0;">
                Save your key${keys.length > 1 ? 's' : ''} now. Keys are tied to your HWID and cannot be recovered if lost.
              </p>
            </div>
            <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
              <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">HOW TO REDEEM</p>
              <ol style="color: #a1a1aa; font-size: 12px; margin: 0; padding-left: 16px;">
                <li style="margin-bottom: 4px;">Open your executor and load the script</li>
                <li style="margin-bottom: 4px;">When prompted, paste your license key</li>
                <li>Click verify and enjoy the features</li>
              </ol>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <p style="color: #52525b; font-size: 10px; text-align: center; letter-spacing: 2px; margin: 0;">2026 SHADOW.CC - ALL RIGHTS RESERVED</p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send key delivery email:', error)
    return { success: false, error }
  }
}

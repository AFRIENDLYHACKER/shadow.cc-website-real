import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'support@shadowcc.shop'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'support@shadowcc.shop'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shadowcc.shop'

// ── Customer confirmation email with CONFIRM ORDER button ──
export async function sendServiceOrderConfirmation({
  customerEmail,
  customerName,
  serviceName,
  tierName,
  tierPrice,
  discord,
  details,
  orderId,
}: {
  customerEmail: string
  customerName: string
  serviceName: string
  tierName: string
  tierPrice: string
  discord?: string
  details: string
  orderId: string
}) {
  const confirmUrl = `${SITE_URL}/confirm-order?id=${orderId}`

  try {
    const result = await resend.emails.send({
      from: `Shadow.CC <${FROM_EMAIL}>`,
      to: customerEmail,
      replyTo: ADMIN_EMAIL,
      subject: `Confirm Your Order - ${serviceName} (${tierName})`,
      html: `
        <div style="font-family: monospace; background: #030303; color: #e4e4e7; padding: 40px 20px; max-width: 600px; margin: 0 auto;">
          <div style="border: 1px solid #27272a; border-radius: 8px; padding: 32px; background: #0a0a0a;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px 0; letter-spacing: 2px;">SHADOW<span style="color: #dc2626;">.</span>CC</h1>
              <p style="color: #71717a; font-size: 10px; letter-spacing: 3px; margin: 0;">CONFIRM YOUR ORDER</p>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 20px;">Hey ${customerName},</p>
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 20px;">
              You submitted a <strong style="color: #ffffff;">${serviceName}</strong> order for the <strong style="color: #dc2626;">${tierName}</strong> tier (${tierPrice}).
            </p>
            <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
              <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">YOUR ORDER SUMMARY</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #71717a; font-size: 11px; padding: 6px 0; border-bottom: 1px solid #18181b;">SERVICE</td>
                  <td style="color: #ffffff; font-size: 12px; padding: 6px 0; text-align: right; border-bottom: 1px solid #18181b;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="color: #71717a; font-size: 11px; padding: 6px 0; border-bottom: 1px solid #18181b;">TIER</td>
                  <td style="color: #ffffff; font-size: 12px; padding: 6px 0; text-align: right; border-bottom: 1px solid #18181b;">${tierName}</td>
                </tr>
                <tr>
                  <td style="color: #71717a; font-size: 11px; padding: 6px 0;">PRICE</td>
                  <td style="color: #dc2626; font-size: 12px; font-weight: bold; padding: 6px 0; text-align: right;">${tierPrice}</td>
                </tr>
              </table>
            </div>
            <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">PROJECT DETAILS</p>
              <p style="color: #d4d4d8; font-size: 13px; white-space: pre-wrap; margin: 0;">${details}</p>
            </div>
            <p style="color: #fbbf24; font-size: 13px; margin-bottom: 24px; text-align: center;">
              Click the button below to confirm your order. We will not start until you confirm.
            </p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="${confirmUrl}" style="display: inline-block; background: #dc2626; color: #ffffff; font-family: monospace; font-size: 14px; font-weight: 700; letter-spacing: 3px; text-decoration: none; padding: 16px 40px; border-radius: 6px;">
                CONFIRM ORDER
              </a>
            </div>
            <p style="color: #71717a; font-size: 11px; text-align: center; margin-bottom: 12px;">
              If the button does not work, copy and paste this link:
            </p>
            <p style="color: #52525b; font-size: 10px; text-align: center; word-break: break-all; margin-bottom: 20px;">
              ${confirmUrl}
            </p>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <p style="color: #71717a; font-size: 11px; text-align: center;">
              Questions? Reply to this email or join our <a href="https://discord.gg/Kezxm2TyGY" style="color: #dc2626; text-decoration: none;">Discord</a>.
            </p>
            <p style="color: #52525b; font-size: 10px; text-align: center; letter-spacing: 2px; margin-top: 16px;">2026 SHADOW.CC - ALL RIGHTS RESERVED</p>
          </div>
        </div>
      `,
    })
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to send customer confirmation email:', error)
    return { success: false, error }
  }
}

// ── Admin notification (only sent after customer confirms) ──
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
    const result = await resend.emails.send({
      from: `Shadow.CC Orders <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: customerEmail,
      subject: `CONFIRMED ORDER: ${serviceName} - ${tierName} from ${customerName}`,
      html: `
        <div style="font-family: monospace; background: #030303; color: #e4e4e7; padding: 40px 20px; max-width: 600px; margin: 0 auto;">
          <div style="border: 1px solid #27272a; border-radius: 8px; padding: 32px; background: #0a0a0a;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 4px 0; letter-spacing: 2px;">CONFIRMED ORDER</h1>
              <p style="color: #22c55e; font-size: 10px; letter-spacing: 3px; margin: 0;">CUSTOMER HAS CONFIRMED THIS ORDER</p>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <div style="background: #22c55e10; border: 1px solid #22c55e30; border-radius: 6px; padding: 12px; margin-bottom: 20px; text-align: center;">
              <p style="color: #4ade80; font-size: 12px; font-weight: bold; margin: 0; letter-spacing: 1px;">
                ${serviceName.toUpperCase()} - ${tierName.toUpperCase()} (${tierPrice})
              </p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 8px 0; letter-spacing: 1px; border-bottom: 1px solid #18181b;">NAME</td>
                <td style="color: #ffffff; font-size: 13px; padding: 8px 0; text-align: right; border-bottom: 1px solid #18181b;">${customerName}</td>
              </tr>
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 8px 0; letter-spacing: 1px; border-bottom: 1px solid #18181b;">EMAIL</td>
                <td style="color: #ffffff; font-size: 13px; padding: 8px 0; text-align: right; border-bottom: 1px solid #18181b;">
                  <a href="mailto:${customerEmail}" style="color: #dc2626; text-decoration: none;">${customerEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 8px 0; letter-spacing: 1px; border-bottom: 1px solid #18181b;">DISCORD</td>
                <td style="color: #ffffff; font-size: 13px; padding: 8px 0; text-align: right; border-bottom: 1px solid #18181b;">${discord || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="color: #71717a; font-size: 11px; padding: 8px 0; letter-spacing: 1px;">TIER</td>
                <td style="color: #ffffff; font-size: 13px; padding: 8px 0; text-align: right;">${tierName} (${tierPrice})</td>
              </tr>
            </table>
            <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">PROJECT DETAILS</p>
              <p style="color: #d4d4d8; font-size: 13px; white-space: pre-wrap; margin: 0;">${details}</p>
            </div>
            <div style="text-align: center; margin: 28px 0;">
              <a href="mailto:${customerEmail}?subject=Re: ${encodeURIComponent(`${serviceName} - ${tierName} Order`)}&body=${encodeURIComponent(`Hi ${customerName},\n\nThanks for confirming your ${serviceName} order. I'd like to discuss your project.\n\n`)}" style="display: inline-block; background: #dc2626; color: #ffffff; font-family: monospace; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-decoration: none; padding: 14px 32px; border-radius: 6px;">
                REPLY TO CUSTOMER
              </a>
            </div>
            <p style="color: #71717a; font-size: 11px; text-align: center;">
              This customer clicked the confirm button in their email.
            </p>
          </div>
        </div>
      `,
    })
    return { success: true, data: result }
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
    const result = await resend.emails.send({
      from: `Shadow.CC <${FROM_EMAIL}>`,
      to: customerEmail,
      replyTo: ADMIN_EMAIL,
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
            <div style="background: #030303; border: 1px solid #27272a; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #71717a; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px 0;">HOW TO REDEEM</p>
              <ol style="color: #a1a1aa; font-size: 12px; margin: 0; padding-left: 16px;">
                <li style="margin-bottom: 4px;">Open your executor and load the script</li>
                <li style="margin-bottom: 4px;">When prompted, paste your license key</li>
                <li>Click verify and enjoy the features</li>
              </ol>
            </div>
            <div style="text-align: center; margin: 28px 0;">
              <a href="${SITE_URL}/support" style="display: inline-block; background: #dc2626; color: #ffffff; font-family: monospace; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-decoration: none; padding: 14px 32px; border-radius: 6px;">
                NEED HELP?
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
            <p style="color: #52525b; font-size: 10px; text-align: center; letter-spacing: 2px; margin: 0;">2026 SHADOW.CC - ALL RIGHTS RESERVED</p>
          </div>
        </div>
      `,
    })
    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to send key delivery email:', error)
    return { success: false, error }
  }
}

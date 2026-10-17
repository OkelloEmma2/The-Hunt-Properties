// ⚠️ Replace with the company's real WhatsApp line (country code, no "+")
export const WHATSAPP_NUMBER = '256766306132'
export const COMPANY_PHONE_DISPLAY = '+256 766 306 132'

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const formatUGX = (n) => 'UGX ' + Number(n || 0).toLocaleString('en-UG')
// ⚠️ Replace with the company's real WhatsApp line (country code, no "+")
export const WHATSAPP_NUMBER = '256700000000'
export const COMPANY_PHONE_DISPLAY = '+256 700 000 000'

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const formatUGX = (n) => 'UGX ' + Number(n || 0).toLocaleString('en-UG')
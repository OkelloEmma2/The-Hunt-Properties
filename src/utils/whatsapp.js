// ⚠️ Replace with the company's real WhatsApp line (country code, no "+")
export const WHATSAPP_NUMBER = '256766306132'
export const COMPANY_PHONE_DISPLAY = '+256 766 306 132'

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const formatUGX = (n) => 'UGX ' + Number(n || 0).toLocaleString('en-UG')
// ============ PRICE, CURRENCY & DURATION HELPERS ============

function strip(x) {
  return parseFloat(x.toFixed(2)).toString()
}

function compactAmount(n) {
  if (n >= 1e9) return strip(n / 1e9) + 'B'
  if (n >= 1e6) return strip(n / 1e6) + 'M'
  if (n >= 1e3) return strip(n / 1e3) + 'K'
  return String(n)
}

export function formatPrice(price, currency = 'UGX', dealType = 'sale', rentPeriod = 'month') {
  const cur = currency === 'USD' ? 'USD' : 'UGX'
  const amount = Number(price || 0).toLocaleString('en-US')
  return dealType === 'rent'
    ? `${cur} ${amount} / ${rentPeriod === 'day' ? 'day' : 'month'}`
    : `${cur} ${amount}`
}

export function compactPrice(price, currency = 'UGX', dealType = 'sale', rentPeriod = 'month') {
  const cur = currency === 'USD' ? 'USD' : 'UGX'
  const n = Number(price || 0)
  const amount = cur === 'USD' ? n.toLocaleString('en-US') : compactAmount(n)
  return dealType === 'rent'
    ? `${cur} ${amount} / ${rentPeriod === 'day' ? 'day' : 'month'}`
    : `${cur} ${amount}`
}
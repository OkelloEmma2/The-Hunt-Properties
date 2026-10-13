import { MessageCircle } from 'lucide-react'
import { waLink } from '../utils/whatsapp'

// Global floating action button — direct WhatsApp lead routing (SRS requirement)
export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={waLink('Hello The Hunt Properties, I would like to make an enquiry.')}
      target="_blank" rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  )
}
import React from 'react';
import { BRAND_INFO } from '../data/content';

export default function WhatsAppButton() {
  return (
    <a
      href={BRAND_INFO.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 select-none"
      aria-label="Book via WhatsApp"
    >
      {/* Floating Prompt Bubble */}
      <span className="hidden sm:inline-block bg-deep-dark/90 backdrop-blur-md text-accent-gold border border-accent-gold/30 px-4 py-2 rounded-full text-xs tracking-widest uppercase font-medium shadow-2xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none">
        Reservations Chat
      </span>

      {/* Pulsing Interactive Circle */}
      <div className="w-14 h-14 bg-gradient-to-br from-coffee-brown to-accent-gold text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(200,164,107,0.4)] hover:shadow-[0_0_30px_rgba(200,164,107,0.8)] transition-all duration-300 animate-pulse-gold">
        {/* WhatsApp Premium SVG */}
        <svg
          className="w-7 h-7 fill-current text-white group-hover:rotate-12 transition-transform duration-500"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.58 1.981 14.11 1.979 11.5 1.979c-5.439 0-9.865 4.37-9.869 9.8.001 2.03.536 4.017 1.554 5.766L2.17 21.84l4.477-1.176zM17.26 14.88c-.287-.144-1.702-.84-1.965-.936-.264-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.354-.68-2.661-1.253-3.69-2.14-.816-.704-1.635-1.564-1.782-1.815-.148-.252-.016-.388.128-.53l.36-.432c.12-.144.16-.24.24-.4.08-.16.04-.3-.02-.444-.06-.144-.456-1.104-.624-1.512-.164-.397-.33-.342-.456-.349-.117-.007-.252-.009-.387-.009-.136 0-.36.051-.548.257-.188.206-.72.703-.72 1.714 0 1.01.735 1.986.837 2.124.102.137 1.446 2.208 3.502 3.093.49.21.871.336 1.169.431.492.156.94.134 1.294.081.395-.06 1.703-.696 1.943-1.37.24-.673.24-1.25.168-1.37-.072-.12-.264-.216-.552-.36z"/>
        </svg>
      </div>
    </a>
  );
}

import React, { useState } from 'react';

const WhatsAppButton = ({ phoneNumber = '5492477357665', isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hola%20Handicapp,%20me%20gustaría%20obtener%20más%20información`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Tooltip */}
      <div className={`absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
      }`}>
        <div className={`px-4 py-2 rounded-xl font-bold text-sm shadow-lg ${
          isDark 
            ? 'bg-white text-zinc-900' 
            : 'bg-zinc-900 text-white'
        }`}>
          ¿Necesitas ayuda?
        </div>
      </div>

      {/* Button */}
      <div className={`
        w-14 h-14 rounded-full flex items-center justify-center
        bg-gradient-to-br from-[#25D366] to-[#128C7E]
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:scale-110 active:scale-95
        ${isHovered ? 'ring-4 ring-[#25D366]/30' : ''}
      `}>
        {/* WhatsApp Logo SVG */}
        <svg 
          viewBox="0 0 32 32" 
          className="w-7 h-7"
          fill="white"
        >
          <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.924 0-7.435 6.050-13.485 13.485-13.485s13.485 6.050 13.485 13.485c0 7.435-6.050 13.485-13.485 13.485zM21.964 18.521c-0.346-0.174-2.049-1.007-2.366-1.123-0.316-0.116-0.547-0.174-0.776 0.174s-0.892 1.123-1.094 1.347c-0.201 0.227-0.401 0.253-0.747 0.079-0.344-0.174-1.461-0.537-2.784-1.711-1.028-0.916-1.723-2.045-1.924-2.391-0.202-0.346-0.022-0.533 0.152-0.707 0.156-0.155 0.346-0.401 0.518-0.602s0.231-0.346 0.347-0.574c0.116-0.231 0.058-0.431-0.028-0.606-0.087-0.173-0.776-1.865-1.063-2.556-0.28-0.672-0.562-0.58-0.776-0.591-0.2-0.008-0.431-0.010-0.661-0.010s-0.604 0.086-0.92 0.431c-0.316 0.346-1.206 1.179-1.206 2.871s1.235 3.33 1.406 3.558c0.173 0.231 2.396 3.797 5.865 5.183 0.818 0.356 1.458 0.567 1.955 0.726 0.817 0.262 1.561 0.225 2.15 0.137 0.656-0.098 2.049-0.835 2.335-1.642 0.288-0.807 0.288-1.501 0.202-1.642-0.087-0.145-0.317-0.231-0.663-0.403z" />
        </svg>
      </div>

      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
    </a>
  );
};

export default WhatsAppButton;

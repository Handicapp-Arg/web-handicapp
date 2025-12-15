import React from 'react';
import { Link } from 'react-router-dom';
import { useVisualConfig } from '../hooks/useContextHooks';

const Footer = React.memo(() => {
  // Usar hooks de contexto
  const { theme, assets } = useVisualConfig();
  return (
    <footer className={`py-20 border-t ${theme.border} text-center relative z-10 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo y nombre de la empresa */}
        <div className="flex items-center gap-4">
          {assets.logoIcon ? (
            <div className="w-14 h-14 flex-shrink-0">
              <img 
                src={assets.logoIcon} 
                alt="Handicapp" 
                className={`w-full h-full object-contain`} 
              />
            </div>
          ) : (
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl ${theme.accentBg} text-white`}>
              H
            </div>
          )}
          <div className="text-left">
            <span className="font-black text-base tracking-widest block">HANDICAPP</span>
            <span className="text-xs opacity-60 tracking-wide">Equestrian Systems</span>
          </div>
        </div>
        
        {/* Copyright */}
        <p className="text-sm opacity-50">© 2026 Handicapp Inc. All rights reserved.</p>
        
        {/* Links de contacto y legal */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-[11px] font-black tracking-widest">
          <a href="mailto:info@handicapp.com.ar" className={`opacity-60 hover:opacity-100 transition-all ${theme.accent} hover:scale-110`}>INFO@HANDICAPP.COM.AR</a>
          <a href="tel:+5492477357665" className={`opacity-60 hover:opacity-100 transition-all ${theme.accent} hover:scale-110`}>+54 9 2477 357665</a>
          <Link to="/legal" className={`opacity-60 hover:opacity-100 transition-all ${theme.accent} hover:scale-110`}>LEGAL</Link>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

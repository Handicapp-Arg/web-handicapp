import React from 'react';

const Footer = ({ theme, isDark, ASSETS }) => {
  return (
    <footer className={`py-20 border-t ${theme.border} text-center relative z-10 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo y nombre de la empresa */}
        <div className="flex items-center gap-4">
          {ASSETS.logoIcon ? (
            <div className="w-14 h-14 flex-shrink-0">
              <img 
                src={ASSETS.logoIcon} 
                alt="Handicapp" 
                className={`w-full h-full object-contain ${isDark ? '' : 'brightness-0'}`} 
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
        
        {/* Links sociales */}
        <div className="flex gap-8 text-[11px] font-black tracking-widest">
          <a href="#" className={`opacity-60 hover:opacity-100 transition-all ${theme.accent} hover:scale-110`}>INSTAGRAM</a>
          <a href="#" className={`opacity-60 hover:opacity-100 transition-all ${theme.accent} hover:scale-110`}>TWITTER</a>
          <a href="#" className={`opacity-60 hover:opacity-100 transition-all ${theme.accent} hover:scale-110`}>LEGAL</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Footer = ({ theme, isDark, ASSETS }) => {
  return (
    <footer className={`py-16 border-t ${theme.border} text-center relative z-10 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          {ASSETS.logoIcon ? (
            <img src={ASSETS.logoIcon} alt="H" className={`w-10 h-10 ${isDark ? '' : 'invert'}`} />
          ) : (
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-base ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
              H
            </div>
          )}
          <span className="font-bold text-sm tracking-widest">HANDICAPP INC.</span>
        </div>
        <p className="text-sm opacity-50">© 2026 Future Equestrian Systems. All rights reserved.</p>
        <div className="flex gap-8 text-[11px] font-black tracking-widest opacity-60">
          <a href="#" className="hover:opacity-100 transition-opacity">INSTAGRAM</a>
          <a href="#" className="hover:opacity-100 transition-opacity">TWITTER</a>
          <a href="#" className="hover:opacity-100 transition-opacity">LEGAL</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

const Navbar = ({ t, theme, isDark, scrolled, ASSETS, onToggleDark, onToggleLang, onMenuOpen }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 ' + theme.glass + ' border-b ' + theme.border : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer relative z-10">
          {ASSETS.logoIcon ? (
            <div className={`${scrolled ? 'w-11 h-11' : 'w-14 h-14'} transition-all duration-500 flex-shrink-0`}>
              <img 
                src={ASSETS.logoIcon} 
                alt="Handicapp" 
                className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-110 ${isDark ? '' : 'brightness-0'}`} 
              />
            </div>
          ) : (
            <span className="font-bold tracking-tighter text-2xl">HANDICAPP</span>
          )}
        </a>

        {/* Links de navegación */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[12px] font-bold tracking-[0.15em]">
          {Object.entries(t.nav).filter(([key]) => key !== 'login').map(([key, label]) => (
            <a 
              key={key} 
              href={`#${key}`} 
              className="opacity-70 hover:opacity-100 transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button 
            onClick={onToggleLang} 
            className="text-[11px] font-black px-3 py-2.5 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all hover:scale-105"
          >
            {t.lang_code}
          </button>
          <button 
            onClick={onToggleDark} 
            className="p-2.5 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all hover:scale-105"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a 
            href="https://www.handicapp.com.ar/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all hover:scale-105 bg-gradient-to-r from-[#c9a96e] to-[#af936f] text-white shadow-lg hover:shadow-[0_0_20px_rgba(175,147,111,0.6)]"
          >
            {t.nav.login}
          </a>
          <button className="md:hidden p-2" onClick={onMenuOpen}>
            <Menu size={24}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

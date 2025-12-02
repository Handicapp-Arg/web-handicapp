import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

const Navbar = ({ t, theme, isDark, scrolled, ASSETS, onToggleDark, onToggleLang, onMenuOpen }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 ' + theme.glass + ' border-b ' + theme.border : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          {ASSETS.logoFull ? (
            <img src={ASSETS.logoFull} alt="Handicapp" className={`${scrolled ? 'h-9' : 'h-11'} w-auto transition-all duration-500 group-hover:scale-105 ${isDark ? '' : 'invert'}`} />
          ) : (
            <span className="font-bold tracking-tighter text-2xl">HANDICAPP</span>
          )}
        </a>
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[12px] font-bold tracking-[0.15em]">
          {Object.entries(t.nav).filter(([key]) => key !== 'login').map(([key, label]) => (
            <a key={key} href={`#${key}`} className="opacity-70 hover:opacity-100 hover:text-current transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current after:transition-all hover:after:w-full">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 lg:gap-4">
          <button onClick={onToggleLang} className={`text-[11px] font-black px-3 py-2.5 rounded-lg border ${theme.border} hover:bg-white/5 transition-all hover:scale-105`}>
            {t.lang_code}
          </button>
          <button onClick={onToggleDark} className={`p-2.5 rounded-lg border ${theme.border} hover:bg-white/5 transition-all hover:scale-105`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="md:hidden p-2" onClick={onMenuOpen}>
            <Menu size={24}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

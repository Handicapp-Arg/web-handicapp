import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu } from 'lucide-react';

const Navbar = ({ t, theme, isDark, scrolled, ASSETS, onToggleDark, onToggleLang, onMenuOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation items configuration
  const navItems = [
    { path: '/', label: t.nav.system || 'ECOSISTEMA', isExternal: false },
    { path: '/faq', label: 'FAQ', isExternal: false },
  ];

  // Helper to determine if link is active
  const isActive = (path) => currentPath === path;

  // Helper to render nav link styles
  const getLinkStyles = (path) => {
    const active = isActive(path);
    return `${
      active 
        ? 'opacity-100 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white'
        : 'opacity-70 hover:opacity-100 transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full'
    }`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 ' + theme.glass + ' border-b ' + theme.border : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer relative z-10">
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
        </Link>

        {/* Links de navegación */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[12px] font-bold tracking-[0.15em]">
          {currentPath === '/' ? (
            <>
              {/* Home page - show anchor links */}
              {Object.entries(t.nav).filter(([key]) => key !== 'login').map(([key, label]) => (
                <a 
                  key={key} 
                  href={`#${key}`} 
                  className="opacity-70 hover:opacity-100 transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full"
                >
                  {label}
                </a>
              ))}
              {navItems.filter(item => item.path !== '/').map(item => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={getLinkStyles(item.path)}
                >
                  {item.label}
                </Link>
              ))}
            </>
          ) : (
            <>
              {/* Other pages - show page links */}
              {navItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={getLinkStyles(item.path)}
                >
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
          <button 
            onClick={onToggleLang} 
            className={`text-[10px] md:text-[11px] font-black px-2.5 md:px-3 py-2 md:py-2.5 rounded-lg border transition-all hover:scale-105 ${
              isDark 
                ? 'border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10 text-white' 
                : 'border-zinc-300 hover:border-[#af936f] hover:bg-[#af936f]/10 text-zinc-900'
            }`}
          >
            {t.lang_code}
          </button>
          <button 
            onClick={onToggleDark} 
            className={`p-2 md:p-2.5 rounded-lg border transition-all hover:scale-105 ${
              isDark 
                ? 'border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10 text-white' 
                : 'border-zinc-300 hover:border-[#af936f] hover:bg-[#af936f]/10 text-zinc-900'
            }`}
          >
            {isDark ? <Sun size={16} className="md:w-[18px] md:h-[18px]" /> : <Moon size={16} className="md:w-[18px] md:h-[18px]" />}
          </button>
          <button 
            className={`md:hidden p-2 rounded-lg border transition-all hover:scale-105 ${
              isDark 
                ? 'border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10' 
                : 'border-zinc-300 hover:border-[#af936f] hover:bg-[#af936f]/10'
            }`}
            onClick={onMenuOpen}
          >
            <Menu size={22}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

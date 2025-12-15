import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = ({ t, theme, isDark, scrolled, ASSETS, onToggleLang, onMenuOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Handler para el click en el logo
  const handleLogoClick = (e) => {
    if (currentPath === '/') {
      // Si ya estamos en home, hacer scroll al top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Si no estamos en home, el Link manejará la navegación
  };

  // Handler para links que deben ir al top de la página
  const handlePageClick = (e, path) => {
    // Siempre hacer scroll al top cuando se navega a una página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Navigation items configuration
  const navItems = [
    { path: '/', label: 'INICIO', isExternal: false },
    { path: '/faq', label: 'FAQ', isExternal: false },
  ];

  // Helper to determine if link is active
  const isActive = (path) => currentPath === path;

  // Helper to render nav link styles
  const getLinkStyles = (path) => {
    const active = isActive(path);
    const textColor = isDark ? 'text-white' : 'text-[#0f172a]';
    const underlineColor = isDark ? 'after:bg-white' : 'after:bg-[#0f172a]';
    
    return `${textColor} ${
      active 
        ? `opacity-100 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 ${underlineColor}`
        : `opacity-70 hover:opacity-100 transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 ${underlineColor} after:transition-all hover:after:w-full`
    }`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 ' + theme.glass + ' border-b ' + theme.border : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group cursor-pointer relative z-10">
          {ASSETS.logoIcon ? (
            <div className={`${scrolled ? 'w-11 h-11' : 'w-14 h-14'} transition-all duration-500 flex-shrink-0`}>
              <img 
                src={ASSETS.logoIcon} 
                alt="Handicapp" 
                className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-110 ${isDark ? '' : 'brightness-0'}`} 
              />
            </div>
          ) : (
            <span className={`font-bold tracking-tighter text-2xl ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>HANDICAPP</span>
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
                  className={`opacity-70 hover:opacity-100 transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full ${
                    isDark ? 'text-white after:bg-white' : 'text-[#0f172a] after:bg-[#0f172a]'
                  }`}
                >
                  {label}
                </a>
              ))}
              {navItems.filter(item => item.path !== '/').map(item => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handlePageClick(e, item.path)}
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
                  onClick={(e) => handlePageClick(e, item.path)}
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
            className={`text-[10px] md:text-[11px] font-black px-2.5 md:px-3 py-2 md:py-2.5 rounded-lg border-2 transition-all hover:scale-105 ${
              isDark 
                ? 'border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10 text-white' 
                : 'border-zinc-400 hover:border-[#af936f] hover:bg-[#af936f]/10 text-[#0f172a]'
            }`}
          >
            {t.lang_code}
          </button>
          <a 
            href="https://www.handicapp.com.ar/login"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[10px] md:text-[11px] font-black px-3 md:px-4 py-2 md:py-2.5 rounded-lg border-2 transition-all hover:scale-105 ${
              isDark 
                ? 'border-[#af936f] bg-[#af936f] hover:bg-[#af936f]/90 text-white' 
                : 'border-[#af936f] bg-[#af936f] hover:bg-[#af936f]/90 text-white'
            }`}
          >
            INGRESAR
          </a>
          <button 
            className={`md:hidden p-2 rounded-lg border transition-all hover:scale-105 ${
              isDark 
                ? 'border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10 text-white' 
                : 'border-zinc-300 hover:border-[#af936f] hover:bg-[#af936f]/10 text-[#0f172a]'
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

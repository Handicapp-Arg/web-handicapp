import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { useUIState, useTranslation, useVisualConfig } from '../hooks/useContextHooks';

const Navbar = React.memo(({ scrolled, onToggleLang, onMenuOpen }) => {
  // Usar hooks de contexto en lugar de props
  const { t, toggleLang } = useTranslation();
  const { theme, assets } = useVisualConfig();
  
  const location = useLocation();
  const currentPath = location.pathname;

  // Handler para el click en el logo - memoizado
  const handleLogoClick = useCallback((e) => {
    if (currentPath === '/') {
      // Si ya estamos en home, hacer scroll al top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Si no estamos en home, el Link manejará la navegación
  }, [currentPath]);

  // Handler para links que deben ir al top de la página - memoizado
  const handlePageClick = useCallback((e, path) => {
    // Siempre hacer scroll al top cuando se navega a una página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

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
    
    return `text-white ${
      active 
        ? 'opacity-100 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white'
        : 'opacity-70 hover:opacity-100 transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full'
    }`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 ' + theme.glass + ' border-b ' + theme.border : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Layout móvil: Logo y hamburguesa juntos a la izquierda */}
        <div className="md:hidden flex justify-between items-center">
          {/* Lado izquierdo: Logo + Hamburguesa */}
          <div className="flex items-center gap-3">
            <Logo 
              logoSrc={assets.logoIcon || "/logo.svg"}
              brand="Handicapp"
              textColor="#fff"
            />
            <button 
              className="p-2 rounded-lg border transition-all hover:scale-105 border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10 text-white"
              onClick={onMenuOpen}
            >
              <Menu size={22}/>
            </button>
          </div>

          {/* Lado derecho: Botones */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLang} 
              className="text-[10px] font-black px-2.5 py-2 rounded-lg border-2 transition-all hover:scale-105 border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10 text-white"
            >
              {t.lang_code}
            </button>
            <a 
              href="https://www.handicapp.com.ar/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black px-3 py-2 rounded-lg border-2 transition-all hover:scale-105 border-[#af936f] bg-[#af936f] hover:bg-[#af936f]/90 text-white"
            >
              {t.loginBtn}
            </a>
          </div>
        </div>

        {/* Layout desktop: flex normal */}
        <div className="hidden md:flex justify-between items-center">
          {/* Logo */}
          <div className="z-10 flex items-center h-16">
            <Logo 
              logoSrc={assets.logoIcon || "/logo.svg"}
              brand="Handicapp"
              textColor="#fff"
            />
          </div>

          {/* Links de navegación */}
          <div className="flex items-center gap-8 lg:gap-10 text-[12px] font-bold tracking-[0.15em]">
          {currentPath === '/' ? (
            <>
              {/* Home page - show anchor links */}
              {Object.entries(t.nav).filter(([key]) => key !== 'login').map(([key, label]) => (
                <a 
                  key={key} 
                  href={`#${key}`} 
                  className="opacity-70 hover:opacity-100 transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full text-white after:bg-white"
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

          {/* Botones de acción desktop */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button 
              onClick={toggleLang} 
              className="text-[11px] font-black px-3 py-2.5 rounded-lg border-2 transition-all hover:scale-105 border-zinc-700 hover:border-[#af936f] hover:bg-[#af936f]/10 text-white"
            >
              {t.lang_code}
            </button>
            <a 
              href="https://www.handicapp.com.ar/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-black px-4 py-2.5 rounded-lg border-2 transition-all hover:scale-105 border-[#af936f] bg-[#af936f] hover:bg-[#af936f]/90 text-white"
            >
              {t.loginBtn}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;

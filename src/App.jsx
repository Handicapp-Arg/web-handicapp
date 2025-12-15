import React, { Suspense, lazy, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context API
import { AppProvider, useAppContext, ThemeProvider, useTheme } from './contexts';

// Lazy loading de componentes para mejorar performance
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const MobileMenu = lazy(() => import('./components/MobileMenu'));
const VideoModal = lazy(() => import('./components/VideoModal'));
const Preloader = lazy(() => import('./components/Preloader'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const ThreeEquestrianFlow = lazy(() => import('./components/ThreeEquestrianFlow'));

// Importar hook de rutas
import useRoutes from './hooks/useRoutes.jsx';

/**
 * --- APP PRINCIPAL ---
 */
const AppContent = React.memo(() => {
  // Usar contexto en lugar de props drilling
  const {
    videoOpen,
    menuOpen,
    scrolled,
    loaded,
    t,
    toggleLang,
    openVideo,
    closeVideo,
    openMenu,
    closeMenu,
    completeLoad
  } = useAppContext();

  // Usar contexto de tema
  const { theme, assets } = useTheme();

  // Memoizar callbacks para evitar re-renders innecesarios
  const handleVideoOpen = useCallback(openVideo, [openVideo]);
  const handleVideoClose = useCallback(closeVideo, [closeVideo]);
  const handleMenuOpen = useCallback(openMenu, [openMenu]);
  const handleMenuClose = useCallback(closeMenu, [closeMenu]);
  const handleToggleLang = useCallback(toggleLang, [toggleLang]);
  const handleLoadComplete = useCallback(completeLoad, [completeLoad]);

  // Configurar rutas
  const { routeConfigs } = useRoutes({ 
    t, 
    theme, 
    assets, 
    onVideoOpen: handleVideoOpen 
  });

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} font-['Outfit'] selection:bg-[#af936f] selection:text-white`}>
      <style>{`.animate-marquee { animation: marquee 30s linear infinite; } @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      
      <Suspense fallback={<div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#af936f]"></div>
      </div>}>
        <Preloader onLoadComplete={handleLoadComplete} />
        <CustomCursor />
        <MobileMenu isOpen={menuOpen} onClose={handleMenuClose} />
        
        {loaded && (
          <>
            <ThreeEquestrianFlow />
            <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]"></div>
            <VideoModal isOpen={videoOpen} onClose={handleVideoClose} />

            <Navbar 
              scrolled={scrolled} 
              onToggleLang={handleToggleLang}
              onMenuOpen={handleMenuOpen}
            />

            <Routes>
              {routeConfigs.map((route) => (
                <Route 
                  key={route.path} 
                  path={route.path} 
                  element={<route.component {...route.props} />} 
                />
              ))}
            </Routes>

            <Footer />
            <WhatsAppButton phoneNumber="5492477357665" />
          </>
        )}
      </Suspense>
    </div>
  );
});

AppContent.displayName = 'AppContent';

const App = React.memo(() => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
});

App.displayName = 'App';

export default App;

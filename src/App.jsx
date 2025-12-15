import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar componentes separados
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileMenu from './components/MobileMenu';
import VideoModal from './components/VideoModal';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ThreeEquestrianFlow from './components/ThreeEquestrianFlow';
// Configuración de tema y assets
import { theme, assets } from './theme';
// Importar hooks personalizados
import useAppState from './hooks/useAppState';
import useAssets from './hooks/useAssets';
import useRoutes from './hooks/useRoutes.jsx';

/**
 * --- APP PRINCIPAL ---
 */
function AppContent() {
  // Usar hooks personalizados
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
  } = useAppState();

  // Cargar recursos externos
  useAssets();

  // Configurar rutas
  const { routeConfigs } = useRoutes({ 
    t, 
    theme, 
    assets, 
    onVideoOpen: openVideo 
  });

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} font-['Outfit'] selection:bg-[#af936f] selection:text-white`}>
      <style>{`.animate-marquee { animation: marquee 30s linear infinite; } @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      
      <Preloader onLoadComplete={completeLoad} assets={assets} />
      <CustomCursor />
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} t={t} theme={theme} />
      
      {loaded && (
        <>
          <ThreeEquestrianFlow />
          <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]"></div>
          <VideoModal isOpen={videoOpen} onClose={closeVideo} />

          <Navbar 
            t={t} 
            theme={theme}
            scrolled={scrolled} 
            ASSETS={assets}
            onToggleLang={toggleLang}
            onMenuOpen={openMenu}
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

          <Footer theme={theme} ASSETS={assets} />
          <WhatsAppButton phoneNumber="5492477357665" />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

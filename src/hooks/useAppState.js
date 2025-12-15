import { useState, useEffect } from 'react';
import translations from '../i18n';

/**
 * Hook personalizado para manejar el estado de la aplicación
 * Incluye: idioma, modals, scroll y carga
 */
const useAppState = () => {
  const [langIndex, setLangIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const langs = ['es', 'en', 'de'];
  const t = translations[langs[langIndex]];

  // Funciones para cambiar idioma
  const toggleLang = () => setLangIndex((prev) => (prev + 1) % langs.length);

  // Funciones para modals
  const openVideo = () => setVideoOpen(true);
  const closeVideo = () => setVideoOpen(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  // Función para completar carga
  const completeLoad = () => setLoaded(true);

  // Hook para detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    // Estado
    langIndex,
    videoOpen,
    menuOpen,
    scrolled,
    loaded,
    t,
    langs,
    
    // Acciones
    toggleLang,
    openVideo,
    closeVideo,
    openMenu,
    closeMenu,
    completeLoad
  };
};

export default useAppState;
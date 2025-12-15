import { useEffect } from 'react';

/**
 * Hook personalizado para cargar recursos externos
 * Fuentes, scripts, y otros assets necesarios
 */
const useAssets = () => {
  useEffect(() => {
    // Cargar fuentes de Google Fonts
    const loadFonts = () => {
      const link = document.createElement('link');
      link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    };

    // Cargar Three.js si no está disponible
    const loadThreeJS = () => {
      if (!window.THREE) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadFonts();
    loadThreeJS();

    // No necesita cleanup ya que estos recursos permanecen cargados
    return () => {};
  }, []);
};

export default useAssets;
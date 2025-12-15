import { useEffect } from 'react';
import { URLS } from '../utils';

/**
 * Hook personalizado para cargar recursos externos
 * Fuentes, scripts, y otros assets necesarios
 */
const useAssets = () => {
  useEffect(() => {
    // Cargar fuentes de Google Fonts
    const loadFonts = () => {
      const link = document.createElement('link');
      link.href = URLS.GOOGLE_FONTS;
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
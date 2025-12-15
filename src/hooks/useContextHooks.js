import { useAppContext, useTheme } from '../contexts';

/**
 * Hook personalizado para acceder solo al estado de UI
 * @returns {Object} - Estado de UI (modals, menu, loading, etc)
 */
export const useUIState = () => {
  const {
    videoOpen,
    menuOpen,
    scrolled,
    loaded,
    openVideo,
    closeVideo,
    openMenu,
    closeMenu,
    completeLoad
  } = useAppContext();

  return {
    // Estado
    videoOpen,
    menuOpen,
    scrolled,
    loaded,
    // Acciones
    openVideo,
    closeVideo,
    openMenu,
    closeMenu,
    completeLoad
  };
};

/**
 * Hook personalizado para acceder solo a las traducciones
 * @returns {Object} - Traducciones y función de cambio de idioma
 */
export const useTranslation = () => {
  const { t, toggleLang } = useAppContext();
  
  return {
    t,
    toggleLang,
    currentLang: t.lang_code
  };
};

/**
 * Hook personalizado para acceder a toda la configuración visual
 * @returns {Object} - Theme, assets y utilidades
 */
export const useVisualConfig = () => {
  const { theme, assets, isDark, accentColor } = useTheme();
  
  return {
    theme,
    assets,
    isDark,
    accentColor,
    // Utilidades
    getThemeClass: (className) => `${className} ${theme.bg} ${theme.text}`,
    getAccentClass: (base = '') => `${base} ${theme.accent}`,
  };
};

/**
 * Hook personalizado para acceder a los assets optimizados
 * @returns {Object} - Assets con utilidades adicionales
 */
export const useAssetManager = () => {
  const { assets } = useTheme();
  
  return {
    ...assets,
    // Utilidades para assets
    getImageUrl: (key) => assets[key] || '/placeholder.jpg',
    hasAsset: (key) => Boolean(assets[key]),
    getOptimizedImage: (key, size = 'md') => {
      // Lógica para diferentes tamaños si fuera necesario
      return assets[key];
    }
  };
};
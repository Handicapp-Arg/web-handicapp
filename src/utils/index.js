/**
 * Archivo índice para exportar todas las utilidades
 * Centraliza todas las exports de la carpeta utils
 */

// Exportar utilidades de prompts
export * from './prompts';

// Exportar utilidades de formateo
export * from './formatters';

// Exportar utilidades de validación
export * from './validators';

// Configuraciones comunes
export const APP_CONFIG = {
  DEFAULT_LANGUAGE: 'es',
  SUPPORTED_LANGUAGES: ['es', 'en', 'de'],
  SCROLL_THRESHOLD: 50,
  LOADING_DELAY: 100,
  ANIMATION_DURATION: 300
};

// URLs comunes
export const URLS = {
  WHATSAPP_BASE: 'https://wa.me/',
  CLOUDINARY_BASE: 'https://res.cloudinary.com/dh2m9ychv/',
  GOOGLE_FONTS: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap'
};

// Breakpoints de Tailwind para JS
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Detecta si estamos en mobile
 * @returns {boolean}
 */
export const isMobile = () => {
  return window.innerWidth < BREAKPOINTS.md;
};

/**
 * Detecta el tamaño de pantalla actual
 * @returns {string} - 'sm', 'md', 'lg', 'xl', '2xl'
 */
export const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  return 'sm';
};
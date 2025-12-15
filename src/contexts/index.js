/**
 * Exportaciones centralizadas de todos los contextos
 * Facilita las importaciones y mantiene organizado el código
 */

// Context principal de la aplicación
export { AppProvider, useAppContext } from './AppContext';

// Context de tema y assets
export { ThemeProvider, useTheme } from './ThemeContext';

// Re-exportar contextos por defecto para compatibilidad
export { default as AppContext } from './AppContext';
export { default as ThemeContext } from './ThemeContext';
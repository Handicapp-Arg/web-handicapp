import React, { createContext, useContext, useMemo } from 'react';
import { theme, assets } from '../theme';

/**
 * Context para theme y assets
 * Proporciona acceso centralizado a la configuración visual
 */
const ThemeContext = createContext();

/**
 * Hook personalizado para usar el contexto del tema
 * @returns {Object} - Theme y assets configurados
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};

/**
 * Provider del contexto de tema
 * Centraliza la configuración visual de la aplicación
 */
export const ThemeProvider = React.memo(({ children }) => {
  // Memoizar el valor del contexto para evitar re-renders
  const contextValue = useMemo(() => ({
    theme,
    assets,
    // Utilidades del tema
    isDark: true, // Siempre modo oscuro
    accentColor: '#af936f',
    version: '1.0.0'
  }), []);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
});

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeContext;
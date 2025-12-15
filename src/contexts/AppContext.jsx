import React, { createContext, useContext, useMemo } from 'react';
import { theme, assets } from '../theme';
import useAppState from '../hooks/useAppState';
import useAssets from '../hooks/useAssets';

/**
 * Context para el estado global de la aplicación
 * Centraliza theme, assets, y estado de UI
 */
const AppContext = createContext();

/**
 * Hook personalizado para usar el contexto de la app
 * @returns {Object} - Estado y funciones globales
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
};

/**
 * Provider del contexto de la aplicación
 * Maneja todo el estado global y lo distribuye a los componentes hijos
 */
export const AppProvider = React.memo(({ children }) => {
  // Estado de la aplicación desde el hook personalizado
  const appState = useAppState();
  
  // Cargar recursos externos
  useAssets();

  // Crear el valor del contexto memoizado para optimizar rendimiento
  const contextValue = useMemo(() => ({
    // Estado de UI
    ...appState,
    
    // Configuración global
    theme,
    assets,
    
    // Metadatos
    version: '2.0.0',
    buildDate: new Date().toISOString(),
  }), [appState]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
});

AppProvider.displayName = 'AppProvider';

export default AppContext;
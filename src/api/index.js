/**
 * Archivo índice de la API
 * Centraliza todas las exportaciones de los diferentes módulos de la API
 */

// Exportar funciones de contactos
export { postContactForm } from './contacts';

// Aquí se pueden agregar más módulos de API en el futuro:
// export * from './users';
// export * from './products';
// export * from './analytics';

/**
 * Configuración global de la API
 */
export const API_CONFIG = {
  timeout: 30000, // 30 segundos
  retries: 3,
  baseURL: import.meta.env.VITE_API_URL
};

/**
 * Utilidades comunes de la API
 */
export const apiUtils = {
  /**
   * Crea query params para URLs
   * @param {Object} params - Parámetros a convertir
   * @returns {string} - Query string
   */
  createQueryParams: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  },

  /**
   * Valida si una URL está disponible
   * @param {string} url - URL a verificar
   * @returns {Promise<boolean>} - True si está disponible
   */
  checkEndpoint: async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }
};
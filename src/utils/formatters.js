/**
 * Utilidades para formateo de datos
 * Funciones de ayuda para formatear datos en la UI
 */

/**
 * Formatea números con separadores de miles
 * @param {number} number - Número a formatear
 * @returns {string} - Número formateado
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('es-AR').format(number);
};

/**
 * Formatea precio en pesos argentinos
 * @param {number} price - Precio en números
 * @returns {string} - Precio formateado
 */
export const formatPrice = (price) => {
  return `$${formatNumber(price)}`;
};

/**
 * Formatea fecha en español
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Trunca texto con puntos suspensivos
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Convierte string a slug (URL friendly)
 * @param {string} text - Texto a convertir
 * @returns {string} - Slug generado
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
    .replace(/[\s_-]+/g, '-') // Convertir espacios a guiones
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio/final
};
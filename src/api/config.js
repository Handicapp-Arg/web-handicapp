/**
 * Configuración y constantes de la API
 * Centraliza todas las configuraciones relacionadas con la API
 */

/**
 * URLs base de diferentes servicios
 */
export const API_ENDPOINTS = {
  CONTACTS: '/web-contacts',
  NEWSLETTER: '/newsletter',
  FEEDBACK: '/feedback',
  // Agregar más endpoints aquí
};

/**
 * Códigos de estado HTTP comunes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

/**
 * Mensajes de error estándar
 */
export const API_ERRORS = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  SERVER_ERROR: 'Error del servidor. Intenta nuevamente.',
  TIMEOUT_ERROR: 'La petición ha tardado demasiado. Intenta nuevamente.',
  VALIDATION_ERROR: 'Los datos enviados no son válidos.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.'
};

/**
 * Configuración de timeouts y reintentos
 */
export const API_CONFIG = {
  DEFAULT_TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 segundo
  ENDPOINTS: API_ENDPOINTS,
  ERRORS: API_ERRORS
};

/**
 * Headers por defecto para todas las peticiones
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};
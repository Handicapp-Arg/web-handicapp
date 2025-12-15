/**
 * API de contactos - Endpoints relacionados con formularios de contacto
 * Maneja toda la comunicación con el backend para formularios
 */
import { API_ENDPOINTS, API_ERRORS, DEFAULT_HEADERS } from './config';

/**
 * Configuración base de la API
 */
const getApiBase = () => {
  const base = import.meta.env.VITE_API_URL;
  if (!base) {
    throw new Error("API URL no configurada en .env (VITE_API_URL)");
  }
  return base;
};

/**
 * Headers comunes para las peticiones
 */
const getCommonHeaders = () => DEFAULT_HEADERS;

/**
 * Manejo de errores de la API
 * @param {Response} response - Respuesta de fetch
 * @returns {Promise<Object>} - Datos parseados o error
 */
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Envía un formulario de contacto al backend
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.nombre - Nombre del contacto
 * @param {string} formData.email - Email del contacto  
 * @param {string} formData.mensaje - Mensaje del contacto
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export const postContactForm = async ({ nombre, email, mensaje }) => {
  const url = `${getApiBase()}${API_ENDPOINTS.CONTACTS}`;
  
  // Mapear los campos al formato esperado por el backend
  const requestBody = {
    name: nombre,
    email: email,
    message: mensaje,
    timestamp: new Date().toISOString(),
    source: 'web-form'
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getCommonHeaders(),
      body: JSON.stringify(requestBody),
    });

    return await handleApiResponse(response);
  } catch (err) {
    // Log del error para debugging
    console.error('Error en postContactForm:', err);
    
    // Re-lanzar con mensaje más específico
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error(API_ERRORS.NETWORK_ERROR);
    }
    
    throw new Error(err.message || API_ERRORS.SERVER_ERROR);
  }
};
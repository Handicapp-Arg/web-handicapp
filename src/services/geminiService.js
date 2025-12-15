/**
 * Gemini AI Service
 * Servicio centralizado para interactuar con la API de Google Gemini
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';

/**
 * Configuración de la API
 */
const getApiKey = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      'API Key no configurada. Por favor, agrega VITE_GEMINI_API_KEY en tu archivo .env'
    );
  }
  
  return apiKey;
};

/**
 * Construye la URL completa de la API con el API Key
 */
const buildApiUrl = () => {
  const apiKey = getApiKey();
  return `${GEMINI_API_URL}?key=${apiKey}`;
};

/**
 * Realiza una petición a la API de Gemini
 * @param {string} prompt - El prompt a enviar a Gemini
 * @returns {Promise<string>} - La respuesta generada por Gemini
 * @throws {Error} - Si hay un error en la comunicación con la API
 */
export const generateContent = async (prompt) => {
  try {
    const url = buildApiUrl();
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Manejar errores HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || 'Error desconocido';
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    // Parsear respuesta
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('La API no devolvió ninguna respuesta válida');
    }

    return text;
  } catch (error) {
    // Re-lanzar el error con contexto adicional
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Error de red: No se pudo conectar con la API de Gemini');
    }
    
    throw error;
  }
};

import { useState, useCallback } from 'react';
import { generateContent } from '../services/geminiService';
import { buildHandicappPrompt, ERROR_MESSAGES, validatePrompt } from '../utils/prompts';

/**
 * Hook personalizado para interactuar con Gemini AI
 * Maneja el estado, carga, errores y comunicación con la API
 * 
 * @param {string} knowledgeBase - Base de conocimiento de Handicapp
 * @returns {Object} Estado y funciones del chat
 */
export const useGeminiChat = (knowledgeBase) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Limpia el estado de error
   */
  const clearError = useCallback(() => {
    setError('');
  }, []);

  /**
   * Limpia toda la conversación
   */
  const clearConversation = useCallback(() => {
    setPrompt('');
    setResponse('');
    setError('');
  }, []);

  /**
   * Actualiza el prompt del usuario
   */
  const updatePrompt = useCallback((value) => {
    setPrompt(value);
    if (error) clearError();
  }, [error, clearError]);

  /**
   * Genera una respuesta usando Gemini AI
   */
  const generateResponse = useCallback(async () => {
    // Validación del prompt usando la nueva función
    const validation = validatePrompt(prompt);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    // Inicializar estado
    setLoading(true);
    setError('');
    setResponse('');

    try {
      // Construir el prompt completo
      const fullPrompt = buildHandicappPrompt(knowledgeBase, prompt);
      
      // Llamar a la API
      const result = await generateContent(fullPrompt);
      
      // Actualizar respuesta
      setResponse(result);
    } catch (err) {
      // Manejar diferentes tipos de errores
      console.error('Error en Gemini Chat:', err);
      
      if (err.message.includes('API Key')) {
        setError(ERROR_MESSAGES.NO_API_KEY);
      } else if (err.message.includes('red')) {
        setError(ERROR_MESSAGES.NETWORK_ERROR);
      } else {
        setError(err.message || ERROR_MESSAGES.API_ERROR);
      }
    } finally {
      setLoading(false);
    }
  }, [prompt, knowledgeBase]);

  /**
   * Maneja el submit del formulario
   */
  const handleSubmit = useCallback((e) => {
    if (e) {
      e.preventDefault();
    }
    generateResponse();
  }, [generateResponse]);

  return {
    // Estado
    prompt,
    response,
    loading,
    error,
    
    // Acciones
    updatePrompt,
    generateResponse,
    handleSubmit,
    clearError,
    clearConversation,
    
    // Utilidades
    hasResponse: !!response,
    hasError: !!error,
    isReady: !loading && !error
  };
};

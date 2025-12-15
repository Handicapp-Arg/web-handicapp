/**
 * Validaciones con Zod - Type-safe y robustas
 * Esquemas de validación para formularios y datos de la aplicación
 */
import { z } from 'zod';

// Esquemas de validación base
const emailSchema = z
  .string()
  .email('Email inválido')
  .min(1, 'El email es requerido');

const phoneSchema = z
  .string()
  .regex(
    /^(\+?54)?[\s\-]?9?[\s\-]?[1-9][0-9][\s\-]?[0-9]{4}[\s\-]?[0-9]{4}$/,
    'Formato de teléfono inválido (ej: 11 1234-5678)'
  );

const nameSchema = z
  .string()
  .min(1, 'El nombre es requerido')
  .min(2, 'El nombre debe tener al menos 2 caracteres')
  .max(50, 'El nombre no puede exceder 50 caracteres');

const messageSchema = z
  .string()
  .min(1, 'El mensaje es requerido')
  .min(10, 'El mensaje debe tener al menos 10 caracteres')
  .max(500, 'El mensaje no puede exceder 500 caracteres');

// Esquema para el formulario de contacto
export const contactFormSchema = z.object({
  nombre: nameSchema,
  email: emailSchema,
  mensaje: messageSchema,
  telefono: phoneSchema.optional(), // Campo opcional
});

// Esquema para prompts de IA
export const promptSchema = z
  .string()
  .min(1, 'Por favor, escribe una pregunta')
  .min(3, 'La pregunta debe tener al menos 3 caracteres')
  .max(500, 'La pregunta no puede exceder 500 caracteres')
  .transform(str => str.trim()); // Limpiar espacios automáticamente

// Esquema para configuración de usuario
export const userPreferencesSchema = z.object({
  language: z.enum(['es', 'en', 'de'], {
    errorMap: () => ({ message: 'Idioma no soportado' })
  }),
  theme: z.enum(['dark', 'light'], {
    errorMap: () => ({ message: 'Tema no soportado' })
  }).default('dark'),
  notifications: z.boolean().default(true),
});

/**
 * Funciones de validación que usan los esquemas de Zod
 */

/**
 * Valida formato de email usando Zod
 * @param {string} email - Email a validar
 * @returns {Object} - {success: boolean, error?: string}
 */
export const validateEmail = (email) => {
  try {
    emailSchema.parse(email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors[0]?.message };
  }
};

/**
 * Valida teléfono argentino usando Zod
 * @param {string} phone - Teléfono a validar
 * @returns {Object} - {success: boolean, error?: string}
 */
export const validatePhone = (phone) => {
  try {
    phoneSchema.parse(phone);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors[0]?.message };
  }
};

/**
 * Valida formulario de contacto completo con Zod
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - {success: boolean, data?: Object, errors?: Object}
 */
export const validateContactForm = (formData) => {
  try {
    const validData = contactFormSchema.parse(formData);
    return { success: true, data: validData };
  } catch (error) {
    const fieldErrors = {};
    error.errors.forEach(err => {
      const field = err.path[0];
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = err.message;
      }
    });
    return { success: false, errors: fieldErrors };
  }
};

/**
 * Valida prompt para IA con Zod
 * @param {string} prompt - Prompt a validar
 * @returns {Object} - {success: boolean, data?: string, error?: string}
 */
export const validatePrompt = (prompt) => {
  try {
    const validPrompt = promptSchema.parse(prompt);
    return { success: true, data: validPrompt };
  } catch (error) {
    return { success: false, error: error.errors[0]?.message };
  }
};

/**
 * Valida preferencias de usuario con Zod
 * @param {Object} preferences - Preferencias a validar
 * @returns {Object} - {success: boolean, data?: Object, errors?: Object}
 */
export const validateUserPreferences = (preferences) => {
  try {
    const validPrefs = userPreferencesSchema.parse(preferences);
    return { success: true, data: validPrefs };
  } catch (error) {
    const fieldErrors = {};
    error.errors.forEach(err => {
      const field = err.path[0];
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = err.message;
      }
    });
    return { success: false, errors: fieldErrors };
  }
};

// Exportar esquemas para uso directo si es necesario
export const schemas = {
  contactForm: contactFormSchema,
  prompt: promptSchema,
  userPreferences: userPreferencesSchema,
  email: emailSchema,
  phone: phoneSchema,
  name: nameSchema,
  message: messageSchema,
};
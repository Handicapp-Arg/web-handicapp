import { useState, useCallback } from 'react';
import { validateContactForm } from '../utils/validators';

/**
 * Hook personalizado para validación de formularios con Zod
 * Proporciona estado de validación y funciones para manejar errores
 */
const useFormValidation = (initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  /**
   * Actualiza un campo del formulario
   */
  const updateField = useCallback((fieldName, value) => {
    setData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [errors]);

  /**
   * Valida todo el formulario
   */
  const validateForm = useCallback(() => {
    const result = validateContactForm(data);
    
    if (result.success) {
      setErrors({});
      setIsValid(true);
      return { success: true, data: result.data };
    } else {
      setErrors(result.errors || {});
      setIsValid(false);
      return { success: false, errors: result.errors };
    }
  }, [data]);

  /**
   * Valida un campo específico
   */
  const validateField = useCallback((fieldName) => {
    const fieldValue = data[fieldName];
    const tempData = { ...data };
    
    // Validar solo si el campo tiene contenido o ya tiene error
    if (fieldValue || errors[fieldName]) {
      const result = validateContactForm(tempData);
      
      if (!result.success && result.errors && result.errors[fieldName]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: result.errors[fieldName]
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    }
  }, [data, errors]);

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = useCallback(async (submitFunction) => {
    setIsSubmitting(true);
    
    const validation = validateForm();
    
    if (validation.success) {
      try {
        await submitFunction(validation.data);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    } else {
      return { success: false, errors: validation.errors };
    }
    
    setIsSubmitting(false);
  }, [validateForm]);

  /**
   * Resetea el formulario
   */
  const resetForm = useCallback(() => {
    setData(initialData);
    setErrors({});
    setIsValid(false);
    setIsSubmitting(false);
  }, [initialData]);

  /**
   * Verifica si un campo tiene error
   */
  const hasError = useCallback((fieldName) => {
    return !!errors[fieldName];
  }, [errors]);

  /**
   * Obtiene el mensaje de error de un campo
   */
  const getError = useCallback((fieldName) => {
    return errors[fieldName] || '';
  }, [errors]);

  return {
    // Estado
    data,
    errors,
    isSubmitting,
    isValid,
    
    // Funciones
    updateField,
    validateForm,
    validateField,
    handleSubmit,
    resetForm,
    hasError,
    getError,
    
    // Helpers
    canSubmit: isValid && !isSubmitting,
    hasAnyErrors: Object.keys(errors).length > 0
  };
};

export default useFormValidation;
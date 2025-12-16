import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { postContactForm } from "../api";
import useFormValidation from "../hooks/useFormValidation";

const ContactForm = React.memo(({ t, theme }) => {
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, loading, success, error
  const [submitError, setSubmitError] = useState("");
  
  // Usar el hook de validación con Zod
  const {
    data: form,
    updateField,
    validateForm,
    validateField,
    hasError,
    getError,
    canSubmit,
    resetForm,
    isSubmitting
  } = useFormValidation({ 
    nombre: "", 
    email: "", 
    mensaje: "" 
  });

  // Memoizar el handler de cambios
  const handleChange = useCallback((e) => {
    updateField(e.target.name, e.target.value);
  }, [updateField]);

  // Memoizar el handler de blur
  const handleBlur = useCallback((e) => {
    validateField(e.target.name);
  }, [validateField]);

  // Memoizar el handler de submit
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validar formulario antes de enviar
    const validation = validateForm();
    if (!validation.success) {
      return; // Los errores ya están mostrados por el hook
    }

    setSubmitStatus("loading");
    setSubmitError("");
    
    try {
      await postContactForm(validation.data);
      setSubmitStatus("success");
      resetForm(); // Limpiar formulario al enviar exitosamente
      
      // Volver al estado inicial después de 3 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err.message || "Error al enviar el formulario");
    }
  }, [validateForm, resetForm]);

  return (
    <section id="contact" className={`scroll-mt-24 py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 relative overflow-hidden border-t ${theme.border}`}>
      <div className={`absolute inset-0 opacity-10 ${theme.accentBg} blur-[150px] sm:blur-[200px]`}></div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 relative z-10 items-center">
        <div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-6 sm:mb-8 md:mb-10 leading-[0.9] ${theme.text}`}>
            {t.contact.title}
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${theme.textMuted}`}>{t.contact.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className={`p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] border ${theme.glass} space-y-4 sm:space-y-6`}>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.name}</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base transition-colors ${hasError('nombre') ? 'border-red-500 focus:border-red-500' : `${theme.border} focus:border-current`}`}
              placeholder=""
            />
            {hasError('nombre') && (
              <p className="text-red-500 text-xs mt-1">{getError('nombre')}</p>
            )}
          </div>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.email}</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base transition-colors ${hasError('email') ? 'border-red-500 focus:border-red-500' : `${theme.border} focus:border-current`}`}
              placeholder=""
            />
            {hasError('email') && (
              <p className="text-red-500 text-xs mt-1">{getError('email')}</p>
            )}
          </div>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.msg}</label>
            <textarea
              name="mensaje"
              rows={4}
              value={form.mensaje}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base transition-colors resize-none ${hasError('mensaje') ? 'border-red-500 focus:border-red-500' : `${theme.border} focus:border-current`}`}
              placeholder=""
            />
            {hasError('mensaje') && (
              <p className="text-red-500 text-xs mt-1">{getError('mensaje')}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={submitStatus === "loading" || !canSubmit || isSubmitting}
            className={`w-full py-4 sm:py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm sm:text-base ${
              submitStatus === "success"
                ? "bg-green-500 text-white"
                : submitStatus === "loading" || !canSubmit
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {submitStatus === "loading" || isSubmitting
              ? <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
              : submitStatus === "success"
              ? t.contact.success
              : t.contact.btn}
          </button>
          
          {/* Mensaje de éxito */}
          {submitStatus === "success" && (
            <div className="text-center p-4 border border-green-500 rounded-lg bg-green-50/10">
              <div className="text-green-500 font-semibold text-sm">
                ✅ {t.contact.success}
              </div>
              <div className="text-green-400 text-xs mt-1">
                Te contactaremos pronto
              </div>
            </div>
          )}
          
          {/* Mensaje de error */}
          {submitError && (
            <div className="text-center p-4 border border-red-500 rounded-lg bg-red-50/10">
              <div className="text-red-500 font-semibold text-sm">
                ❌ Error al enviar
              </div>
              <div className="text-red-400 text-xs mt-1">
                {submitError}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
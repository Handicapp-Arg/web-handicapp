import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Smartphone, Network, BellRing, Radio, Cpu, User } from "lucide-react";

const VerticalWorkflow = React.memo(({ t, theme }) => {
  // Memoizar las URLs de imágenes para evitar re-creación
  const stepImages = useMemo(() => [
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765640273/handicapp/uploads/0T1A5784.webp",  // Paso 1: Sube Tu Información
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765579209/orejitas_serqac.jpg",  // Paso 2: Automatiza Tu Operación (nuevo link)
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1763217620/handicapp/uploads/caballo.webp" // Paso 3: Toma Mejores Decisiones
  ], []);

  // Precarga de imágenes pesadas al cargar la app - memoizada
  useEffect(() => {
    stepImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [stepImages]);

  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  // Memoizar el callback del intersection observer
  const handleIntersection = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveStep(parseInt(entry.target.getAttribute('data-index')));
      }
    });
  }, []); // Sin dependencias para evitar el ciclo
  
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.3 }); // Más sensible, responde antes
    stepsRef.current.forEach(step => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, [handleIntersection]);
  
  // Memoizar los pasos del workflow
  const steps = useMemo(() => [
    { title: t.workflow.step1_t, desc: t.workflow.step1_d, icon: Smartphone, id: 0 },
    { title: t.workflow.step2_t, desc: t.workflow.step2_d, icon: Network, id: 1 },
    { title: t.workflow.step3_t, desc: t.workflow.step3_d, icon: BellRing, id: 2 }
  ], [t.workflow]);
  
  return (
    <section id="workflow" className="scroll-mt-24 py-24 relative bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-black mb-24 text-center ${theme.text}`}>{t.workflow.title}</h2>
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2 hidden md:block">
            <div className="sticky top-32 h-[500px] w-full">
              <div className="relative w-full h-full rounded-[2.5rem] border-2 overflow-hidden shadow-2xl border-zinc-800/50 bg-zinc-900/20">
                {/* Imagen de fondo con transición */}
                {stepImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      activeStep === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Paso ${index + 1}`}
                      className="w-full h-full object-cover will-change-transform"
                      loading={index <= 1 ? "eager" : "lazy"}
                      decoding="async"
                      fetchpriority={index <= 1 ? "high" : "low"}
                      style={{transition: 'opacity 0.7s', opacity: activeStep === index ? 1 : 0}}
                    />
                    {/* Overlay oscuro para mejor legibilidad */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
                  </div>
                ))}
                {/* Contenido sobre la imagen */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                  <div className={`mb-8 p-8 rounded-full border-2 bg-[#0f172a]/80 backdrop-blur-sm transition-all duration-500 transform border-zinc-700/50 ${
                    activeStep === 0 ? 'scale-100 rotate-0' : activeStep === 1 ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
                  }`}>
                    {activeStep === 0 && <Radio size={64} className="animate-pulse text-[#af936f]" />}
                    {activeStep === 1 && <Cpu size={64} className="text-[#af936f]" />}
                    {activeStep === 2 && <User size={64} className="text-white" />}
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-widest drop-shadow-lg text-white">
                    {activeStep === 0 ? "ORGANIZA" : activeStep === 1 ? "AUTOMATIZA" : "OPTIMIZA"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* Espaciado vertical aún más amplio y sin scroll interno */}
          <div className="md:w-1/2 space-y-96 py-40">
            {steps.map((step, i) => (
              <div 
                key={i} 
                data-index={i} 
                ref={el => stepsRef.current[i] = el} 
                className={`transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-10'}`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${theme.accentBg} text-white`}>
                  <step.icon size={32} />
                </div>
                <h3 className={`text-4xl font-bold mb-4 ${theme.text}`}>{step.title}</h3>
                <p className={`text-xl leading-relaxed ${theme.textMuted}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

VerticalWorkflow.displayName = 'VerticalWorkflow';

export default VerticalWorkflow;
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
  const [activeStepMobile, setActiveStepMobile] = useState(0);
  const stepsRefDesktop = useRef([]);
  const stepsRefMobile = useRef([]);

  // Intersection observer para desktop
  const handleIntersectionDesktop = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveStep(parseInt(entry.target.getAttribute('data-index')));
      }
    });
  }, []);
  
  // Intersection observer para móvil
  const handleIntersectionMobile = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveStepMobile(parseInt(entry.target.getAttribute('data-index')));
      }
    });
  }, []);
  
  useEffect(() => {
    const observerDesktop = new IntersectionObserver(handleIntersectionDesktop, { threshold: 0.3 });
    const observerMobile = new IntersectionObserver(handleIntersectionMobile, { threshold: 0.3 });
    
    stepsRefDesktop.current.forEach(step => { if (step) observerDesktop.observe(step); });
    stepsRefMobile.current.forEach(step => { if (step) observerMobile.observe(step); });
    
    return () => {
      observerDesktop.disconnect();
      observerMobile.disconnect();
    };
  }, [handleIntersectionDesktop, handleIntersectionMobile]);
  
  // Memoizar los pasos del workflow
  const steps = useMemo(() => [
    { title: t.workflow.step1_t, desc: t.workflow.step1_d, icon: Smartphone, id: 0 },
    { title: t.workflow.step2_t, desc: t.workflow.step2_d, icon: Network, id: 1 },
    { title: t.workflow.step3_t, desc: t.workflow.step3_d, icon: BellRing, id: 2 }
  ], [t.workflow]);
  
  return (
    <section id="workflow" className="scroll-mt-24 py-16 md:py-24 relative bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`text-3xl sm:text-4xl md:text-6xl font-black mb-12 md:mb-24 text-center ${theme.text}`}>{t.workflow.title}</h2>
        
        {/* Layout Desktop: Imagen sticky + texto con scroll */}
        <div className="hidden md:flex flex-row gap-20">
          <div className="md:w-1/2">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
                  </div>
                ))}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                  <div className={`mb-8 p-8 rounded-full border-2 bg-[#0f172a]/80 backdrop-blur-sm transition-all duration-500 transform border-zinc-700/50 ${
                    activeStep === 0 ? 'scale-100 rotate-0' : activeStep === 1 ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
                  }`}>
                    {activeStep === 0 && <Radio size={64} className="animate-pulse text-[#af936f]" />}
                    {activeStep === 1 && <Cpu size={64} className="text-[#af936f]" />}
                    {activeStep === 2 && <User size={64} className="text-white" />}
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-widest drop-shadow-lg text-white">
                    {activeStep === 0 ? t.workflow.step1_label : activeStep === 1 ? t.workflow.step2_label : t.workflow.step3_label}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-96 py-40">
            {steps.map((step, i) => (
              <div 
                key={i} 
                data-index={i} 
                ref={el => stepsRefDesktop.current[i] = el} 
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

        {/* Layout Móvil: Cards individuales con imagen, icono y texto juntos */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <div 
              key={i}
              data-index={i} 
              ref={el => stepsRefMobile.current[i] = el}
              className={`relative rounded-2xl border-2 overflow-hidden shadow-2xl border-zinc-800/50 bg-zinc-900/20 transition-all duration-500 ${
                activeStepMobile === i ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-4'
              }`}
            >
              {/* Imagen de fondo */}
              <div className="relative h-[400px] w-full">
                <img 
                  src={stepImages[i]} 
                  alt={`Paso ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
                
                {/* Contenido sobre la imagen */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                  {/* Icono animado */}
                  <div className={`mb-4 p-4 rounded-full border-2 bg-[#0f172a]/90 backdrop-blur-sm w-fit border-zinc-700/50`}>
                    {i === 0 && <Radio size={32} className="animate-pulse text-[#af936f]" />}
                    {i === 1 && <Cpu size={32} className="text-[#af936f]" />}
                    {i === 2 && <User size={32} className="text-white" />}
                  </div>
                  
                  {/* Label superior */}
                  <p className="text-sm font-black mb-2 uppercase tracking-wider text-[#af936f]">
                    {i === 0 ? t.workflow.step1_label : i === 1 ? t.workflow.step2_label : t.workflow.step3_label}
                  </p>
                  
                  {/* Título */}
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                    {step.title}
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-sm sm:text-base leading-relaxed text-white/80">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

VerticalWorkflow.displayName = 'VerticalWorkflow';

export default VerticalWorkflow;
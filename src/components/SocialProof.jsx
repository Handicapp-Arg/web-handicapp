import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

/**
 * SocialProof - Sección de validación social con testimonios y logos de partners
 * @param {Object} t - Objeto de traducciones
 * @param {Object} theme - Configuración del tema
 * @param {Object} assets - Assets y medios de la aplicación
 */
const SocialProof = ({ t, theme, assets }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "Handicapp transformó nuestra operación. Dejamos de perder tiempo en papeles.",
      author: "Roberto Álvarez",
      position: "Director - Haras El Paraíso"
    },
    {
      quote: "La IA predictiva nos ayudó a mejorar el rendimiento de nuestros caballos en un 40%. Increíble.",
      author: "Carolina Méndez",
      position: "Gerente de Operaciones - Hipódromo de San Isidro"
    },
    {
      quote: "Desde que usamos Handicapp, toda nuestra gestión es digital. Ahorramos costos y ganamos eficiencia.",
      author: "Adolfo Cambiaso",
      position: "Fundador - La Dolfina Polo Team"
    },
    {
      quote: "El sistema de gestión integral nos permite tener control total de nuestros ejemplares. Es el futuro del turf.",
      author: "Martín Petrini",
      position: "Director Técnico - Stud Abolengo"
    }
  ];
  
  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className={`py-16 sm:py-20 md:py-24 lg:py-32 border-y overflow-hidden relative bg-[#1e293b]/20 border-[#af936f]/20`}>
      {/* Decoración de fondo */}
      <div className={`absolute inset-0 opacity-5`}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#af936f] rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 md:mb-24 text-center relative z-10">
        <p className={`text-xs sm:text-sm font-black tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme.accent}`}>{t.trust.title}</p>
        <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black ${theme.text} px-4 max-w-5xl mx-auto leading-tight`}>
          {t.trust.desc.split('.')[0].toUpperCase()}
        </h3>
      </div>
      
      {/* Logos carousel infinito sin espacios */}
      <div className="flex overflow-hidden relative mb-16 sm:mb-20 md:mb-24">
        {/* Primera fila - scroll hacia la izquierda */}
        <div className="flex gap-12 sm:gap-16 md:gap-20 lg:gap-24 animate-marquee whitespace-nowrap py-4">
          {[...assets.logos, ...assets.logos, ...assets.logos, ...assets.logos, ...assets.logos, ...assets.logos].map((logo, i) => {
            const isHipodromoLogo = logo.includes('logo.png');
            return (
              <div key={i} className="flex items-center justify-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0">
                <img 
                  src={logo} 
                  alt="Partner" 
                  className={`h-full w-auto object-contain transition-all duration-300 ${
                    isHipodromoLogo
                      ? 'grayscale brightness-150 opacity-60 hover:opacity-90 hover:brightness-200'
                      : 'brightness-0 invert opacity-50 hover:opacity-90'
                  }`} 
                />
              </div>
            );
          })}
        </div>
        {/* Duplicado para seamless loop */}
        <div className="flex gap-12 sm:gap-16 md:gap-20 lg:gap-24 animate-marquee whitespace-nowrap py-4" aria-hidden="true">
          {[...assets.logos, ...assets.logos, ...assets.logos, ...assets.logos, ...assets.logos, ...assets.logos].map((logo, i) => {
            const isHipodromoLogo = logo.includes('logo.png');
            return (
              <div key={`dup-${i}`} className="flex items-center justify-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0">
                <img 
                  src={logo} 
                  alt="Partner" 
                  className={`h-full w-auto object-contain transition-all duration-300 ${
                    isHipodromoLogo
                      ? 'grayscale brightness-150 opacity-60 hover:opacity-90 hover:brightness-200'
                      : 'brightness-0 invert opacity-50 hover:opacity-90'
                  }`} 
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Testimonial carousel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`px-10 py-16 sm:px-16 sm:py-20 md:px-20 md:py-24 lg:px-24 lg:py-20 rounded-[2.5rem] border-2 text-center relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-[#af936f]/30 shadow-2xl`}>
          {/* Icono de estrella flotante - centro superpuesto exactamente en el borde superior */}
          <div className={`absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full ${theme.accentBg} flex items-center justify-center text-white shadow-2xl z-20`}>
            <Star fill="currentColor" size={24} className="sm:w-8 sm:h-8" />
          </div>
          {/* Testimonial content */}
          <div className="relative min-h-[200px] sm:min-h-[180px] md:min-h-[160px] flex flex-col items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                  currentTestimonial === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-medium italic mb-6 leading-relaxed px-4 lg:px-8 ${theme.text}`}>
                  "{testimonial.quote}"
                </p>
                
                {/* Divider dorado */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className={`h-px w-16 ${theme.accentBg}`}></div>
                  <div className={`w-2 h-2 rounded-full ${theme.accentBg}`}></div>
                  <div className={`h-px w-16 ${theme.accentBg}`}></div>
                </div>
                
                <p className={`text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase ${theme.accent} px-4`}>
                  {testimonial.author}, {testimonial.position}
                </p>
              </div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 md:mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? `${theme.accentBg} w-8 sm:w-10 lg:w-12` 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
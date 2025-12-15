import { useState, useEffect } from "react";
import { User, HeartPulse, Target, Building2, ChevronLeft, ChevronRight } from "lucide-react";

const RoleSelector = ({ t, theme }) => {
  const [activeRole, setActiveRole] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const roles = [
    { title: t.roles.r1, desc: t.roles.r1_d, icon: User },
    { title: t.roles.r2, desc: t.roles.r2_d, icon: HeartPulse },
    { title: t.roles.r3, desc: t.roles.r3_d, icon: Target },
    { title: t.roles.r4, desc: t.roles.r4_d, icon: Building2 }
  ];

  // Autoplay del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, roles.length]);

  const nextRole = () => {
    setIsAutoPlaying(false);
    setActiveRole((prev) => (prev + 1) % roles.length);
  };

  const prevRole = () => {
    setIsAutoPlaying(false);
    setActiveRole((prev) => (prev - 1 + roles.length) % roles.length);
  };

  const goToRole = (index) => {
    setIsAutoPlaying(false);
    setActiveRole(index);
  };

  return (
    <section className="py-24 relative z-10 px-6 bg-[#1e293b]/30">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl md:text-6xl font-black mb-20 text-center ${theme.text}`}>{t.roles.title}</h2>
        
        {/* Carrusel */}
        <div className="relative">
          {/* Contenedor del carrusel */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeRole * 100}%)` }}
            >
              {roles.map((role, i) => (
                <div 
                  key={i}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="p-12 md:p-16 rounded-3xl border-2 min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-[#af936f]/30 shadow-2xl hover:shadow-[0_0_60px_-15px_rgba(175,147,111,0.4)] transition-all duration-500">
                    {/* Efecto de brillo sutil */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#af936f]/5 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${theme.accentBg} text-white shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                      <role.icon size={40} strokeWidth={2.5} />
                    </div>
                    <h3 className={`text-4xl md:text-5xl font-black mb-6 relative ${theme.text}`}>{role.title}</h3>
                    <p className={`text-lg md:text-xl leading-relaxed max-w-2xl relative ${theme.textMuted}`}>{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación mejorados */}
          <button 
            onClick={prevRole}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 rounded-full ${theme.accentBg} text-white flex items-center justify-center hover:scale-110 hover:${theme.accentHover} transition-all shadow-2xl z-10`}
            aria-label="Anterior"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          <button 
            onClick={nextRole}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 rounded-full ${theme.accentBg} text-white flex items-center justify-center hover:scale-110 hover:${theme.accentHover} transition-all shadow-2xl z-10`}
            aria-label="Siguiente"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Indicadores mejorados */}
        <div className="flex justify-center gap-3 mt-8">
          {roles.map((_, i) => (
            <button
              key={i}
              onClick={() => goToRole(i)}
              className={`h-2.5 rounded-full transition-all duration-300 hover:scale-110 ${
                i === activeRole 
                  ? `w-12 ${theme.accentBg} shadow-lg` 
                  : 'w-2.5 bg-zinc-600 hover:bg-zinc-500'
              }`}
              aria-label={`Ir al rol ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleSelector;
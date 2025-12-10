import React from 'react';

const Hero = ({ t, theme, isDark, ASSETS }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img src={ASSETS.heroHorse} className="w-full h-full object-cover grayscale scale-105 animate-[pulse_10s_ease-in-out_infinite]" alt="Hero" />
      </div>
      <div className={`absolute inset-0 z-0 bg-gradient-to-t ${isDark ? 'from-[#050505] via-[#050505]/80' : 'from-[#F4F4F5] via-[#F4F4F5]/80'} to-transparent`}></div>
      <div className="relative z-10 text-center px-6 max-w-7xl">
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 border ${theme.glass} shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000`}>
          <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${theme.accentBg}`}></span>
          <span className="text-[11px] font-black tracking-[0.25em]">{t.hero.pill}</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] leading-[0.85] font-black tracking-tighter mb-8 md:mb-12 animate-in fade-in zoom-in duration-1000 delay-100">
          <span className="block  bg-clip-text bg-gradient-to-b from-current to-transparent opacity-90">{t.hero.line1}</span>
          <span className={`block ${theme.accent}`}>{t.hero.line2}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl max-w-4xl mx-auto mb-12 md:mb-16 opacity-70 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {t.hero.desc}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <a 
            href="https://www.handicapp.com.ar/login" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-[#c9a96e] via-[#af936f] to-[#c9a96e] text-white shadow-[0_0_20px_rgba(175,147,111,0.3)] hover:shadow-[0_0_35px_rgba(175,147,111,0.5)] bg-[length:200%_100%] hover:bg-[position:100%_0] animate-shimmer overflow-hidden"
          >
            {/* Efecto de brillo animado */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
            <span className="relative z-10">{t.hero.cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

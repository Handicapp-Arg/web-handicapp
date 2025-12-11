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
          <span className={`text-[11px] font-black tracking-[0.25em] ${theme.text}`}>{t.hero.pill}</span>
        </div>
        <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 md:mb-12 animate-in fade-in zoom-in duration-1000 delay-100 leading-[0.9] ${theme.text}`}>
          <span className="block bg-clip-text bg-gradient-to-b from-current to-transparent opacity-90">{t.hero.line1}</span>
          <span className={`block ${theme.accent}`}>{t.hero.line2}</span>
        </h1>
        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 ${theme.textMuted}`}>
          {t.hero.desc}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <a 
            href="https://www.handicapp.com.ar/login" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative px-10 py-5 rounded-full font-black text-base uppercase tracking-widest transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-[#c9a96e] via-[#af936f] to-[#c9a96e] text-white shadow-[0_0_30px_rgba(175,147,111,0.4)] hover:shadow-[0_0_50px_rgba(175,147,111,0.6)] bg-[length:200%_100%] hover:bg-[position:100%_0] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
            <span className="relative z-10 flex items-center gap-3">
              {t.hero.cta}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

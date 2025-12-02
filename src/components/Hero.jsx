import React from 'react';
import { MousePointer2, Play } from 'lucide-react';

const Hero = ({ t, theme, isDark, ASSETS, onVideoOpen }) => {
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
        <h1 className="text-7xl md:text-[10rem] lg:text-[11rem] leading-[0.8] font-black tracking-tighter mb-12 animate-in fade-in zoom-in duration-1000 delay-100">
          <span className="block  bg-clip-text bg-gradient-to-b from-current to-transparent opacity-90">{t.hero.line1}</span>
          <span className={`block ${theme.accent}`}>{t.hero.line2}</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-16 opacity-70 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {t.hero.desc}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <a href="https://www.handicapp.com.ar/login" target="_blank" rel="noopener noreferrer" className={`px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_0_40px_-10px] transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-[#D1F366] text-black shadow-[#D1F366]/40' : 'bg-[#4F46E5] text-white shadow-[#4F46E5]/40'}`}>
            {t.hero.cta}
          </a>
          <button onClick={onVideoOpen} className={`group px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest border-2 transition-all hover:bg-current hover:text-transparent hover:bg-clip-text flex items-center justify-center gap-3 ${theme.border}`}>
            <Play size={18} fill="currentColor" className={`transition-transform group-hover:scale-110 ${theme.accent}`} /> {t.hero.video}
          </button>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <MousePointer2 size={28} />
      </div>
    </section>
  );
};

export default Hero;

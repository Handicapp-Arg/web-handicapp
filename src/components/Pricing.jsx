import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Pricing = ({ t, theme, isDark }) => {
  return (
    <section id="pricing" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black mb-6 tracking-tight">{t.pricing.title}</h2>
          <div className={`inline-flex items-center gap-4 p-2 pr-6 rounded-full border ${theme.glass}`}>
            <div className={`px-4 py-2 rounded-full text-xs font-bold ${isDark ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-black'}`}>
              {t.pricing.monthly}
            </div>
            <span className="text-sm font-bold opacity-50">{t.pricing.yearly} (-20%)</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.pricing.plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-[2rem] border transition-all duration-500 hover:-translate-y-4 ${theme.glass} ${i === 1 ? (isDark ? 'border-[#D1F366] shadow-[0_0_50px_-20px_rgba(209,243,102,0.3)]' : 'border-[#4F46E5] shadow-[0_0_50px_-20px_rgba(79,70,229,0.3)]') : ''}`}
            >
              {i === 1 && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-[#D1F366] text-black' : 'bg-[#4F46E5] text-white'}`}>
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-6xl font-black">${plan.price}</span>
                <span className="text-sm opacity-60">/mo</span>
              </div>
              <ul className="space-y-5 mb-12">
                {plan.feat.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-medium opacity-80">
                    <CheckCircle2 size={18} className={theme.accent} /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors ${i===1 ? (isDark ? 'bg-[#D1F366] text-black hover:bg-white' : 'bg-[#4F46E5] text-white hover:bg-black') : `border ${theme.border} hover:bg-current hover:text-transparent hover:bg-clip-text`}`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

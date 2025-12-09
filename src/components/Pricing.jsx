import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const Pricing = ({ t, theme, isDark }) => {
  const [isYearly, setIsYearly] = useState(false);
  
  const calculatePrice = (monthlyPrice) => {
    if (isYearly) {
      const yearlyTotal = monthlyPrice * 12 * 0.8; // 20% discount
      return Math.round(yearlyTotal / 12);
    }
    return monthlyPrice;
  };

  return (
    <section id="pricing" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black mb-6 tracking-tight">{t.pricing.title}</h2>
          
          {/* Toggle Switch Funcional */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-4">
              <span className={`text-sm font-bold transition-colors ${!isYearly ? (isDark ? 'text-white' : 'text-zinc-900') : 'opacity-50'}`}>
                {t.pricing.monthly}
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                  isYearly ? 'bg-gradient-to-r from-[#c9a96e] to-[#af936f]' : isDark ? 'bg-zinc-700' : 'bg-zinc-300'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300 ${
                  isYearly ? 'translate-x-9' : 'translate-x-1'
                }`} />
              </button>
              <span className={`text-sm font-bold transition-colors ${isYearly ? (isDark ? 'text-white' : 'text-zinc-900') : 'opacity-50'}`}>
                {t.pricing.yearly}
              </span>
            </div>
            {isYearly && (
              <div className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wider animate-pulse">
                Ahorra 20%
              </div>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.pricing.plans.map((plan, i) => {
            const monthlyPrice = parseInt(plan.price);
            const displayPrice = calculatePrice(monthlyPrice);
            
            return (
              <div 
                key={i} 
                className={`relative p-10 rounded-[2rem] border-2 transition-all duration-500 hover:-translate-y-4 ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]' 
                    : 'bg-white'
                } ${
                  i === 1 
                    ? 'border-[#af936f] shadow-[0_0_50px_-20px_rgba(175,147,111,0.4)]' 
                    : isDark ? 'border-zinc-700' : 'border-zinc-200'
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#c9a96e] to-[#af936f] text-white shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-black transition-all duration-500">${displayPrice}</span>
                  <div className="flex flex-col">
                    <span className="text-sm opacity-60">/mo</span>
                    {isYearly && (
                      <span className="text-xs opacity-40 line-through">${monthlyPrice}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-5 mb-12">
                  {plan.feat.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium opacity-80">
                      <CheckCircle2 size={18} className={theme.accent} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 ${
                  i === 1 
                    ? 'bg-gradient-to-r from-[#c9a96e] to-[#af936f] text-white shadow-lg hover:shadow-[0_0_30px_rgba(175,147,111,0.6)]' 
                    : `border-2 ${isDark ? 'border-[#af936f] hover:bg-[#af936f]/10' : 'border-[#af936f] hover:bg-[#af936f]/5'} ${theme.accent}`
                }`}>
                  Choose {plan.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

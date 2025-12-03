import React, { useState } from 'react';
import { CheckCircle2, Crown } from 'lucide-react';

const Pricing = ({ t, theme, isDark }) => {
  const [isYearly, setIsYearly] = useState(false);
  
  const calculatePrice = (monthlyPrice) => {
    if (isYearly) {
      const yearlyTotal = monthlyPrice * 12 * 0.8; // 20% discount
      return Math.round(yearlyTotal / 12);
    }
    return monthlyPrice;
  };

  const getSavings = (monthlyPrice) => {
    const monthlyCost = monthlyPrice * 12;
    const yearlyCost = monthlyPrice * 12 * 0.8;
    return Math.round(monthlyCost - yearlyCost);
  };

  return (
    <section id="pricing" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-6xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {t.pricing.title}
          </h2>
          <p className={`text-lg mb-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.pricing.subtitle}
          </p>
          
          {/* Toggle Switch Mejorado */}
          <div className="inline-flex items-center gap-4 relative">
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
            {isYearly && (
              <div className="absolute -right-32 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wider animate-pulse">
                -20% OFF
              </div>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.pricing.plans.map((plan, i) => {
            const monthlyPrice = parseInt(plan.price);
            const displayPrice = calculatePrice(monthlyPrice);
            const savings = getSavings(monthlyPrice);
            
            return (
              <div 
                key={i} 
                className={`relative p-10 rounded-[2rem] border-2 transition-all duration-500 hover:-translate-y-4 group ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]' 
                    : 'bg-white'
                } ${
                  i === 1 
                    ? 'border-[#af936f] shadow-[0_0_50px_-20px_rgba(175,147,111,0.4)] scale-105' 
                    : isDark ? 'border-zinc-700 hover:border-zinc-600' : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {/* Popular Badge */}
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-[#c9a96e] to-[#af936f] text-white shadow-lg flex items-center gap-1">
                    <Crown size={12} />
                    Most Popular
                  </div>
                )}

                {/* Savings Badge */}
                {isYearly && (
                  <div className="absolute -top-4 right-6 px-3 py-1 rounded-full text-[10px] font-bold bg-green-500 text-white">
                    {t.pricing.saveLabel} ${savings}
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {plan.name}
                </h3>
                
                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className={`text-6xl font-black transition-all duration-500 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    ${displayPrice}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm opacity-60">/{isYearly ? 'mo' : 'mo'}</span>
                    {isYearly && (
                      <span className="text-xs opacity-40 line-through">${monthlyPrice}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-12">
                  {plan.feat.map((f, j) => (
                    <li key={j} className={`flex items-start gap-3 text-sm font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      <CheckCircle2 size={18} className={`${theme.accent} flex-shrink-0 mt-0.5`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 ${
                  i === 1 
                    ? 'bg-gradient-to-r from-[#c9a96e] to-[#af936f] text-white shadow-lg hover:shadow-[0_0_30px_rgba(175,147,111,0.6)]' 
                    : `border-2 ${isDark ? 'border-[#af936f] hover:bg-[#af936f]/10' : 'border-[#af936f] hover:bg-[#af936f]/5'} ${theme.accent}`
                }`}>
                  {t.pricing.chooseBtn} {plan.name}
                </button>

                {/* Hover Effect Glow */}
                {i === 1 && (
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#af936f]/0 to-[#af936f]/0 group-hover:from-[#af936f]/10 group-hover:to-[#af936f]/5 transition-all duration-500 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* All Plans Include Section */}
        <div className={`mt-20 p-8 rounded-[2rem] border text-center ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {t.pricing.allPlansInclude}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.pricing.feature1}
            </div>
            <div className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.pricing.feature2}
            </div>
            <div className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {t.pricing.feature3}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

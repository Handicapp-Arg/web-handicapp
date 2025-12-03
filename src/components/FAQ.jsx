import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Sparkles } from 'lucide-react';

const FAQ = ({ t, isDark, theme }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  // FAQ extendido con más preguntas
  const faqItems = [
    { q: t.faq.q1, a: t.faq.a1, category: 'general' },
    { q: t.faq.q2, a: t.faq.a2, category: 'technical' },
    { q: t.faq.q3, a: t.faq.a3, category: 'security' },
    { q: t.faq.q4, a: t.faq.a4, category: 'pricing' },
    { q: t.faq.q5, a: t.faq.a5, category: 'features' },
    { q: t.faq.q6, a: t.faq.a6, category: 'support' },
    { q: t.faq.q7, a: t.faq.a7, category: 'integration' },
    { q: t.faq.q8, a: t.faq.a8, category: 'data' },
    { q: t.faq.q9, a: t.faq.a9, category: 'mobile' },
    { q: t.faq.q10, a: t.faq.a10, category: 'general' },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`min-h-screen ${isDark ? theme.bg : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100'} pt-32 pb-24 px-6`}>
      <div className="max-w-5xl mx-auto">
        {/* Header con animación */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#af936f] to-[#8f7657] mb-6 animate-bounce-slow">
            <HelpCircle size={40} className="text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#af936f] via-[#c9a97a] to-[#af936f] animate-gradient">
            {t.faq.title}
          </h1>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme.textMuted}`}>
            {t.faq.subtitle}
          </p>
          
          {/* Decoración */}
          <div className="flex justify-center gap-2 mt-8">
            <Sparkles className="text-[#af936f] animate-pulse" size={24} />
            <Sparkles className="text-[#c9a97a] animate-pulse delay-100" size={20} />
            <Sparkles className="text-[#af936f] animate-pulse delay-200" size={24} />
          </div>
        </div>

        {/* Grid de FAQs */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 transform hover:scale-[1.02] ${
                openIndex === index
                  ? isDark
                    ? 'bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] border-[#af936f] shadow-2xl shadow-[#af936f]/20'
                    : 'bg-gradient-to-br from-white via-zinc-50 to-white border-[#af936f] shadow-2xl shadow-[#af936f]/10'
                  : isDark
                    ? 'bg-[#1e293b]/50 border-zinc-700/50 hover:border-zinc-600 hover:bg-[#1e293b]/70'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg'
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
              }}
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              {/* Botón de pregunta */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 md:p-8 text-left flex justify-between items-start gap-4 relative z-10"
              >
                <div className="flex-1">
                  <span className={`block font-bold text-lg md:text-xl mb-2 ${openIndex === index ? theme.accent : ''}`}>
                    {item.q}
                  </span>
                  {/* Categoría badge */}
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    isDark 
                      ? 'bg-[#af936f]/20 text-[#af936f]'
                      : 'bg-[#af936f]/10 text-[#8f7657]'
                  }`}>
                    {item.category}
                  </span>
                </div>
                
                {/* Icono animado */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-[#af936f] to-[#8f7657] rotate-180 shadow-lg shadow-[#af936f]/30'
                      : isDark
                        ? 'bg-zinc-700 group-hover:bg-zinc-600'
                        : 'bg-zinc-200 group-hover:bg-zinc-300'
                  }`}
                >
                  {openIndex === index ? (
                    <Minus size={24} className="text-white" />
                  ) : (
                    <Plus size={24} className={isDark ? 'text-white' : 'text-zinc-700'} />
                  )}
                </div>
              </button>

              {/* Respuesta con animación */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  {/* Separador decorativo */}
                  <div className="relative h-px mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#af936f] to-transparent opacity-50"></div>
                  </div>
                  
                  {/* Respuesta */}
                  <p className={`text-base md:text-lg leading-relaxed ${theme.textMuted} animate-fade-in`}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action al final */}
        <div className={`mt-20 text-center p-10 rounded-3xl border-2 ${
          isDark 
            ? 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-zinc-700'
            : 'bg-gradient-to-br from-zinc-50 to-white border-zinc-200'
        }`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t.faq.stillHaveQuestions}
          </h3>
          <p className={`${theme.textMuted} mb-6 text-lg`}>
            {t.faq.contactUs}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#af936f] to-[#8f7657] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            {t.faq.getInTouch}
            <Sparkles size={20} />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default FAQ;

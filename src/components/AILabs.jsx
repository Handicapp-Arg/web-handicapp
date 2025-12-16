import React, { useCallback } from "react";
import { ArrowRight, Loader2, Dna } from "lucide-react";
import { useGeminiChat } from "../hooks/useGeminiChat";
import { HANDICAPP_KNOWLEDGE } from "../handicappKnowledgeBase";

const AILabs = React.memo(({ t, theme }) => {
  const {
    prompt,
    response,
    loading,
    error,
    updatePrompt,
    generateResponse,
    hasError
  } = useGeminiChat(HANDICAPP_KNOWLEDGE);

  // Memoizar el handler del input
  const handleInputChange = useCallback((e) => {
    updatePrompt(e.target.value);
  }, [updatePrompt]);

  // Memoizar el handler del botón
  const handleGenerateClick = useCallback(() => {
    generateResponse();
  }, [generateResponse]);
  
  return (
    <section id="labs" className="scroll-mt-24 py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 relative">
      <div className={`max-w-7xl mx-auto rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-14 lg:p-20 relative overflow-hidden border ${theme.glass} shadow-2xl`}>
        <div className={`absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-[100px] sm:blur-[120px] opacity-20 ${theme.accentBg}`}></div>
        {/* Layout Desktop: grid normal con título integrado */}
        <div className="relative z-10 hidden lg:grid lg:grid-cols-2 gap-20">
          <div className="flex flex-col">
            <div className="space-y-4 mb-16">
              <h2 className="text-5xl font-black leading-tight text-white">{t.labs.title}</h2>
              <p className={`text-xl leading-relaxed ${theme.textMuted}`}>{t.labs.desc}</p>
            </div>
            <div className="space-y-5">
              <div className="relative">
                <input 
                  value={prompt} 
                  onChange={handleInputChange} 
                  placeholder={t.labs.input_ph} 
                  className="w-full p-6 rounded-xl border outline-none transition-all font-medium placeholder:opacity-50 text-base bg-black/50 border-zinc-800 text-white focus:border-[#af936f]" 
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <Dna size={24} className={theme.textMuted} />
                </div>
              </div>
              <button 
                onClick={handleGenerateClick} 
                disabled={loading} 
                className="w-full py-6 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 text-base bg-white text-black hover:bg-[#af936f] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin w-6 h-6" /> : t.labs.btn} 
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="rounded-3xl p-10 border bg-black/40 border-zinc-800 min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 opacity-50">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
              </div>
              <div className={`font-mono text-sm ${theme.textMuted}`}>AI_OUTPUT_V1</div>
            </div>
            <div className={`flex-1 font-mono text-lg leading-loose whitespace-pre-wrap overflow-auto ${hasError ? 'text-red-500' : theme.accent}`}>
              {hasError ? `❌ ${error}` : response || <span className="opacity-30">// Ready...</span>}
            </div>
          </div>
        </div>

        {/* Layout Móvil: Título arriba, consola, luego input */}
        <div className="relative z-10 lg:hidden">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white">{t.labs.title}</h2>
            <p className={`text-base sm:text-lg leading-relaxed ${theme.textMuted}`}>{t.labs.desc}</p>
          </div>
          
          {/* Consola arriba */}
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 border bg-black/40 border-zinc-800 min-h-[300px] sm:min-h-[350px] flex flex-col relative overflow-hidden mb-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6 opacity-50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              </div>
              <div className={`font-mono text-xs ${theme.textMuted}`}>AI_OUTPUT_V1</div>
            </div>
            <div className={`flex-1 font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap overflow-auto ${hasError ? 'text-red-500' : theme.accent}`}>
              {hasError ? `❌ ${error}` : response || <span className="opacity-30">// Ready...</span>}
            </div>
          </div>

          {/* Input y botón abajo */}
          <div className="space-y-4">
            <div className="relative">
              <input 
                value={prompt} 
                onChange={handleInputChange} 
                placeholder="Pregunta sobre Handicapp..." 
                className="w-full p-4 pr-12 sm:p-5 sm:pr-14 rounded-xl border outline-none transition-all font-medium placeholder:opacity-50 text-sm sm:text-base bg-black/50 border-zinc-800 text-white focus:border-[#af936f]" 
              />
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <Dna size={18} className={`sm:w-5 sm:h-5 ${theme.textMuted}`} />
              </div>
            </div>
            <button 
              onClick={handleGenerateClick} 
              disabled={loading} 
              className="w-full py-4 sm:py-5 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 text-sm sm:text-base bg-white text-black hover:bg-[#af936f] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : t.labs.btn} 
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

AILabs.displayName = 'AILabs';

export default AILabs;
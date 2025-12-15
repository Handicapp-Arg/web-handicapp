import { ArrowRight, Loader2, Dna } from "lucide-react";
import { useGeminiChat } from "../hooks/useGeminiChat";
import { HANDICAPP_KNOWLEDGE } from "../handicappKnowledgeBase";

const AILabs = ({ t, theme }) => {
  const {
    prompt,
    response,
    loading,
    error,
    updatePrompt,
    generateResponse,
    hasError
  } = useGeminiChat(HANDICAPP_KNOWLEDGE);
  
  return (
    <section id="labs" className="scroll-mt-24 py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 relative">
      <div className={`max-w-7xl mx-auto rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-10 md:p-14 lg:p-20 relative overflow-hidden border ${theme.glass} shadow-2xl`}>
        <div className={`absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-[100px] sm:blur-[120px] opacity-20 ${theme.accentBg}`}></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 sm:gap-14 md:gap-16 lg:gap-20">
          <div className="flex flex-col">
            <div className="space-y-4 mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">{t.labs.title}</h2>
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${theme.textMuted}`}>{t.labs.desc}</p>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <div className="relative">
                <input 
                  value={prompt} 
                  onChange={(e) => updatePrompt(e.target.value)} 
                  placeholder={t.labs.input_ph} 
                  className="w-full p-5 sm:p-6 rounded-xl border outline-none transition-all font-medium placeholder:opacity-50 text-sm sm:text-base bg-black/50 border-zinc-800 text-white focus:border-[#af936f]" 
                />
                <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2">
                  <Dna size={20} className={`sm:w-6 sm:h-6 ${theme.textMuted}`} />
                </div>
              </div>
              <button 
                onClick={generateResponse} 
                disabled={loading} 
                className="w-full py-5 sm:py-6 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 text-sm sm:text-base bg-white text-black hover:bg-[#af936f] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" /> : t.labs.btn} 
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-10 border bg-black/40 border-zinc-800 min-h-[350px] sm:min-h-[450px] md:min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 sm:mb-8 opacity-50">
              <div className="flex gap-2">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-500"></div>
              </div>
              <div className={`font-mono text-xs sm:text-sm ${theme.textMuted}`}>AI_OUTPUT_V1</div>
            </div>
            <div className={`flex-1 font-mono text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose whitespace-pre-wrap ${hasError ? 'text-red-500' : theme.accent}`}>
              {hasError ? `❌ ${error}` : response || <span className="opacity-30">// Ready...</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILabs;
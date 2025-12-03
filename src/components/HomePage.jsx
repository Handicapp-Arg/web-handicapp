import React from 'react';
import Hero from './Hero';
import Dashboard from './Dashboard';
import Pricing from './Pricing';

// Componentes que estaban en App.jsx y se usan solo en Home
const RoleSelector = ({ t, isDark, theme, roles, activeRole, setActiveRole, isAutoPlaying, setIsAutoPlaying, ChevronLeft, ChevronRight }) => {
  return (
    <section className={`py-24 relative z-10 px-6 ${isDark ? 'bg-[#1e293b]/30' : 'bg-zinc-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center">{t.roles.title}</h2>
        
        <div className="relative">
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
                  <div className={`p-12 md:p-16 rounded-3xl border-2 min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-[#af936f]/30' 
                      : 'bg-white border-[#af936f]/20'
                  } shadow-2xl hover:shadow-[0_0_60px_-15px_rgba(175,147,111,0.4)] transition-all duration-500`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#af936f]/5 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${theme.accentBg} text-white shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                      <role.icon size={40} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black mb-6 relative">{role.title}</h3>
                    <p className={`text-lg md:text-xl leading-relaxed max-w-2xl relative ${theme.textMuted}`}>{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => { setIsAutoPlaying(false); setActiveRole((prev) => (prev - 1 + roles.length) % roles.length); }}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 rounded-full ${theme.accentBg} text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xl z-10`}
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          <button 
            onClick={() => { setIsAutoPlaying(false); setActiveRole((prev) => (prev + 1) % roles.length); }}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 rounded-full ${theme.accentBg} text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xl z-10`}
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {roles.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlaying(false); setActiveRole(i); }}
              className={`h-2.5 rounded-full transition-all duration-300 hover:scale-110 ${
                i === activeRole 
                  ? `w-12 ${theme.accentBg} shadow-lg` 
                  : `w-2.5 ${isDark ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-zinc-300 hover:bg-zinc-400'}`
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ 
  t, 
  theme, 
  isDark, 
  ASSETS, 
  onVideoOpen,
  SocialProof,
  VerticalWorkflow,
  AILabs,
  ContactForm,
  User,
  HeartPulse,
  Target,
  Building2,
  ChevronLeft,
  ChevronRight
}) => {
  const [activeRole, setActiveRole] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  const roles = [
    { title: t.roles.r1, desc: t.roles.r1_d, icon: User },
    { title: t.roles.r2, desc: t.roles.r2_d, icon: HeartPulse },
    { title: t.roles.r3, desc: t.roles.r3_d, icon: Target },
    { title: t.roles.r4, desc: t.roles.r4_d, icon: Building2 }
  ];

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, roles.length]);

  return (
    <>
      <Hero 
        t={t} 
        theme={theme} 
        isDark={isDark} 
        ASSETS={ASSETS}
        onVideoOpen={onVideoOpen}
      />

      <RoleSelector 
        t={t} 
        isDark={isDark} 
        theme={theme} 
        roles={roles}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        isAutoPlaying={isAutoPlaying}
        setIsAutoPlaying={setIsAutoPlaying}
        ChevronLeft={ChevronLeft}
        ChevronRight={ChevronRight}
      />
      
      <SocialProof t={t} isDark={isDark} theme={theme} />
      <VerticalWorkflow t={t} isDark={isDark} theme={theme} />
      
      <Dashboard t={t} theme={theme} isDark={isDark} ASSETS={ASSETS} />

      <AILabs t={t} isDark={isDark} theme={theme} />

      <Pricing t={t} theme={theme} isDark={isDark} />

      <ContactForm t={t} isDark={isDark} theme={theme} />
    </>
  );
};

export default HomePage;

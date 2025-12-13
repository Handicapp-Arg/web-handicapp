import React from 'react';
import Hero from './Hero';
import { 
  CheckCircle2, X, 
  Zap, Shield, 
  BarChart3, Bell, FileText, Calendar,
  Heart, Code2, Award, Dna
} from 'lucide-react';
import { 
  IconWifiOff, 
  IconHistory, 
  IconUsersGroup, 
  IconFileCheck, 
  IconDeviceMobile, 
  IconBolt, 
  IconCalendarStats, 
  IconCloudUpload 
} from '@tabler/icons-react';
// import Pricing from './Pricing';

// Componentes que estaban en App.jsx y se usan solo en Home

// ProblemSolution - Antes vs Después
const ProblemSolution = ({ t, isDark, theme }) => {
  const problems = [
    "WhatsApp saturado con mensajes del equipo",
    "Planillas Excel desactualizadas y duplicadas",
    "Olvidos de vacunas y controles veterinarios",
    "Sin reportes para propietarios",
    "Información dispersa en papeles"
  ];

  const solutions = [
    "Sistema de tareas centralizado en tiempo real",
    "Base de datos única, siempre actualizada",
    "Alertas automáticas preventivas",
    "Reportes profesionales con un click",
    "Todo digital y accesible 24/7"
  ];

  return (
    <section className={`py-24 px-6 relative ${isDark ? 'bg-[#0f172a]' : 'bg-gradient-to-b from-zinc-50 via-white to-zinc-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black mb-4 ${theme.text}`}>
            Del Caos al <span className={theme.accent}>Control Total</span>
          </h2>
          <p className={`text-lg md:text-xl ${theme.textMuted}`}>
            Transforma tu gestión en minutos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problemas */}
          <div className={`p-8 rounded-3xl border-2 ${
            isDark 
              ? 'bg-red-950/20 border-red-900/50' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                <X size={24} className="text-white" />
              </div>
              <h3 className={`text-2xl font-black ${theme.text}`}>Antes: Desorganización</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X size={20} className="text-red-500 flex-shrink-0 mt-1" />
                  <span className={theme.textMuted}>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Soluciones */}
          <div className={`p-8 rounded-3xl border-2 ${
            isDark 
              ? 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-[#af936f]/50' 
              : 'bg-gradient-to-br from-white to-zinc-50 border-[#af936f]/50'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl ${theme.accentBg} flex items-center justify-center`}>
                <CheckCircle2 size={24} className="text-white" />
              </div>
              <h3 className={`text-2xl font-black ${theme.text}`}>Ahora: Handicapp</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#af936f] flex-shrink-0 mt-1" />
                  <span className={theme.textMuted}>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// KeyFeatures - Características clave (Bento Grid Design)
const KeyFeatures = ({ t, isDark, theme }) => {
  return (
    <section id="funcionalidades" className={`scroll-mt-24 py-32 relative overflow-hidden ${isDark ? 'bg-[#0f172a]' : 'bg-gradient-to-b from-zinc-50 via-white to-zinc-50'}`}>
      {/* Background Gradient Spot */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none ${isDark ? 'bg-indigo-900/10' : 'bg-indigo-300/20'}`}></div>
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none ${isDark ? 'bg-orange-900/5' : 'bg-[#af936f]/10'}`}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#af936f] font-bold tracking-widest uppercase text-xs mb-3 block">HandicApp OS</span>
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.text}`}>
            El sistema operativo <br/> de tu establecimiento.
          </h2>
          <p className={`${theme.textMuted} max-w-2xl mx-auto text-lg`}>
            No es solo una app, es una infraestructura completa diseñada para escalar con tu haras.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)]">
          
          {/* Card 1: Mobile First - Large Square */}
          <div className={`md:col-span-2 md:row-span-2 group relative p-8 md:p-12 rounded-[2rem] border transition-all duration-500 overflow-hidden hover:shadow-2xl ${
            isDark 
              ? 'bg-neutral-900/40 border-white/5 hover:bg-neutral-900/60 hover:shadow-black/50' 
              : 'bg-gradient-to-br from-white to-zinc-50 border-zinc-300 hover:bg-white hover:shadow-2xl'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-indigo-500/10' : 'from-indigo-400/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 shadow-xl ${
                  isDark ? 'bg-neutral-800 border-white/10' : 'bg-white border-zinc-300 shadow-inner'
                }`}>
                  <IconDeviceMobile size={32} stroke={1.5} className="text-indigo-400" />
                </div>
                <h3 className={`text-3xl font-bold mb-4 ${theme.text}`}>Mobile First & Offline</h3>
                <p className={`text-lg leading-relaxed ${theme.textMuted}`}>
                  Diseñado para manos grandes y sol fuerte. Funciona perfecto sin señal y sincroniza automáticamente al volver al casco o tener WiFi. La app nativa que tu equipo sí va a querer usar.
                </p>
              </div>
              <div className="mt-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                   <IconWifiOff size={14} /> Modo Avión Soportado
                 </div>
              </div>
            </div>
            {/* Background decoration */}
            <IconDeviceMobile className={`absolute -bottom-10 -right-10 w-64 h-64 rotate-12 group-hover:rotate-6 transition-transform duration-700 ${
              isDark ? 'text-white/5' : 'text-zinc-200/50'
            }`} />
          </div>

          {/* Card 2: Trazabilidad - Wide Rectangle */}
          <div className={`md:col-span-2 group relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
            isDark 
              ? 'bg-neutral-900/40 border-white/5 hover:bg-neutral-900/60' 
              : 'bg-gradient-to-br from-white to-zinc-50 border-zinc-300 hover:shadow-lg'
          }`}>
             <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-emerald-500/10' : 'from-emerald-400/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
             <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center h-full">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-neutral-800 border-white/10' : 'bg-white border-zinc-300'
                }`}>
                  <IconHistory size={28} stroke={1.5} className="text-emerald-400" />
                </div>
                <div>
                   <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>Trazabilidad Inmutable</h3>
                   <p className={theme.textMuted}>Cada evento (vacuna, herraje, traslado) queda registrado para siempre con fecha, hora y responsable. Auditoría perfecta.</p>
                </div>
             </div>
          </div>

          {/* Card 3: Roles - Vertical */}
          <div className={`md:col-span-1 md:row-span-2 group relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
            isDark 
              ? 'bg-neutral-900/40 border-white/5 hover:bg-neutral-900/60' 
              : 'bg-gradient-to-br from-white to-zinc-50 border-zinc-300 hover:shadow-lg'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-orange-500/10' : 'from-orange-400/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="relative z-10 h-full flex flex-col">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 ${
                  isDark ? 'bg-neutral-800 border-white/10' : 'bg-white border-zinc-300'
                }`}>
                  <IconUsersGroup size={28} stroke={1.5} className="text-orange-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${theme.text}`}>Roles & Permisos</h3>
                <p className={`${theme.textMuted} mb-6 flex-grow`}>
                  Seguridad militar para tus datos.
                </p>
                <ul className={`space-y-3 text-sm ${theme.textMuted}`}>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Admin</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Veterinario</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Capataz</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Propietario</li>
                </ul>
            </div>
          </div>

          {/* Card 4: Documentos */}
          <div className={`md:col-span-1 group relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
            isDark 
              ? 'bg-neutral-900/40 border-white/5 hover:bg-neutral-900/60' 
              : 'bg-gradient-to-br from-white to-zinc-50 border-zinc-300 hover:shadow-lg'
          }`}>
            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${
                  isDark ? 'bg-neutral-800 border-white/10' : 'bg-white border-zinc-300'
                }`}>
                  <IconFileCheck size={24} stroke={1.5} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>Docs Digitales</h3>
                <p className={`text-sm ${theme.textMuted}`}>Pasaportes, radiografías y análisis adjuntos al perfil del animal.</p>
            </div>
          </div>

          {/* Card 5: Carga Masiva */}
          <div className={`md:col-span-2 group relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
            isDark 
              ? 'bg-neutral-900/40 border-white/5 hover:bg-neutral-900/60' 
              : 'bg-gradient-to-br from-white to-zinc-50 border-zinc-300 hover:shadow-lg'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-blue-500/10' : 'from-blue-400/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                      isDark ? 'bg-neutral-800 border-white/10' : 'bg-white border-zinc-300'
                    }`}>
                      <IconBolt size={24} stroke={1.5} className="text-blue-400" />
                    </div>
                    <h3 className={`text-2xl font-bold ${theme.text}`}>Carga Masiva</h3>
                  </div>
                  <p className={theme.textMuted}>¿Día de vacunación general? Selecciona 50 caballos y aplica el evento a todos en un solo clic. Ahorra horas de carga manual.</p>
                </div>
                {/* Visual Representation */}
                <div className={`w-full md:w-1/3 rounded-xl p-3 border ${
                  isDark ? 'bg-neutral-800/50 border-white/10' : 'bg-zinc-50 border-zinc-300'
                }`}>
                   <div className={`flex items-center justify-between mb-2 text-xs uppercase font-bold ${theme.textMuted}`}>
                     <span>Lote Destete</span>
                     <span>Select All</span>
                   </div>
                   <div className="space-y-2">
                     {[1,2,3].map(i => (
                       <div key={i} className={`h-2 rounded-full w-full relative overflow-hidden ${
                         isDark ? 'bg-neutral-700' : 'bg-zinc-200'
                       }`}>
                         <div className="absolute top-0 left-0 h-full w-full bg-blue-500 animate-pulse"></div>
                       </div>
                     ))}
                   </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// KeyFeatures Alternative - Grid de 6 características
const KeyFeaturesGrid = ({ t, isDark, theme }) => {
  const features = [
    {
      icon: Zap,
      title: "Velocidad Extrema",
      desc: "Interfaz ultrarrápida. Carga instantánea, sin esperas.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Seguridad Máxima",
      desc: "Encriptación AES-256. Tus datos más seguros que en un banco.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Reportes Inteligentes",
      desc: "Dashboard con métricas en vivo. Exporta en PDF/Excel con un click.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Bell,
      title: "Alertas Automáticas",
      desc: "Notificaciones push personalizadas. Nunca olvides nada importante.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FileText,
      title: "Historial Completo",
      desc: "Registros médicos, entrenamientos y competencias centralizados.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Calendar,
      title: "Calendario Integrado",
      desc: "Planifica eventos, vacunas y controles en un solo lugar.",
      color: "from-indigo-500 to-violet-500"
    }
  ];

  return (
    <section className={`py-24 px-6 relative ${isDark ? 'bg-[#0f172a]' : 'bg-gradient-to-b from-white to-zinc-100'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black mb-4 ${theme.text}`}>
            Características que Marcan la Diferencia
          </h2>
          <p className={`text-lg md:text-xl ${theme.textMuted} max-w-3xl mx-auto`}>
            Todo lo que necesitas para gestionar profesionalmente tu operación ecuestre
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-zinc-700 hover:border-[#af936f]/50' 
                  : 'bg-gradient-to-br from-white to-zinc-50 border-zinc-300 hover:border-[#af936f]/50 hover:shadow-xl'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} className="text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${theme.text}`}>{feature.title}</h3>
              <p className={theme.textMuted}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoleSelector = ({ t, isDark, theme, roles, activeRole, setActiveRole, isAutoPlaying, setIsAutoPlaying, ChevronLeft, ChevronRight }) => {
  return (
    <section className={`py-24 relative z-10 px-6 ${isDark ? 'bg-[#1e293b]/30' : 'bg-gradient-to-b from-zinc-100 to-white'}`}>
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

// AboutSection - Sección Nosotros

const aboutImages = [
  "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636411/handicapp/uploads/RE1_4060.webp",
  "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765652228/handicapp/uploads/0T1A5723.webp",
  "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765652254/handicapp/uploads/DSC07420.webp"
];

const AboutSection = ({ t, isDark, theme }) => {
  const [activeImage, setActiveImage] = React.useState(0);
  const aboutVals = [
    { t: t.about.val1, d: t.about.val1_d, i: Heart },
    { t: t.about.val2, d: t.about.val2_d, i: Code2 },
    { t: t.about.val3, d: t.about.val3_d, i: Award }
  ];
  return (
    <section id="about" className={`py-32 px-6 relative border-y ${theme.border} ${isDark ? 'bg-[#1e293b]/30' : 'bg-zinc-50'}`}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className={`inline-flex items-center gap-2 mb-6 ${theme.accent} font-bold text-xs uppercase tracking-widest`}>
            <Dna size={16} /> {t.about.title}
          </div>
          <h2 className="text-5xl font-black mb-8 leading-tight">{t.about.subtitle}</h2>
          <p className={`text-lg leading-relaxed mb-10 ${theme.textMuted}`}>{t.about.desc}</p>
          <div className="grid gap-6">
            {aboutVals.map((val, i) => (
              <button
                key={i}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${theme.glass} hover:border-current focus:outline-none focus:ring-2 focus:ring-[#af936f] ${activeImage === i ? 'ring-2 ring-[#af936f] border-[#af936f]' : ''}`}
                onClick={() => setActiveImage(i)}
                type="button"
              >
                <div className={`mt-1 p-2 rounded-lg ${theme.accentBg} text-white`}>
                  <val.i size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{val.t}</h4>
                  <p className={`text-sm ${theme.textMuted}`}>{val.d}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Imagen del equipo/operación ecuestre */}
        <div className="relative aspect-[4/5] lg:aspect-[3/4] group">
          {/* Glow effect detrás de la imagen */}
          <div className={`absolute inset-0 rounded-full blur-[120px] opacity-30 ${theme.accentBg} animate-pulse`}></div>
          {/* Contenedor principal de la imagen */}
          <div className={`relative h-full w-full rounded-[3rem] overflow-hidden border-2 ${theme.border} shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_-15px_rgba(175,147,111,0.5)]`}>
            {/* Imagen - object-cover centrado para mostrar bien el caballo */}
            <div className="absolute inset-0">
              <img 
                src={aboutImages[activeImage]}
                alt="Gestión ecuestre profesional con Handicapp"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay sutil solo en los bordes para mantener el foco en el caballo */}
              <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0f172a]/40 via-transparent to-transparent' : 'from-zinc-900/20 via-transparent to-transparent'}`}></div>
              {/* Efecto glass muy sutil en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative corner accents dorados */}
            <div className={`absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 rounded-tr-3xl opacity-40 transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:opacity-60 ${isDark ? 'border-[#af936f]' : 'border-[#af936f]'}`}></div>
            <div className={`absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 rounded-bl-3xl opacity-40 transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:opacity-60 ${isDark ? 'border-[#af936f]' : 'border-[#af936f]'}`}></div>
          </div>
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
      {/* 1. Hero - Impacto inicial */}
      <Hero 
        t={t} 
        theme={theme} 
        isDark={isDark} 
        ASSETS={ASSETS}
        onVideoOpen={onVideoOpen}
      />

      {/* 2. ProblemSolution - Antes vs Después */}
      <ProblemSolution t={t} isDark={isDark} theme={theme} />

      {/* 3. RoleSelector - Muestra versatilidad */}
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

      {/* 4. KeyFeatures - Características clave (Bento Grid) */}
      <KeyFeatures t={t} isDark={isDark} theme={theme} />

      {/* 5. KeyFeaturesGrid - Grid de 6 características */}
      <KeyFeaturesGrid t={t} isDark={isDark} theme={theme} />

      {/* 6. VerticalWorkflow - Cómo funciona */}
      <VerticalWorkflow t={t} isDark={isDark} theme={theme} />
      
      {/* 7. AI Labs - Feature diferenciadora */}
      <AILabs t={t} isDark={isDark} theme={theme} />

      {/* 8. SocialProof - Validación social */}
      <SocialProof t={t} isDark={isDark} theme={theme} />

      {/* 9. AboutSection - Nosotros */}
      <AboutSection t={t} isDark={isDark} theme={theme} />

      {/* 10. ContactForm - Conversión final */}
      <ContactForm t={t} isDark={isDark} theme={theme} />
    </>
  );
};

export default HomePage;

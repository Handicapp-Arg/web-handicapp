import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  X, Smartphone, Network, Sparkles, Dna, ArrowRight,
  Plus, Minus, Star, Loader2, CheckCircle2,
  User, Radio, BellRing, Cpu, Play,
  Target, HeartPulse, Building2, ChevronLeft, ChevronRight
} from 'lucide-react';

// Importar componentes separados
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FAQPage from './components/FAQ';
import LegalPage from './components/Legal';
import HANDICAPP_KNOWLEDGE from './handicappKnowledgeBase';
// Importar traducciones
import translations from './i18n';
// Importar hook personalizado para Gemini AI
import useGeminiChat from './hooks/useGeminiChat';

/**
 * --- ASSETS ---
 */
const ASSETS = {
  heroHorse: "https://images.unsplash.com/photo-1534078362425-387ae9668c17?q=80&w=2669&auto=format&fit=crop", 
  noise: "https://grainy-gradients.vercel.app/noise.svg",
  // LOGOS LOCALES - TUS LOGOS REALES
  logoFull: "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636413/handicapp/uploads/logo-full-white.webp",  // Logo completo horizontal
  logoIcon: "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636415/handicapp/uploads/logo-icon-white.webp",  // Logo icono/símbolo
  // Imagen Dashboard asegurada
  dashboardScreen: "/images/dashboard.png", // Screenshot del dashboard
  
  // Logos de sponsors y partners hípicos
  logos: [
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636408/handicapp/uploads/LADOLFINA.webp",  // La Dolfina - Equipo de polo argentino
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765795314/harasParaiso_ffzcct.webp"  // Haras El Paraíso
  ]
};

/**
 * --- CONFIGURACIÓN DE TEMA ---
 * Paleta de identidad Handicapp (Dark Mode)
 */
const THEME = {
  bg: "bg-[#0f172a]",                    // Navy Blue Principal
  bgSecondary: "bg-[#1e293b]",           // Navy Blue Light
  text: "text-white",
  textMuted: "text-zinc-400",
  accent: "text-[#af936f]",              // Golden Brown
  accentBg: "bg-[#af936f]",              // Golden Brown
  accentHover: "bg-[#8f7657]",           // Darker Gold (hover)
  accentCyan: "bg-[#0e445d]",            // Cyan Secundario
  border: "border-zinc-700",
  glass: "bg-[#1e293b]/80 backdrop-blur-xl border-zinc-700",
  navBg: "bg-[#0f172a]"                  // Navbar Navy
};

/**
 * --- DICTIONARY (Importado desde /i18n) ---
 */
const I18N = translations;

/**
 * --- CUSTOM CURSOR ---
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailingRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      if (trailingRef.current) trailingRef.current.animate({ transform: `translate3d(${clientX - 10}px, ${clientY - 10}px, 0)` }, { duration: 500, fill: 'forwards' });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      <div ref={cursorRef} className="absolute w-3 h-3 rounded-full mix-blend-difference bg-[#af936f] top-0 left-0 -mt-1.5 -ml-1.5" />
      <div ref={trailingRef} className="absolute w-8 h-8 rounded-full border opacity-50 top-0 left-0 border-[#af936f]" />
    </div>
  );
};

/**
 * --- PRELOADER ---
 */
const Preloader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => { setIsVisible(false); onLoadComplete(); }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[10000] bg-[#0f172a] flex flex-col items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mb-8 relative">
         {ASSETS.logoIcon ? <img src={ASSETS.logoIcon} className="w-20 h-20 md:w-24 md:h-24 animate-pulse" alt="Loading" /> : <div className="w-20 h-20 md:w-24 md:h-24 bg-[#af936f] rounded-full animate-pulse flex items-center justify-center font-bold text-white text-3xl">H</div>}
      </div>
      <div className="w-80 h-1.5 bg-[#1e293b] rounded-full overflow-hidden mb-4"><div className="h-full bg-[#af936f] transition-all duration-200 shadow-[0_0_10px_rgba(175,147,111,0.5)]" style={{ width: `${progress}%` }}></div></div>
      <div className="font-mono text-[#af936f] text-sm tracking-widest">LOADING HANDICAPP :: {Math.min(100, Math.floor(progress))}%</div>
    </div>
  );
};

/**
 * --- THREE.JS BACKGROUND ---
 */
const ThreeEquestrianFlow = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const THREE = window.THREE;
    if (!mountRef.current || !THREE) return;
    if (mountRef.current.firstChild) while(mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.005);
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      velocities[i] = 0.2 + Math.random() * 0.5;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xaf936f, size: 0.5, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const pos = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] -= velocities[i]; 
        if (pos[i * 3] < -100) pos[i * 3] = 100;
        pos[i * 3 + 1] += Math.sin(Date.now() * 0.001 + pos[i * 3]) * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      camera.rotation.z = window.scrollY * 0.0001; 
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(frameId); if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10" />;
};

/**
 * --- ROLE SELECTOR ---
 */
const RoleSelector = ({ t, theme }) => {
  const [activeRole, setActiveRole] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const roles = [
    { title: t.roles.r1, desc: t.roles.r1_d, icon: User },
    { title: t.roles.r2, desc: t.roles.r2_d, icon: HeartPulse },
    { title: t.roles.r3, desc: t.roles.r3_d, icon: Target },
    { title: t.roles.r4, desc: t.roles.r4_d, icon: Building2 }
  ];

  // Autoplay del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, roles.length]);

  const nextRole = () => {
    setIsAutoPlaying(false);
    setActiveRole((prev) => (prev + 1) % roles.length);
  };

  const prevRole = () => {
    setIsAutoPlaying(false);
    setActiveRole((prev) => (prev - 1 + roles.length) % roles.length);
  };

  const goToRole = (index) => {
    setIsAutoPlaying(false);
    setActiveRole(index);
  };

  return (
    <section className="py-24 relative z-10 px-6 bg-[#1e293b]/30">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl md:text-6xl font-black mb-20 text-center ${theme.text}`}>{t.roles.title}</h2>
        
        {/* Carrusel */}
        <div className="relative">
          {/* Contenedor del carrusel */}
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
                  <div className="p-12 md:p-16 rounded-3xl border-2 min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-[#af936f]/30 shadow-2xl hover:shadow-[0_0_60px_-15px_rgba(175,147,111,0.4)] transition-all duration-500">
                    {/* Efecto de brillo sutil */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#af936f]/5 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${theme.accentBg} text-white shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                      <role.icon size={40} strokeWidth={2.5} />
                    </div>
                    <h3 className={`text-4xl md:text-5xl font-black mb-6 relative ${theme.text}`}>{role.title}</h3>
                    <p className={`text-lg md:text-xl leading-relaxed max-w-2xl relative ${theme.textMuted}`}>{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación mejorados */}
          <button 
            onClick={prevRole}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 rounded-full ${theme.accentBg} text-white flex items-center justify-center hover:scale-110 hover:${theme.accentHover} transition-all shadow-2xl z-10`}
            aria-label="Anterior"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          <button 
            onClick={nextRole}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 rounded-full ${theme.accentBg} text-white flex items-center justify-center hover:scale-110 hover:${theme.accentHover} transition-all shadow-2xl z-10`}
            aria-label="Siguiente"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Indicadores mejorados */}
        {/* Indicadores mejorados con hover */}
        <div className="flex justify-center gap-3 mt-8">
          {roles.map((_, i) => (
            <button
              key={i}
              onClick={() => goToRole(i)}
              className={`h-2.5 rounded-full transition-all duration-300 hover:scale-110 ${
                i === activeRole 
                  ? `w-12 ${theme.accentBg} shadow-lg` 
                  : 'w-2.5 bg-zinc-600 hover:bg-zinc-500'
              }`}
              aria-label={`Ir al rol ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * --- HOTSPOT OVERLAY ---
 * Movido a Dashboard.jsx
 */

/**
 * --- VIDEO MODAL ---
 */
const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  // OPCIÓN 1: YouTube - Reemplaza VIDEO_ID con tu ID de YouTube
  const youtubeVideoId = "dQw4w9WgXcQ"; // Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  
  // OPCIÓN 2: Video local - Pon tu video en /public/videos/showreel.mp4
  // const localVideo = "/videos/showreel.mp4";
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 p-6">
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-[#D1F366] transition-colors"><X size={40} /></button>
      <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        
        {/* OPCIÓN 1: YouTube */}
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
          title="Video Showreel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
        {/* OPCIÓN 2: Video Local - Descomenta esto y comenta el iframe de arriba
        <video 
          className="w-full h-full object-cover" 
          controls 
          autoPlay
        >
          <source src={localVideo} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        */}
        
      </div>
    </div>
  );
};

const VerticalWorkflow = ({ t, theme }) => {
  // Precarga de imágenes pesadas al cargar la app
  useEffect(() => {
    stepImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);
  
  // Imágenes para cada paso
  const stepImages = [
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765640273/handicapp/uploads/0T1A5784.webp",  // Paso 1: Sube Tu Información
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765579209/orejitas_serqac.jpg",  // Paso 2: Automatiza Tu Operación (nuevo link)
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1763217620/handicapp/uploads/caballo.webp" // Paso 3: Toma Mejores Decisiones
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveStep(parseInt(entry.target.getAttribute('data-index')));
        }
      });
    }, { threshold: 0.3 }); // Más sensible, responde antes
    stepsRef.current.forEach(step => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, []);
  
  const steps = [ 
    { title: t.workflow.step1_t, desc: t.workflow.step1_d, icon: Smartphone, id: 0 }, 
    { title: t.workflow.step2_t, desc: t.workflow.step2_d, icon: Network, id: 1 }, 
    { title: t.workflow.step3_t, desc: t.workflow.step3_d, icon: BellRing, id: 2 }
  ];
  
  return (
    <section id="workflow" className="scroll-mt-24 py-24 relative bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-black mb-24 text-center ${theme.text}`}>{t.workflow.title}</h2>
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2 hidden md:block">
            <div className="sticky top-32 h-[500px] w-full">
              <div className="relative w-full h-full rounded-[2.5rem] border-2 overflow-hidden shadow-2xl border-zinc-800/50 bg-zinc-900/20">
                {/* Imagen de fondo con transición */}
                {stepImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      activeStep === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Paso ${index + 1}`}
                      className="w-full h-full object-cover will-change-transform"
                      loading={index <= 1 ? "eager" : "lazy"}
                      decoding="async"
                      fetchpriority={index <= 1 ? "high" : "low"}
                      style={{transition: 'opacity 0.7s', opacity: activeStep === index ? 1 : 0}}
                    />
                    {/* Overlay oscuro para mejor legibilidad */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
                  </div>
                ))}
                {/* Contenido sobre la imagen */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                  <div className={`mb-8 p-8 rounded-full border-2 bg-[#0f172a]/80 backdrop-blur-sm transition-all duration-500 transform border-zinc-700/50 ${
                    activeStep === 0 ? 'scale-100 rotate-0' : activeStep === 1 ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
                  }`}>
                    {activeStep === 0 && <Radio size={64} className="animate-pulse text-[#af936f]" />}
                    {activeStep === 1 && <Cpu size={64} className="text-[#af936f]" />}
                    {activeStep === 2 && <User size={64} className="text-white" />}
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-widest drop-shadow-lg text-white">
                    {activeStep === 0 ? "ORGANIZA" : activeStep === 1 ? "AUTOMATIZA" : "OPTIMIZA"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* Espaciado vertical aún más amplio y sin scroll interno */}
          <div className="md:w-1/2 space-y-96 py-40">
            {steps.map((step, i) => (
              <div 
                key={i} 
                data-index={i} 
                ref={el => stepsRef.current[i] = el} 
                className={`transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-10'}`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${theme.accentBg} text-white`}>
                  <step.icon size={32} />
                </div>
                <h3 className={`text-4xl font-bold mb-4 ${theme.text}`}>{step.title}</h3>
                <p className={`text-xl leading-relaxed ${theme.textMuted}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
              <div className="relative"><input value={prompt} onChange={(e) => updatePrompt(e.target.value)} placeholder={t.labs.input_ph} className="w-full p-5 sm:p-6 rounded-xl border outline-none transition-all font-medium placeholder:opacity-50 text-sm sm:text-base bg-black/50 border-zinc-800 text-white focus:border-[#af936f]" /><div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2"><Dna size={20} className="sm:w-6 sm:h-6 ${theme.textMuted}" /></div></div>
              <button onClick={generateResponse} disabled={loading} className="w-full py-5 sm:py-6 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 text-sm sm:text-base bg-white text-black hover:bg-[#af936f] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">{loading ? <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" /> : t.labs.btn} <ArrowRight size={18} className="sm:w-5 sm:h-5" /></button>
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

const SocialProof = ({ t, isDark, theme }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "Handicapp transformó nuestra operación. Dejamos de perder tiempo en papeles.",
      author: "Roberto Álvarez",
      position: "Director - Haras El Paraíso"
    },
    {
      quote: "La IA predictiva nos ayudó a mejorar el rendimiento de nuestros caballos en un 40%. Increíble.",
      author: "Carolina Méndez",
      position: "Gerente de Operaciones - Hipódromo de San Isidro"
    },
    {
      quote: "Desde que usamos Handicapp, toda nuestra gestión es digital. Ahorramos costos y ganamos eficiencia.",
      author: "Adolfo Cambiaso",
      position: "Fundador - La Dolfina Polo Team"
    },
    {
      quote: "El sistema de gestión integral nos permite tener control total de nuestros ejemplares. Es el futuro del turf.",
      author: "Martín Petrini",
      position: "Director Técnico - Stud Abolengo"
    }
  ];
  
  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className={`py-16 sm:py-20 md:py-24 lg:py-32 border-y overflow-hidden relative ${isDark ? 'bg-[#1e293b]/20 border-[#af936f]/20' : 'bg-gradient-to-b from-zinc-50 to-white border-zinc-300'}`}>
      {/* Decoración de fondo */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#af936f] rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 md:mb-24 text-center relative z-10">
        <p className={`text-xs sm:text-sm font-black tracking-[0.3em] uppercase mb-4 sm:mb-6 ${theme.accent}`}>{t.trust.title}</p>
        <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black ${theme.text} px-4 max-w-5xl mx-auto leading-tight`}>
          {t.trust.desc.split('.')[0].toUpperCase()}
        </h3>
      </div>
      
      {/* Logos carousel con sponsors reales - tamaño optimizado */}
      <div className="flex overflow-hidden relative mb-16 sm:mb-20 md:mb-24">
        <div className="flex gap-12 sm:gap-16 md:gap-20 lg:gap-24 animate-marquee whitespace-nowrap py-4">
          {[...ASSETS.logos, ...ASSETS.logos, ...ASSETS.logos].map((logo, i) => {
            const isHipodromoLogo = logo.includes('logo.png');
            return (
              <div key={i} className="flex items-center justify-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] h-16 sm:h-20 md:h-24 lg:h-28">
                <img 
                  src={logo} 
                  alt="Partner" 
                  className={`h-full w-auto object-contain transition-all duration-300 ${
                    isHipodromoLogo
                      ? isDark
                        ? 'grayscale brightness-150 opacity-60 hover:opacity-90 hover:brightness-200'
                        : 'grayscale opacity-50 hover:opacity-80'
                      : isDark 
                        ? 'brightness-0 invert opacity-50 hover:opacity-90' 
                        : 'grayscale opacity-40 hover:opacity-80 hover:grayscale-0'
                  }`} 
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Testimonial carousel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14">
        {/* Icono de estrella flotante */}
        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full ${theme.accentBg} flex items-center justify-center text-white shadow-2xl z-20`}>
          <Star fill="currentColor" size={24} className="sm:w-8 sm:h-8" />
        </div>
        
        <div className={`px-16 py-16 sm:px-20 sm:py-20 md:px-24 md:py-24 lg:px-28 lg:py-20 rounded-[2.5rem] border-2 text-center relative ${
          isDark 
            ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-[#af936f]/30' 
            : 'bg-gradient-to-br from-white via-zinc-50 to-white border-[#af936f]/40'
        } shadow-2xl`}>
          {/* Quote decorativo eliminado para que sea más rectangular */}
          
          {/* Testimonial content */}
          <div className="relative min-h-[200px] sm:min-h-[180px] md:min-h-[160px] flex flex-col items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                  currentTestimonial === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-medium italic mb-6 leading-relaxed px-4 lg:px-8 ${theme.text}`}>
                  "{testimonial.quote}"
                </p>
                
                {/* Divider dorado */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className={`h-px w-16 ${theme.accentBg}`}></div>
                  <div className={`w-2 h-2 rounded-full ${theme.accentBg}`}></div>
                  <div className={`h-px w-16 ${theme.accentBg}`}></div>
                </div>
                
                <p className={`text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase ${theme.accent} px-4`}>
                  {testimonial.author}, {testimonial.position}
                </p>
              </div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 md:mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? `${theme.accentBg} w-8 sm:w-10 lg:w-12` 
                    : isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { postContactForm } from "./api";
const ContactForm = ({ t, isDark, theme }) => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await postContactForm(form);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`scroll-mt-24 py-20 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 relative overflow-hidden border-t ${theme.border}`}>
      <div className={`absolute inset-0 opacity-10 ${theme.accentBg} blur-[150px] sm:blur-[200px]`}></div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 relative z-10 items-center">
        <div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-6 sm:mb-8 md:mb-10 leading-[0.9] ${theme.text}`}>
            Empieza gratis <span className={theme.accent}>Hoy</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${theme.textMuted}`}>{t.contact.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className={`p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] border ${theme.glass} space-y-4 sm:space-y-6`}>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.name}</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base ${theme.border} focus:border-current`}
              required
            />
          </div>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.email}</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base ${theme.border} focus:border-current`}
              required
            />
          </div>
          <div>
            <label className="text-[10px] sm:text-xs font-bold uppercase opacity-50 mb-1.5 sm:mb-2 block">{t.contact.msg}</label>
            <textarea
              name="mensaje"
              rows={4}
              value={form.mensaje}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-xl border bg-transparent outline-none text-sm sm:text-base ${theme.border} focus:border-current`}
              required
            />
          </div>
          <button
            disabled={status === "loading"}
            className={`w-full py-4 sm:py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base ${
              status === "success"
                ? "bg-green-500 text-white"
                : isDark
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          >
            {status === "loading"
              ? <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
              : status === "success"
              ? t.contact.success
              : t.contact.btn}
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </section>
  );
};

const MobileMenu = ({ isOpen, onClose, t, theme }) => {
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 z-[60] ${theme.glass} backdrop-blur-3xl p-8 flex flex-col animate-in slide-in-from-right duration-300`}>
      <button onClick={onClose} className="self-end p-3 hover:scale-110 transition-transform"><X size={32} /></button>
      <div className="flex-1 flex flex-col justify-center gap-10 text-4xl font-black tracking-tighter">
        {Object.entries(t.nav).map(([key, label]) => (
          <a key={key} href={`#${key}`} onClick={onClose} className="hover:text-[#D1F366] transition-colors transform hover:translate-x-2 transition-transform">{label}</a>
        ))}
      </div>
    </div>
  );
}

/**
 * --- APP PRINCIPAL ---
 */
function AppContent() {
  const [langIndex, setLangIndex] = useState(0);
  const langs = ['es', 'en', 'de'];
  const toggleLang = () => setLangIndex((prev) => (prev + 1) % langs.length);
  const t = I18N[langs[langIndex]];
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const theme = THEME; // Tema oscuro único

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    if (!window.THREE) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} font-['Outfit'] selection:bg-[#af936f] selection:text-white`}>
      <style>{`.animate-marquee { animation: marquee 30s linear infinite; } @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      
      <Preloader onLoadComplete={() => setLoaded(true)} />
      <CustomCursor />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} t={t} theme={theme} />
      
      {loaded && (
        <>
          <ThreeEquestrianFlow />
          <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]"></div>
          <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />

          <Navbar 
            t={t} 
            theme={theme}
            scrolled={scrolled} 
            ASSETS={ASSETS}
            onToggleLang={toggleLang}
            onMenuOpen={() => setMenuOpen(true)}
          />

          <Routes>
            <Route path="/" element={
              <HomePage 
                t={t}
                theme={theme}
                ASSETS={ASSETS}
                onVideoOpen={() => setVideoOpen(true)}
                SocialProof={SocialProof}
                VerticalWorkflow={VerticalWorkflow}
                AILabs={AILabs}
                ContactForm={ContactForm}
                User={User}
                HeartPulse={HeartPulse}
                Target={Target}
                Building2={Building2}
                ChevronLeft={ChevronLeft}
                ChevronRight={ChevronRight}
              />
            } />
            
            <Route path="/faq" element={
              <FAQPage t={t} theme={theme} />
            } />
            
            <Route path="/legal" element={
              <LegalPage t={t} theme={theme} />
            } />
          </Routes>

          <Footer theme={theme} isDark={isDark} ASSETS={ASSETS} />
          <WhatsAppButton phoneNumber="5492477357665" isDark={isDark} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

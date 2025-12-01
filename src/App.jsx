import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Activity, Smartphone, 
  Zap, Shield, Globe, BarChart3, ArrowRight,
  MousePointer2, Sun, Moon, Play, MessageSquare,
  CheckCircle2, Mail, Phone, MapPin, FileText,
  AlertTriangle, Database, Trophy, Star, ChevronDown, Plus, Minus,
  Scan, Cpu, Network, Sparkles, Dna, Stethoscope, Send, MoveRight,
  Layers, Lock, User, Radio, BellRing, HelpCircle, Loader2, Check,
  Target, TrendingUp, HeartPulse, Laptop
} from 'lucide-react';

/**
 * --- GEMINI API UTILITIES ---
 */
const callGeminiAPI = async (prompt) => {
  const apiKey = ""; 
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    if (prompt.includes("Names")) return "1. Midnight Storm\n2. Royal Gallop\n3. Cosmic Stride\n4. Velvet Thunder\n5. Golden Mane";
    return "Basado en los síntomas, recomiendo reposo. Contacte a su veterinario para una ecografía.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta.";
  } catch (error) {
    return "Error de conexión. Modo demo activado.";
  }
};

/**
 * --- ASSETS ---
 */
const ASSETS = {
  heroHorse: "https://images.unsplash.com/photo-1534078362425-387ae9668c17?q=80&w=2669&auto=format&fit=crop", 
  noise: "https://grainy-gradients.vercel.app/noise.svg",
  // LOGOS LOCALES - TUS LOGOS REALES
  logoFull: "/images/logo-full-white.png",  // Logo completo horizontal
  logoIcon: "/images/logo-icon-white.png",  // Logo icono/símbolo
  // Imagen Dashboard asegurada
  dashboardScreen: "/images/dashboard.png", // Screenshot del dashboard
  logos: [
    "https://via.placeholder.com/150x50/ffffff/000000?text=HARAS+DEL+SUR",
    "https://via.placeholder.com/150x50/ffffff/000000?text=LA+QUEBRADA",
    "https://via.placeholder.com/150x50/ffffff/000000?text=SAN+BENITO",
    "https://via.placeholder.com/150x50/ffffff/000000?text=EL+PARAISO",
    "https://via.placeholder.com/150x50/ffffff/000000?text=FIRMAMENTO"
  ]
};

/**
 * --- CONFIGURACIÓN DE TEMA ---
 */
const THEME = {
  dark: {
    bg: "bg-[#050505]",
    text: "text-zinc-100",
    textMuted: "text-zinc-400",
    accent: "text-[#D1F366]",
    accentBg: "bg-[#D1F366]",
    border: "border-zinc-800",
    glass: "bg-zinc-900/60 backdrop-blur-xl border-zinc-800"
  },
  light: {
    bg: "bg-[#F4F4F5]",
    text: "text-zinc-900",
    textMuted: "text-zinc-500",
    accent: "text-[#4F46E5]", 
    accentBg: "bg-[#4F46E5]",
    border: "border-zinc-300",
    glass: "bg-white/70 backdrop-blur-xl border-zinc-200"
  }
};

/**
 * --- DICTIONARY ---
 */
const I18N = {
  es: {
    lang_code: "ES",
    nav: { system: "ECOSISTEMA", labs: "IA LABS", pricing: "PLANES", contact: "CONTACTO", login: "INGRESAR" },
    hero: { pill: "HANDICAPP OS 2.0", line1: "INSTINTO", line2: "DIGITAL", desc: "La plataforma operativa definitiva para haras de alto rendimiento. Fusionamos la tradición ecuestre con inteligencia artificial predictiva.", cta: "Empezar Prueba", video: "Ver Film" },
    roles: {
      title: "UNA PLATAFORMA, MÚLTIPLES VISIONES",
      r1: "Propietario", r1_d: "Recibe videos y reportes de tus caballos en tiempo real. Transparencia total sobre tu inversión.",
      r2: "Veterinario", r2_d: "Historial clínico digital unificado. Alertas sanitarias y recordatorios de vacunación automáticos.",
      r3: "Manager", r3_d: "Control de stock, gestión de personal y finanzas del haras en un solo dashboard."
    },
    hotspots: {
      stock: "Control de Stock", stock_d: "Alertas automáticas cuando el alimento o medicina baja del mínimo.",
      health: "Estado Físico", health_d: "Monitoreo 24/7 de signos vitales y recuperación post-entreno.",
      notify: "Notificaciones", notify_d: "Avisos push instantáneos a todo el equipo."
    },
    trust: { title: "CONFIANZA", desc: "Los líderes de la industria ya corren con nosotros.", quote: "Handicapp transformó nuestra operación. Dejamos de perder tiempo en papeles.", author: "Roberto Álvarez, Director Haras El Paraíso" },
    workflow: { title: "EL FLUJO PERFECTO", step1_t: "Captura de Campo", step1_d: "Veterinarios y petiseros registran datos vitales en segundos, incluso sin señal.", step2_t: "Sincronización Neural", step2_d: "Nuestra IA procesa la información, detecta anomalías y actualiza el historial clínico.", step3_t: "Impacto Inmediato", step3_d: "El propietario recibe una notificación enriquecida con video y diagnóstico en tiempo real." },
    labs: { title: "Inteligencia Hípica", desc: "Motores de IA generativa entrenados con datos de campeones.", input_ph: "Ej: Padre 'Galileo'...", btn: "Generar Nombres", chat_ph: "Consulta veterinaria...", disclaimer: "IA Beta." },
    pricing: { title: "Planes", monthly: "Mes", yearly: "Año", plans: [{ name: "Stable", price: "29", feat: ["10 Caballos", "Básico"] }, { name: "Grand Prix", price: "79", feat: ["50 Caballos", "IA", "App Dueños"] }, { name: "Turf Club", price: "199", feat: ["Ilimitado", "API", "Manager"] }] },
    faq: { title: "Preguntas Frecuentes", q1: "¿Funciona offline?", a1: "Sí, sincroniza al reconectar.", q2: "¿Migración?", a2: "Sí, importamos tu Excel gratis.", q3: "¿Seguridad?", a3: "Encriptación bancaria AES-256." },
    contact: { title: "¿Listo?", subtitle: "Agenda demo.", name: "Nombre", email: "Email", msg: "Mensaje", btn: "Enviar", success: "¡Mensaje Enviado!" }
  },
  en: {
    lang_code: "EN",
    nav: { system: "ECOSYSTEM", labs: "AI LABS", pricing: "PRICING", contact: "CONTACT", login: "LOGIN" },
    hero: { pill: "HANDICAPP OS 2.0", line1: "DIGITAL", line2: "INSTINCT", desc: "The ultimate operating platform for high-performance stud farms.", cta: "Start Trial", video: "Watch Film" },
    roles: {
      title: "ONE PLATFORM, MULTIPLE VISIONS",
      r1: "Owner", r1_d: "Receive videos and reports in real-time. Total transparency on your investment.",
      r2: "Veterinarian", r2_d: "Unified digital medical history. Health alerts and auto-vaccination reminders.",
      r3: "Manager", r3_d: "Stock control, staff management, and farm finances in one dashboard."
    },
    hotspots: {
      stock: "Stock Control", stock_d: "Auto-alerts when feed or meds go below minimum.",
      health: "Physical Status", health_d: "24/7 monitoring of vitals and recovery.",
      notify: "Notifications", notify_d: "Instant push alerts to the whole team."
    },
    trust: { title: "TRUST", desc: "Industry leaders run with us.", quote: "Handicapp transformed our operation.", author: "Roberto Álvarez, Director El Paraiso Stud" },
    workflow: { title: "THE PERFECT FLOW", step1_t: "Field Capture", step1_d: "Vital data in seconds, offline.", step2_t: "Neural Sync", step2_d: "AI detects anomalies.", step3_t: "Immediate Impact", step3_d: "Auto-notification to owner." },
    labs: { title: "Equine Intelligence", desc: "AI trained on champion data.", input_ph: "Ex: Sire 'Galileo'...", btn: "Generate Names", chat_ph: "Vet inquiry...", disclaimer: "AI Beta." },
    pricing: { title: "Pricing", monthly: "Mo", yearly: "Yr", plans: [{ name: "Stable", price: "29", feat: ["10 Horses", "Basic"] }, { name: "Grand Prix", price: "79", feat: ["50 Horses", "AI", "Owner App"] }, { name: "Turf Club", price: "199", feat: ["Unlimited", "API", "Manager"] }] },
    faq: { title: "FAQ", q1: "Offline work?", a1: "Yes, syncs on reconnect.", q2: "Migration?", a2: "Yes, free Excel import.", q3: "Secure?", a3: "AES-256 bank-grade." },
    contact: { title: "Ready?", subtitle: "Book demo.", name: "Name", email: "Email", msg: "Message", btn: "Send", success: "Message Sent!" }
  },
  de: {
    lang_code: "DE",
    nav: { system: "ÖKOSYSTEM", labs: "KI LABS", pricing: "PREISE", contact: "KONTAKT", login: "ANMELDEN" },
    hero: { pill: "HANDICAPP OS 2.0", line1: "DIGITALER", line2: "INSTINKT", desc: "Die ultimative Betriebsplattform für Hochleistungsgestüte.", cta: "Starten", video: "Film" },
    roles: {
      title: "EINE PLATTFORM, MEHRERE VISIONEN",
      r1: "Besitzer", r1_d: "Erhalten Sie Videos und Berichte in Echtzeit. Totale Transparenz.",
      r2: "Tierarzt", r2_d: "Digitale Krankenakte. Gesundheitswarnungen und Impferinnerungen.",
      r3: "Manager", r3_d: "Bestandskontrolle, Personalmanagement und Finanzen in einem Dashboard."
    },
    hotspots: {
      stock: "Bestandskontrolle", stock_d: "Auto-Warnungen bei niedrigem Bestand.",
      health: "Physischer Status", health_d: "24/7 Überwachung der Vitalwerte.",
      notify: "Benachrichtigungen", notify_d: "Sofortige Push-Benachrichtigungen."
    },
    trust: { title: "VERTRAUEN", desc: "Branchenführer vertrauen uns.", quote: "Handicapp hat uns verändert.", author: "Roberto Álvarez, Direktor Gestüt El Paraíso" },
    workflow: { title: "PERFEKTER ABLAUF", step1_t: "Felderfassung", step1_d: "Daten in Sekunden, offline.", step2_t: "Neuronale Sync", step2_d: "KI erkennt Anomalien.", step3_t: "Sofortige Wirkung", step3_d: "Auto-Benachrichtigung." },
    labs: { title: "Pferde-Intelligenz", desc: "KI trainiert mit Champions.", input_ph: "Vater 'Galileo'...", btn: "Generieren", chat_ph: "Tierarztfrage...", disclaimer: "KI Beta." },
    pricing: { title: "Preise", monthly: "Monat", yearly: "Jahr", plans: [{ name: "Stall", price: "29", feat: ["10 Pferde", "Basis"] }, { name: "Grand Prix", price: "79", feat: ["50 Pferde", "KI", "App"] }, { name: "Turf Club", price: "199", feat: ["Unbegrenzt", "API", "Manager"] }] },
    faq: { title: "FAQ", q1: "Offline?", a1: "Ja, sync bei Verbindung.", q2: "Migration?", a2: "Ja, Excel import.", q3: "Sicher?", a3: "AES-256 Verschlüsselung." },
    contact: { title: "Bereit?", subtitle: "Demo buchen.", name: "Name", email: "Email", msg: "Nachricht", btn: "Senden", success: "Gesendet!" }
  }
};

/**
 * --- CUSTOM CURSOR ---
 */
const CustomCursor = ({ isDark }) => {
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
      <div ref={cursorRef} className={`absolute w-3 h-3 rounded-full mix-blend-difference ${isDark ? 'bg-[#D1F366]' : 'bg-[#4F46E5]'} top-0 left-0 -mt-1.5 -ml-1.5`} />
      <div ref={trailingRef} className={`absolute w-8 h-8 rounded-full border opacity-50 top-0 left-0 ${isDark ? 'border-[#D1F366]' : 'border-[#4F46E5]'}`} />
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
    <div className={`fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mb-8 relative">
         {ASSETS.logoIcon ? <img src={ASSETS.logoIcon} className="w-20 h-20 md:w-24 md:h-24 animate-pulse" alt="Loading" /> : <div className="w-20 h-20 md:w-24 md:h-24 bg-[#D1F366] rounded-full animate-pulse flex items-center justify-center font-bold text-black text-3xl">H</div>}
      </div>
      <div className="w-80 h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-4"><div className="h-full bg-[#D1F366] transition-all duration-200 shadow-[0_0_10px_rgba(209,243,102,0.5)]" style={{ width: `${progress}%` }}></div></div>
      <div className="font-mono text-[#D1F366] text-sm tracking-widest">SYSTEM_BOOTING :: {Math.min(100, Math.floor(progress))}%</div>
    </div>
  );
};

/**
 * --- THREE.JS BACKGROUND ---
 */
const ThreeEquestrianFlow = ({ isDark }) => {
  const mountRef = useRef(null);
  useEffect(() => {
    const THREE = window.THREE;
    if (!mountRef.current || !THREE) return;
    if (mountRef.current.firstChild) while(mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x050505 : 0xF4F4F5, 0.005);
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
    const material = new THREE.PointsMaterial({ color: isDark ? 0xD1F366 : 0x4F46E5, size: 0.5, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
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
  }, [isDark]);
  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10" />;
};

/**
 * --- ROLE SELECTOR ---
 */
const RoleSelector = ({ t, isDark, theme }) => {
  const [activeRole, setActiveRole] = useState(0);
  const roles = [
    { title: t.roles.r1, desc: t.roles.r1_d, icon: User },
    { title: t.roles.r2, desc: t.roles.r2_d, icon: HeartPulse },
    { title: t.roles.r3, desc: t.roles.r3_d, icon: Target }
  ];

  return (
    <section className="py-24 relative z-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center">{t.roles.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <div 
              key={i}
              onClick={() => setActiveRole(i)}
              className={`cursor-pointer p-10 rounded-2xl border transition-all duration-300 ${activeRole === i ? `${theme.glass} border-current transform scale-105 shadow-2xl` : `border-transparent opacity-50 hover:opacity-100 hover:bg-white/5`}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${activeRole === i ? theme.accentBg + ' text-black' : 'bg-white/10'}`}>
                <role.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
              <p className={`text-base leading-relaxed ${theme.textMuted}`}>{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * --- HOTSPOT OVERLAY ---
 */
const Hotspot = ({ x, y, label, desc, theme }) => (
  <div className="absolute group" style={{ top: y, left: x }}>
    <div className={`w-4 h-4 rounded-full ${theme.accentBg} animate-ping absolute`}></div>
    <div className={`relative w-4 h-4 rounded-full ${theme.accentBg} border-2 border-white cursor-pointer`}></div>
    
    <div className="absolute left-6 top-0 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
      <div className={`p-4 rounded-xl ${theme.glass} border ${theme.border} text-left`}>
        <p className="text-xs font-bold uppercase mb-1">{label}</p>
        <p className={`text-[10px] ${theme.textMuted}`}>{desc}</p>
      </div>
    </div>
  </div>
);

/**
 * --- VIDEO MODAL ---
 */
const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 p-6">
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-[#D1F366] transition-colors"><X size={40} /></button>
      <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-4">
          <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center"><Play size={40} className="ml-2 text-white" fill="currentColor" /></div>
          <p className="text-sm font-bold tracking-widest uppercase">Video Showreel</p>
        </div>
      </div>
    </div>
  );
};

const VerticalWorkflow = ({ t, isDark, theme }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveStep(parseInt(entry.target.getAttribute('data-index'))); });
    }, { threshold: 0.6 });
    stepsRef.current.forEach(step => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, []);
  const steps = [ { title: t.workflow.step1_t, desc: t.workflow.step1_d, icon: Smartphone, id: 0 }, { title: t.workflow.step2_t, desc: t.workflow.step2_d, icon: Network, id: 1 }, { title: t.workflow.step3_t, desc: t.workflow.step3_d, icon: BellRing, id: 2 }];
  return (
    <section className={`py-24 relative ${isDark ? 'bg-zinc-900/30' : 'bg-white/50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-24 text-center">{t.workflow.title}</h2>
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2 hidden md:block"><div className="sticky top-32 h-[500px] w-full"><div className={`relative w-full h-full rounded-[2.5rem] border ${theme.border} ${theme.glass} overflow-hidden shadow-2xl`}><div className={`absolute inset-0 opacity-20 transition-colors duration-700 ${activeStep === 0 ? 'bg-zinc-500' : activeStep === 1 ? 'bg-[#D1F366]' : 'bg-[#4F46E5]'}`}></div><div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"><div className={`mb-8 p-8 rounded-full border-2 ${theme.border} transition-all duration-500 transform ${activeStep === 0 ? 'scale-100 rotate-0' : activeStep === 1 ? 'scale-110 rotate-180' : 'scale-100 rotate-0'}`}>{activeStep === 0 && <Radio size={64} className="animate-pulse" />}{activeStep === 1 && <Cpu size={64} className={theme.accent} />}{activeStep === 2 && <User size={64} className={isDark ? 'text-white' : 'text-black'} />}</div><h3 className="text-2xl font-black mb-4 uppercase tracking-widest">{activeStep === 0 ? "DATA_INPUT" : activeStep === 1 ? "NEURAL_PROCESSING" : "CLIENT_DELIVERY"}</h3></div></div></div></div>
          <div className="md:w-1/2 space-y-[60vh] py-[10vh]">{steps.map((step, i) => (<div key={i} data-index={i} ref={el => stepsRef.current[i] = el} className={`transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-10'}`}><div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${theme.accentBg} text-white`}><step.icon size={32} /></div><h3 className="text-4xl font-bold mb-4">{step.title}</h3><p className={`text-xl leading-relaxed ${theme.textMuted}`}>{step.desc}</p></div>))}</div>
        </div>
      </div>
    </section>
  );
};

const AILabs = ({ t, isDark, theme }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const handleGen = async () => { if(!prompt) return; setLoading(true); const res = await callGeminiAPI(`Expert equestrian: Names for horse like: ${prompt}. List only.`); setResponse(res); setLoading(false); };
  return (
    <section id="labs" className="py-32 px-6 relative">
      <div className={`max-w-6xl mx-auto rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden border ${theme.glass} shadow-2xl`}>
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-20 ${theme.accentBg}`}></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div><div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-6 ${isDark ? 'bg-[#D1F366] text-black' : 'bg-[#4F46E5] text-white'}`}><Sparkles size={12} fill="currentColor" /> Gemini AI Core</div><h2 className={`text-4xl md:text-5xl font-black mb-4 leading-tight`}>{t.labs.title}</h2><p className={`text-lg ${theme.textMuted}`}>{t.labs.desc}</p></div>
            <div className="space-y-4">
              <div className="relative"><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.labs.input_ph} className={`w-full p-5 rounded-xl border outline-none transition-all font-medium ${isDark ? 'bg-black/50 border-zinc-800 text-white focus:border-[#D1F366]' : 'bg-white border-zinc-200 text-zinc-900 focus:border-[#4F46E5]'}`} /><div className="absolute right-4 top-1/2 -translate-y-1/2"><Dna size={20} className={theme.textMuted} /></div></div>
              <button onClick={handleGen} disabled={loading} className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isDark ? 'bg-white text-black hover:bg-[#D1F366]' : 'bg-black text-white hover:bg-[#4F46E5]'}`}>{loading ? <Loader2 className="animate-spin" /> : t.labs.btn} <ArrowRight size={18} /></button>
            </div>
          </div>
          <div className={`rounded-3xl p-8 border ${isDark ? 'bg-black/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} min-h-[400px] flex flex-col relative overflow-hidden`}><div className="flex justify-between items-center mb-6 opacity-50"><div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div></div><div className="font-mono text-xs">AI_OUTPUT_V1</div></div><div className={`flex-1 font-mono text-sm leading-loose whitespace-pre-wrap ${theme.accent}`}>{response || <span className="opacity-30">// Ready...</span>}</div></div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = ({ t, isDark, theme }) => (
  <section className={`py-20 border-y ${theme.border} overflow-hidden`}>
    <div className="max-w-7xl mx-auto px-6 mb-12 text-center"><p className={`text-xs font-black tracking-widest uppercase mb-4 opacity-50`}>{t.trust.title}</p><h3 className={`text-xl md:text-2xl font-bold ${theme.textMuted}`}>{t.trust.desc}</h3></div>
    <div className="flex overflow-hidden relative"><div className="flex gap-16 animate-marquee whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity">{[...ASSETS.logos, ...ASSETS.logos].map((logo, i) => (<img key={i} src={logo} alt="Partner" className={`h-12 w-auto grayscale mix-blend-difference`} />))}</div></div>
    <div className="max-w-3xl mx-auto mt-20 px-6"><div className={`p-10 rounded-[2rem] border ${theme.glass} text-center relative`}><div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${theme.accentBg} flex items-center justify-center text-white`}><Star fill="currentColor" size={20} /></div><p className="text-xl md:text-2xl font-medium italic mb-6 leading-relaxed">"{t.trust.quote}"</p><p className={`text-sm font-bold tracking-widest ${theme.accent}`}>{t.trust.author}</p></div></div>
  </section>
);

const FAQ = ({ t, isDark, theme }) => {
  const [open, setOpen] = useState(0);
  const items = [{ q: t.faq.q1, a: t.faq.a1 }, { q: t.faq.q2, a: t.faq.a2 }, { q: t.faq.q3, a: t.faq.a3 }];
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto"><h2 className="text-4xl font-black text-center mb-16">{t.faq.title}</h2><div className="space-y-4">{items.map((item, i) => (<div key={i} className={`border ${theme.border} rounded-2xl overflow-hidden ${theme.glass}`}><button onClick={() => setOpen(open === i ? -1 : i)} className="w-full p-6 text-left flex justify-between items-center font-bold text-lg hover:bg-white/5 transition-colors">{item.q}{open === i ? <Minus size={20} className={theme.accent} /> : <Plus size={20} className="opacity-50" />}</button><div className={`px-6 overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}><p className={`${theme.textMuted}`}>{item.a}</p></div></div>))}</div></section>
  );
};

const ContactForm = ({ t, isDark, theme }) => {
  const [status, setStatus] = useState('idle');
  const handleSubmit = (e) => { e.preventDefault(); setStatus('loading'); setTimeout(() => setStatus('success'), 1500); };
  return (
    <section id="contact" className={`py-40 px-6 relative overflow-hidden border-t ${theme.border}`}>
       <div className={`absolute inset-0 opacity-10 ${theme.accentBg} blur-[200px]`}></div>
       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 relative z-10 items-center">
          <div><h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">{t.contact.title}</h2><p className={`text-xl ${theme.textMuted}`}>{t.contact.subtitle}</p></div>
          <form onSubmit={handleSubmit} className={`p-10 rounded-[2rem] border ${theme.glass} space-y-6`}>
             <div><label className="text-xs font-bold uppercase opacity-50 mb-2 block">{t.contact.name}</label><input className={`w-full p-4 rounded-xl border bg-transparent outline-none ${theme.border} focus:border-current`} /></div>
             <div><label className="text-xs font-bold uppercase opacity-50 mb-2 block">{t.contact.email}</label><input className={`w-full p-4 rounded-xl border bg-transparent outline-none ${theme.border} focus:border-current`} /></div>
             <div><label className="text-xs font-bold uppercase opacity-50 mb-2 block">{t.contact.msg}</label><textarea rows={4} className={`w-full p-4 rounded-xl border bg-transparent outline-none ${theme.border} focus:border-current`}></textarea></div>
             <button disabled={status !== 'idle'} className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} ${status === 'success' ? 'bg-green-500 text-white' : ''}`}>
               {status === 'loading' ? <Loader2 className="animate-spin" /> : status === 'success' ? <><CheckCircle2 /> {t.contact.success}</> : t.contact.btn}
             </button>
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
export default function App() {
  const [langIndex, setLangIndex] = useState(0);
  const langs = ['es', 'en', 'de'];
  const toggleLang = () => setLangIndex((prev) => (prev + 1) % langs.length);
  const t = I18N[langs[langIndex]];
  const [isDark, setIsDark] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const theme = isDark ? THEME.dark : THEME.light;

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
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} font-['Outfit'] selection:${isDark ? 'bg-[#D1F366] text-black' : 'bg-[#4F46E5] text-white'}`}>
      <style>{`.animate-marquee { animation: marquee 30s linear infinite; } @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      
      <Preloader onLoadComplete={() => setLoaded(true)} />
      <CustomCursor isDark={isDark} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} t={t} theme={theme} />
      
      {loaded && (
        <>
          <ThreeEquestrianFlow isDark={isDark} />
          <div className={`fixed inset-0 -z-10 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]' : 'bg-gradient-to-b from-transparent via-white/50 to-white'}`}></div>
          <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />

          <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 ' + theme.glass + ' border-b ' + theme.border : 'py-6 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <div className="flex items-center gap-3 group cursor-pointer">
                {ASSETS.logoFull ? (
                  <img src={ASSETS.logoFull} alt="Handicapp" className={`${scrolled ? 'h-9' : 'h-11'} w-auto transition-all duration-500 group-hover:scale-105 ${isDark ? '' : 'invert'}`} />
                ) : (
                  <span className="font-bold tracking-tighter text-2xl">HANDICAPP</span>
                )}
              </div>
              <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[12px] font-bold tracking-[0.15em]">
                {Object.entries(t.nav).filter(([key]) => key !== 'login').map(([key, label]) => (
                  <a key={key} href={`#${key}`} className="opacity-70 hover:opacity-100 hover:text-current transition-all hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current after:transition-all hover:after:w-full">{label}</a>
                ))}
              </div>
              <div className="flex items-center gap-3 lg:gap-4">
                <button onClick={toggleLang} className={`text-[11px] font-black px-3 py-2.5 rounded-lg border ${theme.border} hover:bg-white/5 transition-all hover:scale-105`}>{t.lang_code}</button>
                <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-lg border ${theme.border} hover:bg-white/5 transition-all hover:scale-105`}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
                <button className={`hidden sm:flex px-7 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all hover:scale-105 ${isDark ? 'bg-[#D1F366] text-black shadow-[0_0_20px_-5px_rgba(209,243,102,0.5)]' : 'bg-[#4F46E5] text-white shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]'}`}>{t.nav.login}</button>
                <button className="md:hidden p-2" onClick={() => setMenuOpen(true)}><Menu size={24}/></button>
              </div>
            </div>
          </nav>

          <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity"><img src={ASSETS.heroHorse} className="w-full h-full object-cover grayscale scale-105 animate-[pulse_10s_ease-in-out_infinite]" alt="Hero" /></div>
            <div className={`absolute inset-0 z-0 bg-gradient-to-t ${isDark ? 'from-[#050505] via-[#050505]/80' : 'from-[#F4F4F5] via-[#F4F4F5]/80'} to-transparent`}></div>
            <div className="relative z-10 text-center px-6 max-w-7xl">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 border ${theme.glass} shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000`}><span className={`w-2.5 h-2.5 rounded-full animate-pulse ${theme.accentBg}`}></span><span className="text-[11px] font-black tracking-[0.25em]">{t.hero.pill}</span></div>
              <h1 className="text-7xl md:text-[10rem] lg:text-[11rem] leading-[0.8] font-black tracking-tighter mb-12 animate-in fade-in zoom-in duration-1000 delay-100"><span className="block text-transparent bg-clip-text bg-gradient-to-b from-current to-transparent opacity-90">{t.hero.line1}</span><span className={`block ${theme.accent}`}>{t.hero.line2}</span></h1>
              <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-16 opacity-70 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">{t.hero.desc}</p>
              <div className="flex flex-col md:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <button className={`px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_0_40px_-10px] transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-[#D1F366] text-black shadow-[#D1F366]/40' : 'bg-[#4F46E5] text-white shadow-[#4F46E5]/40'}`}>{t.hero.cta}</button>
                <button onClick={() => setVideoOpen(true)} className={`group px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest border-2 transition-all hover:bg-current hover:text-transparent hover:bg-clip-text flex items-center justify-center gap-3 ${theme.border}`}><Play size={18} fill="currentColor" className={`transition-transform group-hover:scale-110 ${theme.accent}`} /> {t.hero.video}</button>
              </div>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40"><MousePointer2 size={28} /></div>
          </section>

          <RoleSelector t={t} isDark={isDark} theme={theme} />
          <SocialProof t={t} isDark={isDark} theme={theme} />
          <VerticalWorkflow t={t} isDark={isDark} theme={theme} />
          
          <section id="system" className={`py-32 relative overflow-hidden ${theme.glass} border-y ${theme.border}`}>
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-black mb-8 leading-tight">Total Control.<br/>Zero Friction.</h2>
                <p className={`text-xl mb-8 leading-relaxed ${theme.textMuted}`}>La interfaz de Handicapp fue diseñada con veterinarios y entrenadores olímpicos. Cada píxel tiene un propósito.</p>
                <ul className="space-y-4 mb-8">
                  {["Stock Control", "Health Alerts", "Team Notify"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 font-bold"><CheckCircle2 className={theme.accent} /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className={`absolute inset-0 rounded-[2rem] blur-2xl opacity-30 ${theme.accentBg}`}></div>
                <div className={`relative rounded-[2rem] overflow-hidden border ${theme.border} shadow-2xl`}>
                  {/* FIX PARA DASHBOARD IMAGE: Usamos aspecto ratio fijo para evitar el colapso */}
                  <div className="aspect-[16/9] w-full bg-zinc-900 relative">
                    {ASSETS.dashboardScreen ? (
                      <img src={ASSETS.dashboardScreen} alt="Dashboard" className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-700">Dashboard Preview</div>
                    )}
                    {/* HOTSPOTS */}
                    <Hotspot x="20%" y="30%" label={t.hotspots.stock} desc={t.hotspots.stock_d} theme={theme} />
                    <Hotspot x="50%" y="50%" label={t.hotspots.health} desc={t.hotspots.health_d} theme={theme} />
                    <Hotspot x="80%" y="20%" label={t.hotspots.notify} desc={t.hotspots.notify_d} theme={theme} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AILabs t={t} isDark={isDark} theme={theme} />

          <section id="pricing" className="py-32 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24"><h2 className="text-5xl font-black mb-6 tracking-tight">{t.pricing.title}</h2><div className={`inline-flex items-center gap-4 p-2 pr-6 rounded-full border ${theme.glass}`}><div className={`px-4 py-2 rounded-full text-xs font-bold ${isDark ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-black'}`}>{t.pricing.monthly}</div><span className="text-sm font-bold opacity-50">{t.pricing.yearly} (-20%)</span></div></div>
              <div className="grid md:grid-cols-3 gap-8">{t.pricing.plans.map((plan, i) => (<div key={i} className={`relative p-10 rounded-[2rem] border transition-all duration-500 hover:-translate-y-4 ${theme.glass} ${i === 1 ? (isDark ? 'border-[#D1F366] shadow-[0_0_50px_-20px_rgba(209,243,102,0.3)]' : 'border-[#4F46E5] shadow-[0_0_50px_-20px_rgba(79,70,229,0.3)]') : ''}`}>{i === 1 && <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-[#D1F366] text-black' : 'bg-[#4F46E5] text-white'}`}>Most Popular</div>}<h3 className="text-2xl font-bold mb-4">{plan.name}</h3><div className="flex items-baseline gap-1 mb-8"><span className="text-6xl font-black">${plan.price}</span><span className="text-sm opacity-60">/mo</span></div><ul className="space-y-5 mb-12">{plan.feat.map((f, j) => (<li key={j} className="flex items-center gap-3 text-sm font-medium opacity-80"><CheckCircle2 size={18} className={theme.accent} /> {f}</li>))}</ul><button className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors ${i===1 ? (isDark ? 'bg-[#D1F366] text-black hover:bg-white' : 'bg-[#4F46E5] text-white hover:bg-black') : `border ${theme.border} hover:bg-current hover:text-transparent hover:bg-clip-text`}`}>Choose {plan.name}</button></div>))}</div>
            </div>
          </section>

          <FAQ t={t} isDark={isDark} theme={theme} />
          <ContactForm t={t} isDark={isDark} theme={theme} />

          <footer className={`py-16 border-t ${theme.border} text-center relative z-10 ${theme.bg}`}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                {ASSETS.logoIcon ? (
                  <img src={ASSETS.logoIcon} alt="H" className={`w-10 h-10 ${isDark ? '' : 'invert'}`} />
                ) : (
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-base ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>H</div>
                )}
                <span className="font-bold text-sm tracking-widest">HANDICAPP INC.</span>
              </div>
              <p className="text-sm opacity-50">© 2026 Future Equestrian Systems. All rights reserved.</p>
              <div className="flex gap-8 text-[11px] font-black tracking-widest opacity-60"><a href="#" className="hover:opacity-100 transition-opacity">INSTAGRAM</a><a href="#" className="hover:opacity-100 transition-opacity">TWITTER</a><a href="#" className="hover:opacity-100 transition-opacity">LEGAL</a></div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

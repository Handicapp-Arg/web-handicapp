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

/**
 * --- GEMINI API UTILITIES ---
 */
const callGeminiAPI = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
  
  if (!apiKey) {
    throw new Error("API Key no configurada. Por favor, agrega tu API Key de Gemini en el archivo .env");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Error API Gemini: ${response.status} - ${errorData.error?.message || 'Error desconocido'}`);
    }
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error("La API no devolvió ninguna respuesta válida.");
    }
    
    return text;
  } catch (error) {
    console.error("Error llamando a Gemini API:", error);
    throw error;
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
  
  // Logos de sponsors y partners hípicos
  logos: [
    "/images/Abolonego.avif",      // Stud Abolengo - Criadero de caballos de carrera
    "/images/logo.png",             // Hipódromo de San Isidro - Institución hípica
    "/images/harasParaiso.webp",   // Haras El Paraíso - Establecimiento ecuestre
    "/images/LADOLFINA.avif"       // La Dolfina - Equipo de polo argentino
  ]
};

/**
 * --- CONFIGURACIÓN DE TEMA ---
 * Paleta de identidad Handicapp
 */
const THEME = {
  dark: {
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
  },
  light: {
    bg: "bg-white",
    bgSecondary: "bg-zinc-50",
    text: "text-[#0f172a]",                // Navy text en light mode
    textMuted: "text-zinc-600",
    accent: "text-[#af936f]",              // Golden Brown
    accentBg: "bg-[#af936f]",              // Golden Brown
    accentHover: "bg-[#8f7657]",           // Darker Gold (hover)
    accentCyan: "bg-[#0e445d]",            // Cyan Secundario
    border: "border-zinc-200",
    glass: "bg-white/80 backdrop-blur-xl border-zinc-200",
    navBg: "bg-white"
  }
};

/**
 * --- DICTIONARY ---
 */
const I18N = {
  es: {
    lang_code: "ES",
    nav: { system: "ECOSISTEMA", labs: "IA LABS", pricing: "PLANES", contact: "CONTACTO", login: "INGRESAR" },
    hero: { pill: "HANDICAPP", line1: "PLATAFORMA", line2: "ECUESTRE", desc: "De papeles a datos. De intuición a inteligencia. La plataforma ecuestre que escala con vos, desde un caballo hasta tu haras completo.", cta: "Conocer Más", video: "Hablar con Ventas" },
    roles: {
      title: "UNA PLATAFORMA, MÚLTIPLES VISIONES",
      r1: "Propietario", r1_d: "Recibe videos y reportes de tus caballos en tiempo real. Transparencia total sobre tu inversión.",
      r2: "Veterinario", r2_d: "Historial clínico digital unificado. Alertas sanitarias y recordatorios de vacunación automáticos.",
      r3: "Manager", r3_d: "Control de stock, gestión de personal y finanzas del haras en un solo dashboard.",
      r4: "Establecimiento", r4_d: "Administra caballos huéspedes, coordina empleados y asigna tareas operativas del día a día."
    },
    hotspots: {
      stock: "Control de Stock", stock_d: "Alertas automáticas cuando el alimento o medicina baja del mínimo.",
      health: "Estado Físico", health_d: "Monitoreo 24/7 de signos vitales y recuperación post-entreno.",
      notify: "Notificaciones", notify_d: "Avisos push instantáneos a todo el equipo."
    },
    trust: { title: "CONFIANZA", desc: "Los líderes de la industria ya corren con nosotros.", quote: "Handicapp transformó nuestra operación. Dejamos de perder tiempo en papeles.", author: "Roberto Álvarez, Director Haras El Paraíso" },
    workflow: { title: "EL FLUJO PERFECTO", step1_t: "Captura de Campo", step1_d: "Veterinarios y petiseros registran datos vitales en segundos, incluso sin señal.", step2_t: "Sincronización Neural", step2_d: "Nuestra IA procesa la información, detecta anomalías y actualiza el historial clínico.", step3_t: "Impacto Inmediato", step3_d: "El propietario recibe una notificación enriquecida con video y diagnóstico en tiempo real." },
    labs: { title: "Asistente IA", desc: "Pregunta lo que quieras saber de Handicapp. Gestión ecuestre, veterinaria, planes o cualquier duda.", input_ph: "Ej: ¿Cómo funciona Handicapp?", btn: "Consultar IA", chat_ph: "Consulta veterinaria...", disclaimer: "IA Beta." },
    pricing: { title: "Planes", monthly: "Mes", yearly: "Año", plans: [{ name: "Stable", price: "29", feat: ["10 Caballos", "Básico"] }, { name: "Grand Prix", price: "79", feat: ["50 Caballos", "IA", "App Dueños"] }, { name: "Turf Club", price: "199", feat: ["Ilimitado", "API", "Manager"] }] },
    faq: { 
      title: "Preguntas Frecuentes", 
      subtitle: "Todo lo que necesitas saber sobre Handicapp",
      q1: "¿Funciona offline?", 
      a1: "Sí, la aplicación funciona completamente sin conexión. Los veterinarios y el personal pueden registrar datos en campo y todo se sincroniza automáticamente cuando recuperan señal.",
      q2: "¿Puedo migrar mis datos actuales?", 
      a2: "Absolutamente. Importamos tus datos desde Excel, PDF o cualquier sistema anterior de forma gratuita. Nuestro equipo te asiste en todo el proceso de migración.",
      q3: "¿Qué tan seguro es Handicapp?", 
      a3: "Utilizamos encriptación bancaria AES-256 y servidores certificados SOC2. Tus datos están más seguros que en cualquier archivo físico.",
      q4: "¿Cuánto cuesta realmente?", 
      a4: "Los planes comienzan desde $29/mes para hasta 10 caballos. Sin costos ocultos, sin permanencia. Puedes cambiar o cancelar en cualquier momento.",
      q5: "¿Qué incluye la IA predictiva?", 
      a5: "Nuestros algoritmos analizan patrones de salud, rendimiento y predicen problemas antes de que ocurran. Detectamos anomalías en signos vitales y sugerimos acciones preventivas.",
      q6: "¿Ofrecen soporte técnico?", 
      a6: "Sí, soporte por chat, email y teléfono incluido en todos los planes. Tiempo de respuesta promedio: 2 horas. Para planes enterprise ofrecemos soporte 24/7.",
      q7: "¿Se integra con otros sistemas?", 
      a7: "Sí, tenemos API abierta y conectores para sistemas contables, veterinarios y de gestión más populares. También podemos desarrollar integraciones personalizadas.",
      q8: "¿Qué pasa con mis datos si cancelo?", 
      a8: "Tienes control total. Puedes exportar toda tu información en cualquier momento en formatos estándar (CSV, PDF, JSON). Nunca retenemos tus datos.",
      q9: "¿Hay app móvil?", 
      a9: "Sí, aplicaciones nativas para iOS y Android. Diseñadas para uso en campo con sincronización automática y modo offline completo.",
      q10: "¿Cuánto tiempo toma implementarlo?", 
      a10: "La mayoría de nuestros clientes están operativos en menos de 48 horas. Incluimos onboarding personalizado, capacitación del equipo y acompañamiento durante el primer mes.",
      stillHaveQuestions: "¿Aún tienes dudas?",
      contactUs: "Nuestro equipo está listo para ayudarte",
      getInTouch: "Contactar Ahora"
    },
    contact: { title: "¿Listo?", subtitle: "Agenda demo.", name: "Nombre", email: "Email", msg: "Mensaje", btn: "Enviar", success: "¡Mensaje Enviado!" }
  },
  en: {
    lang_code: "EN",
    nav: { system: "ECOSYSTEM", labs: "AI LABS", pricing: "PRICING", contact: "CONTACT", login: "LOGIN" },
    hero: { pill: "HANDICAPP", line1: "EQUESTRIAN", line2: "PLATFORM", desc: "From paperwork to data. From intuition to intelligence. The equestrian platform that scales with you, from one horse to your entire stud farm.", cta: "Learn More", video: "Talk to Sales" },
    roles: {
      title: "ONE PLATFORM, MULTIPLE VISIONS",
      r1: "Owner", r1_d: "Receive videos and reports in real-time. Total transparency on your investment.",
      r2: "Veterinarian", r2_d: "Unified digital medical history. Health alerts and auto-vaccination reminders.",
      r3: "Manager", r3_d: "Stock control, staff management, and farm finances in one dashboard.",
      r4: "Facility", r4_d: "Manage guest horses, coordinate employees and assign day-to-day operational tasks."
    },
    hotspots: {
      stock: "Stock Control", stock_d: "Auto-alerts when feed or meds go below minimum.",
      health: "Physical Status", health_d: "24/7 monitoring of vitals and recovery.",
      notify: "Notifications", notify_d: "Instant push alerts to the whole team."
    },
    trust: { title: "TRUST", desc: "Industry leaders run with us.", quote: "Handicapp transformed our operation.", author: "Roberto Álvarez, Director El Paraiso Stud" },
    workflow: { title: "THE PERFECT FLOW", step1_t: "Field Capture", step1_d: "Vital data in seconds, offline.", step2_t: "Neural Sync", step2_d: "AI detects anomalies.", step3_t: "Immediate Impact", step3_d: "Auto-notification to owner." },
    labs: { title: "AI Assistant", desc: "Ask anything you want to know about Handicapp. Equine management, veterinary, plans or any question.", input_ph: "Ex: How does Handicapp work?", btn: "Ask AI", chat_ph: "Vet inquiry...", disclaimer: "AI Beta." },
    pricing: { title: "Pricing", monthly: "Mo", yearly: "Yr", plans: [{ name: "Stable", price: "29", feat: ["10 Horses", "Basic"] }, { name: "Grand Prix", price: "79", feat: ["50 Horses", "AI", "Owner App"] }, { name: "Turf Club", price: "199", feat: ["Unlimited", "API", "Manager"] }] },
    faq: { 
      title: "FAQ", 
      subtitle: "Everything you need to know about Handicapp",
      q1: "Does it work offline?", 
      a1: "Yes, the app works completely offline. Vets and staff can record data in the field and everything syncs automatically when they reconnect.",
      q2: "Can I migrate my current data?", 
      a2: "Absolutely. We import your data from Excel, PDF or any previous system for free. Our team assists you throughout the migration process.",
      q3: "How secure is Handicapp?", 
      a3: "We use bank-grade AES-256 encryption and SOC2 certified servers. Your data is safer than any physical file.",
      q4: "What does it really cost?", 
      a4: "Plans start from $29/month for up to 10 horses. No hidden costs, no commitment. You can change or cancel anytime.",
      q5: "What does predictive AI include?", 
      a5: "Our algorithms analyze health and performance patterns to predict issues before they occur. We detect vital sign anomalies and suggest preventive actions.",
      q6: "Do you offer technical support?", 
      a6: "Yes, chat, email and phone support included in all plans. Average response time: 2 hours. Enterprise plans get 24/7 support.",
      q7: "Does it integrate with other systems?", 
      a7: "Yes, we have open API and connectors for popular accounting, veterinary and management systems. We can also develop custom integrations.",
      q8: "What happens to my data if I cancel?", 
      a8: "You have full control. You can export all your information anytime in standard formats (CSV, PDF, JSON). We never retain your data.",
      q9: "Is there a mobile app?", 
      a9: "Yes, native apps for iOS and Android. Designed for field use with automatic sync and full offline mode.",
      q10: "How long does implementation take?", 
      a10: "Most clients are operational in less than 48 hours. We include personalized onboarding, team training and support during the first month.",
      stillHaveQuestions: "Still have questions?",
      contactUs: "Our team is ready to help",
      getInTouch: "Contact Now"
    },
    contact: { title: "Ready?", subtitle: "Book demo.", name: "Name", email: "Email", msg: "Message", btn: "Send", success: "Message Sent!" }
  },
  de: {
    lang_code: "DE",
    nav: { system: "ÖKOSYSTEM", labs: "KI LABS", pricing: "PREISE", contact: "KONTAKT", login: "ANMELDEN" },
    hero: { pill: "HANDICAPP", line1: "PFERDE", line2: "PLATTFORM", desc: "Von Papier zu Daten. Von Intuition zu Intelligenz. Die Pferdeplattform, die mit dir wächst, von einem Pferd bis zu deinem kompletten Gestüt.", cta: "Mehr Erfahren", video: "Verkauf Kontaktieren" },
    roles: {
      title: "EINE PLATTFORM, MEHRERE VISIONEN",
      r1: "Besitzer", r1_d: "Erhalten Sie Videos und Berichte in Echtzeit. Totale Transparenz.",
      r2: "Tierarzt", r2_d: "Digitale Krankenakte. Gesundheitswarnungen und Impferinnerungen.",
      r3: "Manager", r3_d: "Bestandskontrolle, Personalmanagement und Finanzen in einem Dashboard.",
      r4: "Einrichtung", r4_d: "Verwalten Sie Gastpferde, koordinieren Sie Mitarbeiter und weisen Sie tägliche Aufgaben zu."
    },
    hotspots: {
      stock: "Bestandskontrolle", stock_d: "Auto-Warnungen bei niedrigem Bestand.",
      health: "Physischer Status", health_d: "24/7 Überwachung der Vitalwerte.",
      notify: "Benachrichtigungen", notify_d: "Sofortige Push-Benachrichtigungen."
    },
    trust: { title: "VERTRAUEN", desc: "Branchenführer vertrauen uns.", quote: "Handicapp hat uns verändert.", author: "Roberto Álvarez, Direktor Gestüt El Paraíso" },
    workflow: { title: "PERFEKTER ABLAUF", step1_t: "Felderfassung", step1_d: "Daten in Sekunden, offline.", step2_t: "Neuronale Sync", step2_d: "KI erkennt Anomalien.", step3_t: "Sofortige Wirkung", step3_d: "Auto-Benachrichtigung." },
    labs: { title: "KI-Assistent", desc: "Fragen Sie alles über Handicapp. Pferdemanagement, Tierarzt, Pläne oder jede Frage.", input_ph: "Wie funktioniert Handicapp?", btn: "KI Fragen", chat_ph: "Tierarztfrage...", disclaimer: "KI Beta." },
    pricing: { title: "Preise", monthly: "Monat", yearly: "Jahr", plans: [{ name: "Stall", price: "29", feat: ["10 Pferde", "Basis"] }, { name: "Grand Prix", price: "79", feat: ["50 Pferde", "KI", "App"] }, { name: "Turf Club", price: "199", feat: ["Unbegrenzt", "API", "Manager"] }] },
    faq: { 
      title: "FAQ", 
      subtitle: "Alles, was Sie über Handicapp wissen müssen",
      q1: "Funktioniert es offline?", 
      a1: "Ja, die App funktioniert komplett offline. Tierärzte und Personal können Daten im Feld erfassen und alles wird automatisch synchronisiert.",
      q2: "Kann ich meine aktuellen Daten migrieren?", 
      a2: "Auf jeden Fall. Wir importieren Ihre Daten aus Excel, PDF oder jedem vorherigen System kostenlos. Unser Team unterstützt Sie während des gesamten Migrationsprozesses.",
      q3: "Wie sicher ist Handicapp?", 
      a3: "Wir verwenden AES-256-Verschlüsselung in Bankqualität und SOC2-zertifizierte Server. Ihre Daten sind sicherer als jede physische Datei.",
      q4: "Was kostet es wirklich?", 
      a4: "Pläne beginnen ab 29€/Monat für bis zu 10 Pferde. Keine versteckten Kosten, keine Bindung. Sie können jederzeit ändern oder kündigen.",
      q5: "Was beinhaltet die prädiktive KI?", 
      a5: "Unsere Algorithmen analysieren Gesundheits- und Leistungsmuster, um Probleme vorherzusagen, bevor sie auftreten. Wir erkennen Anomalien bei Vitalwerten.",
      q6: "Bieten Sie technischen Support an?", 
      a6: "Ja, Chat-, E-Mail- und Telefonsupport in allen Plänen enthalten. Durchschnittliche Antwortzeit: 2 Stunden. Enterprise-Pläne erhalten 24/7-Support.",
      q7: "Integriert es sich mit anderen Systemen?", 
      a7: "Ja, wir haben eine offene API und Konnektoren für beliebte Buchhaltungs-, Veterinär- und Verwaltungssysteme. Wir können auch benutzerdefinierte Integrationen entwickeln.",
      q8: "Was passiert mit meinen Daten, wenn ich kündige?", 
      a8: "Sie haben die volle Kontrolle. Sie können alle Ihre Informationen jederzeit in Standardformaten (CSV, PDF, JSON) exportieren. Wir behalten Ihre Daten niemals.",
      q9: "Gibt es eine mobile App?", 
      a9: "Ja, native Apps für iOS und Android. Entwickelt für den Feldeinsatz mit automatischer Synchronisation und vollständigem Offline-Modus.",
      q10: "Wie lange dauert die Implementierung?", 
      a10: "Die meisten Kunden sind in weniger als 48 Stunden einsatzbereit. Wir bieten personalisiertes Onboarding, Teamschulung und Support im ersten Monat.",
      stillHaveQuestions: "Haben Sie noch Fragen?",
      contactUs: "Unser Team ist bereit zu helfen",
      getInTouch: "Jetzt Kontaktieren"
    },
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
      <div ref={cursorRef} className={`absolute w-3 h-3 rounded-full mix-blend-difference ${isDark ? 'bg-[#af936f]' : 'bg-[#af936f]'} top-0 left-0 -mt-1.5 -ml-1.5`} />
      <div ref={trailingRef} className={`absolute w-8 h-8 rounded-full border opacity-50 top-0 left-0 ${isDark ? 'border-[#af936f]' : 'border-[#af936f]'}`} />
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
const ThreeEquestrianFlow = ({ isDark }) => {
  const mountRef = useRef(null);
  useEffect(() => {
    const THREE = window.THREE;
    if (!mountRef.current || !THREE) return;
    if (mountRef.current.firstChild) while(mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x0f172a : 0xffffff, 0.005);
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
    const material = new THREE.PointsMaterial({ color: isDark ? 0xaf936f : 0xaf936f, size: 0.5, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
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
    <section className={`py-24 relative z-10 px-6 ${isDark ? 'bg-[#1e293b]/30' : 'bg-zinc-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center">{t.roles.title}</h2>
        
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
                  <div className={`p-12 md:p-16 rounded-3xl border-2 min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-[#af936f]/30' 
                      : 'bg-white border-[#af936f]/20'
                  } shadow-2xl hover:shadow-[0_0_60px_-15px_rgba(175,147,111,0.4)] transition-all duration-500`}>
                    {/* Efecto de brillo sutil */}
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
                  : `w-2.5 ${isDark ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-zinc-300 hover:bg-zinc-400'}`
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
  const [error, setError] = useState('');
  
  const handleGen = async () => { 
    if(!prompt) return; 
    setLoading(true); 
    setError('');
    setResponse('');
    
    try {
      const fullPrompt = `${HANDICAPP_KNOWLEDGE}

CONSULTA DEL USUARIO: ${prompt}

INSTRUCCIONES IMPORTANTES - PERSONALIDAD:
Eres un asistente amigable y cercano de Handicapp. Responde como si fueras una persona real conversando.

ESTILO DE RESPUESTA:
- Máximo 3-4 líneas de texto
- Usa lenguaje natural y conversacional (como WhatsApp o chat)
- Evita listas largas y textos formales
- Si necesitas dar opciones, máximo 2-3
- Usa emojis ocasionalmente para ser más humano (🐴 💡 ✅)
- Tutea al usuario, sé cercano

CONTENIDO:
- Responde SOLO con info de la BASE DE CONOCIMIENTO
- Si es sobre nombres de caballos: 3 nombres creativos (no 5)
- Si es sobre Handicapp: respuesta directa y breve
- Si es consulta veterinaria: ayuda rápida + "consultá con tu vet"
- Si no sabés: "No tengo esa info, pero el equipo te puede ayudar 😊"

EJEMPLO BUENO: "Handicapp cuesta desde $29/mes para 10 caballos. El plan más popular es Grand Prix a $79 con IA incluida 🚀"
EJEMPLO MALO: "Handicapp ofrece tres planes de precios diferentes: 1. Plan Stable: $29 por mes que incluye..."`;

      const res = await callGeminiAPI(fullPrompt); 
      setResponse(res);
    } catch (err) {
      setError(err.message || 'Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id="labs" className="py-32 px-6 relative">
      <div className={`max-w-6xl mx-auto rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden border ${theme.glass} shadow-2xl`}>
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-20 ${theme.accentBg}`}></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className={`text-4xl md:text-5xl font-black mb-4 leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.labs.title}</h2>
              <p className={`text-lg ${theme.textMuted}`}>{t.labs.desc}</p>
            </div>
            <div className="space-y-4">
              <div className="relative"><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.labs.input_ph} className={`w-full p-5 rounded-xl border outline-none transition-all font-medium ${isDark ? 'bg-black/50 border-zinc-800 text-white focus:border-[#af936f]' : 'bg-white border-zinc-200 text-zinc-900 focus:border-[#af936f]'}`} /><div className="absolute right-4 top-1/2 -translate-y-1/2"><Dna size={20} className={theme.textMuted} /></div></div>
              <button onClick={handleGen} disabled={loading} className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isDark ? 'bg-white text-black hover:bg-[#af936f] hover:text-white' : 'bg-black text-white hover:bg-[#af936f]'} disabled:opacity-50 disabled:cursor-not-allowed`}>{loading ? <Loader2 className="animate-spin" /> : t.labs.btn} <ArrowRight size={18} /></button>
            </div>
          </div>
          <div className={`rounded-3xl p-8 border ${isDark ? 'bg-black/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} min-h-[400px] flex flex-col relative overflow-hidden`}>
            <div className="flex justify-between items-center mb-6 opacity-50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              </div>
              <div className="font-mono text-xs">AI_OUTPUT_V1</div>
            </div>
            <div className={`flex-1 font-mono text-sm leading-loose whitespace-pre-wrap ${error ? 'text-red-500' : theme.accent}`}>
              {error ? `❌ ${error}` : response || <span className="opacity-30">// Ready...</span>}
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
    <section className={`py-24 border-y overflow-hidden relative ${isDark ? 'bg-[#1e293b]/20 border-[#af936f]/20' : 'bg-white border-zinc-200'}`}>
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#af936f] rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <p className={`text-xs font-black tracking-[0.3em] uppercase mb-4 ${theme.accent}`}>{t.trust.title}</p>
        <h3 className={`text-2xl md:text-3xl font-bold ${theme.text}`}>{t.trust.desc}</h3>
      </div>
      
      {/* Logos carousel con sponsors reales */}
      <div className="flex overflow-hidden relative mb-20">
        <div className="flex gap-16 md:gap-24 animate-marquee whitespace-nowrap">
          {[...ASSETS.logos, ...ASSETS.logos, ...ASSETS.logos].map((logo, i) => {
            const isHipodromoLogo = logo.includes('logo.png');
            return (
              <div key={i} className="flex items-center justify-center min-w-[180px] h-20">
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
      
      {/* Testimonial carousel mejorado */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-10">
        {/* Icono de estrella flotante FUERA de la tarjeta */}
        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full ${theme.accentBg} flex items-center justify-center text-white shadow-2xl z-20`}>
          <Star fill="currentColor" size={28} />
        </div>
        
        <div className={`px-16 py-10 md:px-20 md:py-12 rounded-[2rem] border-2 text-center relative ${
          isDark 
            ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-[#af936f]/30' 
            : 'bg-white border-[#af936f]/20'
        } shadow-2xl`}>
          {/* Quote decorativo eliminado para que sea más rectangular */}
          
          {/* Testimonial content with fade animation */}
          <div className="relative min-h-[140px] flex flex-col items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                  currentTestimonial === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <p className="text-xl md:text-2xl font-medium italic mb-6 leading-relaxed px-4">
                  "{testimonial.quote}"
                </p>
                
                {/* Divider dorado */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`h-px w-12 ${theme.accentBg}`}></div>
                  <div className={`w-2 h-2 rounded-full ${theme.accentBg}`}></div>
                  <div className={`h-px w-12 ${theme.accentBg}`}></div>
                </div>
                
                <p className={`text-sm font-bold tracking-widest uppercase ${theme.accent}`}>
                  {testimonial.author}, {testimonial.position}
                </p>
              </div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? `${theme.accentBg} w-8` 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
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
             <button disabled={status !== 'idle'} className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 ${status === 'success' ? 'bg-green-500 text-white' : isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
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
function AppContent() {
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
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} font-['Outfit'] selection:${isDark ? 'bg-[#af936f] text-white' : 'bg-[#af936f] text-white'}`}>
      <style>{`.animate-marquee { animation: marquee 30s linear infinite; } @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      
      <Preloader onLoadComplete={() => setLoaded(true)} />
      <CustomCursor isDark={isDark} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} t={t} theme={theme} />
      
      {loaded && (
        <>
          <ThreeEquestrianFlow isDark={isDark} />
          <div className={`fixed inset-0 -z-10 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]' : 'bg-gradient-to-b from-transparent via-white/50 to-white'}`}></div>
          <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />

          <Navbar 
            t={t} 
            theme={theme} 
            isDark={isDark} 
            scrolled={scrolled} 
            ASSETS={ASSETS}
            onToggleDark={() => setIsDark(!isDark)}
            onToggleLang={toggleLang}
            onMenuOpen={() => setMenuOpen(true)}
          />

          <Routes>
            <Route path="/" element={
              <HomePage 
                t={t}
                theme={theme}
                isDark={isDark}
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
              <FAQPage t={t} isDark={isDark} theme={theme} />
            } />
            
            <Route path="/legal" element={
              <LegalPage t={t} isDark={isDark} theme={theme} />
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

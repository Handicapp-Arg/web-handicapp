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
  logoFull: "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636413/handicapp/uploads/logo-full-white.webp",  // Logo completo horizontal
  logoIcon: "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636415/handicapp/uploads/logo-icon-white.webp",  // Logo icono/símbolo
  // Imagen Dashboard asegurada
  dashboardScreen: "/images/dashboard.png", // Screenshot del dashboard
  
  // Logos de sponsors y partners hípicos
  logos: [
    "/images/Abolonego.avif",      // Stud Abolengo - Criadero de caballos de carrera
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636416/handicapp/uploads/logo.webp",             // Hipódromo de San Isidro - Institución hípica
    "/images/harasParaiso.webp",   // Haras El Paraíso - Establecimiento ecuestre
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636408/handicapp/uploads/LADOLFINA.webp",       // La Dolfina - Equipo de polo argentino
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765640273/handicapp/uploads/0T1A5784.webp"         // Nueva imagen agregada
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
    bg: "bg-gradient-to-br from-zinc-50 via-white to-zinc-100",
    bgSecondary: "bg-gradient-to-br from-white to-zinc-50",
    text: "text-[#0f172a]",                // Navy text en light mode
    textMuted: "text-zinc-600",
    accent: "text-[#af936f]",              // Golden Brown
    accentBg: "bg-[#af936f]",              // Golden Brown
    accentHover: "bg-[#8f7657]",           // Darker Gold (hover)
    accentCyan: "bg-[#0e445d]",            // Cyan Secundario
    border: "border-zinc-300",
    glass: "bg-white/90 backdrop-blur-xl border-zinc-300 shadow-xl",
    navBg: "bg-white/95 backdrop-blur-xl"
  }
};

/**
 * --- DICTIONARY ---
 */
const I18N = {
  es: {
    lang_code: "ES",
    nav: { funcionalidades: "FUNCIONALIDADES", workflow: "CÓMO FUNCIONA", labs: "ASISTENTE IA", about: "NOSOTROS", contact: "CONTACTO" },
    hero: { 
      pill: "HANDICAPP", 
      line1: "GESTIÓN DE HARAS", 
      line2: "SIN PRECEDENTES.", 
      desc: "Reemplaza el caos de WhatsApp y Excel por una plataforma inteligente. Trazabilidad clínica, administrativa y deportiva en un solo lugar.", 
      cta: "Probar Gratis 14 Días", 
      video: "Hablar con Ventas" 
    },
    roles: {
      title: "TODO LO QUE NECESITAS, EN UN SOLO LUGAR",
      r1: "Propietario", 
      r1_d: "Protege tu inversión ecuestre con visibilidad total en tiempo real. Reportes médicos instantáneos, historial completo, seguimiento de competencias y alertas automáticas. Controla tu patrimonio desde cualquier lugar, 24/7.",
      r2: "Veterinario", 
      r2_d: "Trabaja más rápido y profesionalmente. Historial clínico digital completo, calendario inteligente de vacunas, recordatorios automáticos y registro centralizado. Más tiempo para tus pacientes, menos tiempo en papelería.",
      r3: "Manager / Administrador", 
      r3_d: "Optimiza la operación y reduce costos hasta un 40%. Dashboard ejecutivo con KPIs en vivo, sistema de tareas para coordinar equipos, reportes financieros automáticos y control total de recursos. Gestión profesional sin complicaciones.",
      r4: "Haras / Establecimiento", 
      r4_d: "Aumenta tu reputación y rentabilidad. Administra múltiples caballos huéspedes, coordina equipos profesionales, genera reportes automáticos para propietarios y mantén contratos organizados. La herramienta que usan los haras líderes."
    },
    hotspots: {
      stock: "Coordina Tu Equipo Sin Esfuerzo", 
      stock_d: "Olvídate del WhatsApp y los papeles. Asigna tareas, controla rutinas diarias, marca completadas y supervisa a todo el equipo en tiempo real. Reduce errores operativos hasta un 60% y mejora la comunicación interna.",
      health: "Salud Veterinaria Inteligente", 
      health_d: "Nunca más pierdas una vacuna o control médico. Calendario automatizado, alertas preventivas, historial clínico completo y recordatorios automáticos. Cuida mejor a tus caballos, mejora resultados deportivos.",
      notify: "Nunca Más Pierdas Un Evento Importante", 
      notify_d: "Sistema de alertas inteligente que te avisa de todo lo crítico: vacunas por vencer, controles veterinarios próximos, competencias programadas y tareas urgentes. Personalizable según tu rol. Mantén el control sin estrés."
    },
    trust: { 
      title: "YA CONFÍAN EN HANDICAPP", 
      desc: "Los principales establecimientos ecuestres de Argentina digitalizaron su gestión.", 
      quote: "El sistema de gestión integral nos permite tener control total de nuestros ejemplares. Es el futuro del turf.", 
      author: "Martín Petrini, Director Técnico - Stud Abolengo" 
    },
    workflow: { 
      title: "EMPIEZA HOY, VE RESULTADOS MAÑANA", 
      step1_t: "1. Sube Tu Información en Minutos", 
      step1_d: "Importa datos desde Excel/PDF o carga manualmente. Fichas de caballos, historial médico, establecimientos y documentación. Sin instalaciones complicadas, sin capacitación técnica. En 24 horas estás operativo. Migración gratuita incluida.",
      step2_t: "2. Automatiza Tu Operación Diaria", 
      step2_d: "Deja que Handicapp haga el trabajo pesado: asigna tareas automáticas, programa controles médicos recurrentes, genera reportes para propietarios con un click y coordina todo el equipo desde un solo lugar. Ahorra hasta 15 horas semanales.",
      step3_t: "3. Accede a Reportes y Análisis Completos", 
      step3_d: "Dashboard con vista panorámica de todas tus operaciones: caballos activos, competencias próximas, consultas veterinarias del mes y estado general de salud. Genera reportes de rendimiento deportivo, análisis de largo plazo y estadísticas comparativas con un solo click." 
    },
    labs: { 
      title: "Pregunta Lo Que Necesites", 
      desc: "Nuestro asistente inteligente responde todas tus dudas sobre Handicapp: funcionalidades, migración de datos, planes, comparativas o cómo mejorar la gestión de tu haras.", 
      input_ph: "Ej: ¿Cuánto tiempo ahorro con Handicapp vs Excel?", 
      btn: "Consultar Ahora", 
      chat_ph: "Escribe tu pregunta aquí...", 
      disclaimer: "Asistente IA entrenado con documentación oficial de Handicapp. Respuestas instantáneas." 
    },
    pricing: { 
      title: "Planes para Cada Necesidad", 
      monthly: "Mes", 
      yearly: "Año", 
      plans: [
        { 
          name: "Starter", 
          price: "29", 
          feat: ["Hasta 10 Caballos", "Dashboard", "Salud", "Notificaciones", "Soporte Email"] 
        }, 
        { 
          name: "Professional", 
          price: "79", 
          feat: ["Hasta 50 Caballos", "Todas las funciones", "Competencias", "Reportes", "Asistente IA", "Soporte Prioritario"] 
        }, 
        { 
          name: "Enterprise", 
          price: "199", 
          feat: ["Caballos Ilimitados", "Multi-establecimiento", "API Integración", "Manager dedicado", "Onboarding personalizado", "Soporte 24/7"] 
        }
      ] 
    },
    faq: { 
      title: "Resolvemos Tus Dudas", 
      subtitle: "Las respuestas más directas a las preguntas más importantes",
      q1: "¿Qué incluye Handicapp realmente?", 
      a1: "12 módulos profesionales todo incluido: Dashboard con métricas en vivo, Notificaciones automáticas inteligentes, Gestión de establecimientos múltiples, Fichas digitales completas de caballos, Módulo veterinario con historial clínico, Calendario de competencias y eventos, Sistema de entrenamiento y progreso, Reportes ejecutivos descargables, Sistema de tareas para coordinar equipos, Configuración personalizable y Gestión de suscripciones. Todo en una sola plataforma, sin módulos adicionales que comprar.",
      q2: "¿Es complicado migrar desde Excel o papeles?", 
      a2: "Es lo más fácil que existe. Importación automática desde Excel/CSV/PDF + nuestro equipo hace la migración por ti sin costo extra. Promedio: 24-48h y estás operativo. Incluye capacitación del equipo y soporte personalizado. Cero pérdida de datos, cero dolor de cabeza.",
      q3: "¿Mis datos están realmente seguros?", 
      a3: "Más seguros que en tu oficina. Encriptación militar AES-256 (misma que usan bancos), backup automático cada 6 horas, servidores certificados en Argentina, cumplimiento total GDPR y acceso controlado por roles. Tu información está más protegida que en cualquier archivo físico o Excel.",
      q4: "¿Cuánto cuesta comparado con mi sistema actual?", 
      a4: "Desde $29/mes (menos que una cena). Plan Professional $79/mes con TODO incluido para 50 caballos. Sin permanencia, cancela cuando quieras. Ahorra hasta 15 horas/semana en gestión manual. ROI positivo desde el primer mes. Incluye migración, capacitación y soporte sin costo extra.",
      q5: "¿Realmente funciona para MI haras?", 
      a5: "Sí, 100%. Ya sea que tengas 5 o 500 caballos, 1 o 10 establecimientos, equipo pequeño o grande. Handicapp se adapta a tu operación. Usado desde pequeños haras familiares hasta studs premium con operaciones complejas. Empieza simple, crece cuando necesites. Escalable sin límites.",
      q6: "¿Qué pasa si mi equipo no es técnico?", 
      a6: "No hay problema. Interfaz ultra simple, diseñada para gente de campo (no ingenieros). Incluye capacitación personalizada de tu equipo sin costo, videos tutoriales paso a paso y soporte técnico en español respondiendo en menos de 2 horas. Si usas WhatsApp, puedes usar Handicapp.",
      q7: "¿Puedo integrarlo con mi sistema contable?", 
      a7: "Plan Enterprise incluye API completa para conectar con sistemas contables (facturación automática), software veterinario externo, plataformas de gestión existentes y cualquier herramienta que uses. También desarrollamos conectores personalizados para grandes operaciones.",
      q8: "¿Hay costos ocultos o sorpresas?", 
      a8: "Cero. Precio fijo mensual, todo incluido. Sin costos de setup, sin cargos por usuario extra, sin módulos premium que desbloquear. Lo que ves es lo que pagas. Migración, capacitación y soporte incluidos. Sin permanencia, cancela cuando quieras y llévate toda tu información en CSV/Excel/PDF.",
      q9: "¿Funciona en el campo sin internet?", 
      a9: "La app funciona offline para consultar información y cargar datos básicos. Cuando recuperas conexión, todo se sincroniza automáticamente. Diseñado para funcionar en zonas rurales con conectividad intermitente. También optimizado para datos móviles (bajo consumo).",
      q10: "¿Qué tan rápido veo resultados reales?", 
      a10: "Resultados desde el Día 1. Implementación en 24-48h, equipo capacitado en 1 semana, ROI positivo en 30 días. Clientes reportan: 40% reducción de tiempo administrativo, 60% menos errores operativos, 100% mejor comunicación con propietarios. Primera semana gratis para comprobar.",
      stillHaveQuestions: "¿Todavía tienes preguntas?",
      contactUs: "Hablemos directamente. Respuesta en menos de 2 horas.",
      getInTouch: "Hablar con un Experto"
    },
    about: { 
      title: "NUESTRO ADN", 
      subtitle: "Nacidos en el campo, criados en el código.", 
      desc: "Handicapp nace de la frustración de perder registros médicos en papeles arrugados. Somos un equipo híbrido de jinetes, veterinarios e ingenieros de software obsesionados con una misión: digitalizar la tradición sin perder el alma.",
      val1: "Pasión Ecuestre", 
      val1_d: "Entendemos el sudor y la gloria del campo.",
      val2: "Innovación Radical", 
      val2_d: "Tecnología de punta aplicada al mundo hípico.",
      val3: "Transparencia Total", 
      val3_d: "Datos claros para propietarios claros."
    },
    contact: { 
      title: "Empieza Gratis Hoy", 
      subtitle: "Prueba Handicapp 14 días sin compromiso. Si no ves resultados, no pagas nada. Así de simple.", 
      name: "Nombre completo", 
      email: "Email de contacto", 
      msg: "Cuéntanos sobre tu operación (cantidad de caballos, equipo, principales necesidades)", 
      btn: "Empezar Prueba Gratuita", 
      success: "¡LISTO! REVISA TU EMAIL PARA ACCEDER A TU CUENTA DE PRUEBA." 
    }
  },
  en: {
    lang_code: "EN",
    nav: { funcionalidades: "FEATURES", workflow: "HOW IT WORKS", labs: "AI ASSISTANT", about: "ABOUT US", contact: "CONTACT" },
    hero: { 
      pill: "HANDICAPP", 
      line1: "PROFESSIONAL", 
      line2: "EQUESTRIAN MANAGEMENT", 
      desc: "Comprehensive system for complete equestrian activity management. Manage horses, health, competitions, training and facilities from one place.", 
      cta: "View Demo", 
      video: "Talk to Sales" 
    },
    roles: {
      title: "ONE PLATFORM, ALL ROLES",
      r1: "Owner", 
      r1_d: "Access complete horse profiles, health history, competitions and training. Maintain total control of your investment.",
      r2: "Veterinarian", 
      r2_d: "Complete digital medical history, vaccination calendar, automatic reminders and professional medical tracking.",
      r3: "Manager", 
      r3_d: "Central dashboard with reports, task management, event control and comprehensive facility administration.",
      r4: "Facility", 
      r4_d: "Manage multiple horses, coordinate your team with the task system and maintain control of all daily operations."
    },
    hotspots: {
      stock: "Task Management", 
      stock_d: "Create, assign and control daily tasks for your team. Complete stable routine management system.",
      health: "Comprehensive Health", 
      health_d: "Complete medical history, vaccination calendar, veterinary consultations and continuous medical tracking.",
      notify: "Smart Notifications", 
      notify_d: "Automatic veterinary check-up reminders, upcoming events and important system updates."
    },
    trust: { 
      title: "TRUST", 
      desc: "Argentina's leading equestrian facilities already trust Handicapp.", 
      quote: "Handicapp transformed our operation. We went from Excel spreadsheets to professional and centralized management.", 
      author: "Roberto Álvarez, Director El Paraiso Stud" 
    },
    workflow: { 
      title: "YOUR EQUESTRIAN MANAGEMENT IN 3 STEPS", 
      step1_t: "Register Everything in One Place", 
      step1_d: "Upload horses, facilities, health data, scheduled competitions and training sessions. Everything organized and easy to find.",
      step2_t: "Control and Plan", 
      step2_d: "Use the task system to coordinate your team, schedule events in the calendar and generate detailed performance and health reports.",
      step3_t: "Optimize with Information", 
      step3_d: "Dashboard with key metrics, complete history of each horse and smart notifications to make better decisions." 
    },
    labs: { 
      title: "Ask What You Need", 
      desc: "Ask what you need about Handicapp: features, equestrian management, plans or any question.", 
      input_ph: "Ex: What features does Handicapp have?", 
      btn: "Ask AI", 
      chat_ph: "Write your question...", 
      disclaimer: "AI Beta - Answers based on official information." 
    },
    pricing: { 
      title: "Plans for Every Need", 
      monthly: "Mo", 
      yearly: "Yr", 
      plans: [
        { 
          name: "Starter", 
          price: "29", 
          feat: ["Up to 10 Horses", "Dashboard", "Health", "Notifications", "Email Support"] 
        }, 
        { 
          name: "Professional", 
          price: "79", 
          feat: ["Up to 50 Horses", "All Features", "Competitions", "Reports", "AI Assistant", "Priority Support"] 
        }, 
        { 
          name: "Enterprise", 
          price: "199", 
          feat: ["Unlimited Horses", "Multi-facility", "API Integration", "Dedicated Manager", "Custom Onboarding", "24/7 Support"] 
        }
      ] 
    },
    faq: { 
      title: "FAQ", 
      subtitle: "Everything you need to know about Handicapp",
      q1: "What does Handicapp include?", 
      a1: "Handicapp includes 12 complete modules: Dashboard, Notifications, Facilities, My Horses, Health, Competitions, Training, Events, Reports, Tasks, Settings and Subscriptions. Everything needed to manage your equestrian activity professionally.",
      q2: "Can I migrate my current data?", 
      a2: "Yes, we import your data from Excel, spreadsheets or any previous system at no cost. Our team personally assists you throughout the migration process.",
      q3: "How secure is Handicapp?", 
      a3: "We use AES-256 encryption (bank-level) and certified servers. Your data is protected with the highest security standards and available 24/7.",
      q4: "What does it really cost?", 
      a4: "Plans from $29/month for up to 10 horses. Professional plan ($79/month) includes all features for up to 50 horses. No hidden costs, no commitment.",
      q5: "What management modules does it have?", 
      a5: "Complete horse management, veterinary health, sports competitions, training, event calendar, team task system, detailed reports and facility administration.",
      q6: "Do you offer technical support?", 
      a6: "Yes, all plans include support. Professional plan has priority support and Enterprise has dedicated manager and 24/7 attention.",
      q7: "Does it integrate with other systems?", 
      a7: "Enterprise plan includes API for custom integrations with accounting, veterinary and management systems. We can also develop specific connectors.",
      q8: "What happens to my data if I cancel?", 
      a8: "You have full control of your information. You can export all your data in standard formats (CSV, PDF, Excel) at any time. We never retain your information.",
      q9: "How does the task system work?", 
      a9: "You can create tasks, assign them to team members, set deadlines and mark them as complete. Ideal for coordinating daily stable routines.",
      q10: "How long does implementation take?", 
      a10: "Most of our clients are operational within 24-48 hours. We include personalized onboarding, team training and support during the first month of use.",
      stillHaveQuestions: "Still have questions?",
      contactUs: "Our team is ready to help you and answer all your questions",
      getInTouch: "Contact Now"
    },
    about: { 
      title: "OUR DNA", 
      subtitle: "Born in the field, raised in code.", 
      desc: "Handicapp was born from the frustration of losing medical records on crumpled paper. We are a hybrid team of riders, vets, and software engineers obsessed with one mission: digitizing tradition without losing its soul.",
      val1: "Equestrian Passion", 
      val1_d: "We understand the sweat and glory of the field.",
      val2: "Radical Innovation", 
      val2_d: "Cutting-edge technology applied to equestrian world.",
      val3: "Total Transparency", 
      val3_d: "Clear data for clear owners."
    },
    contact: { 
      title: "Ready to transform your management?", 
      subtitle: "Schedule a personalized demo and discover how Handicapp can optimize your operation.", 
      name: "Full name", 
      email: "Email", 
      msg: "Tell us about your operation (number of horses, team, main needs)", 
      btn: "Request Demo", 
      success: "DONE! CHECK YOUR EMAIL TO ACCESS YOUR TRIAL ACCOUNT." 
    }
  },
  de: {
    lang_code: "DE",
    nav: { funcionalidades: "FUNKTIONEN", workflow: "WIE ES FUNKTIONIERT", labs: "KI-ASSISTENT", about: "ÜBER UNS", contact: "KONTAKT" },
    hero: { 
      pill: "HANDICAPP", 
      line1: "PROFESSIONELLE", 
      line2: "PFERDEHALTUNG", 
      desc: "Umfassendes System für komplette Pferdehaltungsverwaltung. Verwalten Sie Pferde, Gesundheit, Wettbewerbe, Training und Einrichtungen an einem Ort.", 
      cta: "Demo Ansehen", 
      video: "Vertrieb Kontaktieren" 
    },
    roles: {
      title: "EINE PLATTFORM, MEHRERE VISIONEN",
      r1: "Besitzer", r1_d: "Erhalten Sie Videos und Berichte in Echtzeit. Totale Transparenz.",
      r2: "Tierarzt", r2_d: "Digitale Krankenakte. Gesundheitswarnungen und Impferinnerungen.",
      r3: "Manager", r3_d: "Bestandskontrolle, Personalmanagement und Finanzen in einem Dashboard.",
      r4: "Einrichtung", r4_d: "Verwalten Sie Gastpferde, koordinieren Sie Mitarbeiter und weisen Sie tägliche Aufgaben zu."
    },
    hotspots: {
      stock: "Aufgabenverwaltung", stock_d: "Aufgabensystem mit Verantwortungszuweisung und Stallroutinenkontrolle.",
      health: "Krankenakte", health_d: "Vollständige medizinische Überwachung, Impfkalender und tierärztliche Kontrollen.",
      notify: "Benachrichtigungen", notify_d: "Automatische Gesundheitserinnerungen, Ereignisse und Systemaktualisierungen."
    },
    trust: { title: "VERTRAUEN", desc: "Branchenführer vertrauen uns.", quote: "Handicapp hat uns verändert.", author: "Roberto Álvarez, Direktor Gestüt El Paraíso" },
    workflow: { title: "KOMPLETTE VERWALTUNG", step1_t: "Registrieren & Organisieren", step1_d: "Pferdeprofile, Einrichtungen, Gesundheit, Wettbewerbe und Training an einem Ort verwalten.", step2_t: "Kontrollieren & Planen", step2_d: "Aufgabensystem, automatische Erinnerungen, Ereigniskalender und detaillierte Leistungsberichte.", step3_t: "Entscheidungen Treffen", step3_d: "Dashboard mit wichtigen Metriken, vollständiger Historie und intelligenten Benachrichtigungen." },
    labs: { title: "KI-Assistent", desc: "Fragen Sie alles über Handicapp. Pferdemanagement, Tierarzt, Pläne oder jede Frage.", input_ph: "Wie funktioniert Handicapp?", btn: "KI Fragen", chat_ph: "Tierarztfrage...", disclaimer: "KI Beta." },
    pricing: { 
      title: "Pläne für Jeden Bedarf", 
      monthly: "Monat", 
      yearly: "Jahr", 
      plans: [
        { name: "Starter", price: "29", feat: ["Bis 10 Pferde", "Dashboard", "Gesundheit", "Benachrichtigungen", "Email Support"] }, 
        { name: "Professional", price: "79", feat: ["Bis 50 Pferde", "Alle Funktionen", "Wettbewerbe", "Berichte", "KI-Assistent", "Prioritäts-Support"] }, 
        { name: "Enterprise", price: "199", feat: ["Unbegrenzte Pferde", "Mehrere Einrichtungen", "API Integration", "Dedizierter Manager", "Persönliches Onboarding", "24/7 Support"] }
      ] 
    },
    faq: { 
      title: "FAQ", 
      subtitle: "Alles, was Sie über Handicapp wissen müssen",
      q1: "Was beinhaltet Handicapp?", 
      a1: "Handicapp ist eine komplette Lösung mit 12 Modulen: Dashboard, Benachrichtigungen, Einrichtungen, Meine Pferde, Gesundheit, Wettbewerbe, Training, Ereignisse, Berichte, Aufgaben, Konfiguration und Abonnements. Alle Tools, die Sie für professionelles Management benötigen.",
      q2: "Kann ich meine aktuellen Daten migrieren?", 
      a2: "Auf jeden Fall. Wir importieren Ihre Daten aus Excel, PDF oder jedem vorherigen System kostenlos. Unser Team unterstützt Sie während des gesamten Migrationsprozesses.",
      q3: "Wie sicher ist Handicapp?", 
      a3: "Wir verwenden moderne Verschlüsselung und sichere Server. Ihre Daten sind sicherer als jede physische Datei. Wir befolgen strenge Datenschutz- und Sicherheitsprotokolle.",
      q4: "Was kostet es wirklich?", 
      a4: "Pläne beginnen ab 29€/Monat für bis zu 10 Pferde. Keine versteckten Kosten, keine Bindung. Sie können jederzeit Ihren Plan ändern oder kündigen.",
      q5: "Welche Verwaltungsmodule sind enthalten?", 
      a5: "Sie haben Zugriff auf: Zentral-Dashboard mit wichtigen Metriken, Einrichtungsverwaltung, Komplettes Pferdeprofil, Krankenakten, Wettbewerbskalender, Trainingsplanung, Ereignisverwaltung und detaillierte Berichte.",
      q6: "Bieten Sie technischen Support an?", 
      a6: "Ja, E-Mail- und Chat-Support in allen Plänen enthalten. Durchschnittliche Antwortzeit: 2 Stunden. Professional- und Enterprise-Pläne erhalten Prioritäts-Support.",
      q7: "Integriert es sich mit anderen Systemen?", 
      a7: "Ja, wir haben eine API und Konnektoren für beliebte Verwaltungs- und Buchhaltungssysteme. Enterprise-Pläne können benutzerdefinierte Integrationen anfordern.",
      q8: "Was passiert mit meinen Daten, wenn ich kündige?", 
      a8: "Sie haben die volle Kontrolle. Sie können alle Ihre Informationen jederzeit in Standardformaten (CSV, PDF) exportieren. Wir behalten Ihre Daten niemals ohne Ihre Zustimmung.",
      q9: "Wie funktioniert das Aufgabensystem?", 
      a9: "Das Aufgabenmodul ermöglicht es Ihnen, tägliche Routinen zu erstellen, Verantwortliche zuzuweisen und den Fortschritt in Echtzeit zu verfolgen. Ideal für die Koordination von Stallteams und sicherzustellen, dass keine Pflege vergessen wird.",
      q10: "Wie lange dauert die Implementierung?", 
      a10: "Die meisten Kunden sind in weniger als 48 Stunden einsatzbereit. Wir bieten personalisiertes Onboarding, Teamschulung und Support im ersten Monat kostenlos.",
      stillHaveQuestions: "Haben Sie noch Fragen?",
      contactUs: "Unser Team ist bereit zu helfen",
      getInTouch: "Jetzt Kontaktieren"
    },
    about: { 
      title: "UNSERE DNA", 
      subtitle: "Geboren auf dem Feld, aufgewachsen im Code.", 
      desc: "Handicapp entstand aus der Frustration über verlorene Krankenakten. Wir sind ein hybrides Team aus Reitern, Tierärzten und Softwareingenieuren mit einer Mission: Tradition digitalisieren ohne die Seele zu verlieren.",
      val1: "Pferdeleidenschaft", 
      val1_d: "Wir verstehen Schweiß und Ruhm des Feldes.",
      val2: "Radikale Innovation", 
      val2_d: "Spitzentechnologie für die Pferdewelt.",
      val3: "Totale Transparenz", 
      val3_d: "Klare Daten für klare Besitzer."
    },
    contact: { 
      title: "Bereit, Ihre Verwaltung zu transformieren?", 
      subtitle: "Vereinbaren Sie eine persönliche Demo und entdecken Sie, wie Handicapp Ihren Betrieb optimieren kann.", 
      name: "Vollständiger Name", 
      email: "Email", 
      msg: "Erzählen Sie uns von Ihrem Projekt und Ihren Anforderungen", 
      btn: "Demo Anfragen", 
      success: "Nachricht Gesendet! Wir werden uns bald bei Ihnen melden." 
    }
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
    <section className={`py-24 relative z-10 px-6 ${isDark ? 'bg-[#1e293b]/30' : 'bg-gradient-to-b from-zinc-50 to-white'}`}>
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
                  <div className={`p-12 md:p-16 rounded-3xl border-2 min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-[#af936f]/30' 
                      : 'bg-gradient-to-br from-white via-zinc-50 to-white border-[#af936f]/30'
                  } shadow-2xl hover:shadow-[0_0_60px_-15px_rgba(175,147,111,0.4)] transition-all duration-500`}>
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
    <section id="workflow" className={`scroll-mt-24 py-24 relative ${isDark ? 'bg-zinc-900/30' : 'bg-gradient-to-b from-white to-zinc-100'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-black mb-24 text-center ${theme.text}`}>{t.workflow.title}</h2>
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2 hidden md:block">
            <div className="sticky top-32 h-[500px] w-full">
              <div className={`relative w-full h-full rounded-[2.5rem] border-2 overflow-hidden shadow-2xl ${
                isDark 
                  ? 'border-zinc-800/50 bg-zinc-900/20' 
                  : 'border-zinc-300 bg-white'
              }`}>
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
                    <div className={`absolute inset-0 ${
                      isDark 
                        ? 'bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent' 
                        : 'bg-gradient-to-t from-black/70 via-black/40 to-transparent'
                    }`}></div>
                  </div>
                ))}
                {/* Contenido sobre la imagen */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                  <div className={`mb-8 p-8 rounded-full border-2 bg-[#0f172a]/80 backdrop-blur-sm transition-all duration-500 transform ${
                    isDark 
                      ? 'border-zinc-700/50' 
                      : 'border-zinc-600/30'
                  } ${
                    activeStep === 0 ? 'scale-100 rotate-0' : activeStep === 1 ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
                  }`}>
                    {activeStep === 0 && <Radio size={64} className="animate-pulse text-[#af936f]" />}
                    {activeStep === 1 && <Cpu size={64} className="text-[#af936f]" />}
                    {activeStep === 2 && <User size={64} className="text-white" />}
                  </div>
                  <h3 className={`text-2xl font-black mb-4 uppercase tracking-widest drop-shadow-lg ${isDark ? 'text-white' : 'text-white'}`}>
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
    <section id="labs" className="scroll-mt-24 py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 relative">
      <div className={`max-w-6xl mx-auto rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden border ${theme.glass} shadow-2xl`}>
        <div className={`absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-[100px] sm:blur-[120px] opacity-20 ${theme.accentBg}`}></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>{t.labs.title}</h2>
              <p className={`text-base sm:text-lg ${theme.textMuted}`}>{t.labs.desc}</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="relative"><input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t.labs.input_ph} className={`w-full p-4 sm:p-5 rounded-xl border outline-none transition-all font-medium placeholder:opacity-50 text-sm sm:text-base ${isDark ? 'bg-black/50 border-zinc-800 text-white focus:border-[#af936f]' : 'bg-white border-zinc-200 text-zinc-900 focus:border-[#af936f]'}`} /><div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2"><Dna size={18} className="sm:w-5 sm:h-5 ${theme.textMuted}" /></div></div>
              <button onClick={handleGen} disabled={loading} className={`w-full py-4 sm:py-5 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${isDark ? 'bg-white text-black hover:bg-[#af936f] hover:text-white' : 'bg-black text-white hover:bg-[#af936f]'} disabled:opacity-50 disabled:cursor-not-allowed`}>{loading ? <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> : t.labs.btn} <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" /></button>
            </div>
          </div>
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 border ${isDark ? 'bg-black/40 border-zinc-800' : 'bg-gradient-to-br from-zinc-50 to-white border-zinc-300 shadow-inner'} min-h-[300px] sm:min-h-[400px] flex flex-col relative overflow-hidden`}>
            <div className={`flex justify-between items-center mb-4 sm:mb-6 ${isDark ? 'opacity-50' : 'opacity-60'}`}>
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              </div>
              <div className={`font-mono text-[10px] sm:text-xs ${theme.textMuted}`}>AI_OUTPUT_V1</div>
            </div>
            <div className={`flex-1 font-mono text-xs sm:text-sm leading-relaxed sm:leading-loose whitespace-pre-wrap ${error ? 'text-red-500' : isDark ? theme.accent : 'text-[#af936f] font-semibold'}`}>
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
    <section className={`py-16 sm:py-20 md:py-24 lg:py-32 border-y overflow-hidden relative ${isDark ? 'bg-[#1e293b]/20 border-[#af936f]/20' : 'bg-gradient-to-b from-zinc-50 to-white border-zinc-300'}`}>
      {/* Decoración de fondo */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#af936f] rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center relative z-10">
        <p className={`text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mb-3 sm:mb-4 ${theme.accent}`}>{t.trust.title}</p>
        <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${theme.text} px-4`}>{t.trust.desc}</h3>
      </div>
      
      {/* Logos carousel con sponsors reales */}
      <div className="flex overflow-hidden relative mb-16 sm:mb-20 md:mb-24 lg:mb-28">
        <div className="flex gap-12 sm:gap-16 md:gap-20 lg:gap-24 animate-marquee whitespace-nowrap">
          {[...ASSETS.logos, ...ASSETS.logos, ...ASSETS.logos].map((logo, i) => {
            const isHipodromoLogo = logo.includes('logo.png');
            return (
              <div key={i} className="flex items-center justify-center min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] h-16 sm:h-20 md:h-24">
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
      <div className="max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-10 md:pt-12">
        {/* Icono de estrella flotante FUERA de la tarjeta */}
        <div className={`absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${theme.accentBg} flex items-center justify-center text-white shadow-2xl z-20`}>
          <Star fill="currentColor" size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </div>
        
        <div className={`px-6 py-10 sm:px-10 sm:py-12 md:px-14 lg:px-18 2xl:px-24 md:py-14 lg:py-16 rounded-xl sm:rounded-2xl md:rounded-[2rem] border-2 text-center relative ${
          isDark 
            ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-[#af936f]/30' 
            : 'bg-gradient-to-br from-white via-zinc-50 to-white border-[#af936f]/40'
        } shadow-2xl`}>
          {/* Quote decorativo eliminado para que sea más rectangular */}
          
          {/* Testimonial content with fade animation */}
          <div className="relative min-h-[200px] sm:min-h-[180px] md:min-h-[160px] lg:min-h-[170px] flex flex-col items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                  currentTestimonial === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-medium italic mb-5 sm:mb-6 md:mb-7 leading-relaxed px-2 sm:px-4 md:px-6 ${theme.text}`}>
                  "{testimonial.quote}"
                </p>
                
                {/* Divider dorado */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <div className={`h-px w-10 sm:w-12 md:w-16 ${theme.accentBg}`}></div>
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${theme.accentBg}`}></div>
                  <div className={`h-px w-10 sm:w-12 md:w-16 ${theme.accentBg}`}></div>
                </div>
                
                <p className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-bold tracking-widest uppercase ${theme.accent} px-4`}>
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-6 sm:mb-8 md:mb-10 leading-[0.9]">{t.contact.title}</h2>
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
          <div className={`fixed inset-0 -z-10 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]' : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100'}`}></div>
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

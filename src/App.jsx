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
import SocialProof from './components/SocialProof';
import ContactForm from './components/ContactForm';
import VerticalWorkflow from './components/VerticalWorkflow';
import AILabs from './components/AILabs';
import MobileMenu from './components/MobileMenu';
import RoleSelector from './components/RoleSelector';
import VideoModal from './components/VideoModal';
import Preloader from './components/Preloader';
import HANDICAPP_KNOWLEDGE from './handicappKnowledgeBase';
// Importar traducciones
import translations from './i18n';
// Configuración de tema y assets
import { theme, assets } from './theme';
// Importar hook personalizado para Gemini AI
import { useGeminiChat } from './hooks/useGeminiChat';

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
/**
 * --- APP PRINCIPAL ---
 */
function AppContent() {
  const [langIndex, setLangIndex] = useState(0);
  const langs = ['es', 'en', 'de'];
  const toggleLang = () => setLangIndex((prev) => (prev + 1) % langs.length);
  const t = translations[langs[langIndex]];
  const [videoOpen, setVideoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Tema oscuro único (importado desde /theme/index.js)

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
      
      <Preloader onLoadComplete={() => setLoaded(true)} assets={assets} />
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
            ASSETS={assets}
            onToggleLang={toggleLang}
            onMenuOpen={() => setMenuOpen(true)}
          />

          <Routes>
            <Route path="/" element={
              <HomePage 
                t={t}
                theme={theme}
                ASSETS={assets}
                onVideoOpen={() => setVideoOpen(true)}
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

          <Footer theme={theme} ASSETS={assets} />
          <WhatsAppButton phoneNumber="5492477357665" />
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

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const BrandedVideo = ({ ASSETS }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          // Asegurar que el video tenga suficiente buffer antes de reproducir
          if (videoRef.current.readyState < 3) {
            setIsBuffering(true);
            // Esperar a que cargue suficiente contenido
            await new Promise((resolve) => {
              const handleCanPlay = () => {
                videoRef.current.removeEventListener('canplaythrough', handleCanPlay);
                resolve();
              };
              videoRef.current.addEventListener('canplaythrough', handleCanPlay);
            });
            setIsBuffering(false);
          }
          
          await videoRef.current.play();
          setIsPlaying(true);
          if (!hasStarted) setHasStarted(true);
          // Resetear opacidad al reproducir
          setVideoOpacity(1);
          setShowOutro(false);
        } catch (error) {
          console.error('Error playing video:', error);
          setIsBuffering(false);
        }
      }
    }
  };

  // Detectar cuando el video está cerca del final para mostrar outro y pausarlo con transición suave
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      const timeLeft = duration - currentTime;
      
      // Fade out gradual en los últimos 0.8 segundos
      if (timeLeft <= 0.8 && timeLeft > 0.3) {
        // Fade out suave (de 1 a 0.15 de opacidad)
        const fadeProgress = (0.8 - timeLeft) / 0.5; // 0 a 1
        setVideoOpacity(1 - (fadeProgress * 0.85)); // De 1 a 0.15
      }
      
      // Pausar el video solo 0.3 segundos antes del final
      if (timeLeft <= 0.3 && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowOutro(true);
        setVideoOpacity(0.15); // Opacidad final muy baja (solo sutil)
      }
      
      // Mostrar outro en los últimos 1.5 segundos
      if (timeLeft <= 1.5) {
        setShowOutro(true);
      } else {
        setShowOutro(false);
        setVideoOpacity(1); // Opacidad normal durante el video
      }
    }
  };

  // Cuando el video termina naturalmente, mantener el outro visible
  const handleVideoEnded = () => {
    setShowOutro(true);
    setIsPlaying(false);
  };

  // Cuando el video está listo para reproducir
  const handleCanPlay = () => {
    setIsLoading(false);
    setIsBuffering(false);
  };

  // Intersection Observer para lazy loading con precarga inteligente
  useEffect(() => {
    if (!videoRef.current) return;

    let hasPreloaded = false;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !hasPreloaded) {
            // Cambiar a preload auto para cargar el video completo
            videoRef.current.preload = 'auto';
            videoRef.current.load();
            hasPreloaded = true;
          }
        });
      },
      {
        rootMargin: '400px', // Cargar 400px antes de que sea visible (más tiempo de precarga)
        threshold: 0.1
      }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current && videoRef.current) {
        observerRef.current.unobserve(videoRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  return (
    <div className="relative w-full h-[100vh] max-h-screen overflow-hidden group bg-[#0f172a]">
      {/* Video fullscreen background con optimizaciones de carga */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-300 ease-out"
        style={{ 
          maxHeight: '100vh',
          opacity: videoOpacity,
          willChange: 'opacity'
        }}
        muted={isMuted}
        playsInline
        preload="none"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleCanPlay}
        onLoadedData={() => setIsLoading(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsBuffering(false);
        }}
        onStalled={() => setIsBuffering(true)}
        onSuspend={() => setIsBuffering(true)}
        onLoadStart={() => setIsLoading(true)}
      >
        <source src="/videos/1761326175304193.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* Loading/Buffering spinner */}
      {(isLoading || isBuffering) && (
        <div className="absolute inset-0 z-35 flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#af936f]/30 border-t-[#af936f] rounded-full animate-spin"></div>
            <p className="text-white/70 text-sm tracking-wider">
              {isLoading ? 'Cargando video...' : 'Buffering...'}
            </p>
          </div>
        </div>
      )}
      
      {/* Overlay gradient sutil para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a]/40 pointer-events-none"></div>

      {/* Outro - Final del video con fondo del último frame sutil */}
      {showOutro && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a]/75 via-[#0f172a]/85 to-[#0f172a]/95 backdrop-blur-sm pointer-events-none animate-in fade-in duration-1000">
          <div className="text-center space-y-6 px-4 animate-in slide-in-from-bottom-4 duration-1000">
            {/* Logo grande centrado */}
            <div className="flex justify-center mb-6 animate-in zoom-in duration-700">
              <div className="relative">
                {/* Glow effect detrás del logo */}
                <div className="absolute inset-0 bg-[#af936f]/30 blur-3xl scale-150"></div>
                <img 
                  src={ASSETS?.logoFull || ASSETS?.logoIcon} 
                  alt="Handicapp" 
                  className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Frase impactante */}
            <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-1000 delay-300">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                EL FUTURO ES AHORA
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-[#af936f]"></div>
                <p className="text-lg md:text-xl lg:text-2xl text-[#af936f] font-light tracking-wide">
                  Gestión ecuestre inteligente
                </p>
                <div className="h-px w-12 bg-[#af936f]"></div>
              </div>
              <p className="text-white/80 text-sm md:text-base font-light tracking-widest mt-4">
                HANDICAPP.COM.AR
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controles superpuestos - Solo cuando NO está el outro */}
      {!showOutro && hasStarted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="relative group/btn"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-[#af936f]/30 blur-xl scale-150 opacity-50 group-hover/btn:opacity-100 transition-opacity"></div>
            
            {/* Button */}
            <div className="relative bg-[#0f172a]/90 backdrop-blur-xl border-2 border-[#af936f]/50 text-white rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </div>
          </button>
        </div>
      )}

      {/* Control de volumen - Esquina superior derecha (para evitar WhatsApp) */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-40 bg-[#0f172a]/70 backdrop-blur-xl hover:bg-[#0f172a]/90 border border-[#af936f]/30 text-white rounded-full p-3 shadow-xl transform hover:scale-110 transition-all duration-300"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      {/* Overlay de play inicial - Solo al principio, antes de empezar */}
      {!isPlaying && !showOutro && !isLoading && (
        <div className="absolute inset-0 z-25 flex items-center justify-center cursor-pointer" onClick={handleVideoClick}>
          <div className="relative group/play">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-[#af936f]/50 animate-ping"></div>
            
            {/* Play button grande inicial */}
            <div className="relative bg-gradient-to-br from-[#af936f] to-[#8f7657] hover:from-[#d4b896] hover:to-[#af936f] text-white rounded-full p-10 shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white/20">
              <Play className="w-14 h-14 ml-2" />
            </div>
          </div>
        </div>
      )}

      {/* Overlay de replay - Cuando termina (con outro visible) */}
      {showOutro && !isPlaying && (
        <div className="absolute inset-0 z-35 flex items-center justify-center pointer-events-none">
          <button
            onClick={togglePlay}
            className="relative group/replay pointer-events-auto mt-48"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-150 opacity-50 group-hover/replay:opacity-100 transition-opacity"></div>
            
            {/* Replay button - Más discreto */}
            <div className="relative bg-white/10 backdrop-blur-xl hover:bg-white/20 border-2 border-white/30 text-white rounded-full p-5 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <p className="text-white/70 text-xs mt-3 text-center tracking-wider">Volver a ver</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandedVideo;

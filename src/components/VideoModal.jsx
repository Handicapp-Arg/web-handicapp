import { X } from "lucide-react";

const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  // OPCIÓN 1: YouTube - Reemplaza VIDEO_ID con tu ID de YouTube
  const youtubeVideoId = "dQw4w9WgXcQ"; // Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  
  // OPCIÓN 2: Video local - Pon tu video en /public/videos/showreel.mp4
  // const localVideo = "/videos/showreel.mp4";
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 p-6">
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-[#D1F366] transition-colors">
        <X size={40} />
      </button>
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

export default VideoModal;
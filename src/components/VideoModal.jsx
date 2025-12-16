import React, { useCallback } from "react";
import { X } from "lucide-react";

const VideoModal = React.memo(({ isOpen, onClose }) => {
  // Memoizar el handler de cerrar
  const handleClose = useCallback((e) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  // Memoizar el handler para el backdrop
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;
  
  // Cloudinary Player - Streaming optimizado con CDN global
  const cloudinaryEmbedUrl = "https://player.cloudinary.com/embed/?cloud_name=dh2m9ychv&public_id=1761326175304193_lzi0wo&profile=cld-default";
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 p-6"
      onClick={handleBackdropClick}
    >
      <button onClick={handleClose} className="absolute top-6 right-6 text-white hover:text-[#D1F366] transition-colors z-10">
        <X size={40} />
      </button>
      <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        
        {/* Cloudinary Video Player - Optimizado con CDN */}
        <iframe
          className="w-full h-full"
          src={cloudinaryEmbedUrl}
          title="Handicapp Video Showreel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        ></iframe>
        
      </div>
    </div>
  );
});

VideoModal.displayName = 'VideoModal';

export default VideoModal;
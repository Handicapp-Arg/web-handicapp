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
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
      onClick={handleBackdropClick}
    >
      <button onClick={handleClose} className="absolute top-6 right-6 text-white hover:text-[#af936f] transition-colors">
        <X size={40} />
      </button>
      <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        
        {/* Video optimizado desde Cloudinary CDN */}
        <video 
          className="w-full h-full object-cover" 
          controls 
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          controlsList="nodownload"
          disablePictureInPicture={false}
        >
          <source src="https://res.cloudinary.com/dh2m9ychv/video/upload/v1765886641/video_optimizado_lbpfsw.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        
      </div>
    </div>
  );
});

VideoModal.displayName = 'VideoModal';

export default VideoModal;
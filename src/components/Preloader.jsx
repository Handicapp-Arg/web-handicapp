import React, { useState, useEffect, useCallback } from "react";
import { useVisualConfig } from '../hooks/useContextHooks';

const Preloader = React.memo(({ onLoadComplete }) => {
  // Usar contexto para assets
  const { assets } = useVisualConfig();
  
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Memoizar la función de completar carga
  const handleLoadComplete = useCallback(() => {
    setIsVisible(false);
    onLoadComplete();
  }, [onLoadComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(handleLoadComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [handleLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[10000] bg-[#0f172a] flex flex-col items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="mb-8 relative">
        {assets.logoIcon ? (
          <img 
            src={assets.logoIcon} 
            className="w-20 h-20 md:w-24 md:h-24 animate-pulse" 
            alt="Loading" 
          />
        ) : (
          <div className="w-20 h-20 md:w-24 md:h-24 bg-[#af936f] rounded-full animate-pulse flex items-center justify-center font-bold text-white text-3xl">
            H
          </div>
        )}
      </div>
      <div className="w-80 h-1.5 bg-[#1e293b] rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-[#af936f] transition-all duration-200 shadow-[0_0_10px_rgba(175,147,111,0.5)]" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="font-mono text-[#af936f] text-sm tracking-widest">
        LOADING HANDICAPP :: {Math.min(100, Math.floor(progress))}%
      </div>
    </div>
  );
});

Preloader.displayName = 'Preloader';

export default Preloader;
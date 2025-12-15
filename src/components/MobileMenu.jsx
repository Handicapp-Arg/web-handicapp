import React, { useCallback } from "react";
import { X } from "lucide-react";
import { useTranslation, useVisualConfig } from '../hooks/useContextHooks';

const MobileMenu = React.memo(({ isOpen, onClose }) => {
  // Usar hooks de contexto
  const { t } = useTranslation();
  const { theme } = useVisualConfig();

  // Memoizar el handler de cierre para enlaces
  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;
  
  return (
    <div className={`fixed inset-0 z-[60] ${theme.glass} backdrop-blur-3xl p-8 flex flex-col animate-in slide-in-from-right duration-300`}>
      <button onClick={onClose} className="self-end p-3 hover:scale-110 transition-transform">
        <X size={32} />
      </button>
      <div className="flex-1 flex flex-col justify-center gap-10 text-4xl font-black tracking-tighter">
        {Object.entries(t.nav).map(([key, label]) => (
          <a 
            key={key} 
            href={`#${key}`} 
            onClick={handleLinkClick} 
            className="hover:text-[#D1F366] transition-colors transform hover:translate-x-2 transition-transform"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
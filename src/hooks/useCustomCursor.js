import { useRef, useEffect } from 'react';

/**
 * Hook personalizado para manejar el cursor customizado
 * Retorna las refs y el estado necesario para el cursor
 */
const useCustomCursor = () => {
  const cursorRef = useRef(null);
  const trailingRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Cursor principal
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      
      // Cursor de seguimiento con animación
      if (trailingRef.current) {
        trailingRef.current.animate(
          { transform: `translate3d(${clientX - 10}px, ${clientY - 10}px, 0)` }, 
          { duration: 500, fill: 'forwards' }
        );
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return {
    cursorRef,
    trailingRef
  };
};

export default useCustomCursor;
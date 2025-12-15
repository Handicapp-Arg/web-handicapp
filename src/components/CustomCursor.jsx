import useCustomCursor from '../hooks/useCustomCursor';

/**
 * Componente CustomCursor usando hook personalizado
 * Cursor interactivo para desktop con efecto de seguimiento
 */
const CustomCursor = () => {
  const { cursorRef, trailingRef } = useCustomCursor();

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      <div 
        ref={cursorRef} 
        className="absolute w-3 h-3 rounded-full mix-blend-difference bg-[#af936f] top-0 left-0 -mt-1.5 -ml-1.5" 
      />
      <div 
        ref={trailingRef} 
        className="absolute w-8 h-8 rounded-full border opacity-50 top-0 left-0 border-[#af936f]" 
      />
    </div>
  );
};

export default CustomCursor;
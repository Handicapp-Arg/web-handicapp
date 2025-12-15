import useThreeJS from '../hooks/useThreeJS';

/**
 * Componente ThreeEquestrianFlow usando hook personalizado
 * Fondo animado de partículas con Three.js
 */
const ThreeEquestrianFlow = () => {
  const { mountRef } = useThreeJS();

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10" 
    />
  );
};

export default ThreeEquestrianFlow;
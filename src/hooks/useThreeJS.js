import { useRef, useEffect } from 'react';

/**
 * Hook personalizado para manejar el fondo de partículas con Three.js
 * Configuración y animación de las partículas ecuestres
 */
const useThreeJS = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const THREE = window.THREE;
    if (!mountRef.current || !THREE) return;

    // Limpiar contenido previo
    if (mountRef.current.firstChild) {
      while(mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    }

    // Configuración de la escena
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.005);

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    // Configuración del renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Configuración de partículas
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    // Inicializar posiciones y velocidades de partículas
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      velocities[i] = 0.2 + Math.random() * 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material de las partículas
    const material = new THREE.PointsMaterial({
      color: 0xaf936f,
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let frameId;

    // Función de animación
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const pos = particles.geometry.attributes.position.array;

      // Animar partículas
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

    // Manejar redimensionamiento de ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return { mountRef };
};

export default useThreeJS;
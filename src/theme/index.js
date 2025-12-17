/**
 * @fileoverview Configuración del tema de la aplicación Handicapp
 * @description Paleta de identidad visual en modo oscuro con tonos dorados y navy
 */

/**
 * Configuración de tema principal - Dark Mode
 * @constant {Object} theme
 */
export const theme = {
  // Backgrounds principales
  bg: "bg-[#0f172a]",                    // Navy Blue Principal
  bgSecondary: "bg-[#1e293b]",           // Navy Blue Light
  
  // Textos
  text: "text-white",
  textMuted: "text-zinc-400",
  
  // Acentos dorados
  accent: "text-[#af936f]",              // Golden Brown
  accentBg: "bg-[#af936f]",              // Golden Brown
  accentHover: "bg-[#8f7657]",           // Darker Gold (hover)
  
  // Acento secundario cyan
  accentCyan: "bg-[#0e445d]",            // Cyan Secundario
  
  // Bordes y efectos
  border: "border-zinc-700",
  glass: "bg-[#1e293b]/80 backdrop-blur-xl border-zinc-700",
  
  // Navegación
  navBg: "bg-[#0f172a]"                  // Navbar Navy
};

/**
 * Configuración de colores en formato hexadecimal para uso en JavaScript
 * @constant {Object} colors
 */
export const colors = {
  primary: {
    navy: '#0f172a',
    navyLight: '#1e293b',
    gold: '#af936f',
    goldDark: '#8f7657',
    cyan: '#0e445d'
  },
  neutral: {
    white: '#ffffff',
    zinc400: '#a1a1aa',
    zinc700: '#3f3f46'
  }
};

/**
 * Configuración de assets y medios
 * @constant {Object} assets
 */
export const assets = {
  // Imagen hero
  heroHorse: "https://images.unsplash.com/photo-1534078362425-387ae9668c17?q=80&w=2669&auto=format&fit=crop", 
  
  // Texturas y efectos
  noise: "https://grainy-gradients.vercel.app/noise.svg",
  
  // LOGOS LOCALES - Handicapp branding
  logoFull: "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636413/handicapp/uploads/logo-full-white.webp",  // Logo completo horizontal
  logoIcon: "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765636415/handicapp/uploads/logo-icon-white.webp",  // Logo icono/símbolo
  
  // Dashboard screenshot
  dashboardScreen: "/images/dashboard.png",
  
  // Logos de sponsors y partners hípicos
  logos: [
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765930128/stud-san-lorenzo_pxp6jo.png",  // Stud San Lorenzo
    "https://res.cloudinary.com/dh2m9ychv/image/upload/v1765930127/club-hipico-valle_idnjuo.png"  // Club Hípico del Valle
  ]
};

// Export por defecto del tema principal
export default theme;
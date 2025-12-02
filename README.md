# Handicapp Web

Plataforma operativa para haras de alto rendimiento con inteligencia artificial predictiva.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## 🛠️ Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool ultra rápido
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos modernos
- **Three.js** - Animaciones 3D de fondo

## ✨ Características

- 🌐 Multi-idioma (ES, EN, DE)
- 🌓 Modo oscuro/claro
- 🎨 Diseño glassmorphism moderno
- 🔮 Efectos 3D con Three.js
- 🤖 Integración con Gemini AI
- 📱 Totalmente responsive
- ⚡ Optimizado para rendimiento

## 📦 Estructura del Proyecto

```
handicapp-web/
├── src/
│   ├── App.jsx        # Componente principal
│   ├── main.jsx       # Punto de entrada
│   └── index.css      # Estilos globales
├── index.html         # HTML base
├── package.json       # Dependencias
├── vite.config.js     # Configuración Vite
└── tailwind.config.js # Configuración Tailwind
```

## 🎨 Personalización

### Agregar tus Logos:

1. **Coloca tus archivos** en `public/images/`:
   - `logo-full.png` o `.svg` - Logo completo para navbar (blanco, fondo transparente)
   - `logo-icon.png` o `.svg` - Ícono cuadrado para preloader/footer
   - `dashboard.png` - Screenshot de tu dashboard (opcional)

2. **Actualiza las extensiones** en `src/App.jsx` si usas PNG en lugar de SVG:
   ```javascript
   logoFull: "/images/logo-full.png",  // Cambia .svg a .png
   logoIcon: "/images/logo-icon.png",  // Cambia .svg a .png
   ```

3. **Recarga el navegador** (Ctrl + F5) para ver los cambios

### Personalizar colores/estilos:
- `tailwind.config.js` - Configuración de Tailwind
- `src/App.jsx` - Constante `THEME` para colores del tema

## 🔑 API Key de Gemini

Para habilitar las funcionalidades de IA, agrega tu API key en `src/App.jsx`:

```javascript
const apiKey = "TU_API_KEY_AQUI";
```

## 📄 Licencia

© 2026 Future Equestrian Systems. All rights reserved.

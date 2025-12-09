import React, { useState, useEffect } from 'react';
import { FileText, Shield, Cookie } from 'lucide-react';

const LegalPage = ({ t, isDark, theme }) => {
  const [activeSection, setActiveSection] = useState('terms');

  // Scroll to top when component mounts
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const sections = {
    terms: {
      icon: FileText,
      title: 'Términos y Condiciones',
      content: [
        {
          subtitle: '1. Aceptación de los Términos',
          text: 'Al acceder y utilizar Handicapp, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.'
        },
        {
          subtitle: '2. Descripción del Servicio',
          text: 'Handicapp es una plataforma de gestión ecuestre que proporciona herramientas para la administración de caballos, seguimiento veterinario, análisis con IA predictiva y gestión integral de haras e hipódromos.'
        },
        {
          subtitle: '3. Registro y Cuenta',
          text: 'Para utilizar Handicapp debes crear una cuenta proporcionando información precisa y completa. Eres responsable de mantener la confidencialidad de tus credenciales y de todas las actividades realizadas bajo tu cuenta.'
        },
        {
          subtitle: '4. Planes y Pagos',
          text: 'Handicapp ofrece diferentes planes de suscripción. Los pagos se procesan de forma segura. Puedes cancelar tu suscripción en cualquier momento. Los reembolsos se manejarán según nuestra política de cancelación.'
        },
        {
          subtitle: '5. Uso Aceptable',
          text: 'Te comprometes a utilizar Handicapp solo para fines legales y de acuerdo con estos términos. No debes intentar acceder de forma no autorizada, interferir con el servicio o utilizar la plataforma para actividades fraudulentas.'
        },
        {
          subtitle: '6. Propiedad Intelectual',
          text: 'Todo el contenido, diseño, código y funcionalidades de Handicapp son propiedad de Handicapp Inc. No puedes copiar, modificar o distribuir ningún contenido sin autorización expresa.'
        },
        {
          subtitle: '7. Limitación de Responsabilidad',
          text: 'Handicapp se proporciona "tal cual". No garantizamos que el servicio sea ininterrumpido o libre de errores. No seremos responsables de daños indirectos, incidentales o consecuentes derivados del uso de la plataforma.'
        },
        {
          subtitle: '8. Modificaciones',
          text: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios importantes. El uso continuado del servicio después de las modificaciones constituye tu aceptación.'
        }
      ]
    },
    privacy: {
      icon: Shield,
      title: 'Política de Privacidad',
      content: [
        {
          subtitle: '1. Información que Recopilamos',
          text: 'Recopilamos información que nos proporcionas directamente: nombre, email, teléfono, información de tu haras/hipódromo, datos de caballos, registros veterinarios y de rendimiento. También recopilamos datos de uso y cookies para mejorar nuestro servicio.'
        },
        {
          subtitle: '2. Cómo Usamos tu Información',
          text: 'Utilizamos tus datos para: proporcionar y mejorar nuestros servicios, procesar pagos, enviarte notificaciones importantes, generar análisis con IA, ofrecer soporte técnico y personalizar tu experiencia.'
        },
        {
          subtitle: '3. Compartir Información',
          text: 'No vendemos tus datos personales. Solo compartimos información con: proveedores de servicios esenciales (hosting, pagos, analytics), cuando sea requerido por ley, o con tu consentimiento explícito.'
        },
        {
          subtitle: '4. Seguridad de Datos',
          text: 'Implementamos medidas de seguridad de nivel bancario: encriptación AES-256, servidores certificados SOC2, backups diarios, autenticación de dos factores y monitoreo 24/7 para proteger tu información.'
        },
        {
          subtitle: '5. Tus Derechos',
          text: 'Tienes derecho a: acceder a tus datos, corregir información incorrecta, eliminar tu cuenta y datos, exportar tu información en formatos estándar (CSV, PDF, JSON), y oponerte al procesamiento de datos.'
        },
        {
          subtitle: '6. Retención de Datos',
          text: 'Mantenemos tus datos mientras tu cuenta esté activa. Si cancelas, conservamos información esencial por 90 días para posible reactivación. Después, eliminamos permanentemente todos los datos según tu solicitud.'
        },
        {
          subtitle: '7. Cookies y Tecnologías Similares',
          text: 'Utilizamos cookies para mantener sesiones, recordar preferencias, analizar uso y mejorar el servicio. Puedes controlar las cookies desde tu navegador. Ver nuestra Política de Cookies para más detalles.'
        },
        {
          subtitle: '8. Contacto sobre Privacidad',
          text: 'Para consultas sobre privacidad, acceso a datos o eliminación de información, contacta a nuestro equipo de privacidad en: privacy@handicapp.com'
        }
      ]
    },
    cookies: {
      icon: Cookie,
      title: 'Política de Cookies',
      content: [
        {
          subtitle: '1. ¿Qué son las Cookies?',
          text: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia, recordar tus preferencias y analizar cómo usas Handicapp.'
        },
        {
          subtitle: '2. Tipos de Cookies que Usamos',
          text: 'Cookies Esenciales: Necesarias para el funcionamiento básico (login, sesiones). Cookies de Rendimiento: Analizan cómo usas el sitio (Google Analytics). Cookies de Funcionalidad: Recuerdan tus preferencias (idioma, tema). Cookies de Marketing: Ayudan a mostrar contenido relevante.'
        },
        {
          subtitle: '3. Cookies de Terceros',
          text: 'Utilizamos servicios de terceros que pueden establecer sus propias cookies: Google Analytics (análisis de tráfico), Stripe (procesamiento de pagos), Cloudflare (seguridad y rendimiento).'
        },
        {
          subtitle: '4. Duración de las Cookies',
          text: 'Cookies de Sesión: Se eliminan cuando cierras el navegador. Cookies Persistentes: Permanecen según la duración configurada (generalmente 1-12 meses) para recordar preferencias y mantener sesiones.'
        },
        {
          subtitle: '5. Gestión de Cookies',
          text: 'Puedes controlar y eliminar cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar cookies puede afectar la funcionalidad del sitio. La mayoría de navegadores aceptan cookies automáticamente, pero puedes modificar esta configuración.'
        },
        {
          subtitle: '6. Actualizaciones',
          text: 'Podemos actualizar esta Política de Cookies para reflejar cambios en las tecnologías o regulaciones. Te notificaremos sobre cambios significativos. Última actualización: Diciembre 2025.'
        }
      ]
    }
  };

  const currentSection = sections[activeSection];
  const Icon = currentSection.icon;

  return (
    <div className={`min-h-screen ${isDark ? theme.bg : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100'} pt-32 pb-24 px-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#af936f] to-[#8f7657] mb-6 animate-bounce-slow">
            <FileText size={40} className="text-white" />
          </div>
          <h1 className={`text-5xl md:text-7xl font-black tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Legal
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme.textMuted}`}>
            Términos, privacidad y transparencia total
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap gap-4 mb-12 justify-center p-2 rounded-2xl ${isDark ? 'bg-[#1e293b]/50' : 'bg-white'}`}>
          {Object.entries(sections).map(([key, section]) => {
            const TabIcon = section.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeSection === key
                    ? 'bg-gradient-to-r from-[#af936f] to-[#8f7657] text-white shadow-lg'
                    : isDark
                      ? 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#1e293b]'
                      : 'bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <TabIcon size={20} />
                <span className="hidden sm:inline">{section.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={`rounded-3xl border-2 p-8 md:p-12 ${
          isDark 
            ? 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-zinc-700'
            : 'bg-white border-zinc-200'
        }`}>
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#af936f]/20">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#af936f]/20 to-[#8f7657]/20 flex items-center justify-center">
              <Icon size={32} className="text-[#af936f]" />
            </div>
            <h2 className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              {currentSection.title}
            </h2>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            {currentSection.content.map((item, index) => (
              <div key={index} className="space-y-4">
                <h3 className={`text-xl font-bold ${theme.accent}`}>
                  {item.subtitle}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${theme.textMuted}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className={`mt-12 pt-8 border-t ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>
            <p className={`text-sm ${theme.textMuted} text-center`}>
              Última actualización: Diciembre 2025 | Para consultas: <a href="mailto:legal@handicapp.com" className={`${theme.accent} hover:underline font-bold`}>legal@handicapp.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;

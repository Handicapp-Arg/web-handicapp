import React from 'react';
import HomePage from '../components/HomePage';
import FAQPage from '../components/FAQ';
import LegalPage from '../components/Legal';
import { 
  User, HeartPulse, Target, Building2, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import VerticalWorkflow from '../components/VerticalWorkflow';
import AILabs from '../components/AILabs';
import ContactForm from '../components/ContactForm';

/**
 * Hook personalizado para configuración de rutas
 * Retorna la configuración de rutas para ser usada con React Router
 */
const useRoutes = ({ t, theme, assets, onVideoOpen }) => {
  const routeConfigs = [
    {
      path: "/",
      component: HomePage,
      props: {
        t,
        theme,
        ASSETS: assets,
        onVideoOpen,
        VerticalWorkflow,
        AILabs,
        ContactForm,
        User,
        HeartPulse,
        Target,
        Building2,
        ChevronLeft,
        ChevronRight
      }
    },
    {
      path: "/faq",
      component: FAQPage,
      props: { t, theme }
    },
    {
      path: "/legal",
      component: LegalPage,
      props: { t, theme }
    }
  ];

  return { routeConfigs };
};

export default useRoutes;
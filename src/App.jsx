import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
// import LanguageSwitch from './components/LanguageSwitch';
import Layout from './components/Layout/Layout';
import Home from './components/pages/HomeSection';
import About from './components/pages/Aboutuspage';
import Donate from './components/pages/Donationpage';
import Programandservices from './components/pages/Programandservices';
import Mediaandevents from './components/pages/Mediaandevents';
import Contact from './components/pages/Contactus';
import { HelmetProvider } from 'react-helmet-async';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const router = createBrowserRouter(
  [
    {
      element: (
        <>
          <ScrollToTop />
          <Layout />
        </>
      ),
      children: [
        { path: '/', index: true, element: <Home /> },
        { path: '/about', index: true, element: <About /> },
        { path: '/donations', index: true, element: <Donate /> },
        { path: '/programs', index: true, element: <Programandservices /> },
        { path: '/media-events', index: true, element: <Mediaandevents /> },
        { path: '/contact', index: true, element: <Contact /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

const App = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        {/* <div className="flex justify-end">
          <LanguageSwitch />
        </div> */}
        <RouterProvider router={router} />
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
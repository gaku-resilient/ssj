import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import UPIQRCode from '../../assets/ssjupi.jpg';
import Reuseablecta from '../Herosection/Reusablecta.jsx';
import useTranslation from '../../i18n/useTranslation';

// Mock Link component for demonstration
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// Constants
const THEME_COLORS = {
  saffron: {
    50: '#fef7f0',
    100: '#fdeee0',
    200: '#fbd5b5',
    300: '#f9bc85',
    400: '#f79f4a',
    500: '#f58220',
    600: '#e56b12',
    700: '#c54d0f',
    800: '#9e3c0c',
    900: '#7f2f0a',
  },
  maroon: {
    50: '#fdf2f4',
    100: '#fce7ea',
    200: '#f8d2d8',
    300: '#f2b1bb',
    400: '#ea8592',
    500: '#dd546a',
    600: '#c73650',
    700: '#a62940',
    800: '#8b2635',
    900: '#722530',
  },
  gold: {
    50: '#fefcf0',
    100: '#fef6d3',
    200: '#feeaa7',
    300: '#fdd870',
    400: '#fcc842',
    500: '#f9b826',
    600: '#dd9416',
    700: '#b87014',
    800: '#945817',
    900: '#7a4918',
  },
};

const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }
};

// Custom hook for intersection observer
const useAnimationOnScroll = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);

  return { ref, controls };
};

// Custom hook for cursor effect
const useCursorEffect = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return { cursorPosition, isHovering, handleMouseEnter, handleMouseLeave };
};

// Reusable Section Component
const Section = ({ id, className, children, ...props }) => (
  <section
    id={id}
    className={`py-20 px-4 ${className}`}
    role="region"
    {...props}
  >
    <div className="container mx-auto max-w-6xl">
      {children}
    </div>
  </section>
);

// Reusable Card Component
const Card = ({ children, className = '', hover = true, ...props }) => (
  <motion.div
    className={`bg-white dark:bg-red-900 rounded-xl shadow-lg p-6 ${className}`}
    whileHover={hover ? { scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {}}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    {...props}
  >
    {children}
  </motion.div>
);

// Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform hover:scale-105';
  
  const variants = {
    primary: 'bg-yellow-500 text-red-900 hover:bg-yellow-600',
    secondary: 'bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-red-900',
    accent: 'bg-red-900 text-yellow-500 hover:bg-red-800'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <span className="ml-4 text-red-900 font-semibold">{t('common.loading')}</span>
    </div>
  );
};

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">
            {t('common.error')}
          </h2>
          <Button onClick={() => window.location.reload()}>
            {t('common.reload_page')}
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

const Donations = () => {
  const { t, language } = useTranslation();
  const { cursorPosition, isHovering } = useCursorEffect();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized data
  const donationMethods = useMemo(() => [
    {
      id: 1,
      title: t('donation_methods.method1.title'),
      description: t('donation_methods.method1.description'),
      image: UPIQRCode,
      image_alt: t('donation_methods.method1.image_alt')
    },
    {
      id: 2,
      title: t('donation_methods.method2.title'),
      description: t('donation_methods.method2.description'),
      details: [
        t('donation_methods.method2.details.account_name'),
        t('donation_methods.method2.details.account_number'),
        t('donation_methods.method2.details.ifsc_code'),
        t('donation_methods.method2.details.bank'),
        t('donation_methods.method2.details.branch')
      ]
    },
  ], [t]);

  const impactStories = useMemo(() => [
    {
      id: 1,
      quote: t('impact_stories.story1.quote'),
      author: t('impact_stories.story1.author'),
      location: t('impact_stories.story1.location'),
      rating: 5
    },
    {
      id: 2,
      quote: t('impact_stories.story2.quote'),
      author: t('impact_stories.story2.author'),
      location: t('impact_stories.story2.location'),
      rating: 5
    },
  ], [t]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="bg-orange-50 dark:bg-red-900 relative overflow-hidden" ></div>
        {/* Cursor Effect */}
     

        {/* Hero Section */}
        <Section
          className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-red-700"
          style={{
            backgroundImage: `url('./m7.jpg')`,
            backgroundSize: 'contain',
            backgroundPosition: 'top',
            backgroundAttachment: 'fixed'
          }}
          aria-label={t('hero.aria_label')}
        >
          <div className="text-center text-white px-4 max-w-6xl mx-auto">
            <motion.div
              variants={ANIMATION_VARIANTS.staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold font-serif text-white tracking-wide mb-6"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                {t('donationshero.title')}
              </motion.h1>
              <motion.p
                className="text-xl md:text-3xl font-light text-white leading-relaxed"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                {t('donationshero.description')}
              </motion.p>
            </motion.div>
          </div>
        </Section>

        {/* Why Donate Section */}
        <Section
          id="why-donate-section"
          className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-red-800 dark:to-red-900"
          aria-label={t('why_donate.aria_label')}
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-red-900 dark:text-yellow-500 mb-6">
                {t('why_donate.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                {t('why_donate.description')}
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-8">
                {[
                  'why_donate.benefits.organizing',
                  'why_donate.benefits.maintaining',
                  'why_donate.benefits.providing',
                  'why_donate.benefits.creating'
                ].map((key, index) => (
                  <li key={index}>{t(key)}</li>
                ))}
              </ul>
              <Link to="/contact">
                <Button>{t('why_donate.learn_more')}</Button>
              </Link>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="M1.jpg"
                alt={t('why_donate.image_alt')}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          </div>
        </Section>

        {/* Donation Methods Section */}
        <Section
          id="donation-methods-section"
          className="bg-white dark:bg-red-900"
          aria-label={t('donation_methods.aria_label')}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('donation_methods.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donationMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full flex flex-col justify-between group">
                  {method.image && (
                    <img
                      src={method.image}
                      alt={method.image_alt}
                      className="w-77 h-68 mx-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-red-900 dark:text-yellow-500 mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {method.description}
                  </p>
                  {method.details && (
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      {method.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  )}
                  {method.link && (
                    <Link to={method.link}>
                      <Button size="sm" className="w-full mt-4">
                        {method.linkText}
                      </Button>
                    </Link>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Impact Stories Section */}
        <Section
          id="impact-stories-section"
          className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-red-800 dark:to-red-900"
          aria-label={t('impact_stories.aria_label')}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('impact_stories.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-lg">
                    "{story.quote}"
                  </p>
                  <div className="text-yellow-500 font-semibold">
                    - {story.author}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {story.location}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Reuseablecta />

    </ErrorBoundary>
  );
};

export default Donations;
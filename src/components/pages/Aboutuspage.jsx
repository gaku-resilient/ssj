import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import useTranslation from '../../i18n/useTranslation';
import Reuseablecta from '../Herosection/Reusablecta.jsx';

const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <motion.div
      className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

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
            {t('aboutpage.common.error')}
          </h2>
          <Button onClick={() => window.location.reload()}>
            {t('aboutpage.common.reload')}
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

const About = () => {
  const { t } = useTranslation();
  const { cursorPosition, isHovering } = useCursorEffect();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const karyakartas = useMemo(() => [
    {
      id: 1,
      name: t('aboutpage.karyakartas.title') + ' Naresh Mittal',
      role: 'Mandal President',
      description: 'Guides the spiritual direction of our Kirtans with 15 years of devotion.',
      image: 'src/assets/naresh.jpg'
    },
    {
      id: 2,
      name: t('aboutpage.karyakartas.title') + ' Somnath Madan',
      role: 'Mandal Sarprasth',
      description: '',
      image: 'src/assets/somnath.jpg'
    },
    {
      id: 3,
      name: t('aboutpage.karyakartas.title') + ' Vijay pruthi',
      role: 'Mandal Vice President',
      description: '',
      image: 'src/assets/vijya.jpg'
    },
    {
      id: 4,
      name: t('aboutpage.karyakartas.title') + ' Sachin Sharma',
      role: 'Mandal Joint Secretary',
      description: '',
      image: 'src/assets/sachin.jpg'
    },
    {
      id: 5,
      name: t('aboutpage.karyakartas.title') + ' Bhushan vij',
      role: 'Media Lead',
      description: 'Captures and shares our divine moments on YouTube and social media',
      image: 'bhushan.jpg'
    },
    {
      id: 6,
      name: t('aboutpage.karyakartas.title') + ' Aajya Juneja',
      role: 'Secratary',
      description: 'Connects with communities to spread bhakti.',
      image: 'ajayprofile.jpg'
    },
    {
      id: 7,
      name: t('aboutpage.karyakartas.title') + ' Desraj Sehgal and jyoti',
      role: 'Founder and Cashier',
      description: '',
      image: 'desuandjyoti.jpg'
    },
  ], [t]);

  const testimonials = useMemo(() => [
    {
      id: 1,
      quote: 'Shree Shiv Jyoti’s dedication to bhakti has transformed our community events.',
      author: 'Anita Sharma',
      location: 'Delhi',
      rating: 5
    },
    {
      id: 2,
      quote: 'Their spiritual guidance has brought peace to countless devotees.',
      author: 'Ramesh Patel',
      location: 'Mumbai',
      rating: 5
    },
  ], [t]);

  const impactStats = useMemo(() => [
    { id: 1, value: 1000, label: t('aboutpage.impact.title') + ' Events Organized' },
    { id: 2, value: 5000, label: t('aboutpage.impact.title') + ' Devotees Served' },
    { id: 3, value: 15, label: t('aboutpage.impact.title') + ' Years of Bhakti' },
  ], [t]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="bg-orange-50 dark:bg-red-900 relative overflow-hidden">
        {/* <motion.div
          className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference ${
            isHovering ? 'bg-yellow-500 scale-150' : 'bg-yellow-500 bg-opacity-50'
          }`}
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
            scale: isHovering ? 1.5 : 1
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        /> */}

        <Section
          className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-red-700"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 38, 53, 0.8), rgba(139, 38, 53, 0.6)), url('ssjhomeslider1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          aria-label="About Hero section"
        >
          <div className="text-center text-white px-4 max-w-6xl mx-auto">
            <motion.div
              variants={ANIMATION_VARIANTS.staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold font-serif text-yellow-500 tracking-wide mb-6"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                {t('aboutpage.hero.title')}
              </motion.h1>
              <motion.p
                className="text-xl md:text-3xl font-light text-orange-100 leading-relaxed"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                {t('aboutpage.hero.subtitle')}
              </motion.p>
            </motion.div>
          </div>
        </Section>

        <Section
          id="journey-section"
          className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-red-800 dark:to-red-900"
          aria-label="Our Journey"
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
                {t('aboutpage.journey.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                {t('aboutpage.journey.description')}
              </p>
              <Link to="/contact">
                <Button>{t('aboutpage.journey.button')}</Button>
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
                src="ssjhomeslider1.jpg"
                alt={t('aboutpage.journey.title')}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          </div>
        </Section>

        <Section
          id="mission-section"
          className="bg-white dark:bg-red-900"
          aria-label="Mission and Vision"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('aboutpage.mission_vision.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <h3 className="text-2xl font-semibold text-red-900 dark:text-yellow-500 mb-4">
                  {t('aboutpage.mission_vision.mission.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutpage.mission_vision.mission.description')}
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <h3 className="text-2xl font-semibold text-red-900 dark:text-yellow-500 mb-4">
                  {t('aboutpage.mission_vision.vision.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutpage.mission_vision.vision.description')}
                </p>
              </Card>
            </motion.div>
          </div>
        </Section>

        <Section
          id="karyakartas-section"
          className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-red-800 dark:to-red-900"
          aria-label="Meet Our Karyakartas"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('aboutpage.karyakartas.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {karyakartas.map((karyakarta) => (
              <motion.div
                key={karyakarta.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: karyakarta.id * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full flex flex-col justify-between group">
                  <img
                    src={karyakarta.image}
                    alt={karyakarta.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-center group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-red-900 dark:text-yellow-500">
                    {karyakarta.name}
                  </h3>
                  <p className="text-yellow-500 font-medium">{karyakarta.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {karyakarta.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section
          id="impact-section"
          className="bg-white dark:bg-red-900"
          aria-label="Our Impact"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('aboutpage.impact.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.id * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <motion.div
                    className="text-4xl font-bold text-yellow-500 mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: stat.id * 0.3 }}
                  >
                    {stat.value}+
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section
          id="testimonial-section"
          className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-red-800 dark:to-red-900"
          aria-label="Testimonials"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('aboutpage.testimonials.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: testimonial.id * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-yellow-500 font-semibold">
                    - {testimonial.author}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.location}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Reuseablecta />
      </div>
    </ErrorBoundary>
  );
};

export default About;
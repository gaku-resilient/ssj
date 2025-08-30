import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import useTranslation from '../../i18n/useTranslation';
import Reuseablecta from '../Herosection/Reusablecta.jsx';

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

const Contact = () => {
  const { t, language } = useTranslation();
  const { cursorPosition, isHovering } = useCursorEffect();
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    errors: {},
    submitStatus: null,
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: '' },
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formState.name.trim()) errors.name = t('contact.form.errors.name_required');
    if (!formState.email.trim()) errors.email = t('contact.form.errors.email_required');
    else if (!/\S+@\S+\.\S+/.test(formState.email)) errors.email = t('contact.form.errors.email_invalid');
    if (!formState.message.trim()) errors.message = t('contact.form.errors.message_required');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({ ...prev, errors }));
      return;
    }

    setFormState((prev) => ({ ...prev, submitStatus: 'submitting' }));

    try {
      const response = await fetch('https://formspree.io/f/xjkokygj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setFormState({
          name: '',
          email: '',
          message: '',
          errors: {},
          submitStatus: 'success',
        });
        setTimeout(() => setFormState((prev) => ({ ...prev, submitStatus: null })), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormState((prev) => ({ ...prev, submitStatus: 'error' }));
      setTimeout(() => setFormState((prev) => ({ ...prev, submitStatus: null })), 5000);
    }
  };

  // Memoized contact details
  const contactDetails = useMemo(() => [
    {
      id: 1,
      icon: '📞',
      title: t('contact.details.phone.title'),
      detail: '+91 123-456-7890',
      link: 'tel:+911234567890',
    },
    {
      id: 2,
      icon: '✉️',
      title: t('contact.details.email.title'),
      detail: 'vij.bhushan87@gmail.com',
      link: 'mailto:vij.bhushan87@gmail.com',
    },
    {
      id: 3,
      icon: '📍',
      title: t('contact.details.address.title'),
      detail: t('contact.details.address.detail'),
      link: 'https://maps.google.com/?q=Vrindavan,Mathura',
    },
  ], [t]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="bg-orange-50 dark:bg-red-900 relative overflow-hidden" >
        {/* Cursor Effect */}
        <motion.div
          className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference ${
            isHovering ? 'bg-yellow-500 scale-150' : 'bg-yellow-500 bg-opacity-50'
          }`}
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
            scale: isHovering ? 1.5 : 1
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />

        {/* Hero Section */}
        <Section
          className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-red-700"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 38, 53, 0.8), rgba(139, 38, 53, 0.6)), url('m6.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          aria-label={t('contact.hero.aria_label')}
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
                {t('contact.hero.title')}
              </motion.h1>
              <motion.p
                className="text-xl md:text-3xl font-light text-orange-100 leading-relaxed"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                {t('contact.hero.description')}
              </motion.p>
            </motion.div>
          </div>
        </Section>

        {/* Contact Form Section */}
        <Section
          id="contact-form-section"
          className="bg-white dark:bg-red-900"
          aria-label={t('contact.form.aria_label')}
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
                {t('contact.form.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                {t('contact.form.description')}
              </p>
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border-2 ${
                        formState.errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:border-yellow-500 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600`}
                      placeholder={t('contact.form.name_placeholder')}
                      aria-describedby={formState.errors.name ? 'name-error' : undefined}
                    />
                    {formState.errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        {formState.errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border-2 ${
                        formState.errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:border-yellow-500 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600`}
                      placeholder={t('contact.form.email_placeholder')}
                      aria-describedby={formState.errors.email ? 'email-error' : undefined}
                    />
                    {formState.errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">
                        {formState.errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border-2 ${
                        formState.errors.message ? 'border-red-500' : 'border-gray-300'
                      } focus:border-yellow-500 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600`}
                      placeholder={t('contact.form.message_placeholder')}
                      rows="5"
                      aria-describedby={formState.errors.message ? 'message-error' : undefined}
                    ></textarea>
                    {formState.errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1">
                        {formState.errors.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={formState.submitStatus === 'submitting'}
                  >
                    {formState.submitStatus === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
                  </Button>
                  {formState.submitStatus === 'success' && (
                    <p className="text-green-500 text-center mt-4">
                      {t('contact.form.success')}
                    </p>
                  )}
                  {formState.submitStatus === 'error' && (
                    <p className="text-red-500 text-center mt-4">
                      {t('contact.form.error')}
                    </p>
                  )}
                </form>
              </Card>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="m7.jpg"
                alt={t('contact.form.image_alt')}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          </div>
        </Section>

        {/* Contact Details Section */}
        <Section
          id="contact-details-section"
          className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-red-800 dark:to-red-900"
          aria-label={t('contact.details.aria_label')}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('contact.details.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">{detail.icon}</div>
                  <h3 className="text-xl font-semibold text-red-900 dark:text-yellow-500 mb-2">
                    {detail.title}
                  </h3>
                  <Link to={detail.link} className="text-gray-600 dark:text-gray-300 hover:text-yellow-500">
                    {detail.detail}
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Location Map Section */}
        <Section
          id="map-section"
          className="bg-white dark:bg-red-900"
          aria-label={t('contact.map.aria_label')}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('contact.map.title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-96 rounded-xl shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.400477881401!2d77.67205731507853!3d27.57288598285348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397371163d4d1e23%3A0x6c6a0b9e0b8e8b1c!2sVrindavan%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1634567890123"
              title={t('contact.map.iframe_title')}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </Section>

        <Reuseablecta />
      </div>
    </ErrorBoundary>
  );
};

export default Contact;
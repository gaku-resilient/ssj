import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Reuseablecta from '../Herosection/Reusablecta.jsx'
// import Media from '../components/Herosection/Media'
// import Media from '../components/Herosection/Media';
import Media from '../Herosection/Media';

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
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <motion.div
      className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
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
            Something went wrong
          </h2>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

const MediaEvents = () => {
  const { cursorPosition, isHovering } = useCursorEffect();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized data
  const events = useMemo(() => [
    {
      id: 1,
      title: 'Radha Krishna Jagran',
      date: 'Aug 10, 2025',
      place: 'Vrindavan',
      description: 'Join us for a night of divine devotion with soulful Kirtans dedicated to Radha and Krishna.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Shiv Bhakti Kirtan',
      date: 'Aug 15, 2025',
      place: 'Delhi',
      description: 'Experience the spiritual vibrations of Lord Shiva through our immersive Kirtan event.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Spiritual Retreat',
      date: 'Sep 5, 2025',
      place: 'Mathura',
      description: 'A weekend retreat filled with meditation, Kirtans, and spiritual discourses.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
  ], []);

  const galleryImages = useMemo(() => [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1500000001?w=400&h=300&fit=crop',
      alt: 'Devotees at Shree Shiv Jyoti Radha Krishna Jagran in Vrindavan'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1500000002?w=400&h=300&fit=crop',
      alt: 'Shree Shiv Jyoti Kirtan event with musical instruments'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1500000003?w=400&h=300&fit=crop',
      alt: 'Spiritual gathering at Shree Shiv Jyoti event in Delhi'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1500000004?w=400&h=300&fit=crop',
      alt: 'Devotees dancing at Shree Shiv Jyoti Spiritual Retreat'
    },
  ], []);

  const youtubeVideos = useMemo(() => [
    {
      id: 1,
      title: 'Radha Krishna Jagran 2024',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Relive the divine moments of our Radha Krishna Jagran.'
    },
    {
      id: 2,
      title: 'Shiv Bhakti Kirtan Highlights',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Experience the spiritual energy of our Shiv Bhakti Kirtan.'
    },
  ], []);

  const testimonials = useMemo(() => [
    {
      id: 1,
      quote: 'The Radha Krishna Jagran was a soul-stirring experience!',
      author: 'Anita Sharma',
      location: 'Delhi',
      rating: 5
    },
    {
      id: 2,
      quote: 'The YouTube videos beautifully capture the essence of our spiritual gatherings.',
      author: 'Ramesh Patel',
      location: 'Mumbai',
      rating: 5
    },
  ], []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="bg-orange-50 dark:bg-red-900 relative overflow-hidden">
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
          aria-label="Media and Events Hero section"
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
                Media & Events
              </motion.h1>
              <motion.p
                className="text-xl md:text-3xl font-light text-orange-100 leading-relaxed"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                Relive Divine Moments and Join Our Sacred Gatherings
              </motion.p>
            </motion.div>
          </div>
        </Section>

        {/* Upcoming Events Section */}
        {/* <Section
          id="upcoming-events-section"
          className="bg-white dark:bg-red-900"
          aria-label="Upcoming Events"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={event.image}
                      alt={`Event: ${event.title} by Shree Shiv Jyoti in ${event.place}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-red-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-red-900 dark:text-yellow-500 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    📅 {event.date} | 📍 {event.place}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {event.description}
                  </p>
                  <Link to="/contact">
                    <Button size="sm" className="w-full">
                      Join Us
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section> */}

        {/* Past Events Gallery Section */}
        {/* <Section
          id="gallery-section"
          className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-red-800 dark:to-red-900"
          aria-label="Past Events Gallery"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Past Events Gallery
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative overflow-hidden rounded-xl group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-red-900 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
              </motion.div>
            ))}
            <div className="col-span-full text-center mt-4">
              <Link to="/gallery">
                <Button>📸 View Full Gallery</Button>
              </Link>
            </div>
          </div>
        </Section> */}

        {/* YouTube Media Section */}
        {/* <Section
          id="youtube-section"
          className="bg-white dark:bg-red-900"
          aria-label="YouTube Media"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center text-red-900 dark:text-yellow-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our YouTube Media
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {youtubeVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col">
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <iframe
                      className="w-full h-64 md:h-80"
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <h3 className="text-xl font-semibold text-red-900 dark:text-yellow-500 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {video.description}
                  </p>
                  <a href="https://www.youtube.com/@ShreeShivJyoti" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="w-full">
                      Watch on YouTube
                    </Button>
                  </a>
                </Card>
              </motion.div>
            ))}
            <div className="col-span-full text-center mt-4">
              <a href="https://www.youtube.com/@ShreeShivJyoti" target="_blank" rel="noopener noreferrer">
                <Button>📺 Visit Our YouTube Channel</Button>
              </a>
            </div>
          </div>
        </Section> */}

        <Media/>



        {/* Testimonials Section */}
        <Section
          id="testimonials-section"
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
            Community Blessings
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
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

        {/* Call-to-Action Section */}
        {/* <Section
          id="cta-section"
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900"
          aria-label="Call to Action"
        >
          <div className="text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join Our Divine Events
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl leading-relaxed mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Participate in our upcoming Kirtans and Jagrans or support our mission through donations to continue spreading bhakti.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/contact">
                <Button variant="accent" size="lg" className="shadow-lg">
                  📅 Join an Event
                </Button>
              </Link>
              <Link to="/donations">
                <Button variant="secondary" size="lg" className="shadow-lg">
                  💰 Donate Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </Section> */}

        <Reuseablecta/>
      </div>
    </ErrorBoundary>
  );
};

export default MediaEvents;
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// import LanguageSwitch from '../../LanguageSwitch';
import LanguageSwitch from '../LanguageSwitch';

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
  navFadeIn: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  },
  linkHover: {
    whileHover: { scale: 1.1, color: THEME_COLORS.gold[500] },
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  menuSlide: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  menuItemFade: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: (index) => index * 0.1 }
  }
};

// Custom hook for cursor effect
const useCursorEffect = (headerRef) => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Debounce function to limit mousemove event frequency
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleMouseMove = useCallback(
    debounce((e) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const isInsideHeader = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
        if (isInsideHeader) {
          setCursorPosition({ x: e.clientX, y: e.clientY });
        } else {
          setCursorPosition({ x: -100, y: -100 }); // Hide cursor when outside header
        }
      }
    }, 10),
    [headerRef]
  );

  const handleMouseEnter = useCallback((e) => {
    if (e.target.closest('a, button')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    if (e.target.closest('a, button')) {
      setIsHovering(false);
    }
  }, []);

  // Detect touch devices
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  // Add event listeners only for non-touch devices
  useEffect(() => {
    if (!isTouchDevice) {
      const header = headerRef.current;
      if (header) {
        header.addEventListener('mousemove', handleMouseMove);
        header.addEventListener('mouseenter', handleMouseEnter);
        header.addEventListener('mouseleave', handleMouseLeave);
      }
      return () => {
        if (header) {
          header.removeEventListener('mousemove', handleMouseMove);
          header.removeEventListener('mouseenter', handleMouseEnter);
          header.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, isTouchDevice, headerRef]);

  return { cursorPosition, isHovering, isTouchDevice };
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const { cursorPosition, isHovering, isTouchDevice } = useCursorEffect(headerRef);

  // Navigation links (always in English)
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/donations', text: 'Donations' },
    { to: '/programs', text: 'Programs & Services' },
    { to: '/media-events', text: 'Media & Events' },
    { to: '/contact', text: 'Contact' },
  ];

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      ref={headerRef}
      className=" bg-amber-50  text-saffron-500 sticky top-0 z-50 shadow-lg"
      initial="initial"
      animate="animate"
      variants={ANIMATION_VARIANTS.navFadeIn}
    >
      {/* Cursor Effect */}
      {/* {!isTouchDevice && (
        <motion.div
          className={`fixed w-8 h-8 rounded-full pointer-events-none z-[1000] mix-blend-difference ${
            isHovering ? 'bg-yellow-500 scale-150' : 'bg-yellow-500 bg-opacity-50'
          }`}
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
            scale: isHovering ? 1.5 : 1,
            opacity: cursorPosition.x === -100 && cursorPosition.y === -100 ? 0 : 1
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      )} */}

      <div className=" container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* <img
            src="https://via.placeholder.com/40x40?text=SSJ"
            alt="Shree Shiv Jyoti Sankirtan Mandal Logo"
            className="w-10 h-10 rounded-full"
            loading="lazy"
          /> */}
          <span className="text-xl md:text-2xl font-bold font-serif text-yellow-500">
             Shree Shiv Jyoti Sankirtan Mandal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              whileHover={ANIMATION_VARIANTS.linkHover.whileHover}
              transition={ANIMATION_VARIANTS.linkHover.transition}
            >
              <Link
                to={link.to}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-saffron-500 hover:text-yellow-500'
                }`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                {link.text}
              </Link>
            </motion.div>
          ))}
          <LanguageSwitch />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-500 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.nav
          className="md:hidden bg-maroon-900 text-saffron-500"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={ANIMATION_VARIANTS.menuSlide}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                variants={ANIMATION_VARIANTS.menuItemFade}
                initial="initial"
                animate="animate"
                transition={{ ...ANIMATION_VARIANTS.menuItemFade.transition, delay: index * 0.1 }}
              >
                <Link
                  to={link.to}
                  className={`text-lg font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-yellow-500 border-b-2 border-yellow-500'
                      : 'text-saffron-500 hover:text-yellow-500'
                  }`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}
            <motion.div
              variants={ANIMATION_VARIANTS.menuItemFade}
              initial="initial"
              animate="animate"
              transition={{ ...ANIMATION_VARIANTS.menuItemFade.transition, delay: navLinks.length * 0.1 }}
            >
              <LanguageSwitch />
            </motion.div>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;
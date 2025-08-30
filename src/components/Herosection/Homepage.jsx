import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Star, Calendar, MapPin, Users, Heart, Phone, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import useTranslation from '../../i18n/useTranslation';

// Main Landing Page Component
const ShreeShivJyotiLanding = () => {
  const { t, language } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Hero slides with translated content
  const heroSlides = useMemo(() => [
    {
      id: 1,
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle'),
      description: t('hero.slide1.description'),
      accent: t('hero.slide1.accent'),
      stats: [
        { number: t('hero.slide1.stats.0.number'), label: t('hero.slide1.stats.0.label') },
        { number: t('hero.slide1.stats.1.number'), label: t('hero.slide1.stats.1.label') },
      ],
      image: 'ssjhomeslider1.jpg',
      gradient: 'from-orange-900/80 via-red-900/60 to-transparent',
    },
    {
      id: 2,
      title: t('hero.slide2.title'),
      subtitle: t('hero.slide2.subtitle'),
      description: t('hero.slide2.description'),
      accent: t('hero.slide2.accent'),
      stats: [
        { number: t('hero.slide2.stats.0.number'), label: t('hero.slide2.stats.0.label') },
        { number: t('hero.slide2.stats.1.number'), label: t('hero.slide2.stats.1.label') },
      ],
      image: 'm6.jpg',
      gradient: 'from-purple-900/80 via-red-900/60 to-transparent',
    },
    {
      id: 3,
      title: t('hero.slide3.title'),
      subtitle: t('hero.slide3.subtitle'),
      description: t('hero.slide3.description'),
      accent: t('hero.slide3.accent'),
      stats: [
        { number: t('hero.slide3.stats.0.number'), label: t('hero.slide3.stats.0.label') },
        { number: t('hero.slide3.stats.1.number'), label: t('hero.slide3.stats.1.label') },
      ],
      image: 'M1.jpg',
      gradient: 'from-blue-900/80 via-purple-900/60 to-transparent',
    },
    {
      id: 4,
      title: t('hero.slide4.title'),
      subtitle: t('hero.slide4.subtitle'),
      description: t('hero.slide4.description'),
      accent: t('hero.slide4.accent'),
      stats: [
        { number: t('hero.slide4.stats.0.number'), label: t('hero.slide4.stats.0.label') },
        { number: t('hero.slide4.stats.1.number'), label: t('hero.slide4.stats.1.label') },
      ],
      image: 'https://images.unsplash.com/photo-1518614363324-945392ed8183?w=1920&h=1080&fit=crop&crop=center',
      gradient: 'from-green-900/80 via-teal-900/60 to-transparent',
    },
  ], [t]);

  // Services with translated content
  const services = useMemo(() => [
    {
      id: 1,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      icon: '🎵',
      gradient: 'from-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
      link: '#contact',
    },
    {
      id: 2,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      icon: '🚌',
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&crop=center',
      link: '#contact',
    },
    {
      id: 3,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      icon: '🏠',
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1518614363324-945392ed8183?w=400&h=300&fit=crop&crop=center',
      link: '#contact',
    },
    {
      id: 4,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      icon: '📸',
      gradient: 'from-purple-500 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
      link: '#gallery',
    },
    {
      id: 5,
      title: t('services.service5.title'),
      description: t('services.service5.description'),
      icon: '👥',
      gradient: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&crop=center',
      link: '#about',
    },
  ], [t]);

  // Events with translated content
  const events = useMemo(() => [
    {
      id: 1,
      title: t('events.event1.title'),
      date: t('events.event1.date'),
      place: t('events.event1.place'),
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
      description: t('events.event1.description'),
    },
    {
      id: 2,
      title: t('events.event2.title'),
      date: t('events.event2.date'),
      place: t('events.event2.place'),
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&crop=center',
      description: t('events.event2.description'),
    },
    {
      id: 3,
      title: t('events.event3.title'),
      date: t('events.event3.date'),
      place: t('events.event3.place'),
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
      description: t('events.event3.description'),
    },
  ], [t]);

  // Testimonials with translated content
  const testimonials = useMemo(() => [
    {
      id: 1,
      quote: t('testimonials.testimonial1.quote'),
      author: t('testimonials.testimonial1.author'),
      location: t('testimonials.testimonial1.location'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616c6c95b84?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      quote: t('testimonials.testimonial2.quote'),
      author: t('testimonials.testimonial2.author'),
      location: t('testimonials.testimonial2.location'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 3,
      quote: t('testimonials.testimonial3.quote'),
      author: t('testimonials.testimonial3.author'),
      location: t('testimonials.testimonial3.location'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
  ], [t]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Button handlers
  const handleBookingClick = useCallback((context) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open('https://chat.whatsapp.com/HQIzw7FYD7z9JylAWEKYGa?mode=ac_t', '_blank');
    }, 500);
  }, []);

  const handleContactpage = useCallback(() => {
    window.location.href = '/about';
  }, []);

  const handleServicespage = useCallback(() => {
    window.location.href = '/programs';
  }, []);

  const handleContactClick = useCallback(() => {
    window.open('tel:+919876543210', '_self');
  }, []);

  const handleEmailClick = useCallback(() => {
    window.open('mailto:info@shreeshivjyoti.com', '_self');
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 overflow-x-hidden" >
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${slide.gradient}`} />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-white/10 text-4xl md:text-6xl animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                >
                  🕉️
                </div>
              ))}
            </div>
            <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div
                className={`text-center text-white max-w-6xl mx-auto transition-all duration-1000 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="text-lg md:text-xl font-medium text-yellow-200 mb-4 animate-pulse">
                  {slide.accent}
                </div>
                <h1 className="text-4xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-yellow-100">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed text-white/90">
                  {slide.description}
                </p>
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                  {slide.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-2xl md:text-4xl font-bold text-yellow-300 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm md:text-base text-white/80">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                  <button
                    onClick={() => handleBookingClick(slide.subtitle)}
                    disabled={isLoading}
                    className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-100 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    aria-label={t('hero.book_now')}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : null}
                    {t('hero.book_now')}
                  </button>
                  <button
                    onClick={() => handleServicespage()}
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-300"
                    aria-label={t('hero.learn_more')}
                  >
                    {t('hero.learn_more')}
                  </button>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {['hare_krishna', 'radhe_radhe', 'jai_shri_ram'].map((key, index) => (
                    <span
                      key={key}
                      className={`text-lg font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 cursor-pointer ${
                        index === currentSlide ? 'animate-pulse' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {t(`hero.mantras.${key}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={t('hero.go_to_slide', { number: index + 1 })}
            />
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={t('hero.prev_slide')}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={t('hero.next_slide')}
        >
          <ChevronRight size={24} />
        </button>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isAutoPlaying ? t('hero.pause_autoplay') : t('hero.start_autoplay')}
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-r from-orange-100 to-red-100" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-red-900 leading-tight">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.description')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-bold text-red-600 mb-2">{t('about.stats.years.number')}</div>
                  <div className="text-sm text-gray-600">{t('about.stats.years.label')}</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-bold text-red-600 mb-2">{t('about.stats.events.number')}</div>
                  <div className="text-sm text-gray-600">{t('about.stats.events.label')}</div>
                </div>
              </div>
              <button
                onClick={handleContactpage}
                className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-300 flex items-center"
                aria-label={t('about.learn_more')}
              >
                {t('about.learn_more')}
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="ssjhomeslider1.jpg"
                  alt={t('about.image_alt')}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-bold">{t('about.image_title')}</div>
                  <div className="text-sm opacity-90">{t('about.image_description')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-red-900 mb-16">
            {t('services.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s`, animation: 'fadeInUp 0.6s ease-out forwards' }}
              >
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={t(`services.service${service.id}.image_alt`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-90`}></div>
                </div>
                <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between min-h-80">
                  <div>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-white/90 mb-6 leading-relaxed">{service.description}</p>
                  </div>
                  <button
                    onClick={() => handleBookingClick(service.title)}
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center font-semibold"
                    aria-label={t('services.book_now')}
                  >
                    {t('services.book_now')}
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-red-900 mb-16">
            {t('events.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={t(`events.event${event.id}.image_alt`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t('events.new')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2 text-red-600" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600 mb-6">
                    <MapPin size={16} className="mr-2 text-red-600" />
                    {event.place}
                  </div>
                  <button
                    onClick={() => handleBookingClick(`${event.title} event`)}
                    className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition-colors duration-300 font-semibold flex items-center justify-center"
                    aria-label={t('events.join_us')}
                  >
                    {t('events.join_us')}
                    <Users size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-red-900 mb-16">
            {t('gallery.title')}
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="aspect-video relative">
                <img
                  src="m7.jpg"
                  alt={t('gallery.video_alt')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                <button
                  onClick={() => window.open('https://youtube.com/@deshraj68?si=URD0Anm3ejVjExpH', '_blank')}
                  className="absolute inset-0 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                  aria-label={t('gallery.play_video')}
                >
                  <div className="bg-red-600 rounded-full p-4 shadow-lg">
                    <Play size={32} fill="white" />
                  </div>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['M2.jpg', 'M4.jpg', 'm5.jpg', 'm7.jpg'].map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl group shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={image}
                    alt={t(`gallery.image${index + 1}_alt`)}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/20 transition-all duration-300"></div>
                </div>
              ))}
              <div className="col-span-2 text-center mt-4">
                <button
                  onClick={() => window.open('#gallery', '_self')}
                  className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                  aria-label={t('gallery.see_full')}
                >
                  <ExternalLink size={20} className="mr-2" />
                  {t('gallery.see_full')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-red-900 mb-16">
            {t('testimonials.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-4 right-4 text-red-200 text-4xl font-serif">"</div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-center leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-semibold text-red-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundSize: '100px 100px' }}></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">{t('cta.title')}</h2>
          <p className="text-xl mb-12 leading-relaxed opacity-90">{t('cta.description')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => alert(t('cta.donate_alert'))}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-100 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
              aria-label={t('cta.donate')}
            >
              <Heart className="mr-2" size={20} />
              {t('cta.donate')}
            </button>
            <button
              onClick={handleContactClick}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              aria-label={t('cta.contact')}
            >
              <Phone className="mr-2" size={20} />
              {t('cta.contact')}
            </button>
            <button
              onClick={handleEmailClick}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              aria-label={t('cta.email')}
            >
              <Mail className="mr-2" size={20} />
              {t('cta.email')}
            </button>
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center">
            <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-red-900 font-semibold">{t('common.loading')}</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ShreeShivJyotiLanding;
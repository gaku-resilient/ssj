import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const ImageGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      id: 1,
      title: 'Kashi Dham yatra',
      src: './M1.jpg',
      thumb: './M1.jpg'
    },
    {
      id: 2,
      title: 'Delhi SHree radha raman kirtan',
      src: 'M3.jpg',
      thumb: 'M3.jpg'
    },
    {
      id: 3,
      title: 'Shree radha raman prakat utsav',
      src: 'M4.jpg',
      thumb: 'M4.jpg'
    },
    {
      id: 4,
      title: 'Shree radha raman prakat utsav',
      src: 'm5.jpg',
      thumb: 'm5.jpg'
    },
    {
      id: 5,
      title: 'Shree rdha raman ji profiles',
      src: 'm7.jpg',
      thumb: 'm7.jpg'
    },
    {
      id: 6,
      title: 'Shree radha raman prakat utsav',
      src: 'm6.jpg',
      thumb: 'm6.jpg'
    },
   
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  React.useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen]);

  return (
    <section className="py-20  min-h-screen relative overflow-hidden">
      {/* Enhanced Background Animation Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Medium floating orbs */}
        <div className="absolute top-40 right-40 w-24 h-24 bg-amber-400/8 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-40 w-28 h-28 bg-amber-400/6 rounded-full blur-2xl animate-pulse delay-700"></div>
        
        {/* Small floating particles */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-amber-400/20 rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-amber-400/25 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-amber-400/30 rounded-full animate-bounce delay-800"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-amber-400/20 rounded-full animate-bounce delay-1100"></div>
        
        {/* Floating lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-pulse delay-400"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/5 to-transparent animate-pulse delay-900"></div>
      </div>

      <div className="container mx-auto px- relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent mb-3">
      Past Events Gallery
          </h1>
          <p className="text-xl text-black-300 max-w-3xl mx-auto leading-relaxed">
            Click on any image to view it in full size
          </p>
        </header>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-amber-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={image.thumb}
                  alt={image.title}
                  className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-amber-400 text-slate-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Title */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black group-hover:text-amber-400 transition-colors duration-300">
                  {image.title}
                </h3>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ cursor: 'default' }}
          onClick={closeLightbox}
        >
          {/* Animated Background Elements for Lightbox */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-amber-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
            <div className="absolute bottom-20 left-32 w-24 h-24 bg-amber-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-40 right-10 w-18 h-18 bg-amber-400/8 rounded-full blur-xl animate-pulse delay-1500"></div>
            
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/30 rounded-full animate-bounce delay-200"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-400/40 rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-amber-400/35 rounded-full animate-bounce delay-1200"></div>
          </div>

          {/* Close Button - Top Right */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 bg-amber-400 text-slate-900 p-3 rounded-full hover:bg-amber-300 transition-all duration-200 z-60 shadow-lg hover:scale-110"
            style={{ cursor: 'pointer' }}
            title="Close (ESC)"
          >
            <X size={24} />
          </button>

          {/* Cancel Button - Top Left */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 left-6 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-200 z-60 shadow-lg hover:scale-105 font-medium"
            style={{ cursor: 'pointer' }}
            title="Cancel"
          >
            Cancel
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-amber-400/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-400/30 transition-all duration-200 z-60 shadow-lg hover:scale-110"
            style={{ cursor: 'pointer' }}
            title="Previous Image (←)"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-amber-400/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-400/30 transition-all duration-200 z-60 shadow-lg hover:scale-110"
            style={{ cursor: 'pointer' }}
            title="Next Image (→)"
          >
            <ChevronRight size={24} />
          </button>

          {/* Main Image Container */}
          <div 
            className="relative max-w-7xl max-h-full"
            style={{ cursor: 'zoom-in' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
              style={{ cursor: 'zoom-in' }}
              draggable="false"
            />
            
            {/* Image Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg pointer-events-none">
              <h3 className="text-2xl font-bold text-white mb-2">
                {images[currentImageIndex].title}
              </h3>
              <p className="text-amber-400 text-sm">
                {currentImageIndex + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-amber-400/20 backdrop-blur-sm text-white px-4 py-2 rounded-full pointer-events-none">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-lg text-sm pointer-events-none">
            Press ESC to close • Use ← → arrows to navigate
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
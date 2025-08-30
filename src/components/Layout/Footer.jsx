import React from 'react';
import { Phone, Mail, MapPin, Youtube, Facebook, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const handleContactClick = (type) => {
    switch(type) {
      case 'phone':
        window.open('tel:+919876543210', '_self');
        break;
      case 'email':
        window.open('mailto:info@shreeshivjyoti.com', '_self');
        break;
      case 'youtube':
        window.open('https://youtube.com/@shreeshivjyoti', '_blank');
        break;
      case 'facebook':
        window.open('https://facebook.com/shreeshivjyoti', '_blank');
        break;
      case 'instagram':
        window.open('https://instagram.com/shreeshivjyoti', '_blank');
        break;
      default:
        break;
    }
  };

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Kirtan & Jagran Booking',
    'Spiritual Bus Seva',
    'Dharamshala Accommodation',
    'Event Photography',
    'YouTube Channel'
  ];

  return (
    <footer className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}>
        </div>
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-900 text-xl font-bold">🕉️</span>
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">Shree Shiv Jyoti</h3>
              </div>
              <p className="text-red-200 mb-6 leading-relaxed">
                Spreading bhakti and devotion through divine Kirtan and Jagran services for over a decade. Join us in our spiritual journey.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleContactClick('youtube')}
                  className="bg-red-800 hover:bg-red-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 group"
                  aria-label="YouTube Channel"
                >
                  <Youtube size={20} className="group-hover:text-yellow-400 transition-colors duration-300" />
                </button>
                <button 
                  onClick={() => handleContactClick('facebook')}
                  className="bg-red-800 hover:bg-red-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 group"
                  aria-label="Facebook Page"
                >
                  <Facebook size={20} className="group-hover:text-yellow-400 transition-colors duration-300" />
                </button>
                <button 
                  onClick={() => handleContactClick('instagram')}
                  className="bg-red-800 hover:bg-red-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 group"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={20} className="group-hover:text-yellow-400 transition-colors duration-300" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-yellow-400 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-red-200 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-6 text-yellow-400 text-lg">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-red-200 flex items-center">
                    <Heart size={14} className="text-yellow-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold mb-6 text-yellow-400 text-lg">Contact Us</h4>
              <div className="space-y-4">
                <button 
                  onClick={() => handleContactClick('phone')}
                  className="flex items-center text-red-200 hover:text-yellow-400 transition-colors duration-300 group w-full text-left"
                >
                  <Phone size={18} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>+91 98765 43210</span>
                </button>
                
                <button 
                  onClick={() => handleContactClick('email')}
                  className="flex items-center text-red-200 hover:text-yellow-400 transition-colors duration-300 group w-full text-left"
                >
                  <Mail size={18} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>info@shreeshivjyoti.com</span>
                </button>
                
                <div className="flex items-start text-red-200">
                  <MapPin size={18} className="mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p>Shree Shiv Jyoti Dharamshala</p>
                    <p>Vrindavan, Mathura</p>
                    <p>Uttar Pradesh - 281121</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-red-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-red-300 text-sm mb-4 md:mb-0">
                &copy; 2025 Shree Shiv Jyoti Sankirtan Mandal. All rights reserved.
              </p>
              
              {/* Devotional Quote */}
              <div className="flex items-center text-yellow-400 text-sm">
                <Heart size={16} className="mr-2" />
                <span className="font-semibold">हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// import React, { useState, useEffect } from 'react';
// import { Phone, Mail, Heart } from 'lucide-react';

// const CtaReusable = ({ 
//   title = "Connect with Your Spiritual Journey",
//   subtitle = "Take the next step towards enlightenment and inner peace",
//   callNowText = "Call Now",
//   callNowNumber = "+1 (555) 123-4567",
//   contactText = "Contact Us",
//   contactEmail = "hello@spiritual.com",
//   donateText = "Donate",
//   donateAmount = "$25",
//   className = ""
// }) => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const ctaButtons = [
//     {
//       icon: Phone,
//       text: callNowText,
//       subText: callNowNumber,
//       bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
//       hoverColor: "hover:from-orange-600 hover:to-red-700",
//       action: () => window.location.href = `tel:${callNowNumber}`
//     },
//     {
//       icon: Mail,
//       text: contactText,
//       subText: contactEmail,
//       bgColor: "bg-gradient-to-r from-red-800 to-red-900",
//       hoverColor: "hover:from-red-900 hover:to-red-950",
//       action: () => window.location.href = `mailto:${contactEmail}`
//     },
//     {
//       icon: Heart,
//       text: donateText,
//       subText: donateAmount,
//       bgColor: "bg-gradient-to-r from-yellow-600 to-orange-500",
//       hoverColor: "hover:from-yellow-700 hover:to-orange-600",
//       action: () => console.log('Donate clicked')
//     }
//   ];

//   return (
//     <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
//       {/* Animated Background */}
//       <div 
//         className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50"
//         style={{
//           transform: `translateY(${scrollY * 0.5}px)`,
//         }}
//       >
//         {/* Floating Particles */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-30 animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${3 + Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>
        
//         {/* Cursor Trail Effect */}
//         <div
//           className="absolute w-64 h-64 bg-gradient-radial from-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
//           style={{
//             left: mousePosition.x - 128,
//             top: mousePosition.y - 128,
//             transform: `translate(${Math.sin(scrollY * 0.01) * 50}px, ${Math.cos(scrollY * 0.01) * 30}px)`
//           }}
//         />
//       </div>

//       {/* Geometric Patterns */}
//       <div className="absolute inset-0 opacity-10">
//         <div 
//           className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-orange-500 rotate-45 animate-spin"
//           style={{ animationDuration: '20s' }}
//         />
//         <div 
//           className="absolute top-3/4 right-1/4 w-24 h-24 border-4 border-red-800 rotate-12 animate-bounce"
//           style={{ animationDuration: '3s' }}
//         />
//         <div 
//           className="absolute top-1/2 left-3/4 w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-full animate-pulse"
//           style={{ animationDuration: '4s' }}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
//         {/* Title Section */}
//         <div className="mb-16 animate-fade-in">
//           <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-800 to-yellow-600 bg-clip-text text-transparent leading-tight">
//             {title}
//           </h2>
//           <p className="text-xl md:text-2xl text-red-900/80 max-w-3xl mx-auto leading-relaxed">
//             {subtitle}
//           </p>
//         </div>

//         {/* CTA Buttons */}
//         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           {ctaButtons.map((button, index) => {
//             const Icon = button.icon;
//             return (
//               <div
//                 key={index}
//                 className="group relative"
//                 style={{
//                   animationDelay: `${index * 0.2}s`
//                 }}
//               >
//                 {/* Glow Effect */}
//                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                
//                 {/* Button */}
//                 <button
//                   onClick={button.action}
//                   className={`relative w-full ${button.bgColor} ${button.hoverColor} text-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group-hover:-translate-y-2`}
//                 >
//                   {/* Icon */}
//                   <div className="flex justify-center mb-4">
//                     <div className="p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-300">
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>
//                   </div>
                  
//                   {/* Text */}
//                   <div className="space-y-2">
//                     <h3 className="text-2xl font-bold tracking-wide">
//                       {button.text}
//                     </h3>
//                     <p className="text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
//                       {button.subText}
//                     </p>
//                   </div>
                  
//                   {/* Hover Shine Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Bottom Decoration */}
//         <div className="mt-20 flex justify-center">
//           <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-red-800 to-yellow-600 rounded-full animate-pulse" />
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 1s ease-out forwards;
//         }
        
//         @keyframes gradient-shift {
//           0%, 100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }
        
//         .bg-gradient-radial {
//           background: radial-gradient(circle, var(--tw-gradient-stops));
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CtaReusable;






















// import React, { useState, useEffect } from 'react';
// import { Phone, Mail, Heart, Users, Clock, Star } from 'lucide-react';

// const CtaReusable = ({ 
//   title = "Transform Lives Through Spiritual Connection",
//   organizationName = "Sacred Path Foundation",
//   callNowText = "Speak with a Guide",
//   callNowNumber = "+1 (555) SACRED-1",
//   contactText = "Join Our Community",
//   contactEmail = "connect@sacredpath.org",
//   className = ""
// }) => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollY, setScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeStats, setActiveStats] = useState([]);

//   // Psychological data for impact
//   const impactStats = [
//     { number: "10,000+", label: "Lives Transformed", icon: Users },
//     { number: "24/7", label: "Support Available", icon: Clock },
//     { number: "98%", label: "Satisfaction Rate", icon: Star }
//   ];
// const Link = ({ to, children, className, ...props }) => (
//   <a href={to} className={className} {...props}>
//     {children}
//   </a>
// );
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           // Animate stats with delay
//           impactStats.forEach((_, index) => {
//             setTimeout(() => {
//               setActiveStats(prev => [...prev, index]);
//             }, index * 300);
//           });
//         }
//       },
//       { threshold: 0.3 }
//     );
    

//     const element = document.getElementById('cta-section');
//     if (element) observer.observe(element);

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       if (element) observer.unobserve(element);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <section 
//       id="cta-section"
//       className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-amber-900 ${className}`}
//     >
//       {/* Dynamic Background */}
//       <div className="absolute inset-0">
//         {/* Animated Gradient Orbs */}
//         <div 
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse"
//           style={{
//             transform: `translate(${Math.sin(scrollY * 0.01) * 100}px, ${Math.cos(scrollY * 0.01) * 50}px)`,
//             animationDuration: '4s'
//           }}
//         />
//         <div 
//           className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"
//           style={{
//             transform: `translate(${Math.cos(scrollY * 0.008) * 80}px, ${Math.sin(scrollY * 0.008) * 60}px)`,
//             animationDelay: '2s',
//             animationDuration: '5s'
//           }}
//         />
        
//         {/* Cursor Interactive Light */}
//         <div
//           className="absolute w-72 h-72 bg-gradient-radial from-amber-300/20 via-orange-300/10 to-transparent rounded-full pointer-events-none transition-all duration-700 ease-out"
//           style={{
//             left: mousePosition.x - 144,
//             top: mousePosition.y - 144,
//           }}
//         />
        
//         {/* Sacred Geometry */}
//         <div className="absolute inset-0 opacity-10">
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-amber-400 rounded-full animate-twinkle"
//               style={{
//                 left: `${10 + (i * 12)}%`,
//                 top: `${20 + Math.sin(i) * 30}%`,
//                 animationDelay: `${i * 0.5}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
//         {/* Impact Stats */}
//         {/* <div className="mb-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
//           {impactStats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={index}
//                 className={`text-center transform transition-all duration-1000 ${
//                   activeStats.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//                 }`}
//               >
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-400/20 rounded-full mb-3">
//                   <Icon className="w-6 h-6 text-amber-300" />
//                 </div>
//                 <div className="text-2xl font-bold text-amber-300 mb-1">{stat.number}</div>
//                 <div className="text-sm text-amber-200/80">{stat.label}</div>
//               </div>
//             );
//           })}
//         </div> */}

//         {/* Main Heading */}
//         <div className={`mb-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent leading-tight">
//             {title}
//           </h1>
//           <p className="text-xl md:text-2xl text-amber-100/90 max-w-3xl mx-auto leading-relaxed">
//             Join thousands who've found peace, purpose, and profound transformation through our guided spiritual journey.
//           </p>
//         </div>

//         {/* Social Proof */}
//         {/* <div className={`mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-amber-400/20">
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
//               ))}
//             </div>
//             <p className="text-amber-100/90 italic text-lg">
//               "This organization changed my life completely. The spiritual guidance I received was exactly what my soul needed."
//             </p>
//             <p className="text-amber-300 mt-2 font-semibold">- Sarah M., Community Member</p>
//           </div>
//         </div> */}

//         {/* CTA Buttons */}
//         <div className={`grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           {/* Call Now */}
//           <div className="group relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000" />
//             <button
//               onClick={() => window.location.href = `tel:${callNowNumber}`}
//               className="relative w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white p-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
//             >
//               <Phone className="w-8 h-8 mx-auto mb-3" />
//               <h3 className="text-xl font-bold mb-3">{callNowText}</h3>
//               <p className="text-sm opacity-90">{callNowNumber}</p>
//               <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
//                 call us
//               </div>
//             </button>
//           </div>

//           {/* Contact */}
//           <div className="group relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000" />
//             <button
//               onClick={() => window.location.href = `mailto:${contactEmail}`}
//               className="relative w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white p-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
//             >
//               <Mail className="w-8 h-8 mx-auto mb-3" />
//               <h3 className="text-xl font-bold mb-2">{contactText}</h3>
//               <p className="text-sm opacity-90 mb-3">{contactEmail}</p>
//               <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
//                 24/7 Support
//               </div>
//             </button>
//           </div>

//           {/* Donate - Most Prominent */}
//           <div className="group relative md:col-span-1">
          
//             <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 to-orange-400 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 animate-pulse" />
//               <Link to="/donations">
//             <button
//               onClick={() => console.log('Donate to organization')}
//               className="relative w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
//             >
//               {/* <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
//                 URGENT
//               </div> */}
//               <Heart className="w-8 h-8 mx-auto animate-pulse" />
//               <h3 className="text-2xl font-bold ">Support Our Mission</h3>
//               <p className="text-sm opacity-90 mb-3">Help us reach more souls in need</p>
//               {/* <div className="bg-black/20 rounded-lg p-3 mb-3">
//                 <p className="text-xs">$25 provides guidance for 1 person</p>
//                 <p className="text-xs">$100 supports our community programs</p>
//               </div> */}
//               <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
//                 🙏 Donate Now
//               </div>
//             </button>
//             </Link>

//           </div>
          
//         </div>

//         {/* Urgency & Scarcity */}
//         {/* <div className={`transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//           <div className="bg-red-900/40 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-red-400/30">
//             <p className="text-red-200 text-sm font-semibold mb-2">
//               ⚡ Limited Time: Free Spiritual Assessment
//             </p>
//             <p className="text-red-100/80 text-xs">
//               Only 12 spots remaining this week. Your transformation awaits.
//             </p>
//           </div>
//         </div> */}
//       </div>

//       <style jsx>{`
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
        
//         .animate-twinkle {
//           animation: twinkle 2s ease-in-out infinite;
//         }
        
//         .bg-gradient-radial {
//           background: radial-gradient(circle, var(--tw-gradient-stops));
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CtaReusable;















import React, { useState, useEffect } from 'react';
import { Phone, Mail, Heart, Users, Clock, Star } from 'lucide-react';
import useTranslation from '../../i18n/useTranslation';

const CtaReusable = ({
  className = ""
}) => {
  const { t, language } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStats, setActiveStats] = useState([]);

  // Psychological data for impact
  const impactStats = [
    { number: "10,000+", label: t('cta.stats.lives_transformed'), icon: Users },
    { number: "24/7", label: t('cta.stats.support_available'), icon: Clock },
    { number: "98%", label: t('cta.stats.satisfaction_rate'), icon: Star }
  ];

  const Link = ({ to, children, className, ...props }) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate stats with delay
          impactStats.forEach((_, index) => {
            setTimeout(() => {
              setActiveStats(prev => [...prev, index]);
            }, index * 300);
          });
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('cta-section');
    if (element) observer.observe(element);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [impactStats]);

  return (
    <section 
      id="cta-section"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-amber-900 ${className}`}
     
      aria-label={t('cta.aria_label')}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${Math.sin(scrollY * 0.01) * 100}px, ${Math.cos(scrollY * 0.01) * 50}px)`,
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${Math.cos(scrollY * 0.008) * 80}px, ${Math.sin(scrollY * 0.008) * 60}px)`,
            animationDelay: '2s',
            animationDuration: '5s'
          }}
        />
        
        {/* Cursor Interactive Light */}
        <div
          className="absolute w-72 h-72 bg-gradient-radial from-amber-300/20 via-orange-300/10 to-transparent rounded-full pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x - 144,
            top: mousePosition.y - 144,
          }}
        />
        
        {/* Sacred Geometry */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full animate-twinkle"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + Math.sin(i) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Impact Stats */}
        {/* <div className="mb-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transform transition-all duration-1000 ${
                  activeStats.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-400/20 rounded-full mb-3">
                  <Icon className="w-6 h-6 text-amber-300" />
                </div>
                <div className="text-2xl font-bold text-amber-300 mb-1">{stat.number}</div>
                <div className="text-sm text-amber-200/80">{stat.label}</div>
              </div>
            );
          })}
        </div> */}

        {/* Main Heading */}
        <div className={`mb-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent leading-tight">
            {t('cta.title')}
          </h1>
          <p className="text-xl md:text-2xl text-amber-100/90 max-w-3xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>
        </div>

        {/* Social Proof */}
        {/* <div className={`mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-amber-400/20">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
              ))}
            </div>
            <p className="text-amber-100/90 italic text-lg">
              {t('cta.testimonial.quote')}
            </p>
            <p className="text-amber-300 mt-2 font-semibold">{t('cta.testimonial.author')}</p>
          </div>
        </div> */}

        {/* CTA Buttons */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Call Now */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000" />
            <button
              onClick={() => window.location.href = `tel:${t('cta.call_now_number')}`}
              className="relative w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white p-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-3">{t('cta.call_now_text')}</h3>
              <p className="text-sm opacity-90">{t('cta.call_now_number')}</p>
              <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
                {t('cta.call_us')}
              </div>
            </button>
          </div>

          {/* Contact */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000" />
            <button
              onClick={() => window.location.href = `mailto:${t('cta.contact_email')}`}
              className="relative w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white p-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">{t('cta.contact_text')}</h3>
              <p className="text-sm opacity-90 mb-3">{t('cta.contact_email')}</p>
              <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
                {t('cta.support_24_7')}
              </div>
            </button>
          </div>

          {/* Donate */}
          <div className="group relative md:col-span-1">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 to-orange-400 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 animate-pulse" />
            <Link to="/donations">
              <button
                onClick={() => console.log('Donate to organization')}
                className="relative w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              >
                <Heart className="w-8 h-8 mx-auto animate-pulse" />
                <h3 className="text-2xl font-bold">{t('cta.donate_text')}</h3>
                <p className="text-sm opacity-90 mb-3">{t('cta.donate_description')}</p>
                <div className="bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
                  {t('cta.donate')}
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Urgency & Scarcity */}
        {/* <div className={`transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-red-900/40 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-red-400/30">
            <p className="text-red-200 text-sm font-semibold mb-2">
              {t('cta.urgency.title')}
            </p>
            <p className="text-red-100/80 text-xs">
              {t('cta.urgency.description')}
            </p>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};

export default CtaReusable;
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from '../components/Section';
import { useInView } from '../hooks/useInView';

const images = [
  {
    src: "/img/Qui-suis-je/Ancien_RP.png",
    alt: "Ancien RP"
  },
  {
    src: "/img/Qui-suis-je/Presentaiton_RP.png",
    alt: "Présentation RP"
  }
];

const Quisuije = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.1,
    once: false,
    rootMargin: '-50px 0px -10% 0px',
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.45
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const controlsVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen bg-[#1a0f0a] py-20 overflow-hidden"
      id="quisuije"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />

      <motion.div 
        className="container mx-auto px-6 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={titleVariants}
          className="text-5xl text-sand-200 font-bold text-center mb-12"
        >
          Qui suis-je ?
        </motion.h2>

        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            variants={imageVariants}
            className="relative aspect-video rounded-2xl overflow-hidden
                    shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-sand-200/10"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </motion.div>

          <motion.div 
            variants={controlsVariants}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <button
              onClick={handlePrev}
              className="px-8 py-3 rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-sm
                       transition-all duration-300 shadow-lg border border-sand-200/10
                       flex items-center gap-2 group"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-sand-200 group-hover:text-white transition-colors"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="text-sand-200 group-hover:text-white transition-colors font-medium">
                Précédent
              </span>
            </button>

            <div className="flex justify-center gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-sand-200 scale-125'
                      : 'bg-sand-200/30 hover:bg-sand-200/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-lg bg-black/30 hover:bg-black/50 backdrop-blur-sm
                       transition-all duration-300 shadow-lg border border-sand-200/10
                       flex items-center gap-2 group"
            >
              <span className="text-sand-200 group-hover:text-white transition-colors font-medium">
                Suivant
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-sand-200 group-hover:text-white transition-colors"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Quisuije;
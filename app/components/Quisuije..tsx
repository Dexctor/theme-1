'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from '../components/Section';
import { useInView } from '../hooks/useInView';

const images = [
  {
    src: "/img/Qui-suije/Ancien_RP.png",
    alt: "Ancien RP"
  },
  {
    src: "/img/Qui-suije/Presentaiton_RP.png",
    alt: "Présentation RP"
  }
];

const Quisuije = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.8,
    once: false,
    rootMargin: '0px',
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
        duration: 0.6,
        ease: "easeOut"
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

      <div className="container mx-auto px-6 relative z-20">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          className="text-5xl text-sand-200 font-bold text-center mb-12"
        >
          Qui suis-je ?
        </motion.h2>

        <div className="max-w-6xl mx-auto relative">
          <div className="relative aspect-video rounded-2xl overflow-hidden
                    shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-sand-200/10">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
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
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Quisuije;
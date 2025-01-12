'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    threshold: 0.2,
    once: true,
    rootMargin: '-100px',
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const characterX = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const characterOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const backgroundVariants = {
    hidden: { scale: 1.05 },
    visible: { 
      scale: 1,
      transition: { 
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const characterVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={ref} 
      className="relative h-screen w-full overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ opacity }}
    >
      {/* Background Image */}
      <motion.div 
        variants={backgroundVariants}
        style={{ y: parallaxY }}
        className="absolute inset-0"
      >
        <Image
          src="/img/Accueil.png"
          alt="Village de Suna"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </motion.div>
      
      {/* Title */}
      <motion.div 
        variants={titleVariants}
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: titleY }}
      >
        <Image
          src="/img/Titre.png"
          alt="Kobiro Satsu"
          width={1000}
          height={600}
          priority
          className="z-10"
          sizes="(max-width: 768px) 90vw, 1000px"
          quality={90}
        />
      </motion.div>

      {/* Character */}
      <motion.div
        variants={characterVariants}
        className="absolute -bottom-10 right-0 w-[800px] h-[1000px] z-20"
        style={{ 
          x: characterX,
          opacity: characterOpacity
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/img/Perso.png"
            alt="Kobiro Satsu Character"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 800px"
            quality={90}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.7) 15%, rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.7) 20%, rgba(0,0,0,0))'
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
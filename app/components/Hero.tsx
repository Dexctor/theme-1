'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    threshold: 0.8,
    once: false,
    rootMargin: '0px',
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const backgroundVariants = {
    hidden: { scale: 1.1 },
    visible: { 
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    }
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const characterVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
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
    >
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
        />
      </motion.div>
      
      <motion.div 
        variants={titleVariants}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/img/Titre.png"
          alt="Kobiro Satsu"
          width={1000}
          height={600}
          priority
          className="z-10"
        />
      </motion.div>

      <motion.div
        variants={characterVariants}
        className="absolute -bottom-10 right-0 w-[800px] h-[1000px] z-20"
      >
        <div className="relative w-full h-full">
          <Image
            src="/img/Perso.png"
            alt="Kobiro Satsu Character"
            fill
            className="object-contain object-bottom"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 60%, rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 60%, rgba(0,0,0,0))'
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
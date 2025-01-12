'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/Section';
import { useInView } from '../hooks/useInView';

interface CharacteristicCardProps {
  title: string;
  content: string;
  backgroundImage: string;
  modalImage?: string;
  unoptimized?: boolean;
}

interface TraitDeCaractere {
  titre: string;
  description: string;
  gif: string;
}

const CaractereModal = ({ onClose }: { onClose: () => void }) => {
  const [traitHover, setTraitHover] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isModalInView = useInView(modalRef, {
    threshold: 0.5,
    once: false,
    rootMargin: '0px',
  });

  const traits: TraitDeCaractere[] = [
    {
      titre: "Loyal",
      description: "Kobiro voue une loyauté infaillible a Suna et son clan. Il agira toujours dans l'intérêt de ces derniers.",
      gif: "/img/caractéristiques/loyal_gif.gif"
    },
    {
      titre: "Calculateur",
      description: "L'aspect calculateur permet à Kobiro de tirer certaines situations à son avantage. Il ne fait rien sans arrière-pensées. Chacun de ces choix est calculé dans le but d'avoir quelque chose de positif en retour.",
      gif: "/img/caractéristiques/calculateur_gif.gif"
    },
    {
      titre: "Sociable",
      description: "Kobiro est très sociable. Cela lui permet de facilement tisser des liens, parfois dans des buts précis. Il n'hésitera pas à aller vers les gens tout en masquant ses intentions.",
      gif: "/img/caractéristiques/sociable_gif.gif"
    }
  ];

  const traitVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: (index: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#1a1a1a]/70 rounded-2xl overflow-hidden w-[90vw] aspect-[16/9] max-w-[1600px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0">
          <Image
            src="/img/caractéristiques/background_caractere_modal.png"
            alt="Background"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/30 to-[#1a1a1a]/60" />
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-sand-200 z-20
                   text-4xl transition-all duration-300 p-4 rounded-full 
                   hover:bg-white/10 hover:scale-110 backdrop-blur-sm"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="relative z-10 p-12 h-full flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full max-w-[1400px] mx-auto">
            {traits.map((trait, index) => (
              <motion.div
                key={trait.titre}
                custom={index}
                variants={traitVariants}
                initial="hidden"
                animate={isModalInView ? "visible" : "hidden"}
                className="flex flex-col items-center group h-[500px] mt-32"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setTraitHover(trait.titre)}
                onHoverEnd={() => setTraitHover(null)}
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 max-w-[320px]
                             shadow-2xl transform transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <Image
                    src={trait.gif}
                    alt={trait.titre}
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 
                               group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 transition-all duration-300 
                             group-hover:text-sand-200 text-shadow-lg tracking-wide">
                  {trait.titre}
                </h3>
                
                <div className="relative h-[180px] w-full flex items-start justify-center">
                  <AnimatePresence>
                    {traitHover === trait.titre && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-0  bg-black/80 backdrop-blur-md p-6 rounded-2xl 
                                 shadow-2xl border border-white/20 transform-gpu max-h-[180px] overflow-y-auto
                                 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                      >
                        <p className="text-white text-center text-base leading-relaxed tracking-wide
                                  font-medium">
                          {trait.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Modal = ({ 
  title, 
  modalImage,
  onClose 
}: { 
  title: string; 
  modalImage?: string;
  onClose: () => void;
}) => {
  if (title === "Caractère") {
    return <CaractereModal onClose={onClose} />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-sand-200 z-10 
                   text-3xl transition-colors p-2 rounded-full hover:bg-black/20"
          aria-label="Fermer"
        >
          ✕
        </button>
        {modalImage && (
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <Image
              src={modalImage}
              alt={title}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              width={1200}
              height={800}
              priority
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const CharacteristicCard = ({ title, backgroundImage, modalImage, unoptimized = false, index }: CharacteristicCardProps & { index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, {
    threshold: 0.5,
    once: false,
    rootMargin: '0px',
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.6 + (index * 0.2), // Délai plus long pour apparaître après le titre
        ease: [0.215, 0.610, 0.355, 1.000] // Courbe d'animation cubique
      }
    }
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isCardInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group 
                   shadow-lg transition-shadow hover:shadow-xl"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={backgroundImage}
          alt={title}
          fill
          unoptimized={unoptimized}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 
                      group-hover:from-black/80 group-hover:to-black/30 transition-colors" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-2xl font-bold text-white text-left">
            {title}
          </h3>
          <p className="text-sand-200 mt-2 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 text-sm">
            Cliquez pour en savoir plus
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title={title}
            modalImage={modalImage}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Caracteristique = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.2, // Réduit pour déclencher plus tôt
    once: false,
    rootMargin: '0px',
  });
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -30,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.610, 0.355, 1.000],
        delay: 0.1
      }
    }
  };
  const separatorVariants = {
    hidden: { 
      opacity: 0,
      width: "0%",
      scale: 0.8 
    },
    visible: { 
      opacity: 1,
      width: "100%",
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.215, 0.610, 0.355, 1.000],
        delay: 0.4
      }
    }
  };

  const symbolVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.610, 0.355, 1.000],
        delay: 0.5
      }
    }
  };
  const characteristics = [
    {
      title: "Apparence",
      content: "Description détaillée de l'apparence physique...",
      backgroundImage: "/img/caractéristiques/app_back.png",
      modalImage: "/img/caractéristiques/app_modal.png",
    },
    {
      title: "Caractère",
      content: "Description détaillée du caractère et de la personnalité...",
      backgroundImage: "/img/caractéristiques/caractere_gif.gif",
      unoptimized: true,
    }
  ];

  return (
    <Section
      ref={sectionRef}
      className="py-20 relative bg-[#e0bd7f]"
      id="caracteristiques"
    >
      <motion.div 
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={titleVariants}
          className="text-5xl text-black font-bold text-center mb-12"
        >
          Caractéristiques
        </motion.h2>

        <div className="flex items-center justify-center mb-16">
          <motion.div 
            variants={separatorVariants}
            className="h-px bg-sand-600 w-full max-w-[200px]" 
          />
          <motion.div
            variants={symbolVariants}
            animate={{ 
              rotate: 360,
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }
            }}
            className="mx-4"
          >
            <Image
              src="/img/story/symbole.png"
              alt="Séparateur"
              width={40}
              height={40}
              className="opacity-80"
            />
          </motion.div>
          <motion.div 
            variants={separatorVariants}
            className="h-px bg-sand-600 w-full max-w-[200px]" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {characteristics.map((characteristic, index) => (
            <CharacteristicCard
              key={index}
              {...characteristic}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Caracteristique;

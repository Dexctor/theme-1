'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/Section';
import { useInView } from '../hooks/useInView';

interface StoryCardProps {
  title: string;
  content: string;
  backgroundImage: string;
  modalImage?: string;
  index: number;
}

const Modal = ({ 
  title, 
  modalImage,
  onClose 
}: { 
  title: string; 
  modalImage?: string;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className="relative w-full h-full flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-sand-200 z-10 
                 text-3xl transition-colors p-2 rounded-full hover:bg-black/20"
      >
        ✕
      </motion.button>
      {modalImage && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-full flex items-center justify-center p-8"
        >
          <Image
            src={modalImage}
            alt={title}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            width={1200}
            height={800}
            priority
          />
        </motion.div>
      )}
    </motion.div>
  </motion.div>
);

const StoryCard = ({ title, backgroundImage, modalImage, index }: StoryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { // Suppression du cast
    threshold: 0.5,
    once: false,
    rootMargin: '0px',
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.2
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
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 0.8 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 
                    transition-opacity duration-300"
        />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-x-0 bottom-0 p-6"
        >
          <h3 className="text-2xl font-bold text-white text-left">
            {title}
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="text-sand-200 mt-2 text-sm"
          >
            Cliquez pour en savoir plus
          </motion.p>
        </motion.div>
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

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isButtonInView = useInView(buttonRef, { // Suppression du cast
    threshold: 0.5,
    once: false,
    rootMargin: '0px',
  });


  const buttonVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        variants={buttonVariants}
        initial="hidden"
        animate={isButtonInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 left-6 z-10 bg-white/10 p-2 rounded-full 
                 backdrop-blur-sm hover:bg-white/20 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div
          animate={{
            opacity: [1, 0.5, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/img/story/icon-story.png"
            alt="Informations"
            width={100}
            height={100}
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title="Rapport #122"
            modalImage="/img/story/info-story.png"
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Story = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { // Suppression du cast
    threshold: 0.8,
    once: false,
    rootMargin: '0px',
  });


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
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const separatorVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8 
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stories = [
    {
      title: "L'Eclosion",
      content: "Contenu détaillé de l'histoire de l'éclosion...",
      backgroundImage: "/img/story/card-1.jpg",
      modalImage: "/img/story/eclosion_modal.png",
    },
    {
      title: "L'Evolution",
      content: "Contenu de l'histoire 2...",
      backgroundImage: "/img/story/card-2.jpg",
      modalImage: "/img/story/evolution_modal.png",
    },
    {
      title: "Nouvel Ere",
      content: "Contenu de l'histoire 3...",
      backgroundImage: "/img/story/card-3.jpg",
      modalImage: "/img/story/nouvelere_modal.png",
    },
  ];

  return (
    <Section
      ref={sectionRef}
      className="py-20 relative bg-[#e0bd7f]"
      id="histoire"
    >
      <InfoButton />
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
          Histoire
        </motion.h2>

        <motion.div
          variants={separatorVariants}
          className="flex items-center justify-center mb-16"
        >
          <div className="h-px bg-sand-600 w-full max-w-[200px]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
          <div className="h-px bg-sand-600 w-full max-w-[200px]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              {...story}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Story;

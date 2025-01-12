'use client';

import { useState, useRef, useEffect, memo } from 'react';
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

const Modal = ({ title, modalImage, onClose }: { 
  title: string; 
  modalImage?: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    // Add no-scroll class to body when modal is open
    document.body.classList.add('no-scroll');
    return () => {
      // Remove no-scroll class from body when modal is closed
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
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
          <Image
            src={modalImage}
            alt={title}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            width={1200}
            height={800}
            priority
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// eslint-disable-next-line react/display-name
const StoryCard = memo(({ title, backgroundImage, modalImage, index }: StoryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, {
    threshold: 0.2,
    once: true,
    rootMargin: '-50px',
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
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6 + (index * 0.2)
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isCardInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        className="relative h-72 rounded-2xl overflow-hidden cursor-pointer 
                 shadow-lg transition-all duration-300 hover:shadow-xl"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="absolute inset-0 transition-transform duration-500 hover:scale-110">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 
                    transition-opacity duration-300 group-hover:opacity-80" />
        
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-2xl font-bold text-white text-left">
            {title}
          </h3>
          <p className="text-sand-200 mt-2 text-sm opacity-0 transform translate-y-2 
                     transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            Cliquez pour en savoir plus
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title={title}
            modalImage={modalImage}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
});

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 left-6 z-10 bg-white/10 p-2 rounded-full 
                 backdrop-blur-sm hover:bg-white/20 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
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
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.2,
    once: true,
    rootMargin: '-50px',
  });

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
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 className="text-5xl text-black font-bold">
            Histoire
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
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
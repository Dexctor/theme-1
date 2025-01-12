'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Section } from '../components/Section';
import { useInView } from '../hooks/useInView';

const objectifsClan: ObjectifData[] = [
  {
    title: "Corpus secret",
    content: "Kobiro souhaitera garder des traces écrites de l'histoire du clan Satsu tel qu'il le connait. Suite à cette amnésie et cette perte d'identité temporaire que ses ancêtres ont subit, il juge nécessaire d'archiver dans un document secret l'histoire de son clan."
  },
  {
    title: "Dojo Satsu",
    content: "Le dojo Satsu accueillera les ninjas souhaitant apprendre l'art du forgeron ou l'art de l'assassinat. Ils pourront se spécialiser dans ces deux disciplines et les meilleurs peuvent espérer intégrer la forge, ou une garde spéciale d'assassins."
  },
  {
    title: "Asseoir son autorité",
    content: "Kobiro utilisera la désinformation et la manipulation de l'opinion publique pour ternir la réputation du clan Fûma et donc éteindre toute rivalité entre les deux clans. Il organisera des missions de traques pour entrainer les membres du clan Satsu afin de garder leur sens aiguisé."
  },
  {
    title: "Système de missions",
    content: "Mise en place d'un système pour contacter le clan afin de réaliser des missions de type tueur à gage."
  },
  {
    title: "Relations Sabaku",
    content: "Kobiro souhaite entretenir une relation étroite avec les Sabaku en les soutenant dans leurs projets. Ce comportement montre la gratitude qu'il a envers ce clan au vu de la main salvatrice que les Sabaku ont tendu au ancetres de Kobiro. Ce soutien pourrait apporter des bienfaits aux Satsu à l'avenir."
  }
];

const objectifsPersonnels: ObjectifData[] = [
  {
    title: "Chef de la Keisatsu",
    content: "Son grand-père Kaito était chef du clan et également chef de la Keisatsu. Kobiro souhaite récupérer cet héritage et continuer à faire prospérer cette institution pour le bien de Suna."
  },
  {
    title: "Maître assassin",
    content: "Kobiro continuera de s'entrainer sans relâche afin d'aiguiser sa lame d'assassin. De plus, il développera ses compétences en kenjutsu qui lui serviront pour affiner son apprentissage dans l'art de l'assassinat. Il fera en sorte de se démarquer des autres dans ces domaines afin de graver son nom dans l'histoire comme étant un grand manieur de sabre, et un assassin redouté du monde ninja."
  },
  {
    title: "Rejoindre la Keisatsu",
    content: "Kobiro fera en sorte d'être stagiaire au sein de la Keisatsu le plus rapidement possible. La Keisatsu lui permet d'être au coeur de nombreux évenements au sein du village ce qui lui permettra de récolter beaucoup d'informations qui lui serviront à l'avenir."
  },
  {
    title: "Maîtriser le Fuinjutsu",
    content: "Kobiro tâchera de trouver un maitre afin d'apprendre le fuinjutsu. Cette technique lui permettra de sceller les secrets du clan, ou bien les multitudes d'armes qui seront forgées par le clan afin d'éviter qu'ils tombent entre de mauvaises mains."
  }
];

interface ObjectifData {
  title: string;
  content: string;
}

const ObjectifDescription = ({ content, isVisible }: { content: string; isVisible: boolean }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, {
    threshold: 0.5,
    once: false,
    rootMargin: '0px',
  });

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={contentRef}
      variants={contentVariants}
      initial="hidden"
      animate={isVisible && isContentInView ? "visible" : "hidden"}
      className="flex flex-col items-center gap-8"
    >
      <p className="text-sand-300 leading-relaxed text-lg w-full">
        {content}
      </p>
      <motion.div 
        className="flex-shrink-0 w-40 h-40"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/img/Objectif/icon.png"
          alt="Objectif icon"
          width={160}
          height={160}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

const ObjectifTitle = ({ title }: { title: string }) => (
  <h3 className="text-3xl font-bold text-sand-200 mb-8" style={{ fontFamily: 'Edo' }}>
    {title}
  </h3>
);

const ObjectifButton = ({ title, isSelected, onClick, index }: { 
  title: string; 
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isButtonInView = useInView(buttonRef, {
    threshold: 0.5,
    once: false,
    rootMargin: '0px',
  });

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      x: -20 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      variants={buttonVariants}
      initial="hidden"
      animate={isButtonInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all backdrop-blur-sm
        ${isSelected
          ? 'bg-sand-200/90 text-[#1a0f0a] shadow-[0_0_15px_rgba(224,189,127,0.3)]'
          : 'bg-[#1a0f0a]/80 text-sand-200 hover:bg-[#1a0f0a]/90 hover:shadow-[0_0_10px_rgba(224,189,127,0.1)]'
        }`}
    >
      <span className="font-bold" style={{ fontFamily: 'Edo' }}>{title}</span>
    </motion.button>
  );
};

const Objectif = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.8,
    once: false,
    rootMargin: '0px',
  });

  const [activeTab, setActiveTab] = useState<'clan' | 'personnel'>('clan');
  const [selectedObjectif, setSelectedObjectif] = useState<ObjectifData>(objectifsClan[0]);

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

  const leftBackgroundVariants = {
    hidden: { 
      opacity: 0,
      x: -200,
      scale: 0.95 
    },
    visible: { 
      opacity: 0.15,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.01, -0.05, 0.95],
        opacity: { duration: 0.8 }
      }
    }
  };

  const rightBackgroundVariants = {
    hidden: { 
      opacity: 0,
      x: 200,
      scale: 0.95 
    },
    visible: { 
      opacity: 0.15,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.01, -0.05, 0.95],
        opacity: { duration: 0.8 }
      }
    }
  };

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen bg-[#1a0f0a] py-20 overflow-hidden geist-font"
      id="objectifs"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />
      
      <motion.div
        variants={leftBackgroundVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        className="absolute left-0 top-0 h-full w-[40vw] overflow-hidden"
      >
        <div className="absolute inset-0 blur-[5000px] opacity-50">
          <Image
            src="/img/Objectif/Face.png"
            alt="Gaara Left Blur"
            fill
            className="object-cover scale-110"
            style={{
              filter: 'grayscale(100%) brightness(0.1)',
            }}
          />
        </div>
        <Image
          src="/img/Objectif/Face.png"
          alt="Gaara Left"
          fill
          className="object-cover"
          style={{
            filter: 'grayscale(100%) brightness(0.7)',
            maskImage: `radial-gradient(circle at 70% 50%, 
              black 20%, 
              rgba(0,0,0,0.5) 35%, 
              rgba(0,0,0,0.2) 50%,
              transparent 70%
            )`,
            WebkitMaskImage: `radial-gradient(circle at 70% 50%, 
              black 20%, 
              rgba(0,0,0,0.5) 35%, 
              rgba(0,0,0,0.2) 50%,
              transparent 70%
            )`
          }}
        />
      </motion.div>

      <motion.div
        variants={rightBackgroundVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        className="absolute right-0 top-0 h-full w-[40vw] overflow-hidden"
      >
        <div className="absolute inset-0 blur-[50px] opacity-50">
          <Image
            src="/img/Objectif/Face.png"
            alt="Gaara Right Blur"
            fill
            className="object-cover scale-110"
            style={{
              filter: 'grayscale(100%) brightness(0.7)',
            }}
          />
        </div>
        <Image
          src="/img/Objectif/Face.png"
          alt="Gaara Right"
          fill
          className="object-cover"
          style={{
            filter: 'grayscale(100%) brightness(0.7)',
            maskImage: `radial-gradient(circle at 30% 50%, 
              black 20%, 
              rgba(0,0,0,0.5) 35%, 
              rgba(0,0,0,0.2) 50%,
              transparent 70%
            )`,
            WebkitMaskImage: `radial-gradient(circle at 30% 50%, 
              black 20%, 
              rgba(0,0,0,0.5) 35%, 
              rgba(0,0,0,0.2) 50%,
              transparent 70%
            )`
          }}
        />
      </motion.div>

      <motion.div 
        className="container mx-auto px-6 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={titleVariants}
          className="text-5xl font-bold text-sand-200 text-center mb-12"
          style={{ fontFamily: 'Edo' }}
        >
          Objectifs
        </motion.h2>

        <div className="flex justify-center mb-16 gap-8">
          {['clan', 'personnel'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => {
                setActiveTab(tab as 'clan' | 'personnel');
                setSelectedObjectif((activeTab === 'clan' ? objectifsClan : objectifsPersonnels)[0]);
              }}
              className={`px-8 py-4 rounded-xl text-xl font-bold transition-all
                ${activeTab === tab 
                  ? 'bg-sand-200 text-[#2A1810] shadow-lg scale-105'
                  : 'bg-[#2A1810]/30 text-sand-200 hover:bg-[#2A1810]/50'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Objectifs {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4 relative"
            >
              {(activeTab === 'clan' ? objectifsClan : objectifsPersonnels).map((objectif, index) => (
                <ObjectifButton
                  key={objectif.title}
                  title={objectif.title}
                  isSelected={selectedObjectif?.title === objectif.title}
                  onClick={() => setSelectedObjectif(objectif)}
                  index={index}
                />
              ))}
            </motion.div>
          </div>

          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {selectedObjectif && (
                <motion.div
                  key={selectedObjectif.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#1a0f0a]/90 backdrop-blur-sm rounded-2xl p-8 h-full
                           shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-sand-200/10"
                >
                  <ObjectifTitle title={selectedObjectif.title} />
                  <ObjectifDescription content={selectedObjectif.content} isVisible={isSectionInView} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Objectif;

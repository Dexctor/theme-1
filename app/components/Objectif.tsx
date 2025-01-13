"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";

// Types
interface ObjectifData {
  title: string;
  content: string;
}

// Constants
const objectifsClan: ObjectifData[] = [
  {
    title: "Corpus secret",
    content: "Kobiro souhaitera garder des traces écrites de l'histoire du clan Satsu tel qu'il le connait. Suite à cette amnésie et cette perte d'identité temporaire que ses ancêtres ont subit, il juge nécessaire d'archiver dans un document secret l'histoire de son clan.",
  },
  {
    title: "Dojo Satsu",
    content: "Le dojo Satsu accueillera les ninjas souhaitant apprendre l'art du forgeron ou l'art de l'assassinat. Ils pourront se spécialiser dans ces deux disciplines et les meilleurs peuvent espérer intégrer la forge, ou une garde spéciale d'assassins.",
  },
  {
    title: "Asseoir son autorité",
    content: "Kobiro utilisera la désinformation et la manipulation de l'opinion publique pour ternir la réputation du clan Fûma et donc éteindre toute rivalité entre les deux clans.  Il organisera des missions de traques et d'assassinat en compétition avec le clan Fûma, afin d'entrainer les membres du clan Satsu à garder leurs sens aiguisés.",
  },
  {
    title: "Système de missions",
    content: "Mise en place d'un système pour contacter le clan afin de réaliser des missions de type tueur à gage.",
  },
  {
    title: "Relations Sabaku",
    content: "Kobiro souhaite entretenir une relation étroite avec les Sabaku en les soutenant dans leurs projets. Ce comportement montre la gratitude qu'il a envers ce clan au vu de la main salvatrice que les Sabaku ont tendu au ancetres de Kobiro. Ce soutien pourrait apporter des bienfaits aux Satsu à l'avenir.",
  },
];

const objectifsPersonnels: ObjectifData[] = [
  {
    title: "Chef de la Keisatsu",
    content: "Son grand-père Kaito était chef du clan et également chef de la Keisatsu. Kobiro souhaite récupérer cet héritage et continuer à faire prospérer cette institution pour le bien de Suna.",
  },
  {
    title: "Maître assassin",
    content: "Kobiro continuera de s'entrainer sans relâche afin d'aiguiser sa lame d'assassin. De plus, il développera ses compétences en kenjutsu qui lui serviront pour affiner son apprentissage dans l'art de l'assassinat. Il fera en sorte de se démarquer des autres dans ces domaines afin de graver son nom dans l'histoire comme étant un grand manieur de sabre, et un assassin redouté du monde ninja.",
  },
  {
    title: "Rejoindre la Keisatsu",
    content: "Kobiro fera en sorte d'être stagiaire au sein de la Keisatsu le plus rapidement possible. La Keisatsu lui permet d'être au coeur de nombreux évenements au sein du village ce qui lui permettra de récolter beaucoup d'informations qui lui serviront à l'avenir.",
  },
  {
    title: "Maîtriser le Fuinjutsu",
    content: "Kobiro tâchera de trouver un maitre afin d'apprendre le fuinjutsu. Cette technique lui permettra de sceller les secrets du clan, ou bien les multitudes d'armes qui seront forgées par le clan afin d'éviter qu'ils tombent entre de mauvaises mains.",
  },
];

// Animations
const animations = {
  container: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    }
  },
  title: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    }
  },
  content: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  button: {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }
    })
  },
  background: {
    left: {
      hidden: { opacity: 0, x: -100, scale: 0.98 },
      visible: {
        opacity: 0.15,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          opacity: { duration: 0.6 }
        }
      }
    },
    right: {
      hidden: { opacity: 0, x: 100, scale: 0.98 },
      visible: {
        opacity: 0.15,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          opacity: { duration: 0.6 }
        }
      }
    }
  }
};

// Styles
const styles = {
  backgroundImage: {
    base: "absolute inset-0",
    mask: {
      left: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
      right: "linear-gradient(to left, transparent, black 30%, black 70%, transparent)"
    }
  },
  button: {
    base: "w-full text-left p-4 rounded-xl transition-all backdrop-blur-sm",
    selected: "bg-sand-200/90 text-[#1a0f0a] shadow-[0_0_15px_rgba(224,189,127,0.3)]",
    default: "bg-[#1a0f0a]/80 text-sand-200 hover:bg-[#1a0f0a]/90 hover:shadow-[0_0_10px_rgba(224,189,127,0.1)]"
  }
};

// Custom Hook
const useObjectifState = () => {
  const [activeTab, setActiveTab] = useState<"clan" | "personnel">("clan");
  const [selectedObjectif, setSelectedObjectif] = useState<ObjectifData>(objectifsClan[0]);

  const handleTabChange = (tab: "clan" | "personnel") => {
    setActiveTab(tab);
    setSelectedObjectif(tab === "clan" ? objectifsClan[0] : objectifsPersonnels[0]);
  };

  return {
    activeTab,
    selectedObjectif,
    handleTabChange,
    setSelectedObjectif
  };
};

// Components
const BackgroundImage = ({ side }: { side: 'left' | 'right' }) => (
  <motion.div
    className={`absolute ${side}-0 top-0 h-full w-[40vw] overflow-hidden`}
    variants={animations.background[side]}
    initial="hidden"
    animate="visible"
  >
    <div className="absolute inset-0 blur-[100px] opacity-30">
      <Image
        src="/img/Objectif/Face.png"
        alt={`Gaara ${side}`}
        fill
        className="object-cover scale-110"
        style={{ filter: "grayscale(100%) brightness(0.1)" }}
      />
    </div>
    <div className={styles.backgroundImage.base}>
      <Image
        src="/img/Objectif/Face.png"
        alt={`Gaara ${side}`}
        fill
        className="object-cover"
        style={{
          objectPosition: "50% 50%",
          maskImage: styles.backgroundImage.mask[side],
          WebkitMaskImage: styles.backgroundImage.mask[side],
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-${side === 'left' ? 'r' : 'l'} from-[#1a0f0a] via-transparent to-transparent opacity-90`} />
    </div>
  </motion.div>
);

const ObjectifDescription = ({ 
  content, 
  isVisible,
  type 
}: { 
  content: string; 
  isVisible: boolean;
  type: "clan" | "personnel";
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, {
    threshold: 0.1,
    once: true,
    rootMargin: "0px",
  });

  const iconSrc = type === "clan" 
    ? "/img/Objectif/icon-clan.png" 
    : "/img/Objectif/icon.png";

  return (
    <motion.div
      ref={contentRef}
      variants={animations.content}
      initial="hidden"
      animate={isVisible && isContentInView ? "visible" : "hidden"}
      className="flex flex-col items-center gap-8"
    >
      <p className="text-sand-300 leading-relaxed text-lg w-full">{content}</p>
      <motion.div
        className="flex-shrink-0 w-40 h-40"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={iconSrc}
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
  <h3
    className="text-3xl font-bold text-sand-200 mb-8"
    style={{ fontFamily: "Edo" }}
  >
    {title}
  </h3>
);

const ObjectifButton = ({
  title,
  isSelected,
  onClick,
  index,
}: {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isButtonInView = useInView(buttonRef, {
    threshold: 0.1,
    once: true,
    rootMargin: "0px",
  });

  return (
    <motion.button
      ref={buttonRef}
      variants={animations.button}
      initial="hidden"
      animate={isButtonInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${styles.button.base} ${
        isSelected ? styles.button.selected : styles.button.default
      }`}
    >
      <span className="font-bold" style={{ fontFamily: "Edo" }}>
        {title}
      </span>
    </motion.button>
  );
};

const Objectif = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.1,
    once: false,
    rootMargin: "-50px 0px -10% 0px",
  });

  const { activeTab, selectedObjectif, handleTabChange, setSelectedObjectif } = useObjectifState();

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen bg-[#1a0f0a] py-20 overflow-hidden geist-font"
      id="objectifs"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />
      
      <BackgroundImage side="left" />
      <BackgroundImage side="right" />

      <motion.div
        className="container mx-auto px-6 relative z-20"
        variants={animations.container}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={animations.title}
          className="text-5xl font-bold text-sand-200 text-center mb-12"
          style={{ fontFamily: "Edo" }}
        >
          Objectifs
        </motion.h2>

        <div className="flex justify-center mb-16 gap-8">
          {["clan", "personnel"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => handleTabChange(tab as "clan" | "personnel")}
              className={`px-8 py-4 rounded-xl text-xl font-bold transition-all
                ${
                  activeTab === tab
                    ? "bg-sand-200 text-[#2A1810] shadow-lg scale-105"
                    : "bg-[#2A1810]/30 text-sand-200 hover:bg-[#2A1810]/50"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: "Edo" }}
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
              {(activeTab === "clan" ? objectifsClan : objectifsPersonnels).map(
                (objectif, index) => (
                  <ObjectifButton
                    key={objectif.title}
                    title={objectif.title}
                    isSelected={selectedObjectif?.title === objectif.title}
                    onClick={() => setSelectedObjectif(objectif)}
                    index={index}
                  />
                )
              )}
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
                  <ObjectifDescription
                    content={selectedObjectif.content}
                    isVisible={isSectionInView}
                    type={activeTab}
                  />
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
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { WordCard } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface FlipCardProps {
  card: WordCard;
  onKnow?: () => void;
  onDontKnow?: () => void;
  showButtons?: boolean;
}

export function FlipCard({ card, onKnow, onDontKnow, showButtons = true }: FlipCardProps) {
  const { language, t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  const frontText = language === 'ru' ? card.front : card.frontKz;

  return (
    <div className="space-y-4">
      <div 
        className="flip-card h-48 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flip-card-front flex flex-col items-center justify-center p-6">
            <p className="text-xl font-semibold text-center">{frontText}</p>
            <p className="text-sm text-muted-foreground mt-4">{t.words.tapToFlip}</p>
          </div>
          
          {/* Back */}
          <div className="flip-card-back flex flex-col items-center justify-center p-6">
            <p className="text-3xl font-bold text-primary mb-2">{card.back}</p>
            <p className="text-lg text-muted-foreground">[{card.transcription}]</p>
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsFlipped(false);
              onDontKnow?.();
            }}
            className="flex-1 korean-btn-outline flex items-center justify-center gap-2"
          >
            <ThumbsDown className="w-4 h-4" />
            {t.words.dontKnow}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsFlipped(false);
              onKnow?.();
            }}
            className="flex-1 korean-btn-primary flex items-center justify-center gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            {t.words.know}
          </motion.button>
        </div>
      )}
    </div>
  );
}

interface FlipCardDeckProps {
  cards: WordCard[];
  onComplete?: () => void;
}

export function FlipCardDeck({ cards, onComplete }: FlipCardDeckProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);

  const handleKnow = () => {
    setKnownCount(prev => prev + 1);
    nextCard();
  };

  const handleDontKnow = () => {
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          {currentIndex + 1} / {cards.length}
        </span>
        <span className="text-primary font-bold">
          {t.words.cardsLearned}: {knownCount}
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Current card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <FlipCard 
            card={currentCard} 
            onKnow={handleKnow}
            onDontKnow={handleDontKnow}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

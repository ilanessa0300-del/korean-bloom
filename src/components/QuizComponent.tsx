import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { QuizQuestion } from '@/types';
import { KoreanCard } from './KoreanCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (scorePercent: 0 | 50 | 100) => void;
}

export function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctIndex;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Calculate final score
      const totalCorrect = correctCount + (isCorrect ? 1 : 0);
      const percentage = (totalCorrect / questions.length) * 100;
      
      let scorePercent: 0 | 50 | 100;
      if (percentage === 100) {
        scorePercent = 100;
      } else if (percentage >= 50) {
        scorePercent = 50;
      } else {
        scorePercent = 0;
      }

      setShowResult(true);
      setTimeout(() => {
        onComplete(scorePercent);
      }, 100);
    }
  };

  // Calculate final display score
  const getFinalScore = (): 0 | 50 | 100 => {
    const finalCorrect = correctCount + (isAnswered && isCorrect ? 1 : 0);
    const percentage = (finalCorrect / questions.length) * 100;
    if (percentage === 100) return 100;
    if (percentage >= 50) return 50;
    return 0;
  };

  if (showResult) {
    const finalScore = getFinalScore();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <KoreanCard className="text-center p-8">
          <h2 className="text-xl font-bold mb-4">{t.quiz.result}</h2>
          <div className={`text-7xl font-bold mb-4 ${finalScore === 100 ? 'text-primary' : 'text-foreground'}`}>
            {finalScore}%
          </div>
          <p className="text-muted-foreground mb-6">
            {t.quiz.yourScore}: {correctCount + (isAnswered && isCorrect ? 1 : 0)}/{questions.length}
          </p>
          <button
            onClick={() => onComplete(finalScore)}
            className="korean-btn-primary w-full"
          >
            {t.quiz.backToLessons}
          </button>
        </KoreanCard>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm font-medium">
        <span>
          {t.quiz.question} {currentIndex + 1} {t.quiz.of} {questions.length}
        </span>
        <span className="text-primary font-bold">
          {correctCount}/{currentIndex + (isAnswered ? 1 : 0)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <KoreanCard className="mb-6">
            <h3 className="text-lg font-semibold">
              {language === 'ru' ? currentQuestion.question : currentQuestion.questionKz}
            </h3>
          </KoreanCard>

          {/* Options */}
          <div className="space-y-3">
            {(language === 'ru' ? currentQuestion.options : currentQuestion.optionsKz).map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctIndex;
              
              let optionClass = 'korean-card transition-all cursor-pointer';
              
              if (isAnswered) {
                if (isCorrectOption) {
                  optionClass += ' border-foreground bg-primary/10';
                } else if (isSelected && !isCorrectOption) {
                  optionClass += ' border-foreground opacity-50';
                }
              } else if (isSelected) {
                optionClass += ' border-primary bg-primary/5';
              }

              return (
                <motion.div
                  key={index}
                  whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                  onClick={() => handleSelectAnswer(index)}
                  className={optionClass}
                >
                  <div className="flex items-center justify-between">
                    <span className={isAnswered && isCorrectOption ? 'font-semibold' : ''}>
                      {option}
                    </span>
                    {isAnswered && isCorrectOption && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <X className="w-5 h-5 text-foreground" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center font-bold text-lg ${isCorrect ? 'text-primary' : 'text-foreground'}`}
        >
          {isCorrect ? t.quiz.correct : t.quiz.incorrect}
        </motion.div>
      )}

      {/* Action button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={isAnswered ? handleNext : handleCheckAnswer}
        disabled={selectedAnswer === null && !isAnswered}
        className={`korean-btn-primary w-full ${selectedAnswer === null && !isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isAnswered 
          ? (currentIndex < questions.length - 1 ? t.quiz.nextQuestion : t.quiz.finish)
          : t.quiz.checkAnswer
        }
      </motion.button>
    </div>
  );
}

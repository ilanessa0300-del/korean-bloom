import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { KoreanCard } from '@/components/KoreanCard';
import { motion } from 'framer-motion';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { wordCardSets, koreanLetters } from '@/data/seedData';

type LessonCategory = 'hangul' | 'grammar' | 'words' | 'writing';

export default function LessonsPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { hangulProgress, grammarProgress } = useAppDataContext();
  const [activeCategory, setActiveCategory] = useState<LessonCategory>('hangul');

  const categories: { key: LessonCategory; label: string }[] = [
    { key: 'hangul', label: t.lessons.categories.hangul },
    { key: 'grammar', label: t.lessons.categories.grammar },
    { key: 'words', label: t.lessons.categories.words },
    { key: 'writing', label: t.lessons.categories.writing },
  ];

  const renderHangulPath = () => {
    // Create snake-like path for 11 lessons
    return (
      <div className="space-y-8 py-4">
        {hangulProgress.map((lesson, index) => {
          const isCompleted = lesson.testScorePercent !== null;
          const isLocked = lesson.isLocked;
          const row = Math.floor(index / 3);
          const isReversed = row % 2 === 1;
          
          // Calculate position for snake pattern
          let alignment = 'justify-start';
          const posInRow = index % 3;
          
          if (isReversed) {
            if (posInRow === 0) alignment = 'justify-end';
            else if (posInRow === 1) alignment = 'justify-center';
            else alignment = 'justify-start';
          } else {
            if (posInRow === 0) alignment = 'justify-start';
            else if (posInRow === 1) alignment = 'justify-center';
            else alignment = 'justify-end';
          }

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${alignment}`}
            >
              <motion.button
                whileHover={!isLocked ? { scale: 1.1 } : undefined}
                whileTap={!isLocked ? { scale: 0.95 } : undefined}
                onClick={() => !isLocked && navigate(`/lessons/hangul/${lesson.id}`)}
                className={`lesson-circle ${
                  isCompleted 
                    ? 'lesson-circle-completed' 
                    : isLocked 
                      ? 'lesson-circle-locked opacity-50' 
                      : 'lesson-circle-unlocked'
                }`}
                disabled={isLocked}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : isLocked ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderGrammarLevels = () => {
    const levels = [1, 2, 3, 4, 5, 6];

    return (
      <div className="space-y-4">
        {levels.map((level) => {
          const levelLessons = grammarProgress.filter(l => l.level === level);
          const completedCount = levelLessons.filter(l => l.testScorePercent !== null).length;
          const isLevelLocked = level > 1 && grammarProgress.filter(l => l.level === level - 1 && l.testScorePercent !== null).length < 5;

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: level * 0.1 }}
            >
              <KoreanCard
                onClick={() => !isLevelLocked && navigate(`/lessons/grammar/${level}`)}
                className={isLevelLocked ? 'opacity-50' : ''}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">
                      {t.lessons.level} {level}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {completedCount}/{levelLessons.length} {t.lessons.lesson}
                    </p>
                  </div>
                  {isLevelLocked ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-primary" />
                  )}
                </div>

                {/* Progress bar */}
                <div className="progress-bar mt-3">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${(completedCount / levelLessons.length) * 100}%` }}
                  />
                </div>
              </KoreanCard>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderWordsCategories = () => {
    return (
      <div className="grid grid-cols-2 gap-3">
        {wordCardSets.map((set, index) => (
          <motion.div
            key={set.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <KoreanCard
              onClick={() => navigate(`/lessons/words/${set.id}`)}
              className="h-full"
            >
              <h3 className="font-bold text-center">
                {language === 'ru' ? set.title : set.titleKz}
              </h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                {set.cards.length} карточек
              </p>
            </KoreanCard>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderWritingLetters = () => {
    const consonants = koreanLetters.filter(l => l.type === 'consonant');
    const vowels = koreanLetters.filter(l => l.type === 'vowel');

    return (
      <div className="space-y-6">
        {/* Consonants */}
        <div>
          <h3 className="font-bold mb-3">{t.writing.consonants}</h3>
          <div className="grid grid-cols-5 gap-2">
            {consonants.map((letter) => (
              <KoreanCard
                key={letter.id}
                onClick={() => navigate(`/lessons/writing/${letter.id}`)}
                className="aspect-square flex items-center justify-center p-0"
              >
                <span className="text-2xl font-bold text-primary">
                  {letter.character}
                </span>
              </KoreanCard>
            ))}
          </div>
        </div>

        {/* Vowels */}
        <div>
          <h3 className="font-bold mb-3">{t.writing.vowels}</h3>
          <div className="grid grid-cols-5 gap-2">
            {vowels.map((letter) => (
              <KoreanCard
                key={letter.id}
                onClick={() => navigate(`/lessons/writing/${letter.id}`)}
                className="aspect-square flex items-center justify-center p-0"
              >
                <span className="text-2xl font-bold text-primary">
                  {letter.character}
                </span>
              </KoreanCard>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppLayout title={t.lessons.title}>
      <div className="space-y-6">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap border-2 transition-colors ${
                activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-primary'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        {activeCategory === 'hangul' && renderHangulPath()}
        {activeCategory === 'grammar' && renderGrammarLevels()}
        {activeCategory === 'words' && renderWordsCategories()}
        {activeCategory === 'writing' && renderWritingLetters()}
      </div>
    </AppLayout>
  );
}

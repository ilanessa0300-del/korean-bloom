import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { KoreanCard } from '@/components/KoreanCard';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Check, ChevronRight } from 'lucide-react';

export default function GrammarLevelPage() {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { grammarProgress } = useAppDataContext();

  const levelNum = parseInt(level || '1');
  const levelLessons = grammarProgress.filter(l => l.level === levelNum);

  return (
    <AppLayout title={`${t.lessons.level} ${levelNum}`} showLanguageSwitcher={false}>
      <div className="space-y-4">
        {/* Back button */}
        <button
          onClick={() => navigate('/lessons')}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.common.back}
        </button>

        {/* Level test card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <KoreanCard className="bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary">{t.lessons.levelTest}</h3>
                <p className="text-sm text-muted-foreground">
                  Проверьте свои знания уровня {levelNum}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </KoreanCard>
        </motion.div>

        {/* Lessons list */}
        <div className="space-y-3">
          {levelLessons.map((lesson, index) => {
            const isCompleted = lesson.testScorePercent !== null;
            const isLocked = lesson.isLocked;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <KoreanCard
                  onClick={() => !isLocked && navigate(`/lessons/grammar/${levelNum}/${lesson.id}`)}
                  className={isLocked ? 'opacity-50' : ''}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isCompleted 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'border-primary'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-bold">{lesson.module}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {language === 'ru' ? lesson.title : lesson.titleKz}
                        </h4>
                        {isCompleted && (
                          <p className="text-xs text-primary">
                            {lesson.testScorePercent}%
                          </p>
                        )}
                      </div>
                    </div>
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </KoreanCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

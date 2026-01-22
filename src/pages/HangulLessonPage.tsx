import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { VideoPlayer } from '@/components/VideoPlayer';
import { QuizComponent } from '@/components/QuizComponent';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';

export default function HangulLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { hangulProgress, completeLesson } = useAppDataContext();
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  const lesson = hangulProgress.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <AppLayout title={t.lessons.title}>
        <p>Урок не найден</p>
      </AppLayout>
    );
  }

  const handleQuizComplete = (score: 0 | 50 | 100) => {
    completeLesson(
      lesson.id, 
      'hangul', 
      score, 
      language === 'ru' ? lesson.title : lesson.titleKz
    );
    navigate('/lessons');
  };

  if (showQuiz) {
    return (
      <AppLayout title={t.lessons.startTest} showLanguageSwitcher={false}>
        <button
          onClick={() => setShowQuiz(false)}
          className="flex items-center gap-2 text-sm mb-4 text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.common.back}
        </button>
        
        <QuizComponent
          questions={lesson.questions}
          onComplete={handleQuizComplete}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout title={language === 'ru' ? lesson.title : lesson.titleKz} showLanguageSwitcher={false}>
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={() => navigate('/lessons')}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.common.back}
        </button>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <VideoPlayer
            src={lesson.videoUrl}
            onComplete={() => setVideoWatched(true)}
          />
        </motion.div>

        {/* Lesson info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold">
            {language === 'ru' ? lesson.title : lesson.titleKz}
          </h2>
          {lesson.testScorePercent !== null && (
            <p className="text-primary font-semibold mt-2">
              {t.quiz.yourScore}: {lesson.testScorePercent}%
            </p>
          )}
        </motion.div>

        {/* Start test button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQuiz(true)}
            className="korean-btn-primary w-full flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            {t.lessons.startTest}
          </motion.button>
        </motion.div>
      </div>
    </AppLayout>
  );
}

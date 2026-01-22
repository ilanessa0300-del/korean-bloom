import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { WritingCanvas } from '@/components/WritingCanvas';
import { koreanLetters } from '@/data/seedData';
import { ArrowLeft } from 'lucide-react';

export default function WritingPracticePage() {
  const { letterId } = useParams<{ letterId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { addActivity } = useAppDataContext();

  const letter = koreanLetters.find(l => l.id === letterId);

  if (!letter) {
    return (
      <AppLayout title={t.writing.title}>
        <p>Буква не найдена</p>
      </AppLayout>
    );
  }

  const handleComplete = () => {
    addActivity({
      type: 'writing',
      title: `${language === 'ru' ? letter.name : letter.nameKz} (${letter.character})`,
      points: 10,
    });
  };

  return (
    <AppLayout 
      title={`${t.writing.practice}: ${letter.character}`} 
      showLanguageSwitcher={false}
    >
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={() => navigate('/lessons')}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.common.back}
        </button>

        {/* Writing canvas */}
        <WritingCanvas
          letter={letter}
          onComplete={handleComplete}
        />
      </div>
    </AppLayout>
  );
}

import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { FlipCardDeck } from '@/components/FlipCard';
import { wordCardSets } from '@/data/seedData';
import { ArrowLeft } from 'lucide-react';

export default function WordCardsPage() {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { incrementWordsLearned, addActivity } = useAppDataContext();

  const cardSet = wordCardSets.find(s => s.id === setId);

  if (!cardSet) {
    return (
      <AppLayout title={t.lessons.categories.words}>
        <p>Набор карточек не найден</p>
      </AppLayout>
    );
  }

  const handleComplete = () => {
    incrementWordsLearned(cardSet.cards.length);
    addActivity({
      type: 'words',
      title: language === 'ru' ? cardSet.title : cardSet.titleKz,
      points: cardSet.cards.length * 5,
    });
    navigate('/lessons');
  };

  return (
    <AppLayout 
      title={language === 'ru' ? cardSet.title : cardSet.titleKz} 
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

        {/* Card deck */}
        <FlipCardDeck
          cards={cardSet.cards}
          onComplete={handleComplete}
        />
      </div>
    </AppLayout>
  );
}

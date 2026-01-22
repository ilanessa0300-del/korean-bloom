import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-lg border-2 border-primary p-1">
      <motion.button
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
          language === 'ru'
            ? 'bg-primary text-primary-foreground'
            : 'bg-transparent text-foreground hover:bg-primary/10'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        RU
      </motion.button>
      <motion.button
        onClick={() => setLanguage('kz')}
        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
          language === 'kz'
            ? 'bg-primary text-primary-foreground'
            : 'bg-transparent text-foreground hover:bg-primary/10'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        KZ
      </motion.button>
    </div>
  );
}

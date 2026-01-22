import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { KoreanCard } from '@/components/KoreanCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Star, Clock, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const { userStats } = useAppDataContext();

  const stats = [
    {
      icon: BookOpen,
      value: userStats.lessonsCompleted,
      label: t.home.lessonsCompleted,
    },
    {
      icon: Flame,
      value: userStats.streakDays,
      label: t.home.streakDays,
    },
    {
      icon: Star,
      value: userStats.points,
      label: t.home.points,
    },
    {
      icon: Clock,
      value: userStats.totalStudyMinutes,
      label: t.home.studyMinutes,
    },
  ];

  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} мин. назад`;
    if (diffHours < 24) return `${diffHours} ч. назад`;
    return `${diffDays} дн. назад`;
  };

  return (
    <AppLayout title={t.home.title}>
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <h2 className="text-2xl font-bold">{t.home.title}</h2>
          <p className="text-muted-foreground">{t.home.subtitle}</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <KoreanCard className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </KoreanCard>
              </motion.div>
            );
          })}
        </div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-3">{t.home.recentActivity}</h3>
          <KoreanCard>
            {userStats.recentActivity.length > 0 ? (
              <div className="space-y-3">
                {userStats.recentActivity.slice(0, 5).map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex items-center justify-between ${
                      index < userStats.recentActivity.slice(0, 5).length - 1 
                        ? 'border-b border-primary/20 pb-3' 
                        : ''
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatActivityTime(activity.timestamp)}
                      </p>
                    </div>
                    <span className="text-primary font-bold text-sm">
                      +{activity.points}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                {t.home.noActivity}
              </p>
            )}
          </KoreanCard>
        </motion.div>

        {/* Start learning button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/lessons">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="korean-btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
            >
              {t.home.startLearning}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </AppLayout>
  );
}

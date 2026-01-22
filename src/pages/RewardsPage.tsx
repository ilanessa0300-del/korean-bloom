import { useLanguage } from '@/i18n/LanguageContext';
import { useAppDataContext } from '@/contexts/AppDataContext';
import { AppLayout } from '@/components/AppLayout';
import { KoreanCard } from '@/components/KoreanCard';
import { motion } from 'framer-motion';
import { Flame, Star, Lock, Trophy } from 'lucide-react';

export default function RewardsPage() {
  const { t, language } = useLanguage();
  const { userStats, achievements } = useAppDataContext();

  return (
    <AppLayout title={t.rewards.title}>
      <div className="space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <KoreanCard className="text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{userStats.streakDays}</p>
              <p className="text-sm text-muted-foreground">{t.rewards.currentStreak}</p>
            </KoreanCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <KoreanCard className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{userStats.points}</p>
              <p className="text-sm text-muted-foreground">{t.rewards.totalPoints}</p>
            </KoreanCard>
          </motion.div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xl font-bold mb-4">{t.rewards.achievements}</h2>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const progress = Math.min(
                (achievement.progressValue / achievement.goalValue) * 100,
                100
              );

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <KoreanCard className={achievement.isUnlocked ? 'bg-primary/5' : ''}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        achievement.isUnlocked 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'border-primary/30'
                      }`}>
                        {achievement.isUnlocked ? (
                          <Trophy className="w-6 h-6" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold">
                          {language === 'ru' ? achievement.title : achievement.titleKz}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ru' ? achievement.description : achievement.descriptionKz}
                        </p>

                        {/* Progress bar */}
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{t.rewards.progress}</span>
                            <span className="font-bold">
                              {achievement.progressValue}/{achievement.goalValue}
                            </span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-bar-fill"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {achievement.isUnlocked && (
                          <p className="text-xs text-primary font-bold mt-2">
                            {t.rewards.unlocked}
                          </p>
                        )}
                      </div>
                    </div>
                  </KoreanCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

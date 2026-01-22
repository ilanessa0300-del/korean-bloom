import { useState, useEffect, useCallback } from 'react';
import { UserStats, CalendarEntry, Achievement, Lesson, ActivityEntry } from '@/types';
import { 
  hangulLessons, 
  grammarLessons, 
  initialAchievements, 
  initialUserStats 
} from '@/data/seedData';

const STORAGE_KEYS = {
  USER_STATS: 'korean-app-user-stats',
  CALENDAR: 'korean-app-calendar',
  ACHIEVEMENTS: 'korean-app-achievements',
  HANGUL_LESSONS: 'korean-app-hangul-lessons',
  GRAMMAR_LESSONS: 'korean-app-grammar-lessons',
};

// Helper to get today's date as string
const getTodayString = () => new Date().toISOString().split('T')[0];

export function useAppData() {
  // User stats
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    return saved ? JSON.parse(saved) : initialUserStats;
  });

  // Calendar entries
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CALENDAR);
    return saved ? JSON.parse(saved) : [];
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  // Hangul lessons progress
  const [hangulProgress, setHangulProgress] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HANGUL_LESSONS);
    return saved ? JSON.parse(saved) : hangulLessons;
  });

  // Grammar lessons progress
  const [grammarProgress, setGrammarProgress] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GRAMMAR_LESSONS);
    return saved ? JSON.parse(saved) : grammarLessons;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendarEntries));
  }, [calendarEntries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HANGUL_LESSONS, JSON.stringify(hangulProgress));
  }, [hangulProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GRAMMAR_LESSONS, JSON.stringify(grammarProgress));
  }, [grammarProgress]);

  // Check and update streak
  const updateStreak = useCallback(() => {
    const today = getTodayString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    setUserStats(prev => {
      if (prev.lastActiveDate === today) {
        return prev; // Already updated today
      }
      
      let newStreak = prev.streakDays;
      if (prev.lastActiveDate === yesterdayString) {
        newStreak = prev.streakDays + 1;
      } else if (prev.lastActiveDate !== today) {
        newStreak = 1; // Reset streak
      }

      return {
        ...prev,
        streakDays: newStreak,
        lastActiveDate: today,
      };
    });

    // Update streak achievements
    updateAchievementProgress('week-streak', userStats.streakDays);
    updateAchievementProgress('two-weeks-streak', userStats.streakDays);
    updateAchievementProgress('month-streak', userStats.streakDays);
    updateAchievementProgress('thousand-days', userStats.streakDays);
  }, [userStats.streakDays]);

  // Add activity entry
  const addActivity = useCallback((entry: Omit<ActivityEntry, 'id' | 'timestamp'>) => {
    const newEntry: ActivityEntry = {
      ...entry,
      id: `activity-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setUserStats(prev => ({
      ...prev,
      recentActivity: [newEntry, ...prev.recentActivity].slice(0, 10),
      points: prev.points + entry.points,
    }));

    // Update calendar
    updateCalendarEntry(1, 5, entry.points);
  }, []);

  // Complete lesson
  const completeLesson = useCallback((
    lessonId: string, 
    category: 'hangul' | 'grammar',
    score: 0 | 50 | 100,
    title: string
  ) => {
    updateStreak();

    const pointsEarned = score === 100 ? 100 : score === 50 ? 50 : 10;

    // Update lesson progress
    if (category === 'hangul') {
      setHangulProgress(prev => {
        const updated = prev.map((lesson, index) => {
          if (lesson.id === lessonId) {
            return { ...lesson, testScorePercent: score, isLocked: false };
          }
          // Unlock next lesson if current is completed with 50%+
          if (index > 0 && prev[index - 1].id === lessonId && score >= 50) {
            return { ...lesson, isLocked: false };
          }
          return lesson;
        });
        return updated;
      });

      // Check hangul master achievement
      const completedHangul = hangulProgress.filter(l => l.testScorePercent !== null).length + 1;
      updateAchievementProgress('hangul-master', completedHangul);
    } else {
      setGrammarProgress(prev => {
        const updated = prev.map((lesson, index) => {
          if (lesson.id === lessonId) {
            return { ...lesson, testScorePercent: score, isLocked: false };
          }
          // Unlock next lesson in same level
          const lessonIndex = prev.findIndex(l => l.id === lessonId);
          if (index === lessonIndex + 1 && prev[lessonIndex].level === lesson.level && score >= 50) {
            return { ...lesson, isLocked: false };
          }
          return lesson;
        });
        return updated;
      });
    }

    // Update stats
    setUserStats(prev => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted + 1,
      points: prev.points + pointsEarned,
      totalStudyMinutes: prev.totalStudyMinutes + 10,
    }));

    // Add activity
    addActivity({
      type: 'lesson',
      title,
      points: pointsEarned,
    });

    // Update first lesson achievement
    updateAchievementProgress('first-lesson', 1);
  }, [updateStreak, addActivity, hangulProgress]);

  // Update calendar entry
  const updateCalendarEntry = useCallback((
    lessonsCount: number,
    minutes: number,
    points: number
  ) => {
    const today = getTodayString();
    
    setCalendarEntries(prev => {
      const existingIndex = prev.findIndex(e => e.date === today);
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          lessonsCount: updated[existingIndex].lessonsCount + lessonsCount,
          minutes: updated[existingIndex].minutes + minutes,
          points: updated[existingIndex].points + points,
        };
        return updated;
      }

      return [...prev, { date: today, lessonsCount, minutes, points }];
    });
  }, []);

  // Update achievement progress
  const updateAchievementProgress = useCallback((achievementId: string, value: number) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId) {
        const newProgress = Math.max(achievement.progressValue, value);
        return {
          ...achievement,
          progressValue: newProgress,
          isUnlocked: newProgress >= achievement.goalValue,
        };
      }
      return achievement;
    }));
  }, []);

  // Increment words learned
  const incrementWordsLearned = useCallback((count: number = 1) => {
    setUserStats(prev => {
      const newCount = prev.wordsLearned + count;
      
      // Update word achievements
      updateAchievementProgress('words-10', newCount);
      updateAchievementProgress('words-50', newCount);
      updateAchievementProgress('words-100', newCount);

      return {
        ...prev,
        wordsLearned: newCount,
      };
    });
  }, [updateAchievementProgress]);

  // Get calendar entry for a specific date
  const getCalendarEntry = useCallback((date: string): CalendarEntry | undefined => {
    return calendarEntries.find(e => e.date === date);
  }, [calendarEntries]);

  return {
    userStats,
    calendarEntries,
    achievements,
    hangulProgress,
    grammarProgress,
    completeLesson,
    addActivity,
    updateAchievementProgress,
    incrementWordsLearned,
    getCalendarEntry,
    updateStreak,
  };
}

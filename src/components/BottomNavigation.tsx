import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Home, BookOpen, Calendar, Award, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, labelKey: 'home' as const },
  { path: '/lessons', icon: BookOpen, labelKey: 'lessons' as const },
  { path: '/calendar', icon: Calendar, labelKey: 'calendar' as const },
  { path: '/rewards', icon: Award, labelKey: 'rewards' as const },
  { path: '/help', icon: HelpCircle, labelKey: 'help' as const },
];

export function BottomNavigation() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-primary safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-tab ${isActive ? 'nav-tab-active' : 'nav-tab-inactive'}`}
            >
              <motion.div
                initial={false}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className="text-[10px] font-medium">
                {t.nav[item.labelKey]}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

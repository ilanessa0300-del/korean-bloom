import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';
import { LanguageSwitcher } from './LanguageSwitcher';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showLanguageSwitcher?: boolean;
}

export function AppLayout({ children, title, showLanguageSwitcher = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b-2 border-primary">
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇰🇷</span>
            {title && (
              <h1 className="text-lg font-bold text-foreground">{title}</h1>
            )}
          </div>
          {showLanguageSwitcher && <LanguageSwitcher />}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto safe-bottom">
        <div className="max-w-lg mx-auto px-4 py-4">
          {children}
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
}

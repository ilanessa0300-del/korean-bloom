import React, { createContext, useContext, ReactNode } from 'react';
import { useAppData } from '@/hooks/useAppData';

type AppDataContextType = ReturnType<typeof useAppData>;

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const appData = useAppData();

  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppDataContext() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppDataContext must be used within AppDataProvider');
  }
  return context;
}

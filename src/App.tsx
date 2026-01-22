import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AppDataProvider } from "@/contexts/AppDataContext";

import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import HangulLessonPage from "./pages/HangulLessonPage";
import GrammarLevelPage from "./pages/GrammarLevelPage";
import GrammarLessonPage from "./pages/GrammarLessonPage";
import WordCardsPage from "./pages/WordCardsPage";
import WritingPracticePage from "./pages/WritingPracticePage";
import CalendarPage from "./pages/CalendarPage";
import RewardsPage from "./pages/RewardsPage";
import HelpPage from "./pages/HelpPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AppDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/lessons/hangul/:lessonId" element={<HangulLessonPage />} />
              <Route path="/lessons/grammar/:level" element={<GrammarLevelPage />} />
              <Route path="/lessons/grammar/:level/:lessonId" element={<GrammarLessonPage />} />
              <Route path="/lessons/words/:setId" element={<WordCardsPage />} />
              <Route path="/lessons/writing/:letterId" element={<WritingPracticePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppDataProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

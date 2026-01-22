import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { AppLayout } from '@/components/AppLayout';
import { KoreanCard } from '@/components/KoreanCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Send, Check } from 'lucide-react';

export default function HelpPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const faqs = [
    { id: 'howToStart', ...t.help.questions.howToStart },
    { id: 'howCalendar', ...t.help.questions.howCalendar },
    { id: 'howProgress', ...t.help.questions.howProgress },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setFormSent(false);
    }, 3000);
  };

  return (
    <AppLayout title={t.help.title}>
      <div className="space-y-6">
        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">{t.help.faq}</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <KoreanCard 
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold pr-4">{faq.q}</h3>
                    {openFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>

                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground mt-3 pt-3 border-t border-primary/20">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </KoreanCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">{t.help.support}</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <KoreanCard>
              <AnimatePresence mode="wait">
                {formSent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {t.help.contactForm.sent}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.help.contactForm.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.help.contactForm.namePlaceholder}
                        className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.help.contactForm.email}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.help.contactForm.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.help.contactForm.message}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.help.contactForm.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="korean-btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {t.help.contactForm.send}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </KoreanCard>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

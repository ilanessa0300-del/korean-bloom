import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KoreanLetter } from '@/types';
import { KoreanCard } from './KoreanCard';
import { motion } from 'framer-motion';
import { Eraser, Check } from 'lucide-react';

interface WritingCanvasProps {
  letter: KoreanLetter;
  onComplete?: () => void;
}

export function WritingCanvas({ letter, onComplete }: WritingCanvasProps) {
  const { t, language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set drawing style
    ctx.strokeStyle = '#7C3AED';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    setIsChecked(false);

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setIsChecked(false);
  };

  const handleCheck = () => {
    setIsChecked(true);
    onComplete?.();
  };

  return (
    <div className="space-y-6">
      {/* Example */}
      <KoreanCard className="text-center">
        <p className="text-sm text-muted-foreground mb-2">{t.writing.example}</p>
        <p className="text-8xl font-bold text-primary">{letter.character}</p>
        <p className="text-lg mt-2">
          {language === 'ru' ? letter.name : letter.nameKz} [{letter.romanization}]
        </p>
      </KoreanCard>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="writing-canvas w-full h-64"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {/* Guide character (faded) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <span className="text-[150px] font-bold text-foreground">{letter.character}</span>
        </div>
      </div>

      {/* Feedback */}
      {isChecked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg font-bold text-primary">{t.writing.wellDone}</p>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={clearCanvas}
          className="flex-1 korean-btn-outline flex items-center justify-center gap-2"
        >
          <Eraser className="w-4 h-4" />
          {t.writing.clear}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCheck}
          disabled={!hasDrawn}
          className={`flex-1 korean-btn-primary flex items-center justify-center gap-2 ${!hasDrawn ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Check className="w-4 h-4" />
          {t.writing.check}
        </motion.button>
      </div>
    </div>
  );
}

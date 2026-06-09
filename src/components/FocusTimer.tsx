import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Clock, Volume2, VolumeX, Sparkles, Coffee } from 'lucide-react';

interface FocusTimerProps {
  defaultMinutes?: number;
  onTimerComplete?: () => void;
  activeTaskTitle?: string;
}

export default function FocusTimer({ defaultMinutes = 20, onTimerComplete, activeTaskTitle }: FocusTimerProps) {
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMinutes(defaultMinutes);
    setSeconds(0);
    setIsActive(false);
  }, [defaultMinutes, activeTaskTitle]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            triggerCompletion();
          } else {
            setMinutes(prev => prev - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, minutes, seconds]);

  const triggerCompletion = () => {
    setIsActive(false);
    if (soundEnabled) {
      playZenChime();
    }
    if (onTimerComplete) {
      onTimerComplete();
    }
  };

  const playZenChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Synthesize a beautiful, clean triple-note high chime (zen bell vibe)
      const playNote = (time: number, freq: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.4, time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.start(time);
        osc.stop(time + duration);
      };

      const now = ctx.currentTime;
      playNote(now, 523.25, 1.5);      // C5 Note
      playNote(now + 0.25, 659.25, 1.5); // E5 Note
      playNote(now + 0.5, 783.99, 2.0);  // G5 Note
    } catch (e) {
      console.warn("Audio context failed to initialize or triggered on non-user interact.", e);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(defaultMinutes);
    setSeconds(0);
  };

  const adjustTime = (amount: number) => {
    const newMinutes = Math.max(1, minutes + amount);
    setMinutes(newMinutes);
  };

  const formatZero = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <motion.div
      id="focus-timer-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs relative overflow-hidden"
    >
      {/* Absolute Decorative Sparkle */}
      <div className="absolute top-0 right-0 p-3 bg-primary-100 text-primary-500 rounded-bl-3xl">
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-primary-100 rounded-xl text-primary-500">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 font-arabic text-right lg:text-left text-sm md:text-base">
            مؤقت التركيز المسائي
          </h3>
          <p className="text-xs text-slate-500">Focus Assistant for Skincare & Reflection</p>
        </div>
      </div>

      {activeTaskTitle && (
        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 mb-5 text-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary-500 block">
            المهمة النشطة حالياً • CURRENT TASK
          </span>
          <span className="text-sm font-semibold text-slate-700 font-arabic mt-1 block">
            {activeTaskTitle}
          </span>
        </div>
      )}

      {/* Main Timer Display */}
      <div className="flex flex-col items-center py-4">
        <div className="flex items-baseline font-mono text-5xl md:text-6xl font-bold tracking-tight text-slate-800">
          <span>{formatZero(minutes)}</span>
          <span className="text-primary-500 px-1 animate-pulse">:</span>
          <span>{formatZero(seconds)}</span>
        </div>

        {/* Time adjustment controls */}
        <div className="flex gap-4 mt-3">
          <button
            id="timer-minus"
            onClick={() => adjustTime(-5)}
            disabled={isActive}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition disabled:opacity-40"
          >
            -5 Min
          </button>
          <button
            id="timer-plus"
            onClick={() => adjustTime(5)}
            disabled={isActive}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition disabled:opacity-40"
          >
            +5 Min
          </button>
        </div>
      </div>

      {/* Buttons Controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-3">
        <button
          id="toggle-chime"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2.5 rounded-xl transition ${
            soundEnabled ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-100/50 text-slate-400'
          }`}
          title={soundEnabled ? 'Sound Enabled / رنين مفعّل' : 'Sound Muted / مكتوم'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        <div className="flex gap-2">
          <button
            id="timer-reset"
            onClick={resetTimer}
            className="p-2.5 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            title="Reset Timer / إعادة ضبط"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            id="timer-start-pause"
            onClick={toggleTimer}
            className={`px-5 py-2.5 rounded-xl text-white font-medium flex items-center gap-2 shadow-sm transition transform hover:scale-[1.02] active:scale-[0.98] ${
              isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>إيقاف مؤقت</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>ابدأ الآن</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

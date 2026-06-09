import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, Sparkles, Home, Heart, ListTodo, Smile, 
  Moon, Coffee, User, Calendar, BookOpen, ExternalLink, CheckCircle 
} from 'lucide-react';

import { RoutineStep, ShoppingItem, DayLog } from './types';
import { INITIAL_ROUTINE_STEPS, INITIAL_SHOPPING_ITEMS } from './data';

import TimelineSection from './components/TimelineSection';
import FocusTimer from './components/FocusTimer';
import ShoppingSection from './components/ShoppingSection';
import SuiviSection from './components/SuiviSection';
import GuidesSection from './components/GuidesSection';

export default function App() {
  // State initialization with localStorage persistence
  const [steps, setSteps] = useState<RoutineStep[]>(() => {
    const saved = localStorage.getItem('local_evening_routine_steps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ROUTINE_STEPS;
  });

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('local_evening_shopping_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SHOPPING_ITEMS;
  });

  const [logs, setLogs] = useState<DayLog[]>(() => {
    const saved = localStorage.getItem('local_evening_suivi_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [activeStepId, setActiveStepId] = useState<string | null>('step_1');
  const [time, setTime] = useState(new Date());
  
  // Save state on updates
  useEffect(() => {
    localStorage.setItem('local_evening_routine_steps', JSON.stringify(steps));
  }, [steps]);

  useEffect(() => {
    localStorage.setItem('local_evening_shopping_items', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    localStorage.setItem('local_evening_suivi_logs', JSON.stringify(logs));
  }, [logs]);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute countdown to 20:00 (8:00 PM)
  const getArrivalCountdown = () => {
    const now = time;
    const target = new Date();
    target.setHours(20, 0, 0, 0);

    const diffMs = target.getTime() - now.getTime();
    if (diffMs <= 0) {
      return null; // Past 20:00 already
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
  };

  const countdown = getArrivalCountdown();

  // Helper actions for routine list
  const handleToggleStep = (stepId: string) => {
    setSteps(prev =>
      prev.map(step => {
        if (step.id === stepId) {
          const newCompleted = !step.completed;
          // Toggle all child items too
          const updatedItems = step.items.map(itm => ({ ...itm, completed: newCompleted }));
          return { ...step, completed: newCompleted, items: updatedItems };
        }
        return step;
      })
    );
  };

  const handleToggleSubitem = (stepId: string, subitemId: string) => {
    setSteps(prev =>
      prev.map(step => {
        if (step.id === stepId) {
          const updatedItems = step.items.map(itm => {
            if (itm.id === subitemId) return { ...itm, completed: !itm.completed };
            return itm;
          });
          const allCompleted = updatedItems.every(itm => itm.completed);
          return { ...step, items: updatedItems, completed: allCompleted };
        }
        return step;
      })
    );
  };

  const handleUpdateStepNotes = (stepId: string, text: string) => {
    setSteps(prev =>
      prev.map(step => {
        if (step.id === stepId) return { ...step, notes: text };
        return step;
      })
    );
  };

  // Helper actions for shopping list
  const handleToggleShoppingItem = (id: string) => {
    setShoppingItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddShoppingItem = (nameAr: string, nameEn: string, estPrice: string) => {
    const newItem: ShoppingItem = {
      id: `shop_${Date.now()}`,
      nameAr,
      nameEn,
      priceEstimate: estPrice,
      completed: false,
      icon: 'Candy'
    };
    setShoppingItems(prev => [...prev, newItem]);
  };

  const handleDeleteShoppingItem = (id: string) => {
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };

  // Helper actions for follow-up logs (suivi tracker)
  const handleAddLog = (mood: string, note: string, achievements: string[]) => {
    const newLog: DayLog = {
      id: `log_${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      mood,
      suiviNote: note,
      achievements
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  };

  const handleResetEntireDay = () => {
    if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط تقدّم اليوم الحالي لجميـع العناصر؟')) {
      setSteps(prev =>
        prev.map(step => ({
          ...step,
          completed: false,
          items: step.items.map(i => ({ ...i, completed: false })),
          notes: ''
        }))
      );
      setShoppingItems(prev => prev.map(i => ({ ...i, completed: false })));
      alert('تم إعادة ضبط تقدّم روتينك المسائي بنجاح! ليلة جديدة موفقة ✨');
    }
  };

  // Calculations for dashboard
  const getTotalSubitems = () => {
    return steps.reduce((acc, step) => acc + step.items.length, 0);
  };

  const getCompletedSubitemsCount = () => {
    return steps.reduce((acc, step) => {
      const doneForStep = step.items.filter((i) => i.completed).length;
      return acc + doneForStep;
    }, 0);
  };

  const totalSubitemsCount = getTotalSubitems();
  const completedSubitemsCount = getCompletedSubitemsCount();
  const progressRatio = totalSubitemsCount > 0 ? (completedSubitemsCount / totalSubitemsCount) * 100 : 0;

  // Find active step for FocusTimer reference
  const currentActiveStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 antialiased font-sans">
      
      {/* Upper Soft Sunset Banner */}
      <div className="w-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-slate text-white py-12 px-4 shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative background shapes */}
        <div className="absolute top-[-50%] left-[-10%] w-[450px] h-[450px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40%] right-[-5%] w-[350px] h-[350px] bg-primary-100/[0.06] rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 h-full z-10 relative">
          
          <div className="text-right md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border border-white/10">
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-arabic font-semibold uppercase tracking-wide">البرنامج المنزلي المسائي المتكامل</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold font-arabic tracking-tight mb-2">
              منظم الروتين المسائي المتكامل
            </h1>
            <p className="text-sm md:text-base text-primary-100/90 max-w-xl font-arabic font-medium leading-relaxed">
              تحليل شامل لصفحة جدول مهامك اليومية، مرتبة زمنياً وبدقة لتبدأ فور وصولك للمنزل على الساعة <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded font-bold">20:00</span> مساءً.
            </p>
          </div>

          {/* Current Real-time Clock Widget */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/15 p-5 rounded-3xl shrink-0 flex flex-col items-center justify-center text-center min-w-[200px] hover:border-white/30 transition shadow-inner">
            <span className="text-[10px] text-primary-100 uppercase tracking-widest font-bold block mb-1">
              الساعة الآن • LIVE CLOCK
            </span>
            <div className="font-mono text-3xl font-extrabold tracking-tight">
              {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
            <span className="text-[11px] font-semibold text-slate-200 mt-2 font-arabic bg-slate-950/20 px-2.5 py-1 rounded-full">
              {time.toLocaleDateString('ar-EG', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>

        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Welcome & Countdown alert band */}
        <div className="mb-6">
          {countdown ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl animate-pulse">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold font-arabic text-sm">متبقي على وصولك المتوقع للمنزل (20:00)</h4>
                  <p className="text-xs text-amber-700 font-arabic mt-0.5">استعد لتعديل حالتك المزاجية والاستمتاع بعناية متألقة وجلسة دافئة مع الوالد.</p>
                </div>
              </div>
              <div className="flex items-baseline gap-1 font-mono text-lg font-bold bg-white text-amber-800 px-4 py-1.5 border border-amber-200/50 rounded-xl shadow-3xs">
                <span>{countdown.hours}h</span>
                <span className="animate-pulse">:</span>
                <span>{countdown.minutes}m</span>
                <span className="animate-pulse">:</span>
                <span>{countdown.seconds}s</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold font-arabic text-sm">مرحباً بك في البيت! أنت الآن رهن فترة العناية الهادئة</h4>
                  <p className="text-xs text-emerald-700 font-arabic mt-0.5">حان الوقت لإراحة تامة وتفعيل خطوات العناية والروتين المقترح.</p>
                </div>
              </div>
              <span className="px-3.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full font-arabic">
                البرنامج نشط 🟢 Active
              </span>
            </motion.div>
          )}
        </div>

        {/* Global Dashboard Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">إجمالي إنجاز المهام</span>
              <span className="text-lg font-extrabold text-slate-800 font-mono mt-0.5 block">
                {Math.round(progressRatio)}%
              </span>
            </div>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
              <ListTodo className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">الخطوات المنقضية</span>
              <span className="text-lg font-extrabold text-slate-800 font-mono mt-0.5 block">
                {completedSubitemsCount} <span className="text-slate-400 font-sans text-xs">من {totalSubitemsCount}</span>
              </span>
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">مكافآت السويت المتبقية</span>
              <span className="text-lg font-extrabold text-slate-800 font-mono mt-0.5 block">
                {shoppingItems.filter(i => !i.completed).length} <span className="text-slate-400 font-sans text-xs">أغراض للشراء</span>
              </span>
            </div>
            <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Dynamic App Layout Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SECTION (Routine Timeline) - 7 Columns on Large screen */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
                <div className="text-right">
                  <h2 className="text-lg font-bold text-slate-800 font-arabic flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-500 inline-block" />
                    تفاصيل الروتين التسلسلي المنظم
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Sequential evening steps organized from 20:00 to 22:45</p>
                </div>

                <button
                  id="btn-global-reset"
                  onClick={handleResetEntireDay}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition border border-dashed border-slate-200"
                  title="إعادة تصفير تقدم اليوم الحالي"
                >
                  إعادة ضبط اليوم 🔄
                </button>
              </div>

              {/* Timeline Child Item */}
              <TimelineSection
                steps={steps}
                onToggleStep={handleToggleStep}
                onToggleSubitem={handleToggleSubitem}
                onUpdateStepNotes={handleUpdateStepNotes}
                activeStepId={activeStepId}
                setActiveStepId={setActiveStepId}
              />
            </div>
          </div>

          {/* RIGHT SECTION (Helpers: Timer, Shopping, Guides) - 5 Columns */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Evening focus assistant Timer */}
            <FocusTimer
              defaultMinutes={currentActiveStep?.durationMinutes || 20}
              activeTaskTitle={currentActiveStep ? currentActiveStep.titleAr : undefined}
            />

            {/* 2. Buy Items List (Sweet treats, Ramen, etc) */}
            <ShoppingSection
              items={shoppingItems}
              onToggleItem={handleToggleShoppingItem}
              onAddItem={handleAddShoppingItem}
              onDeleteItem={handleDeleteShoppingItem}
            />

            {/* 3. Pre-mapped Guides hub (Wassafat + Posture + AI) */}
            <GuidesSection />

          </div>

        </div>

        {/* FULL WIDTH LOWER SECTION: Daily Suivi Logger */}
        <div className="mt-8">
          <SuiviSection
            logs={logs}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
            completedTasksCount={completedSubitemsCount}
            totalTasksCount={totalSubitemsCount}
          />
        </div>

      </div>

      {/* Humble Footer */}
      <footer className="mt-16 text-center border-t border-slate-100 pt-8 max-w-6xl mx-auto px-4 text-xs text-slate-400">
        <p className="font-arabic font-medium mb-1">
          💖 تم تصميمه بعناية فائقة لتنظيم يومك وراحتك الفسيولوجية والبدنية. ليلة سعيدة وهادئة!
        </p>
        <p className="font-mono">
          Suivi System &copy; {new Date().getFullYear()} • Offline Local Storage Mode Secured
        </p>
      </footer>

    </div>
  );
}

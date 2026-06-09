import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Laptop, Compass, Sparkles, Heart, Smile, 
  Check, CheckSquare, Clock, BookOpen, ChevronDown, ChevronUp, MessageSquare 
} from 'lucide-react';
import { RoutineStep } from '../types';

interface TimelineSectionProps {
  steps: RoutineStep[];
  onToggleStep: (stepId: string) => void;
  onToggleSubitem: (stepId: string, subitemId: string) => void;
  onUpdateStepNotes: (stepId: string, text: string) => void;
  activeStepId: string | null;
  setActiveStepId: (id: string | null) => void;
}

const ICON_MAP: Record<string, any> = {
  Home: Home,
  Laptop: Laptop,
  Compass: Compass,
  Sparkles: Sparkles,
  Heart: Heart,
  Smile: Smile
};

export default function TimelineSection({
  steps,
  onToggleStep,
  onToggleSubitem,
  onUpdateStepNotes,
  activeStepId,
  setActiveStepId
}: TimelineSectionProps) {
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  const renderIcon = (iconName: string, category: string) => {
    const IconComponent = ICON_MAP[iconName] || Clock;
    
    // Choose theme colors based on category
    let bg = 'bg-primary-50 text-primary-500 border-primary-100';
    if (category === 'work') bg = 'bg-indigo-50 text-indigo-500 border-indigo-100';
    if (category === 'mindfulness') bg = 'bg-cyan-50 text-cyan-600 border-cyan-100';
    if (category === 'wellness') bg = 'bg-amber-50 text-amber-500 border-amber-100';
    if (category === 'nightcare') bg = 'bg-rose-50 text-rose-500 border-rose-100';
    if (category === 'leisure') bg = 'bg-emerald-50 text-emerald-500 border-emerald-100';

    return (
      <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-transform shrink-0 ${bg}`}>
        <IconComponent className="w-5 h-5" />
      </div>
    );
  };

  const getPercentage = (step: RoutineStep) => {
    if (step.items.length === 0) return 0;
    const completedCount = step.items.filter((itm) => itm.completed).length;
    return Math.round((completedCount / step.items.length) * 100);
  };

  const handleNotesEditStart = (stepId: string, currentNotes: string) => {
    setEditingNotesId(stepId);
    setTempNotes(currentNotes || '');
  };

  const handleNotesSave = (stepId: string) => {
    onUpdateStepNotes(stepId, tempNotes);
    setEditingNotesId(null);
  };

  return (
    <div className="space-y-6 relative ml-3">
      {/* Decorative vertical line */}
      <div className="absolute left-[21px] top-4 bottom-4 w-1 bg-slate-100 border-r border-dotted border-slate-200 pointer-events-none" />

      {steps.map((step, idx) => {
        const isExpanded = activeStepId === step.id;
        const progressPct = getPercentage(step);
        const isStepFullyDone = progressPct === 100 || step.completed;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`relative flex gap-5 group transition duration-300 ${
              isStepFullyDone ? 'opacity-85' : ''
            }`}
          >
            {/* Timeline node - Icon */}
            <div className="z-10 bg-white">
              {renderIcon(step.icon, step.category)}
            </div>

            {/* Core Item Card */}
            <div
              id={`timeline-card-${step.id}`}
              className={`flex-1 bg-white rounded-3xl border p-5 transition duration-300 ${
                isExpanded 
                  ? 'border-indigo-100 shadow-sm shadow-slate-100/50' 
                  : isStepFullyDone 
                  ? 'border-emerald-100 hover:border-emerald-100' 
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div 
                  onClick={() => setActiveStepId(isExpanded ? null : step.id)}
                  className="cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {step.timeStart} - {step.timeEnd}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">
                      ({step.durationMinutes} Min)
                    </span>
                    {isStepFullyDone && (
                      <span className="text-[10px] font-bold font-arabic bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        مكتملة
                      </span>
                    )}
                  </div>

                  <h3 className={`font-bold font-arabic text-sm md:text-base leading-tight ${
                    isStepFullyDone ? 'text-slate-500 line-through' : 'text-slate-800'
                  }`}>
                    {step.titleAr}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 group-hover:text-slate-500 transition duration-150">
                    {step.titleEn}
                  </p>
                </div>

                {/* Checklist progress badge & collapse handle */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t border-slate-50 md:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          progressPct === 100 ? 'bg-emerald-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 w-8">
                      {progressPct}%
                    </span>
                  </div>

                  <button
                    id={`btn-collapse-${step.id}`}
                    onClick={() => setActiveStepId(isExpanded ? null : step.id)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Action Items List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
                      {/* Check checklist header instructions */}
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                        تفاصيل وخطوات الخطوة • TASK LIST
                      </span>

                      {/* Items checklist */}
                      <div className="space-y-2.5">
                        {step.items.map((item) => (
                          <div
                            key={item.id}
                            className={`flex items-start gap-3 p-3 rounded-2xl border transition duration-150 ${
                              item.completed
                                ? 'bg-slate-50/50 border-slate-100 text-slate-400'
                                : 'bg-slate-50/20 border-slate-100/50 text-slate-700 hover:border-indigo-100'
                            }`}
                          >
                            <button
                              id={`item-check-${item.id}`}
                              onClick={() => onToggleSubitem(step.id, item.id)}
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                                item.completed
                                  ? 'bg-indigo-500 border-indigo-500 text-white'
                                  : 'border-slate-300 hover:border-indigo-400 bg-white'
                              }`}
                            >
                              {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>

                            <div className="flex-1">
                              <p className={`font-arabic text-right text-xs leading-relaxed font-semibold ${
                                item.completed ? 'line-through text-slate-400' : 'text-slate-700'
                              }`}>
                                {item.textAr}
                              </p>
                              <p className={`text-[11px] text-right md:text-left mt-0.5 block ${
                                item.completed ? 'line-through text-slate-300' : 'text-slate-400'
                              }`}>
                                {item.textEn}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Notes Box Section */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        {editingNotesId === step.id ? (
                          <div className="space-y-2">
                            <textarea
                              id={`step-notes-textarea-${step.id}`}
                              rows={2}
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="أضف ملاحظات خاصة مثل مجهودك، التحديات أو ملاحظة..."
                              className="w-full p-2.5 text-xs font-arabic border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                id={`notes-cancel-${step.id}`}
                                onClick={() => setEditingNotesId(null)}
                                className="px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:bg-slate-100 rounded"
                              >
                                إلغاء
                              </button>
                              <button
                                id={`notes-save-${step.id}`}
                                onClick={() => handleNotesSave(step.id)}
                                className="px-2.5 py-1 text-[10px] font-bold text-white bg-indigo-500 rounded"
                              >
                                حفظ
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => handleNotesEditStart(step.id, step.notes || '')}
                            className="p-3 bg-slate-50 border border-slate-100/50 rounded-2xl cursor-pointer hover:bg-slate-100/50 transition flex items-center justify-between text-slate-500"
                          >
                            <span className="text-[11px] font-arabic truncate max-w-[85%]">
                              {step.notes ? `📝 مذكرتك: ${step.notes}` : '✍️ أضف ملاحظة وتذكير خاص بهذه الخطوة...'}
                            </span>
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

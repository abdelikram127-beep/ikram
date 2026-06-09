import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Plus, Trash2, Calendar, Smile, Heart, ThumbsUp, AlertCircle } from 'lucide-react';
import { DayLog } from '../types';

interface SuiviSectionProps {
  logs: DayLog[];
  onAddLog: (mood: string, note: string, achievements: string[]) => void;
  onDeleteLog: (id: string) => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

export default function SuiviSection({ logs, onAddLog, onDeleteLog, completedTasksCount, totalTasksCount }: SuiviSectionProps) {
  const [mood, setMood] = useState('😊');
  const [noteText, setNoteText] = useState('');
  const [achievementInput, setAchievementInput] = useState('');
  const [achievementsList, setAchievementsList] = useState<string[]>([]);
  const [showLogForm, setShowLogForm] = useState(false);

  const moodsList = [
    { emoji: '😊', labelAr: 'مبتهج / راضٍ', labelEn: 'Joyful' },
    { emoji: '💆', labelAr: 'مسترخٍ جداً', labelEn: 'Relaxed' },
    { emoji: '😴', labelAr: 'نعسان ومعافى', labelEn: 'Sleepy' },
    { emoji: '💪', labelAr: 'نشيط ومنتج', labelEn: 'Productive' },
    { emoji: '📝', labelAr: 'مليء بالأفكار', labelEn: 'Reflective' },
  ];

  const addAchievement = () => {
    if (!achievementInput.trim()) return;
    setAchievementsList([...achievementsList, achievementInput.trim()]);
    setAchievementInput('');
  };

  const removeAchievement = (index: number) => {
    setAchievementsList(achievementsList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() && achievementsList.length === 0) return;

    onAddLog(mood, noteText.trim(), [...achievementsList]);
    setNoteText('');
    setAchievementsList([]);
    setShowLogForm(false);
  };

  return (
    <div
      id="suivi-card"
      className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-500">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 font-arabic text-sm md:text-base">
              دفتر السجل والمتابعة اليومية (Suivi Planner)
            </h3>
            <p className="text-xs text-slate-500">Track and follow-up your evening achievements</p>
          </div>
        </div>

        <button
          id="btn-add-log-toggle"
          onClick={() => {
            setShowLogForm(!showLogForm);
            // Pre-seed some achievements based on progress if empty
            if (!showLogForm && completedTasksCount > 0 && achievementsList.length === 0) {
              setAchievementsList([
                `أنجزت ${completedTasksCount} مهام من روتيني المتكامل المسائي! ✨`
              ]);
            }
          }}
          className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
        >
          {showLogForm ? 'إغلاق السجل' : 'تسجيل اليوم'}
        </button>
      </div>

      <AnimatePresence>
        {showLogForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 overflow-hidden text-sm"
          >
            {/* Quick status bar */}
            <div className="bg-white/80 border border-slate-100 rounded-xl p-3 flex justify-between items-center text-xs">
              <span className="font-arabic font-semibold text-slate-600">تقدّمك الليلة:</span>
              <span className="font-mono text-indigo-600 font-semibold px-2.5 py-0.5 bg-indigo-50 rounded-full">
                {completedTasksCount} / {totalTasksCount} مهام مكتملة
              </span>
            </div>

            {/* Mood picker */}
            <div>
              <label className="block text-xs font-bold text-slate-600 font-arabic mb-2">
                كيف تشعر الآن بعد هذا الروتين؟ (الوضع المزاجي):
              </label>
              <div className="flex gap-2 flex-wrap justify-between">
                {moodsList.map((m) => (
                  <button
                    key={m.emoji}
                    type="button"
                    onClick={() => setMood(m.emoji)}
                    className={`flex-1 min-w-[70px] p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      mood === m.emoji
                        ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 font-semibold scale-105'
                        : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="text-xl">{m.emoji}</span>
                    <span className="text-[10px] font-arabic leading-tight">{m.labelAr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action items accomplished */}
            <div>
              <label className="block text-xs font-bold text-slate-600 font-arabic mb-1">
                إنجازات رئيسية فخور بها اليوم:
              </label>
              <div className="flex gap-2">
                <input
                  id="log-acc-input"
                  type="text"
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  placeholder="مثال: غسيل عميق للوجه وماسك العسل والكركم"
                  className="flex-1 px-3 py-2 border border-slate-200 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs font-arabic"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                />
                <button
                  id="btn-add-acc"
                  type="button"
                  onClick={addAchievement}
                  className="px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition text-xs"
                >
                  إضافة
                </button>
              </div>

              {achievementsList.length > 0 && (
                <div className="mt-2.5 p-2 bg-white border border-slate-100 rounded-lg space-y-1">
                  {achievementsList.map((ach, index) => (
                    <div key={index} className="flex justify-between items-center bg-indigo-50/40 px-2 py-1 rounded text-xs text-indigo-950 font-arabic">
                      <span className="text-right flex-1 select-none pr-1">• {ach}</span>
                      <button
                        type="button"
                        onClick={() => removeAchievement(index)}
                        className="text-red-400 hover:text-red-600 ml-1.5 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Free Note text */}
            <div>
              <label className="block text-xs font-bold text-slate-600 font-arabic mb-1">
                ملاحظات المتابعة (Suivi Note & Insights):
              </label>
              <textarea
                id="log-notes-input"
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="اكتب كيف كان يومك وتجربتك للروتين اليومي، والحديث مع الوالد، إلخ..."
                className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs font-arabic"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1 border-t border-slate-100">
              <button
                id="btn-log-cancel"
                type="button"
                onClick={() => setShowLogForm(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-md transition"
              >
                إلغاء
              </button>
              <button
                id="btn-log-submit"
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-md shadow-xs transition"
              >
                حفظ التقييم
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="py-8 text-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50 text-indigo-400" />
            <p className="text-sm font-arabic font-medium">سجل المتابعة اليومي فارغ</p>
            <p className="text-xs">Save your first follow-up note to start tracking insights!</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-slate-50/80 border border-slate-100 rounded-2xl relative"
            >
              <div className="flex justify-between items-start mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label="mood">
                    {log.mood}
                  </span>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-700 bg-white border border-slate-100 px-2.5 py-0.5 rounded-md">
                      {log.date}
                    </span>
                  </div>
                </div>

                <button
                  id={`log-del-${log.id}`}
                  onClick={() => onDeleteLog(log.id)}
                  className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="حذف السجل"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {log.achievements && log.achievements.length > 0 && (
                <div className="mb-2">
                  <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider block mb-1">
                    الإنجازات الموثقة • ACCOMPLISHED
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {log.achievements.map((item, idx) => (
                      <span key={idx} className="inline-block bg-white border border-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-arabic shadow-2xs">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {log.suiviNote && (
                <div className="bg-white border border-slate-100 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    مذكرة المتابعة والدروس • NOTES
                  </span>
                  <p className="text-xs font-arabic text-slate-600 leading-relaxed text-right">
                    {log.suiviNote}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

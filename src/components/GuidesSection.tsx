import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Compass, Check, ArrowLeft, ArrowRight, Star, HelpCircle } from 'lucide-react';
import { POSTURE_TIPS, WASSAFAT_RECIPES } from '../data';

export default function GuidesSection() {
  const [activeTab, setActiveTab] = useState<'posture' | 'recipes' | 'ai'>('posture');

  return (
    <div
      id="guides-section"
      className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 font-arabic text-sm md:text-base">
            دليل التوجيهات والوصفات المحفّزة (Guides Hub)
          </h3>
          <p className="text-xs text-slate-500">Formulated instructions from your handwritten list</p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-100 mb-5 p-1 bg-slate-50 rounded-2xl">
        <button
          id="btn-tab-posture"
          onClick={() => setActiveTab('posture')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl text-center transition font-arabic ${
            activeTab === 'posture'
              ? 'bg-white text-amber-600 shadow-2xs font-bold'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          🚶‍♂️ وضعية الوقوف والمشي
        </button>
        <button
          id="btn-tab-recipes"
          onClick={() => setActiveTab('recipes')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl text-center transition font-arabic ${
            activeTab === 'recipes'
              ? 'bg-white text-rose-500 shadow-2xs font-bold'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          🥣 وصفات جمالية (Wassafat)
        </button>
        <button
          id="btn-tab-ai"
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl text-center transition font-arabic ${
            activeTab === 'ai'
              ? 'bg-white text-indigo-500 shadow-2xs font-bold'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          🤖 ذكاء واختصارات Notion
        </button>
      </div>

      {/* Tab content wrapper with smooth fade in */}
      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          {activeTab === 'posture' && (
            <motion.div
              key="posture"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-amber-50/20 border border-amber-100 rounded-2xl p-4">
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md uppercase block w-max mb-1.5 font-mono">
                  From: How to walk & seat
                </span>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  الحرص العالي على ميكانيكية الوقوف والمشي يرفع الهيبة والثقة بالنفس فوراً ويدعم صحة ظهرك ورقبتك.
                </p>
              </div>

              <div className="grid gap-3">
                {POSTURE_TIPS.map((tip, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-slate-100 rounded-2xl hover:border-amber-200 transition duration-150">
                    <h4 className="font-semibold text-slate-800 font-arabic text-sm flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-xs font-bold font-mono">
                        {idx + 1}
                      </span>
                      {tip.titleAr}
                    </h4>
                    <p className="text-slate-400 text-[11px] font-medium mb-2 pr-7">
                      {tip.titleEn}
                    </p>
                    <p className="text-slate-600 text-xs font-arabic leading-relaxed text-right pr-7 bg-slate-50/50 p-2.5 rounded-xl border border-dashed border-slate-100">
                      {tip.contentAr}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'recipes' && (
            <motion.div
              key="recipes"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-rose-50/20 border border-rose-100 rounded-2xl p-4">
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-md uppercase block w-max mb-1.5 font-mono">
                  From: Serch for Wassafat
                </span>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  لقد وجدنا لكِ وصفتين طبيعيتين غنيتين من الطبيعة المغربية لجمال شعرك وبشرتك تناسب روتين الاسترخاء الليلة.
                </p>
              </div>

              <div className="grid gap-3.5">
                {WASSAFAT_RECIPES.map((recipe, idx) => (
                  <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-rose-200 transition duration-150">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800 font-arabic text-sm">
                        {recipe.titleAr}
                      </h4>
                      <span className="text-[10px] font-bold bg-rose-50 text-rose-500 px-2 py-0.5 rounded-md font-arabic">
                        {recipe.categoryAr}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mb-3">{recipe.titleEn}</p>

                    <div className="space-y-2 text-xs">
                      <div className="bg-rose-50/30 p-2.5 rounded-xl border border-rose-100/30">
                        <span className="font-bold text-slate-600 font-arabic text-[11px] block text-right">المكونات المطلوبة:</span>
                        <p className="text-slate-700 font-arabic text-right mt-0.5">{recipe.ingredientsAr}</p>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-600 font-arabic text-[11px] block text-right">طريقة التطبيق والاستخدام:</span>
                        <p className="text-slate-700 font-arabic text-right mt-0.5 leading-relaxed">{recipe.instructionsAr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-indigo-50/20 border border-indigo-100 rounded-2xl p-4">
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-md uppercase block w-max mb-1.5 font-mono">
                  From: Help with AI & Notion
                </span>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  تنسيق الذكاء الاصطناعي مع Notion يتيح لك اختصار ساعات العمل الطويلة وترتيب المهام بصيغة أوتوماتيكية مذهلة.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 transition">
                  <h4 className="font-semibold text-slate-800 font-arabic text-xs flex items-center gap-1.5 mb-1.5">
                    <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                    تلميحة Notion الأولى: القوالب التفاعلية
                  </h4>
                  <p className="text-slate-600 text-xs font-arabic leading-relaxed text-right p-2.5 bg-slate-50 rounded-xl">
                    قم بإنشاء قاعدة بيانات باسم «روتين العمل» واصنع قالباً بنقرة زر واحدة يحمل قائمة المهام اليومية، مما يمنع النسيان ويسرّع التجهيز (organax).
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 transition">
                  <h4 className="font-semibold text-slate-800 font-arabic text-xs flex items-center gap-1.5 mb-1.5">
                    <Star className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                    تلميحة الذكاء الاصطناعي الثانية: صياغة الرسائل والمصطلحات
                  </h4>
                  <p className="text-slate-600 text-xs font-arabic leading-relaxed text-right p-2.5 bg-slate-50 rounded-xl">
                    عندما تقرأ «المصطلحات المهنية Jargon»، استعن بالذكاء الاصطناعي لترجمتها وشرحها بمثال حي، أو اطلب منه صياغة رد احترافي سريع لبريد العمل (My email N°).
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

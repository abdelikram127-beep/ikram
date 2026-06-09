import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Plus, Trash2, Check, Sparkles, Smile } from 'lucide-react';
import { ShoppingItem } from '../types';

interface ShoppingSectionProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (nameAr: string, nameEn: string, estPrice: string) => void;
  onDeleteItem: (id: string) => void;
}

export default function ShoppingSection({ items, onToggleItem, onAddItem, onDeleteItem }: ShoppingSectionProps) {
  const [newItemNameAr, setNewItemNameAr] = useState('');
  const [newItemNameEn, setNewItemNameEn] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemNameAr.trim() && !newItemNameEn.trim()) return;
    
    // Default translations if one is missing
    const nameAr = newItemNameAr.trim() || newItemNameEn.trim();
    const nameEn = newItemNameEn.trim() || newItemNameAr.trim();
    const price = priceInput.trim() || '5-15 MAD';

    onAddItem(nameAr, nameEn, price);
    setNewItemNameAr('');
    setNewItemNameEn('');
    setPriceInput('');
    setShowAddForm(false);
  };

  return (
    <div
      id="shopping-card"
      className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-50 rounded-xl text-rose-500">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 font-arabic text-sm md:text-base">
              قائمة مشتريات الليلة (Bay Today)
            </h3>
            <p className="text-xs text-slate-500">Sweets & treats to buy or enjoy tonight</p>
          </div>
        </div>
        
        <button
          id="btn-add-shop-toggle"
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
          title="أضف غرضاً جديداً"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-5 p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 overflow-hidden text-sm"
          >
            <div>
              <label className="block text-xs font-bold text-slate-600 font-arabic mb-1">
                اسم الغرض بالعربية (مثال: أيس كريم):
              </label>
              <input
                id="shop-input-ar"
                type="text"
                value={newItemNameAr}
                onChange={(e) => setNewItemNameAr(e.target.value)}
                placeholder="مثال: شوكولاتة ممتعة"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white font-arabic"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Item Name in English:
              </label>
              <input
                id="shop-input-en"
                type="text"
                value={newItemNameEn}
                onChange={(e) => setNewItemNameEn(e.target.value)}
                placeholder="e.g. Delicious Chocolate"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Estimated Price / الميزانية التقريبية:
              </label>
              <input
                id="shop-input-price"
                type="text"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="e.g. 10 MAD"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                id="shop-cancel"
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
              >
                إلغاء
              </button>
              <button
                id="shop-submit"
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-md shadow-xs transition"
              >
                إضافة الغرض
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3.5">
        {items.length === 0 ? (
          <div className="py-8 text-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Smile className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-arabic">لا توجد أغراض في قائمة الشراء الليلة!</p>
            <p className="text-xs">Your evening shopping cart is empty.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition duration-200 ${
                item.completed
                  ? 'bg-rose-50/20 border-rose-100 text-slate-400'
                  : 'bg-white border-slate-100 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  id={`shop-chk-${item.id}`}
                  onClick={() => onToggleItem(item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                    item.completed
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'border-slate-300 hover:border-rose-400 bg-white'
                  }`}
                >
                  {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <div>
                  <h4 className={`font-semibold font-arabic text-sm ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {item.nameAr}
                  </h4>
                  <p className={`text-xs ${item.completed ? 'line-through text-slate-400' : 'text-slate-500'}`}>
                    {item.nameEn}
                  </p>
                  {item.priceEstimate && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-rose-50 text-rose-500 font-mono text-[10px] font-semibold rounded-md">
                      {item.priceEstimate}
                    </span>
                  )}
                </div>
              </div>

              <button
                id={`shop-del-${item.id}`}
                onClick={() => onDeleteItem(item.id)}
                className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="حذف الغرض"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-1">
          <div className="flex justify-between items-center text-slate-600 font-arabic">
            <span>إجمالي الأغراض الليلة:</span>
            <span className="font-semibold font-mono text-slate-800">{items.length}</span>
          </div>
          <div className="flex justify-between items-center text-slate-600 font-arabic">
            <span>تم شراؤها / توفيرها:</span>
            <span className="font-semibold font-mono text-rose-600">
              {items.filter((i) => i.completed).length} / {items.length}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 text-right font-arabic">
            💡 حلوى المساء تمنحك استرخاء ومكافأة ممتازة بعد يوم شاق!
          </p>
        </div>
      )}
    </div>
  );
}

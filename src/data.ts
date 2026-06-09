import { RoutineStep, ShoppingItem } from './types';

export const INITIAL_ROUTINE_STEPS: RoutineStep[] = [
  {
    id: 'step_1',
    timeStart: '20:00',
    timeEnd: '20:30',
    titleAr: 'الوصول للمنزل والعبادة والوجبة الأساسية',
    titleEn: 'Arrive Home, Prayers & Core Essentials',
    icon: 'Home',
    category: 'essentials',
    durationMinutes: 30,
    completed: false,
    items: [
      { id: '1_1', textAr: 'غسل الوجه فور العودة للمنزل', textEn: 'Clean My Face immediately after arriving', completed: false },
      { id: '1_2', textAr: 'ترتيب وتنسيق الخزانة والملابس', textEn: 'Sort my closet & clothes (Get My closet)', completed: false },
      { id: '1_3', textAr: 'أداء صلاة المغرب أو العشاء في وقتها', textEn: 'Pray evening salat', completed: false },
      { id: '1_4', textAr: 'تناول وجبة العشاء', textEn: 'Eat dinner', completed: false },
      { id: '1_5', textAr: 'قراءة ورد من القرآن الكريم والتدبر', textEn: 'Read Holy Quran', completed: false },
    ]
  },
  {
    id: 'step_2',
    timeStart: '20:30',
    timeEnd: '21:00',
    titleAr: 'تنظيم مساحة العمل والبريد الإلكتروني',
    titleEn: 'Workspace Setup & Digital Clean',
    icon: 'Laptop',
    category: 'work',
    durationMinutes: 30,
    completed: false,
    items: [
      { id: '2_1', textAr: 'تنظيف مساحة العمل، الطاولة والكمبيوتر', textEn: 'Clean PC, keyboard and general workspace', completed: false },
      { id: '2_2', textAr: 'ترتيب وتنظيم حساب Notion للعمل', textEn: 'Organize work planning on Notion', completed: false },
      { id: '2_3', textAr: 'قراءة مصطلحات وتفاصيل العمل وتنظيمها', textEn: 'Read work jargon and organize notes (Read My jargon & organax)', completed: false },
      { id: '2_4', textAr: 'مراجعة وتفقّد صندوق البريد الإلكتروني الخاص بالعمل', textEn: 'Check/organize My email folder/index (My email N°)', completed: false }
    ]
  },
  {
    id: 'step_3',
    timeStart: '21:00',
    timeEnd: '21:15',
    titleAr: 'لحظة تأمل وبناء الثقة الشخصية',
    titleEn: 'Mindful Reflection & Sky Gazing',
    icon: 'Compass',
    category: 'mindfulness',
    durationMinutes: 15,
    completed: false,
    items: [
      { id: '3_1', textAr: 'الجلوس بمفردك وتأمل السماء المفتوحة والشعور بالهدوء', textEn: 'Sit by myself and look up at the sky', completed: false },
      { id: '3_2', textAr: 'التفكير الإيجابي وبناء هيبة الكلام والتعامل في العمل', textEn: 'Develop self-confidence on how to speak and act at work', completed: false }
    ]
  },
  {
    id: 'step_4',
    timeStart: '21:15',
    timeEnd: '21:45',
    titleAr: 'التطوير الذاتي وتحسين الهيئة والمهارات',
    titleEn: 'Personal Growth, AI & Posture Care',
    icon: 'Sparkles',
    category: 'wellness',
    durationMinutes: 30,
    completed: false,
    items: [
      { id: '4_1', textAr: 'البحث عن وصفات طبيعية للعناية بالشعر، الوجه والجسم', textEn: 'Search for recipes (wassafat) for hair, face, and body', completed: false },
      { id: '4_2', textAr: 'تعلم كيفية استغلال الذكاء الاصطناعي مع تطبيق Notion', textEn: 'Integrate AI help with Notion workspace workflows', completed: false },
      { id: '4_3', textAr: 'التدرب على الوضعية الصحيحة للمشي والجلوس وتجربة مستحضرات العناية', textEn: 'Practice posture exercises: How to walk and sit gracefully', completed: false }
    ]
  },
  {
    id: 'step_5',
    timeStart: '21:45',
    timeEnd: '22:15',
    titleAr: 'روتين العناية بالبشرة والجسم والشعر',
    titleEn: 'Skincare Routine & Body Pampering',
    icon: 'Heart',
    category: 'nightcare',
    durationMinutes: 30,
    completed: false,
    items: [
      { id: '5_1', textAr: 'تنظيف الوجه العميق، وضع القناع المفضل وتدليك عضلات الوجه لتخفيف التوتر', textEn: 'Deep face wash, apply mask, massage and soothe eyes (clean My face, Mask, Massage, My eyes)', completed: false },
      { id: '5_2', textAr: 'تنظيف الأسنان بدقة تامة ورعاية الفم', textEn: 'Clean teeth thoroughly (My theet)', completed: false },
      { id: '5_3', textAr: 'العناية بالشارب وترتيب شعر الوجه المريح', textEn: 'Trim / care for mustache (mortach/comfort) and refresh', completed: false },
      { id: '5_4', textAr: 'دهان مرطب الجسم المريح لامتصاص البشرة', textEn: 'Apply body cream/lotion (My body pommade)', completed: false },
      { id: '5_5', textAr: 'تنشيط وترطيب الشعر وتجربة تصفيفات مريحة', textEn: 'Hair refresh styling (Hair Refiche -> Tiktok and TATI)', completed: false }
    ]
  },
  {
    id: 'step_6',
    timeStart: '22:15',
    timeEnd: '22:45',
    titleAr: 'الترابط العائلي والمكافأة اليومية',
    titleEn: 'Family Connection & Sweet Treats',
    icon: 'Smile',
    category: 'leisure',
    durationMinutes: 30,
    completed: false,
    items: [
      { id: '6_1', textAr: 'تبادل أطراف الحديث الهادئ والدافئ مع الوالد', textEn: 'Sit and talk with dad (Talk with dad)', completed: false },
      { id: '6_2', textAr: 'الاستمتاع بمكافأة المساء المفضلة (أيس كريم، رامن، أو حلاوة)', textEn: 'Enjoy a mini sweet reward (Ice cream, Ramen, or sweet Halwa)', completed: false },
      { id: '6_3', textAr: 'كتابة تدوينة المتابعة وتقييم اليوم', textEn: 'Complete the daily follow-up checklist (suivi tracker)', completed: false }
    ]
  }
];

export const INITIAL_SHOPPING_ITEMS: ShoppingItem[] = [
  { id: 'shop_1', nameAr: 'أيس كريم لذيذ (منقذ المساء)', nameEn: 'Ice Cream', priceEstimate: '7-15 MAD', completed: false, icon: 'IceCream' },
  { id: 'shop_2', nameAr: 'وجبة رامن دافئة ومسلية', nameEn: 'Ramen', priceEstimate: '10-25 MAD', completed: false, icon: 'Bowl' },
  { id: 'shop_3', nameAr: 'حلوى ممتعة للتذوق والراحة', nameEn: 'Al Halwa (Sweets)', priceEstimate: '5-10 MAD', completed: false, icon: 'Candy' }
];

export const POSTURE_TIPS = [
  {
    titleAr: "وضعية المشي السليمة",
    titleEn: "How to Walk with Confidence",
    contentAr: "حافظ على كتفيك مسترخيين ومسحوبين قليلاً للخلف. انظر للأمام مباشرة وليس لأسفل، واجعل ملامح وجهك واثقة ومرتاحة (مرتّحة). دع ذراعيك تتحركان بشكل طبيعي.",
    contentEn: "Keep your shoulders relaxed and slightly back. Keep your eyes forward, not down, walk with natural stride, and maintain a calm, confident facial expression."
  },
  {
    titleAr: "وضعية الجلوس لمكتب صحي",
    titleEn: "How to Sit for Best Posture",
    contentAr: "اجعل عمودك الفقري مستقيماً ومدعوماً بالكامل بظهر الكرسي. ضع قدميك منبسطتين على الأرض. خذ استراحات قصيرة لإرخاء عينيك ورأسك لتجنب الشد.",
    contentEn: "Sit with your spine straight and back fully supported. Keep feet flat on the floor. Take micro-breaks to rest your eyes and neck."
  }
];

export const WASSAFAT_RECIPES = [
  {
    categoryAr: "العناية بالشعر",
    categoryEn: "Hair Care Recipe",
    titleAr: "ماسك مغذي ومقوي للشعر",
    titleEn: "Deep Hydration Hair Yogurt Mask",
    ingredientsAr: "ملعقتين زبادي طبيعي + ملعقة صغيرة زيت جوز الهند / زيت الأرغان المغربي",
    ingredientsEn: "Yogurt + a teaspoon of Coconut oil or Moroccan Argan oil",
    instructionsAr: "يخلط جيداً ويوضع على أطراف الشعر لمدة 20 دقيقة قبل غسله بالماء الدافيء لضمان شعور بالانتعاش (Hair Refiche).",
    instructionsEn: "Mix well, apply to hair tips for 20 mins before washing for a beautifully refreshed feel."
  },
  {
    categoryAr: "العناية بالبشرة والوجه",
    categoryEn: "Face Skincare Mask",
    titleAr: "قناع التهدئة والنضارة الطبيعي",
    titleEn: "Soothing Face Mask & Gentle Massage",
    ingredientsAr: "ملعقة عسل طبيعي + بضع قطرات من ماء الورد البارد",
    ingredientsEn: "Natural honey + a few drops of cold Rosewater",
    instructionsAr: "يوضع Mask لطيف على الوجه المغسول حديثاً، ثم يتم تدليك عضلات الوجه بحركات دائرية خفيفة لمدة 5 دقائق لضمان الاسترخاء التام وتخفيف إرهاق اليوم.",
    instructionsEn: "Apply face mask, gently perform facial massage in circular motions for 5 minutes of ultimate stress relief."
  }
];

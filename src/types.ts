export interface RoutineStep {
  id: string;
  timeStart: string; // e.g. "20:00"
  timeEnd: string;   // e.g. "20:30"
  titleAr: string;
  titleEn: string;
  icon: string;
  category: 'essentials' | 'work' | 'mindfulness' | 'wellness' | 'nightcare' | 'leisure';
  durationMinutes: number;
  completed: boolean;
  notes?: string;
  items: {
    id: string;
    textAr: string;
    textEn: string;
    completed: boolean;
  }[];
}

export interface ShoppingItem {
  id: string;
  nameAr: string;
  nameEn: string;
  priceEstimate?: string;
  completed: boolean;
  icon: string;
}

export interface DayLog {
  id: string;
  date: string;
  mood: string;
  suiviNote: string;
  achievements: string[];
}

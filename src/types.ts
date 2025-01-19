export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: 'spiritual' | 'business' | 'personal';
  timeBlock: keyof PrayerTimes | 'sleep';
}

export interface UserSettings {
  sleepHours: {
    start: number; // Hours before Fajr
    duration: number; // In hours
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

import { PrayerTimes } from '../types';

export const fetchPrayerTimes = async (latitude: number, longitude: number) => {
  const date = new Date();
  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=2`
  );
  const data = await response.json();
  return data.data.timings as PrayerTimes;
};

export const getSuggestedTodos = (timeBlock: keyof PrayerTimes | 'sleep') => {
  const suggestions = {
    Fajr: [
      'Read Quran for 15 minutes',
      'Morning business planning',
      'Light exercise/stretching'
    ],
    Dhuhr: [
      'Review business metrics',
      'Network with fellow entrepreneurs',
      'Read business development material'
    ],
    Asr: [
      'Team meetings and collaborations',
      'Review daily progress',
      'Short meditation break'
    ],
    Maghrib: [
      'Family time',
      'Review tomorrow\'s schedule',
      'Evening dhikr'
    ],
    Isha: [
      'Plan next day',
      'Read business case studies',
      'Evening Quran recitation'
    ],
    sleep: [
      'Follow 3-2-1 rule',
      'Make dua before sleep',
      'Set intention for tomorrow'
    ]
  };
  
  return suggestions[timeBlock] || [];
};

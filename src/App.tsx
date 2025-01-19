import React, { useEffect, useState } from 'react';
import { Download, MapPin } from 'lucide-react';
import { TimeBlock } from './components/TimeBlock';
import { SleepSettings } from './components/SleepSettings';
import { fetchPrayerTimes, getSuggestedTodos } from './utils/prayerUtils';
import { calculateTimeDifference } from './utils/timeUtils';
import { PrayerTimes, Todo, UserSettings } from './types';
import html2pdf from 'html2pdf.js';

function App() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      sleepHours: { start: 6, duration: 7 },
      location: { latitude: 21.4225, longitude: 39.8262 }
    };
  });

  useEffect(() => {
    const loadPrayerTimes = async () => {
      const times = await fetchPrayerTimes(
        settings.location.latitude,
        settings.location.longitude
      );
      setPrayerTimes(times);
    };
    loadPrayerTimes();
  }, [settings.location]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [todos, settings]);

  const handleAddTodo = (text: string, timeBlock: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category: 'spiritual',
      timeBlock: timeBlock as keyof PrayerTimes | 'sleep',
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleExportPDF = () => {
    const element = document.getElementById('todo-content');
    html2pdf().from(element).save('islamic-todo-list.pdf');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all todos?')) {
      setTodos([]);
    }
  };

  if (!prayerTimes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const timeBlocks = [
    { name: 'Maghrib', start: prayerTimes.Maghrib, end: prayerTimes.Isha },
    { name: 'Isha', start: prayerTimes.Isha, end: '22:00' },
    { name: 'sleep', start: '22:00', end: prayerTimes.Fajr },
    { name: 'Fajr', start: prayerTimes.Fajr, end: prayerTimes.Dhuhr },
    { name: 'Dhuhr', start: prayerTimes.Dhuhr, end: prayerTimes.Asr },
    { name: 'Asr', start: prayerTimes.Asr, end: prayerTimes.Maghrib },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F0] arabic-pattern">
      <div className="max-w-4xl mx-auto p-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">
            Muslim Entrepreneur's Daily Planner
          </h1>
          <div className="flex items-center justify-center text-emerald-700 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Prayer times for your location</span>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleExportPDF}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Start Fresh
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 timeline" id="todo-content">
            {timeBlocks.map((block, index) => {
              const nextBlock = timeBlocks[(index + 1) % timeBlocks.length];
              const timeDiff = calculateTimeDifference(block.start, block.end);
              
              return (
                <TimeBlock
                  key={block.name}
                  title={block.name}
                  startTime={block.start}
                  endTime={block.end}
                  todos={todos.filter((todo) => todo.timeBlock === block.name)}
                  suggestedTodos={getSuggestedTodos(block.name as keyof PrayerTimes | 'sleep')}
                  onAddTodo={handleAddTodo}
                  onToggleTodo={handleToggleTodo}
                  timeSpacing={timeDiff / 2}
                  isSleepTime={block.name === 'sleep'}
                  nextPrayer={block.name !== 'sleep' ? {
                    name: nextBlock.name,
                    time: nextBlock.start
                  } : undefined}
                />
              );
            })}
          </div>
          
          <div className="md:col-span-1">
            <SleepSettings
              sleepHours={settings.sleepHours}
              onUpdate={(sleepHours) =>
                setSettings({ ...settings, sleepHours })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

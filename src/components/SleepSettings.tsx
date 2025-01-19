import React from 'react';
import { Moon } from 'lucide-react';

interface SleepSettingsProps {
  sleepHours: { start: number; duration: number };
  onUpdate: (settings: { start: number; duration: number }) => void;
}

export const SleepSettings: React.FC<SleepSettingsProps> = ({
  sleepHours,
  onUpdate,
}) => {
  return (
    <div className="bg-indigo-50 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <Moon className="w-5 h-5 mr-2 text-indigo-600" />
        <h3 className="text-lg font-semibold">Sleep Schedule</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours before Fajr
          </label>
          <input
            type="number"
            value={sleepHours.start}
            onChange={(e) =>
              onUpdate({ ...sleepHours, start: Number(e.target.value) })
            }
            min="4"
            max="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sleep Duration (hours)
          </label>
          <input
            type="number"
            value={sleepHours.duration}
            onChange={(e) =>
              onUpdate({ ...sleepHours, duration: Number(e.target.value) })
            }
            min="5"
            max="9"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="bg-white p-3 rounded-md">
          <h4 className="font-medium text-sm mb-2">3-2-1 Rule Reminder</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 3 hours: No food before sleep</li>
            <li>• 2 hours: No water before sleep</li>
            <li>• 1 hour: No screens before sleep</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

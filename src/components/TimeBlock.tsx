import React from 'react';
import { Clock, Fuel as Mosque } from 'lucide-react';
import { Todo } from '../types';
import { isCurrentTimeBlock } from '../utils/timeUtils';

interface TimeBlockProps {
  title: string;
  startTime: string;
  endTime: string;
  todos: Todo[];
  suggestedTodos: string[];
  onAddTodo: (text: string, timeBlock: string) => void;
  onToggleTodo: (id: string) => void;
  timeSpacing: number;
  isSleepTime?: boolean;
  nextPrayer?: { name: string; time: string };
}

export const TimeBlock: React.FC<TimeBlockProps> = ({
  title,
  startTime,
  endTime,
  todos,
  suggestedTodos,
  onAddTodo,
  onToggleTodo,
  timeSpacing,
  isSleepTime = false,
  nextPrayer,
}) => {
  const [newTodo, setNewTodo] = React.useState('');
  const isCurrentBlock = isCurrentTimeBlock(startTime, endTime);

  return (
    <div 
      className={`time-block ${isCurrentBlock ? 'current' : ''}`}
      style={{ marginBottom: `${timeSpacing}px` }}
    >
      {isCurrentBlock && (
        <div className="current-time-line" />
      )}
      
      {isSleepTime ? (
        <div className="sleep-shade p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Rest Time</h3>
          <div className="rule-321">
            <h4 className="font-semibold text-amber-800 mb-2">Pre-Sleep Guidelines</h4>
            <ul className="space-y-2 text-amber-700">
              <li>• 3 hours: No food before sleep</li>
              <li>• 2 hours: No water before sleep</li>
              <li>• 1 hour: No screens before sleep</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="prayer-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-emerald-800">{title}</h3>
            <span className="text-sm text-emerald-600 font-mono">{startTime}</span>
          </div>

          {title !== 'sleep' && (
            <>
              <div className="mosque-reminder">
                <Mosque className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-emerald-700">
                  Head to the mosque 15 minutes before {title} prayer
                </span>
              </div>

              {nextPrayer && (
                <div className="next-prayer mt-4">
                  <div className="text-sm opacity-80">Next Prayer</div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{nextPrayer.name}</span>
                    <span>{nextPrayer.time}</span>
                  </div>
                </div>
              )}

              <div className="islamic-pattern-divider" />

              <div className="tasbih-section space-y-2 mb-4">
                <h4 className="text-sm font-semibold text-emerald-700">Dhikr After Prayer</h4>
                <div className="tasbih-counter">
                  <span>SubhanAllah</span>
                  <span>× 33</span>
                </div>
                <div className="tasbih-counter">
                  <span>Alhamdulillah</span>
                  <span>× 33</span>
                </div>
                <div className="tasbih-counter">
                  <span>Allahu Akbar</span>
                  <span>× 33</span>
                </div>
              </div>

              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center p-2 hover:bg-emerald-50 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggleTodo(todo.id)}
                      className="mr-2 rounded text-emerald-600"
                    />
                    <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                      {todo.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a todo..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (newTodo.trim()) {
                        onAddTodo(newTodo, title);
                        setNewTodo('');
                      }
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-emerald-700 mb-2">Suggested:</p>
                  <div className="space-y-1">
                    {suggestedTodos.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onAddTodo(suggestion, title);
                        }}
                        className="text-sm text-emerald-600 hover:text-emerald-700 block"
                      >
                        + {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

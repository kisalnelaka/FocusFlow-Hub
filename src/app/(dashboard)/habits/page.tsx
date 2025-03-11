'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

type Habit = {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completedToday: boolean;
  category: 'health' | 'productivity' | 'learning' | 'other';
};

const initialHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Exercise',
    description: '30 minutes of exercise in the morning',
    frequency: 'daily',
    streak: 5,
    completedToday: false,
    category: 'health',
  },
  {
    id: '2',
    name: 'Read a Book',
    description: 'Read for 20 minutes',
    frequency: 'daily',
    streak: 3,
    completedToday: true,
    category: 'learning',
  },
  {
    id: '3',
    name: 'Weekly Planning',
    description: 'Plan tasks and goals for the week',
    frequency: 'weekly',
    streak: 2,
    completedToday: false,
    category: 'productivity',
  },
];

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [selectedCategory, setSelectedCategory] = useState<Habit['category'] | 'all'>('all');

  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter(habit => habit.category === selectedCategory);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit =>
      habit.id === habitId
        ? { ...habit, completedToday: !habit.completedToday }
        : habit
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Habits</h1>
        <Button>
          Add New Habit
        </Button>
      </div>

      <div className="flex space-x-2">
        {['all', 'health', 'productivity', 'learning', 'other'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category as Habit['category'] | 'all')}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredHabits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={() => toggleHabit(habit.id)}
          />
        ))}
      </div>
    </div>
  );
}

function HabitCard({ habit, onToggle }: { habit: Habit; onToggle: () => void }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
          <p className="mt-1 text-gray-600">{habit.description}</p>
          <div className="mt-2 flex items-center space-x-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              habit.category === 'health'
                ? 'bg-green-100 text-green-800'
                : habit.category === 'productivity'
                ? 'bg-blue-100 text-blue-800'
                : habit.category === 'learning'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
            </span>
            <span className="text-sm font-medium text-primary">
              {habit.streak} day streak
            </span>
          </div>
        </div>
        <Button
          variant={habit.completedToday ? 'default' : 'outline'}
          size="sm"
          onClick={onToggle}
        >
          {habit.completedToday ? 'Completed' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  );
} 
'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
};

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Write and submit the project proposal for the new feature',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-15',
  },
  {
    id: '2',
    title: 'Review Documentation',
    description: 'Review and update the API documentation',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-03-20',
  },
  {
    id: '3',
    title: 'Bug Fixes',
    description: 'Fix reported bugs in the latest release',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-03-10',
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Task['status']>('todo');

  const filteredTasks = tasks.filter(task => 
    filter === 'todo' ? task.status !== 'completed' : task.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <Button>
          Add New Task
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={filter === 'todo' ? 'default' : 'outline'}
          onClick={() => setFilter('todo')}
        >
          To Do
        </Button>
        <Button
          variant={filter === 'in-progress' ? 'default' : 'outline'}
          onClick={() => setFilter('in-progress')}
        >
          In Progress
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(newStatus) => {
              setTasks(tasks.map(t =>
                t.id === task.id ? { ...t, status: newStatus } : t
              ));
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  onStatusChange,
}: {
  task: Task;
  onStatusChange: (status: Task['status']) => void;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="mt-1 text-gray-600">{task.description}</p>
          <div className="mt-2 flex items-center space-x-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            <span className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(e.target.value as Task['status'])}
            className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
} 
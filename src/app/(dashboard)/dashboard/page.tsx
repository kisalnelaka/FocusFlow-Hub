'use client';

import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-1 text-gray-600">Here's an overview of your productivity today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Tasks"
          value="5/8"
          description="Tasks completed today"
        />
        <StatCard
          title="Focus Time"
          value="2h 15m"
          description="Total focused time today"
        />
        <StatCard
          title="Habits"
          value="3/4"
          description="Habits completed today"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button>
            Start Focus Session
          </Button>
          <Button variant="outline">
            Add New Task
          </Button>
          <Button variant="secondary">
            Track Habit
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { time: '2 hours ago', action: 'Completed task: Project Planning' },
            { time: '3 hours ago', action: 'Finished a focus session (25 mins)' },
            { time: '4 hours ago', action: 'Tracked habit: Daily Exercise' },
          ].map((activity, index) => (
            <ActivityItem
              key={index}
              time={activity.time}
              action={activity.action}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function ActivityItem({ time, action }: { time: string; action: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <span className="text-gray-900">{action}</span>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
} 
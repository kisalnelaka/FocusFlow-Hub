import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to FocusFlow Hub</h1>
      <p className="text-lg text-gray-700 mb-8">Your comprehensive ADHD Management Ecosystem</p>
      <Link href="/login" className="text-lg text-primary hover:underline">
        Go to Login
      </Link>
    </div>
  );
} 
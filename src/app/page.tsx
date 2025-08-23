'use client';

import ChatInterface from '@/components/ChatInterface';

export default function Home() {

  return (
    <main className="min-h-screen text-gray-100">
        {/* Main Content */}
        <div className="h-screen">
          <ChatInterface />
        </div>
    </main>
  );
}

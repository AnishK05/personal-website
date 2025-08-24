'use client';

import ChatInterface from '@/components/ChatInterface';

export default function Home() {

  return (
    <main className="min-h-screen min-h-[100dvh] text-gray-100">
        {/* Main Content */}
        <div className="h-full min-h-[100dvh]">
          <ChatInterface />
        </div>
    </main>
  );
}

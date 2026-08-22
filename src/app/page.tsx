'use client';

import ChatInterface from '@/components/ChatInterface';
import IntroSequence from '@/components/IntroSequence';

export default function Home() {
  return (
    <main className="min-h-screen min-h-[100dvh] text-gray-100">
      <IntroSequence>
        <ChatInterface />
      </IntroSequence>
    </main>
  );
}

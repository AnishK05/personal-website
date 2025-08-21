'use client';

import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const handleQuickAction = (action: string) => {
    // This will be handled by the ChatInterface component
    console.log('Quick action:', action);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to My Personal Website
          </h1>
          <p className="text-gray-400 mt-2">
            Chat with my AI assistant to learn about my background, skills, and projects
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 h-[calc(100vh-140px)]">
        <ChatInterface onQuickAction={handleQuickAction} />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-gray-400 text-sm">
          <p>Built with Next.js, TypeScript, and Google Gemini AI</p>
        </div>
      </footer>
    </main>
  );
}

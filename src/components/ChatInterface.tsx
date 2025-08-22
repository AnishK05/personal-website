'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onQuickAction?: (action: string) => void;
}

export default function ChatInterface({ onQuickAction }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const quickActions = [
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'About', path: '/about' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (path: string) => {
    router.push(path);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputValue('');
  };

    if (messages.length === 0) {
    // Initial state - chat input centered on screen
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-semibold text-gray-100 mb-2">
             Hi, I&apos;m Anish! 👋
           </h1>
           <p className="text-gray-400 mb-8 max-w-md">
             I’m a Computer Science and Business student at UT Austin. I’m interested in software engineering, AI/ML, agentic AI, and startups. Feel free to chat with me about my projects, experience, skills, or anything else!
           </p>
          
          {/* Quick Action Buttons - Centered */}
          <div className="flex flex-wrap gap-3 justify-center max-w-lg mb-8">
            {quickActions.map((action) => (
                             <Button
                 key={action.label}
                 variant="outline"
                 size="sm"
                 onClick={() => handleQuickAction(action.path)}
                 className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-gray-100 transition-colors"
               >
                 {action.label}
               </Button>
            ))}
          </div>

          {/* Centered Input */}
          <div className="w-full max-w-2xl">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about myself..."
                className="flex-1 bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 rounded-xl"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 rounded-xl transition-colors"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat mode - messages exist
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Scrollable Chat Messages */}
             <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
         <div className="px-4 py-6 space-y-6 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                 <Avatar className="w-8 h-8 flex-shrink-0">
                   <AvatarFallback className={message.isUser ? "bg-gray-600 text-white" : "bg-gray-700 text-white"}>
                     {message.isUser ? 'U' : 'A'}
                   </AvatarFallback>
                 </Avatar>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.isUser 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                                 <Avatar className="w-8 h-8 flex-shrink-0">
                   <AvatarFallback className="bg-gray-700 text-white">A</AvatarFallback>
                 </Avatar>
                <div className="px-4 py-3 rounded-2xl bg-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input at Bottom */}
      <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex gap-3">
                                <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about myself..."
                      className="flex-1 bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 rounded-xl"
                      disabled={isLoading}
                    />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 rounded-xl transition-colors"
            >
              Send
            </Button>
            <Button
              onClick={handleClearChat}
              disabled={isLoading}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-gray-100 px-4 rounded-xl transition-colors"
              title="Clear chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingLength, setCurrentTypingLength] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const quickActions = [
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'About & Contact', path: '/about' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typingMessage) {
      const targetLength = typingMessage.length;
      
      const interval = setInterval(() => {
        setCurrentTypingLength(prev => {
          if (prev >= targetLength) {
            setIsTyping(false);
            clearInterval(interval);
            return targetLength;
          }
          return prev + 1;
        });
      }, 9); // Adjust speed here (lower = faster)
      
      return () => clearInterval(interval);
    }
  }, [isTyping, typingMessage]);

  // Auto-focus input when in chat mode
  useEffect(() => {
    if (messages.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages.length]);

  // Auto-focus input after sending message
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

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
        
        // Start typing animation
        setTypingMessage(data.response);
        setCurrentTypingLength(0);
        setIsTyping(true);
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
             I&apos;m a Computer Science student at UT Austin. I&apos;m interested in software engineering, AI/ML, agentic AI, and startups. Feel free to chat with me about my projects, experience, skills, or anything else!
           </p>
          
          {/* Social Media Links */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://www.linkedin.com/in/kalra-anish/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="LinkedIn Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/AnishK05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              title="GitHub Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
          
          {/* Quick Action Buttons - Centered */}
          <div className="flex flex-wrap gap-3 justify-center max-w-lg mb-8">
            {quickActions.map((action) => (
                             <Button
                 key={action.label}
                 variant="outline"
                 size="sm"
                 onClick={() => handleQuickAction(action.path)}
                 className="border-gray-600/70 text-gray-300 hover:bg-gray-700/70 hover:border-gray-500 hover:text-gray-100 transition-colors backdrop-blur-sm"
               >
                 {action.label}
               </Button>
            ))}
          </div>

          {/* Centered Input */}
          <div className="w-full max-w-2xl">
            <div className="flex gap-3 items-center">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about myself..."
                className="flex-1 bg-gray-800/70 border-gray-600/70 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 rounded-xl backdrop-blur-sm"
                disabled={isLoading}
                ref={inputRef}
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gray-600/80 hover:bg-gray-700/80 text-white px-6 rounded-xl transition-colors backdrop-blur-sm"
                >
                  Send
                </Button>
                <div className="group relative">
                  <img src="/icon.svg" alt="Wolf icon" className="w-6 h-6 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    In an effort to keep this free, responses might be a little slow, sorry!!
                  </div>
                </div>
              </div>
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
             <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-gray-600/70 hover:scrollbar-thumb-gray-500">
         <div className="px-4 py-6 space-y-6 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                 <Avatar className="w-8 h-8 flex-shrink-0">
                   <AvatarFallback className={message.isUser ? "bg-gray-600/80 text-white backdrop-blur-sm" : "bg-gray-700/80 text-white backdrop-blur-sm"}>
                     {message.isUser ? 'U' : 'A'}
                   </AvatarFallback>
                 </Avatar>
                <div className={`px-4 py-3 rounded-2xl backdrop-blur-sm ${
                  message.isUser 
                    ? 'bg-gray-600/80 text-white' 
                    : 'bg-gray-700/80 text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.isUser ? message.content : (
                      isTyping && message.id === messages[messages.length - 1]?.id
                        ? (
                          <>
                            {typingMessage.slice(0, currentTypingLength)}
                            <span className="inline-block w-0.5 h-4 bg-gray-400 ml-1 animate-pulse"></span>
                          </>
                        )
                        : message.content
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                                 <Avatar className="w-8 h-8 flex-shrink-0">
                   <AvatarFallback className="bg-gray-700/80 text-white backdrop-blur-sm">A</AvatarFallback>
                 </Avatar>
                <div className="px-4 py-3 rounded-2xl bg-gray-700/80 backdrop-blur-sm">
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
      <div className="border-t border-gray-700/50 bg-gray-900/30 backdrop-blur-md">
        <div className="p-4">
          <div className="flex gap-3 items-center">
                                <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about myself..."
                      className="flex-1 bg-gray-800/70 border-gray-600/70 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500/20 rounded-xl backdrop-blur-sm"
                      disabled={isLoading}
                      ref={inputRef}
                    />
                          <div className="flex items-center gap-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gray-600/80 hover:bg-gray-700/80 text-white px-6 rounded-xl transition-colors backdrop-blur-sm"
                >
                  Send
                </Button>
                <div className="group relative">
                  <img src="/icon.svg" alt="Wolf icon" className="w-6 h-6 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-gray-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    In an effort to keep this free, responses might be a little slow, sorry!!
                  </div>
                </div>
              </div>
            <Button
              onClick={handleClearChat}
              disabled={isLoading}
              variant="outline"
              className="border-gray-600/70 text-gray-300 hover:bg-gray-700/70 hover:border-gray-500 hover:text-gray-100 px-4 rounded-xl transition-colors backdrop-blur-sm"
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

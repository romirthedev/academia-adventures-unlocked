
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { aiCollegeService } from '@/services/aiCollegeService';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIChatProps {
  collegeData: any;
}

const AIChat: React.FC<AIChatProps> = ({ collegeData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your admissions counselor AI for ${collegeData['school.name']}. I can help you understand what this college looks for in applicants, evaluate your extracurriculars, and provide personalized advice. What would you like to know?`,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userExtracurriculars, setUserExtracurriculars] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to clean text and remove markdown formatting
  const cleanText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/_(.*?)_/g, '$1') // Remove underline
      .replace(/`(.*?)`/g, '$1') // Remove code
      .replace(/#{1,6}\s*(.*)/g, '$1') // Remove headers
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
      .replace(/^\s*[-*+]\s+/gm, '• ') // Convert markdown lists to bullet points
      .replace(/^\s*\d+\.\s+/gm, '• ') // Convert numbered lists to bullet points
      .trim();
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await aiCollegeService.chatWithAdmissionsAI(
        [...messages, userMessage],
        collegeData,
        userExtracurriculars
      );

      const cleanedResponse = cleanText(response);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: cleanedResponse,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-lg animate-fade-in">
      <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg animate-pulse-glow">
            <Bot className="h-4 w-4 text-white" />
          </div>
          AI Admissions Counselor
        </CardTitle>
        <div className="text-sm text-slate-600">
          <Input
            placeholder="Share your extracurriculars (optional) to get personalized advice..."
            value={userExtracurriculars}
            onChange={(e) => setUserExtracurriculars(e.target.value)}
            className="mt-2 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 transition-all duration-300 hover:shadow-md"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-200">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-2xl transition-all duration-300 hover:shadow-md ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white ml-auto hover:scale-105'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm hover:shadow-lg'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-200">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about admissions, extracurriculars, or application advice..."
              disabled={isLoading}
              className="flex-1 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 transition-all duration-300 hover:shadow-md"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-sm hover:scale-105 transition-all duration-200 hover:shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;

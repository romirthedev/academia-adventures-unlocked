
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
      content: `Hello! I'm your AI admissions counselor for ${collegeData['school.name']}. I can help you understand admissions requirements, evaluate your profile, and provide personalized guidance. How can I assist you today?`,
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

  const cleanText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#{1,6}\s*(.*)/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/^\s*[-*+]\s+/gm, '• ')
      .replace(/^\s*\d+\.\s+/gm, '• ')
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
    <Card className="h-[600px] flex flex-col glass-card border-0 animate-fade-in">
      <CardHeader className="border-b bg-slate-50/50">
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="p-2 bg-primary rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          AI Admissions Counselor
        </CardTitle>
        <div className="text-sm">
          <Input
            placeholder="Share your extracurriculars (optional) for personalized advice..."
            value={userExtracurriculars}
            onChange={(e) => setUserExtracurriculars(e.target.value)}
            className="mt-2 border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] p-4 rounded-2xl transition-all duration-200 ${
                    message.role === 'user'
                      ? 'bg-primary text-white ml-auto'
                      : 'bg-slate-50 text-foreground border border-border'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse-soft">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-50 border border-border p-4 rounded-2xl">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-6 border-t bg-slate-50/50">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about admissions, requirements, or application advice..."
              disabled={isLoading}
              className="flex-1 border-border focus:border-primary focus:ring-primary/20"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="btn-primary"
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

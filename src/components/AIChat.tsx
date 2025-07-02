import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, BookOpen, Target, TrendingUp, Heart, ThumbsUp, ThumbsDown, Copy, Share2, Download, Zap, Star, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { aiCollegeService } from '@/services/aiCollegeService';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  id: string;
  reactions?: {
    thumbsUp: number;
    thumbsDown: number;
  };
}

interface AIChatProps {
  collegeData: any;
}

const quickActions = [
  {
    icon: Target,
    label: "Admissions Requirements",
    prompt: "What are the admission requirements for this college?"
  },
  {
    icon: BookOpen,
    label: "Academic Programs",
    prompt: "Tell me about the academic programs and majors offered."
  },
  {
    icon: TrendingUp,
    label: "Acceptance Rate",
    prompt: "What is the acceptance rate and what makes a competitive applicant?"
  },
  {
    icon: Star,
    label: "Application Tips",
    prompt: "What tips do you have for a strong application to this college?"
  }
];

const AIChat: React.FC<AIChatProps> = ({ collegeData }) => {
  const collegeName = collegeData?.['school.name'] || 'this college';
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI admissions counselor for ${collegeName}. I can help you understand admissions requirements, evaluate your profile, and provide personalized guidance. How can I assist you today?`,
      timestamp: Date.now(),
      id: 'welcome',
      reactions: { thumbsUp: 0, thumbsDown: 0 }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userExtracurriculars, setUserExtracurriculars] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-focus input when component mounts
    inputRef.current?.focus();
  }, []);

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

  const handleSendMessage = async (customMessage?: string) => {
    const messageContent = customMessage || inputValue.trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageContent,
      timestamp: Date.now(),
      id: `user-${Date.now()}`
    };

    console.log('Sending message:', userMessage.content);
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
    setShowQuickActions(false);

    // Simulate typing delay
    setTimeout(() => setIsTyping(false), 1000);

    try {
      console.log('Calling AI service with messages:', [...messages, userMessage].length);
      const response = await aiCollegeService.chatWithAdmissionsAI(
        [...messages, userMessage],
        collegeData,
        userExtracurriculars
      );

      console.log('AI Response:', response);
      const cleanedResponse = cleanText(response);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: cleanedResponse,
        timestamp: Date.now(),
        id: `assistant-${Date.now()}`,
        reactions: { thumbsUp: 0, thumbsDown: 0 }
      };

      console.log('Adding assistant message:', cleanedResponse);
      setMessages(prev => [...prev, assistantMessage]);
      setChatHistory(prev => [...prev, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: Date.now(),
        id: `error-${Date.now()}`,
        reactions: { thumbsUp: 0, thumbsDown: 0 }
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

  const handleReaction = (messageId: string, reaction: 'thumbsUp' | 'thumbsDown') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: { ...msg.reactions, [reaction]: (msg.reactions?.[reaction] || 0) + 1 } }
        : msg
    ));
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const exportChat = () => {
    const chatText = chatHistory.map(msg => 
      `${msg.role === 'user' ? 'You' : 'AI Counselor'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-with-${collegeName}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TooltipProvider>
      <Card className="h-[700px] flex flex-col glass-card border-0 animate-fade-in shadow-xl bg-[#18181b] text-white">
        <CardHeader className="border-b bg-black text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-white">
              <Bot className="h-5 w-5 text-white" />
              <div>
                <div className="font-semibold">AI Admissions Counselor</div>
                <div className="text-xs text-gray-300 font-normal">Powered by Advanced AI</div>
              </div>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 bg-[#18181b] text-white">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-4 animate-fade-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className="relative group">
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl transition-all duration-200 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white ml-auto shadow-lg'
                          : 'bg-zinc-800 text-white border border-zinc-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">{message.content}</p>
                      
                      {/* Message timestamp */}
                      <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-orange-100' : 'text-gray-400'}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {/* Message actions */}
                    {message.role === 'assistant' && (
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50"
                              onClick={() => copyMessage(message.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copy message</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50"
                              onClick={() => handleReaction(message.id, 'thumbsUp')}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Helpful</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50"
                              onClick={() => handleReaction(message.id, 'thumbsDown')}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Not helpful</TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-4 justify-start animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center animate-pulse-soft">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-fade-in"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-fade-in" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-fade-in" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick Actions */}
          {showQuickActions && messages.length === 1 && (
            <div className="p-4 border-t bg-zinc-900/80">
              <div className="text-sm font-medium text-gray-300 mb-3">Quick Actions:</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs h-auto p-2 hover:bg-orange-900 hover:border-orange-400 bg-zinc-800 text-white border-zinc-700"
                    onClick={() => handleSendMessage(action.prompt)}
                  >
                    <action.icon className="h-3 w-3 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 border-t bg-gradient-to-r from-zinc-900 to-zinc-800">
            <div className="flex gap-3">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about admissions, requirements, or application advice..."
                disabled={isLoading}
                className="flex-1 border-zinc-700 focus:border-orange-500 focus:ring-orange-500/20 bg-zinc-800 text-white placeholder-gray-400"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default AIChat;

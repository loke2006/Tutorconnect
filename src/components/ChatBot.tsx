import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. I can help you find the perfect tutor, answer questions about our platform, or guide you through the signup process. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('tutor') && (lowerMessage.includes('find') || lowerMessage.includes('search'))) {
      return 'To find a tutor, visit our "Find Tutors" page where you can search by subject, location, and price range. You can also filter by home tutors or online tutors based on your preference.';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return 'Our platform offers the first 3 months FREE for all users! After that: Students pay ₹10/month, Home Tutors pay ₹150/month, and Online Tutors pay ₹250/month. Tutors set their own session rates.';
    }
    
    if (lowerMessage.includes('signup') || lowerMessage.includes('register') || lowerMessage.includes('join')) {
      return 'To join our platform, choose your role (Student, Home Tutor, or Online Tutor) from the homepage. You\'ll need to verify your phone number via OTP and upload relevant documents for verification.';
    }
    
    if (lowerMessage.includes('verify') || lowerMessage.includes('verification')) {
      return 'All users must complete OTP verification and document verification. This ensures the safety and authenticity of our platform. Once verified by our admin, your profile will go live.';
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return 'We use Razorpay for secure payments. After your 3-month free trial, payments are processed monthly. Tutors receive payments directly from students through our secure platform.';
    }
    
    if (lowerMessage.includes('subject')) {
      return 'We offer tutors for all subjects including Mathematics, Physics, Chemistry, Biology, English, Computer Science, Economics, Languages, and more. Use the search filters to find tutors for your specific needs.';
    }
    
    if (lowerMessage.includes('dashboard')) {
      return 'Once you sign up and log in, you\'ll have access to your personalized dashboard where you can manage bookings, track progress, view schedules, and handle payments.';
    }
    
    if (lowerMessage.includes('home tutor') || lowerMessage.includes('offline')) {
      return 'Home tutors provide in-person teaching at your location. They charge ₹150/month platform fee after the trial period and can set their own session rates. Perfect for hands-on learning!';
    }
    
    if (lowerMessage.includes('online tutor')) {
      return 'Online tutors teach via video calls, offering flexibility and global reach. They pay ₹250/month after the trial period. Great for learning from anywhere with expert tutors worldwide!';
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I can help you with: Finding tutors, Understanding pricing, Registration process, Verification requirements, Payment queries, Platform features, and more. What would you like to know?';
    }
    
    return 'I\'m here to help! You can ask me about finding tutors, pricing, registration, verification, or any other questions about our platform. How can I assist you?';
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg",
          "bg-gradient-primary hover:opacity-90 transition-all",
          isOpen && "scale-0"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <Card
        className={cn(
          "fixed bottom-6 right-6 z-50 w-96 h-[600px] shadow-2xl transition-all duration-300",
          "flex flex-col",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            size="icon"
            variant="ghost"
            className="hover:bg-white/20 text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.sender === 'user' && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.sender === 'bot' ? "bg-primary/10" : "bg-secondary/10"
                  )}
                >
                  {message.sender === 'bot' ? (
                    <Bot className="w-5 h-5 text-primary" />
                  ) : (
                    <User className="w-5 h-5 text-secondary" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg p-3",
                    message.sender === 'bot'
                      ? "bg-muted"
                      : "bg-gradient-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Powered by AI • Instant responses
          </p>
        </div>
      </Card>
    </>
  );
};

export default ChatBot;
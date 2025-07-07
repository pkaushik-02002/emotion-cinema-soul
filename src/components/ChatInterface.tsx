
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Bot, User } from 'lucide-react';
import { Movie } from '@/types/movie';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  movies: Movie[];
  mood: string;
  onClose: () => void;
}

export const ChatInterface = ({ movies, mood, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi! I'm here to help you with any questions about the movies I recommended based on your mood: "${mood}". Feel free to ask me anything - like whether a movie is suitable for kids, where you can watch it, or if you want more details about the plot! 🍿`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = userMessage.toLowerCase();
    
    // Simple response logic based on keywords
    if (lowerMessage.includes('kid') || lowerMessage.includes('child') || lowerMessage.includes('family')) {
      const familyMovies = movies.filter(m => m.genres.includes('Family') || m.genres.includes('Animation'));
      if (familyMovies.length > 0) {
        return `Great question! From your recommendations, "${familyMovies[0].title}" is perfect for kids and families. It's rated highly and has wholesome content that both kids and adults will enjoy. The other movies might be better suited for older audiences. 👨‍👩‍👧‍👦`;
      }
      return "Most of these movies are suitable for older teens and adults, but I'd recommend checking the specific ratings to be sure they match what you're comfortable with for younger viewers. 🎬";
    }
    
    if (lowerMessage.includes('netflix') || lowerMessage.includes('streaming') || lowerMessage.includes('watch') || lowerMessage.includes('where')) {
      return "That's a great question! Availability changes often, but you can typically find these movies on various streaming platforms like Netflix, Amazon Prime, Disney+, or Hulu. I'd recommend checking JustWatch or your streaming service's search to see what's currently available in your region. 📺";
    }
    
    if (lowerMessage.includes('comedy') || lowerMessage.includes('funny') || lowerMessage.includes('laugh')) {
      const comedies = movies.filter(m => m.genres.includes('Comedy'));
      if (comedies.length > 0) {
        return `If you're looking for laughs, "${comedies[0].title}" is your best bet from these recommendations! It's got great comedic moments while still fitting your current mood. The humor is clever and heartwarming. 😄`;
      }
      return "While these movies weren't specifically chosen for comedy, they each have their own charm and lighter moments that should lift your spirits in different ways! 😊";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('cry') || lowerMessage.includes('emotional')) {
      return "I understand you might be looking for something emotionally resonant. These movies were chosen to match your mood - some might make you feel understood, others might help lift you up. Sometimes a good cry can be really healing, and these films handle emotions with care and wisdom. 💙";
    }
    
    if (lowerMessage.includes('more') || lowerMessage.includes('other') || lowerMessage.includes('different')) {
      return "I'd love to suggest more movies! If you tell me what specific elements you're looking for (maybe a different genre, time period, or emotional tone), I can tailor new recommendations. Or feel free to share how your mood has shifted - I'm here to help you find exactly what you need right now. ✨";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('great') || lowerMessage.includes('perfect')) {
      return "You're so welcome! I'm thrilled I could help you find something that feels right for how you're feeling. Movies have this amazing power to meet us exactly where we are emotionally. Enjoy your viewing, and feel free to come back anytime you need new recommendations! 🌟";
    }

    // Default friendly response
    const responses = [
      "That's a thoughtful question! These movies were carefully chosen to match your emotional needs right now. Each one offers something special - whether it's comfort, inspiration, or just a good story to get lost in. What specifically interests you most about them? 🎭",
      "I love that you're curious about these recommendations! Movies can be such personal experiences, and I tried to pick ones that would resonate with how you're feeling. Is there a particular aspect of any of these films you'd like to know more about? 🎬",
      "Great question! I'm here to help you make the perfect choice for your movie night. These recommendations were tailored specifically for your current mood, so each one should offer something meaningful for you right now. What would help you decide? 🍿"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, I had trouble processing that. Could you try asking in a different way? I'm here to help! 😊",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Movie Assistant</h3>
              <p className="text-sm text-slate-500">Ask me anything about your recommendations</p>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm" 
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isUser 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              }`}>
                {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={`flex-1 ${message.isUser ? 'text-right' : ''}`}>
                <div
                  className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-indigo-500 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-800 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex space-x-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about these movies..."
              className="flex-1 rounded-xl border-slate-200 focus:border-indigo-300"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

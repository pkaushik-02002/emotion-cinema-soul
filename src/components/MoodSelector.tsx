
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSubmit: (mood: string) => void;
}

const moodEmojis = [
  { emoji: '😢', label: 'Sad', mood: 'feeling sad and need something uplifting' },
  { emoji: '😴', label: 'Tired', mood: 'feeling tired and want something peaceful' },
  { emoji: '🤩', label: 'Excited', mood: 'feeling excited and want something energetic' },
  { emoji: '🫶', label: 'Loved', mood: 'feeling loved and want something heartwarming' },
  { emoji: '🤯', label: 'Overwhelmed', mood: 'feeling overwhelmed and need something calming' },
  { emoji: '😊', label: 'Happy', mood: 'feeling happy and want something fun' },
  { emoji: '🥺', label: 'Emotional', mood: 'feeling emotional and want something meaningful' },
  { emoji: '⚡', label: 'Energetic', mood: 'feeling energetic and want something action-packed' },
];

export const MoodSelector = ({ onMoodSubmit }: MoodSelectorProps) => {
  const [customMood, setCustomMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmojiSelect = async (mood: string) => {
    setIsLoading(true);
    await onMoodSubmit(mood);
    setIsLoading(false);
  };

  const handleCustomSubmit = async () => {
    if (!customMood.trim()) return;
    setIsLoading(true);
    await onMoodSubmit(customMood);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Emoji Selection */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-lg">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
          Pick your mood
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moodEmojis.map(({ emoji, label, mood }) => (
            <button
              key={label}
              onClick={() => handleEmojiSelect(mood)}
              disabled={isLoading}
              className="group flex flex-col items-center p-4 rounded-2xl bg-white/50 hover:bg-white/80 border border-white/30 hover:border-indigo-200 transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {emoji}
              </span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Text Input */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-lg">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
          Or tell me in your own words
        </h3>
        
        <div className="space-y-4">
          <Textarea
            placeholder="I'm feeling... (e.g., 'I had a rough day and need something comforting' or 'I'm in the mood for something that will make me laugh')"
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
            className="min-h-[100px] text-lg bg-white/50 border-white/30 focus:border-indigo-300 rounded-xl resize-none"
            disabled={isLoading}
          />
          
          <Button
            onClick={handleCustomSubmit}
            disabled={!customMood.trim() || isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Finding perfect movies...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Get My Recommendations</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      <div className="text-center text-slate-500">
        <p className="text-sm">
          ✨ I'll suggest movies that perfectly match how you're feeling right now
        </p>
      </div>
    </div>
  );
};

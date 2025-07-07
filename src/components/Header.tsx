
import { Heart, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Mood<span className="text-indigo-600">Flix</span>
            </h1>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-200 hover:scale-105">
            <Heart className="w-4 h-4" />
            <span className="font-medium">Favorites</span>
          </button>
        </div>
      </div>
    </header>
  );
};

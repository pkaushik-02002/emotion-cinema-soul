
import { useState } from 'react';
import { MovieCard } from './MovieCard';
import { Button } from '@/components/ui/button';
import { MessageCircle, RefreshCcw } from 'lucide-react';
import { Movie } from '@/types/movie';

interface MovieRecommendationsProps {
  movies: Movie[];
  mood: string;
  onStartChat: () => void;
}

export const MovieRecommendations = ({ movies, mood, onStartChat }: MovieRecommendationsProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (movieId: number) => {
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Perfect movies for your mood
        </h2>
        <p className="text-lg text-slate-600 mb-6">
          Based on "{mood}", here are some films I think you'll love
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onStartChat}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask me anything about these movies
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try different mood
          </Button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <MovieCard
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={() => toggleFavorite(movie.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {movies.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
          <p className="text-lg text-slate-600">Finding the perfect movies for you...</p>
        </div>
      )}
    </div>
  );
};


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Play, Star, Calendar } from 'lucide-react';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const watchTrailer = () => {
    // Simulate trailer action - in real app would open trailer modal or redirect
    console.log(`Playing trailer for ${movie.title}`);
    alert(`🎬 Opening trailer for "${movie.title}"!\n\nIn a real app, this would open the movie trailer.`);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/80 text-slate-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <Button
            onClick={watchTrailer}
            className="bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 transform scale-90 hover:scale-100 transition-all duration-200"
          >
            <Play className="w-6 h-6 fill-current" />
          </Button>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-6 space-y-4">
        {/* Title and Rating */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 leading-tight">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{movie.rating}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{movie.releaseYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Mood Reason */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            💝 {movie.reason}
          </p>
        </div>

        {/* Overview */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {movie.overview}
        </p>

        {/* Action Button */}
        <Button
          onClick={watchTrailer}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
        >
          <Play className="w-4 h-4 mr-2 fill-current" />
          Watch Trailer
        </Button>
      </div>
    </div>
  );
};

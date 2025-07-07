
import { useState } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { MovieRecommendations } from '@/components/MovieRecommendations';
import { ChatInterface } from '@/components/ChatInterface';
import { Header } from '@/components/Header';
import { Movie } from '@/types/movie';

const Index = () => {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleMoodSubmit = async (mood: string) => {
    setCurrentMood(mood);
    setShowRecommendations(true);
    
    // Simulate AI movie recommendations based on mood
    const mockMovies = await generateMockRecommendations(mood);
    setMovies(mockMovies);
  };

  const generateMockRecommendations = async (mood: string): Promise<Movie[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const moodMovies = {
      sad: [
        {
          id: 1,
          title: "The Pursuit of Happyness",
          overview: "A touching story about perseverance and hope that will remind you that tough times don't last forever.",
          genres: ["Drama", "Biography"],
          rating: 8.0,
          releaseYear: 2006,
          poster: "https://images.unsplash.com/photo-1489599735188-1edf7d59e22e?w=300&h=450&fit=crop",
          reason: "A beautiful reminder that hope can bloom even in the darkest moments"
        },
        {
          id: 2,
          title: "Inside Out",
          overview: "An animated masterpiece that helps you understand and embrace all your emotions, including sadness.",
          genres: ["Animation", "Family", "Comedy"],
          rating: 8.1,
          releaseYear: 2015,
          poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
          reason: "Teaches us that it's okay to feel sad and that all emotions have value"
        }
      ],
      happy: [
        {
          id: 3,
          title: "Paddington",
          overview: "A delightfully warm and funny film about kindness, family, and marmalade sandwiches.",
          genres: ["Family", "Comedy", "Adventure"],
          rating: 8.2,
          releaseYear: 2014,
          poster: "https://images.unsplash.com/photo-1478720568477-b2709d1d7aec?w=300&h=450&fit=crop",
          reason: "Pure joy and whimsy that will keep your spirits soaring"
        },
        {
          id: 4,
          title: "The Grand Budapest Hotel",
          overview: "Wes Anderson's whimsical masterpiece full of colorful characters and delightful adventures.",
          genres: ["Comedy", "Adventure", "Crime"],
          rating: 8.1,
          releaseYear: 2014,
          poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
          reason: "Visually stunning and charmingly eccentric - perfect for a good mood"
        }
      ],
      stressed: [
        {
          id: 5,
          title: "Studio Ghibli Collection",
          overview: "Peaceful, magical worlds that transport you away from everyday worries.",
          genres: ["Animation", "Fantasy", "Family"],
          rating: 8.5,
          releaseYear: 2001,
          poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
          reason: "Soothing animation and gentle storytelling to calm your mind"
        }
      ],
      excited: [
        {
          id: 6,
          title: "Spider-Man: Into the Spider-Verse",
          overview: "An innovative animated adventure that matches your energy with spectacular visuals and heart.",
          genres: ["Animation", "Action", "Adventure"],
          rating: 8.4,
          releaseYear: 2018,
          poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
          reason: "High-energy storytelling with incredible visual creativity"
        }
      ]
    };

    // Simple mood matching logic
    const lowerMood = mood.toLowerCase();
    if (lowerMood.includes('sad') || lowerMood.includes('down') || lowerMood.includes('upset')) {
      return moodMovies.sad;
    } else if (lowerMood.includes('happy') || lowerMood.includes('good') || lowerMood.includes('great')) {
      return moodMovies.happy;
    } else if (lowerMood.includes('stress') || lowerMood.includes('overwhelm') || lowerMood.includes('tired')) {
      return moodMovies.stressed;
    } else if (lowerMood.includes('excit') || lowerMood.includes('energy') || lowerMood.includes('pump')) {
      return moodMovies.excited;
    } else {
      return [...moodMovies.happy, ...moodMovies.sad].slice(0, 3);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!showRecommendations ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                How are you
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  feeling today?
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Let me suggest the perfect movie to match your mood. 
                Whether you need comfort, joy, or adventure – I've got you covered.
              </p>
            </div>
            
            <MoodSelector onMoodSubmit={handleMoodSubmit} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <MovieRecommendations 
              movies={movies} 
              mood={currentMood}
              onStartChat={() => setShowChat(true)}
            />
            
            {showChat && (
              <ChatInterface 
                movies={movies} 
                mood={currentMood}
                onClose={() => setShowChat(false)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

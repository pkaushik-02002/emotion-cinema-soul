
export interface Movie {
  id: number;
  title: string;
  overview: string;
  genres: string[];
  rating: number;
  releaseYear: number;
  poster: string;
  reason: string;
  isFavorite?: boolean;
  language?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

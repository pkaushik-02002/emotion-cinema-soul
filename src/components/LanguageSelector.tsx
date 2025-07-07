
import { useState } from 'react';
import { Languages, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LanguageOption } from '@/types/movie';

const languages: LanguageOption[] = [
  { code: 'any', name: 'Any Language', flag: '🌍' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  showLanguageSelector: boolean;
  onToggleLanguageSelector: () => void;
}

export const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
  showLanguageSelector,
  onToggleLanguageSelector,
}: LanguageSelectorProps) => {
  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={onToggleLanguageSelector}
        className="w-full border-2 border-dashed border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-medium py-3 rounded-xl transition-all duration-200"
      >
        <Languages className="w-5 h-5 mr-2" />
        {showLanguageSelector ? 'Hide Language Options' : 'Choose Language (Optional)'}
      </Button>

      {showLanguageSelector && (
        <div className="animate-fade-in bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-slate-800">
              Movie Language Preference
            </h3>
          </div>
          
          <p className="text-sm text-slate-600 mb-4">
            Choose your preferred language for movie recommendations, or leave it as "Any Language" for diverse options.
          </p>

          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 rounded-lg">
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{selectedLang?.flag}</span>
                  <span>{selectedLang?.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-indigo-200 rounded-lg shadow-xl">
              {languages.map((language) => (
                <SelectItem
                  key={language.code}
                  value={language.code}
                  className="hover:bg-indigo-50 focus:bg-indigo-50 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

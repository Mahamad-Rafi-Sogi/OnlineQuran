import { forwardRef } from 'react';
import { Ayah } from '../types';

interface AyahRowProps {
  ayah: Ayah;
  kannadaText: string;  // English translation (reusing prop name)
  urduText: string;  // English transliteration (reusing prop name)
  englishTransliteration: string;  // Not used
  onPlayAudio: (audioUrl: string) => void;
  isPlaying: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  darkMode?: boolean;
  arabicFontSize?: number;
  translationFontSize?: number;
  isCurrentlyPlaying?: boolean;
}

const AyahRow = forwardRef<HTMLTableRowElement, AyahRowProps>(({
  ayah,
  kannadaText,
  urduText,
  onPlayAudio,
  isPlaying,
  isFavorite = false,
  onToggleFavorite,
  onCopy,
  onShare,
  darkMode = false,
  arabicFontSize = 28,
  translationFontSize = 16,
  isCurrentlyPlaying = false
}, ref) => {
  const handlePlay = () => {
    onPlayAudio(ayah.audio);
  };

  return (
    <tr 
      ref={ref}
      className={`border-b transition-all duration-300 ${
        darkMode 
          ? 'border-gray-700 hover:bg-gray-700/50' 
          : 'border-quran-gold/20 hover:bg-gradient-to-r hover:from-quran-green/5 hover:via-amber-50/50 hover:to-quran-green/5'
      } ${isCurrentlyPlaying ? (darkMode ? 'bg-quran-gold/20' : 'bg-quran-gold/10') : ''}`}
    >
      {/* Column 1: English Translation */}
      <td className={`p-3 md:p-5 text-left align-top border-r ${darkMode ? 'border-gray-700' : 'border-quran-gold/10'}`}>
        <div className={`font-serif leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} style={{ fontSize: `${translationFontSize}px` }}>
          {kannadaText}
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className={`text-xs px-2 py-1 rounded transition-all ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
          {onCopy && (
            <button
              onClick={onCopy}
              className={`text-xs px-2 py-1 rounded transition-all ${
                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-quran-gold hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-quran-gold hover:text-white'
              }`}
              title="Copy verse"
            >
              📋
            </button>
          )}
          {onShare && (
            <button
              onClick={onShare}
              className={`text-xs px-2 py-1 rounded transition-all ${
                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
              }`}
              title="Share verse"
            >
              🔗
            </button>
          )}
        </div>
      </td>

      {/* Column 2: English Transliteration */}
      <td className={`p-3 md:p-5 text-left align-top border-r ${darkMode ? 'border-gray-700' : 'border-quran-gold/10'}`}>
        <div className={`font-serif italic leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontSize: `${translationFontSize}px` }}>
          {urduText}
        </div>
      </td>

      {/* Column 3: Arabic Uthmani */}
      <td className={`p-3 md:p-5 text-right align-top ${darkMode ? 'bg-gray-700/30' : 'bg-gradient-to-l from-amber-50/30 to-transparent'}`} dir="rtl">
        <div className="flex items-start justify-end gap-2 md:gap-3">
          <div className="arabic-text text-quran-green leading-loose" style={{ fontSize: `${arabicFontSize}px`, textShadow: '1px 1px 2px rgba(6, 78, 59, 0.05)' }}>
            {ayah.text}
            {/* Ayah end symbol with number */}
            <span className="inline-flex items-center justify-center w-7 h-7 md:w-9 md:h-9 mx-1 md:mx-2 text-xs md:text-sm font-bold text-white rounded-full bg-gradient-to-br from-quran-gold to-amber-600 shadow-lg border-2 border-white">
              {ayah.numberInSurah}
            </span>
          </div>
          
          {/* Play Audio Button */}
          <button
            onClick={handlePlay}
            disabled={!ayah.audio}
            className={`flex-shrink-0 p-2 md:p-3 rounded-full transition-all duration-300 shadow-md ${
              isPlaying
                ? 'bg-gradient-to-br from-quran-gold to-amber-600 text-white scale-110 shadow-lg'
                : 'bg-gradient-to-br from-quran-green to-emerald-700 text-white hover:from-quran-gold hover:to-amber-600 hover:scale-110'
            } ${!ayah.audio ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={isPlaying ? "Pause Audio" : "Play Audio"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
});

AyahRow.displayName = 'AyahRow';

export default AyahRow;

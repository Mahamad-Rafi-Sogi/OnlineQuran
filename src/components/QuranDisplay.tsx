import React, { useState, useEffect, useRef } from 'react';
import AyahRow from './AyahRow';
import Loading from './Loading';
import {
  Ayah,
  ApiResponse,
  API_BASE_URL,
  SURAH_VERSE_COUNTS,
  SURAH_LIST,
  FavoriteVerse,
  RECITERS,
  TRANSLATIONS
} from '../types';

const QuranDisplay: React.FC = () => {
  const [arabicAyahs, setArabicAyahs] = useState<Ayah[]>([]);
  const [englishTranslationAyahs, setEnglishTranslationAyahs] = useState<Ayah[]>([]);
  const [englishTranslitAyahs, setEnglishTranslitAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [surahNumber, setSurahNumber] = useState(() => {
    const saved = localStorage.getItem('lastReadSurah');
    return saved ? parseInt(saved) : 1;
  });
  const [audioElement] = useState(new Audio());
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState<string | null>(null);
  const [isPlayingFullSurah, setIsPlayingFullSurah] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number>(-1);
  
  // New state for features
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [arabicFontSize] = useState(() => {
    const saved = localStorage.getItem('arabicFontSize');
    return saved ? parseInt(saved) : 28;
  });
  const [translationFontSize] = useState(() => {
    const saved = localStorage.getItem('translationFontSize');
    return saved ? parseInt(saved) : 16;
  });
  const [selectedReciter, setSelectedReciter] = useState(() => {
    const saved = localStorage.getItem('selectedReciter');
    return saved || 'ar.alafasy';
  });
  const [selectedTranslation, setSelectedTranslation] = useState(() => {
    const saved = localStorage.getItem('selectedTranslation');
    return saved || 'en.asad';
  });
  const [favorites, setFavorites] = useState<FavoriteVerse[]>(() => {
    const saved = localStorage.getItem('favoriteVerses');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Save last read position
    localStorage.setItem('lastReadSurah', surahNumber.toString());
    fetchQuranData();
    // Cleanup: stop audio when changing surah
    return () => {
      audioElement.pause();
      setCurrentPlayingAudio(null);
      setIsPlayingFullSurah(false);
      setCurrentAyahIndex(-1);
    };
  }, [surahNumber, selectedReciter, selectedTranslation]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('arabicFontSize', arabicFontSize.toString());
    localStorage.setItem('translationFontSize', translationFontSize.toString());
    localStorage.setItem('selectedReciter', selectedReciter);
    localStorage.setItem('selectedTranslation', selectedTranslation);
    localStorage.setItem('favoriteVerses', JSON.stringify(favorites));
  }, [darkMode, arabicFontSize, translationFontSize, selectedReciter, selectedTranslation, favorites]);

  // Auto-scroll to currently playing ayah
  useEffect(() => {
    if (currentAyahIndex >= 0 && ayahRefs.current[currentAyahIndex]) {
      ayahRefs.current[currentAyahIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentAyahIndex]);

  // Handle auto-play next ayah when playing full surah
  useEffect(() => {
    const handleAudioEnded = () => {
      if (isPlayingFullSurah && currentAyahIndex < arabicAyahs.length - 1) {
        // Play next ayah
        const nextIndex = currentAyahIndex + 1;
        setCurrentAyahIndex(nextIndex);
        const nextAudio = arabicAyahs[nextIndex]?.audio;
        if (nextAudio) {
          audioElement.src = nextAudio;
          audioElement.play();
          setCurrentPlayingAudio(nextAudio);
        }
      } else if (isPlayingFullSurah && currentAyahIndex >= arabicAyahs.length - 1) {
        // Finished playing entire surah
        setIsPlayingFullSurah(false);
        setCurrentAyahIndex(-1);
        setCurrentPlayingAudio(null);
      } else {
        setCurrentPlayingAudio(null);
      }
    };

    audioElement.addEventListener('ended', handleAudioEnded);
    return () => {
      audioElement.removeEventListener('ended', handleAudioEnded);
    };
  }, [isPlayingFullSurah, currentAyahIndex, arabicAyahs, audioElement]);

  const fetchQuranData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel for faster loading
      const [arabicResponse, englishTranslationResponse, englishTranslitResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/surah/${surahNumber}/editions/quran-uthmani,${selectedReciter}`),
        fetch(`${API_BASE_URL}/surah/${surahNumber}/${selectedTranslation}`),
        fetch(`${API_BASE_URL}/surah/${surahNumber}/en.transliteration`)
      ]);
      
      if (!arabicResponse.ok) {
        throw new Error('Failed to fetch Arabic text');
      }

      const arabicData: { code: number; status: string; data: ApiResponse['data'][] } = 
        await arabicResponse.json();

      // Extract ayahs
      const arabicAyahsData = arabicData.data[0].ayahs;
      const audioData = arabicData.data[1].ayahs;
      
      let englishTranslationData: Ayah[] = [];
      if (englishTranslationResponse.ok) {
        const englishData: ApiResponse = await englishTranslationResponse.json();
        englishTranslationData = englishData.data.ayahs;
      }
      
      let englishTranslitData: Ayah[] = [];
      if (englishTranslitResponse.ok) {
        const englishData: ApiResponse = await englishTranslitResponse.json();
        englishTranslitData = englishData.data.ayahs;
      }

      // Merge audio URLs with Arabic ayahs
      const mergedArabicAyahs = arabicAyahsData.map((ayah, index) => ({
        ...ayah,
        audio: audioData[index]?.audio || ''
      }));

      setArabicAyahs(mergedArabicAyahs);
      setEnglishTranslationAyahs(englishTranslationData);
      setEnglishTranslitAyahs(englishTranslitData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching Quran data:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (ayahNumber: number) => {
    const existing = favorites.find(
      f => f.surahNumber === surahNumber && f.ayahNumber === ayahNumber
    );
    
    if (existing) {
      setFavorites(favorites.filter(f => !(f.surahNumber === surahNumber && f.ayahNumber === ayahNumber)));
    } else {
      setFavorites([...favorites, { surahNumber, ayahNumber, timestamp: Date.now() }]);
    }
  };

  const isFavorite = (ayahNumber: number) => {
    return favorites.some(f => f.surahNumber === surahNumber && f.ayahNumber === ayahNumber);
  };

  const copyVerse = (ayahNumber: number) => {
    const arabic = arabicAyahs.find(a => a.numberInSurah === ayahNumber);
    const translation = englishTranslationAyahs.find(a => a.numberInSurah === ayahNumber);
    const transliteration = englishTranslitAyahs.find(a => a.numberInSurah === ayahNumber);
    
    const text = `
${arabic?.text || ''}

${transliteration?.text || ''}

${translation?.text || ''}

— Quran ${surahNumber}:${ayahNumber}
    `.trim();
    
    navigator.clipboard.writeText(text).then(() => {
      alert('Verse copied to clipboard! ✅');
    });
  };

  const shareVerse = (ayahNumber: number) => {
    const arabic = arabicAyahs.find(a => a.numberInSurah === ayahNumber);
    const translation = englishTranslationAyahs.find(a => a.numberInSurah === ayahNumber);
    
    const text = `${arabic?.text || ''}\n\n${translation?.text || ''}\n\n— Quran ${surahNumber}:${ayahNumber}`;
    const url = `${window.location.origin}?surah=${surahNumber}&ayah=${ayahNumber}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Quran ${surahNumber}:${ayahNumber}`,
        text: text,
        url: url
      });
    } else {
      copyVerse(ayahNumber);
    }
  };

  const playAudio = (audioUrl: string) => {
    if (!audioUrl) return;

    // If same audio is playing, pause it
    if (currentPlayingAudio === audioUrl) {
      audioElement.pause();
      setCurrentPlayingAudio(null);
      setIsPlayingFullSurah(false);
      setCurrentAyahIndex(-1);
    } else {
      // Stop full surah playback if active
      setIsPlayingFullSurah(false);
      setCurrentAyahIndex(-1);
      
      // Play new audio
      audioElement.src = audioUrl;
      audioElement.play().catch(err => {
        console.error('Error playing audio:', err);
      });
      setCurrentPlayingAudio(audioUrl);
    }
  };

  const playFullSurah = () => {
    if (isPlayingFullSurah) {
      // Stop playing
      audioElement.pause();
      setIsPlayingFullSurah(false);
      setCurrentAyahIndex(-1);
      setCurrentPlayingAudio(null);
    } else {
      // Start playing from first ayah
      if (arabicAyahs.length > 0 && arabicAyahs[0].audio) {
        setIsPlayingFullSurah(true);
        setCurrentAyahIndex(0);
        audioElement.src = arabicAyahs[0].audio;
        audioElement.play().catch(err => {
          console.error('Error playing audio:', err);
          setIsPlayingFullSurah(false);
        });
        setCurrentPlayingAudio(arabicAyahs[0].audio);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-quran-parchment'}`}>
        <div className={`p-8 text-center rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <div className="mb-4 text-6xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold text-red-600">Error Loading Quran</h2>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{error}</p>
          <button
            onClick={fetchQuranData}
            className="px-6 py-2 mt-4 text-white transition-colors rounded-lg bg-quran-green hover:bg-quran-gold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filter ayahs based on search and favorites
  const filteredAyahs = arabicAyahs.filter((ayah, index) => {
    const matchesFavorite = !showFavoritesOnly || isFavorite(ayah.numberInSurah);
    const matchesSearch = !searchQuery || 
      arabicAyahs[index]?.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      englishTranslationAyahs[index]?.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      englishTranslitAyahs[index]?.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFavorite && matchesSearch;
  });

  return (
    <div className={`min-h-screen py-4 md:py-8 relative overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : ''
    }`} style={{
      background: darkMode ? '#111827' : 'linear-gradient(135deg, #fdfbf7 0%, #f5efe0 25%, #faf6e8 50%, #f0e8d3 75%, #fdfbf7 100%)'
    }}>
      {/* Islamic Pattern Overlay - Star Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23064e3b' fill-opacity='1'%3E%3Cpath d='M30 0l5 15h15l-12 9 5 15-13-9-13 9 5-15-12-9h15z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>
      
      {/* Subtle radial gradients for depth */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 20% 30%, rgba(6, 78, 59, 0.04) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(217, 119, 6, 0.04) 0%, transparent 40%)'
      }}></div>
      
      <div className="container px-2 sm:px-4 mx-auto max-w-7xl relative z-10">
        {/* Decorative Header */}
        <header className="mb-6 md:mb-10 text-center">
          {/* Decorative top border */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-quran-gold to-transparent"></div>
            <span className="px-2 md:px-4 text-xl md:text-2xl text-quran-gold">✦</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-quran-gold to-transparent"></div>
          </div>
          
          <div className="flex justify-center items-center mb-3 md:mb-4">
            <h1 className="text-5xl md:text-7xl font-bold text-quran-green leading-tight px-6 py-2 rounded-lg bg-gradient-to-r from-transparent via-amber-50/50 to-transparent" style={{ fontFamily: "'Amiri Quran', serif", textShadow: '3px 3px 6px rgba(6, 78, 59, 0.15)', direction: 'rtl', letterSpacing: '0.08em' }}>
              القرآن الكريم
            </h1>
          </div>
          <h2 className="mb-6 md:mb-8 text-2xl md:text-4xl font-serif text-quran-gold leading-tight tracking-wider" style={{ textShadow: '2px 2px 4px rgba(217, 119, 6, 0.25)', fontWeight: 600 }}>
            The Holy Quran
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <span className="text-quran-gold text-lg md:text-xl">◈</span>
            <div className="w-12 md:w-16 h-px mx-2 md:mx-3 bg-gradient-to-r from-quran-gold/50 to-quran-gold"></div>
            <span className="text-xl md:text-2xl text-quran-green">☪</span>
            <div className="w-12 md:w-16 h-px mx-2 md:mx-3 bg-gradient-to-l from-quran-gold/50 to-quran-gold"></div>
            <span className="text-quran-gold text-lg md:text-xl">◈</span>
          </div>
          
          {/* Surah Selector */}
          <div className="mb-4 md:mb-6">
            <select
              value={surahNumber}
              onChange={(e) => setSurahNumber(Number(e.target.value))}
              className={`w-full max-w-md px-4 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold border-2 rounded-xl ${
                darkMode 
                  ? 'bg-gray-800 text-white border-quran-gold' 
                  : 'bg-white text-quran-green border-quran-green'
              } hover:border-quran-gold focus:outline-none focus:ring-4 focus:ring-quran-gold/30 transition-all shadow-lg cursor-pointer`}
            >
              {SURAH_LIST.map((surah) => (
                <option key={surah.number} value={surah.number}>
                  {surah.number}. {surah.name} - {surah.translation} ({SURAH_VERSE_COUNTS[surah.number]} verses)
                </option>
              ))}
            </select>
          </div>

          {/* Settings Panel */}
          <div className={`mb-4 md:mb-6 max-w-5xl mx-auto p-4 md:p-6 rounded-2xl shadow-lg border-2 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-quran-gold/20'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              
              {/* Audio Settings */}
              <div>
                <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${
                  darkMode ? 'text-quran-gold' : 'text-quran-green'
                }`}>
                  🎙️ Reciter
                </label>
                <select
                  value={selectedReciter}
                  onChange={(e) => setSelectedReciter(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-800 border-gray-300'
                  } hover:border-quran-gold focus:outline-none focus:border-quran-gold transition-all cursor-pointer`}
                >
                  {RECITERS.map(r => (
                    <option key={r.identifier} value={r.identifier}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Translation Settings */}
              <div>
                <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${
                  darkMode ? 'text-quran-gold' : 'text-quran-green'
                }`}>
                  📖 Translation
                </label>
                <select
                  value={selectedTranslation}
                  onChange={(e) => setSelectedTranslation(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border-2 ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-50 text-gray-800 border-gray-300'
                  } hover:border-quran-gold focus:outline-none focus:border-quran-gold transition-all cursor-pointer`}
                >
                  {TRANSLATIONS.map(t => (
                    <option key={t.identifier} value={t.identifier}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Display Settings */}
              <div>
                <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${
                  darkMode ? 'text-quran-gold' : 'text-quran-green'
                }`}>
                  ⚙️ Display
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                      darkMode 
                        ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                    title="Toggle Dark Mode"
                  >
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                  </button>
                  <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                      showFavoritesOnly 
                        ? 'bg-red-500 text-white' 
                        : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    title="Show Favorites Only"
                  >
                    {showFavoritesOnly ? '❤️' : '🤍'} Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4 md:mb-6 max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search verses..."
              className={`w-full px-4 py-3 text-base rounded-lg border-2 ${
                darkMode 
                  ? 'bg-gray-800 text-white border-quran-gold placeholder-gray-500' 
                  : 'bg-white text-gray-800 border-quran-green placeholder-gray-400'
              } focus:outline-none focus:ring-4 focus:ring-quran-gold/30 transition-all shadow`}
            />
          </div>

          <div className="inline-block px-6 md:px-10 py-4 md:py-5 text-base md:text-xl font-bold text-white rounded-3xl bg-gradient-to-r from-quran-green via-emerald-600 to-quran-green shadow-2xl border-2 border-quran-gold/40" style={{ boxShadow: '0 8px 20px rgba(6, 78, 59, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}>
            <div className="flex items-center justify-center gap-3">
              <span className="text-quran-gold text-2xl md:text-3xl">✦</span>
              <div>
                <div className="text-lg md:text-2xl font-extrabold tracking-wide">
                  Surah {surahNumber}: {SURAH_LIST[surahNumber - 1]?.name}
                </div>
                <div className="text-xs md:text-sm font-normal mt-1 text-emerald-100 tracking-wide">
                  {SURAH_LIST[surahNumber - 1]?.translation} • {SURAH_VERSE_COUNTS[surahNumber]} Verses • {SURAH_LIST[surahNumber - 1]?.revelationType}
                </div>
              </div>
              <span className="text-quran-gold text-2xl md:text-3xl">✦</span>
            </div>
          </div>
          
          {/* Play Full Surah Button with Navigation */}
          <div className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {/* Previous Surah Button */}
            <button
              onClick={() => {
                if (surahNumber > 1) {
                  setSurahNumber(surahNumber - 1);
                  setIsPlayingFullSurah(false);
                  setCurrentPlayingAudio(null);
                  audioElement.pause();
                }
              }}
              disabled={surahNumber === 1}
              className={`px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all duration-300 ${
                surahNumber === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800'
              }`}
              title="Previous Surah"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
                <span className="hidden md:inline">Previous</span>
              </span>
            </button>

            {/* Play Full Surah Button */}
            <button
              onClick={playFullSurah}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transition-all duration-300 ${
                isPlayingFullSurah
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                  : 'bg-gradient-to-r from-quran-gold to-amber-600 text-white hover:from-amber-600 hover:to-quran-gold'
              }`}
            >
              {isPlayingFullSurah ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  Stop Full Surah
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play Full Surah
                </span>
              )}
            </button>

            {/* Next Surah Button */}
            <button
              onClick={() => {
                if (surahNumber < 114) {
                  setSurahNumber(surahNumber + 1);
                  setIsPlayingFullSurah(false);
                  setCurrentPlayingAudio(null);
                  audioElement.pause();
                }
              }}
              disabled={surahNumber === 114}
              className={`px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all duration-300 ${
                surahNumber === 114
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800'
              }`}
              title="Next Surah"
            >
              <span className="flex items-center gap-2">
                <span className="hidden md:inline">Next</span>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </span>
            </button>
          </div>
          
          {/* Decorative bottom border */}
          <div className="flex items-center justify-center mt-6 md:mt-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-quran-gold to-transparent"></div>
            <span className="px-2 md:px-4 text-xl md:text-2xl text-quran-gold">✦</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-quran-gold to-transparent"></div>
          </div>
        </header>

        {/* Bismillah */}
        {surahNumber !== 9 && (
          <div className={`mb-6 md:mb-10 text-center p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-quran-gold/30 relative overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800' 
              : 'bg-gradient-to-br from-white via-amber-50/40 to-white'
          } backdrop-blur-sm`}>
            {/* Decorative corners */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-quran-gold/40 rounded-tl-lg"></div>
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-quran-gold/40 rounded-tr-lg"></div>
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-quran-gold/40 rounded-bl-lg"></div>
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-quran-gold/40 rounded-br-lg"></div>
            
            <div className="mb-5 md:mb-7 text-quran-gold text-2xl md:text-3xl">✦ ◈ ☪ ◈ ✦</div>
            <div className="flex justify-center items-center mb-5 md:mb-7">
              <p className="text-5xl md:text-7xl text-quran-green font-bold leading-loose px-4" style={{ fontFamily: "'Amiri Quran', serif", textShadow: '3px 3px 8px rgba(6, 78, 59, 0.2)', direction: 'rtl', letterSpacing: '0.1em' }}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            </div>
            <p className={`text-lg md:text-2xl italic font-serif leading-relaxed tracking-wide ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontWeight: 500 }}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
            <div className="mt-5 md:mt-7 text-quran-gold text-2xl md:text-3xl">✦ ◈ ☪ ◈ ✦</div>
          </div>
        )}

        {/* 3-Column Mushaf Layout */}
        <div className={`overflow-x-auto shadow-2xl rounded-3xl border-4 border-quran-gold/40 card-islamic relative ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-white via-amber-50/40 to-white'
        }`}>
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-quran-gold rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-quran-gold rounded-tr-3xl"></div>
          
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="text-white" style={{
                background: 'linear-gradient(90deg, #064e3b 0%, #047857 25%, #059669 50%, #047857 75%, #064e3b 100%)'
              }}>
                <th className="p-3 md:p-5 text-left font-serif text-sm md:text-lg w-[30%] border-r border-emerald-600">
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-quran-gold text-sm md:text-base">✦</span>
                    <div>
                      <div className="text-xs md:text-base">English Translation</div>
                      <span className="text-xs font-normal text-emerald-100 hidden md:inline">
                        ({TRANSLATIONS.find(t => t.identifier === selectedTranslation)?.name.split(' ')[0] || 'Translation'})
                      </span>
                    </div>
                  </div>
                </th>
                <th className="p-3 md:p-5 text-left font-serif text-sm md:text-lg w-[30%] border-r border-emerald-600">
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-quran-gold text-sm md:text-base">✦</span>
                    <div>
                      <div className="text-xs md:text-base">English Transliteration</div>
                      <span className="text-xs font-normal text-emerald-100 hidden md:inline">(Roman Script)</span>
                    </div>
                  </div>
                </th>
                <th className="p-3 md:p-5 text-right font-serif text-sm md:text-lg w-[40%]" dir="rtl">
                  <div className="flex items-center justify-end gap-1 md:gap-2">
                    <div>
                      <div className="text-xs md:text-base">النص العربي</div>
                      <span className="text-xs font-normal text-emerald-100 hidden md:inline">
                        ({RECITERS.find(r => r.identifier === selectedReciter)?.name.split(' ')[0] || 'Audio'})
                      </span>
                    </div>
                    <span className="text-quran-gold text-sm md:text-base">✦</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-white via-amber-50/20 to-white'}>
              {filteredAyahs.map((ayah) => {
                const originalIndex = arabicAyahs.findIndex(a => a.number === ayah.number);
                return (
                  <AyahRow
                    key={ayah.number}
                    ref={el => ayahRefs.current[originalIndex] = el}
                    ayah={ayah}
                    kannadaText={englishTranslationAyahs[originalIndex]?.text || 'Translation not available'}
                    urduText={englishTranslitAyahs[originalIndex]?.text || 'Not available'}
                    englishTransliteration={''}
                    onPlayAudio={playAudio}
                    isPlaying={currentPlayingAudio === ayah.audio}
                    isFavorite={isFavorite(ayah.numberInSurah)}
                    onToggleFavorite={() => toggleFavorite(ayah.numberInSurah)}
                    onCopy={() => copyVerse(ayah.numberInSurah)}
                    onShare={() => shareVerse(ayah.numberInSurah)}
                    darkMode={darkMode}
                    arabicFontSize={arabicFontSize}
                    translationFontSize={translationFontSize}
                    isCurrentlyPlaying={currentAyahIndex === originalIndex && isPlayingFullSurah}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="mt-6 md:mt-10 text-center">
          {/* Decorative divider */}
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-quran-gold to-transparent"></div>
            <span className="px-3 md:px-5 text-2xl md:text-3xl text-quran-gold">☪</span>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-quran-gold to-transparent"></div>
          </div>
          
          <div className="inline-block px-6 md:px-10 py-4 md:py-5 text-sm bg-gradient-to-br from-white via-amber-50/60 to-white backdrop-blur-sm rounded-2xl shadow-xl border-2 border-quran-gold/30">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-3">
              <span className="text-quran-gold text-2xl md:text-3xl">☪</span>
              <p className="font-bold text-quran-green text-base md:text-lg tracking-wide">Data Source: Al-Quran Cloud API</p>
              <span className="text-quran-gold text-2xl md:text-3xl">☪</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600 text-center">
              <span className="inline-block px-3 py-1.5 bg-quran-green/10 rounded-lg border border-quran-green/20">Arabic: Uthmani Script</span>
              <span className="mx-2 text-quran-gold text-lg">✦</span>
              <span className="inline-block px-3 py-1.5 bg-blue-100/80 rounded-lg border border-blue-300">English Translation & Transliteration</span>
              <span className="mx-2 text-quran-gold text-lg">✦</span>
              <span className="inline-block px-3 py-1.5 bg-quran-gold/10 rounded-lg border border-quran-gold/20">Audio: Mishary Rashid Alafasy</span>
            </p>
          </div>

          {/* Developer Credits */}
          <div className="mt-6 mb-4 px-4">
            <div className="inline-block bg-gradient-to-br from-quran-green/5 via-quran-gold/5 to-quran-green/5 rounded-2xl px-6 md:px-8 py-4 md:py-5 border-2 border-quran-gold/30 shadow-lg">
              <p className="text-sm md:text-base text-gray-700 mb-2">
                <span className="font-bold text-quran-green">Developed by:</span>{' '}
                <a 
                  href="https://mahamad-rafi-portfolio.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-quran-gold hover:text-amber-600 underline font-semibold transition-colors"
                >
                  Mahamad Rafi Sogi
                </a>
              </p>
              <p className="text-xs md:text-sm text-gray-600 mb-3 font-medium">© 2026 All Rights Reserved</p>
              
              {/* Contact Section */}
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-700">
                <span className="font-medium">Found an error? Contact us:</span>
                <a
                  href="https://wa.me/917975832709?text=Assalamualaikum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 duration-200"
                  title="Contact via WhatsApp - 7975832709"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-8 text-quran-green/70 text-sm md:text-base font-serif italic px-4 tracking-wide">
            <span className="text-quran-gold">✦</span> May Allah accept this effort and make it beneficial for all <span className="text-quran-gold">✦</span>
            <div className="mt-2 text-xs md:text-sm">Ameen</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default QuranDisplay;

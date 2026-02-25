// TypeScript interfaces for Quran data
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio: string;
  audioSecondary: string[];
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface FavoriteVerse {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
}

export interface ReciterOption {
  identifier: string;
  name: string;
  language: string;
}

export interface TranslationOption {
  identifier: string;
  name: string;
  language: string;
}

export interface TafsirOption {
  identifier: string;
  name: string;
  language: string;
}

// Available Reciters
export const RECITERS: ReciterOption[] = [
  { identifier: 'ar.alafasy', name: 'Mishary Rashid Alafasy', language: 'ar' },
  { identifier: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', language: 'ar' },
  { identifier: 'ar.abdurrahmaansudais', name: 'Abdurrahman As-Sudais', language: 'ar' },
  { identifier: 'ar.shaatree', name: 'Abu Bakr Ash-Shaatree', language: 'ar' },
  { identifier: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', language: 'ar' },
  { identifier: 'ar.minshawi', name: 'Mohamed Siddiq Al-Minshawi', language: 'ar' },
];

// Available Translations
export const TRANSLATIONS: TranslationOption[] = [
  { identifier: 'en.asad', name: 'Muhammad Asad', language: 'en' },
  { identifier: 'en.sahih', name: 'Sahih International', language: 'en' },
  { identifier: 'en.pickthall', name: 'Mohammed Marmaduke William Pickthall', language: 'en' },
  { identifier: 'en.yusufali', name: 'Abdullah Yusuf Ali', language: 'en' },
  { identifier: 'en.hilali', name: 'Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin Khan', language: 'en' },
  { identifier: 'ur.jalandhry', name: 'Fateh Muhammad Jalandhry (Urdu)', language: 'ur' },
];

// Available Tafsir (Explanations)
export const TAFSIRS: TafsirOption[] = [
  { identifier: 'en-tafisr-maududi', name: 'Tafhim al-Qur\'an (Maududi) - Detailed Context', language: 'en' },
  { identifier: 'en-tafsir-ibn-kathir', name: 'Tafsir Ibn Kathir - Classical Commentary', language: 'en' },
];

export interface QuranData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
  edition: Edition;
}

export interface ApiResponse {
  code: number;
  status: string;
  data: QuranData;
}

// Kannada transliteration for Al-Fatihah (Surah 1)
export const KANNADA_TRANSLITERATION: Record<number, string[]> = {
  1: [
    'ಬಿಸ್ಮಿಲ್ಲಾಹಿರ್-ರಹ್ಮಾನಿರ್-ರಹೀಮ್',
    'ಅಲ್ಹಮ್ದುಲಿಲ್ಲಾಹಿ ರಬ್ಬಿಲ್ ಆಲಮೀನ್',
    'ಅರ್-ರಹ್ಮಾನಿರ್-ರಹೀಮ್',
    'ಮಾಲಿಕಿ ಯವ್ಮಿದ್-ದೀನ್',
    'ಇಯ್ಯಾಕ ನಅ್ಬುದು ವ ಇಯ್ಯಾಕ ನಸ್ತಅೀನ್',
    'ಇಹ್ದಿನಸ್-ಸಿರಾತಲ್ ಮುಸ್ತಕೀಮ್',
    'ಸಿರಾತಲ್ಲಜೀನ ಅನ್ಅಮ್ತ ಅಲೈಹಿಮ್ ಘೈರಿಲ್ ಮಗ್ದೂಬಿ ಅಲೈಹಿಮ್ ವಲದ್-ದಾಲ್ಲೀನ್'
  ]
};

// Urdu transliteration (romanized Urdu meaning) for Al-Fatihah (Surah 1)
export const URDU_TRANSLITERATION: Record<number, string[]> = {
  1: [
    'Allah ke naam se jo bada meherbaan nihayat rahm wala hai',
    'Tamaam tareefein Allah hi ke liye hain jo tamaam jahano ka Rabb hai',
    'Bada meherbaan nihayat rahm wala',
    'Roz-e-jazaa ka malik hai',
    'Hum teri hi ibadat karte hain aur teri hi se madad chahte hain',
    'Hame seedha rasta dikha',
    'Un logon ka rasta jin par tune inam kiya, jin par tera ghazab nahin aur na wo gumrah hain'
  ]
};

// English transliteration for Al-Fatihah (Surah 1)
export const ENGLISH_TRANSLITERATION: Record<number, string[]> = {
  1: [
    'Bismillaahir-Rahmaanir-Raheem',
    'Al-Hamdu lillaahi Rabbil-\'Aalameen',
    'Ar-Rahmaanir-Raheem',
    'Maaliki Yawmid-Deen',
    'Iyyaaka na\'budu wa iyyaaka nasta\'een',
    'Ihdinas-Siraatal-Mustaqeem',
    'Siraatal-lazeena an\'amta \'alaihim ghairil-maghdoobi \'alaihim wa lad-daaalleen'
  ]
};

// Verification: Hardcoded verse counts for each Surah
export const SURAH_VERSE_COUNTS: Record<number, number> = {
  1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
  11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135,
  21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60,
  31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85,
  41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45,
  51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13,
  61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44,
  71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42,
  81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20,
  91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
  101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3,
  111: 5, 112: 4, 113: 5, 114: 6
};

// Complete list of all 114 Surahs
export const SURAH_LIST = [
  { number: 1, name: 'Al-Fatihah', translation: 'The Opening', revelationType: 'Meccan' },
  { number: 2, name: 'Al-Baqarah', translation: 'The Cow', revelationType: 'Medinan' },
  { number: 3, name: 'Ali \'Imran', translation: 'Family of Imran', revelationType: 'Medinan' },
  { number: 4, name: 'An-Nisa', translation: 'The Women', revelationType: 'Medinan' },
  { number: 5, name: 'Al-Ma\'idah', translation: 'The Table Spread', revelationType: 'Medinan' },
  { number: 6, name: 'Al-An\'am', translation: 'The Cattle', revelationType: 'Meccan' },
  { number: 7, name: 'Al-A\'raf', translation: 'The Heights', revelationType: 'Meccan' },
  { number: 8, name: 'Al-Anfal', translation: 'The Spoils of War', revelationType: 'Medinan' },
  { number: 9, name: 'At-Tawbah', translation: 'The Repentance', revelationType: 'Medinan' },
  { number: 10, name: 'Yunus', translation: 'Jonah', revelationType: 'Meccan' },
  { number: 11, name: 'Hud', translation: 'Hud', revelationType: 'Meccan' },
  { number: 12, name: 'Yusuf', translation: 'Joseph', revelationType: 'Meccan' },
  { number: 13, name: 'Ar-Ra\'d', translation: 'The Thunder', revelationType: 'Medinan' },
  { number: 14, name: 'Ibrahim', translation: 'Abraham', revelationType: 'Meccan' },
  { number: 15, name: 'Al-Hijr', translation: 'The Rocky Tract', revelationType: 'Meccan' },
  { number: 16, name: 'An-Nahl', translation: 'The Bee', revelationType: 'Meccan' },
  { number: 17, name: 'Al-Isra', translation: 'The Night Journey', revelationType: 'Meccan' },
  { number: 18, name: 'Al-Kahf', translation: 'The Cave', revelationType: 'Meccan' },
  { number: 19, name: 'Maryam', translation: 'Mary', revelationType: 'Meccan' },
  { number: 20, name: 'Taha', translation: 'Ta-Ha', revelationType: 'Meccan' },
  { number: 21, name: 'Al-Anbya', translation: 'The Prophets', revelationType: 'Meccan' },
  { number: 22, name: 'Al-Hajj', translation: 'The Pilgrimage', revelationType: 'Medinan' },
  { number: 23, name: 'Al-Mu\'minun', translation: 'The Believers', revelationType: 'Meccan' },
  { number: 24, name: 'An-Nur', translation: 'The Light', revelationType: 'Medinan' },
  { number: 25, name: 'Al-Furqan', translation: 'The Criterion', revelationType: 'Meccan' },
  { number: 26, name: 'Ash-Shu\'ara', translation: 'The Poets', revelationType: 'Meccan' },
  { number: 27, name: 'An-Naml', translation: 'The Ant', revelationType: 'Meccan' },
  { number: 28, name: 'Al-Qasas', translation: 'The Stories', revelationType: 'Meccan' },
  { number: 29, name: 'Al-\'Ankabut', translation: 'The Spider', revelationType: 'Meccan' },
  { number: 30, name: 'Ar-Rum', translation: 'The Romans', revelationType: 'Meccan' },
  { number: 31, name: 'Luqman', translation: 'Luqman', revelationType: 'Meccan' },
  { number: 32, name: 'As-Sajdah', translation: 'The Prostration', revelationType: 'Meccan' },
  { number: 33, name: 'Al-Ahzab', translation: 'The Combined Forces', revelationType: 'Medinan' },
  { number: 34, name: 'Saba', translation: 'Sheba', revelationType: 'Meccan' },
  { number: 35, name: 'Fatir', translation: 'Originator', revelationType: 'Meccan' },
  { number: 36, name: 'Ya-Sin', translation: 'Ya Sin', revelationType: 'Meccan' },
  { number: 37, name: 'As-Saffat', translation: 'Those who set the Ranks', revelationType: 'Meccan' },
  { number: 38, name: 'Sad', translation: 'The Letter Sad', revelationType: 'Meccan' },
  { number: 39, name: 'Az-Zumar', translation: 'The Troops', revelationType: 'Meccan' },
  { number: 40, name: 'Ghafir', translation: 'The Forgiver', revelationType: 'Meccan' },
  { number: 41, name: 'Fussilat', translation: 'Explained in Detail', revelationType: 'Meccan' },
  { number: 42, name: 'Ash-Shuraa', translation: 'The Consultation', revelationType: 'Meccan' },
  { number: 43, name: 'Az-Zukhruf', translation: 'The Ornaments of Gold', revelationType: 'Meccan' },
  { number: 44, name: 'Ad-Dukhan', translation: 'The Smoke', revelationType: 'Meccan' },
  { number: 45, name: 'Al-Jathiyah', translation: 'The Crouching', revelationType: 'Meccan' },
  { number: 46, name: 'Al-Ahqaf', translation: 'The Wind-Curved Sandhills', revelationType: 'Meccan' },
  { number: 47, name: 'Muhammad', translation: 'Muhammad', revelationType: 'Medinan' },
  { number: 48, name: 'Al-Fath', translation: 'The Victory', revelationType: 'Medinan' },
  { number: 49, name: 'Al-Hujurat', translation: 'The Rooms', revelationType: 'Medinan' },
  { number: 50, name: 'Qaf', translation: 'The Letter Qaf', revelationType: 'Meccan' },
  { number: 51, name: 'Adh-Dhariyat', translation: 'The Winnowing Winds', revelationType: 'Meccan' },
  { number: 52, name: 'At-Tur', translation: 'The Mount', revelationType: 'Meccan' },
  { number: 53, name: 'An-Najm', translation: 'The Star', revelationType: 'Meccan' },
  { number: 54, name: 'Al-Qamar', translation: 'The Moon', revelationType: 'Meccan' },
  { number: 55, name: 'Ar-Rahman', translation: 'The Beneficent', revelationType: 'Medinan' },
  { number: 56, name: 'Al-Waqi\'ah', translation: 'The Inevitable', revelationType: 'Meccan' },
  { number: 57, name: 'Al-Hadid', translation: 'The Iron', revelationType: 'Medinan' },
  { number: 58, name: 'Al-Mujadila', translation: 'The Pleading Woman', revelationType: 'Medinan' },
  { number: 59, name: 'Al-Hashr', translation: 'The Exile', revelationType: 'Medinan' },
  { number: 60, name: 'Al-Mumtahanah', translation: 'She that is to be examined', revelationType: 'Medinan' },
  { number: 61, name: 'As-Saf', translation: 'The Ranks', revelationType: 'Medinan' },
  { number: 62, name: 'Al-Jumu\'ah', translation: 'The Congregation', revelationType: 'Medinan' },
  { number: 63, name: 'Al-Munafiqun', translation: 'The Hypocrites', revelationType: 'Medinan' },
  { number: 64, name: 'At-Taghabun', translation: 'The Mutual Disillusion', revelationType: 'Medinan' },
  { number: 65, name: 'At-Talaq', translation: 'The Divorce', revelationType: 'Medinan' },
  { number: 66, name: 'At-Tahrim', translation: 'The Prohibition', revelationType: 'Medinan' },
  { number: 67, name: 'Al-Mulk', translation: 'The Sovereignty', revelationType: 'Meccan' },
  { number: 68, name: 'Al-Qalam', translation: 'The Pen', revelationType: 'Meccan' },
  { number: 69, name: 'Al-Haqqah', translation: 'The Reality', revelationType: 'Meccan' },
  { number: 70, name: 'Al-Ma\'arij', translation: 'The Ascending Stairways', revelationType: 'Meccan' },
  { number: 71, name: 'Nuh', translation: 'Noah', revelationType: 'Meccan' },
  { number: 72, name: 'Al-Jinn', translation: 'The Jinn', revelationType: 'Meccan' },
  { number: 73, name: 'Al-Muzzammil', translation: 'The Enshrouded One', revelationType: 'Meccan' },
  { number: 74, name: 'Al-Muddaththir', translation: 'The Cloaked One', revelationType: 'Meccan' },
  { number: 75, name: 'Al-Qiyamah', translation: 'The Resurrection', revelationType: 'Meccan' },
  { number: 76, name: 'Al-Insan', translation: 'The Man', revelationType: 'Medinan' },
  { number: 77, name: 'Al-Mursalat', translation: 'The Emissaries', revelationType: 'Meccan' },
  { number: 78, name: 'An-Naba', translation: 'The Tidings', revelationType: 'Meccan' },
  { number: 79, name: 'An-Nazi\'at', translation: 'Those who drag forth', revelationType: 'Meccan' },
  { number: 80, name: 'Abasa', translation: 'He Frowned', revelationType: 'Meccan' },
  { number: 81, name: 'At-Takwir', translation: 'The Overthrowing', revelationType: 'Meccan' },
  { number: 82, name: 'Al-Infitar', translation: 'The Cleaving', revelationType: 'Meccan' },
  { number: 83, name: 'Al-Mutaffifin', translation: 'The Defrauding', revelationType: 'Meccan' },
  { number: 84, name: 'Al-Inshiqaq', translation: 'The Sundering', revelationType: 'Meccan' },
  { number: 85, name: 'Al-Buruj', translation: 'The Mansions of the Stars', revelationType: 'Meccan' },
  { number: 86, name: 'At-Tariq', translation: 'The Nightcomer', revelationType: 'Meccan' },
  { number: 87, name: 'Al-A\'la', translation: 'The Most High', revelationType: 'Meccan' },
  { number: 88, name: 'Al-Ghashiyah', translation: 'The Overwhelming', revelationType: 'Meccan' },
  { number: 89, name: 'Al-Fajr', translation: 'The Dawn', revelationType: 'Meccan' },
  { number: 90, name: 'Al-Balad', translation: 'The City', revelationType: 'Meccan' },
  { number: 91, name: 'Ash-Shams', translation: 'The Sun', revelationType: 'Meccan' },
  { number: 92, name: 'Al-Layl', translation: 'The Night', revelationType: 'Meccan' },
  { number: 93, name: 'Ad-Duhaa', translation: 'The Morning Hours', revelationType: 'Meccan' },
  { number: 94, name: 'Ash-Sharh', translation: 'The Relief', revelationType: 'Meccan' },
  { number: 95, name: 'At-Tin', translation: 'The Fig', revelationType: 'Meccan' },
  { number: 96, name: 'Al-\'Alaq', translation: 'The Clot', revelationType: 'Meccan' },
  { number: 97, name: 'Al-Qadr', translation: 'The Power', revelationType: 'Meccan' },
  { number: 98, name: 'Al-Bayyinah', translation: 'The Clear Proof', revelationType: 'Medinan' },
  { number: 99, name: 'Az-Zalzalah', translation: 'The Earthquake', revelationType: 'Medinan' },
  { number: 100, name: 'Al-\'Adiyat', translation: 'The Courser', revelationType: 'Meccan' },
  { number: 101, name: 'Al-Qari\'ah', translation: 'The Calamity', revelationType: 'Meccan' },
  { number: 102, name: 'At-Takathur', translation: 'The Rivalry in world increase', revelationType: 'Meccan' },
  { number: 103, name: 'Al-\'Asr', translation: 'The Declining Day', revelationType: 'Meccan' },
  { number: 104, name: 'Al-Humazah', translation: 'The Traducer', revelationType: 'Meccan' },
  { number: 105, name: 'Al-Fil', translation: 'The Elephant', revelationType: 'Meccan' },
  { number: 106, name: 'Quraysh', translation: 'Quraysh', revelationType: 'Meccan' },
  { number: 107, name: 'Al-Ma\'un', translation: 'The Small kindnesses', revelationType: 'Meccan' },
  { number: 108, name: 'Al-Kawthar', translation: 'The Abundance', revelationType: 'Meccan' },
  { number: 109, name: 'Al-Kafirun', translation: 'The Disbelievers', revelationType: 'Meccan' },
  { number: 110, name: 'An-Nasr', translation: 'The Divine Support', revelationType: 'Medinan' },
  { number: 111, name: 'Al-Masad', translation: 'The Palm Fiber', revelationType: 'Meccan' },
  { number: 112, name: 'Al-Ikhlas', translation: 'The Sincerity', revelationType: 'Meccan' },
  { number: 113, name: 'Al-Falaq', translation: 'The Daybreak', revelationType: 'Meccan' },
  { number: 114, name: 'An-Nas', translation: 'Mankind', revelationType: 'Meccan' }
];

// API endpoints
export const API_BASE_URL = 'https://api.alquran.cloud/v1';

export const getQuranEditions = {
  arabic: 'quran-uthmani',
  urdu: 'ur.jalandhry',
  audio: 'ar.alafasy'
};

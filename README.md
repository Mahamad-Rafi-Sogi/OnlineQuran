# Holy Quran - Digital Mushaf

A professional React + TypeScript application displaying the Holy Quran with 100% textual authenticity using the Al-Quran Cloud API.

## 🌟 Features

### Core Features
- **100% Authentic Text**: Uses the Uthmani script from Al-Quran Cloud API
- **4-Column Mushaf Layout**:
  - Kannada Transliteration
  - Urdu Translation (Fateh Muhammad Jalandhari)
  - English Transliteration
  - Arabic Uthmani Text (with Amiri Quran font)
- **Audio Recitation**: Play button for each verse (Mishary Rashid Alafasy)
- **Data Verification**: Automatic verse count validation against hardcoded constants
- **Islamic UI**: Emerald green, gold accents, and parchment background
- **Loading States**: Islamic geometric pattern animations

### Technical Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom Islamic theme
- **API**: Al-Quran Cloud API (api.alquran.cloud)
- **Build Tool**: Vite
- **Font**: Amiri Quran for Arabic text

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
OnlineQuran/
├── src/
│   ├── components/
│   │   ├── QuranDisplay.tsx    # Main Quran component
│   │   ├── AyahRow.tsx         # Individual verse row
│   │   └── Loading.tsx         # Loading component
│   ├── types.ts                # TypeScript interfaces & constants
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design Principles

### Color Palette
- **Primary**: Emerald Green (#064e3b)
- **Accent**: Gold/Amber (#d97706)
- **Background**: Soft Parchment (#fdfbf7)

### Typography
- **Arabic**: Amiri Quran (Google Fonts)
- **Translations**: Georgia serif font
- **RTL Support**: Proper right-to-left rendering for Arabic and Urdu

## 🔒 Data Integrity

The application implements a verification step:
- Each Surah's verse count is validated against hardcoded constants
- Alerts are displayed if there's a mismatch
- Example: Al-Fatihah must have exactly 7 verses

## 🎵 Audio Features

- Each verse has a play button
- Audio recitation by Mishary Rashid Alafasy
- Visual feedback during playback
- Smooth audio streaming from Al-Quran Cloud API

## 📱 Responsive Design

- Mobile-first approach
- Responsive table layout
- Optimized for tablets and desktops
- Horizontal scrolling on smaller screens

## 🌐 API Reference

**Base URL**: `https://api.alquran.cloud/v1`

**Endpoints Used**:
- `/surah/{number}/editions/{edition1},{edition2}` - Fetch multiple editions
- Editions:
  - `quran-uthmani` - Arabic Uthmani script
  - `ur.jalandhry` - Urdu translation
  - `ar.alafasy` - Audio recitation

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding More Surahs

To add verse counts for more Surahs, update the `SURAH_VERSE_COUNTS` object in [src/types.ts](src/types.ts):

```typescript
export const SURAH_VERSE_COUNTS: Record<number, number> = {
  1: 7,    // Al-Fatihah
  2: 286,  // Al-Baqarah
  // Add more...
};
```

## 📖 Current Implementation

Currently displays **Surah Al-Fatihah (The Opening)** with:
- 7 verses with Kannada transliteration
- Authentic Urdu translation
- English transliteration
- Arabic Uthmani text
- Audio recitation for each verse

## 🤝 Contributing

This is a religious application. Please ensure:
1. Complete textual accuracy
2. Respectful UI/UX
3. No modifications to Quranic text
4. Proper testing before commits

## 📄 License

This project is for educational and religious purposes.

## 🙏 Acknowledgments

- **Al-Quran Cloud API** for providing authentic Quranic data
- **Amiri Quran Font** for beautiful Arabic typography
- **Mishary Rashid Alafasy** for the audio recitation

---

**Built with ❤️ for the Muslim Ummah**

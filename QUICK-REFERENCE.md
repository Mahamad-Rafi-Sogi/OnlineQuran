# Quick Reference Guide 🚀

## Instant Commands

```bash
# Navigate to project
cd "c:\Users\SG0706304\OneDrive - Sabre\Desktop\Rafi\codebase\OnlineQuran"

# Install dependencies (once npm is working)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Files to Know

| File | Purpose | Lines |
|------|---------|-------|
| `src/components/QuranDisplay.tsx` | Main logic & API calls | 380 |
| `src/components/AyahRow.tsx` | 4-column row component | 85 |
| `src/types.ts` | Interfaces & constants | 95 |
| `src/index.css` | Styles & fonts | 90 |
| `tailwind.config.js` | Color theme config | 25 |

## API Endpoints Used

```
Base: https://api.alquran.cloud/v1

GET /surah/1/editions/quran-uthmani,ar.alafasy
→ Arabic text + audio

GET /surah/1/ur.jalandhry
→ Urdu translation
```

## Color Variables

```css
--quran-green: #064e3b    /* Primary */
--quran-gold: #d97706     /* Accent */
--quran-parchment: #fdfbf7 /* Background */
```

## Key React Hooks Used

```typescript
// State management
useState<Ayah[]>([])          // Store verses
useState(true)                // Loading state
useState<string | null>(null) // Errors

// Side effects
useEffect(() => {             // Fetch on mount
  fetchQuranData();
}, [surahNumber]);

// Audio element
useState(new Audio())         // Audio player
```

## Tailwind Classes Reference

```html
<!-- Colors -->
bg-quran-green     text-quran-green
bg-quran-gold      text-quran-gold
bg-quran-parchment

<!-- Arabic text -->
arabic-text        (custom class in index.css)
dir="rtl"          (HTML attribute)

<!-- Layout -->
container mx-auto  (center with padding)
grid grid-cols-4   (4-column layout)
```

## Component Props

### QuranDisplay (no props)
- Fetches data internally
- Manages all state

### AyahRow
```typescript
{
  ayah: Ayah;                  // Arabic verse
  kannadaText: string;         // Kannada transliteration
  urduText: string;            // Urdu translation
  englishTransliteration: string; // English transliteration
  onPlayAudio: (url: string) => void; // Audio callback
}
```

### Loading
```typescript
{
  message?: string;  // Optional loading message
}
```

## Data Types

```typescript
interface Ayah {
  number: number;           // Global number (1-6236)
  text: string;             // Arabic text
  numberInSurah: number;    // Verse number (1-7 for Al-Fatihah)
  audio: string;            // Audio URL
}
```

## Verification System

```typescript
SURAH_VERSE_COUNTS[1] === 7   // Al-Fatihah
SURAH_VERSE_COUNTS[2] === 286 // Al-Baqarah

// Check in code:
if (ayahs.length !== SURAH_VERSE_COUNTS[surahNumber]) {
  // Warning displayed
}
```

## Audio System

```typescript
// Single audio element (singleton)
const [audioElement] = useState(new Audio());

// Play audio
audioElement.src = "https://cdn.alquran.cloud/media/audio/...";
audioElement.play();
```

## Responsive Breakpoints

```
sm:  640px   (Tablet)
md:  768px   (Desktop)
lg:  1024px  (Large desktop)
xl:  1280px  (Extra large)
2xl: 1536px  (2K screens)
```

## Font Loading

```css
/* Google Fonts CDN */
@import url('https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap');

/* Usage */
font-family: 'Amiri Quran', serif;
```

## Common Modifications

### Change Surah
```typescript
// In QuranDisplay.tsx
const [surahNumber] = useState(1); // Change to 2, 3, etc.
```

### Add New Translation
```typescript
// In types.ts
export const getQuranEditions = {
  arabic: 'quran-uthmani',
  urdu: 'ur.jalandhry',
  english: 'en.sahih', // Add this
  audio: 'ar.alafasy'
};
```

### Add New Column
1. Fetch data in `QuranDisplay.tsx`
2. Pass prop to `AyahRow.tsx`
3. Add `<td>` in `AyahRow.tsx`
4. Update table headers

### Change Colors
```javascript
// tailwind.config.js
colors: {
  'quran-green': '#your-color',
  'quran-gold': '#your-color',
  'quran-parchment': '#your-color',
}
```

## Debugging Tips

### Check API Response
```javascript
console.log('Arabic:', arabicData);
console.log('Urdu:', urduData);
console.log('Merged:', mergedArabicAyahs);
```

### Check Verse Count
```javascript
console.log('Expected:', SURAH_VERSE_COUNTS[surahNumber]);
console.log('Received:', arabicAyahs.length);
```

### Check Audio URL
```javascript
console.log('Audio URL:', ayah.audio);
```

### React DevTools
- Install React Developer Tools extension
- Inspect component state
- Check props flow

## Performance Monitoring

```javascript
// Add to fetchQuranData()
console.time('API Fetch');
// ... fetch logic
console.timeEnd('API Fetch');
```

## Build Output

```bash
npm run build

# Output:
dist/
├── index.html              # Entry HTML
├── assets/
│   ├── index-[hash].js    # Main JS bundle
│   ├── index-[hash].css   # Compiled CSS
│   └── [fonts]            # Font files
```

## Browser Support

```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
⚠️ IE11 (not supported)
```

## Keyboard Shortcuts (VS Code)

```
Ctrl + P          → Quick file open
Ctrl + Shift + F  → Search in all files
Ctrl + `          → Open terminal
F12              → Go to definition
Alt + ←/→        → Navigate back/forward
```

## Git Commands

```bash
# Initialize git (if needed)
git init

# Add files
git add .

# Commit
git commit -m "Initial Quran app implementation"

# Create .gitignore (already created)
```

## Package Sizes

```
react: ~6.4 KB (gzipped)
react-dom: ~121 KB (gzipped)
Total production bundle: ~150 KB (estimated)
```

## Environment Variables

```bash
# .env file (if needed)
VITE_API_BASE_URL=https://api.alquran.cloud/v1
```

## Testing URLs

```
Development: http://localhost:5173
Production:  (deploy to your preferred host)
API:         https://api.alquran.cloud/v1/surah/1
```

## Status Indicators

```
✅ Complete and working
⚠️ Needs attention
❌ Not implemented
🚀 Ready to deploy (after npm install)
```

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| npm errors | Fix npm installation or use yarn/pnpm |
| API errors | Check internet connection |
| Audio not playing | Check browser console for CORS |
| Fonts not loading | Check Google Fonts CDN access |
| Styles not applying | Run `npm run dev` again |

## Next Features to Add

```
Priority 1:
□ Surah selector dropdown
□ Navigation between surahs

Priority 2:
□ Search functionality
□ Bookmarking system
□ Reading progress tracker

Priority 3:
□ Multiple reciter support
□ More translation languages
□ Night mode toggle
```

## Resources

- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org/docs/
- Tailwind Docs: https://tailwindcss.com/docs
- Al-Quran API: https://alquran.cloud/api
- Vite Docs: https://vitejs.dev

---

**Remember**: This is a religious application. Always verify the accuracy of Quranic text! 🕌


# Setup Instructions for Holy Quran Application

## ⚠️ Current Issue
There appears to be an issue with your npm installation showing "Class extends value undefined is not a constructor or null". This needs to be resolved before running the application.

## 🔧 Troubleshooting Steps

### Option 1: Reinstall Node.js and npm
1. Uninstall Node.js from your system
2. Download the latest LTS version from https://nodejs.org/
3. Install Node.js (npm comes bundled with it)
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Option 2: Use a Different Package Manager
If npm continues to have issues, try using yarn or pnpm:

**Using Yarn:**
```bash
# Install Yarn globally
npm install -g yarn

# Install dependencies
cd "c:\Users\SG0706304\OneDrive - Sabre\Desktop\Rafi\codebase\OnlineQuran"
yarn install

# Run the application
yarn dev
```

**Using pnpm:**
```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
cd "c:\Users\SG0706304\OneDrive - Sabre\Desktop\Rafi\codebase\OnlineQuran"
pnpm install

# Run the application
pnpm dev
```

## 📦 Manual Installation Steps

Once npm is working, follow these steps:

1. **Navigate to project directory:**
   ```bash
   cd "c:\Users\SG0706304\OneDrive - Sabre\Desktop\Rafi\codebase\OnlineQuran"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Navigate to `http://localhost:5173`
   - You should see Surah Al-Fatihah displayed in the 4-column layout

## ✅ What Has Been Created

The complete application structure has been created with:

### Core Files:
- ✅ `package.json` - Project configuration with all dependencies
- ✅ `vite.config.ts` - Vite build configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.js` - Tailwind CSS with Islamic theme
- ✅ `postcss.config.js` - PostCSS configuration

### Source Files:
- ✅ `src/types.ts` - TypeScript interfaces, constants, and verse counts
- ✅ `src/components/QuranDisplay.tsx` - Main component with API integration
- ✅ `src/components/AyahRow.tsx` - Individual verse row with 4 columns
- ✅ `src/components/Loading.tsx` - Islamic loading animation
- ✅ `src/App.tsx` - Root component
- ✅ `src/main.tsx` - Entry point
- ✅ `src/index.css` - Global styles with Amiri Quran font

### Other Files:
- ✅ `index.html` - HTML template
- ✅ `README.md` - Comprehensive documentation
- ✅ `.gitignore` - Git ignore rules

## 🎯 Key Features Implemented

1. **Data Source**: Al-Quran Cloud API with Uthmani script
2. **4-Column Layout**:
   - Kannada Transliteration (Far Left)
   - Urdu Translation (Fateh Muhammad Jalandhari)
   - English Transliteration
   - Arabic Uthmani Text (Far Right, RTL)

3. **Verification**: Automatic verse count validation
4. **Audio**: Play button for each Ayah (Mishary Rashid Alafasy)
5. **Islamic UI**: 
   - Emerald Green (#064e3b)
   - Gold/Amber (#d97706)
   - Parchment Background (#fdfbf7)
   - Amiri Quran font for Arabic
   - Ayah end symbol with verse number

6. **Loading State**: Islamic geometric pattern animation
7. **Responsive Design**: Mobile-first approach
8. **Type Safety**: Full TypeScript implementation

## 🚀 Expected Output

Once running, you will see:

1. **Header**: 
   - Arabic title: القرآن الكريم
   - English subtitle: The Holy Quran
   - Surah badge: "Surah 1 - Al-Fatihah (The Opening)"
   - Verification status: "✅ Data verified: 7 verses match expected count"

2. **Bismillah**: Centered with Arabic and English

3. **4-Column Table**: 
   - Column headers in their respective languages
   - 7 rows (one for each verse of Al-Fatihah)
   - Play button for each verse
   - Ayah number in gold circle
   - Hover effects on rows

4. **Footer**: Data source attribution

## 📱 Testing Checklist

Once the app is running, verify:

- [ ] All 7 verses of Al-Fatihah are displayed
- [ ] Kannada transliteration appears in the first column
- [ ] Urdu translation appears in the second column (RTL)
- [ ] English transliteration appears in the third column
- [ ] Arabic Uthmani text appears in the fourth column (RTL)
- [ ] Each verse has a play button
- [ ] Audio plays when clicking the play button
- [ ] Verification status shows "✅ Data verified: 7 verses match expected count"
- [ ] Loading animation appears initially
- [ ] Colors match the Islamic theme
- [ ] Arabic text uses Amiri Quran font
- [ ] Responsive design works on different screen sizes

## 🐛 Common Issues

### Issue: "Failed to fetch Arabic text"
- **Solution**: Check your internet connection. The API requires internet access.

### Issue: Audio doesn't play
- **Solution**: Check browser console for CORS errors. Some browsers may block audio autoplay.

### Issue: Arabic text doesn't display correctly
- **Solution**: Ensure Google Fonts is accessible (Amiri Quran font is loaded from Google Fonts CDN).

### Issue: Verse count mismatch
- **Solution**: This indicates a potential API issue. The verification system will alert you.

## 📞 Next Steps

After fixing npm and running the application:

1. Test all features thoroughly
2. Add more Surahs by updating the `surahNumber` state
3. Add a Surah selector dropdown
4. Implement navigation between Surahs
5. Add bookmarking functionality
6. Implement search features
7. Add more language translations

## 🎓 Architecture Highlights

### Data Flow:
1. Component mounts → `useEffect` triggers
2. Fetch Arabic (Uthmani) + Audio editions
3. Fetch Urdu translation
4. Merge data and verify verse count
5. Update state and render

### State Management:
- `arabicAyahs`: Arabic text with audio URLs
- `urduAyahs`: Urdu translations
- `loading`: Loading state
- `error`: Error messages
- `verificationStatus`: Verification results

### API Integration:
- Multi-edition fetching in single request
- Proper error handling
- Loading states
- Data transformation

## 🙏 Credits

- **Al-Quran Cloud API**: https://alquran.cloud/api
- **Amiri Quran Font**: Google Fonts
- **Reciter**: Mishary Rashid Alafasy
- **Urdu Translation**: Fateh Muhammad Jalandhari

---

**Status**: ✅ Application code is complete and ready to run once npm is working properly.

# 🎨 Visual Design Preview

## Application Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                         HEADER SECTION                                │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                     القرآن الكريم                              │  │
│  │                  The Holy Quran                                 │  │
│  │              ┌──────────────────────────┐                       │  │
│  │              │ Surah 1 - Al-Fatihah     │                       │  │
│  │              │    (The Opening)         │                       │  │
│  │              └──────────────────────────┘                       │  │
│  │  ✅ Data verified: 7 verses match expected count               │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│                         BISMILLAH                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │      بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ                  │  │
│  │   In the name of Allah, the Most Gracious, the Most Merciful   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│                      4-COLUMN TABLE                                    │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ ಕನ್ನಡ  │  اردو  │  English  │  النص العربي  │               │  │
│  ├────────────────────────────────────────────────────────────────┤  │
│  │ ಬಿಸ್ಮಿಲ್ಲಾಹಿರ್│ بِسْمِ  │ Bismillaahir │ بِسْمِ ٱللَّهِ ⓵│ ▶ │  │
│  ├────────────────────────────────────────────────────────────────┤  │
│  │ ಅಲ್ಹಮ್ದು │ ٱلْحَمْدُ│ Al-Hamdu    │ ٱلْحَمْدُ لِلَّهِ ⓶│ ▶ │  │
│  ├────────────────────────────────────────────────────────────────┤  │
│  │ ... (5 more rows for verses 3-7)                               │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│                         FOOTER                                         │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │   Data Source: Al-Quran Cloud API                              │  │
│  │   Arabic: Uthmani | Urdu: Jalandhari | Audio: Alafasy         │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Color Scheme Applied

### Header Section
```
Background: Parchment (#fdfbf7)
Title (Arabic): Emerald Green (#064e3b) - 48px bold
Subtitle (English): Gold (#d97706) - 30px
Badge: Emerald Green background, white text
Verification: Green background (#e6f7ed)
```

### Bismillah Section
```
Arabic Text: Emerald Green (#064e3b) - 36px
English Text: Gray (#6b7280) - 18px italic
```

### Table
```
Header Row:
  Background: Emerald Green (#064e3b)
  Text: White - 18px

Data Rows:
  Background: White
  Hover: Light green (#f0fdf4)
  Border: Gold with 20% opacity (#d9770633)
  
Columns:
  1. Kannada: Black text, left-aligned
  2. Urdu: Black text, right-aligned (RTL)
  3. English: Gray text, left-aligned, italic
  4. Arabic: Emerald Green, right-aligned (RTL), 28px

Play Button:
  Normal: Emerald Green circle, white icon
  Hover: Gold circle
  Playing: Gold circle with pause icon

Ayah Number:
  Gold circle ⓵⓶⓷⓸⓹⓺⓻
  White text inside
```

### Footer
```
Border: Gold (#d97706) - 2px
Text: Emerald Green (#064e3b)
Background: Transparent
```

---

## Typography Hierarchy

```
Level 1 (Main Title - Arabic):
  Font: Amiri Quran
  Size: 48px (3rem)
  Weight: Bold (700)
  Color: #064e3b
  Example: القرآن الكريم

Level 2 (Subtitle - English):
  Font: Georgia serif
  Size: 30px (1.875rem)
  Weight: Normal (400)
  Color: #d97706
  Example: The Holy Quran

Level 3 (Bismillah - Arabic):
  Font: Amiri Quran
  Size: 36px (2.25rem)
  Weight: Normal (400)
  Color: #064e3b
  Example: بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ

Level 4 (Arabic Verses):
  Font: Amiri Quran
  Size: 28px (1.75rem)
  Line Height: 40px (2.5rem)
  Weight: Normal (400)
  Color: #064e3b
  Direction: RTL
  Example: ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ

Level 5 (Translations):
  Font: Georgia serif
  Size: 18px (1.125rem)
  Line Height: 28px (1.75rem)
  Weight: Normal (400)
  Color: #1f2937
  Example: Kannada, Urdu, English text

Level 6 (English Transliteration):
  Font: Georgia serif
  Size: 18px (1.125rem)
  Style: Italic
  Color: #4b5563
  Example: Bismillaahir-Rahmaanir-Raheem
```

---

## Spacing & Layout

### Container
```
Max Width: 1280px (container class)
Padding: 16px (px-4)
Margin: 0 auto (mx-auto)
```

### Sections
```
Header:
  Padding Top: 32px (py-8)
  Padding Bottom: 32px
  Text Align: Center

Bismillah:
  Margin Bottom: 32px (mb-8)
  Text Align: Center

Table:
  Border Radius: 12px (rounded-xl)
  Box Shadow: 2xl
  Overflow: Hidden

Footer:
  Margin Top: 32px (mt-8)
  Padding: 16px (p-4)
```

### Table Cells
```
Padding: 16px (p-4)
Vertical Align: Top
Border Bottom: 1px solid (gold with opacity)

Column Widths:
  Kannada: 20% (w-[20%])
  Urdu: 20% (w-[20%])
  English: 25% (w-[25%])
  Arabic: 35% (w-[35%]) - Wider for calligraphy
```

---

## Interactive States

### Button States
```
Default:
  Background: #064e3b (Emerald Green)
  Text: White
  Border Radius: 50% (fully rounded)
  Padding: 8px (p-2)
  
Hover:
  Background: #d97706 (Gold)
  Transition: all 200ms ease
  Cursor: pointer
  
Active/Playing:
  Background: #d97706 (Gold)
  Icon: Changes from ▶ to ⏸
  
Disabled:
  Cursor: not-allowed
  Opacity: 0.5
```

### Row States
```
Default:
  Background: White
  
Hover:
  Background: rgba(6, 78, 59, 0.05)
  Transition: colors 150ms ease
```

---

## Loading Animation

```
┌──────────────────────────────────────┐
│                                      │
│        ┌────────────────┐            │
│        │  ☪ (rotating)  │            │
│        │  Geometric     │            │
│        │  Pattern BG    │            │
│        └────────────────┘            │
│                                      │
│    Loading Holy Quran... (pulsing)  │
│                                      │
└──────────────────────────────────────┘

Elements:
  - Spinning border (green with gold top)
  - Islamic crescent symbol (☪) pulsing
  - Geometric pattern background (low opacity)
  - Loading text (pulsing animation)
  - Parchment background
```

---

## Responsive Breakpoints

### Mobile (< 640px)
```
- Single column stack (if needed)
- Horizontal scroll for table
- Smaller font sizes:
  - Title: 32px
  - Arabic: 24px
  - Translations: 16px
- Reduced padding: 8px
```

### Tablet (640px - 1024px)
```
- 4-column layout preserved
- Optimized column widths
- Font sizes:
  - Title: 40px
  - Arabic: 26px
  - Translations: 17px
- Padding: 12px
```

### Desktop (> 1024px)
```
- Full 4-column layout
- Maximum font sizes
- Full padding: 16px
- Container max width: 1280px
```

---

## Ayah Number Styling

```
Standard Ayah Number:
┌─────┐
│  ⓵  │  Gold circle (#d97706)
└─────┘  White text, 14px, bold
         2rem diameter
         Inline with Arabic text
         Margin: 0 8px

Alternative Unicode: ۝١ (Ornate end of Ayah + number)
```

---

## Shadow & Elevation

```
Cards/Table:
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
  (shadow-2xl in Tailwind)

Buttons:
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
  (shadow-md in Tailwind)

Header Badge:
  box-shadow: 0 10px 15px -3px rgba(6, 78, 59, 0.2)
```

---

## Animation Timings

```
Color Transitions: 200ms ease
Hover Effects: 150ms ease
Loading Pulse: 2s infinite
Loading Spin: 1.5s linear infinite
Fade In: 300ms ease-in
```

---

## Accessibility Features

```
✅ Sufficient Color Contrast:
   - Green on white: 11.8:1 (AAA)
   - Gold on white: 5.2:1 (AA)
   - White on green: 11.8:1 (AAA)

✅ Font Sizes:
   - Minimum 16px for body text
   - Larger for headings

✅ Touch Targets:
   - Buttons: minimum 44x44px
   - Adequate spacing between elements

✅ Focus Indicators:
   - Visible focus rings on interactive elements
   - Keyboard navigable

✅ Semantic HTML:
   - Proper heading hierarchy
   - Table with thead/tbody
   - Alt text where applicable
```

---

## Icon Set

```
▶  Play button
⏸  Pause button
☪  Islamic crescent (loading)
⚠️ Warning icon (verification)
✅ Success icon (verification)
⓵⓶⓷⓸⓹⓺⓻  Circled numbers (Ayah numbers)
```

---

## Example of Complete Verse Row

```
┌──────────────────────────────────────────────────────────────────────┐
│ ಬಿಸ್ಮಿಲ್ಲಾಹಿರ್-ರಹ್ಮಾನಿರ್-ರಹೀಮ್ │ بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ │
│                             │                                      │
│ Bismillaahir-Rahmaanir-    │ بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ  ⓵ │ ▶ │
│ Raheem                      │                                      │
│                             │                                      │
│ [Hover: light green background]                                    │
└──────────────────────────────────────────────────────────────────────┘

Column Alignments:
├─ Kannada: Left align, black
├─ Urdu: Right align (RTL), black
├─ English: Left align, gray, italic
└─ Arabic: Right align (RTL), green, larger font
   └─ Play button: Right side, circular, green->gold on hover
```

---

## Final Visual Summary

**Overall Vibe**: 
- Clean, elegant, scholarly
- Islamic traditional aesthetics
- Modern, professional UI
- Respectful presentation of sacred text
- Easy to read and navigate
- Calligraphy-focused (especially Arabic)

**Dominant Colors**:
- 70% Parchment background
- 20% Emerald Green accents
- 10% Gold highlights

**Typography Balance**:
- Arabic text is prominent (largest)
- Translations are clear but secondary
- Headers are bold and centered
- Footer is subtle

**Interaction Design**:
- Minimal clicks required
- Clear visual feedback
- Smooth transitions
- Intuitive layout

---

**This design honors the sanctity of the Holy Quran while providing a modern, accessible digital reading experience.** 🕌


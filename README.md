# A Journey From My Heart ❤️

A luxury, romantic apology, memories, interactive Q&A, and cinematic video website created with love, sincerity, and meticulous craft.

---

## 🌟 Overview & Concept

"A Journey From My Heart" is a personalized storytelling web application designed to express a genuine, humble apology, celebrate real relationship memories, make sincere promises for growth, and finish on a peaceful, emotional closing page with **strictly no forced forgiveness**.

### Key Experience Highlights:
1. **Romantic Welcome Screen**: Floating rose petals, glowing heart, luxury interactive wax-sealed envelope, and thoughtful buttons ("Open My Little Surprise ❤️" / "Maybe Later").
2. **Interactive Q&A Engine**: Gentle romantic reflection steps where every branch is validated and supportive without dead ends.
3. **Mixed Memory Storytelling Engine**: Seamlessly weaves real photographs, polaroids, video clips, and heartfelt reflections into one continuous emotional journey.
4. **Photography Gallery & Lightbox**: Interactive gallery with tag filtering, responsive masonry grid, and full-screen lightbox with keyboard & zoom support.
5. **Real Video Memories**: Custom HTML5 video players with play/pause, volume scrubbing, fullscreen, mutual playback exclusivity, and poster frames.
6. **Edited Cinematic Video Montage**: A real, verified MP4 montage (`public/media/our-story-montage.mp4`) generated with FFmpeg Ken Burns effects, crossfades, title overlays, and gentle acoustic piano background music.
7. **Heart-to-Heart Apology**: Handwritten vintage letter aesthetic on textured parchment, sincere paragraphs recognizing mistakes, and an integrated personal voice note player.
8. **Personal Promise System**: 6 heartfelt commitments with dedicated cards, icons, and real photo associations.
9. **Peaceful Closing Page**: Emotional final destination with favorite couple photograph, gentle zoom, replay options, and **zero pressure or final question**.

---

## 📂 Project Architecture

```
Apology WEBSITE/
├── public/
│   ├── images/
│   │   └── memories/            # Real photographs (photo_01.jpg .. photo_13.jpg)
│   ├── videos/                  # Web-optimized H.264 MP4 videos (video_01.mp4 .. video_06.mp4)
│   ├── audio/
│   │   ├── romantic-bgm.mp3     # Soft romantic acoustic piano soundtrack
│   │   └── voice-message.mp3    # Personal voice note recording
│   ├── media/
│   │   └── our-story-montage.mp4# Actual edited cinematic montage
│   └── media-manifest.json      # Metadata manifest for all media assets
├── scripts/
│   ├── setup_media_and_montage.py # FFmpeg transcode & montage generator
│   └── create-montage.js         # Node.js runner for the montage pipeline
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Romantic header & section links
│   │   ├── RomanticBackground.tsx # Canvas floating petals & soft bokeh
│   │   ├── FloatingHearts.tsx   # Ambient glowing heart particles
│   │   ├── Envelope.tsx         # Wax-sealed love letter opening animation
│   │   ├── QuestionCard.tsx     # Reusable Q&A interaction card
│   │   ├── PhotoGallery.tsx     # Photography grid with category filters
│   │   ├── PhotoLightbox.tsx    # Fullscreen image viewer
│   │   ├── VideoPlayer.tsx      # Custom HTML5 video player
│   │   ├── CinematicMontage.tsx # Theater-framed cinematic montage
│   │   ├── AudioPlayer.tsx      # Persistent BGM & voice note controller
│   │   ├── ApologyLetter.tsx    # Handwritten letter on vintage paper
│   │   ├── PromiseCard.tsx      # Individual commitment cards
│   │   ├── ProgressIndicator.tsx# Reading scroll progress bar
│   │   └── ClosingPage.tsx      # Peaceful final destination
│   ├── sections/
│   │   ├── Welcome.tsx          # Initial hero welcome
│   │   ├── IntroductionQA.tsx   # Interactive Q&A step
│   │   ├── MixedMemories.tsx    # Mixed storytelling engine
│   │   ├── HeartToHeart.tsx     # Apology & voice note section
│   │   ├── MyPromises.tsx       # Commitments grid
│   │   ├── VideoMemories.tsx    # Video gallery & montage feature
│   │   └── FinalMemory.tsx      # Poetic bridge to closing
│   ├── data/
│   │   ├── photos.ts            # Photos metadata, captions, and dates
│   │   ├── videos.ts            # Videos metadata, titles, and posters
│   │   ├── questions.ts         # Q&A questions and empathetic responses
│   │   ├── memories.ts          # Mixed memory layouts configuration
│   │   ├── promises.ts          # 6 customizable commitments
│   │   └── messages.ts          # Welcome, apology letter & closing text
│   ├── App.tsx                  # Main single-page continuous journey
│   ├── main.tsx                 # React DOM root
│   └── index.css                # Tailwind CSS v4 styling & theme tokens
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🛠️ How to Customize Your Personal Details

All personal content is centralized in `src/data/` so you can customize everything without touching component code:

### 1. Photos
- Place new photos in `public/images/memories/`.
- Update `src/data/photos.ts` with your titles, captions, and dates.

### 2. Videos
- Place new MP4 videos in `public/videos/`.
- Update `src/data/videos.ts` with your descriptions.

### 3. Audio & Voice Message
- To replace the background music, save your MP3 as `public/audio/romantic-bgm.mp3`.
- To add your own voice recording, save your audio file as `public/audio/voice-message.mp3`.

### 4. Apology Letter Text
- Open `src/data/messages.ts`.
- Edit `apologyLetterContent.recipientName`, `apologyLetterContent.letterParagraphs`, and `apologyLetterContent.signature`.

### 5. Promises
- Open `src/data/promises.ts`.
- Edit or add promise statements, explanations, and associated photos.

---

## 🎬 Generating / Re-rendering the Cinematic Video Montage

To re-render the cinematic montage (`public/media/our-story-montage.mp4`) with any new photos and videos:

```bash
npm run montage
```

Or directly using Python:
```bash
python scripts/setup_media_and_montage.py
```

The script will automatically:
1. Scan `Photos and videos/`
2. Transcode videos to standard H.264 / AAC
3. Apply Ken Burns slow-pan and zoom effects to photographs
4. Add title sequences, romantic transitions, and peaceful background music
5. Verify that the output MP4 is valid and ready for web playback

---

## 🚀 Running the Application Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Or build and preview production bundle
npm run build
npm run preview
```

Open your browser at `http://localhost:5173/`.

---

## ☁️ Deployment to Vercel

This project is built with standard Vite and React, ready for one-click deployment:

1. Push this repository to GitHub or GitLab.
2. In [Vercel](https://vercel.com):
   - Import your repository.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Click **Deploy**. Your romantic website will be live worldwide with instant CDN caching!


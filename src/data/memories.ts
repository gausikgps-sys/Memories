export type MemoryLayoutType =
  | 'full-width-featured'
  | 'side-by-side-photo-text'
  | 'polaroid-duo'
  | 'cinematic-video-spotlight'
  | 'video-and-message'
  | 'photo-collage'
  | 'promise-pairing'
  | 'handwritten-moment'
  | 'cinematic-montage-feature';

export interface MemoryStoryItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  personalMessage?: string;
  date?: string;
  mediaType: 'image' | 'video' | 'montage' | 'mixed';
  layoutType: MemoryLayoutType;
  imageSrc?: string;
  secondaryImageSrc?: string;
  videoSrc?: string;
  videoPoster?: string;
  tag?: string;
  quote?: string;
}

export const memoriesStory: MemoryStoryItem[] = [
  {
    id: 'memory-prologue',
    title: 'Where It All Begins',
    subtitle: 'The Little Things Become Everything',
    description: 'Some moments may seem small at first, but with time, they become the memories we carry closest to our hearts.',
    personalMessage: 'Looking back, every smile you gave me was a gentle anchor. I want to honor every second of what we have shared.',
    date: 'Our Beginning',
    mediaType: 'image',
    layoutType: 'full-width-featured',
    imageSrc: '/images/memories/photo_01.jpg',
    tag: 'Cherished'
  },
  {
    id: 'memory-duo-laughter',
    title: 'Unscripted Laughter & Silly Smiles',
    subtitle: 'Two polaroids of pure warmth',
    description: 'We never needed big plans to be happy. Just looking at each other, laughing until our stomachs hurt, and feeling completely comfortable in our own skin.',
    personalMessage: 'Your natural joy is infectious. Even when I look at these candid snaps now, they bring instant peace into my mind.',
    date: 'Golden Days',
    mediaType: 'mixed',
    layoutType: 'polaroid-duo',
    imageSrc: '/images/memories/photo_02.jpg',
    secondaryImageSrc: '/images/memories/photo_03.jpg',
    tag: 'Smiles'
  },
  {
    id: 'memory-video-laugh',
    title: 'Hearing You Laugh In Real Time',
    subtitle: 'A video clip that brings it all alive',
    description: 'Photographs capture the moment, but hearing your voice and seeing your gestures brings the warmth right into the room.',
    personalMessage: 'I never want to take your laughter for granted. It is one of the most precious things in my world.',
    date: 'Candid Clip',
    mediaType: 'video',
    layoutType: 'video-and-message',
    videoSrc: '/videos/video_01.mp4',
    videoPoster: '/images/memories/photo_02.jpg',
    quote: '"Laughter is the shortest distance between two hearts."',
    tag: 'Voice & Smile'
  },
  {
    id: 'memory-side-by-side-walk',
    title: 'Walking Beside You',
    subtitle: 'Side by side, step by step',
    description: 'Whenever we were walking together, the world felt a little softer. Knowing you were right there made everything seem achievable and safe.',
    personalMessage: 'I am so grateful for how patient and kind you have been with me. You have taught me what true gentleness feels like.',
    date: 'Journey Together',
    mediaType: 'image',
    layoutType: 'side-by-side-photo-text',
    imageSrc: '/images/memories/photo_04.jpg',
    quote: 'True connection isn\'t about never falling; it\'s about being willing to listen, grow, and walk forward together.',
    tag: 'Presence'
  },
  {
    id: 'memory-collage-glances',
    title: 'The Mosaic of Us',
    subtitle: 'Moments of quiet affection',
    description: 'A collage of candid glances, shared cups, afternoon conversations, and gentle pauses. The tapestry of a real bond.',
    personalMessage: 'Each one of these memories is a piece of my heart that I cherish deeply.',
    date: 'Everyday Magic',
    mediaType: 'mixed',
    layoutType: 'photo-collage',
    imageSrc: '/images/memories/photo_05.jpg',
    secondaryImageSrc: '/images/memories/photo_06.jpg',
    tag: 'Treasured'
  },
  {
    id: 'memory-montage-highlight',
    title: 'Our Cinematic Story',
    subtitle: 'A full montage composed from our real moments',
    description: 'I edited our photos and clips into one continuous film set to gentle piano music—a tangible celebration of our journey together.',
    personalMessage: 'Press play, take a gentle breath, and let our memories wash over you.',
    date: 'Cinematic Reel',
    mediaType: 'montage',
    layoutType: 'cinematic-montage-feature',
    videoSrc: '/media/our-story-montage.mp4',
    videoPoster: '/images/memories/photo_01.jpg',
    tag: 'Our Film'
  },
  {
    id: 'memory-video-shenanigans',
    title: 'Little Shenanigans',
    subtitle: 'Spontaneous and lighthearted',
    description: 'The goofy moments, the playful teasing, and the fun that only we understand. Life with you is never dull.',
    personalMessage: 'I miss our silly jokes and the effortless way you make me smile.',
    date: 'Pure Fun',
    mediaType: 'video',
    layoutType: 'cinematic-video-spotlight',
    videoSrc: '/videos/video_02.mp4',
    videoPoster: '/images/memories/photo_03.jpg',
    tag: 'Shenanigans'
  },
  {
    id: 'memory-promise-pair',
    title: 'A Memory & A Commitment',
    subtitle: 'Looking at how far we came, and promising to do better',
    description: 'Remembering how special you made me feel makes me want to show up better for you every single day.',
    personalMessage: 'I promise to respect your feelings, protect your peace, and never take your presence for granted.',
    date: 'Promise & Memory',
    mediaType: 'image',
    layoutType: 'promise-pairing',
    imageSrc: '/images/memories/photo_07.jpg',
    quote: 'Loving someone deeply means learning to love them better tomorrow than you did yesterday.',
    tag: 'Commitment'
  },
  {
    id: 'memory-handwritten-note',
    title: 'A Quiet Whisper',
    subtitle: 'Words penned when the world was quiet',
    description: 'In the stillness of the night, when I reflect on everything, you are the thought that lingers with the most warmth and hope.',
    personalMessage: 'I am so sorry for the times I caused you pain. You deserve nothing but kindness and care.',
    date: 'From The Heart',
    mediaType: 'image',
    layoutType: 'handwritten-moment',
    imageSrc: '/images/memories/photo_08.jpg',
    tag: 'Reflection'
  }
];


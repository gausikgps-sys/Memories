export interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  date?: string;
  src: string;
  fallbackSrc?: string;
  orientation: 'portrait' | 'landscape';
  tag?: string;
}

export const photosData: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'That Radiance I Cherish',
    caption: 'A gentle look that always makes time stand still. I will never forget moments like this.',
    date: 'A Golden Memory',
    src: '/images/memories/photo_01.jpg',
    fallbackSrc: '/images/memories/IMG-20260622-WA0058.jpg',
    orientation: 'landscape',
    tag: 'Cherished'
  },
  {
    id: 'photo-2',
    title: 'The Sweetest Smile',
    caption: 'Your smile lights up even my darkest days. Seeing you happy is all I ever want.',
    date: 'Unfiltered Joy',
    src: '/images/memories/photo_02.jpg',
    fallbackSrc: '/images/memories/Snapchat-252495055.jpg',
    orientation: 'portrait',
    tag: 'Smile'
  },
  {
    id: 'photo-3',
    title: 'Playful & Pure',
    caption: 'The effortless laughs and silly faces we share. The pure happiness you bring to my heart.',
    date: 'Pure Smiles',
    src: '/images/memories/photo_03.jpg',
    fallbackSrc: '/images/memories/Snapchat-56898891.jpg',
    orientation: 'portrait',
    tag: 'Laughter'
  },
  {
    id: 'photo-4',
    title: 'Our Journey Hand in Hand',
    caption: 'Walking beside you and knowing I have someone so precious in my life.',
    date: 'Together',
    src: '/images/memories/photo_04.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.07.14_PM_(1).jpeg',
    orientation: 'portrait',
    tag: 'Together'
  },
  {
    id: 'photo-5',
    title: 'Quiet Understanding',
    caption: 'Those quiet moments where no words were needed, just being together was everything.',
    date: 'Peaceful',
    src: '/images/memories/photo_05.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.07.14_PM.jpeg',
    orientation: 'portrait',
    tag: 'Connection'
  },
  {
    id: 'photo-6',
    title: 'Captured Tenderness',
    caption: 'Your warmth, your kindness, and the gentle grace you carry with you everywhere.',
    date: 'Sweet Moments',
    src: '/images/memories/photo_06.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.07.15_PM_(1).jpeg',
    orientation: 'portrait',
    tag: 'Warmth'
  },
  {
    id: 'photo-7',
    title: 'Simple Comforts',
    caption: 'Even the simplest afternoon becomes unforgettable when I get to spend it with you.',
    date: 'Simple Days',
    src: '/images/memories/photo_07.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.07.15_PM.jpeg',
    orientation: 'portrait',
    tag: 'Comfort'
  },
  {
    id: 'photo-8',
    title: 'Eyes Full of Sparkle',
    caption: 'The sparkle in your eyes that always reminds me how lucky I am to know you.',
    date: 'Pure Glow',
    src: '/images/memories/photo_08.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.07.18_PM_(1).jpeg',
    orientation: 'portrait',
    tag: 'Glow'
  },
  {
    id: 'photo-9',
    title: 'The Little Things',
    caption: 'It really is the little conversations and candid moments that mean the most.',
    date: 'Unforgettable',
    src: '/images/memories/photo_09.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.07.18_PM.jpeg',
    orientation: 'portrait',
    tag: 'Memories'
  },
  {
    id: 'photo-10',
    title: 'Warmth & Presence',
    caption: 'Thank you for every kind glance and every moment of reassurance you have given me.',
    date: 'Grateful',
    src: '/images/memories/photo_10.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.09.38_PM.jpeg',
    orientation: 'portrait',
    tag: 'Presence'
  },
  {
    id: 'photo-11',
    title: 'Holding You Close',
    caption: 'A reminder of how much care and gentle affection I hold for you in my heart.',
    date: 'Affection',
    src: '/images/memories/photo_11.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.14.36_PM.jpeg',
    orientation: 'portrait',
    tag: 'Cherish'
  },
  {
    id: 'photo-12',
    title: 'Forever Special',
    caption: 'You have a heart of gold, and I will always strive to protect and value it.',
    date: 'Heart to Heart',
    src: '/images/memories/photo_12.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.14.37_PM_(1).jpeg',
    orientation: 'portrait',
    tag: 'Love'
  },
  {
    id: 'photo-13',
    title: 'My Whole Heart',
    caption: 'A journey made of real memories, honest apologies, and an unwavering wish to do better.',
    date: 'Forever',
    src: '/images/memories/photo_13.jpg',
    fallbackSrc: '/images/memories/WhatsApp_Image_2026-11-22_at_6.14.37_PM.jpeg',
    orientation: 'portrait',
    tag: 'Always'
  }
];


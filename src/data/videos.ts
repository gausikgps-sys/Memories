export interface VideoItem {
  id: string;
  title: string;
  description: string;
  src: string;
  poster?: string;
  duration?: string;
  orientation: 'portrait' | 'landscape';
}

export const videosData: VideoItem[] = [
  {
    id: 'video-1',
    title: 'The Little Laughter We Share',
    description: 'Looking back at this video brings the biggest smile to my face. Your laugh is pure medicine.',
    src: '/videos/video_01.mp4',
    poster: '/images/memories/photo_02.jpg',
    duration: '0:05',
    orientation: 'landscape'
  },
  {
    id: 'video-2',
    title: 'Playful Shenanigans',
    description: 'Every silly moment with you is something I treasure. You make life so much brighter.',
    src: '/videos/video_02.mp4',
    poster: '/images/memories/photo_03.jpg',
    duration: '0:04',
    orientation: 'landscape'
  },
  {
    id: 'video-3',
    title: 'Candid Smiles',
    description: 'Unfiltered, authentic happiness. That is what you have always brought into my life.',
    src: '/videos/video_03.mp4',
    poster: '/images/memories/photo_04.jpg',
    duration: '0:03',
    orientation: 'landscape'
  },
  {
    id: 'video-4',
    title: 'A Quick Hello From You',
    description: 'Seeing you move, smile, and speak melts all the worries of the world away.',
    src: '/videos/video_04.mp4',
    poster: '/images/memories/photo_08.jpg',
    duration: '0:03',
    orientation: 'portrait'
  },
  {
    id: 'video-5',
    title: 'Cherished Snippets',
    description: 'These short seconds are priceless to me. I want to keep creating gentle, happy moments with you.',
    src: '/videos/video_05.mp4',
    poster: '/images/memories/photo_09.jpg',
    duration: '0:03',
    orientation: 'portrait'
  },
  {
    id: 'video-6',
    title: 'Glimpse of Perfection',
    description: 'A quiet reminder of how special you are and how deeply I respect and appreciate who you are.',
    src: '/videos/video_06.mp4',
    poster: '/images/memories/photo_12.jpg',
    duration: '0:02',
    orientation: 'portrait'
  }
];


export interface QAOption {
  text: string;
  responseMessage: string;
  icon?: string;
  isAffirmative?: boolean;
}

export interface QAQuestion {
  id: number;
  question: string;
  subtext?: string;
  options: [QAOption, QAOption];
}

export const questionsData: QAQuestion[] = [
  {
    id: 1,
    question: "Can I share something special with you?",
    subtext: "A gentle journey through words, memories, and everything in my heart.",
    options: [
      {
        text: "Yes, of course ❤️",
        responseMessage: "Thank you for opening your heart. Everything here was created with love, thought, and care just for you.",
        isAffirmative: true
      },
      {
        text: "Give me a moment.",
        responseMessage: "Take all the time in the world. There is zero pressure and zero rush. Whenever you are ready, I'm right here.",
        isAffirmative: false
      }
    ]
  },
  {
    id: 2,
    question: "Do you remember some of our little moments?",
    subtext: "The smiles, the quiet glances, and the laughter that made ordinary days special.",
    options: [
      {
        text: "Yes, I remember.",
        responseMessage: "I hold onto those moments every single day. They remind me how precious and irreplaceable what we have is.",
        isAffirmative: true
      },
      {
        text: "Show me again.",
        responseMessage: "I would be honored to show you. Seeing those memories through our eyes brings all that warmth right back.",
        isAffirmative: false
      }
    ]
  },
  {
    id: 3,
    question: "Would you like to see a few memories?",
    subtext: "From photographs that captured our warmth, to videos where we laughed together.",
    options: [
      {
        text: "Yes, show me.",
        responseMessage: "Let's walk through our little story together. Each photo and video has a place close to my heart.",
        isAffirmative: true
      },
      {
        text: "Maybe later.",
        responseMessage: "I respect your space completely. We will go at your pace, step by step, whenever you wish.",
        isAffirmative: false
      }
    ]
  },
  {
    id: 4,
    question: "Can I tell you something honestly?",
    subtext: "Words spoken without excuses, straight from my heart to yours.",
    options: [
      {
        text: "I'm listening ❤️",
        responseMessage: "Thank you for listening. You deserve honesty, patience, and complete sincerity from me.",
        isAffirmative: true
      },
      {
        text: "Give me a moment.",
        responseMessage: "Take your time. When you are ready to hear what is in my heart, I will be right here.",
        isAffirmative: false
      }
    ]
  }
];


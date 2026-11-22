export interface ApologyData {
  title: string;
  subtitle: string;
  recipientName: string;
  senderName: string;
  letterParagraphs: string[];
  signature: string;
}

export interface WelcomeData {
  greeting: string;
  heading: string;
  subheading: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  politeLaterMessage: string;
}

export interface ClosingData {
  heading: string;
  subtitle: string;
  messageParagraphs: string[];
  signoff: string;
  featuredPhoto: string;
}

export const welcomeContent: WelcomeData = {
  greeting: "With All My Love & Sincerity",
  heading: "Hey, My Favourite Person...",
  subheading: "I have something special to share with you. A little journey through our memories, some words from my heart and everything I wish I could tell you.",
  primaryButtonText: "Open My Little Surprise ❤️",
  secondaryButtonText: "Maybe Later",
  politeLaterMessage: "I completely understand. Take as much time as you need. There is no rush at all, and this will be waiting for you whenever your heart is ready."
};

export const apologyLetterContent: ApologyData = {
  title: "A Letter From My Heart",
  subtitle: "Honest words, free from excuses, written with complete care and vulnerability.",
  recipientName: "My Dearest,",
  senderName: "With all my heart,",
  letterParagraphs: [
    "I know that a simple sorry cannot undo everything, and I don't expect a few words to make everything okay.",
    "I am genuinely sorry for the things I did that hurt you.",
    "I don't want to make excuses or pretend that everything was perfect.",
    "Your feelings matter to me, and I want you to know that I recognize my mistakes.",
    "The memories we created together mean a lot to me. I still appreciate the little moments, the smiles, the conversations and everything that made our story special.",
    "I don't expect you to forget what happened or forgive me immediately.",
    "You deserve to be heard, understood and respected.",
    "I want to become better through my actions, not just my words.",
    "I am truly sorry."
  ],
  signature: "Forever learning, growing, and cherishing you."
};

export const closingContent: ClosingData = {
  heading: "Thank You For Being Part Of My Story ❤️",
  subtitle: "No pressure, no expectations, just immense gratitude for who you are.",
  messageParagraphs: [
    "Thank you for taking the time to go through these memories and read my words.",
    "Every photograph, every video and every little moment here means something special to me.",
    "I know that words alone cannot fix everything. I want my actions to show you that I genuinely mean what I have said.",
    "You deserve happiness, respect, honesty and understanding.",
    "No matter how much time you need, I respect your feelings."
  ],
  signoff: "With all my sincerity,\nFrom me, with love. ❤️",
  featuredPhoto: "/images/memories/photo_01.jpg"
};


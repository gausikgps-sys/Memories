export interface PromiseItem {
  id: number;
  title: string;
  statement: string;
  explanation: string;
  iconName: string;
  associatedPhoto?: string;
  tag: string;
}

export const promisesData: PromiseItem[] = [
  {
    id: 1,
    title: "Patient Listening",
    statement: "I promise to listen to you with patience, calm, and genuine understanding.",
    explanation: "I want to hear not just what you say, but what you feel, without jumping to defend myself or interrupting you.",
    iconName: "Ear",
    associatedPhoto: "/images/memories/photo_04.jpg",
    tag: "Understanding"
  },
  {
    id: 2,
    title: "Deep Respect",
    statement: "I promise to respect your feelings, your boundaries, and your perspective, even when we disagree.",
    explanation: "Your emotions are always valid. You should never feel like your concerns are dismissed or taken lightly.",
    iconName: "HeartHandshake",
    associatedPhoto: "/images/memories/photo_05.jpg",
    tag: "Respect"
  },
  {
    id: 3,
    title: "Honest Communication",
    statement: "I promise to communicate honestly, openly, and vulnerably with you.",
    explanation: "No hiding behind pride, no silence, and no guessing games. I want to build transparency and emotional safety between us.",
    iconName: "MessageCircleHeart",
    associatedPhoto: "/images/memories/photo_07.jpg",
    tag: "Honesty"
  },
  {
    id: 4,
    title: "Presence & Care",
    statement: "I promise to give you the time, thoughtful attention, and warmth you truly deserve.",
    explanation: "To be mentally and emotionally present whenever I am with you, prioritizing what matters most to your happiness.",
    iconName: "Clock",
    associatedPhoto: "/images/memories/photo_09.jpg",
    tag: "Attention"
  },
  {
    id: 5,
    title: "True Accountability",
    statement: "I promise to acknowledge my mistakes openly instead of making excuses or deflecting.",
    explanation: "When I stumble or let you down, I will own it with humility and focus on correcting it rather than justifying it.",
    iconName: "ShieldCheck",
    associatedPhoto: "/images/memories/photo_11.jpg",
    tag: "Maturity"
  },
  {
    id: 6,
    title: "Consistent Action",
    statement: "I promise to show improvement through consistent, everyday actions, not just empty words.",
    explanation: "Apologies fade if behavior doesn't change. I want my everyday respect and thoughtfulness to be what earns your trust.",
    iconName: "Sparkles",
    associatedPhoto: "/images/memories/photo_13.jpg",
    tag: "Dedication"
  }
];


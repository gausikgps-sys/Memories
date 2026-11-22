import React from 'react';
import { ApologyLetter } from '../components/ApologyLetter';

interface HeartToHeartProps {
  onPlayVoiceNote?: () => void;
}

export const HeartToHeart: React.FC<HeartToHeartProps> = ({ onPlayVoiceNote }) => {
  return (
    <div className="relative z-10">
      <ApologyLetter onPlayVoiceNote={onPlayVoiceNote} />
    </div>
  );
};


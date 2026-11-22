import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Running Cinematic Video Montage Generation Pipeline...');

const scriptPath = path.join(__dirname, 'setup_media_and_montage.py');
const py = spawn('python', [scriptPath], { stdio: 'inherit' });

py.on('close', (code) => {
  if (code === 0) {
    console.log('✨ Montage pipeline completed successfully! File: public/media/our-story-montage.mp4');
  } else {
    console.error(`❌ Montage pipeline exited with code ${code}`);
  }
});


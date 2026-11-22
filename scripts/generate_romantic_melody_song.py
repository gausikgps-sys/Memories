import os
import subprocess
import numpy as np
import scipy.signal as signal
from scipy.io import wavfile

FFMPEG = r'C:\Users\vaass\AppData\Roaming\Python\Python314\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe'
OUTPUT_DIR = r'C:\Apology WEBSITE\public\audio'
MONTAGE_FILE = r'C:\Apology WEBSITE\public\media\our-story-montage.mp4'

sr = 44100
bpm = 60.0
beat_len = 60.0 / bpm  # 1.0 second per beat!
total_bars = 24
beats_per_bar = 4
duration = total_bars * beats_per_bar * beat_len  # 96 seconds of rich melodic romance!
total_samples = int(duration * sr)

print(f"Composing Melodic Romantic Ballad Song: {duration:.1f}s at {bpm} BPM...")

# Pitch mapping
notes = {
    'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
    'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
}

left = np.zeros(total_samples, dtype=np.float32)
right = np.zeros(total_samples, dtype=np.float32)

# --- 1. Acoustic Guitar / Harp Pluck ---
def add_acoustic_pluck(note_name, start_beat, duration_beats=2.0, velocity=0.7, pan=0.35):
    freq = notes.get(note_name, 220.0)
    start_idx = int(start_beat * beat_len * sr)
    dur_sec = duration_beats * beat_len
    num_samples = int(dur_sec * sr)
    if start_idx >= total_samples:
        return
    if start_idx + num_samples > total_samples:
        num_samples = total_samples - start_idx

    t = np.linspace(0, dur_sec, num_samples, endpoint=False)
    # Pluck attack: crisp 8ms rise, natural decay
    env = np.exp(-t * (1.8 + freq * 0.0018))
    att_samples = int(0.008 * sr)
    if len(env) > att_samples:
        env[:att_samples] *= np.linspace(0, 1, att_samples)

    # Multi-string harmonic resonance
    sig = (
        np.sin(2 * np.pi * freq * t) * 1.0 +
        np.sin(2 * np.pi * 2 * freq * t) * 0.5 * np.exp(-t * 2.2) +
        np.sin(2 * np.pi * 3 * freq * t) * 0.28 * np.exp(-t * 3.5) +
        np.sin(2 * np.pi * 4 * freq * t) * 0.12 * np.exp(-t * 5.0)
    ) * env * velocity

    # Body resonance filter
    b, a = signal.butter(2, min(2400.0, freq * 4.5) / (0.5 * sr), btype='low')
    sig = signal.lfilter(b, a, sig)

    left[start_idx:start_idx + num_samples] += sig * (1.0 - pan)
    right[start_idx:start_idx + num_samples] += sig * pan

# --- 2. Soaring Romantic Lead Violin / Singing Melody ---
def add_lead_melody_note(note_name, start_beat, duration_beats=1.5, velocity=0.85, pan=0.52):
    freq = notes.get(note_name, 440.0)
    start_idx = int(start_beat * beat_len * sr)
    dur_sec = duration_beats * beat_len
    num_samples = int(dur_sec * sr)
    if start_idx >= total_samples:
        return
    if start_idx + num_samples > total_samples:
        num_samples = total_samples - start_idx

    t = np.linspace(0, dur_sec, num_samples, endpoint=False)

    # Expressive singing envelope (smooth 80ms swell, sustained warmth, gentle 120ms release)
    env = np.ones(num_samples)
    att_len = min(int(0.08 * sr), num_samples // 3)
    rel_len = min(int(0.14 * sr), num_samples // 3)
    if att_len > 0:
        env[:att_len] = np.sin(np.linspace(0, np.pi/2, att_len)) ** 2
    if rel_len > 0:
        env[-rel_len:] = np.sin(np.linspace(np.pi/2, 0, rel_len)) ** 2

    # Romantic Violin Vibrato (enters after 150ms and intensifies to 5.2 Hz)
    vibrato_depth = np.clip((t - 0.15) * 0.007, 0, 0.009)
    vibrato = 1.0 + vibrato_depth * np.sin(2 * np.pi * 5.2 * t)

    # Rich harmonic spectrum of violin
    sig = (
        np.sin(2 * np.pi * freq * vibrato * t) * 1.0 +
        np.sin(2 * np.pi * 2 * freq * vibrato * t) * 0.65 +
        np.sin(2 * np.pi * 3 * freq * vibrato * t) * 0.40 +
        np.sin(2 * np.pi * 4 * freq * vibrato * t) * 0.22 +
        np.sin(2 * np.pi * 5 * freq * vibrato * t) * 0.12
    ) * env * velocity

    # Formant body filter (sweet violin vocal warmth ~2.2kHz)
    b, a = signal.butter(2, [350.0 / (0.5 * sr), 3200.0 / (0.5 * sr)], btype='band')
    sig = signal.lfilter(b, a, sig)

    left[start_idx:start_idx + num_samples] += sig * (1.0 - pan)
    right[start_idx:start_idx + num_samples] += sig * pan

# --- 3. Warm Cello / Bass Foundation ---
def add_warm_bass(note_name, start_beat, duration_beats=4.0, velocity=0.8):
    freq = notes.get(note_name, 110.0)
    start_idx = int(start_beat * beat_len * sr)
    dur_sec = duration_beats * beat_len
    num_samples = int(dur_sec * sr)
    if start_idx >= total_samples:
        return
    if start_idx + num_samples > total_samples:
        num_samples = total_samples - start_idx

    t = np.linspace(0, dur_sec, num_samples, endpoint=False)
    env = np.exp(-t * 0.75)
    att = int(0.05 * sr)
    if len(env) > att:
        env[:att] *= np.linspace(0, 1, att)

    sig = (np.sin(2 * np.pi * freq * t) * 1.0 + 0.35 * np.sin(2 * np.pi * 2 * freq * t)) * env * velocity
    b, a = signal.butter(2, 400.0 / (0.5 * sr), btype='low')
    sig = signal.lfilter(b, a, sig)

    left[start_idx:start_idx + num_samples] += sig * 0.5
    right[start_idx:start_idx + num_samples] += sig * 0.5

# --- 4. Delicate Shaker / Heartbeat Ballad Pulse ---
def add_heartbeat_pulse(start_beat, velocity=0.15):
    start_idx = int(start_beat * beat_len * sr)
    dur_sec = 0.25
    n_samp = int(dur_sec * sr)
    if start_idx + n_samp >= total_samples:
        return
    t = np.linspace(0, dur_sec, n_samp, endpoint=False)
    env = np.exp(-t * 22.0)
    # Warm sub thump + gentle brushed air
    noise = np.random.randn(n_samp) * 0.08
    thump = np.sin(2 * np.pi * 55.0 * t) * 0.8
    sig = (thump + noise) * env * velocity
    left[start_idx:start_idx + n_samp] += sig * 0.5
    right[start_idx:start_idx + n_samp] += sig * 0.5

# ==========================================
# SONG STRUCTURE (Key of C Major / A Minor)
# Progression: C -> G -> Am -> F (The classic timeless love song progression!)
# ==========================================

chords = [
    ('C', 'C3', ['C3', 'G3', 'C4', 'E4']),
    ('G', 'G2', ['G2', 'D3', 'G3', 'B3']),
    ('Am', 'A2', ['A2', 'E3', 'A3', 'C4']),
    ('F', 'F2', ['F2', 'C3', 'F3', 'A3'])
]

# A. Backing Guitar Arpeggio across all 24 bars
for bar in range(total_bars):
    chord_idx = bar % 4
    c_name, bass_root, chord_notes = chords[chord_idx]
    bar_start_beat = bar * 4

    # Bass note
    add_warm_bass(bass_root, bar_start_beat, duration_beats=3.8, velocity=0.75)

    # Fingerstyle acoustic plucks (16th notes / 8th notes pattern)
    pattern = [
        (0.0, chord_notes[0], 0.7),
        (0.5, chord_notes[1], 0.6),
        (1.0, chord_notes[2], 0.65),
        (1.5, chord_notes[3], 0.7),
        (2.0, chord_notes[1], 0.6),
        (2.5, chord_notes[2], 0.65),
        (3.0, chord_notes[3], 0.7),
        (3.5, chord_notes[2], 0.6)
    ]
    for rel_b, n_name, vel in pattern:
        add_acoustic_pluck(n_name, bar_start_beat + rel_b, duration_beats=1.8, velocity=vel)

    # Gentle heartbeat rhythm in bars 8 through 20 (Verse & Chorus)
    if 4 <= bar <= 20:
        add_heartbeat_pulse(bar_start_beat + 0.0, velocity=0.22)
        add_heartbeat_pulse(bar_start_beat + 0.75, velocity=0.15)
        add_heartbeat_pulse(bar_start_beat + 2.0, velocity=0.20)

# B. THE ROMANTIC LEAD MELODY (The Song's Singing Soul)
# Bars 4-11: Verse Melody ("Every word I wish I told you...")
verse_melody = [
    # Bar 4 (C)
    ('E4', 16.0, 1.0), ('G4', 17.0, 1.0), ('A4', 18.0, 1.5), ('G4', 19.5, 0.5),
    # Bar 5 (G)
    ('D4', 20.0, 2.0), ('E4', 22.0, 1.0), ('F4', 23.0, 1.0),
    # Bar 6 (Am)
    ('E4', 24.0, 1.5), ('C4', 25.5, 1.0), ('A3', 26.5, 1.5),
    # Bar 7 (F)
    ('D4', 28.0, 1.5), ('E4', 29.5, 1.0), ('F4', 30.5, 1.5),

    # Bar 8 (C)
    ('G4', 32.0, 1.0), ('C5', 33.0, 1.5), ('B4', 34.5, 1.0), ('A4', 35.5, 0.5),
    # Bar 9 (G)
    ('G4', 36.0, 2.0), ('D4', 38.0, 1.0), ('E4', 39.0, 1.0),
    # Bar 10 (Am)
    ('C4', 40.0, 1.5), ('E4', 41.5, 1.0), ('G4', 42.5, 1.5),
    # Bar 11 (F - building into chorus)
    ('A4', 44.0, 2.0), ('B4', 46.0, 2.0)
]

for n_name, start_b, dur_b in verse_melody:
    add_lead_melody_note(n_name, start_b, duration_beats=dur_b, velocity=0.82)

# Bars 12-19: Chorus Melody ("You are my favorite person, forever in my heart...")
# High, sweeping, passionate romantic peak!
chorus_melody = [
    # Bar 12 (C) - Soaring high note
    ('C5', 48.0, 1.5), ('D5', 49.5, 0.5), ('E5', 50.0, 1.5), ('D5', 51.5, 0.5),
    # Bar 13 (G)
    ('B4', 52.0, 2.0), ('G4', 54.0, 1.0), ('A4', 55.0, 1.0),
    # Bar 14 (Am)
    ('C5', 56.0, 1.5), ('B4', 57.5, 1.0), ('A4', 58.5, 1.5),
    # Bar 15 (F)
    ('G4', 60.0, 1.5), ('F4', 61.5, 1.0), ('E4', 62.5, 1.5),

    # Bar 16 (C) - Second Chorus phrase
    ('C5', 64.0, 1.5), ('D5', 65.5, 0.5), ('E5', 66.0, 2.0),
    # Bar 17 (G) - Climax
    ('G5', 68.0, 1.5), ('E5', 69.5, 1.0), ('D5', 70.5, 1.5),
    # Bar 18 (Am)
    ('C5', 72.0, 2.0), ('E5', 74.0, 1.0), ('D5', 75.0, 1.0),
    # Bar 19 (F) - Soft landing
    ('C5', 76.0, 3.5)
]

for n_name, start_b, dur_b in chorus_melody:
    add_lead_melody_note(n_name, start_b, duration_beats=dur_b, velocity=0.92, pan=0.55)

# Bars 20-23: Outro Melody (Tender resolution, quiet whisper)
outro_melody = [
    ('G4', 80.0, 1.5), ('E4', 81.5, 1.0), ('D4', 82.5, 1.5),
    ('C4', 84.0, 2.0), ('E4', 86.0, 2.0),
    ('C5', 88.0, 3.0),
    ('C4', 92.0, 4.0)
]
for n_name, start_b, dur_b in outro_melody:
    add_lead_melody_note(n_name, start_b, duration_beats=dur_b, velocity=0.75, pan=0.5)

# --- 5. Lush Studio Reverb ---
print("Applying studio reverb...")
reverb_sec = 2.8
rev_samples = int(reverb_sec * sr)
t_rev = np.linspace(0, reverb_sec, rev_samples)
np.random.seed(101)
ir_l = np.random.randn(rev_samples) * np.exp(-t_rev * 2.0)
ir_r = np.random.randn(rev_samples) * np.exp(-t_rev * 2.0)
ir_l[:int(0.02 * sr)] = 0
ir_r[:int(0.02 * sr)] = 0
b_rev, a_rev = signal.butter(2, 2600.0 / (0.5 * sr), btype='low')
ir_l = signal.lfilter(b_rev, a_rev, ir_l)
ir_r = signal.lfilter(b_rev, a_rev, ir_r)
ir_l /= np.max(np.abs(ir_l))
ir_r /= np.max(np.abs(ir_r))

wet_l = signal.fftconvolve(left, ir_l, mode='full')[:total_samples]
wet_r = signal.fftconvolve(right, ir_r, mode='full')[:total_samples]

master_l = left * 0.70 + wet_l * 0.30
master_r = right * 0.70 + wet_r * 0.30

# Fade in and fade out
fade_in = int(1.2 * sr)
fade_out = int(2.5 * sr)
master_l[:fade_in] *= np.linspace(0, 1, fade_in)
master_r[:fade_in] *= np.linspace(0, 1, fade_in)
master_l[-fade_out:] *= np.linspace(1, 0, fade_out)
master_r[-fade_out:] *= np.linspace(1, 0, fade_out)

# Warm analog saturation
master_l = np.tanh(master_l * 1.3)
master_r = np.tanh(master_r * 1.3)

# Peak normalization (-1.0 dB)
peak = max(np.max(np.abs(master_l)), np.max(np.abs(master_r)), 0.001)
master_l = (master_l / peak) * 0.89
master_r = (master_r / peak) * 0.89

# Export WAV & MP3
wav_path = os.path.join(OUTPUT_DIR, 'romantic-melody-song.wav')
stereo_pcm = np.stack([master_l, master_r], axis=1)
wavfile.write(wav_path, sr, (stereo_pcm * 32767).astype(np.int16))

# Primary melody song file
song_mp3 = os.path.join(OUTPUT_DIR, 'romantic-melody-song.mp3')
subprocess.run([
    FFMPEG, '-y',
    '-i', wav_path,
    '-c:a', 'libmp3lame',
    '-b:a', '192k',
    song_mp3
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Also update romantic-bgm.mp3 so it defaults to this gorgeous romantic melody song
bgm_mp3 = os.path.join(OUTPUT_DIR, 'romantic-bgm.mp3')
subprocess.run([
    FFMPEG, '-y',
    '-i', wav_path,
    '-c:a', 'libmp3lame',
    '-b:a', '192k',
    bgm_mp3
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

if os.path.exists(wav_path):
    os.remove(wav_path)

print(f"SUCCESS: Composed Melodic Romantic Song: {song_mp3} ({os.path.getsize(song_mp3)} bytes)")

# Update Montage with the new melody song
temp_montage = r'C:\Apology WEBSITE\public\media\our-story-montage-melody.mp4'
cmd_remix = [
    FFMPEG, '-y',
    '-i', MONTAGE_FILE,
    '-i', song_mp3,
    '-map', '0:v:0',
    '-map', '1:a:0',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    '-movflags', '+faststart',
    temp_montage
]
res_remix = subprocess.run(cmd_remix, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
if res_remix.returncode == 0 and os.path.exists(temp_montage):
    os.replace(temp_montage, MONTAGE_FILE)
    print(f"SUCCESS: Updated {MONTAGE_FILE} with melodic romantic song! ({os.path.getsize(MONTAGE_FILE)} bytes)")


import os
import subprocess
import numpy as np
import scipy.signal as signal
from scipy.io import wavfile

FFMPEG = r'C:\Users\vaass\AppData\Roaming\Python\Python314\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe'
OUTPUT_DIR = r'C:\Apology WEBSITE\public\audio'
MONTAGE_FILE = r'C:\Apology WEBSITE\public\media\our-story-montage.mp4'

sr = 44100
bpm = 56.0
beat_len = 60.0 / bpm  # ~1.071 seconds per beat
total_bars = 16
beats_per_bar = 4
duration = total_bars * beats_per_bar * beat_len  # ~68.5 seconds
total_samples = int(duration * sr)

print(f"Synthesizing Mind-Easing Romantic Soundtrack: {duration:.1f}s at {bpm} BPM...")

# Note frequencies (Hz)
notes = {
    'D2': 73.42, 'F#2': 92.50, 'A2': 110.00, 'B2': 123.47,
    'D3': 146.83, 'E3': 164.81, 'F#3': 185.00, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'C#4': 277.18,
    'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C#5': 554.37,
    'D5': 587.33, 'E5': 659.25, 'F#5': 739.99, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77, 'C#6': 1108.73,
    'D6': 1174.66, 'E6': 1318.51, 'F#6': 1479.98
}

left = np.zeros(total_samples, dtype=np.float32)
right = np.zeros(total_samples, dtype=np.float32)

# --- 1. Felt Piano Synthesizer Function ---
def add_felt_piano_note(note_name, start_time, duration_beats=3.5, velocity=0.7, pan=0.5):
    freq = notes.get(note_name, 440.0)
    start_idx = int(start_time * sr)
    note_duration_sec = duration_beats * beat_len
    num_samples = int(note_duration_sec * sr)
    if start_idx >= total_samples:
        return
    if start_idx + num_samples > total_samples:
        num_samples = total_samples - start_idx

    t = np.linspace(0, note_duration_sec, num_samples, endpoint=False)

    # Soft hammer strike envelope: gentle rise (35ms) then natural acoustic decay
    attack_samples = int(0.035 * sr)
    attack_curve = np.sin(np.linspace(0, np.pi/2, attack_samples)) ** 2
    decay_curve = np.exp(-t * (1.1 + freq * 0.0012))
    env = decay_curve.copy()
    if len(env) > attack_samples:
        env[:attack_samples] *= attack_curve

    # Acoustic Piano Harmonics (warm, rich, weighted toward fundamental and 2nd harmonic)
    # Higher harmonics decay exponentially faster to emulate natural string physics
    sig = (
        np.sin(2 * np.pi * freq * t) * 1.0 +
        np.sin(2 * np.pi * 2 * freq * t) * 0.45 * np.exp(-t * 1.5) +
        np.sin(2 * np.pi * 3 * freq * t) * 0.22 * np.exp(-t * 2.8) +
        np.sin(2 * np.pi * 4 * freq * t) * 0.10 * np.exp(-t * 4.2) +
        np.sin(2 * np.pi * 5 * freq * t) * 0.04 * np.exp(-t * 5.5)
    ) * env * velocity

    # Felt piano warm lowpass filtering (cutting harsh frequencies above ~1200Hz)
    nyq = 0.5 * sr
    cutoff = min(1600.0, freq * 3.8)
    b, a = signal.butter(2, cutoff / nyq, btype='low')
    sig = signal.lfilter(b, a, sig)

    left[start_idx:start_idx + num_samples] += sig * (1.0 - pan)
    right[start_idx:start_idx + num_samples] += sig * pan

# --- 2. Warm Cello / String Pad Synthesizer Function ---
def add_string_pad(chord_notes, start_time, duration_bars=2.0, volume=0.22):
    start_idx = int(start_time * sr)
    pad_dur_sec = duration_bars * beats_per_bar * beat_len
    num_samples = int(pad_dur_sec * sr)
    if start_idx >= total_samples:
        return
    if start_idx + num_samples > total_samples:
        num_samples = total_samples - start_idx

    t = np.linspace(0, pad_dur_sec, num_samples, endpoint=False)
    
    # Smooth swell envelope (slow attack 1.4s, gentle release 1.6s)
    env = np.ones(num_samples)
    attack_len = min(int(1.4 * sr), num_samples // 3)
    release_len = min(int(1.6 * sr), num_samples // 3)
    if attack_len > 0:
        env[:attack_len] = np.sin(np.linspace(0, np.pi/2, attack_len)) ** 2
    if release_len > 0:
        env[-release_len:] = np.sin(np.linspace(np.pi/2, 0, release_len)) ** 2

    # Vibrato LFO at 4.6 Hz
    vibrato = 1.0 + 0.004 * np.sin(2 * np.pi * 4.6 * t)

    chord_sig_l = np.zeros(num_samples)
    chord_sig_r = np.zeros(num_samples)

    for idx, n in enumerate(chord_notes):
        freq = notes.get(n, 220.0)
        # Detuned stereo voice
        pan = 0.35 + 0.3 * (idx / max(1, len(chord_notes) - 1))
        # Warm string waveform (warm filtered saw + subtle sub)
        wave_l = np.sin(2 * np.pi * (freq * 0.998) * t * vibrato) * 0.6 + np.sin(2 * np.pi * freq * 2 * t) * 0.2
        wave_r = np.sin(2 * np.pi * (freq * 1.002) * t * vibrato) * 0.6 + np.sin(2 * np.pi * freq * 2 * t) * 0.2
        chord_sig_l += wave_l * (1.0 - pan)
        chord_sig_r += wave_r * pan

    # Warm lowpass on string pad
    b, a = signal.butter(2, 850.0 / (0.5 * sr), btype='low')
    chord_sig_l = signal.lfilter(b, a, chord_sig_l) * env * volume
    chord_sig_r = signal.lfilter(b, a, chord_sig_r) * env * volume

    left[start_idx:start_idx + num_samples] += chord_sig_l
    right[start_idx:start_idx + num_samples] += chord_sig_r

# --- 3. Musical Composition: "Serenade for My Favorite Person" ---
# Key: D Major / B Minor
# Deeply emotive 4-chord cyclical progression:
# Bar 1-4:   D Major 9     (Peace, warmth, gratitude)
# Bar 5-8:   B minor 9     (Reflection, sincerity, apology)
# Bar 9-12:  G Major 9     (Tender devotion, sweet memories)
# Bar 13-16: A sus4 -> A    (Resolution, hope, eternal love)

# String pads for all 16 bars
add_string_pad(['D3', 'F#3', 'A3', 'C#4'], start_time=0.0 * beat_len, duration_bars=1.0, volume=0.18)
add_string_pad(['B2', 'D3', 'F#3', 'A3'], start_time=4.0 * beat_len, duration_bars=1.0, volume=0.20)
add_string_pad(['G2', 'D3', 'F#3', 'B3'], start_time=8.0 * beat_len, duration_bars=1.0, volume=0.20)
add_string_pad(['A2', 'E3', 'A3', 'C#4'], start_time=12.0 * beat_len, duration_bars=1.0, volume=0.19)

add_string_pad(['D3', 'F#3', 'A3', 'E4'], start_time=16.0 * beat_len, duration_bars=1.0, volume=0.21)
add_string_pad(['B2', 'F#3', 'B3', 'D4'], start_time=20.0 * beat_len, duration_bars=1.0, volume=0.22)
add_string_pad(['G2', 'D3', 'G3', 'B3'], start_time=24.0 * beat_len, duration_bars=1.0, volume=0.22)
add_string_pad(['A2', 'E3', 'A3', 'C#4'], start_time=28.0 * beat_len, duration_bars=1.0, volume=0.20)

add_string_pad(['D3', 'A3', 'D4', 'F#4'], start_time=32.0 * beat_len, duration_bars=1.0, volume=0.22)
add_string_pad(['B2', 'F#3', 'A3', 'C#4'], start_time=36.0 * beat_len, duration_bars=1.0, volume=0.23)
add_string_pad(['G2', 'D3', 'F#3', 'A3'], start_time=40.0 * beat_len, duration_bars=1.0, volume=0.22)
add_string_pad(['A2', 'E3', 'G3', 'C#4'], start_time=44.0 * beat_len, duration_bars=1.0, volume=0.20)

add_string_pad(['D3', 'F#3', 'A3', 'D4'], start_time=48.0 * beat_len, duration_bars=1.0, volume=0.21)
add_string_pad(['B2', 'D3', 'F#3', 'B3'], start_time=52.0 * beat_len, duration_bars=1.0, volume=0.20)
add_string_pad(['G2', 'D3', 'G3', 'B3'], start_time=56.0 * beat_len, duration_bars=1.0, volume=0.19)
add_string_pad(['A2', 'E3', 'A3', 'C#4'], start_time=60.0 * beat_len, duration_bars=1.0, volume=0.18)

# --- Piano Arpeggios & Melody ---
# Pattern for Bar 1-4 (D Major)
def play_d_bar(start_beat):
    # Bass root
    add_felt_piano_note('D2', start_beat * beat_len, duration_beats=4.0, velocity=0.85, pan=0.35)
    add_felt_piano_note('A2', (start_beat + 0.5) * beat_len, duration_beats=3.5, velocity=0.70, pan=0.4)
    add_felt_piano_note('F#3', (start_beat + 1.0) * beat_len, duration_beats=3.0, velocity=0.75, pan=0.45)
    add_felt_piano_note('D4', (start_beat + 1.5) * beat_len, duration_beats=2.5, velocity=0.78, pan=0.55)
    # Tender melody
    add_felt_piano_note('F#4', (start_beat + 2.0) * beat_len, duration_beats=2.0, velocity=0.82, pan=0.6)
    add_felt_piano_note('A4', (start_beat + 2.5) * beat_len, duration_beats=1.8, velocity=0.85, pan=0.65)
    add_felt_piano_note('E4', (start_beat + 3.0) * beat_len, duration_beats=1.5, velocity=0.75, pan=0.55)
    add_felt_piano_note('D4', (start_beat + 3.5) * beat_len, duration_beats=1.5, velocity=0.70, pan=0.5)

# Pattern for B minor
def play_bm_bar(start_beat):
    add_felt_piano_note('B2', start_beat * beat_len, duration_beats=4.0, velocity=0.85, pan=0.35)
    add_felt_piano_note('F#3', (start_beat + 0.5) * beat_len, duration_beats=3.5, velocity=0.70, pan=0.4)
    add_felt_piano_note('D4', (start_beat + 1.0) * beat_len, duration_beats=3.0, velocity=0.75, pan=0.48)
    add_felt_piano_note('F#4', (start_beat + 1.5) * beat_len, duration_beats=2.5, velocity=0.78, pan=0.55)
    add_felt_piano_note('D5', (start_beat + 2.0) * beat_len, duration_beats=2.2, velocity=0.88, pan=0.65)
    add_felt_piano_note('C#5', (start_beat + 2.75) * beat_len, duration_beats=1.5, velocity=0.80, pan=0.6)
    add_felt_piano_note('B4', (start_beat + 3.25) * beat_len, duration_beats=1.5, velocity=0.78, pan=0.55)

# Pattern for G Major
def play_g_bar(start_beat):
    add_felt_piano_note('G2', start_beat * beat_len, duration_beats=4.0, velocity=0.85, pan=0.35)
    add_felt_piano_note('D3', (start_beat + 0.5) * beat_len, duration_beats=3.5, velocity=0.70, pan=0.4)
    add_felt_piano_note('B3', (start_beat + 1.0) * beat_len, duration_beats=3.0, velocity=0.75, pan=0.48)
    add_felt_piano_note('G4', (start_beat + 1.5) * beat_len, duration_beats=2.5, velocity=0.78, pan=0.55)
    add_felt_piano_note('B4', (start_beat + 2.0) * beat_len, duration_beats=2.0, velocity=0.82, pan=0.62)
    add_felt_piano_note('A4', (start_beat + 2.5) * beat_len, duration_beats=1.8, velocity=0.80, pan=0.58)
    add_felt_piano_note('F#4', (start_beat + 3.0) * beat_len, duration_beats=1.5, velocity=0.75, pan=0.52)
    add_felt_piano_note('E4', (start_beat + 3.5) * beat_len, duration_beats=1.5, velocity=0.70, pan=0.48)

# Pattern for A Sus4 / A
def play_a_bar(start_beat):
    add_felt_piano_note('A2', start_beat * beat_len, duration_beats=4.0, velocity=0.85, pan=0.35)
    add_felt_piano_note('E3', (start_beat + 0.5) * beat_len, duration_beats=3.5, velocity=0.70, pan=0.4)
    add_felt_piano_note('C#4', (start_beat + 1.0) * beat_len, duration_beats=3.0, velocity=0.75, pan=0.48)
    add_felt_piano_note('E4', (start_beat + 1.5) * beat_len, duration_beats=2.5, velocity=0.78, pan=0.55)
    add_felt_piano_note('A4', (start_beat + 2.0) * beat_len, duration_beats=2.2, velocity=0.85, pan=0.65)
    add_felt_piano_note('G4', (start_beat + 2.75) * beat_len, duration_beats=1.5, velocity=0.78, pan=0.6)
    add_felt_piano_note('F#4', (start_beat + 3.25) * beat_len, duration_beats=1.5, velocity=0.72, pan=0.55)

# Render cyclical phrases across the 16 bars
for cycle in range(4):
    base_b = cycle * 16
    play_d_bar(base_b + 0)
    play_bm_bar(base_b + 4)
    play_g_bar(base_b + 8)
    play_a_bar(base_b + 12)

# Add delicate music box celestial chimes in cycle 2 and 3
chime_notes = [
    ('F#5', 18.0), ('A5', 20.0), ('D6', 22.0), ('C#6', 26.0), ('B5', 28.0),
    ('F#5', 34.0), ('A5', 36.0), ('D6', 38.0), ('E6', 42.0), ('D6', 44.0)
]
for cn, beat_pos in chime_notes:
    t_sec = beat_pos * beat_len
    idx = int(t_sec * sr)
    dur_sec = 2.0
    n_samp = int(dur_sec * sr)
    if idx + n_samp < total_samples:
        t_chime = np.linspace(0, dur_sec, n_samp)
        f_chime = notes[cn]
        env_chime = np.exp(-t_chime * 2.8)
        att = min(500, n_samp)
        env_chime[:att] *= np.sin(np.linspace(0, np.pi/2, att))**2
        sig_chime = (np.sin(2*np.pi*f_chime*t_chime) + 0.3*np.sin(2*np.pi*2*f_chime*t_chime)) * env_chime * 0.12
        left[idx:idx+n_samp] += sig_chime * 0.3
        right[idx:idx+n_samp] += sig_chime * 0.7

# --- 4. Lush Stereo Hall Convolution Reverb ---
print("Applying lush 3.2s studio hall reverb...")
reverb_sec = 3.2
rev_samples = int(reverb_sec * sr)
t_rev = np.linspace(0, reverb_sec, rev_samples)

# Dual-channel impulse response with smooth exponential decay and high-frequency damping
np.random.seed(42)
ir_l = np.random.randn(rev_samples) * np.exp(-t_rev * 1.8)
ir_r = np.random.randn(rev_samples) * np.exp(-t_rev * 1.8)
# Pre-delay 25ms
pre_delay = int(0.025 * sr)
ir_l[:pre_delay] = 0
ir_r[:pre_delay] = 0
# Lowpass the impulse response to simulate soft room reflections
b_rev, a_rev = signal.butter(2, 2200.0 / (0.5 * sr), btype='low')
ir_l = signal.lfilter(b_rev, a_rev, ir_l)
ir_r = signal.lfilter(b_rev, a_rev, ir_r)
ir_l /= np.max(np.abs(ir_l))
ir_r /= np.max(np.abs(ir_r))

# Convolve (using FFT for speed)
wet_l = signal.fftconvolve(left, ir_l, mode='full')[:total_samples]
wet_r = signal.fftconvolve(right, ir_r, mode='full')[:total_samples]

# Mix dry & wet (65% dry, 35% wet)
master_l = left * 0.68 + wet_l * 0.32
master_r = right * 0.68 + wet_r * 0.32

# Seamless loop fade-in (1.5s) and fade-out (2.0s)
fade_in = int(1.5 * sr)
fade_out = int(2.0 * sr)
master_l[:fade_in] *= np.linspace(0, 1, fade_in)
master_r[:fade_in] *= np.linspace(0, 1, fade_in)
master_l[-fade_out:] *= np.linspace(1, 0, fade_out)
master_r[-fade_out:] *= np.linspace(1, 0, fade_out)

# Soft tape warmth saturation (analog soft clip)
master_l = np.tanh(master_l * 1.25)
master_r = np.tanh(master_r * 1.25)

# Peak normalization to -1.0 dBFS
max_peak = max(np.max(np.abs(master_l)), np.max(np.abs(master_r)), 0.001)
target_peak = 0.89  # -1 dBFS
master_l = (master_l / max_peak) * target_peak
master_r = (master_r / max_peak) * target_peak

# Convert to 16-bit integer PCM
wav_out_path = os.path.join(OUTPUT_DIR, 'romantic-bgm-master.wav')
stereo_pcm = np.stack([master_l, master_r], axis=1)
wavfile.write(wav_out_path, sr, (stereo_pcm * 32767).astype(np.int16))

# Convert to high-quality MP3 (192 kbps) using FFmpeg
final_mp3 = os.path.join(OUTPUT_DIR, 'romantic-bgm.mp3')
subprocess.run([
    FFMPEG, '-y',
    '-i', wav_out_path,
    '-c:a', 'libmp3lame',
    '-b:a', '192k',
    final_mp3
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

if os.path.exists(wav_out_path):
    os.remove(wav_out_path)

print(f"SUCCESS: Generated romantic & mind-easing soundtrack: {final_mp3} ({os.path.getsize(final_mp3)} bytes)")

# --- 5. Update Montage with this new soundtrack ---
print("Updating cinematic video montage with new soundtrack...")
temp_montage = r'C:\Apology WEBSITE\public\media\our-story-montage-temp.mp4'
cmd_remix = [
    FFMPEG, '-y',
    '-i', MONTAGE_FILE,
    '-i', final_mp3,
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
    print(f"SUCCESS: Updated {MONTAGE_FILE} with new romantic music! ({os.path.getsize(MONTAGE_FILE)} bytes)")
else:
    print(f"Remix note: {res_remix.stderr[-200:]}")

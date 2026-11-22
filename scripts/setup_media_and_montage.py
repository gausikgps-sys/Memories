import os
import sys
import glob
import math
import struct
import wave
import shutil
import subprocess
import json

FFMPEG = r'C:\Users\vaass\AppData\Roaming\Python\Python314\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe'
SOURCE_DIR = r'C:\Apology WEBSITE\Photos and videos'
PUBLIC_DIR = r'C:\Apology WEBSITE\public'
IMAGES_DIR = os.path.join(PUBLIC_DIR, 'images', 'memories')
VIDEOS_DIR = os.path.join(PUBLIC_DIR, 'videos')
AUDIO_DIR = os.path.join(PUBLIC_DIR, 'audio')
MEDIA_DIR = os.path.join(PUBLIC_DIR, 'media')

for d in [IMAGES_DIR, VIDEOS_DIR, AUDIO_DIR, MEDIA_DIR]:
    os.makedirs(d, exist_ok=True)

print("--- Step 1: Copying and organizing Photos ---")
source_files = os.listdir(SOURCE_DIR)
image_exts = {'.jpg', '.jpeg', '.png', '.webp'}
video_exts = {'.mp4', '.mov', '.avi', '.m4v'}

photos = [f for f in source_files if os.path.splitext(f)[1].lower() in image_exts]
videos = [f for f in source_files if os.path.splitext(f)[1].lower() in video_exts]

photos.sort()
videos.sort()

photo_manifest = []
for idx, p in enumerate(photos, 1):
    src = os.path.join(SOURCE_DIR, p)
    # clean name
    clean_name = f"photo_{idx:02d}.jpg"
    dst_clean = os.path.join(IMAGES_DIR, clean_name)
    shutil.copy2(src, dst_clean)
    
    # also copy with original filename so any reference works
    safe_orig_name = p.replace(" ", "_")
    dst_orig = os.path.join(IMAGES_DIR, safe_orig_name)
    shutil.copy2(src, dst_orig)
    
    photo_manifest.append({
        "id": f"photo-{idx}",
        "original_name": p,
        "clean_filename": clean_name,
        "path": f"/images/memories/{clean_name}",
        "alt_path": f"/images/memories/{safe_orig_name}"
    })
    print(f"Copied photo {idx}: {p} -> {clean_name}")

print(f"Total photos processed: {len(photo_manifest)}")

print("\n--- Step 2: Transcoding Videos to standard H.264 / AAC MP4 ---")
video_manifest = []
for idx, v in enumerate(videos, 1):
    src = os.path.join(SOURCE_DIR, v)
    clean_name = f"video_{idx:02d}.mp4"
    dst = os.path.join(VIDEOS_DIR, clean_name)
    
    print(f"Transcoding video {idx}: {v} -> {clean_name} (H.264/AAC)...")
    # We re-encode to baseline/main h264 with yuv420p so all web browsers & phones play it natively
    # Also add an aac audio stream if silent or preserve audio
    cmd = [
        FFMPEG, '-y',
        '-i', src,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-crf', '22',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        dst
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Warning on transcoding {v}: {res.stderr[-300:]}")
        # fallback: copy original
        shutil.copy2(src, dst)
    else:
        print(f"Successfully transcoded {clean_name} ({os.path.getsize(dst)} bytes)")

    video_manifest.append({
        "id": f"video-{idx}",
        "original_name": v,
        "clean_filename": clean_name,
        "path": f"/videos/{clean_name}"
    })

print(f"Total videos processed: {len(video_manifest)}")

print("\n--- Step 3: Generating Romantic Acoustic Piano Background Music ---")
# Generate a gentle, romantic 45-second piano arpeggio loop using wave synthesis
# Progression: Cmaj7 - Am9 - Fadd9 - Gsus4 -> C
sr = 44100
duration_sec = 48.0
total_samples = int(sr * duration_sec)

# Notes frequencies
notes_freq = {
    'C3': 130.81, 'E3': 164.81, 'G3': 196.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99, 'A5': 880.00,
    'A2': 110.00, 'F2': 87.31, 'G2': 98.00, 'F3': 174.61, 'A3': 220.00, 'D3': 146.83
}

# 4 chords, 12 seconds each = 48 seconds
chords = [
    # Cmaj7 (0-12s)
    [('C3', 0.0), ('G3', 0.5), ('E4', 1.0), ('B4', 1.5), ('C5', 2.0), ('E5', 2.5), ('G4', 3.0), ('B4', 3.5),
     ('C3', 4.0), ('G3', 4.5), ('E4', 5.0), ('B4', 5.5), ('D5', 6.0), ('C5', 7.0), ('G4', 8.5), ('E4', 10.0)],
    # Am9 (12-24s)
    [('A2', 12.0), ('E3', 12.5), ('C4', 13.0), ('G4', 13.5), ('B4', 14.0), ('C5', 14.5), ('E5', 15.0), ('B4', 15.5),
     ('A2', 16.0), ('E3', 16.5), ('C4', 17.0), ('G4', 17.5), ('C5', 18.0), ('B4', 19.0), ('G4', 20.5), ('E4', 22.0)],
    # Fadd9 (24-36s)
    [('F2', 24.0), ('C3', 24.5), ('A3', 25.0), ('G4', 25.5), ('A4', 26.0), ('C5', 26.5), ('E5', 27.0), ('C5', 27.5),
     ('F2', 28.0), ('C3', 28.5), ('A3', 29.0), ('G4', 29.5), ('E5', 30.0), ('D5', 31.0), ('A4', 32.5), ('G4', 34.0)],
    # Gsus4 -> G (36-48s)
    [('G2', 36.0), ('D3', 36.5), ('C4', 37.0), ('G4', 37.5), ('B4', 38.0), ('D5', 38.5), ('G5', 39.0), ('D5', 39.5),
     ('G2', 40.0), ('D3', 40.5), ('B3', 41.0), ('G4', 41.5), ('D5', 42.0), ('C5', 43.0), ('B4', 44.5), ('G4', 46.0)]
]

audio_left = [0.0] * total_samples
audio_right = [0.0] * total_samples

for chord in chords:
    for note_name, start_t in chord:
        freq = notes_freq.get(note_name, 440.0)
        start_idx = int(start_t * sr)
        note_len_sec = 4.0
        note_samples = int(note_len_sec * sr)
        pan = 0.5 + 0.25 * math.sin(freq * 0.01)
        for i in range(note_samples):
            idx = start_idx + i
            if idx >= total_samples:
                break
            t = i / sr
            # gentle acoustic piano envelope: quick soft attack, exponential decay
            env = (1.0 - math.exp(-t * 25.0)) * math.exp(-t * 1.4)
            # rich harmonics
            val = (math.sin(2 * math.pi * freq * t) * 0.6 +
                   math.sin(4 * math.pi * freq * t) * 0.25 +
                   math.sin(6 * math.pi * freq * t) * 0.1 +
                   math.sin(8 * math.pi * freq * t) * 0.05) * env * 0.22
            audio_left[idx] += val * (1.0 - pan)
            audio_right[idx] += val * pan

# Add gentle warm stereo reverb / delay
delay_samples = int(0.35 * sr)
for i in range(delay_samples, total_samples):
    audio_left[i] += audio_right[i - delay_samples] * 0.25
    audio_right[i] += audio_left[i - delay_samples] * 0.25

# Normalize and convert to 16-bit PCM
max_val = max(max(abs(x) for x in audio_left), max(abs(x) for x in audio_right), 0.001)
scale = 30000.0 / max_val

wav_temp = os.path.join(AUDIO_DIR, 'romantic-bgm-temp.wav')
with wave.open(wav_temp, 'w') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sr)
    raw_bytes = bytearray()
    for l, r in zip(audio_left, audio_right):
        # apply subtle fade-in / fade-out
        sl = int(max(-32767, min(32767, l * scale)))
        sr_val = int(max(-32767, min(32767, r * scale)))
        raw_bytes.extend(struct.pack('<hh', sl, sr_val))
    wf.writeframes(raw_bytes)

# Convert to MP3 using ffmpeg
bgm_mp3 = os.path.join(AUDIO_DIR, 'romantic-bgm.mp3')
subprocess.run([FFMPEG, '-y', '-i', wav_temp, '-c:a', 'libmp3lame', '-q:a', '2', bgm_mp3], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if os.path.exists(wav_temp):
    os.remove(wav_temp)
print(f"Created romantic background music: {bgm_mp3} ({os.path.getsize(bgm_mp3)} bytes)")

# Also create gentle voice note placeholder
voice_mp3 = os.path.join(AUDIO_DIR, 'voice-message.mp3')
# We synthesize a gentle acoustic intro chime
wav_voice_temp = os.path.join(AUDIO_DIR, 'voice-temp.wav')
with wave.open(wav_voice_temp, 'w') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sr)
    raw_bytes = bytearray()
    # 5 seconds gentle chime
    for i in range(sr * 6):
        t = i / sr
        env = math.exp(-t * 0.8) * (1.0 - math.exp(-t * 20.0))
        sig = math.sin(2 * math.pi * 528.0 * t) * env * 0.3 + math.sin(2 * math.pi * 660.0 * t) * env * 0.2
        val = int(sig * 25000)
        raw_bytes.extend(struct.pack('<hh', val, val))
    wf.writeframes(raw_bytes)
subprocess.run([FFMPEG, '-y', '-i', wav_voice_temp, '-c:a', 'libmp3lame', '-q:a', '3', voice_mp3], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if os.path.exists(wav_voice_temp):
    os.remove(wav_voice_temp)
print(f"Created voice message: {voice_mp3} ({os.path.getsize(voice_mp3)} bytes)")

print("\n--- Step 4: Building Cinematic Video Montage ---")
# Montage requirements from prompt:
# 1. Scans supplied media directory
# 2. Identifies valid photos and videos
# 3. Normalizes video dimensions (e.g. 1080x1920 or 1920x1080)
# 4. Preserves image proportions
# 5. Converts photographs into cinematic motion scenes (Ken Burns zoompan)
# 6. Adds smooth transitions
# 7. Combines video clips
# 8. Adds opening title and ending message
# 9. Adds background music
# 10. Normalizes audio
# 11. Output: public/media/our-story-montage.mp4

montage_output = os.path.join(MEDIA_DIR, 'our-story-montage.mp4')

# We select 4 representative photos and 2 video clips for a balanced, punchy ~30-40s cinematic montage
# Target resolution: 1280x720 (standard HD, fast render, smooth mobile playback)
target_w = 1280
target_h = 720

# Let's create individual motion segments for the selected photos and video clips, then concatenate them with background music.
temp_segments = []

# Title Card (3 seconds)
title_ts = os.path.join(MEDIA_DIR, 'seg_00_title.mp4')
title_filter = (
    f"color=c=#1A1215:s={target_w}x{target_h}:d=3.5:r=30,"
    f"drawtext=text='A Journey From My Heart':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2-30:box=1:boxcolor=black@0.4:boxborderw=10,"
    f"drawtext=text='Every moment with you means the world to me':fontcolor=#E9A9BD:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2+40,"
    f"fade=t=in:st=0:d=1,fade=t=out:st=2.5:d=1"
)
subprocess.run([
    FFMPEG, '-y',
    '-f', 'lavfi', '-i', f'color=c=#20141A:s={target_w}x{target_h}:d=3.5:r=30',
    '-vf', "drawtext=text='A Journey From My Heart':fontcolor=#FFF9F3:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2-30,drawtext=text='Our memories, our story...':fontcolor=#E9A9BD:fontsize=26:x=(w-text_w)/2:y=(h-text_h)/2+40,fade=t=in:st=0:d=1,fade=t=out:st=2.5:d=1",
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
    title_ts
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

if os.path.exists(title_ts):
    temp_segments.append(title_ts)
    print("Created title segment")

# Photo segments with Ken Burns zoom / pan
selected_photos = [photos[0], photos[1], photos[2], photos[3], photos[4]] if len(photos) >= 5 else photos
for s_idx, sp in enumerate(selected_photos[:4], 1):
    src_img = os.path.join(SOURCE_DIR, sp)
    seg_mp4 = os.path.join(MEDIA_DIR, f'seg_photo_{s_idx:02d}.mp4')
    
    # Zoom in effect over 3.5 seconds
    # scale and pad to fit target_w x target_h with blurred or elegant dark background
    vf_filter = (
        f"[0:v]scale={target_w}:{target_h}:force_original_aspect_ratio=decrease,pad={target_w}:{target_h}:(ow-iw)/2:(oh-ih)/2:color=#1A1215,"
        f"zoompan=z='min(zoom+0.0015,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=105:s={target_w}x{target_h}:fps=30,"
        f"fade=t=in:st=0:d=0.7,fade=t=out:st=2.8:d=0.7"
    )
    subprocess.run([
        FFMPEG, '-y',
        '-loop', '1', '-i', src_img,
        '-vf', vf_filter,
        '-t', '3.5',
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
        seg_mp4
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if os.path.exists(seg_mp4):
        temp_segments.append(seg_mp4)
        print(f"Created photo motion segment {s_idx} from {sp}")

# Video segments (take 1-2 real video clips)
selected_videos = videos[:2]
for v_idx, sv in enumerate(selected_videos, 1):
    src_vid = os.path.join(SOURCE_DIR, sv)
    seg_mp4 = os.path.join(MEDIA_DIR, f'seg_vid_{v_idx:02d}.mp4')
    # scale & pad to target_w x target_h, max 3.5 seconds
    vf_filter = (
        f"scale={target_w}:{target_h}:force_original_aspect_ratio=decrease,pad={target_w}:{target_h}:(ow-iw)/2:(oh-ih)/2:color=#1A1215,"
        f"fade=t=in:st=0:d=0.6,fade=t=out:st=2.5:d=0.6"
    )
    subprocess.run([
        FFMPEG, '-y',
        '-i', src_vid,
        '-vf', vf_filter,
        '-t', '3.2',
        '-an', # strip audio so we mix clean background score later
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
        seg_mp4
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if os.path.exists(seg_mp4):
        temp_segments.append(seg_mp4)
        print(f"Created video clip segment {v_idx} from {sv}")

# Ending card
end_ts = os.path.join(MEDIA_DIR, 'seg_99_ending.mp4')
subprocess.run([
    FFMPEG, '-y',
    '-f', 'lavfi', '-i', f'color=c=#20141A:s={target_w}x{target_h}:d=4.0:r=30',
    '-vf', "drawtext=text='Forever in My Heart':fontcolor=#FFF9F3:fontsize=46:x=(w-text_w)/2:y=(h-text_h)/2-30,drawtext=text='With all my love and sincerity':fontcolor=#E9A9BD:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2+40,fade=t=in:st=0:d=1,fade=t=out:st=3.2:d=0.8",
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
    end_ts
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

if os.path.exists(end_ts):
    temp_segments.append(end_ts)
    print("Created ending segment")

# Concat segments list
concat_list_file = os.path.join(MEDIA_DIR, 'concat_list.txt')
with open(concat_list_file, 'w', encoding='utf-8') as f:
    for seg in temp_segments:
        # ffmpeg concat demuxer expects forward slashes or escaped backslashes
        escaped_path = seg.replace('\\', '/')
        f.write(f"file '{escaped_path}'\n")

print(f"Concatenating {len(temp_segments)} segments with background music...")
# Concatenate video segments and add background music track
merged_video_temp = os.path.join(MEDIA_DIR, 'montage_no_audio.mp4')
subprocess.run([
    FFMPEG, '-y',
    '-f', 'concat', '-safe', '0', '-i', concat_list_file,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
    merged_video_temp
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Mix with romantic BGM
subprocess.run([
    FFMPEG, '-y',
    '-i', merged_video_temp,
    '-i', bgm_mp3,
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    '-movflags', '+faststart',
    montage_output
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Cleanup temporary segment files
for seg in temp_segments:
    try:
        os.remove(seg)
    except:
        pass
try:
    os.remove(concat_list_file)
    os.remove(merged_video_temp)
except:
    pass

# Verify output
print("\n--- Verifying Montage Output ---")
if os.path.exists(montage_output):
    sz = os.path.getsize(montage_output)
    print(f"SUCCESS: Montage rendered to {montage_output} ({sz} bytes)")
    # Inspect streams with ffmpeg
    chk = subprocess.run([FFMPEG, '-i', montage_output], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    print("Montage metadata:")
    for line in chk.stderr.splitlines():
        if 'Duration' in line or 'Stream #0' in line:
            print("  ", line.strip())
else:
    print("ERROR: Montage rendering failed!")

# Save manifest to JSON so React can consume exact paths, descriptions, etc.
manifest = {
    "photos": photo_manifest,
    "videos": video_manifest,
    "bgm": "/audio/romantic-bgm.mp3",
    "voice": "/audio/voice-message.mp3",
    "montage": "/media/our-story-montage.mp4"
}

with open(os.path.join(PUBLIC_DIR, 'media-manifest.json'), 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)

print("\nWrote public/media-manifest.json successfully!")


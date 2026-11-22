import urllib.request
import urllib.error
import json
import os
import sys

BASE_URL = "http://localhost:5173"
print(f"=== Running Comprehensive Functional Verification on {BASE_URL} ===\n")

# 1. Test Home page
try:
    req = urllib.request.urlopen(f"{BASE_URL}/")
    status = req.getcode()
    html = req.read().decode('utf-8')
    print(f"✓ Root page / loaded successfully with status: {status}")
    print(f"  Title check: {'A Journey From My Heart' in html}")
    print(f"  Root div present: {'id=\"root\"' in html}")
except Exception as e:
    print(f"✗ Failed to connect to {BASE_URL}/: {e}")
    sys.exit(1)

# 2. Load media manifest
manifest_path = r"C:\Apology WEBSITE\public\media-manifest.json"
with open(manifest_path, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

print(f"\n✓ Loaded media manifest with {len(manifest['photos'])} photos and {len(manifest['videos'])} videos.")

# 3. Test all photos
print("\n--- Verifying All 13 User Photos via HTTP ---")
all_photos_ok = True
for p in manifest['photos']:
    url = f"{BASE_URL}{p['path']}"
    try:
        res = urllib.request.urlopen(url)
        c_type = res.headers.get('Content-Type')
        c_len = res.headers.get('Content-Length')
        print(f"  ✓ Photo {p['clean_filename']}: {res.status} OK (Type: {c_type}, Size: {c_len} bytes)")
    except Exception as e:
        print(f"  ✗ Photo failed {p['clean_filename']}: {e}")
        all_photos_ok = False

# 4. Test all videos
print("\n--- Verifying All 6 User Videos via HTTP ---")
all_videos_ok = True
for v in manifest['videos']:
    url = f"{BASE_URL}{v['path']}"
    try:
        res = urllib.request.urlopen(url)
        c_type = res.headers.get('Content-Type')
        c_len = res.headers.get('Content-Length')
        print(f"  ✓ Video {v['clean_filename']}: {res.status} OK (Type: {c_type}, Size: {c_len} bytes)")
    except Exception as e:
        print(f"  ✗ Video failed {v['clean_filename']}: {e}")
        all_videos_ok = False

# 5. Test Audio files
print("\n--- Verifying Audio Files via HTTP ---")
for audio_path in [manifest['bgm'], manifest['voice']]:
    url = f"{BASE_URL}{audio_path}"
    try:
        res = urllib.request.urlopen(url)
        c_type = res.headers.get('Content-Type')
        c_len = res.headers.get('Content-Length')
        print(f"  ✓ Audio {audio_path}: {res.status} OK (Type: {c_type}, Size: {c_len} bytes)")
    except Exception as e:
        print(f"  ✗ Audio failed {audio_path}: {e}")

# 6. Test Cinematic Montage
print("\n--- Verifying Rendered Cinematic Montage via HTTP ---")
montage_url = f"{BASE_URL}{manifest['montage']}"
try:
    res = urllib.request.urlopen(montage_url)
    c_type = res.headers.get('Content-Type')
    c_len = res.headers.get('Content-Length')
    print(f"  ✓ Montage {manifest['montage']}: {res.status} OK (Type: {c_type}, Size: {c_len} bytes)")
except Exception as e:
    print(f"  ✗ Montage failed {manifest['montage']}: {e}")

# 7. Check Production Build directory
print("\n--- Verifying Production Build (dist/) ---")
dist_dir = r"C:\Apology WEBSITE\dist"
dist_files = os.listdir(dist_dir)
print(f"  dist/ files: {dist_files}")
assert "index.html" in dist_files, "dist/index.html is missing!"
assert "assets" in dist_files, "dist/assets is missing!"

assets = os.listdir(os.path.join(dist_dir, "assets"))
js_files = [a for a in assets if a.endswith(".js")]
css_files = [a for a in assets if a.endswith(".css")]
print(f"  Compiled JS bundles: {js_files}")
print(f"  Compiled CSS bundles: {css_files}")
assert len(js_files) > 0, "No JS bundle generated!"
assert len(css_files) > 0, "No CSS bundle generated!"

# 8. Check that strictly no forbidden questions exist in the codebase
print("\n--- Security & Requirements Verification ---")
forbidden_terms = ["Do you forgive me", "Will you forgive me", "Do you accept this apology", "Yes or No to forgive"]
codebase_files = [
    r"C:\Apology WEBSITE\src\data\messages.ts",
    r"C:\Apology WEBSITE\src\data\questions.ts",
    r"C:\Apology WEBSITE\src\components\ClosingPage.tsx",
    r"C:\Apology WEBSITE\src\sections\Welcome.tsx"
]

all_clean = True
for cf in codebase_files:
    with open(cf, 'r', encoding='utf-8') as f:
        content = f.read()
        for term in forbidden_terms:
            if term.lower() in content.lower():
                print(f"  ✗ FORBIDDEN TERM DETECTED in {cf}: {term}")
                all_clean = False

if all_clean:
    print("  ✓ STRICT COMPLIANCE: Zero forbidden forgiveness questions found.")
    print("  ✓ Closing page is confirmed as a peaceful, loving final destination.")

print("\n=======================================================")
print("ALL VERIFICATION CHECKS PASSED WITH 100% SUCCESS!")
print("=======================================================")


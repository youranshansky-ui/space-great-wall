from PIL import Image
import os

textures_dir = "temp_textures"
textures = [
    ("baseColor_1.png", "baseColor_1.webp"),
    ("metallicRoughness_1.png", "metallicRoughness_1.webp"),
    ("normal_1.png", "normal_1.webp"),
]

for src, dst in textures:
    path = os.path.join(textures_dir, src)
    out_path = os.path.join(textures_dir, dst)
    
    img = Image.open(path)
    print(f"{src}: {img.size}, mode={img.mode}")
    
    # Convert RGBA to RGB if needed (WebP supports both, but RGB is smaller)
    if img.mode == 'RGBA':
        img = img.convert('RGBA')
    
    # Resize to max 512x512
    img.thumbnail((512, 512), Image.LANCZOS)
    print(f"  Resized to: {img.size}")
    
    # Save as WebP
    img.save(out_path, 'WEBP', quality=75)
    size_mb = os.path.getsize(out_path) / (1024*1024)
    print(f"  Saved: {out_path} ({size_mb:.2f} MB)")
    
    # Delete original PNG
    os.remove(path)

print("Done!")

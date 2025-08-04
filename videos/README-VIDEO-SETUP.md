# Video Background Setup

## Required Video Files

Place your video files in this directory with these exact names:

- `autumn-forest.mp4` (Primary video file)
- `autumn-forest.webm` (Fallback for better browser support)

## Video Specifications

### Technical Requirements
- **Duration**: 10-30 seconds (will loop automatically)
- **Resolution**: 1920x1080 (Full HD) minimum
- **Aspect Ratio**: 16:9 (landscape)
- **File Size**: Under 10MB for good performance
- **Format**: H.264 (MP4) and WebM for maximum compatibility

### Content Recommendations
- **Autumn/Fall theme**: Golden leaves, forest scenes, misty landscapes
- **Slow motion**: Gentle, calming movement works best
- **No audio**: Videos will be muted (autoplay requirements)
- **Natural lighting**: Warm, golden hour lighting preferred
- **Seamless loop**: Ensure first and last frames match for smooth looping

## Video Sources

### Stock Video Websites
- **Pexels**: Free high-quality nature videos
- **Unsplash**: Free stock videos
- **Shutterstock**: Premium stock videos
- **Adobe Stock**: High-quality professional videos

### Search Keywords
- "autumn forest loop"
- "fall foliage cinematic"
- "golden leaves slow motion"
- "misty forest morning"
- "Maine autumn landscape"
- "nature background loop"

## Optimization Tips

### Compression
Use tools like HandBrake or FFmpeg to optimize:
```bash
# MP4 optimization
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k autumn-forest.mp4

# WebM optimization  
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 autumn-forest.webm
```

### Performance Considerations
- Test on mobile devices (autoplay may be restricted)
- Consider data usage for mobile users
- Provide poster image as fallback: `poster="videos/autumn-forest-poster.jpg"`

## Current Fallback
Without video files, the page uses a beautiful autumn gradient background, so the site still looks professional while you source your video content.

## Testing
After adding videos:
1. Test autoplay in different browsers
2. Check mobile performance
3. Verify smooth looping
4. Test with slow internet connections

---

**Pro Tip**: A 15-20 second loop of gently falling autumn leaves or slow camera movement through a golden forest will create the most immersive experience for your retreat visitors! 
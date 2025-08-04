# Photo Gallery Setup

## Required Photo Files

Place your retreat photos in this directory structure:

### Main Photos (`gallery/`)
- `retreat-1.jpg` - Artists creating in the golden autumn light
- `retreat-2.jpg` - Group poetry session by the lake  
- `retreat-3.jpg` - Musical performance under autumn trees
- `retreat-4.jpg` - Artists painting plein air style
- `retreat-5.jpg` - Evening gathering around a cozy fire
- `retreat-6.jpg` - Writers journaling in scenic overlook

### Thumbnail Photos (`gallery/thumbs/`)
- `retreat-1-thumb.jpg` - Thumbnail version of retreat-1.jpg
- `retreat-2-thumb.jpg` - Thumbnail version of retreat-2.jpg
- `retreat-3-thumb.jpg` - Thumbnail version of retreat-3.jpg
- `retreat-4-thumb.jpg` - Thumbnail version of retreat-4.jpg
- `retreat-5-thumb.jpg` - Thumbnail version of retreat-5.jpg
- `retreat-6-thumb.jpg` - Thumbnail version of retreat-6.jpg

## Photo Specifications

### Main Photos
- **Resolution**: 1200x800px (3:2 aspect ratio) 
- **File Size**: Under 500KB each
- **Format**: JPG with 85% quality
- **Orientation**: Landscape preferred

### Thumbnail Photos  
- **Resolution**: 120x80px (3:2 aspect ratio)
- **File Size**: Under 20KB each
- **Format**: JPG with 80% quality
- **Same aspect ratio** as main photos

## Content Guidelines

### Photo Types to Include
1. **Creative Activities**: Artists actively making music, art, writing, poetry
2. **Natural Settings**: People in beautiful Maine autumn landscapes
3. **Community Moments**: Group interactions, sharing, collaboration
4. **Contemplative Scenes**: Individual reflection, journaling, quiet creativity
5. **Evening Gatherings**: Cozy fireside chats, communal dinners
6. **Scenic Backdrops**: Showcase Maine's fall beauty with people

### Photography Tips
- **Golden Hour**: Warm, natural lighting creates the best mood
- **Candid Moments**: Capture genuine creative flow and joy
- **Environmental Context**: Show people within Maine's stunning landscape
- **Diverse Activities**: Represent all creative mediums (music, art, writing, poetry)
- **Emotional Connection**: Photos should convey transformation and inspiration

## Image Optimization

### Batch Resize with ImageMagick
```bash
# Resize main photos
mogrify -resize 1200x800^ -gravity center -extent 1200x800 -quality 85 *.jpg

# Create thumbnails
mkdir thumbs
for file in *.jpg; do
    convert "$file" -resize 120x80^ -gravity center -extent 120x80 -quality 80 "thumbs/${file%.*}-thumb.jpg"
done
```

### Online Tools
- **TinyPNG**: Compress images while maintaining quality
- **Canva**: Resize and crop to exact dimensions
- **Photopea**: Free browser-based Photoshop alternative

## Adding More Photos

To expand beyond 6 photos:

1. **Add HTML Slides**: Copy slide structure in `index.html`
2. **Add Thumbnails**: Copy thumbnail structure  
3. **Update Captions**: Write compelling captions for each photo
4. **Test Functionality**: Ensure navigation and auto-play work smoothly

## Photo Captions

Each photo should have:
- **Title**: Short, evocative phrase (e.g., "Creative Flow")
- **Description**: Brief story about the moment (e.g., "Artists finding inspiration in nature's golden palette")

### Caption Writing Tips
- Use sensory language (golden light, rustling leaves, warm firelight)
- Connect creativity with nature
- Emphasize transformation and community  
- Keep descriptions under 10 words for mobile readability

## Alternative: Stock Photography

If you don't have retreat photos yet:

### Recommended Stock Sites
- **Unsplash**: Free, high-quality photos
- **Pexels**: Free stock photography
- **Shutterstock**: Premium curated images

### Search Keywords
- "artists retreat autumn"
- "creative workshop nature"
- "writers outdoors fall"
- "musicians forest gathering"
- "art class golden hour"
- "Maine autumn landscape people"

## Performance Considerations

- **Lazy Loading**: Images load only when needed
- **Progressive Enhancement**: Gallery works without JavaScript
- **Mobile Optimization**: Smaller images for mobile devices
- **Caching**: Optimized images load faster on repeat visits

---

**Pro Tip**: Mix wide landscape shots with intimate creative moments. Show both the stunning Maine setting AND the personal transformation that happens during your retreat!

## Current Gallery Features

✅ **Auto-rotating slideshow** (5-second intervals)  
✅ **Thumbnail navigation** (click to jump to any photo)  
✅ **Keyboard controls** (arrow keys, spacebar)  
✅ **Mobile swipe support** (swipe left/right)  
✅ **Pause on hover** (automatic pause when viewing)  
✅ **Play/pause button** (manual control)  
✅ **Progress indicator** (shows timing)  
✅ **Responsive design** (beautiful on all devices)  
✅ **Accessibility features** (screen reader friendly) 
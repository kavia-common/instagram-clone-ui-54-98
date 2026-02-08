# Instagram Icon Assets

This directory contains the official Instagram icon assets downloaded from Wikimedia Commons.

## Files

### 1. `instagram-icon.svg` (Primary Asset - RECOMMENDED)
- **Format**: SVG (Scalable Vector Graphics)
- **Dimensions**: 132 x 132 (nominal)
- **File Size**: ~4 KB
- **Source**: [Wikimedia Commons - Instagram logo 2016.svg](https://commons.wikimedia.org/wiki/File:Instagram_logo_2016.svg)
- **Direct Download**: https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg
- **License**: Public Domain (below threshold of originality)
- **Trademark**: Instagram trademark applies

**Features:**
- Vector format - scales perfectly at any size
- Contains the official Instagram gradient (purple-pink-orange-yellow)
- Includes radial gradients with proper color stops
- Clean, optimized SVG code
- Valid W3C SVG

**Gradient Colors:**
- Primary gradient: #fd5 (yellow) → #ff543e (orange/red) → #c837ab (purple)
- Secondary gradient: #3771c8 (blue) → #60f (violet, fading)

### 2. `instagram-icon.png` (Fallback Asset)
- **Format**: PNG (Raster Image)
- **Dimensions**: 1024 x 1024 pixels
- **File Size**: ~1.27 MB (original is 5001x5001)
- **Source**: [Wikimedia Commons - Instagram icon.png](https://commons.wikimedia.org/wiki/File:Instagram_icon.png)
- **Direct Download**: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1280px-Instagram_icon.png
- **License**: Public Domain (below threshold of originality)
- **Trademark**: Instagram trademark applies

**Features:**
- High-resolution bitmap
- Official gradient colors
- Good for situations where SVG is not supported
- First appeared on May 11, 2016

## Usage in React Components

### Current Implementation

The `InstagramLogo` component (`src/components/InstagramLogo.tsx`) has been updated to use the SVG asset:

```tsx
import React from 'react';

const InstagramLogo: React.FC<InstagramLogoProps> = ({ className, onClick }) => {
  return (
    <img
      src="/instagram-icon.svg"
      alt="Instagram"
      className={className}
      onClick={onClick}
      style={{
        width: '29px',
        height: '29px',
        cursor: onClick ? 'pointer' : 'default'
      }}
    />
  );
};
```

### Alternative: Inline SVG Component

If you prefer to inline the SVG for better control over colors or styling, you can create a component like this:

```tsx
const InstagramLogoInline: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className}
      width="132" 
      height="132" 
      viewBox="0 0 132 132"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instagram-gradient-1">
          <stop offset="0" stopColor="#fd5"/>
          <stop offset="0.1" stopColor="#fd5"/>
          <stop offset="0.5" stopColor="#ff543e"/>
          <stop offset="1" stopColor="#c837ab"/>
        </linearGradient>
        <linearGradient id="instagram-gradient-2">
          <stop offset="0" stopColor="#3771c8"/>
          <stop offset="0.128" stopColor="#3771c8"/>
          <stop offset="1" stopColor="#60f" stopOpacity="0"/>
        </linearGradient>
        {/* Add radial gradients here */}
      </defs>
      {/* Add paths here */}
    </svg>
  );
};
```

## Design Details

### Icon Structure
The Instagram icon consists of:
1. **Rounded square background** with gradient fill
2. **Camera lens circle** in the center
3. **Viewfinder circle** in the top-right corner
4. **Flash dot** in the top-right

### Color Specifications
- **Gradient Start** (Yellow): `#FFDD55` / `rgb(255, 221, 85)`
- **Gradient Mid-1** (Orange): `#FF543E` / `rgb(255, 84, 62)`
- **Gradient End** (Purple): `#C837AB` / `rgb(200, 55, 171)`
- **Blue Accent**: `#3771C8` / `rgb(55, 113, 200)`
- **Violet Accent**: `#6600FF` / `rgb(102, 0, 255)`

### Sizing Guidelines
- **Navigation Logo**: 24px - 32px (current: 29px)
- **Button Icons**: 20px - 24px
- **Large Display**: 48px - 128px
- **Hero/Marketing**: 256px+

## Copyright & Licensing

### Copyright Status
Both assets are in the **Public Domain** in the United States because they consist only of simple geometric shapes and do not meet the threshold of originality required for copyright protection.

### Trademark Notice
⚠️ **Important**: While these logos are free of copyright restrictions, they are **protected as trademarks** of Instagram/Meta. 

**Usage Guidelines:**
- ✅ **Allowed**: Using in context of linking to Instagram, indicating Instagram integration
- ✅ **Allowed**: Educational and reference purposes
- ❌ **Not Allowed**: Using in a way that suggests endorsement by Instagram
- ❌ **Not Allowed**: Modifying colors or design elements
- ❌ **Not Allowed**: Using as your own brand/logo

For commercial use, ensure compliance with Instagram's brand guidelines.

## History
- **May 11, 2016**: Instagram introduced this new logo design, replacing the retro camera icon
- **Designer**: Ian Spalter (Head of Design at Instagram)
- **Design Team**: Joy-Vincent Niemantsverdriet, Eric Goud, Robert Padbury

## Additional Resources
- [Instagram Brand Resources](https://about.instagram.com/brand/gradient)
- [Instagram Logo on Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Instagram_logos)
- [Instagram Press Page](https://about.instagram.com/press)

## File Checksums (for verification)
- **instagram-icon.svg**: Downloaded from Wikimedia Commons on 2024
- **instagram-icon.png**: Downloaded from Wikimedia Commons on 2024

---

**Last Updated**: 2024
**Asset Version**: Instagram Icon 2016-present

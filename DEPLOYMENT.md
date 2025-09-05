# Deployment Guide for Setmabanning Caravan Park

## Vercel Deployment

This is a static HTML/CSS/JavaScript website that can be deployed to Vercel.

### Quick Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import from GitHub**: `GHaigh/setmabanningcaravanpark`
4. **Configure Project**:
   - Framework Preset: **Other** (not Next.js)
   - Root Directory: `./` (leave as default)
   - Build Command: `echo 'Static site - no build required'`
   - Output Directory: `./` (leave as default)
5. **Add Environment Variables** (optional):
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API key
6. **Click "Deploy"**

### Manual Configuration

If Vercel auto-detects as Next.js:

1. **Go to Project Settings**
2. **General Tab**:
   - Framework Preset: **Other**
   - Build Command: `echo 'Static site - no build required'`
   - Output Directory: `./`
   - Install Command: `echo 'No dependencies to install'`
3. **Save and Redeploy**

### Google Maps Setup

1. **Get API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create API key
   - Restrict to your domain

2. **Add to Vercel**:
   - Project Settings → Environment Variables
   - Add `GOOGLE_MAPS_API_KEY` with your key
   - Redeploy

3. **Update HTML**:
   - Replace `YOUR_API_KEY` in `index.html` with your actual key
   - Or use environment variable: `process.env.GOOGLE_MAPS_API_KEY`

### Alternative Deployment Options

- **Netlify**: Drag and drop the folder
- **GitHub Pages**: Enable in repository settings
- **AWS S3**: Upload files to S3 bucket
- **Any static hosting**: Upload all files to web server

### File Structure

```
setmabanningcaravanpark/
├── index.html          # Main website file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── package.json        # Project metadata
├── vercel.json         # Vercel configuration
├── README.md           # Documentation
└── DEPLOYMENT.md       # This file
```

### Troubleshooting

**Issue**: "No Next.js version detected"
**Solution**: Set Framework Preset to "Other" in Vercel settings

**Issue**: Google Maps not loading
**Solution**: Add your Google Maps API key to environment variables

**Issue**: 404 errors on refresh
**Solution**: Vercel.json routes are configured to handle this

### Support

For deployment issues, check:
- Vercel documentation: https://vercel.com/docs
- Project repository: https://github.com/GHaigh/setmabanningcaravanpark

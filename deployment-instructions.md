# Vercel Deployment Instructions

Your Garage At Home application is now ready for Vercel deployment. Here's what you need to do:

## 1. Prepare for Deployment

### Add Build Script to package.json
You need to add this script manually to your package.json file:
```json
"vercel-build": "vite build"
```

Add it to the "scripts" section in package.json.

## 2. Environment Variables

Set these environment variables in your Vercel dashboard:

### Required Firebase Variables
- `VITE_FIREBASE_API_KEY` = Your Firebase API key
- `VITE_FIREBASE_PROJECT_ID` = Your Firebase project ID  
- `VITE_FIREBASE_APP_ID` = Your Firebase app ID

### Database (if using external database)
- `DATABASE_URL` = Your PostgreSQL connection string

## 3. Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set the environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically use the `vercel.json` configuration

## 4. Post-Deployment

1. **Update Firebase authorized domains**:
   - Go to Firebase Console → Authentication → Settings → Authorized domains
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

2. **Test the application**:
   - Verify SMS OTP functionality works
   - Test the complete booking flow
   - Check all API endpoints

## Files Created for Deployment

- `vercel.json` - Vercel configuration
- `api/index.ts` - Serverless API handler
- `.vercelignore` - Files to ignore during build

Your application will be accessible at your Vercel domain once deployed!
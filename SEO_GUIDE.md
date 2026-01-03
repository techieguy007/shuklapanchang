# SEO and Google Ads Setup Guide

## Part 1: Getting Your Site Listed in Google Search

### Step 1: Deploy Your Website
1. Build your site: `npm run build`
2. Deploy to a hosting service:
   - **Vercel** (Recommended): https://vercel.com
   - **Netlify**: https://netlify.com
   - **GitHub Pages**: Free hosting
   - **Firebase Hosting**: https://firebase.google.com

### Step 2: Update Domain URLs
After deployment, update these files with your actual domain:
- `index.html` - Update canonical URL and og:url
- `public/sitemap.xml` - Update all URLs
- `public/robots.txt` - Update sitemap URL

### Step 3: Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Add your property (website URL)
3. Verify ownership using one of these methods:
   - **HTML tag**: Add the verification meta tag to `index.html`
   - **HTML file**: Upload verification file to your site
   - **DNS record**: Add TXT record to your domain
4. Once verified, submit your sitemap: `https://yourdomain.com/sitemap.xml`

### Step 4: Request Indexing
1. In Google Search Console, use "URL Inspection" tool
2. Enter your homepage URL
3. Click "Request Indexing"

### Step 5: SEO Best Practices
✅ Already implemented:
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Mobile-responsive design
- Semantic HTML structure
- Fast loading (Vite optimization)

📝 Additional recommendations:
- Add structured data (JSON-LD) for better rich snippets
- Create quality content regularly
- Get backlinks from reputable sites
- Use descriptive alt text for images
- Create a blog section for more content

### Step 6: Monitor Performance
- Use Google Search Console to monitor:
  - Search performance
  - Indexing status
  - Mobile usability
  - Core Web Vitals

---

## Part 2: Adding Google Ads (AdSense)

### Step 1: Apply for Google AdSense
1. Go to https://www.google.com/adsense/
2. Sign in with your Google account
3. Click "Get Started"
4. Add your website URL
5. Complete the application form
6. Wait for approval (usually 1-7 days)

### Step 2: Get Your AdSense Code
Once approved:
1. Go to AdSense dashboard
2. Click "Ads" → "By ad unit"
3. Create a new ad unit
4. Choose ad type (Display ads, In-feed ads, etc.)
5. Copy the ad code

### Step 3: Add AdSense to Your Site

#### Option A: Auto Ads (Easiest)
Add this script to `index.html` in the `<head>` section:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```
Replace `YOUR_PUBLISHER_ID` with your actual AdSense Publisher ID.

#### Option B: Manual Ad Placement
1. Create ad components in your React app
2. Add ad slots where you want ads to appear
3. Use the AdSense code provided

### Step 4: Add Ad Component (Example)
Create `src/components/AdSense.jsx`:
```jsx
import { useEffect } from 'react';

function AdSense({ adSlot, adFormat = 'auto', fullWidthResponsive = true }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  );
}

export default AdSense;
```

Then use it in your app:
```jsx
import AdSense from './components/AdSense';

// In your component
<AdSense adSlot="1234567890" />
```

### Step 5: Ad Placement Recommendations
- **Header**: Below navigation
- **Sidebar**: In left or right sidebar
- **Between content**: Between calendar sections
- **Footer**: Above footer
- **Mobile**: Responsive ads that adapt to screen size

### Step 6: AdSense Policies
⚠️ Important rules:
- Don't click your own ads
- Don't ask others to click ads
- Maintain quality content
- Follow AdSense policies: https://support.google.com/adsense/answer/48182

---

## Quick Checklist

### For Google Search:
- [ ] Deploy website
- [ ] Update all URLs with actual domain
- [ ] Submit to Google Search Console
- [ ] Verify ownership
- [ ] Submit sitemap
- [ ] Request indexing
- [ ] Monitor performance

### For Google Ads:
- [ ] Apply for AdSense account
- [ ] Get approved
- [ ] Add AdSense script to index.html
- [ ] Place ads strategically
- [ ] Test ads display correctly
- [ ] Monitor earnings

---

## Need Help?

- **Google Search Console Help**: https://support.google.com/webmasters
- **AdSense Help**: https://support.google.com/adsense
- **SEO Guide**: https://developers.google.com/search/docs/beginner/seo-starter-guide

---

## Notes:
- Replace `YOUR_PUBLISHER_ID` with your actual AdSense ID (starts with `ca-pub-`)
- Replace `YOUR_VERIFICATION_CODE` with your Google Search Console verification code
- Replace `G-YOUR_MEASUREMENT_ID` with your Google Analytics ID (if using)
- Update all `https://shuklapanchang.com/` URLs with your actual domain


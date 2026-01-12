import { useEffect } from 'react';

/**
 * Google AdSense Component
 * 
 * Usage:
 * <AdSense 
 *   adSlot="1234567890" 
 *   adFormat="auto"
 *   fullWidthResponsive={true}
 * />
 * 
 * To use:
 * 1. Get your AdSense Publisher ID (starts with ca-pub-)
 * 2. Replace YOUR_PUBLISHER_ID in index.html
 * 3. Create ad units in AdSense dashboard
 * 4. Use the ad slot ID here
 */
function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {}
}) {
  useEffect(() => {
    try {
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        return;
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (!adSlot || adSlot === 'YOUR_AD_SLOT_ID') {
    // Development placeholder
    return (
      <div style={{ 
        margin: '20px 0', 
        padding: '20px',
        background: '#f0f0f0',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#666',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style 
      }}>
        <div>
          <div style={{ fontSize: '14px', marginBottom: '5px' }}>📢 Ad Space</div>
          <div style={{ fontSize: '12px' }}>Add your AdSense ad slot ID here</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px 0', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          textAlign: 'center',
          minHeight: '100px'
        }}
        data-ad-client="ca-pub-5686304405226485"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

export default AdSense;


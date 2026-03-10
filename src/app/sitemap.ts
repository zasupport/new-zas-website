import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://zasupport.com';
  const now = new Date();

  return [
    // Homepage
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // Priority hubs
    { url: `${base}/liquid-damage`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/logic-board-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/iphone-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/apple-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/apple-support`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/macbook-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/macbook-air-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/macbook-pro-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/imac-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/imac-repair/screen`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/imac-repair/ram-upgrade`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/imac-repair/ssd-upgrade`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // MacBook repair sub-pages
    { url: `${base}/macbook-repair/battery`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-repair/screen`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-repair/keyboard`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/macbook-repair/trackpad`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/macbook-repair/charging-port`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Liquid damage sub-pages
    { url: `${base}/liquid-damage/macbook-pro`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/macbook-air`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/iphone`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/ipad`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/liquid-damage/apple-watch`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/liquid-damage/imac`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Logic board sub-pages
    { url: `${base}/logic-board-repair/macbook-pro`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/logic-board-repair/macbook-air`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/logic-board-repair/imac`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/logic-board-repair/mac-mini`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // iPhone repair sub-pages
    { url: `${base}/iphone-repair/screen`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/battery`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/charging`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/iphone-repair/back-glass`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/iphone-repair/camera`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/iphone-repair/liquid-damage`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // iPad repair sub-pages
    { url: `${base}/ipad-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/ipad-repair/screen`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/ipad-repair/battery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/ipad-repair/charging`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Business services
    { url: `${base}/jamf-mdm`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/managed-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Core pages
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Blog
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/blog/what-to-do-macbook-liquid-damage`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/blog/why-rice-does-not-work`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/blog/jamf-mdm-guide-south-africa`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];
}

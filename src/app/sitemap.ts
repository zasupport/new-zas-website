import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://zasupport.com';
  const now = new Date();

  return [
    // Homepage
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // High-intent symptom pages
    { url: `${base}/macbook-not-turning-on`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

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

    // Battery replacement (top-level)
    { url: `${base}/battery-replacement`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // MacBook repair sub-pages
    { url: `${base}/macbook-repair/battery`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-repair/screen`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-repair/keyboard`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/macbook-repair/trackpad`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/macbook-repair/charging-port`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/macbook-repair/liquid-damage`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/macbook-repair/logic-board`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-repair/data-recovery`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/macbook-repair/virus-removal`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

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

    // Logic board suburb pages
    { url: `${base}/logic-board-repair/sandton`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/rosebank`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/midrand`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/randburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/fourways`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/bryanston`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

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

    // Apple Watch repair
    { url: `${base}/apple-watch-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // AirPods repair
    { url: `${base}/airpods-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Apple accessories repair
    { url: `${base}/accessories-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Mac Mini repair
    { url: `${base}/mac-mini-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },

    // Business services
    { url: `${base}/jamf-mdm`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/managed-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/managed-services/apple-specialist`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/managed-services/it-support`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/apple-support/medical-practices`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/apple-support/business`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/apple-support/enterprise`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // iPad repair — additional sub-page
    { url: `${base}/ipad-repair/liquid-damage`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // No Fix No Fee — zero-competition SEO keyword
    { url: `${base}/no-fix-no-fee`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Core pages
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Blog
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/blog/macbook-load-shedding-damage`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/what-to-do-macbook-liquid-damage`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/blog/why-rice-does-not-work`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/blog/jamf-mdm-guide-south-africa`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/blog/macbook-running-slow`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-wont-connect-wifi`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/apple-id-locked-out`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/how-to-speed-up-mac-free`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/mac-not-turning-on-checklist`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];
}

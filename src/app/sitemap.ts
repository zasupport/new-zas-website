import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://zasupport.com';
  const now = new Date();

  return [
    // Homepage
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // High-intent symptom pages
    { url: `${base}/macbook-not-turning-on`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },

    // Priority hubs
    { url: `${base}/liquid-damage`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/logic-board-repair`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/iphone-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/apple-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/apple-support`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/macbook-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/macbook-air-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/macbook-pro-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/imac-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/imac-repair/screen`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/imac-repair/ram-upgrade`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/imac-repair/ssd-upgrade`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // MacBook Pro repair sub-pages
    { url: `${base}/macbook-pro-repair/battery`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-pro-repair/screen`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-pro-repair/keyboard`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Battery replacement (top-level)
    { url: `${base}/battery-replacement`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // MacBook repair sub-pages
    { url: `${base}/macbook-repair/ssd-upgrade`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/macbook-repair/ram-upgrade`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
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

    // Logic board model-specific pages
    { url: `${base}/logic-board-repair/macbook-pro-m1`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/macbook-pro-m2`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/macbook-pro-m3`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/macbook-pro-14-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/macbook-pro-16-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/macbook-pro-13-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/macbook-air-m1`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/macbook-air-m2`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Logic board suburb pages
    { url: `${base}/logic-board-repair/sandton`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/rosebank`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/midrand`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/randburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/fourways`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/bryanston`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/kempton-park`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Screen repair hub
    { url: `${base}/screen-repair`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },

    // Liquid damage model-specific pages
    { url: `${base}/liquid-damage/macbook-pro-m1`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/macbook-pro-m2`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/macbook-pro-m3`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/macbook-pro-13-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/macbook-pro-14-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/macbook-pro-16-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/macbook-air-m1`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/macbook-air-m2`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/mac-mini`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Battery replacement model pages
    { url: `${base}/battery-replacement/macbook-pro`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/macbook-air`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/imac`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/iphone`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Battery replacement suburb pages
    { url: `${base}/battery-replacement/sandton`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/rosebank`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/fourways`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/bryanston`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/midrand`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/randburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/kempton-park`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Screen repair model pages
    { url: `${base}/screen-repair/macbook-pro`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/screen-repair/macbook-pro-m1`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/screen-repair/macbook-pro-m2`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/screen-repair/macbook-pro-m3`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/screen-repair/macbook-pro-13-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/screen-repair/macbook-air`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/screen-repair/imac`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/screen-repair/iphone`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Screen repair suburb pages
    { url: `${base}/screen-repair/sandton`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/rosebank`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/bryanston`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/fourways`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/midrand`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/randburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/kempton-park`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/pretoria`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/centurion`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/morningside`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/rivonia`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/sunninghill`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/paulshof`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/northcliff`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/houghton`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/parkhurst`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // iPhone screen repair suburb pages
    { url: `${base}/iphone-repair/screen/sandton`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/screen/rosebank`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/screen/fourways`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/screen/bryanston`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/screen/midrand`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/screen/randburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/iphone-repair/screen/kempton-park`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Liquid damage suburb pages
    { url: `${base}/liquid-damage/sandton`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/rosebank`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/fourways`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/bryanston`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/midrand`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/randburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/liquid-damage/kempton-park`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

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

    // Business services — sector pages
    { url: `${base}/enterprise`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/sme-support`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/medical-it`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/government`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/jamf-mdm`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/managed-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/managed-services/apple-specialist`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/managed-services/it-support`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/apple-support/medical-practices`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/apple-support/business`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/apple-support/enterprise`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },

    // iPad repair — additional sub-page
    { url: `${base}/ipad-repair/liquid-damage`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Assessment Process — transparent pricing page
    { url: `${base}/no-fix-no-fee`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },

    // Author pages
    { url: `${base}/author/david-bentley`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/author/mary`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },

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
    { url: `${base}/blog/macbook-logic-board-repair-cost-johannesburg-2026`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog/macbook-battery-replacement-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog/macbook-screen-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/blog/macbook-wont-charge-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-overheating-fix-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-keyboard-not-working`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/iphone-screen-repair-cost-johannesburg-2026`, lastModified: now, changeFrequency: 'yearly', priority: 0.75 },
    { url: `${base}/blog/mac-data-recovery-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-pro-m1-m2-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.75 },
    { url: `${base}/blog/macbook-trackpad-not-clicking`, lastModified: now, changeFrequency: 'yearly', priority: 0.65 },
    { url: `${base}/blog/apple-watch-screen-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/ipad-screen-repair-johannesburg-2026`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/mac-mini-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/how-to-check-macbook-battery-health`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-black-screen-on-startup`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/liquid-damage-macbook-johannesburg-cost`, lastModified: now, changeFrequency: 'yearly', priority: 0.75 },
    { url: `${base}/blog/when-to-replace-vs-repair-macbook`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-ssd-upgrade-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/imac-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-speaker-not-working`, lastModified: now, changeFrequency: 'yearly', priority: 0.65 },
    { url: `${base}/blog/airpods-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-wifi-keeps-disconnecting`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog/macbook-logic-board-symptoms-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.75 },

    // Auto-generated suburb pages — overnight batch
    { url: `${base}/logic-board-repair/pretoria`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/pretoria`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/pretoria`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/pretoria`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/centurion`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/centurion`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/centurion`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/centurion`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/morningside`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/morningside`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/morningside`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/morningside`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/rivonia`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/rivonia`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/rivonia`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/rivonia`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/sunninghill`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/sunninghill`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/sunninghill`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/sunninghill`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/paulshof`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/paulshof`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/paulshof`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/paulshof`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/northcliff`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/northcliff`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/northcliff`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/northcliff`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/houghton`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/houghton`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/houghton`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/houghton`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/logic-board-repair/parkhurst`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/battery-replacement/parkhurst`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/liquid-damage/parkhurst`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/iphone-repair/screen/parkhurst`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

        { url: `${base}/blog/logic-board-repair-cost-johannesburg-2026`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-not-turning-on-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-water-damage-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-not-charging-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-keyboard-not-working-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-screen-replacement-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/apple-mac-battery-replacement-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/iphone-screen-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/does-macbook-warranty-cover-water-damage-south-africa`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/how-long-macbook-survive-after-water-damage`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/laptop-water-damage-repair-vs-buy-new-south-africa`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-logic-board-repair-vs-replacement-water-damage`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-water-damage-data-recovery-options`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-water-damage-diy-mistakes-to-avoid`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-water-damage-repair-cost-south-africa`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/prevent-macbook-water-damage-protection-tips`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/signs-of-water-damage-macbook-how-to-tell`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/spilled-coffee-on-macbook-what-to-do-right-now`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/can-water-damaged-macbook-be-repaired-south-africa`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-air-water-damage-logic-board-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-liquid-damage-indicator-what-apple-checks`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-pro-coffee-spill-repair-cost-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-water-damage-first-aid-steps-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-charging-port-repair-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-pro-m1-logic-board-repair`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${base}/blog/macbook-trackpad-not-clicking-johannesburg`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },

    // Complete service/suburb/model pages — auto-synced 30/03/2026
    { url: `${base}/battery-replacement/macbook-pro-13-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/macbook-pro-14-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/macbook-pro-m1`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/macbook-pro-m2`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/battery-replacement/macbook-pro-m3`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/screen-repair/mac-mini`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/screen-repair/macbook-air-m1`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/screen-repair/macbook-air-m2`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/screen-repair/macbook-pro-14-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/screen-repair/macbook-pro-16-inch`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
  ];
}

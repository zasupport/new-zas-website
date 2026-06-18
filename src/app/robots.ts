import { MetadataRoute } from 'next';

// AI answer-engine crawlers explicitly permitted so ZA Support content is
// eligible for citation in AI Overviews, ChatGPT Search, Perplexity, Gemini
// and Claude. Same disallow set as the general rule, no private paths exposed.
const AI_CRAWLERS = [
  'GPTBot',           // OpenAI, model training + ChatGPT
  'OAI-SearchBot',    // OpenAI, ChatGPT Search index
  'ChatGPT-User',     // OpenAI, live fetch on user request
  'PerplexityBot',    // Perplexity, index
  'Perplexity-User',  // Perplexity, live fetch
  'ClaudeBot',        // Anthropic, crawl
  'Claude-SearchBot', // Anthropic, search
  'anthropic-ai',     // Anthropic, legacy
  'Google-Extended',  // Google, Gemini grounding
  'Applebot-Extended',// Apple, Apple Intelligence
  'Amazonbot',        // Amazon
  'CCBot',            // Common Crawl, feeds many models
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/admin/', '/studio/', '/_next/'];
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: 'https://zasupport.com/sitemap.xml',
    host: 'https://zasupport.com',
  };
}

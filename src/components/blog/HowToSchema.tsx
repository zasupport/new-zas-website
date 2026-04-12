// components/blog/HowToSchema.tsx
// HowTo JSON-LD generator for repair guide blog posts
// Use on any post that contains step-by-step repair instructions

interface HowToStep {
  name: string          // Step title
  text: string          // Full step description
  image?: string        // Optional step image URL
  url?: string          // Optional anchor link to step on the page
}

interface HowToTool {
  name: string          // e.g. "Pentalobe P5 screwdriver"
}

interface HowToSupply {
  name: string          // e.g. "Replacement battery (Apple part 661-15735)"
}

interface HowToSchemaProps {
  name: string                    // e.g. "How to Replace a MacBook Pro Battery"
  description: string             // Brief overview
  image?: string                  // Featured image URL
  totalTime?: string              // ISO 8601 duration, e.g. "PT45M" for 45 minutes
  estimatedCost?: {
    currency: string              // "ZAR"
    value: string                 // "1500"
  }
  tools?: HowToTool[]
  supplies?: HowToSupply[]
  steps: HowToStep[]
}

export function HowToSchema({
  name,
  description,
  image,
  totalTime,
  estimatedCost,
  tools,
  supplies,
  steps,
}: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: image
      ? {
          '@type': 'ImageObject',
          url: image.startsWith('http') ? image : `https://www.zasupport.com${image}`,
        }
      : undefined,
    totalTime,
    estimatedCost: estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: estimatedCost.currency,
          value: estimatedCost.value,
        }
      : undefined,
    tool: tools?.map((t) => ({
      '@type': 'HowToTool',
      name: t.name,
    })),
    supply: supplies?.map((s) => ({
      '@type': 'HowToSupply',
      name: s.name,
    })),
    step: steps.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.text,
      image: s.image
        ? {
            '@type': 'ImageObject',
            url: s.image.startsWith('http') ? s.image : `https://www.zasupport.com${s.image}`,
          }
        : undefined,
      url: s.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Example usage in a repair guide post:
//
// <HowToSchema
//   name="How to Diagnose a Swollen MacBook Battery"
//   description="Step-by-step diagnosis of MacBook battery swelling and the immediate actions to take to prevent logic board damage."
//   image="/blog/swollen-battery-diagnosis.webp"
//   totalTime="PT15M"
//   estimatedCost={{ currency: "ZAR", value: "599" }}
//   tools={[
//     { name: "Pentalobe P5 screwdriver" },
//     { name: "Plastic spudger" },
//   ]}
//   steps={[
//     {
//       name: "Check the trackpad surface",
//       text: "Place your MacBook on a flat surface. Press lightly on the trackpad in multiple positions. If the trackpad sits proud of the surrounding aluminium or feels uneven, this is a strong indicator of battery swelling underneath.",
//       url: "#step-1",
//     },
//     {
//       name: "Inspect for chassis bowing",
//       text: "Close the MacBook lid and place it on a flat surface. Look at the base from a low angle. Any rocking, bowing, or rotation indicates internal pressure from a swollen battery cell.",
//       url: "#step-2",
//     },
//     {
//       name: "Stop charging immediately",
//       text: "Disconnect from power. A swollen battery is unstable. Continued charging can cause thermal runaway and permanent logic board damage from physical pressure on solder joints.",
//       url: "#step-3",
//     },
//     {
//       name: "Book a professional assessment",
//       text: "Bring the MacBook to ZA Support's Hyde Park workshop for a R599 assessment. We'll confirm the swelling, check for logic board damage, and provide a written quote before any work begins.",
//       url: "#step-4",
//     },
//   ]}
// />

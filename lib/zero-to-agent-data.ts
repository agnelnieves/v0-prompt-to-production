// Event Data for Zero to Agent 2026

export const zeroToAgentData = {
  // Basic Event Info
  name: "Zero to Agent",
  tagline: "Global Build Week",
  greeting: "YOU'RE INVITED TO BUILD",

  // Date & Location
  date: "APRIL 18, 2026",
  locationLabel: "LOCATION",
  venue: "THE LAB Miami",
  venueAddress: "https://maps.app.goo.gl/thelabmiami",

  // Event URL
  eventUrl: "https://community.vercel.com/host/zero-to-agent-2026",

  // Description
  description:
    "Zero to Agent is a global build week where we ship real AI agents with v0 and Vercel. All submissions go into the global competition with $6,000+ in prizes. One submission per person, deployed on Vercel.",

  // CTA
  ctaText: "Ship your agent.",
}

export const zeroToAgentAgendaItems = [
  { title: "Event kicks off globally", time: "April 24" },
  { title: "Build with v0 + $30 credits", time: "Build Week" },
  { title: "Submit your agent", time: "By May 3" },
  { title: "Community voting opens", time: "May 3–4" },
  { title: "Winners announced", time: "After May 5" },
]

export const zeroToAgentExperienceItems = [
  {
    title: "Build Real Agents",
    description:
      "Ship something that actually does something useful. Built with v0, deployed on Vercel.",
  },
  {
    title: "Global Competition",
    description:
      "Submit at the Vercel Community hub. One submission per person, no teams.",
  },
  {
    title: "$30 v0 Credits",
    description:
      "Every attendee gets $30 in v0 credits to use during build week.",
  },
  {
    title: "Community Voting",
    description:
      "24-hour voting period on May 3–4. One vote per Vercel account.",
  },
]

export const zeroToAgentPrizes = [
  {
    place: "1st",
    emoji: "🥇",
    prize: "$3,000 v0 credits",
    extra: "$200/mo Vercel Platform credits + Vercel Pro for 6 months",
  },
  {
    place: "2nd",
    emoji: "🥈",
    prize: "$2,000 v0 credits",
    extra: "$100/mo Vercel Platform credits + Vercel Pro for 6 months",
  },
  {
    place: "3rd",
    emoji: "🥉",
    prize: "$1,000 v0 credits",
    extra: "$50/mo Vercel Platform credits + Vercel Pro for 6 months",
  },
  {
    place: "Community Favorite",
    emoji: "❤️",
    prize: "Community vote winner",
    extra: "Separate from judged prizes",
  },
]

export const judgingCriteria = [
  {
    title: "Agent Usefulness",
    description: "Real-world applicability and problem-solving",
  },
  {
    title: "Technical Execution",
    description: "Built with v0, deployed on Vercel",
  },
  {
    title: "Creativity",
    description: "Originality and innovative approach",
  },
]

export const zeroToAgentSponsors = [
  {
    name: "Vercel",
    logo: "/sponsors/vercel.svg",
    url: "https://vercel.com",
    assetType: "svg" as const,
    height: 37,
  },
  {
    name: "Basement",
    logo: "/sponsors/basement.svg",
    url: "https://basement.dev",
    assetType: "svg" as const,
  },
  {
    name: "UKG",
    logo: "/sponsors/ukg.svg",
    url: "https://www.ukg.com",
    assetType: "svg" as const,
    height: 47,
  },
  {
    name: "The Lab Miami",
    logo: "/sponsors/the-lab.svg",
    url: "https://thelabmiami.com",
    assetType: "svg" as const,
    height: 93,
  },
  {
    name: "DeepStation",
    logo: "/sponsors/deepstation.svg",
    url: "https://deepstation.ai",
    assetType: "svg" as const,
    height: 47,
  },
  {
    name: "Glue Studios",
    logo: "/sponsors/glue-studios.svg",
    url: "https://www.thecreativeglue.com",
    assetType: "svg" as const,
    height: 47,
  },
]

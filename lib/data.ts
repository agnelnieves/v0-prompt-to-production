// Event Data for v0 IRL Miami

export const eventData = {
  // Basic Event Info
  name: "v0 IRL Miami",
  tagline: "Prompt to Production",
  greeting: "HELLO MIAMI! YOU'RE INVITED",
  
  // Date & Location
  date: "FEBRUARY 7, 2026",
  locationLabel: "LOCATION WILL DROP JAN 28TH",
  venue: "TBD",
  venueAddress: "", // To be updated
  
  // Event URL
  eventUrl: "#", // Sign up URL
  
  // Description
  description: "v0 is getting ready to launch its biggest product update yet. We're celebrating with v0 IRLs around the world. And Miami is one of them. You're invited. Real apps, real work.",
  
  // CTA
  ctaText: "It's time to ship.",
}

export const agendaItems = [
  { number: "01", title: "Doors open, networking", time: "12:30 PM" },
  { number: "02", title: "Welcome + v0 video + product intro", time: "1:00 PM" },
  { number: "03", title: "Building begins (curated prompts)", time: "1:45 PM" },
  { number: "04", title: "Final build sprint", time: "6:45 PM" },
  { number: "05", title: "Demo showcase + community voting", time: "7:45 PM" },
  { number: "06", title: "Wrap-up, photos, networking", time: "8:00 PM" },
  { number: "07", title: "Doors close", time: "9:00 PM" },
]

export const experienceItems = [
  {
    number: "01",
    title: "Global Gallery",
    description: "Every project showcased in a worldwide exhibition",
  },
  {
    number: "02",
    title: "Community Voting",
    description: "Builders vote for favorites, winners get prizes.",
  },
  {
    number: "03",
    title: "Live DJ",
    description: "PARINI will set the vibes with science-backed music to ship your best idea.",
  },
  {
    number: "04",
    title: "Local Prizes",
    description: "Thanks to the sponsors for this local event, we're able to provide prizes.",
  },
]

export const sponsors = [
  {
    name: "Vercel",
    logo: "https://www.figma.com/api/mcp/asset/03fcb194-e137-475f-b753-8767813e6f36",
    url: "https://vercel.com",
    type: "image" as const,
    height: 37,
  },
  {
    name: "Kurzo",
    logo: null, // SVG inline
    url: "https://kurzo.com",
    type: "svg" as const,
  },
  {
    name: "UKG",
    logo: "https://www.figma.com/api/mcp/asset/ecfdbe1a-2b10-403d-ae99-b1ba6c527d58",
    url: "https://www.ukg.com",
    type: "image" as const,
    height: 47,
  },
  {
    name: "The Lab Miami",
    logo: "https://www.figma.com/api/mcp/asset/083eed93-2034-4277-be17-99ce10e5b91a",
    url: "https://thelabmiami.com",
    type: "image" as const,
    height: 93,
  },
]

// Logo assets
export const logos = {
  v0: "https://www.figma.com/api/mcp/asset/75f0e408-445a-483e-9c04-012ff5cb1937",
}

// Kurzo SVG path data (stored separately due to complexity)
export const kurzoSvgPath = `M19.2773 39.3291L14.3113 39.3291L14.3113 39.3285L0.0327623 39.3285L0.0327619 34.3625L11.794 34.3625L7.77825e-07 22.5684L3.5115 19.0569L14.3113 29.8568L14.3113 13.6712L19.2773 13.6711L19.2773 39.3291Z`

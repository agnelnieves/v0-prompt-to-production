"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { logos } from "@/lib/data"
import Link from "next/link"
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Send, 
  Sparkles,
  ArrowLeft,
  ArrowRight
} from "lucide-react"

// Custom hook for scroll-triggered animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

const CREDIT_CODE = "V0PROMPTTOPRODUCTION2026"

const timeline = [
  { label: "Events Run", date: "January 31 - February 8, 2025" },
  { label: "Submissions & Voting Close", date: "February 8, 2025" },
  { label: "Winners Announced", date: "Week of February 10, 2025" },
]

const tracks = [
  { name: "Marketing", description: "Build tools and experiences for marketing teams" },
  { name: "GTM (Go-to-Market)", description: "Ship products that help teams launch and grow" },
  { name: "Engineering", description: "Create developer tools and technical solutions" },
  { name: "Design", description: "Craft beautiful interfaces and design systems" },
  { name: "Product", description: "Build features that solve real user problems" },
]

// Prompt templates organized by track
const promptTemplates = [
  {
    track: "Marketing",
    prompts: [
      {
        title: "Landing Page Generator",
        prompt: "Create a high-converting landing page for a SaaS product. Include a hero section with headline, subheadline, and CTA button. Add social proof section with testimonials, a features grid with icons, pricing table with 3 tiers, and a final CTA section. Use a modern dark theme with accent colors.",
      },
      {
        title: "Email Campaign Builder",
        prompt: "Build an email template builder where users can create marketing emails using drag-and-drop blocks. Include header, text, image, button, and footer components. Add preview mode for desktop and mobile. Export as HTML.",
      },
      {
        title: "Social Media Dashboard",
        prompt: "Create a social media analytics dashboard showing engagement metrics across platforms. Include charts for followers growth, post performance, and engagement rates. Add a content calendar view and post scheduler interface.",
      },
    ],
  },
  {
    track: "GTM",
    prompts: [
      {
        title: "Launch Countdown",
        prompt: "Build a product launch countdown page with an animated timer, email waitlist signup, and social sharing buttons. Include a teaser section with product features and early access benefits. Add confetti animation when users sign up.",
      },
      {
        title: "Competitor Analysis Tool",
        prompt: "Create a competitor comparison tool where users can input competitor URLs and see a side-by-side feature comparison table. Include pricing comparison, feature checklist, and a summary recommendation section.",
      },
      {
        title: "Sales Pitch Deck",
        prompt: "Build an interactive pitch deck presentation tool. Include slides for problem, solution, market size, business model, traction, team, and ask. Add presenter mode with notes and a timer. Allow navigation via keyboard arrows.",
      },
    ],
  },
  {
    track: "Engineering",
    prompts: [
      {
        title: "API Documentation",
        prompt: "Create an interactive API documentation page with endpoint listings, request/response examples with syntax highlighting, authentication guide, and a live API playground where users can test endpoints. Include copy buttons for code snippets.",
      },
      {
        title: "Code Review Dashboard",
        prompt: "Build a code review interface showing pull requests, diff viewer with syntax highlighting, comment threads, and approval workflow. Include filters for status, author, and repository. Add keyboard shortcuts for navigation.",
      },
      {
        title: "Database Schema Designer",
        prompt: "Create a visual database schema designer where users can add tables, define columns with types, and create relationships. Include drag-and-drop positioning, export to SQL, and an ERD visualization mode.",
      },
    ],
  },
  {
    track: "Design",
    prompts: [
      {
        title: "Color Palette Generator",
        prompt: "Build a color palette generator that creates harmonious color schemes. Include options for complementary, analogous, triadic, and split-complementary. Show accessibility contrast ratios, export as CSS variables, and generate Tailwind config.",
      },
      {
        title: "Component Library Showcase",
        prompt: "Create a component library documentation site with live component previews, prop tables, code examples, and copy-to-clipboard functionality. Include dark/light mode toggle and responsive preview sizes.",
      },
      {
        title: "Design System Tokens",
        prompt: "Build a design tokens manager where users can define typography scales, spacing systems, color palettes, and shadow styles. Include visual preview for each token and export options for CSS, JSON, and Tailwind config.",
      },
    ],
  },
  {
    track: "Product",
    prompts: [
      {
        title: "User Feedback Board",
        prompt: "Create a feature request and feedback board where users can submit ideas, vote on existing ones, and see status updates. Include categories, search, sorting by votes/date, and an admin view for managing requests.",
      },
      {
        title: "Onboarding Flow Builder",
        prompt: "Build an onboarding flow designer with step-by-step wizard UI. Include progress indicator, skip options, different input types (text, select, multi-select), and a completion celebration screen.",
      },
      {
        title: "Product Roadmap",
        prompt: "Create an interactive product roadmap with timeline view, kanban board, and list views. Include milestones, feature cards with status tags, filtering by quarter/status, and drag-and-drop for reordering.",
      },
    ],
  },
]

const submissionSteps = [
  {
    number: "01",
    title: "Build your project",
    description: "Use v0 to build something amazing. Pick a track for inspiration or build whatever you want.",
  },
  {
    number: "02",
    title: "Deploy to production",
    description: "Ship your project live using Vercel. Real apps, real work.",
  },
  {
    number: "03",
    title: "Post publicly",
    description: "Share your build on X or LinkedIn. Tag @vercel and @v0 to be considered for prizes.",
  },
  {
    number: "04",
    title: "Submit to showcase",
    description: "Add your project to the Community Showcase page for voting.",
  },
]

export default function GetStartedPage() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  

  
  // Prompt templates state
  const [activeTrack, setActiveTrack] = useState("Marketing")
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)
  
  const creditsSection = useInView(0.2)
  const timelineSection = useInView(0.2)
  const submissionSection = useInView(0.2)
  const tracksSection = useInView(0.2)
  const promptPackSection = useInView(0.2)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyCode = async () => {
    await navigator.clipboard.writeText(CREDIT_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyPrompt = async (promptText: string, promptTitle: string) => {
    await navigator.clipboard.writeText(promptText)
    setCopiedPrompt(promptTitle)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }



  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div 
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-0 py-8 lg:py-[49px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[18px] group cursor-pointer">
              <Link href="/" className="flex items-center gap-[18px]">
                <img 
                  src={logos.v0 || "/placeholder.svg"} 
                  alt="v0" 
                  className="h-[24px] w-[50px] transition-opacity duration-300 group-hover:opacity-80" 
                />
                <span className="font-mono text-[12px] text-[#737373] tracking-[2.4px] [text-shadow:0px_0px_4px_black] transition-colors duration-300 group-hover:text-white">
                  GET STARTED
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="group flex items-center gap-2 text-[14px] text-[#737373] hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Back to Event</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <div className={`max-w-[900px] mx-auto text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px] mb-6">
            PARTICIPANT GUIDE
          </p>
          <h1 className="text-[40px] md:text-[60px] lg:text-[80px] font-normal leading-[1.1] tracking-[-0.04em] text-white mb-8">
            Get Started
          </h1>
          <p className="text-[18px] lg:text-[22px] text-[#a1a1a1] leading-[1.6] max-w-[600px] mx-auto">
            Everything you need to participate in v0 Prompt to Production Week 2025. Let&apos;s ship something amazing together.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] bg-black pb-16">
        
        {/* Credits Section */}
        <section 
          ref={creditsSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] transition-all duration-700 ${creditsSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#737373]" />
                <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
                  CREDITS
                </p>
              </div>
            </div>
            <div className={`flex-1 max-w-[700px] transition-all duration-700 delay-100 ${creditsSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-6">
                Redeem your v0 credits
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7] mb-8">
                Each participant gets free v0 credits to use during the event. Credits last 2 weeks after redemption and can be redeemed once per individual.
              </p>
              
              {/* Credit Code Box */}
              <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-6 mb-6">
                <p className="font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-3">
                  YOUR CODE
                </p>
                <div className="flex items-center justify-between gap-4">
                  <code className="font-mono text-[18px] lg:text-[24px] text-white tracking-wider">
                    {CREDIT_CODE}
                  </code>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-[#333] rounded-lg transition-all duration-300"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-[14px] text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-white" />
                        <span className="text-[14px] text-white">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Redemption Steps */}
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[12px] text-[#737373] tracking-[1.5px]">
                  HOW TO REDEEM
                </p>
                <ol className="list-decimal list-inside text-[15px] text-[#a1a1a1] leading-[2] ml-1">
                  <li>Go to <a href="https://v0.app" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-[#a1a1a1] transition-colors">v0.app</a></li>
                  <li>Navigate to Profile → Billing</li>
                  <li>Click &quot;Redeem usage code&quot;</li>
                  <li>Enter the code above</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section 
          ref={timelineSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] transition-all duration-700 ${timelineSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#737373]" />
                <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
                  TIMELINE
                </p>
              </div>
            </div>
            <div className={`flex-1 max-w-[700px] transition-all duration-700 delay-100 ${timelineSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-8">
                Key dates to remember
              </h2>
              <div className="flex flex-col gap-0">
                {timeline.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[#262626] ${index === timeline.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <span className="text-[18px] text-white mb-1 sm:mb-0">{item.label}</span>
                    <span className="font-mono text-[14px] text-[#737373]">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Submission Section */}
        <section 
          ref={submissionSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] transition-all duration-700 ${submissionSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-[#737373]" />
                <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
                  HOW TO SUBMIT
                </p>
              </div>
            </div>
            <div className={`flex-1 max-w-[700px] transition-all duration-700 delay-100 ${submissionSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-4">
                Submit your project
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7] mb-10">
                To be considered for prizes, you must complete both steps: post publicly on social media AND submit to the Community Showcase.
              </p>
              
              <div className="grid gap-6">
                {submissionSteps.map((step, index) => (
                  <div 
                    key={index}
                    className="flex gap-5 p-5 bg-[#0a0a0a] border border-[#262626] rounded-lg hover:border-[#404040] transition-colors duration-300"
                  >
                    <span className="font-mono text-[12px] text-[#737373] mt-1">{step.number}</span>
                    <div>
                      <h3 className="text-[18px] text-white mb-2">{step.title}</h3>
                      <p className="text-[15px] text-[#737373] leading-[1.6]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit CTA */}
              <div className="mt-10">
                <Link 
                  href="/submit"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300"
                >
                  <span>Start Submission</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section 
          ref={tracksSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className={`w-full lg:w-[232px] flex items-start lg:sticky lg:top-[140px] transition-all duration-700 ${tracksSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
                TRACKS
              </p>
            </div>
            <div className={`flex-1 max-w-[700px] transition-all duration-700 delay-100 ${tracksSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-4">
                Choose your track
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7] mb-10">
                Tracks are for inspiration only. You can build whatever you want, but these categories help guide your project and organize voting.
              </p>
              
              <div className="grid gap-4">
                {tracks.map((track, index) => (
                  <div 
                    key={index}
                    className="p-5 bg-[#0a0a0a] border border-[#262626] rounded-lg hover:border-[#404040] transition-colors duration-300"
                  >
                    <h3 className="text-[18px] text-white mb-2">{track.name}</h3>
                    <p className="text-[15px] text-[#737373] leading-[1.5]">{track.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prompt Templates Section */}
        <section 
          ref={promptPackSection.ref}
          className="border-t lg:border border-[#262626] px-6 lg:px-16 py-16 lg:py-24 lg:mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className={`w-full lg:w-[232px] flex items-start lg:sticky lg:top-[140px] transition-all duration-700 ${promptPackSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
                RESOURCES
              </p>
            </div>
            <div className={`flex-1 max-w-[700px] transition-all duration-700 delay-100 ${promptPackSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-4">
                Prompt Templates
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7] mb-8">
                Curated prompts to kickstart your builds. Select a track below and copy any prompt directly into v0.
              </p>
              
              {/* Track Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {promptTemplates.map((trackData) => (
                  <button
                    key={trackData.track}
                    onClick={() => setActiveTrack(trackData.track)}
                    className={`px-4 py-2 rounded-lg font-mono text-[12px] tracking-wide transition-all duration-300 ${
                      activeTrack === trackData.track
                        ? "bg-white text-black"
                        : "bg-[#0a0a0a] text-[#737373] border border-[#262626] hover:border-[#404040] hover:text-white"
                    }`}
                  >
                    {trackData.track}
                  </button>
                ))}
              </div>

              {/* Prompt Cards */}
              <div className="space-y-4">
                {promptTemplates
                  .find((t) => t.track === activeTrack)
                  ?.prompts.map((promptData, index) => (
                    <div
                      key={index}
                      className="group p-5 bg-[#0a0a0a] border border-[#262626] rounded-lg hover:border-[#404040] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-[16px] font-medium text-white">
                          {promptData.title}
                        </h3>
                        <button
                          onClick={() => copyPrompt(promptData.prompt, promptData.title)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-mono transition-all duration-300 ${
                            copiedPrompt === promptData.title
                              ? "bg-green-500/20 text-green-400"
                              : "bg-[#1a1a1a] text-[#737373] hover:text-white hover:bg-[#262626]"
                          }`}
                        >
                          {copiedPrompt === promptData.title ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[14px] text-[#a1a1a1] leading-[1.6]">
                        {promptData.prompt}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Link to full inspiration page */}
              <div className="mt-8 p-4 bg-[#0a0a0a] border border-[#262626] rounded-lg">
                <p className="text-[14px] text-[#737373] mb-3">
                  Want more inspiration? Check out the full collection with even more prompts and ideas.
                </p>
                <a
                  href="https://v0-v0prompttoproduction2026.vercel.app/inspiration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:underline text-[14px]"
                >
                  Browse all prompts
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

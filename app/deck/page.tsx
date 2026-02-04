"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Dithering } from "@paper-design/shaders-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { sponsors, logos } from "@/lib/data"

const TOTAL_SLIDES = 7

// Deck agenda items (different from homepage agenda)
const deckAgendaItems = [
  { title: "Opening", description: "For every builder at your event" },
  { title: "Opening", description: "For every builder at your event" },
  { title: "Networking", description: "Connecting with industry leaders and peers" },
  { title: "Workshops", description: "Hands-on sessions to enhance skills" },
  { title: "Closing", description: "Summarizing insights and next steps" },
]

// Global tracks data
const globalTracks = [
  { title: "GTM", description: "Close deals faster. Automate research, personalize demos, and generate proposals on demand." },
  { title: "Marketing", description: "Turn ideas into campaigns. Repurpose content, analyze performance, and ship without waiting." },
  { title: "Design", description: "Refine layouts and maintain systems. Check consistency, document components, iterate faster." },
  { title: "Data & Ops", description: "Automate reporting and surface insights. Monitor metrics, alert on issues, keep teams informed." },
  { title: "Product", description: "Turn feedback and PRDs into prototypes. Synthesize, prioritize, and ship specs faster." },
  { title: "Engineering", description: "Unblock stakeholders without breaking prod. Triage, document, and automate the tedious stuff." },
]

// Sponsored challenges data
const gailChallenge = {
  description: "Use the following dummy data from phone, SMS, and chat interactions, to build a system that turns each person's support history into a behavioral profile and dynamic \"fit score\" for products.\n\nAnalyze how people communicate (e.g., temperament, reliability in keeping payment promises, responsiveness, etc) and use that profile to recommend which customers are the best match for specific offers a retailer could make. The goal is to show how offline data can power smarter, more personalized decisions than web data alone.",
  prizes: [
    { place: "First Place", amount: "$800" },
    { place: "Second Place", amount: "$100" },
    { place: "Third Place", amount: "$100" },
  ],
  learnMoreUrl: "#",
}

const kurzoChallenge = {
  description: "A tool that takes multiple unstructured input (notes, voice, images, URLs, files) and transforms them into organized, actionable output. The system should surface themes, priorities, and next steps—but the user must be able to refine the structure themselves.\n\nBonus points for handling new input without starting from scratch.\n\nThe goal: prove that the distance between chaos and clarity is a design problem, not a discipline problem.",
  prizes: [
    { place: "Single winner", amount: "$300" },
  ],
}

// Get individual sponsor logos
const gailSponsor = sponsors.find(s => s.name === "Gail")
const kurzoSponsor = sponsors.find(s => s.name === "Kurzo")

// Helper to get initial slide from URL (only runs once on mount)
function getInitialSlide(): number {
  if (typeof window === "undefined") return 1
  const params = new URLSearchParams(window.location.search)
  const slideParam = params.get("s")
  return slideParam ? Math.max(1, Math.min(TOTAL_SLIDES, parseInt(slideParam) || 1)) : 1
}

export default function DeckPage() {
  const [headerMounted, setHeaderMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [slideKey, setSlideKey] = useState(0)
  const initializedRef = useRef(false)

  // Read slide from URL only once on mount
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      const initialSlide = getInitialSlide()
      setCurrentSlide(initialSlide)
      setHeaderMounted(true)
    }
  }, [])

  const navigateToSlide = useCallback((slide: number) => {
    const clampedSlide = Math.max(1, Math.min(TOTAL_SLIDES, slide))
    setCurrentSlide(clampedSlide)
    setSlideKey(prev => prev + 1)
  }, [])

  const goNext = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES) {
      navigateToSlide(currentSlide + 1)
    }
  }, [currentSlide, navigateToSlide])

  const goPrev = useCallback(() => {
    if (currentSlide > 1) {
      navigateToSlide(currentSlide - 1)
    }
  }, [currentSlide, navigateToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  return (
    <div className="h-dvh bg-black text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className={`flex-shrink-0 px-6 lg:px-10 py-6 lg:py-8 flex items-center justify-between transition-all duration-700 ${headerMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3 lg:gap-4">
          <svg viewBox="0 0 76 65" fill="white" className="h-5 lg:h-6 w-auto">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
          <span className="text-white/60">/</span>
          <img 
            src={logos.v0 || "/placeholder.svg"} 
            alt="v0" 
            className="h-5 lg:h-6 w-auto" 
          />
          <span className="font-mono text-[10px] lg:text-[12px] text-[#737373] tracking-[2px] lg:tracking-[2.4px] ml-2 lg:ml-4">
            IRL - MIAMI
          </span>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 lg:gap-4">
          <button
            onClick={goPrev}
            disabled={currentSlide === 1}
            className="p-2 text-white/60 hover:text-white disabled:text-white/20 transition-colors duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            onClick={goNext}
            disabled={currentSlide === TOTAL_SLIDES}
            className="p-2 text-white/60 hover:text-white disabled:text-white/20 transition-colors duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </header>

      {/* Slide Content */}
      <main className="flex-1 overflow-hidden">
        {currentSlide === 1 && <TitleSlide key={`slide-1-${slideKey}`} />}
        {currentSlide === 2 && <WelcomeSlide key={`slide-2-${slideKey}`} />}
        {currentSlide === 3 && <TheChallengeSlide key={`slide-3-${slideKey}`} />}
        {currentSlide === 4 && <AgendaSlide key={`slide-4-${slideKey}`} items={deckAgendaItems} />}
        {currentSlide === 5 && <GlobalTracksSlide key={`slide-5-${slideKey}`} tracks={globalTracks} />}
        {currentSlide === 6 && <SponsoredChallengeSlide key={`slide-6-${slideKey}`} sponsor={gailSponsor!} challenge={gailChallenge} slideNumber="06" />}
        {currentSlide === 7 && <SponsoredChallengeSlide key={`slide-7-${slideKey}`} sponsor={kurzoSponsor!} challenge={kurzoChallenge} slideNumber="07" />}
      </main>
    </div>
  )
}

// Slide 1: Title Slide
function TitleSlide() {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full flex flex-col items-center justify-center px-6 lg:px-10">
      {/* Dithering Shader Background */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <Dithering
          colorBack="#000000"
          colorFront="#99999921"
          shape="warp"
          type="4x4"
          size={2.5}
          speed={0.45}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logos */}
        <div className={`flex items-center gap-3 lg:gap-4 mb-8 lg:mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[5px]'}`}>
          <svg viewBox="0 0 76 65" fill="white" className="h-8 lg:h-10 w-auto">
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
          <span className="text-white/60 text-2xl lg:text-3xl">/</span>
          <img 
            src={logos.v0 || "/placeholder.svg"} 
            alt="v0" 
            className="h-8 lg:h-10 w-auto" 
          />
        </div>
        
        {/* Main Title */}
        <h1 className={`text-[48px] sm:text-[72px] md:text-[96px] lg:text-[120px] font-normal leading-[0.95] tracking-[-0.04em] text-white mb-6 lg:mb-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}>
          <span className="block">Prompt to</span>
          <span className="block">Prod Miami</span>
        </h1>
        
        {/* Subtitle */}
        <p className={`font-mono text-[11px] sm:text-[12px] lg:text-[14px] text-[#737373] tracking-[3px] lg:tracking-[4px] uppercase transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}>
          A day to ship ideas into
          <br />
          production-ready applications
        </p>
      </div>
    </div>
  )
}

// Slide 2: Welcome Slide
function WelcomeSlide() {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex items-center justify-center px-6 lg:px-16">
      <p className={`text-[24px] sm:text-[32px] md:text-[40px] lg:text-[52px] font-normal leading-[1.35] tracking-[-0.02em] text-white max-w-[1100px] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}>
        v0 just launched its biggest product update yet. We're celebrating with v0 IRLs around the world. Miami is one of them. Glad you're here!
      </p>
    </div>
  )
}

// Slide 3: The Challenge
function TheChallengeSlide() {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col px-6 lg:px-16 py-8 lg:py-16">
      {/* Title */}
      <h2 className={`font-mono text-[12px] lg:text-[14px] text-[#737373] tracking-[2.8px] mb-12 lg:mb-20 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[5px]'}`}>
        03 THE CHALLENGE
      </h2>
      
      {/* Main Text */}
      <p className={`text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-normal leading-[1.3] tracking-[-0.02em] text-white max-w-[1000px] transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}>
        {"Today's build is about momentum and proving that technical barriers are now smaller than we think."}
      </p>
    </div>
  )
}

// Slide 4: Agenda
function AgendaSlide({ items }: { items: typeof deckAgendaItems }) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col px-6 lg:px-16 py-8 lg:py-16 overflow-y-auto">
      {/* Title */}
      <h2 className={`font-mono text-[12px] lg:text-[14px] text-[#737373] tracking-[2.8px] mb-8 lg:mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[5px]'}`}>
        04 THE AGENDA
      </h2>
      
      {/* Agenda Items */}
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row sm:items-center justify-between py-5 lg:py-6 border-b border-[#262626] last:border-b-0 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}
            style={{ transitionDelay: `${150 + index * 80}ms` }}
          >
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
              <span className="font-mono text-[10px] lg:text-[11px] text-[#737373] tracking-[-0.4px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[18px] lg:text-[22px] text-white leading-[1.3]">
                {item.title}
              </span>
            </div>
            <span className="text-[13px] lg:text-[15px] text-[#737373] leading-[1.5] sm:text-right pl-8 sm:pl-0">
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Slide 5: Global Tracks
function GlobalTracksSlide({ tracks }: { tracks: typeof globalTracks }) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Left side - Title */}
      <div className="flex-shrink-0 lg:w-[30%] flex flex-col justify-between px-6 lg:px-16 py-8 lg:py-16">
        <h2 className={`font-mono text-[12px] lg:text-[14px] text-[#737373] tracking-[2.8px] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[5px]'}`}>
          05 GLOBAL TRACKS
        </h2>
        <a 
          href="#" 
          className={`font-mono text-[11px] lg:text-[12px] text-[#737373] tracking-[2px] hover:text-white transition-all duration-700 delay-200 hidden lg:block ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}
        >
          LEARN MORE
        </a>
      </div>
      
      {/* Right side - Tracks Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-[#262626]">
        {tracks.map((track, index) => (
          <div
            key={track.title}
            className={`flex flex-col justify-end p-6 lg:p-8 border-b border-r border-[#262626] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}
            style={{ transitionDelay: `${150 + index * 80}ms` }}
          >
            <span className="font-mono text-[10px] lg:text-[11px] text-[#737373] tracking-[-0.4px] mb-2">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[20px] lg:text-[24px] text-white leading-[1.2] mb-3">
              {track.title}
            </h3>
            <p className="text-[13px] lg:text-[14px] text-[#737373] leading-[1.5]">
              {track.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Slide 6 & 7: Sponsored Challenge
function SponsoredChallengeSlide({ 
  sponsor, 
  challenge, 
  slideNumber 
}: { 
  sponsor: typeof gailSponsor
  challenge: typeof gailChallenge | typeof kurzoChallenge
  slideNumber: string 
}) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const hasLearnMore = 'learnMoreUrl' in challenge

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-y-auto">
      {/* Left side - Title & Logo */}
      <div className="flex-shrink-0 lg:w-[35%] flex flex-col justify-between px-6 lg:px-16 py-8 lg:py-16">
        <div>
          <h2 className={`font-mono text-[12px] lg:text-[14px] text-[#737373] tracking-[2.8px] mb-8 lg:mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[5px]'}`}>
            {slideNumber} SPONSORED CHALLENGE
          </h2>
          {sponsor && (
            <img
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              className={`w-auto max-w-[160px] lg:max-w-[200px] transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}
              style={{ height: sponsor.height || "auto", maxHeight: "60px" }}
            />
          )}
        </div>
        {hasLearnMore && (
          <a 
            href={(challenge as typeof gailChallenge).learnMoreUrl} 
            className={`font-mono text-[11px] lg:text-[12px] text-[#737373] tracking-[2px] hover:text-white transition-all duration-700 delay-300 hidden lg:block ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}
          >
            LEARN MORE
          </a>
        )}
      </div>
      
      {/* Right side - Description & Prizes */}
      <div className="flex-1 flex flex-col border-l border-[#262626]">
        {/* Description */}
        <div className={`flex-1 p-6 lg:p-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}>
          <p className="text-[16px] sm:text-[18px] lg:text-[22px] text-[#a3a3a3] leading-[1.6] whitespace-pre-line">
            {challenge.description}
          </p>
        </div>
        
        {/* Prizes */}
        <div className={`flex border-t border-[#262626] transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}>
          {challenge.prizes.map((prize, index) => (
            <div
              key={prize.place}
              className={`flex-1 p-6 lg:p-8 ${index < challenge.prizes.length - 1 ? 'border-r border-[#262626]' : ''}`}
            >
              <span className="font-mono text-[10px] lg:text-[11px] text-[#737373] tracking-[-0.4px] block mb-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[16px] lg:text-[18px] text-white block mb-1">
                {prize.place}
              </span>
              <span className="text-[24px] lg:text-[32px] text-[#737373] font-light">
                {prize.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

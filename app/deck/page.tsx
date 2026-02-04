"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Dithering } from "@paper-design/shaders-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { sponsors, logos } from "@/lib/data"

const TOTAL_SLIDES = 5

// Deck agenda items (different from homepage agenda)
const deckAgendaItems = [
  { title: "Opening", description: "For every builder at your event" },
  { title: "Opening", description: "For every builder at your event" },
  { title: "Networking", description: "Connecting with industry leaders and peers" },
  { title: "Workshops", description: "Hands-on sessions to enhance skills" },
  { title: "Closing", description: "Summarizing insights and next steps" },
]

// Categorize sponsors
const madePossibleBy = sponsors.filter(s => 
  ["UKG", "The Lab Miami", "Glue Studios", "DeepStation"].includes(s.name)
)
const sponsoredPrizes = sponsors.filter(s => 
  ["Vercel", "Kurzo", "Gail"].includes(s.name)
)

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
        {currentSlide === 3 && <MadePossibleBySlide key={`slide-3-${slideKey}`} sponsors={madePossibleBy} />}
        {currentSlide === 4 && <SponsoredPrizesSlide key={`slide-4-${slideKey}`} sponsors={sponsoredPrizes} />}
        {currentSlide === 5 && <AgendaSlide key={`slide-5-${slideKey}`} items={deckAgendaItems} />}
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

// Slide 3: Made Possible By
function MadePossibleBySlide({ sponsors }: { sponsors: typeof madePossibleBy }) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Left side - Title */}
      <div className="flex-shrink-0 lg:w-[40%] flex items-center px-6 lg:px-16 py-8 lg:py-0">
        <h2 className={`font-mono text-[12px] lg:text-[14px] text-[#737373] tracking-[2.8px] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[5px]'}`}>
          01 MADE POSSIBLE BY
        </h2>
      </div>
      
      {/* Right side - Sponsor Grid */}
      <div className="flex-1 grid grid-cols-2 border-l border-[#262626]">
        {sponsors.map((sponsor, index) => (
          <div
            key={sponsor.name}
            className={`flex items-center justify-center border-b border-r border-[#262626] p-6 lg:p-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}
            style={{ transitionDelay: `${150 + index * 100}ms` }}
          >
            <img
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              className="w-auto max-w-[120px] lg:max-w-[180px]"
              style={{ height: sponsor.height || "auto", maxHeight: "60px" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Slide 4: Sponsored Prizes
function SponsoredPrizesSlide({ sponsors }: { sponsors: typeof sponsoredPrizes }) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Left side - Title */}
      <div className="flex-shrink-0 lg:w-[40%] flex items-center px-6 lg:px-16 py-8 lg:py-0">
        <h2 className={`font-mono text-[12px] lg:text-[14px] text-[#737373] tracking-[2.8px] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[5px]'}`}>
          02 SPONSORED PRIZES
        </h2>
      </div>
      
      {/* Right side - Sponsor List */}
      <div className="flex-1 flex flex-col border-l border-[#262626]">
        {sponsors.map((sponsor, index) => (
          <div
            key={sponsor.name}
            className={`flex-1 flex items-center justify-center border-b border-[#262626] last:border-b-0 p-6 lg:p-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[5px]'}`}
            style={{ transitionDelay: `${150 + index * 100}ms` }}
          >
            <img
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              className="w-auto max-w-[140px] lg:max-w-[200px]"
              style={{ height: sponsor.height || "auto", maxHeight: "50px" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Slide 5: Agenda
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
        03 THE AGENDA
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

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
  Share2, 
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Share
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

const socialLinks = {
  linkedin: {
    vercel: "https://www.linkedin.com/company/vercel/",
    v0: "https://www.linkedin.com/company/v0dev/",
  },
  x: {
    vercel: "https://x.com/vercel",
    v0: "https://x.com/v0",
  },
}

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
  
  // Share post generator state
  const [projectName, setProjectName] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [activePlatform, setActivePlatform] = useState<"x" | "linkedin">("x")
  
  const creditsSection = useInView(0.2)
  const timelineSection = useInView(0.2)
  const submissionSection = useInView(0.2)
  const socialSection = useInView(0.2)
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

  // Generate post content
  const generatePostContent = (platform: "x" | "linkedin") => {
    const name = projectName.trim() || "my project"
    const url = projectUrl.trim()
    
    if (platform === "x") {
      return `Just shipped ${name} for #v0PromptToProduction Week!

Built with @v0 and deployed on @vercel.

${url ? `Check it out: ${url}` : ""}

#BuildInPublic #v0`.trim()
    } else {
      return `Excited to share ${name} - my submission for v0 Prompt to Production Week!

This project was built using v0 by Vercel, showcasing how AI-powered development can help ship production-ready apps faster.

${url ? `Live demo: ${url}` : ""}

#v0PromptToProduction #BuildInPublic #Vercel #v0 #WebDevelopment`.trim()
    }
  }

  const shareOnX = () => {
    const text = encodeURIComponent(generatePostContent("x"))
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(generatePostContent("linkedin"))
    const url = projectUrl.trim() ? encodeURIComponent(projectUrl.trim()) : ""
    // LinkedIn share URL with pre-filled text
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url || encodeURIComponent("https://v0.dev")}&text=${text}`, "_blank")
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
            </div>
          </div>
        </section>

        {/* Share Post Generator Section */}
        <section 
          ref={socialSection.ref}
          className="border-t lg:border lg:border-b-0 border-[#262626] px-6 lg:px-16 py-16 lg:py-24"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] transition-all duration-700 ${socialSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-[#737373]" />
                <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
                  SHARE
                </p>
              </div>
            </div>
            <div className={`flex-1 max-w-[700px] transition-all duration-700 delay-100 ${socialSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-4">
                Generate your post
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7] mb-8">
                Fill in your project details below to generate a ready-to-share post. We&apos;ll automatically include the right mentions and hashtags.
              </p>

              {/* Input Form */}
              <div className="space-y-4 mb-8">
                <div>
                  <label htmlFor="projectName" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                    PROJECT NAME
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. AI Recipe Generator"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="projectUrl" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                    LIVE URL
                  </label>
                  <input
                    id="projectUrl"
                    type="url"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    placeholder="e.g. https://my-project.vercel.app"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                  />
                </div>
              </div>

              {/* Platform Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActivePlatform("x")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[13px] tracking-wide transition-all duration-300 ${
                    activePlatform === "x" 
                      ? "bg-white text-black" 
                      : "bg-[#0a0a0a] text-[#737373] border border-[#262626] hover:border-[#404040]"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X / Twitter
                </button>
                <button
                  onClick={() => setActivePlatform("linkedin")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[13px] tracking-wide transition-all duration-300 ${
                    activePlatform === "linkedin" 
                      ? "bg-[#0a66c2] text-white" 
                      : "bg-[#0a0a0a] text-[#737373] border border-[#262626] hover:border-[#404040]"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </button>
              </div>

              {/* Post Preview */}
              {activePlatform === "x" ? (
                // X / Twitter Preview
                <div className="bg-black border border-[#2f3336] rounded-2xl overflow-hidden">
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#333] to-[#555] flex items-center justify-center text-white font-medium text-[14px]">
                        You
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-[15px] font-bold text-white">Your Name</span>
                          <span className="text-[15px] text-[#71767b]">@yourhandle</span>
                          <span className="text-[15px] text-[#71767b]">·</span>
                          <span className="text-[15px] text-[#71767b]">now</span>
                        </div>
                        {/* Post Content */}
                        <div className="mt-1 text-[15px] text-white leading-[1.4] whitespace-pre-wrap">
                          {generatePostContent("x").split(/([@#]\w+)/g).map((part, i) => {
                            if (part.startsWith("@") || part.startsWith("#")) {
                              return <span key={i} className="text-[#1d9bf0]">{part}</span>
                            }
                            if (part.startsWith("http")) {
                              return <span key={i} className="text-[#1d9bf0]">{part}</span>
                            }
                            return part
                          })}
                        </div>
                        {/* Engagement */}
                        <div className="flex items-center justify-between mt-4 max-w-[425px] text-[#71767b]">
                          <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition-colors group">
                            <MessageCircle className="w-[18px] h-[18px]" />
                            <span className="text-[13px]">0</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-[#00ba7c] transition-colors">
                            <Repeat2 className="w-[18px] h-[18px]" />
                            <span className="text-[13px]">0</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-[#f91880] transition-colors">
                            <Heart className="w-[18px] h-[18px]" />
                            <span className="text-[13px]">0</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition-colors">
                            <BarChart2 className="w-[18px] h-[18px]" />
                            <span className="text-[13px]">0</span>
                          </button>
                          <div className="flex items-center gap-3">
                            <button className="hover:text-[#1d9bf0] transition-colors">
                              <Bookmark className="w-[18px] h-[18px]" />
                            </button>
                            <button className="hover:text-[#1d9bf0] transition-colors">
                              <Share className="w-[18px] h-[18px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // LinkedIn Preview
                <div className="bg-white rounded-lg overflow-hidden border border-[#e0e0e0]">
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center text-white font-semibold text-[16px]">
                        You
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[14px] font-semibold text-[#000000e6]">Your Name</span>
                          <span className="text-[14px] text-[#00000099]">· 1st</span>
                        </div>
                        <p className="text-[12px] text-[#00000099] leading-tight">Your headline here</p>
                        <p className="text-[12px] text-[#00000099]">Just now · <span className="inline-flex items-center"><svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"/></svg></span></p>
                      </div>
                    </div>
                    {/* Post Content */}
                    <div className="mt-3 text-[14px] text-[#000000e6] leading-[1.5] whitespace-pre-wrap">
                      {generatePostContent("linkedin").split(/(#\w+)/g).map((part, i) => {
                        if (part.startsWith("#")) {
                          return <span key={i} className="text-[#0a66c2] hover:underline cursor-pointer">{part}</span>
                        }
                        if (part.startsWith("http")) {
                          return <span key={i} className="text-[#0a66c2]">{part}</span>
                        }
                        return part
                      })}
                    </div>
                    {/* Link Preview Card */}
                    {projectUrl.trim() && (
                      <div className="mt-3 border border-[#e0e0e0] rounded-lg overflow-hidden">
                        <div className="h-[120px] bg-gradient-to-br from-[#f3f2f0] to-[#e8e7e5] flex items-center justify-center">
                          <span className="text-[#666] text-[13px]">Link preview</span>
                        </div>
                        <div className="p-3 bg-[#f9fafb]">
                          <p className="text-[12px] text-[#00000099] truncate">{projectUrl.trim()}</p>
                          <p className="text-[14px] text-[#000000e6] font-medium truncate">{projectName.trim() || "Your Project"}</p>
                        </div>
                      </div>
                    )}
                    {/* Engagement */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e0e0e0]">
                      <button className="flex items-center gap-1.5 px-3 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-[14px] font-medium">Like</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-[14px] font-medium">Comment</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                        <Repeat2 className="w-5 h-5" />
                        <span className="text-[14px] font-medium">Repost</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                        <Send className="w-5 h-5" />
                        <span className="text-[14px] font-medium">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Share Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {activePlatform === "x" ? (
                  <button
                    onClick={shareOnX}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share on X
                  </button>
                ) : (
                  <button
                    onClick={shareOnLinkedIn}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0a66c2] text-white rounded-lg font-medium hover:bg-[#004182] transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Share on LinkedIn
                  </button>
                )}
              </div>

              {/* Accounts to mention info */}
              <div className="mt-8 p-4 bg-[#0a0a0a] border border-[#262626] rounded-lg">
                <p className="font-mono text-[11px] text-[#737373] tracking-[1.5px] mb-3">
                  ACCOUNTS MENTIONED IN YOUR POST
                </p>
                <div className="flex flex-wrap gap-4 text-[14px]">
                  <div>
                    <span className="text-[#737373]">X:</span>{" "}
                    <a href={socialLinks.x.vercel} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@vercel</a>,{" "}
                    <a href={socialLinks.x.v0} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@v0</a>
                  </div>
                  <div>
                    <span className="text-[#737373]">LinkedIn:</span>{" "}
                    <a href={socialLinks.linkedin.vercel} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Vercel</a>,{" "}
                    <a href={socialLinks.linkedin.v0} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">v0</a>
                  </div>
                </div>
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

        {/* Prompt Pack Section */}
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
                Prompt Pack
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7] mb-8">
                We&apos;re preparing a collection of curated prompts to help kickstart your builds. The prompt pack will include starter templates for each track.
              </p>
              
              <div className="p-6 bg-[#0a0a0a] border border-dashed border-[#333] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-[#737373] rounded-full animate-pulse" />
                  <span className="font-mono text-[12px] text-[#737373] tracking-[1.5px]">COMING SOON</span>
                </div>
                <p className="text-[15px] text-[#737373] leading-[1.6]">
                  The prompt pack will be available on the Community Showcase page when the event begins.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

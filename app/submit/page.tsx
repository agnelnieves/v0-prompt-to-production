"use client"

import React from "react"
import { useEffect, useState } from "react"
import { logos } from "@/lib/data"
import Link from "next/link"
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Share,
  Send,
  ExternalLink,
  CheckCircle2
} from "lucide-react"

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

// Global hackathon categories (from the reference)
const globalCategories = [
  { id: "gtm", label: "GTM" },
  { id: "marketing", label: "Marketing" },
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "data-ops", label: "Data & Ops" },
  { id: "engineering", label: "Engineering" },
]

// Local Miami sponsored prize categories
const localCategories = [
  { id: "best-miami", label: "Best Miami-themed Project", description: "Projects that celebrate Miami culture, community, or solve local problems" },
  { id: "most-creative", label: "Most Creative Use of v0", description: "Innovative and unexpected applications of v0's capabilities" },
  { id: "best-first-timer", label: "Best First-Timer Project", description: "Outstanding projects from participants new to v0" },
  { id: "community-choice", label: "Community Choice", description: "Voted by fellow participants at the event" },
]

export default function SubmitPage() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Step 1: Social post generator
  const [projectName, setProjectName] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [activePlatform, setActivePlatform] = useState<"x" | "linkedin">("x")
  const [hasPosted, setHasPosted] = useState(false)
  
  // Step 2: Categories
  const [globalCategory, setGlobalCategory] = useState("")
  const [localCategory, setLocalCategory] = useState("")
  
  // Step 3: Additional info
  const [yourName, setYourName] = useState("")
  const [v0Username, setV0Username] = useState("")
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [socialProofLink, setSocialProofLink] = useState("")

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

  // Generate post content
  const generatePostContent = (platform: "x" | "linkedin") => {
    const name = projectName.trim() || "my project"
    const url = projectUrl.trim()
    
    if (platform === "x") {
      return `Just shipped ${name} at #v0PromptToProduction Miami!

Built with @v0 and deployed on @vercel at The LAB Miami.

${url ? `Check it out: ${url}` : ""}

Hosted by @AgnelNieves

#BuildInPublic #MiamiTech #v0`.trim()
    } else {
      return `Excited to share ${name} - my submission from v0 Prompt to Production Week in Miami!

This project was built using v0 by Vercel at The LAB Miami, showcasing how AI-powered development can help ship production-ready apps faster.

${url ? `Live demo: ${url}` : ""}

Huge thanks to Agnel Nieves for hosting this incredible event!

#v0PromptToProduction #BuildInPublic #MiamiTech #Vercel #v0 #WebDevelopment`.trim()
    }
  }

  const shareOnX = () => {
    const text = encodeURIComponent(generatePostContent("x"))
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
    setHasPosted(true)
  }

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(generatePostContent("linkedin"))
    const url = projectUrl.trim() ? encodeURIComponent(projectUrl.trim()) : ""
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url || encodeURIComponent("https://v0.dev")}&text=${text}`, "_blank")
    setHasPosted(true)
  }

  const canProceedStep1 = projectName.trim() && projectUrl.trim() && hasPosted
  const canProceedStep2 = globalCategory && localCategory
  const canSubmit = yourName.trim() && v0Username.trim() && email.trim() && description.trim() && socialProofLink.trim()

  const handleSubmit = () => {
    // Here you would normally submit to an API
    // For now, redirect to the official submission page with pre-filled data
    const params = new URLSearchParams({
      name: yourName,
      username: v0Username,
      email: email,
      location: location,
      url: projectUrl,
      category: globalCategory,
      description: description,
      social: socialProofLink,
    })
    window.open(`https://v0-v0prompttoproduction2026.vercel.app/submit?${params.toString()}`, "_blank")
  }

  const steps = [
    { number: 1, label: "Share publicly" },
    { number: 2, label: "Select categories" },
    { number: 3, label: "Submit details" },
  ]

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
                  SUBMIT
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/get-started"
                className="group flex items-center gap-2 text-[14px] text-[#737373] hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Back to Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center pt-32 pb-8 px-6">
        <div className={`max-w-[900px] mx-auto text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px] mb-6">
            MIAMI EVENT
          </p>
          <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-normal leading-[1.1] tracking-[-0.04em] text-white mb-6">
            Submit your build
          </h1>
          <p className="text-[18px] lg:text-[20px] text-[#a1a1a1] leading-[1.6] max-w-[550px] mx-auto">
            Complete all steps to be eligible for both global and local Miami prizes.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="mx-auto max-w-[800px] px-6 mb-12">
        <div className={`flex items-center justify-between transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <button
                onClick={() => {
                  if (step.number < currentStep) setCurrentStep(step.number)
                }}
                className={`flex items-center gap-3 ${step.number <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                disabled={step.number > currentStep}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-[14px] transition-all duration-300 ${
                  step.number < currentStep 
                    ? 'bg-green-500 text-white' 
                    : step.number === currentStep 
                      ? 'bg-white text-black' 
                      : 'bg-[#1a1a1a] text-[#737373] border border-[#333]'
                }`}>
                  {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span className={`hidden sm:block text-[14px] transition-colors duration-300 ${
                  step.number === currentStep ? 'text-white' : 'text-[#737373]'
                }`}>
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-[1px] mx-4 transition-colors duration-300 ${
                  step.number < currentStep ? 'bg-green-500' : 'bg-[#333]'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[800px] px-6 pb-24">
        
        {/* Step 1: Share Post Generator */}
        {currentStep === 1 && (
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-8">
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-4">
                Share your project publicly
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7]">
                You must post about your project on X or LinkedIn to be eligible for prizes. We&apos;ll help you generate a post with the right mentions and hashtags.
              </p>
            </div>

            {/* Input Form */}
            <div className="space-y-4 mb-8">
              <div>
                <label htmlFor="projectName" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                  PROJECT NAME *
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
                  LIVE URL *
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
                      <div className="flex items-center justify-between mt-4 max-w-[425px] text-[#71767b]">
                        <button className="flex items-center gap-2 hover:text-[#1d9bf0] transition-colors">
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
                  {projectUrl.trim() && (
                    <div className="mt-3 border border-[#e0e0e0] rounded-lg overflow-hidden">
                      <div className="h-[100px] bg-gradient-to-br from-[#f3f2f0] to-[#e8e7e5] flex items-center justify-center">
                        <span className="text-[#666] text-[13px]">Link preview</span>
                      </div>
                      <div className="p-3 bg-[#f9fafb]">
                        <p className="text-[12px] text-[#00000099] truncate">{projectUrl.trim()}</p>
                        <p className="text-[14px] text-[#000000e6] font-medium truncate">{projectName.trim() || "Your Project"}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e0e0e0]">
                    <button className="flex items-center gap-1.5 px-2 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-[13px] font-medium">Like</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[13px] font-medium">Comment</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                      <Repeat2 className="w-4 h-4" />
                      <span className="text-[13px] font-medium">Repost</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-2 py-2 text-[#00000099] hover:bg-[#f0f0f0] rounded transition-colors">
                      <Send className="w-4 h-4" />
                      <span className="text-[13px] font-medium">Send</span>
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
                  disabled={!projectName.trim() || !projectUrl.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Post on X
                </button>
              ) : (
                <button
                  onClick={shareOnLinkedIn}
                  disabled={!projectName.trim() || !projectUrl.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0a66c2] text-white rounded-lg font-medium hover:bg-[#004182] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Post on LinkedIn
                </button>
              )}
            </div>

            {/* Posted confirmation */}
            {hasPosted && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-green-400 text-[14px]">Great! You&apos;ve shared your post. You can continue to the next step.</span>
              </div>
            )}

            {/* Accounts mentioned */}
            <div className="mt-6 p-4 bg-[#0a0a0a] border border-[#262626] rounded-lg">
              <p className="font-mono text-[11px] text-[#737373] tracking-[1.5px] mb-3">
                ACCOUNTS MENTIONED
              </p>
              <div className="flex flex-col gap-2 text-[14px]">
                <div>
                  <span className="text-[#737373]">X:</span>{" "}
                  <a href={socialLinks.x.vercel} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@vercel</a>,{" "}
                  <a href={socialLinks.x.v0} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@v0</a>,{" "}
                  <a href="https://x.com/AgnelNieves" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@AgnelNieves</a>
                </div>
                <div>
                  <span className="text-[#737373]">LinkedIn:</span>{" "}
                  <a href={socialLinks.linkedin.vercel} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Vercel</a>,{" "}
                  <a href={socialLinks.linkedin.v0} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">v0</a>,{" "}
                  <a href="https://www.linkedin.com/in/AgnelNieves" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Agnel Nieves</a>
                </div>
              </div>
            </div>

            {/* Next button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedStep1}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Categories */}
        {currentStep === 2 && (
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-8">
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-4">
                Select your categories
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7]">
                Choose one category for the global hackathon and one for the local Miami sponsored prizes.
              </p>
            </div>

            {/* Global Category */}
            <div className="mb-10">
              <h3 className="font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-4">
                GLOBAL HACKATHON CATEGORY *
              </h3>
              <p className="text-[14px] text-[#a1a1a1] mb-4">
                This is the main v0 Prompt to Production competition category.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {globalCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setGlobalCategory(cat.id)}
                    className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                      globalCategory === cat.id
                        ? "bg-white text-black border-white"
                        : "bg-[#0a0a0a] text-white border-[#262626] hover:border-[#404040]"
                    }`}
                  >
                    <span className="text-[15px] font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Local Category */}
            <div className="mb-10">
              <h3 className="font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-4">
                MIAMI LOCAL PRIZE CATEGORY *
              </h3>
              <p className="text-[14px] text-[#a1a1a1] mb-4">
                Sponsored prizes exclusive to Miami event participants.
              </p>
              <div className="grid gap-3">
                {localCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setLocalCategory(cat.id)}
                    className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                      localCategory === cat.id
                        ? "bg-white text-black border-white"
                        : "bg-[#0a0a0a] text-white border-[#262626] hover:border-[#404040]"
                    }`}
                  >
                    <span className="text-[15px] font-medium block mb-1">{cat.label}</span>
                    <span className={`text-[13px] ${localCategory === cat.id ? "text-black/70" : "text-[#737373]"}`}>
                      {cat.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-6 py-3 text-[#737373] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedStep2}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Submit Details */}
        {currentStep === 3 && (
          <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-8">
              <h2 className="text-[28px] lg:text-[36px] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-4">
                Complete your submission
              </h2>
              <p className="text-[16px] lg:text-[18px] text-[#a1a1a1] leading-[1.7]">
                Fill in the remaining details to finalize your submission.
              </p>
            </div>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="yourName" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    id="yourName"
                    type="text"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="v0Username" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                    V0 USERNAME *
                  </label>
                  <input
                    id="v0Username"
                    type="text"
                    value={v0Username}
                    onChange={(e) => setV0Username(e.target.value)}
                    placeholder="@username"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                    EMAIL (PRIVATE) *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                    LOCATION
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Miami, FL"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectUrlFinal" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                  V0 PROJECT URL
                </label>
                <input
                  id="projectUrlFinal"
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://v0.dev/chat/..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                  SHORT DESCRIPTION * <span className="text-[#4a4a4a]">({40 - description.length} chars left)</span>
                </label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 40))}
                  maxLength={40}
                  placeholder="A brief description of your project"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="socialProofLink" className="block font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-2">
                  SOCIAL PROOF LINK *
                </label>
                <p className="text-[13px] text-[#4a4a4a] mb-2">
                  Link to your X or LinkedIn post about this project
                </p>
                <input
                  id="socialProofLink"
                  type="url"
                  value={socialProofLink}
                  onChange={(e) => setSocialProofLink(e.target.value)}
                  placeholder="https://x.com/... or https://linkedin.com/..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#404040] transition-colors"
                />
              </div>

              {/* Summary */}
              <div className="mt-8 p-5 bg-[#0a0a0a] border border-[#262626] rounded-lg">
                <h3 className="font-mono text-[12px] text-[#737373] tracking-[1.5px] mb-4">
                  SUBMISSION SUMMARY
                </h3>
                <div className="space-y-2 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-[#737373]">Project</span>
                    <span className="text-white">{projectName || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737373]">Global Category</span>
                    <span className="text-white">{globalCategories.find(c => c.id === globalCategory)?.label || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737373]">Miami Prize Category</span>
                    <span className="text-white">{localCategories.find(c => c.id === localCategory)?.label || "-"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-3 text-[#737373] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Project
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

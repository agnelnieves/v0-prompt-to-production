"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"
import { logos } from "@/lib/data"

export default function PromoPage() {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    
    // Staggered animation sequence
    const timers = [
      setTimeout(() => setStep(1), 200),   // Location
      setTimeout(() => setStep(2), 400),   // Date
      setTimeout(() => setStep(3), 800),   // "Prompt to"
      setTimeout(() => setStep(4), 1100),  // "Production"
      setTimeout(() => setStep(5), 1600),  // Logo
    ]
    
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 1:1 Container */}
      <div className="relative w-full h-full max-w-[100vh] max-h-[100vw] aspect-square bg-black overflow-hidden">
        {/* Dithering Shader Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Dithering
            colorBack="#000000"
            colorFront="#99999935"
            shape="warp"
            type="4x4"
            size={2.8}
            speed={0.3}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col justify-between p-[6%]">
          {/* Top Section - Location & Date */}
          <div className="flex flex-col gap-1">
            {/* MIAMI */}
            <div className="overflow-hidden">
              <p 
                className={`font-mono text-[clamp(14px,3.5vw,18px)] text-white tracking-[0.2em] transition-all duration-700 ease-out ${
                  step >= 1 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-full'
                }`}
              >
                MIAMI
              </p>
            </div>
            
            {/* Date */}
            <div className="overflow-hidden">
              <p 
                className={`font-mono text-[clamp(14px,3.5vw,18px)] text-white tracking-[0.15em] transition-all duration-700 ease-out ${
                  step >= 2 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-full'
                }`}
              >
                02.07.2026
              </p>
            </div>
          </div>

          {/* Center Section - Main Title */}
          <div className="flex flex-col gap-0 -mt-[5%]">
            {/* Prompt to */}
            <div className="overflow-hidden">
              <h1 
                className={`text-[clamp(48px,14vw,140px)] font-normal leading-[0.95] tracking-[-0.04em] text-white transition-all duration-1000 ease-out ${
                  step >= 3 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-full'
                }`}
              >
                Prompt to
              </h1>
            </div>
            
            {/* Production */}
            <div className="overflow-hidden">
              <h1 
                className={`text-[clamp(48px,14vw,140px)] font-normal leading-[0.95] tracking-[-0.04em] text-white transition-all duration-1000 ease-out ${
                  step >= 4 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-full'
                }`}
              >
                Production
              </h1>
            </div>
          </div>

          {/* Bottom Section - Logo */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              step >= 5 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <img 
              src={logos.v0} 
              alt="v0" 
              className="h-[clamp(32px,8vw,64px)] w-auto"
            />
          </div>
        </div>

        {/* Subtle vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
          }}
        />
      </div>
    </div>
  )
}

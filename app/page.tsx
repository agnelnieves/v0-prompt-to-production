"use client"

import React from "react"
import { Dithering } from "@paper-design/shaders-react"
import { useEffect, useRef, useState } from "react"
import { eventData, agendaItems, experienceItems, sponsors, logos, formatIndex } from "@/lib/data"

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

export default function V0MiamiEvent() {
  const [mounted, setMounted] = useState(false)
  const descriptionSection = useInView(0.3)
  const agendaSection = useInView(0.2)
  const experienceSection = useInView(0.2)
  const sponsorSection = useInView(0.2)
  const ctaSection = useInView(0.3)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-0 py-8 lg:py-[49px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[18px] group cursor-pointer">
              <img 
                src={logos.v0 || "/placeholder.svg"} 
                alt="v0" 
                className="h-[24px] w-[50px] transition-opacity duration-300 group-hover:opacity-80" 
              />
              <span className="font-mono text-[12px] text-[#737373] tracking-[2.4px] [text-shadow:0px_0px_4px_black] transition-colors duration-300 group-hover:text-white">
                IRL - MIAMI
              </span>
            </div>
            <div className="flex items-center gap-[18px]">
              <a 
                href={eventData.eventUrl}
                className="bg-white text-[#0f172a] px-6 py-3 rounded-full text-[16px] font-medium leading-[24px] transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[948px] flex flex-col items-center justify-center overflow-hidden">
        {/* Dithering Shader Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Dithering
            colorBack="#000000"
            colorFront="#99999921"
            shape="warp"
            type="4x4"
            size={2.5}
            speed={0.45}
            style={{ width: "2138px", height: "948px" }}
          />
        </div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[204px] bg-gradient-to-b from-transparent to-black pointer-events-none" />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1383px] px-6 lg:px-0 flex flex-col gap-[30px]">
          <div className="px-0 lg:px-5 overflow-hidden">
            <p className={`font-mono text-[14px] text-[#737373] tracking-[2.8px] transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {eventData.greeting}
            </p>
          </div>
          
          <h1 className="text-[60px] md:text-[100px] lg:text-[137px] font-normal leading-[1] lg:leading-[110px] tracking-[-0.04em] lg:tracking-[-5.48px] text-white overflow-hidden">
            <span className={`block transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              Prompt{' '}
            </span>
            <span className={`block transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              to Production
            </span>
          </h1>
          
          <div className={`flex gap-[44px] px-0 lg:px-5 transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col gap-4 group cursor-default">
              <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px] transition-colors duration-300 group-hover:text-[#999]">
                WHEN
              </p>
              <p className="font-mono text-[16px] text-white tracking-[-0.64px] font-extralight transition-all duration-300 group-hover:translate-x-1">
                {eventData.date}
              </p>
            </div>
            <div className="flex flex-col gap-4 group cursor-default">
              <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px] transition-colors duration-300 group-hover:text-[#999]">
                {eventData.locationLabel}
              </p>
              <p className="font-mono text-[16px] text-white tracking-[-0.64px] font-extralight transition-all duration-300 group-hover:translate-x-1">
                {eventData.venue}
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className={`absolute bottom-[40px] left-6 lg:left-[172px] px-0 lg:px-5 transition-all duration-1000 delay-1200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px] flex items-center gap-3 group cursor-pointer hover:text-[#999] transition-colors duration-300">
            <span>SCROLL TO LEARN MORE</span>
            <span className="inline-block animate-bounce">↓</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] bg-black">
        {/* Description Section */}
        <section 
          ref={descriptionSection.ref}
          className="border border-[#262626] min-h-[300px] lg:h-[402px] flex items-center justify-center px-6 lg:px-12 py-12 lg:py-0"
        >
          <p className={`text-[22px] lg:text-[30px] font-light leading-[1.5] lg:leading-[46px] tracking-[-0.225px] text-white max-w-[774px] transition-all duration-1000 ${descriptionSection.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {eventData.description}
          </p>
        </section>

        {/* Agenda Section */}
        <section 
          ref={agendaSection.ref}
          className="border border-[#262626] border-t-0 px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row gap-8 items-start justify-center"
        >
          <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] lg:self-start transition-all duration-700 ${agendaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
              AGENDA
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-auto">
            {agendaItems.map((item, index) => (
              <AgendaItem 
                key={index}
                number={formatIndex(index)} 
                title={item.title} 
                description={item.time} 
                delay={index * 100} 
                isVisible={agendaSection.isInView}
                isLast={index === agendaItems.length - 1}
              />
            ))}
          </div>
        </section>

        {/* The Experience Section */}
        <section 
          ref={experienceSection.ref}
          className="border border-[#262626] border-t-0 px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row gap-8 items-start justify-center"
        >
          <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] lg:self-start transition-all duration-700 ${experienceSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
              THE EXPERIENCE
            </p>
          </div>
          <div className="w-full lg:w-[685px] flex flex-wrap">
            {experienceItems.map((item, index) => (
              <ExperienceCard 
                key={index}
                number={formatIndex(index)} 
                title={item.title} 
                description={item.description}
                delay={index * 100}
                isVisible={experienceSection.isInView}
              />
            ))}
          </div>
        </section>

        {/* Sponsors Section */}
        <section 
          ref={sponsorSection.ref}
          className="border border-[#262626] border-t-0 px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row gap-8 items-start justify-center"
        >
          <div className={`w-full lg:w-[232px] flex items-center lg:sticky lg:top-[140px] lg:self-start transition-all duration-700 ${sponsorSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px]">
              BROUGHT TO YOU BY
            </p>
          </div>
          <div className="w-full lg:w-[685px] flex flex-wrap">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={index} delay={index * 100} isVisible={sponsorSection.isInView} url={sponsor.url}>
                {sponsor.type === "image" && sponsor.logo ? (
                  <img 
                    src={sponsor.logo || "/placeholder.svg"} 
                    alt={sponsor.name} 
                    className="w-auto max-w-[184px] transition-opacity duration-300 group-hover:opacity-80" 
                    style={{ height: sponsor.height }}
                  />
                ) : sponsor.name === "Kurzo" ? (
                  <KurzoLogo />
                ) : null}
              </SponsorCard>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section 
          ref={ctaSection.ref}
          className="border border-[#262626] border-t-0 min-h-[200px] lg:h-[245px] px-6 lg:px-[88px] py-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-[30px]"
        >
          <h2 className={`flex-1 text-[36px] lg:text-[68px] font-semibold leading-[1.1] lg:leading-[72px] tracking-[-0.04em] lg:tracking-[-2.72px] text-white text-center lg:text-left transition-all duration-1000 ${ctaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {eventData.ctaText}
          </h2>
          <div className={`transition-all duration-1000 delay-200 ${ctaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <a 
              href={eventData.eventUrl}
              className="bg-white text-[#0f172a] px-6 py-3 rounded-full text-[16px] font-medium leading-[24px] transition-all duration-300 hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Sign Up
            </a>
          </div>
        </section>
      </main>
      
      {/* Bottom padding */}
      <div className="h-[200px] bg-black" />
    </div>
  )
}

function AgendaItem({ 
  number, 
  title, 
  description,
  delay = 0,
  isVisible = true,
  isLast = false 
}: { 
  number: string
  title: string
  description: string
  delay?: number
  isVisible?: boolean
  isLast?: boolean
}) {
  return (
    <div 
      className={`w-full lg:w-[685px] flex items-center gap-[10px] py-6 border-b border-[#262626] ${isLast ? 'border-b-0' : ''} group cursor-default transition-all duration-700 hover:bg-white/[0.02] hover:pl-2`}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <span className="font-mono text-[10px] text-[#737373] tracking-[-0.4px] font-extralight transition-all duration-300 group-hover:text-white">
        {number}
      </span>
      <span className="text-[18px] lg:text-[20px] text-white leading-[28px] transition-all duration-300 group-hover:translate-x-1">
        {title}
      </span>
      <div className="flex-1 flex items-center justify-end">
        <span className="text-[12px] lg:text-[14px] text-[#737373] leading-[24px] text-right transition-all duration-300 group-hover:text-[#999]">
          {description}
        </span>
      </div>
    </div>
  )
}

function ExperienceCard({ 
  number, 
  title, 
  description,
  delay = 0,
  isVisible = true
}: { 
  number: string
  title: string
  description: string
  delay?: number
  isVisible?: boolean
}) {
  return (
    <div 
      className="w-full sm:w-[calc(50%-0.5px)] lg:w-[342px] border border-[#262626] p-6 lg:p-8 flex flex-col gap-[10px] justify-center -mr-px -mb-px group cursor-default transition-all duration-700 hover:bg-white/[0.03] hover:border-[#404040]"
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0
      }}
    >
      <p className="font-mono text-[10px] text-[#737373] tracking-[-0.4px] font-extralight transition-colors duration-300 group-hover:text-white">
        {number}
      </p>
      <h3 className="text-[20px] lg:text-[24px] text-white leading-[28px] transition-all duration-300 group-hover:translate-x-1">
        {title}
      </h3>
      <p className="text-[13px] lg:text-[14px] text-[#737373] leading-[24px] transition-colors duration-300 group-hover:text-[#999]">
        {description}
      </p>
    </div>
  )
}

function SponsorCard({ 
  children, 
  delay = 0, 
  isVisible = true,
  url
}: { 
  children: React.ReactNode
  delay?: number
  isVisible?: boolean
  url?: string
}) {
  const content = (
    <div 
      className="w-full sm:w-[calc(50%-0.5px)] lg:w-[342px] h-[140px] lg:h-[173px] border border-[#262626] p-6 lg:p-8 flex flex-col items-center justify-center -mr-px -mb-px group cursor-pointer transition-all duration-700 hover:bg-white/[0.03] hover:border-[#404040]"
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0
      }}
    >
      {children}
    </div>
  )

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="contents">
        {content}
      </a>
    )
  }

  return content
}

function KurzoLogo() {
  return (
    <svg className="transition-opacity duration-300 group-hover:opacity-80" width="173" height="53" viewBox="0 0 173 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.2773 39.3291L14.3113 39.3291L14.3113 39.3285L0.0327623 39.3285L0.0327619 34.3625L11.794 34.3625L7.77825e-07 22.5684L3.5115 19.0569L14.3113 29.8568L14.3113 13.6712L19.2773 13.6711L19.2773 39.3291Z" fill="white"/>
      <path opacity="0.5" d="M33.592 22.5684L21.798 34.3625L33.5559 34.3625L33.5559 39.3285L19.2773 39.3285L19.2773 29.8602L30.0805 19.0569L33.592 22.5684Z" fill="white"/>
      <path d="M160.33 16.3293C162.723 16.3294 164.859 17.1507 166.736 18.7931C168.659 20.4355 170.185 22.6409 171.311 25.4094C172.437 28.178 173 30.876 173 34.3485C173 37.8209 172.43 40.9376 171.303 43.7531C170.224 46.5685 168.722 48.7974 166.799 50.4398C164.875 52.0352 162.716 52.8331 160.323 52.8332C157.93 52.8332 155.771 52.0353 153.847 50.4398C151.97 48.7974 150.468 46.5685 149.342 43.7531C148.216 40.9376 147.66 37.8209 147.66 34.3485C147.66 30.876 148.223 28.178 149.35 25.4094C150.476 22.6409 152.001 20.4355 153.925 18.7931C155.849 17.1507 157.984 16.3293 160.33 16.3293ZM56.8691 0.139893C57.3852 0.139941 57.6434 0.515321 57.6434 1.26603V30.7586C57.6434 31.2278 57.8311 31.5328 58.2064 31.6736C58.6288 31.7674 59.0276 31.6032 59.403 31.1809L67.6385 22.3123C68.6239 21.233 69.0227 20.3413 68.835 19.6374C68.6942 18.8866 68.1546 18.4174 67.2162 18.2297L65.597 17.9482C64.9871 17.8074 64.682 17.5021 64.682 17.0329C64.6821 16.5637 65.0106 16.3291 65.6674 16.329H83.4077C84.1115 16.3291 84.4635 16.681 84.4635 17.3848V43.6397C84.4635 45.7982 84.8623 47.3469 85.66 48.2853C86.5047 49.1769 87.6545 49.6226 89.1091 49.6226C90.5638 49.6226 91.8543 49.2238 92.9805 48.4261C94.1067 47.5815 94.9981 46.4786 95.6551 45.1178C96.359 43.71 96.7108 42.1849 96.7109 40.5425V20.6227C96.7109 19.7781 96.5701 19.1916 96.2885 18.8632C96.0539 18.5347 95.6082 18.3467 94.9513 18.2998L93.7547 18.159C92.957 18.0652 92.5579 17.7602 92.5579 17.244C92.5579 16.634 93.004 16.329 93.8955 16.329H100.441C101.145 16.329 101.497 16.681 101.497 17.3848V44.6955C101.497 44.889 101.504 45.0858 101.516 45.2781C101.583 46.3055 102.24 47.2062 103.259 47.3518L104.737 47.5629C105.347 47.6098 105.652 47.8445 105.652 48.2668C105.652 48.6891 105.277 48.9709 104.526 49.1117C103.071 49.2994 101.898 49.6747 101.006 50.2378C100.162 50.8009 99.4111 51.402 98.7542 52.1997C98.3319 52.622 97.98 52.8331 97.6984 52.8332C97.2761 52.8332 97.0647 52.5517 97.0647 51.9886L97.0628 48.4965C97.0628 47.9372 96.2924 47.7322 95.8903 48.1343C93.8727 50.1518 91.6204 51.4892 89.1336 52.1462C86.6937 52.8032 84.3945 52.8502 82.2361 52.2871C80.0776 51.7709 78.2709 50.5978 76.8163 48.7676C75.4085 46.8905 74.7047 44.2861 74.7047 40.9545V17.3848C74.7047 16.681 74.3527 16.329 73.6489 16.329H70.0671C69.3164 16.329 68.7533 16.4932 68.3779 16.8217C68.0494 17.1032 67.5568 17.6194 66.9 18.3702L59.614 26.1835C59.2856 26.559 59.1214 26.9343 59.1214 27.3096C59.1214 27.638 59.3091 27.9666 59.6845 28.295L74.7047 43.3152V52.4107C74.7047 52.692 74.3762 52.8327 73.7193 52.8327H66.9623C66.2583 52.8327 65.9065 52.4808 65.9066 51.777V47.4925C65.9066 47.0702 65.7424 46.6714 65.4139 46.296L57.0377 37.7088C56.7561 37.3804 56.4511 37.2162 56.1226 37.2162C55.7941 37.2162 55.6299 37.4039 55.6299 37.7792V51.777C55.6299 52.4808 55.2779 52.8327 54.5741 52.8327H47.8171C47.1133 52.8327 46.7614 52.4808 46.7614 51.777V1.26603C46.7614 0.515321 47.0195 0.139942 47.5356 0.139893H56.8691ZM160.33 20.059C158.735 20.0591 157.328 20.7394 156.108 22.1003C154.935 23.4142 154.02 25.1506 153.363 27.3096C152.753 29.4217 152.448 31.6736 152.448 34.0654C152.448 36.5041 152.753 38.8029 153.363 40.9614C154.02 43.0729 154.935 44.8093 156.108 46.1702C157.328 47.4841 158.735 48.141 160.33 48.141C161.972 48.141 163.403 47.4841 164.623 46.1702C165.843 44.8093 166.758 43.0729 167.368 40.9614C168.025 38.8029 168.353 36.5041 168.353 34.0654C168.353 31.6736 168.025 29.4217 167.368 27.3096C166.758 25.1506 165.843 23.4142 164.623 22.1003C163.403 20.7394 161.972 20.059 160.33 20.059ZM128.493 16.3293C130.136 16.3294 131.59 16.681 132.857 17.3848C134.17 18.0417 135.226 18.9334 136.024 20.0593L136.024 17.3848C136.024 16.681 136.376 16.329 137.08 16.3291H143.837C144.541 16.3291 144.892 16.681 144.892 17.3848V51.777C144.892 52.4808 144.541 52.8327 143.837 52.8327H137.08C136.376 52.8327 136.024 52.4808 136.024 51.777L136.024 49.2432C135.226 50.3222 134.17 51.1901 132.857 51.847C131.59 52.5039 130.136 52.8324 128.493 52.8324C126.053 52.8324 123.847 52.0814 121.876 50.5795C119.952 49.0307 118.427 46.8722 117.301 44.1036C116.175 41.335 115.612 38.2651 115.612 34.8866C115.612 31.461 116.175 28.3678 117.301 25.5992C118.427 22.7837 119.952 20.5783 121.876 18.9827C123.847 17.3403 126.053 16.5189 128.493 16.3293ZM129.83 20.059C128.235 20.0591 126.827 20.7394 125.607 22.1003C124.434 23.4612 123.519 25.221 122.862 27.3795C122.252 29.4916 121.947 31.7435 121.947 34.1353C121.947 36.5271 122.252 38.7556 122.862 40.8208C123.519 42.8859 124.434 44.5989 125.607 45.9598C126.827 47.2737 128.235 47.9306 129.83 47.9306C131.472 47.9306 132.903 47.2737 134.123 45.9598C135.343 44.5989 136.258 42.8859 136.868 40.8208C137.525 38.7556 137.854 36.5271 137.854 34.1353C137.854 31.7435 137.525 29.4916 136.868 27.3795C136.258 25.221 135.343 23.4612 134.123 22.1003C132.903 20.7394 131.472 20.0591 129.83 20.059Z" fill="white"/>
    </svg>
  )
}

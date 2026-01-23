"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useEffect, useRef, useState } from "react"

// Sponsor logo assets from Figma
const imgVercelLogo = "https://www.figma.com/api/mcp/asset/03fcb194-e137-475f-b753-8767813e6f36"
const imgUkgLogo = "https://www.figma.com/api/mcp/asset/ecfdbe1a-2b10-403d-ae99-b1ba6c527d58"
const imgLabMiamiLogo = "https://www.figma.com/api/mcp/asset/083eed93-2034-4277-be17-99ce10e5b91a"
const imgV0Logo = "https://www.figma.com/api/mcp/asset/75f0e408-445a-483e-9c04-012ff5cb1937"

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
                src={imgV0Logo} 
                alt="v0" 
                className="h-[24px] w-[50px] transition-opacity duration-300 group-hover:opacity-80" 
              />
              <span className="font-mono text-[12px] text-[#737373] tracking-[2.4px] [text-shadow:0px_0px_4px_black] transition-colors duration-300 group-hover:text-white">
                IRL - MIAMI
              </span>
            </div>
            <div className="flex items-center gap-[18px]">
              <a 
                href="#"
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
              HELLO MIAMI! YOU&apos;RE INVITED
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
                FEBRUARY 7, 2026
              </p>
            </div>
            <div className="flex flex-col gap-4 group cursor-default">
              <p className="font-mono text-[14px] text-[#737373] tracking-[2.8px] transition-colors duration-300 group-hover:text-[#999]">
                WHERE
              </p>
              <p className="font-mono text-[16px] text-white tracking-[-0.64px] font-extralight transition-all duration-300 group-hover:translate-x-1">
                THE DOCK, WYNWOOD
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
            v0 is getting ready to launch its biggest product update yet. We&apos;re celebrating with v0 IRLs around the world. And Miami is one of them. You&apos;re invited. Real apps, real work.
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
            <AgendaItem number="01" title="Opening" description="For every builder at your event" delay={0} isVisible={agendaSection.isInView} />
            <AgendaItem number="02" title="Opening" description="For every builder at your event" delay={100} isVisible={agendaSection.isInView} />
            <AgendaItem number="03" title="Networking" description="Connecting with industry leaders and peers" delay={200} isVisible={agendaSection.isInView} />
            <AgendaItem number="04" title="Workshops" description="Hands-on sessions to enhance skills" delay={300} isVisible={agendaSection.isInView} />
            <AgendaItem number="05" title="Closing" description="Summarizing insights and next steps" delay={400} isVisible={agendaSection.isInView} isLast />
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
            <ExperienceCard 
              number="01" 
              title="Global Gallery" 
              description="Every project showcased in a worldwide exhibition"
              delay={0}
              isVisible={experienceSection.isInView}
            />
            <ExperienceCard 
              number="02" 
              title="Community Voting" 
              description="Builders vote for favorites, winners get prizes."
              delay={100}
              isVisible={experienceSection.isInView}
            />
            <ExperienceCard 
              number="03" 
              title="Live DJ" 
              description="PARINI will set the vibes with science-backed music to ship your best idea."
              delay={200}
              isVisible={experienceSection.isInView}
            />
            <ExperienceCard 
              number="04" 
              title="Local Prizes" 
              description="Thanks to the sponsors for this local event, we're able to provide prizes."
              delay={300}
              isVisible={experienceSection.isInView}
            />
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
            <SponsorCard delay={0} isVisible={sponsorSection.isInView}>
              <img src={imgVercelLogo} alt="Vercel" className="h-[37px] w-auto max-w-[184px] transition-opacity duration-300 group-hover:opacity-80" />
            </SponsorCard>
            <SponsorCard delay={100} isVisible={sponsorSection.isInView}>
              <svg className="transition-opacity duration-300 group-hover:opacity-80" width="173" height="53" viewBox="0 0 173 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2773 39.3291L14.3113 39.3291L14.3113 39.3285L0.0327623 39.3285L0.0327619 34.3625L11.794 34.3625L7.77825e-07 22.5684L3.5115 19.0569L14.3113 29.8568L14.3113 13.6712L19.2773 13.6711L19.2773 39.3291Z" fill="white"/>
                <path opacity="0.5" d="M33.592 22.5684L21.798 34.3625L33.5559 34.3625L33.5559 39.3285L19.2773 39.3285L19.2773 29.8602L30.0805 19.0569L33.592 22.5684Z" fill="white"/>
                <path d="M160.33 16.3293C162.723 16.3294 164.859 17.1507 166.736 18.7931C168.659 20.4355 170.185 22.6409 171.311 25.4094C172.437 28.178 173 30.876 173 34.3485C173 37.8209 172.43 40.9376 171.303 43.7531C170.224 46.5685 168.722 48.7974 166.799 50.4398C164.875 52.0352 162.716 52.8331 160.323 52.8332C157.93 52.8332 155.771 52.0353 153.847 50.4398C151.97 48.7974 150.468 46.5685 149.342 43.7531C148.216 40.9376 147.66 37.8209 147.66 34.3485C147.66 30.876 148.223 28.178 149.35 25.4094C150.476 22.6409 152.001 20.4355 153.925 18.7931C155.849 17.1507 157.984 16.3293 160.33 16.3293ZM56.8691 0.139893C57.3852 0.139941 57.6434 0.515321 57.6434 1.26603V30.7586C57.6434 31.2278 57.8311 31.5328 58.2064 31.6736C58.6288 31.7674 59.0276 31.6032 59.403 31.1809L67.6385 22.3123C68.6239 21.233 69.0227 20.3413 68.835 19.6374C68.6942 18.8866 68.1546 18.4174 67.2162 18.2297L65.597 17.9482C64.9871 17.8074 64.682 17.5021 64.682 17.0329C64.6821 16.5637 65.0106 16.3291 65.6674 16.329H83.4077C84.1115 16.3291 84.4635 16.681 84.4635 17.3848V43.6397C84.4635 45.7982 84.8623 47.3469 85.66 48.2853C86.5047 49.1769 87.6545 49.6226 89.1091 49.6226C90.5638 49.6226 91.8543 49.2238 92.9805 48.4261C94.1067 47.5815 94.9981 46.4786 95.6551 45.1178C96.359 43.71 96.7108 42.1849 96.7109 40.5425V20.6227C96.7109 19.7781 96.5701 19.1916 96.2885 18.8632C96.0539 18.5347 95.6082 18.3467 94.9513 18.2998L93.7547 18.159C92.957 18.0652 92.5579 17.7602 92.5579 17.244C92.5579 16.634 93.004 16.329 93.8955 16.329H100.441C101.145 16.329 101.497 16.681 101.497 17.3848V44.6955C101.497 44.889 101.504 45.0858 101.516 45.2781C101.583 46.3055 102.24 47.2062 103.259 47.3518L104.737 47.5629C105.347 47.6098 105.652 47.8445 105.652 48.2668C105.652 48.6891 105.277 48.9709 104.526 49.1117C103.071 49.2994 101.898 49.6747 101.006 50.2378C100.162 50.8009 99.4111 51.402 98.7542 52.1997C98.3319 52.622 97.98 52.8331 97.6984 52.8332C97.2761 52.8332 97.0647 52.5517 97.0647 51.9886L97.0628 48.4965C97.0628 47.9372 96.2924 47.7322 95.8903 48.1209C95.8823 48.1287 95.8743 48.1365 95.8662 48.1446C94.13 49.8808 92.5814 51.1007 91.2206 51.8045C89.9067 52.5084 88.4285 52.8603 86.7861 52.8603C85.6131 52.8603 84.487 52.6022 83.4077 52.0861C82.3285 51.5699 81.4367 50.7488 80.7329 49.6226C80.029 48.4964 79.6771 46.9948 79.6771 45.1178V20.6227C79.6771 19.7782 79.5363 19.1917 79.2548 18.8632C79.0202 18.5347 78.5742 18.3467 77.9172 18.2998L76.7207 18.159C76.5804 18.1425 76.4379 18.1411 76.3012 18.1763C75.5252 18.3764 74.7492 18.7457 73.9733 19.2855C72.894 19.9893 71.6035 21.1157 70.1019 22.6642L65.7378 27.3098C64.7525 28.389 64.5179 29.4448 65.034 30.4771L72.1479 44.1456C73.5209 46.7838 74.6224 50.4606 77.5327 51.0733L78.2365 51.214C78.7996 51.3548 79.0811 51.6366 79.0811 52.0589C79.0811 52.575 78.7526 52.8332 78.0958 52.8332H66.4724C65.8155 52.8332 65.4868 52.575 65.4867 52.0589C65.4867 51.5897 65.792 51.3079 66.402 51.214L67.5985 51.0733C69.3816 50.8386 69.757 49.6891 68.7247 47.6245L61.7259 33.9966C61.4913 33.5273 61.1391 33.2693 60.6699 33.2223C60.2476 33.1755 59.8487 33.3397 59.4733 33.715L58.6991 34.4892C58.2768 34.9115 57.9953 35.3338 57.8545 35.7561C57.7137 36.1785 57.6434 36.6479 57.6434 37.1641L57.6481 47.4931C57.6481 48.4785 57.7888 49.8063 58.0704 50.2287C58.3988 50.651 59.0557 50.909 60.0411 51.0029L61.9418 51.214C62.4579 51.3079 62.716 51.5717 62.716 52.041C62.7159 52.557 62.4344 52.8331 61.8714 52.8332H49.5533C48.9903 52.8331 48.7088 52.575 48.7087 52.0589C48.7087 51.5897 48.9668 51.3079 49.483 51.214L50.4683 51.0733C51.4538 50.9325 52.0874 50.651 52.369 50.2287C52.6974 49.8063 52.8617 48.4785 52.8617 47.4931L52.857 7.17856C52.857 7.08853 52.8554 7.00171 52.8522 6.91808C52.8135 5.90729 52.0984 4.99895 51.0971 4.8559L49.619 4.64475C49.1029 4.5509 48.8448 4.26934 48.8448 3.80015C48.8448 3.33092 49.1029 3.04941 49.619 2.95554C50.9329 2.67399 52.0358 2.34527 52.9274 1.96987C53.8189 1.59448 54.5696 1.21911 55.1796 0.843729C55.9304 0.374476 56.4937 0.139893 56.8691 0.139893ZM126.91 16.3287C126.424 15.4579 127.595 14.1221 128.859 14.532C129.476 14.7319 129.751 15.408 130.166 15.9061C130.448 16.1877 131.034 16.3287 131.926 16.3287H146.003C146.707 16.3287 147.059 16.6337 147.059 17.2437C147.059 17.7371 146.777 18.1868 146.555 18.6273C146.495 18.7458 146.429 18.8711 146.355 19.0033L130.659 49.5952C130.354 50.2037 130.715 50.9725 131.395 51.0007C131.43 51.0021 131.466 51.0029 131.503 51.0029H134.671C137.439 51.0029 139.387 50.6275 140.513 49.8767C141.122 49.4455 141.669 48.8772 142.154 48.1717C143.047 46.8735 143.362 45.2849 143.566 43.7224L143.74 42.3935C143.867 41.4215 144.007 40.0122 144.987 40.0121C146.084 40.0121 145.736 41.7668 145.942 42.8437C146.674 46.6591 148.157 48.6873 149.547 50.9441C149.801 51.3552 149.982 51.8656 149.715 52.268C149.465 52.6447 149.058 52.8332 148.493 52.8332H125.45C124.746 52.8331 124.394 52.5281 124.394 51.9182C124.394 51.7305 124.465 51.4958 124.605 51.2143C124.746 50.9328 124.91 50.5806 125.098 50.1583L140.865 19.5664C141.1 19.191 141.123 18.8626 140.935 18.581C140.795 18.2995 140.49 18.1587 140.02 18.1587H137.064C134.765 18.1587 133.052 18.5576 131.926 19.3552C130.847 20.153 129.955 21.3027 129.251 22.8043L127.703 25.4183C127.421 26.0283 127.069 26.3333 126.647 26.3333C125.632 26.3332 126.22 24.8359 126.629 23.9077C128.372 19.9488 127.442 17.2812 126.91 16.3287ZM120.849 14.532C122.398 14.532 123.547 15.0012 124.298 15.9396C125.049 16.8312 125.424 17.8402 125.424 18.9664C125.424 19.858 125.19 20.5852 124.72 21.1483C124.298 21.7114 123.618 21.9932 122.679 21.9932C121.929 21.9932 121.365 21.8287 120.99 21.5003C120.661 21.1249 120.38 20.7025 120.145 20.2334C119.958 19.7641 119.723 19.3653 119.441 19.0368C119.16 18.6614 118.691 18.4738 118.034 18.4738C117.189 18.4738 116.391 18.9898 115.64 20.0222C114.89 21.0076 114.256 22.3451 113.74 24.0344C113.271 25.7237 113.036 27.6476 113.036 29.8061V48.1172C113.036 49.1026 113.177 49.8066 113.458 50.229C113.787 50.6513 114.444 50.9093 115.429 51.0032L117.33 51.2143C117.846 51.3082 118.104 51.5663 118.104 51.9886C118.104 52.5516 117.752 52.8331 117.048 52.8332H105.153C104.449 52.8331 104.097 52.5751 104.097 52.0589C104.097 51.6367 104.402 51.3551 105.012 51.2143L105.856 51.0736C106.842 50.8859 107.476 50.6044 107.757 50.229C108.086 49.8066 108.25 49.1026 108.25 48.1172V22.4859C108.25 22.3958 108.248 22.3089 108.245 22.2251C108.206 21.2144 107.491 20.306 106.49 20.163L105.012 19.9518C104.402 19.9049 104.097 19.6468 104.097 19.1776C104.097 18.8022 104.472 18.5442 105.223 18.4034C106.678 18.1688 107.781 17.7934 108.531 17.2772C109.329 16.7611 110.15 16.1274 110.995 15.3766C111.417 14.9542 111.769 14.7431 112.051 14.7431C112.473 14.7432 112.684 15.0247 112.684 15.5877V19.3887C112.684 19.9363 113.467 20.0818 113.776 19.6297C113.812 19.5779 113.846 19.521 113.881 19.4591C115.805 16.1744 118.127 14.532 120.849 14.532ZM160.33 18.0889C155.45 18.0889 153.01 23.2272 153.01 34.3485C153.01 45.5167 155.443 51.0733 160.323 51.0733C165.203 51.0732 167.651 45.5166 167.651 34.3485C167.651 23.2273 165.21 18.089 160.33 18.0889Z" fill="white"/>
              </svg>
            </SponsorCard>
            <SponsorCard delay={200} isVisible={sponsorSection.isInView}>
              <img src={imgUkgLogo} alt="UKG" className="h-[47px] w-auto max-w-[153px] transition-opacity duration-300 group-hover:opacity-80" />
            </SponsorCard>
            <SponsorCard delay={300} isVisible={sponsorSection.isInView}>
              <img src={imgLabMiamiLogo} alt="The Lab Miami" className="h-[93px] w-auto max-w-[177px] object-contain transition-opacity duration-300 group-hover:opacity-80" />
            </SponsorCard>
          </div>
        </section>

        {/* CTA Footer */}
        <section 
          ref={ctaSection.ref}
          className="border border-[#262626] border-t-0 min-h-[200px] lg:h-[245px] px-6 lg:px-[88px] py-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-[30px]"
        >
          <h2 className={`flex-1 text-[36px] lg:text-[68px] font-semibold leading-[1.1] lg:leading-[72px] tracking-[-0.04em] lg:tracking-[-2.72px] text-white text-center lg:text-left transition-all duration-1000 ${ctaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            It&apos;s time to ship.
          </h2>
          <div className={`transition-all duration-1000 delay-200 ${ctaSection.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <a 
              href="#"
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
  isVisible = true 
}: { 
  children: React.ReactNode
  delay?: number
  isVisible?: boolean
}) {
  return (
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
}

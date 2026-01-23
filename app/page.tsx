import Image from "next/image"

export default function V0MiamiEvent() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 30H12L16 22L20 30H30L16 2Z" fill="white"/>
          </svg>
          <span className="text-[#737373] text-sm tracking-wider">IRL - MIAMI</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#ffffff] text-[#000000] px-4 py-2 rounded-full text-sm font-medium">
            Sign Up
          </button>
          <button className="border border-[#737373] text-[#ffffff] px-4 py-2 rounded-full text-sm font-medium">
            View on Luma
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-32 overflow-hidden">
        {/* Abstract wave background */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/hero-waves.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10">
          <p className="text-[#737373] text-xs tracking-[0.2em] uppercase mb-4">
            Hello Miami! You're invited
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-12">
            Prompt<br />to Production
          </h1>
          
          <div className="flex gap-16 mt-8">
            <div>
              <p className="text-[#737373] text-xs tracking-[0.15em] uppercase mb-1">When</p>
              <p className="text-sm">FEBRUARY 7, 2026</p>
            </div>
            <div>
              <p className="text-[#737373] text-xs tracking-[0.15em] uppercase mb-1">Where</p>
              <p className="text-sm">THE DOCK, WYNWOOD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="px-6 py-8">
        <p className="text-[#737373] text-xs tracking-[0.2em] uppercase">
          Scroll to learn more
        </p>
      </div>

      {/* Description Card */}
      <section className="px-6 pb-12">
        <div className="border border-[#262626] rounded-lg p-8 md:p-12">
          <p className="text-[#e5e5e5] text-lg md:text-xl leading-relaxed max-w-xl">
            v0 is getting ready to launch its biggest product update yet. We're celebrating with v0 IRLs around the world. And Miami is one of them. You're invited. Real apps, real work.
          </p>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="px-6 py-12">
        <div className="border border-[#262626] rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-48">
              <p className="text-[#737373] text-xs tracking-[0.2em] uppercase">Agenda</p>
            </div>
            <div className="flex-1 space-y-0">
              <AgendaItem time="01" title="Opening" description="For every builder at your event" />
              <AgendaItem time="02" title="Opening" description="For every builder at your event" />
              <AgendaItem time="03" title="Networking" description="Connecting with industry leaders and peers" />
              <AgendaItem time="04" title="Workshops" description="Hands-on sessions to enhance skills" />
              <AgendaItem time="05" title="Closing" description="Summarizing insights and next steps" isLast />
            </div>
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="px-6 py-12">
        <div className="border border-[#262626] rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-48">
              <p className="text-[#737373] text-xs tracking-[0.2em] uppercase">The Experience</p>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ExperienceCard 
                  number="01" 
                  title="Global Gallery" 
                  description="Every project showcased in a worldwide exhibition."
                />
                <ExperienceCard 
                  number="02" 
                  title="Community Voting" 
                  description="Builders vote for favorites, winners get prizes."
                />
                <ExperienceCard 
                  number="03" 
                  title="Live DJ" 
                  description="MIAMI will set the vibes with science-backed music to ship your best idea."
                />
                <ExperienceCard 
                  number="04" 
                  title="Local Prizes" 
                  description="Thanks to the sponsors for this local event, we're able to provide prizes."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="px-6 py-12">
        <div className="border border-[#262626] rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-48">
              <p className="text-[#737373] text-xs tracking-[0.2em] uppercase">Brought to you by</p>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                <SponsorCard name="Vercel" logo="vercel" />
                <SponsorCard name="kurzo" logo="kurzo" />
                <SponsorCard name="Gail" logo="gail" />
                <SponsorCard name="UKG" logo="ukg" />
                <SponsorCard name="The Lab Miami" logo="thelab" className="col-span-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 py-12">
        <div className="border border-[#262626] rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-bold">It's time to ship.</h2>
            <div className="flex items-center gap-3">
              <button className="bg-[#ffffff] text-[#000000] px-4 py-2 rounded-full text-sm font-medium">
                Sign Up
              </button>
              <button className="text-[#ffffff] px-4 py-2 text-sm font-medium underline underline-offset-4">
                View on Luma
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </div>
  )
}

function AgendaItem({ 
  time, 
  title, 
  description, 
  isLast = false 
}: { 
  time: string
  title: string
  description: string
  isLast?: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-4 ${!isLast ? 'border-b border-[#262626]' : ''}`}>
      <div className="flex items-center gap-4">
        <span className="text-[#737373] text-xs">{time}</span>
        <span className="font-medium">{title}</span>
      </div>
      <span className="text-[#737373] text-xs text-right hidden sm:block">{description}</span>
    </div>
  )
}

function ExperienceCard({ 
  number, 
  title, 
  description 
}: { 
  number: string
  title: string
  description: string
}) {
  return (
    <div className="bg-[#282828] rounded-lg p-6">
      <p className="text-[#737373] text-xs mb-2">{number}</p>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-[#737373] text-sm">{description}</p>
    </div>
  )
}

function SponsorCard({ 
  name, 
  logo, 
  className = "" 
}: { 
  name: string
  logo: string
  className?: string
}) {
  const renderLogo = () => {
    switch (logo) {
      case 'vercel':
        return (
          <div className="flex items-center gap-2">
            <svg width="20" height="18" viewBox="0 0 76 65" fill="white">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <span className="font-semibold text-lg">Vercel</span>
          </div>
        )
      case 'kurzo':
        return (
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
            <span className="font-semibold text-lg">kurzo</span>
          </div>
        )
      case 'gail':
        return (
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <circle cx="8" cy="12" r="6" fill="none" stroke="white" strokeWidth="2" />
              <path d="M14 12C14 8.68629 16.6863 6 20 6" stroke="white" strokeWidth="2" fill="none" />
            </svg>
            <span className="font-semibold text-lg">Gail</span>
          </div>
        )
      case 'ukg':
        return (
          <span className="font-bold text-xl tracking-tight">UKG</span>
        )
      case 'thelab':
        return (
          <div className="flex flex-col items-center">
            <div className="flex gap-1 mb-1">
              <div className="w-6 h-6 border border-white rounded-sm" />
              <div className="w-6 h-6 border border-white rounded-sm flex items-center justify-center">
                <span className="text-xs">▲</span>
              </div>
              <div className="w-6 h-6 border border-white rounded-sm grid grid-cols-2 gap-0.5 p-1">
                <div className="bg-white" />
                <div className="bg-white" />
              </div>
            </div>
            <span className="text-[10px] tracking-[0.15em]">THE LAB MIAMI</span>
          </div>
        )
      default:
        return <span className="font-semibold">{name}</span>
    }
  }

  return (
    <div className={`bg-[#282828] rounded-lg p-6 flex items-center justify-center min-h-[80px] ${className}`}>
      {renderLogo()}
    </div>
  )
}

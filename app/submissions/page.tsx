import { neon } from "@neondatabase/serverless"
import { ExternalLink, Github, Globe, Video, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submissions - v0 IRL Miami",
  description:
    "Browse all projects built at v0 Prompt to Production Miami. Real apps, real work, shipped live.",
}

export const dynamic = "force-dynamic"

interface Submission {
  id: number
  project_name: string
  live_url: string
  v0_project_url: string
  github_repo_url: string | null
  global_categories: string[]
  local_categories: string[]
  your_name: string
  v0_username: string
  description: string
  social_proof_link: string | null
  video_url: string | null
  created_at: string
}

async function getSubmissions(): Promise<Submission[]> {
  const sql = neon(process.env.DATABASE_URL!)
  const rows = await sql`
    SELECT
      id,
      project_name,
      live_url,
      v0_project_url,
      github_repo_url,
      global_categories,
      local_categories,
      your_name,
      v0_username,
      description,
      social_proof_link,
      video_url,
      created_at
    FROM submissions
    ORDER BY created_at DESC
  `
  return rows as Submission[]
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="mx-auto max-w-[1400px] px-6 lg:px-16 pt-12 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] text-[#737373] hover:text-white transition-colors duration-300 mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-mono tracking-[1.5px]">BACK</span>
        </Link>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[12px] text-[#525252] tracking-[2.4px]">
            V0 IRL MIAMI
          </p>
          <h1 className="text-[36px] md:text-[52px] lg:text-[68px] font-normal leading-[1.05] tracking-[-0.04em] text-white text-balance">
            What people built
          </h1>
          <p className="text-[16px] lg:text-[18px] text-[#737373] leading-relaxed max-w-[600px]">
            {submissions.length} project{submissions.length !== 1 ? "s" : ""}{" "}
            shipped at Prompt to Production Miami. Real apps, real work.
          </p>
        </div>
      </header>

      {/* Submissions Grid */}
      <main className="mx-auto max-w-[1400px] px-6 lg:px-16 py-12 lg:py-16">
        {submissions.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#525252] text-[16px]">
              No submissions yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#262626] border border-[#262626]">
            {submissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
            {/* Fill remaining grid cells for visual consistency */}
            {submissions.length % 3 !== 0 &&
              Array.from({ length: 3 - (submissions.length % 3) }).map(
                (_, i) => (
                  <div key={`filler-${i}`} className="bg-black" />
                )
              )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-[1400px] px-6 lg:px-16 py-12 border-t border-[#262626]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[12px] text-[#525252] tracking-[1.5px]">
            V0 PROMPT TO PRODUCTION - MIAMI 2026
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f172a] rounded-full text-[14px] font-medium transition-all duration-300 hover:bg-[#e5e5e5] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Submit yours
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </footer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Submission Card                                                     */
/* ------------------------------------------------------------------ */

function SubmissionCard({ submission }: { submission: Submission }) {
  const allCategories = [
    ...(submission.global_categories ?? []),
    ...(submission.local_categories ?? []),
  ]

  return (
    <div className="bg-black p-6 lg:p-8 flex flex-col gap-5 group transition-colors duration-300 hover:bg-[#0a0a0a]">
      {/* Project name + builder */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[18px] lg:text-[20px] font-medium leading-[1.3] text-white transition-all duration-300 group-hover:translate-x-0.5 text-balance">
          {submission.project_name}
        </h2>
        <p className="text-[13px] text-[#737373]">
          by{" "}
          <span className="text-[#a3a3a3]">{submission.your_name}</span>
          {submission.v0_username && (
            <span className="text-[#525252]">
              {" "}
              &middot; @{submission.v0_username}
            </span>
          )}
        </p>
      </div>

      {/* Description */}
      {submission.description && (
        <p className="text-[14px] text-[#737373] leading-relaxed">
          {submission.description}
        </p>
      )}

      {/* Categories */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {allCategories.map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-1 bg-[#141414] border border-[#262626] rounded-full text-[11px] font-mono text-[#737373] tracking-wide"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
        {submission.live_url && (
          <a
            href={submission.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#a3a3a3] hover:text-white transition-colors duration-200"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live</span>
          </a>
        )}
        {submission.v0_project_url && (
          <a
            href={submission.v0_project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#a3a3a3] hover:text-white transition-colors duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>v0</span>
          </a>
        )}
        {submission.github_repo_url && (
          <a
            href={submission.github_repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#a3a3a3] hover:text-white transition-colors duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
        {submission.video_url && (
          <a
            href={submission.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#a3a3a3] hover:text-white transition-colors duration-200"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video</span>
          </a>
        )}
        {submission.social_proof_link && (
          <a
            href={submission.social_proof_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#a3a3a3] hover:text-white transition-colors duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Post</span>
          </a>
        )}
      </div>
    </div>
  )
}

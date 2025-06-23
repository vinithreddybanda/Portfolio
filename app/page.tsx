"use client"

import { motion, AnimatePresence } from "framer-motion"
<<<<<<< HEAD
import { Github, Linkedin, Mail, Twitter, Download, RefreshCw, ChevronDown, X } from "lucide-react"
=======
import { Github, Linkedin, Mail, Twitter, Download, RefreshCw, Play, Pause, Music } from "lucide-react"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
<<<<<<< HEAD
  transition: { duration: 0.4 },
}

const slideUp = {
  initial: { opacity: 0, y: 30 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.6, ease: "easeInOut" },
}

const slideDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeInOut" },
=======
  transition: { duration: 0.5 },
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
}

type Page = "home" | "about" | "now" | "featured"

interface GitHubRepo {
  name: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  pushed_at: string
  topics: string[]
  html_url: string
  private: boolean
}

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalCommits: number
}

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalCommits: 0,
  })
  const [loading, setLoading] = useState(false)
<<<<<<< HEAD
  const [currentRepoPage, setCurrentRepoPage] = useState(0)
  const [showEmailTooltip, setShowEmailTooltip] = useState(false)
  const [showInsightModal, setShowInsightModal] = useState(false)
  const [insightLoading, setInsightLoading] = useState(false)
=======
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [trackProgress, setTrackProgress] = useState(0)
  const [spotifyLoading, setSpotifyLoading] = useState(false)
  const [showEmailTooltip, setShowEmailTooltip] = useState(false)
  const [spotifyExpanded, setSpotifyExpanded] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number>(0)
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72

  const REPOS_PER_PAGE = 4

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch("/api/github-repos")
      if (!response.ok) throw new Error("Failed to fetch repos")
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching GitHub repos:", error)
      return []
    }
  }

  const calculateGitHubStats = (repos: GitHubRepo[]): GitHubStats => {
    return {
      totalRepos: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      totalCommits: 150,
    }
  }

  const loadRepos = async () => {
    try {
      const repoData = await fetchGitHubRepos()
      setRepos(repoData)
<<<<<<< HEAD
      setGithubStats(calculateGitHubStats(repoData))
      setCurrentRepoPage(0)
    } catch (error) {
      console.error("Failed to fetch repos:", error)
    }
  }

  useEffect(() => {
    loadRepos()
  }, [])
=======
      setScrollPosition(0)
    } catch (error) {
      console.error("Failed to fetch repos:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadSpotifyData = async () => {
    setSpotifyLoading(true)
    setSpotifyExpanded(false)

    setTimeout(async () => {
      try {
        const data = await fetchSpotifyData()
        if (data) {
          setCurrentTrack(data)
          if (data.is_playing && data.progress_ms) {
            setTrackProgress(data.progress_ms)
          }
        }
      } catch (error) {
        console.error("Failed to load Spotify data:", error)
      } finally {
        setSpotifyLoading(false)
        setTimeout(() => {
          setSpotifyExpanded(true)
        }, 200)
      }
    }, 300)
  }

  useEffect(() => {
    if (currentPage === "featured") {
      loadRepos()
    }
    if (currentPage === "now") {
      setSpotifyExpanded(true)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentTrack?.is_playing && currentTrack.progress_ms !== undefined) {
      const interval = setInterval(() => {
        setTrackProgress((prev) => {
          const newProgress = prev + 1000
          return newProgress >= currentTrack.duration_ms ? currentTrack.duration_ms : newProgress
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentTrack])

  const handleScroll = (e: React.WheelEvent) => {
    if (currentPage !== "featured" || repos.length === 0) return

    e.preventDefault()
    const delta = e.deltaY > 0 ? 1 : -1
    const maxScroll = Math.max(0, repos.length - REPOS_PER_PAGE)
    const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + delta))

    if (newPosition !== scrollPosition) {
      setScrollPosition(newPosition)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (currentPage !== "featured" || repos.length === 0) return

    const touchY = e.touches[0].clientY
    const deltaY = touchStartY.current - touchY

    if (Math.abs(deltaY) > 80) {
      const delta = deltaY > 0 ? 1 : -1
      const maxScroll = Math.max(0, repos.length - REPOS_PER_PAGE)
      const newPosition = Math.max(0, Math.min(maxScroll, scrollPosition + delta))

      if (newPosition !== scrollPosition) {
        setScrollPosition(newPosition)
        touchStartY.current = touchY
      }
    }
  }
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72

  const navigateToPage = (page: Page) => {
    setCurrentPage(page)
    if (page === "featured") {
<<<<<<< HEAD
      setCurrentRepoPage(0)
=======
      setScrollPosition(0)
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
    }
  }

  const navigateToRepo = (index: number) => {
    const maxScroll = Math.max(0, repos.length - REPOS_PER_PAGE)
    const newPosition = Math.max(0, Math.min(maxScroll, index))
    setScrollPosition(newPosition)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return `${Math.floor(diffInHours / (24 * 7))}w ago`
    }
  }

  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Vinith_Reddy_Banda_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

<<<<<<< HEAD
  const handleEmailClick = () => {
    window.location.href = "mailto:vinithreddybanda@gmail.com"
  }

  const skills = [
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "Node.js",
    "Kotlin",
    "HTML",
    "CSS",
    "Git",
    "MongoDB",
    "React",
    "Express",
    "Android",
    "Linux",
    "Docker",
    "AWS",
    "Firebase",
    "MySQL",
    "PostgreSQL",
  ]

  const renderNavigation = () => (
    <nav className="w-full bg-[#1a1a1a] py-2 fixed top-0 z-50">
      <div className="max-w-sm mx-auto px-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateToPage("home")}
            className="w-8 h-8 rounded-full overflow-hidden border border-[#d4af37] hover:scale-105 transition-transform"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZPnd6EFRVmibtwsl3BlAjEJe3V78Fu.png"
              alt="VRB"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </button>
=======
  const renderNavigation = () => (
    <nav className="w-full bg-[#242424] py-2 border-b border-[#3a3a3a] fixed top-0 z-50">
      <div className="max-w-sm mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image src="/avatar.jpeg" alt="VRB" width={32} height={32} className="w-full h-full object-cover" />
          </div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72

          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigateToPage("home")}
              className={`retro-button-3d poppins font-medium text-xs px-2 py-1 ${
                currentPage === "home" ? "retro-button-active" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateToPage("about")}
              className={`retro-button-3d poppins font-medium text-xs px-2 py-1 ${
                currentPage === "about" ? "retro-button-active" : ""
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateToPage("now")}
              className={`retro-button-3d poppins font-medium text-xs px-2 py-1 ${
                currentPage === "now" ? "retro-button-active" : ""
              }`}
            >
              Now
            </button>
            <button
              onClick={() => navigateToPage("featured")}
              className={`retro-button-3d poppins font-medium text-xs px-2 py-1 ${
                currentPage === "featured" ? "retro-button-active" : ""
              }`}
            >
              Work
            </button>
          </div>

          <div className="relative">
            <button
<<<<<<< HEAD
              onClick={handleEmailClick}
              onMouseEnter={() => setShowEmailTooltip(true)}
              onMouseLeave={() => setShowEmailTooltip(false)}
              className="text-[#ffffff] hover:text-[#d4af37] transition-colors retro-button-3d w-6 h-6 flex items-center justify-center"
            >
              <Mail className="h-3 w-3" />
            </button>
            {showEmailTooltip && (
              <div className="absolute right-0 top-8 bg-[#1f1f1f] border border-[#2f2f2f] rounded-md p-2 text-xs poppins whitespace-nowrap z-50">
                <div className="text-[#ffffff] mb-1 text-xs">contact@vinithreddybanda.me</div>
                <div className="text-[#ffffff] text-xs cursor-pointer hover:text-[#d4af37]" onClick={handleEmailClick}>
                  vinithreddybanda@gmail.com
                </div>
=======
              onMouseEnter={() => setShowEmailTooltip(true)}
              onMouseLeave={() => setShowEmailTooltip(false)}
              className="text-[#c9c9c9] hover:text-[#ffe895] transition-colors retro-button-3d w-6 h-6 flex items-center justify-center"
            >
              <Mail className="h-4 w-4" />
            </button>
            {showEmailTooltip && (
              <div className="absolute right-0 top-8 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md p-2 text-xs kanit whitespace-nowrap z-50">
                <div className="text-[#c9c9c9] mb-1">contact@vinithreddybanda.me</div>
                <div className="text-[#c9c9c9]">vinithreddybanda@gmail.com</div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )

  const renderHomePage = () => (
    <motion.div
      key="home"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
<<<<<<< HEAD
      className="max-w-sm mx-auto px-3 flex flex-col justify-start min-h-screen pt-16 pb-4"
=======
      className="max-w-sm mx-auto px-4 flex flex-col justify-center min-h-screen pt-16"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
    >
      <div className="space-y-4">
        <div className="text-left">
          <h1 className="text-xl poppins-semibold text-[#ffffff]">Vinith Reddy Banda</h1>
          <div className="flex items-center justify-start space-x-2 mt-2">
            <div className="flex items-center space-x-2">
              <span className="text-[#d4af37] text-xs poppins font-medium">Seeking Internships</span>
              <div className="w-2 h-2 bg-[#00ff00] rounded-full pulse-dot"></div>
            </div>
<<<<<<< HEAD
            <button
              onClick={handleResumeDownload}
              className="flex items-center space-x-1 text-[#ffffff] hover:text-[#d4af37] transition-colors text-xs poppins retro-button-3d px-2 py-1"
            >
=======
            <button className="flex items-center space-x-1 text-[#c9c9c9] hover:text-[#ffe895] transition-colors text-sm kanit retro-button-3d px-2 py-1">
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
              <Download className="h-3 w-3" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-4">
<<<<<<< HEAD
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#d4af37] flex-shrink-0">
=======
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#3a3a3a] flex-shrink-0">
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZPnd6EFRVmibtwsl3BlAjEJe3V78Fu.png"
              alt="Vinith Reddy Banda"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-2 pt-1">
            <Link
              href="https://github.com/vinithreddybanda"
              className="flex items-center space-x-2 text-[#ffffff] hover:text-[#d4af37] transition-colors text-xs poppins"
            >
              <Github className="h-3 w-3" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/vinithreddybanda"
              className="flex items-center space-x-2 text-[#ffffff] hover:text-[#d4af37] transition-colors text-xs poppins"
            >
              <Twitter className="h-3 w-3" />
              <span>Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com/in/vinithreddybanda"
              className="flex items-center space-x-2 text-[#ffffff] hover:text-[#d4af37] transition-colors text-xs poppins"
            >
              <Linkedin className="h-3 w-3" />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-start">
          <Button
            size="sm"
            variant="outline"
            asChild
<<<<<<< HEAD
            className="h-7 px-3 text-xs text-[#ffffff] poppins font-medium glow-button border-0"
=======
            className="h-7 px-3 text-xs border-[#3a3a3a] hover:bg-[#2a2a2a] text-[#c9c9c9] kanit font-medium retro-button-3d"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
          >
            <Link href="https://github.com/vinithreddybanda">
              <Github className="mr-1 h-3 w-3" />
              Follow @vinithreddybanda
              <span className="ml-1 text-[#d4af37]">{githubStats.totalRepos}</span>
            </Link>
          </Button>
        </div>

<<<<<<< HEAD
        <div className="space-y-3 text-[#ffffff] leading-relaxed text-xs poppins">
=======
        <div className="space-y-3 text-[#c9c9c9] leading-relaxed text-sm kanit">
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
          <p>
            Final year IT student at <span className="text-[#d4af37] font-medium">CBIT, Hyderabad</span>, building
            efficient tools and learning C++ DSA — currently seeking internship opportunities.
          </p>

          <p>
            From building text-to-handwriting converters to student dashboards, it's been a rewarding journey—honored to
            maintain a strong academic record with <span className="text-[#d4af37] font-medium">CGPA: 8.10</span> and a
            passion for <span className="text-[#d4af37] font-medium">open-source innovation</span>.
          </p>

          <p>
            Passionate about building event-driven architectures, designing efficient platforms, and scaling
            applications with <span className="font-medium">Node.js</span> and{" "}
            <span className="font-medium">Python</span>. Beyond code, you'll find me solving DSA problems, exploring new
            technologies, and contributing to the developer community.
          </p>

          <div className="flex items-center justify-start space-x-1 text-xs pt-2">
            <span className="font-medium">In a nutshell,</span>
            <span>🎓</span>
            <span>💻</span>
            <span>☕</span>
            <span>👨‍💻</span>
            <span>=</span>
<<<<<<< HEAD
            <span className="text-[#d4af37] font-medium">@vinithreddybanda</span>
=======
            <span className="text-[#00abda] font-medium">@vinithreddybanda</span>
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-md p-3 border border-[#3a3a3a]">
          <div className="grid grid-cols-4 gap-2 text-left">
            <div>
              <div className="kanit font-bold text-[#ffe895] text-sm">23</div>
              <div className="text-xs text-[#c9c9c9] kanit text-left">Repos</div>
            </div>
            <div>
              <div className="kanit font-bold text-[#ffe895] text-sm">79</div>
              <div className="text-xs text-[#c9c9c9] kanit text-left">Commits</div>
            </div>
            <div>
              <div className="kanit font-bold text-[#ffe895] text-sm">8.10</div>
              <div className="text-xs text-[#c9c9c9] kanit text-left">CGPA</div>
            </div>
            <div>
              <div className="kanit font-bold text-[#ffe895] text-sm">5+</div>
              <div className="text-xs text-[#c9c9c9] kanit text-left">Skills</div>
            </div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderAboutPage = () => (
    <motion.div
      key="about"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
<<<<<<< HEAD
      className="max-w-sm mx-auto px-3 flex flex-col justify-start min-h-screen pt-16 pb-4"
    >
      <div className="space-y-4">
        <h1 className="text-lg poppins-semibold text-[#ffffff] text-left">About</h1>

        <p className="text-[#ffffff] leading-relaxed text-left text-xs poppins">
          Final-year IT student at CBIT, Hyderabad with strong academic performance and passion for practical solutions.
        </p>

        <div className="enhanced-card p-3">
          <h3 className="text-[#d4af37] poppins-medium mb-2 text-left text-sm">Education</h3>
          <div className="space-y-1.5">
            <div className="text-left">
              <div className="font-medium text-[#ffffff] text-xs poppins">B.E Information Technology</div>
              <div className="text-[#888888] text-xs poppins">CBIT, Hyderabad • CGPA: 8.10 • 2023-Present</div>
            </div>
            <div className="text-left">
              <div className="font-medium text-[#ffffff] text-xs poppins">Diploma Computer Engineering</div>
              <div className="text-[#888888] text-xs poppins">Govt. Polytechnic • CGPA: 9.74 • 2020-2023</div>
=======
      className="max-w-sm mx-auto px-4 flex flex-col justify-center min-h-screen pt-16"
    >
      <div className="space-y-4">
        <h1 className="text-xl kanit font-bold text-[#c9c9c9] text-left">About</h1>

        <p className="text-[#c9c9c9] leading-relaxed text-left text-sm kanit">
          Final-year IT student at CBIT, Hyderabad with strong academic performance and passion for practical solutions.
        </p>

        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md p-3">
          <h3 className="text-[#ffe895] font-bold mb-2 text-left">Education</h3>
          <div className="space-y-2">
            <div className="text-left">
              <div className="font-medium text-[#c9c9c9]">B.E Information Technology</div>
              <div className="text-[#888888] text-xs">CBIT, Hyderabad • CGPA: 8.10</div>
              <div className="text-[#888888] text-xs">2023 - Present</div>
            </div>
            <div className="text-left">
              <div className="font-medium text-[#c9c9c9]">Diploma Computer Engineering</div>
              <div className="text-[#888888] text-xs">Govt. Polytechnic • CGPA: 9.74</div>
              <div className="text-[#888888] text-xs">2020 - 2023</div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="enhanced-card p-3">
          <h3 className="text-[#d4af37] poppins-medium mb-2 text-left text-sm">Skills</h3>
          <div className="overflow-hidden">
            <div className="flex space-x-2 skills-loop">
              {skills.concat(skills).map((skill, index) => (
                <Badge
                  key={`${skill}-${index}`}
                  className="bg-[#0f0f0f] text-[#ffffff] border border-[#d4af37] text-xs poppins whitespace-nowrap px-2 py-1 flex-shrink-0"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="enhanced-card p-3">
          <h3 className="text-[#d4af37] poppins-medium mb-2 text-left text-sm">GitHub Insights</h3>
          <div className="w-full overflow-hidden rounded-md cursor-pointer" onClick={() => setShowInsightModal(true)}>
            <Image
              src="https://next.ossinsight.io/widgets/official/compose-user-dashboard-stats/thumbnail.png?user_id=116493221&image_size=auto&color_scheme=dark"
              alt="GitHub Dashboard Stats"
              width={300}
              height={120}
              className="w-full h-auto hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        <div className="text-xs text-[#888888] poppins text-left">Always learning, always building. 🚀</div>
=======
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md p-3">
          <h3 className="text-[#ffe895] font-bold mb-2 text-left">Skills & Certifications</h3>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {["C++", "Java", "Python", "JS", "Node", "Kotlin", "HTML", "CSS", "Git"].map((skill) => (
              <Badge key={skill} className="bg-[#3a3a3a] text-[#c9c9c9] border-0 text-xs kanit text-center p-1">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="text-left space-y-1 text-xs">
            <div>• MongoDB Node.js Certification</div>
            <div>• Pupilfirst Web Development 101</div>
            <div>• Google Cloud Workshop (Top 80)</div>
          </div>
        </div>

        <div className="text-xs text-[#888888] kanit text-left">Always learning, always building. 🚀</div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
      </div>

      {/* Modal for GitHub Insights */}
      {showInsightModal && (
        <div className="modal-overlay" onClick={() => setShowInsightModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowInsightModal(false)}>
              <X className="w-4 h-4" />
            </button>
            <Image
              src="https://next.ossinsight.io/widgets/official/compose-user-dashboard-stats/thumbnail.png?user_id=116493221&image_size=auto&color_scheme=dark"
              alt="GitHub Dashboard Stats - Full View"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </motion.div>
  )

<<<<<<< HEAD
=======
  const renderSpotifyWidget = () => {
    const progressPercentage =
      currentTrack && currentTrack.duration_ms > 0 ? (trackProgress / currentTrack.duration_ms) * 100 : 0

    return (
      <motion.div
        initial={{ height: "auto", opacity: 1 }}
        animate={{
          height: spotifyExpanded ? "auto" : "60px",
          opacity: spotifyExpanded ? 1 : 0.7,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md overflow-hidden"
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#1db954] rounded-full flex items-center justify-center">
                {currentTrack?.is_playing ? (
                  <Play className="h-2 w-2 text-white fill-white" />
                ) : currentTrack ? (
                  <Pause className="h-2 w-2 text-white" />
                ) : (
                  <Music className="h-2 w-2 text-white" />
                )}
              </div>
              <span className="text-[#ffe895] font-bold text-xs kanit">
                {currentTrack?.is_playing ? "Now Playing" : currentTrack ? "Last Played" : "Spotify"}
              </span>
            </div>
            <button
              onClick={loadSpotifyData}
              disabled={spotifyLoading}
              className={`retro-button-3d w-6 h-6 flex items-center justify-center transition-colors ${
                spotifyLoading ? "text-[#555555] cursor-not-allowed" : "text-[#c9c9c9] hover:text-[#ffe895]"
              }`}
              title="Refresh Spotify"
            >
              <RefreshCw className={`h-3 w-3 ${spotifyLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <AnimatePresence>
            {spotifyExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {currentTrack ? (
                  <div className="flex items-start space-x-3">
                    {currentTrack.album.images[0] && (
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={currentTrack.album.images[0].url || "/placeholder.svg"}
                          alt={currentTrack.album.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#c9c9c9] text-sm kanit truncate">{currentTrack.name}</div>
                      <div className="text-[#888888] text-xs kanit truncate">
                        {currentTrack.artists.map((artist) => artist.name).join(", ")}
                      </div>

                      {currentTrack.is_playing && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-[#888888] mb-1">
                            <span>{formatDuration(trackProgress)}</span>
                            <span>{formatDuration(currentTrack.duration_ms)}</span>
                          </div>
                          <div className="w-full bg-[#3a3a3a] rounded-full h-1">
                            <div
                              className="bg-[#1db954] h-1 rounded-full transition-all duration-1000 ease-linear"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-[#888888] text-xs kanit text-center py-2">Click refresh to load your music</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
  const renderNowPage = () => (
    <motion.div
      key="now"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
<<<<<<< HEAD
      className="max-w-sm mx-auto px-3 flex flex-col justify-start min-h-screen pt-16 pb-4"
    >
      <div className="space-y-4">
        <h1 className="text-lg poppins-semibold text-[#ffffff] text-left">Now</h1>

        <p className="text-[#ffffff] text-left leading-relaxed text-xs poppins">
          <span className="font-bold">TL;DR:</span> Final year student actively seeking internships while mastering C++
          DSA and building practical projects.
        </p>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 gap-3">
          {/* Currently Focused Card - Modern Design */}
          <div className="modern-glass-card p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37]"></div>
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-[#d4af37] rounded-full mr-3 pulse-glow"></div>
              <p className="poppins-medium text-[#ffffff] text-sm">Currently Focused On</p>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs poppins">
              <div className="modern-list-item">
                <span className="modern-bullet"></span>
                <span>Mastering C++ Data Structures & Algorithms</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet"></span>
                <span>Building practical projects & tools</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet"></span>
                <span>Maintaining strong academic performance (CGPA: 8.10)</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet"></span>
                <span>Contributing to open-source projects</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet"></span>
                <span>Preparing for technical interviews</span>
              </div>
            </div>
          </div>

          {/* Seeking Opportunities Card - Modern Design */}
          <div className="modern-glass-card p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff00] via-[#32ff32] to-[#00ff00]"></div>
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-[#00ff00] rounded-full mr-3 pulse-dot"></div>
              <p className="poppins-medium text-[#ffffff] text-sm">Seeking Opportunities</p>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs poppins">
              <div className="modern-list-item">
                <span className="modern-bullet-green"></span>
                <span>Software Engineering Internships</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet-green"></span>
                <span>Full-stack Development positions</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet-green"></span>
                <span>Backend Development with Node.js</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet-green"></span>
                <span>Mobile Development with Kotlin</span>
              </div>
              <div className="modern-list-item">
                <span className="modern-bullet-green"></span>
                <span>Open-source collaboration opportunities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modern-glass-card p-3">
          <p className="text-xs text-[#a0a0a0] poppins text-left">
            Inspired by Derek Sivers' /now movement - updated regularly to reflect current priorities and goals.
          </p>
        </div>

        <div className="text-xs text-[#888888] poppins text-left">Last updated: January 2024</div>
=======
      className="max-w-sm mx-auto px-4 flex flex-col justify-center min-h-screen pt-16"
    >
      <div className="space-y-4">
        <h1 className="text-xl kanit font-bold text-[#c9c9c9] text-left">Now</h1>

        <p className="text-[#c9c9c9] text-left leading-relaxed text-sm kanit">
          <span className="font-bold">TL;DR:</span> Final year student actively seeking internships while mastering C++
          DSA and building practical projects.
        </p>

        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md p-3">
          <p className="font-medium text-left mb-2 text-[#ffe895]">Currently Focused On:</p>
          <div className="text-left space-y-1 text-xs">
            <div>• Mastering C++ Data Structures & Algorithms</div>
            <div>• Building practical projects & tools</div>
            <div>• Maintaining strong academic performance (CGPA: 8.10)</div>
            <div>• Contributing to open-source projects</div>
            <div>• Preparing for technical interviews</div>
          </div>
        </div>

        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md p-3">
          <p className="font-medium text-left mb-2 text-[#ffe895]">Seeking Opportunities:</p>
          <div className="text-left space-y-1 text-xs">
            <div>• Software Engineering Internships</div>
            <div>• Full-stack Development positions</div>
            <div>• Backend Development with Node.js</div>
            <div>• Mobile Development with Kotlin</div>
            <div>• Open-source collaboration opportunities</div>
          </div>
        </div>

        {renderSpotifyWidget()}

        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md p-2">
          <p className="text-xs text-[#888888] kanit text-left">
            Inspired by Derek Sivers' /now movement - updated regularly to reflect current priorities and goals.
          </p>
        </div>

        <div className="text-xs text-[#888888] kanit text-left">Last updated: January 2024</div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
      </div>
    </motion.div>
  )

  const renderFeaturedPage = () => {
<<<<<<< HEAD
    const totalPages = Math.ceil(repos.length / REPOS_PER_PAGE)
    const startIndex = currentRepoPage * REPOS_PER_PAGE
    const visibleRepos = repos.slice(startIndex, startIndex + REPOS_PER_PAGE)
    const canGoNext = currentRepoPage < totalPages - 1

    const nextPage = () => {
      if (canGoNext) {
        setCurrentRepoPage((prev) => prev + 1)
      }
    }
=======
    const visibleRepos = repos.slice(scrollPosition, scrollPosition + REPOS_PER_PAGE)
    const remainingRepos = Math.max(0, repos.length - scrollPosition - REPOS_PER_PAGE)
    const totalPages = Math.ceil(repos.length / REPOS_PER_PAGE)
    const currentPageIndex = Math.floor(scrollPosition / REPOS_PER_PAGE)
    const startDot = Math.max(0, Math.min(currentPageIndex - 2, totalPages - 5))
    const endDot = Math.min(totalPages, startDot + 5)
    const visibleDots = Array.from({ length: endDot - startDot }, (_, i) => startDot + i)
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72

    return (
      <motion.div
        key="featured"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
<<<<<<< HEAD
        className="max-w-sm mx-auto px-3 min-h-screen pt-16 pb-4 relative"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg poppins-semibold text-[#ffffff] text-left">Featured Work</h1>
=======
        className="max-w-sm mx-auto px-4 min-h-screen pt-20 pb-4"
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg kanit font-bold text-[#c9c9c9] text-left">Featured Work</h1>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
            <button
              onClick={loadRepos}
              disabled={loading}
              className={`retro-button-3d w-6 h-6 flex items-center justify-center transition-colors ${
<<<<<<< HEAD
                loading ? "text-[#555555] cursor-not-allowed" : "text-[#ffffff] hover:text-[#d4af37]"
=======
                loading ? "text-[#555555] cursor-not-allowed" : "text-[#c9c9c9] hover:text-[#ffe895]"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
              }`}
              title="Refresh repositories"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
<<<<<<< HEAD
              <div className="text-[#888888] text-xs poppins">Loading repositories...</div>
            </div>
          ) : visibleRepos.length > 0 ? (
            <>
              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  {visibleRepos.map((repo, index) => (
                    <motion.div
                      key={`${repo.name}-${currentRepoPage}-${index}`}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={slideDown}
                      transition={{ delay: index * 0.1 }}
                      className="enhanced-card p-3"
=======
              <div className="text-[#888888] text-sm kanit">Loading repositories...</div>
            </div>
          ) : visibleRepos.length > 0 ? (
            <>
              {/* Scroll indicator at top */}
              {scrollPosition > 0 && (
                <div className="flex justify-center py-1">
                  <div className="text-xs text-[#555555] kanit">↑ Scroll up for more ↑</div>
                </div>
              )}

              <div className="space-y-2">
                <AnimatePresence mode="wait">
                  {visibleRepos.map((repo, index) => (
                    <motion.div
                      key={`${repo.name}-${scrollPosition + index}`}
                      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1, duration: 0.6 },
                      }}
                      exit={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-3 hover:border-[#ffe895] transition-all duration-300 hover:bg-[#2d2d2d]"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Link
                          href={repo.html_url}
<<<<<<< HEAD
                          className="poppins font-semibold text-[#ffffff] text-sm text-left hover:text-[#d4af37] transition-colors flex-1 mr-2 truncate"
=======
                          className="kanit font-bold text-[#c9c9c9] text-sm text-left hover:text-[#ffe895] transition-colors flex-1 mr-2 truncate"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {repo.name}
                        </Link>
<<<<<<< HEAD
                        {repo.language && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#d4af37] rounded-full mr-1.5"></div>
                            <span className="text-[#888888] text-xs poppins">{repo.language}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-[#ffffff] text-xs poppins leading-relaxed text-left line-clamp-2 mb-2">
                        {repo.description || "No description available"}
                      </p>
=======
                        <div className="flex items-center space-x-2 text-xs flex-shrink-0">
                          <span className="text-[#ffe895]">⭐{repo.stargazers_count}</span>
                          <span className="text-[#888888]">🍴{repo.forks_count}</span>
                        </div>
                      </div>

                      <div className="mb-2">
                        {repo.language && (
                          <div className="flex items-center mb-1">
                            <div className="w-2 h-2 bg-[#ffe895] rounded-full mr-2"></div>
                            <span className="text-[#888888] text-xs kanit">{repo.language}</span>
                          </div>
                        )}
                        <p className="text-[#c9c9c9] text-xs kanit leading-relaxed text-left line-clamp-2">
                          {repo.description || "No description available"}
                        </p>
                      </div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {repo.topics.slice(0, 3).map((topic: string) => (
                            <span
                              key={topic}
<<<<<<< HEAD
                              className="bg-[#0f0f0f] text-[#ffffff] text-xs poppins px-2 py-0.5 rounded-full border border-[#d4af37]"
=======
                              className="bg-[#3a3a3a] text-[#c9c9c9] text-xs kanit px-2 py-0.5 rounded-full border border-[#4a4a4a]"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

<<<<<<< HEAD
                      <div className="flex items-center justify-between text-xs text-[#888888]">
                        <span className="poppins">{formatTimeAgo(repo.pushed_at)}</span>
                        <Link
                          href={repo.html_url}
                          className="text-[#d4af37] hover:text-[#ffffff] transition-colors poppins"
=======
                      <div className="flex items-center justify-between text-xs text-[#888888] pt-2 border-t border-[#3a3a3a]">
                        <span>{formatTimeAgo(repo.pushed_at)}</span>
                        <Link
                          href={repo.html_url}
                          className="text-[#ffe895] hover:text-[#ffed9f] transition-colors"
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

<<<<<<< HEAD
              <div className="flex items-center justify-between text-xs text-[#888888] poppins pt-2">
                <span>
                  Page {currentRepoPage + 1} of {totalPages} • {startIndex + 1}-
                  {Math.min(startIndex + REPOS_PER_PAGE, repos.length)} of {repos.length}
                </span>
                {canGoNext && (
                  <button onClick={nextPage} className="scroll-button ml-2" title="Next page">
                    <ChevronDown className="w-2.5 h-2.5 text-[#d4af37]" />
                  </button>
                )}
=======
              {/* Scroll indicator at bottom */}
              {remainingRepos > 0 && (
                <div className="flex justify-center py-1">
                  <div className="text-xs text-[#555555] kanit">↓ Scroll down for more ↓</div>
                </div>
              )}

              {/* Navigation Dots */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1">
                  {visibleDots.map((pageIndex) => (
                    <button
                      key={pageIndex}
                      onClick={() => navigateToRepo(pageIndex * REPOS_PER_PAGE)}
                      className={`transition-all duration-300 retro-button-3d ${
                        pageIndex === currentPageIndex
                          ? "bg-[#ffe895] w-3 h-2 rounded-full"
                          : "bg-[#3a3a3a] hover:bg-[#4a4a4a] w-2 h-2 rounded-full"
                      }`}
                      title={`Go to page ${pageIndex + 1}`}
                    />
                  ))}
                  {endDot < totalPages && <span className="text-[#555555] text-xs kanit">...</span>}
                </div>
                <div className="text-xs text-[#888888] kanit">
                  {scrollPosition + 1}-{Math.min(scrollPosition + REPOS_PER_PAGE, repos.length)} of {repos.length}
                </div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-8">
<<<<<<< HEAD
              <div className="text-[#888888] text-xs poppins">No repositories found</div>
=======
              <div className="text-[#888888] text-sm kanit">No repositories found</div>
>>>>>>> 9331db9f3bf45e3a61b1c2769017e36490507a72
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="h-screen bg-[#1a1a1a] flex flex-col overflow-hidden">
      {renderNavigation()}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentPage === "home" && renderHomePage()}
          {currentPage === "about" && renderAboutPage()}
          {currentPage === "now" && renderNowPage()}
          {currentPage === "featured" && renderFeaturedPage()}
        </AnimatePresence>
      </div>
    </div>
  )
}

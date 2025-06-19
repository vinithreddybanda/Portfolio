"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Download, RefreshCw, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
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

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string; width: number; height: number }[]
  }
  duration_ms: number
  progress_ms?: number
  is_playing: boolean
}

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [currentRepoIndex, setCurrentRepoIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [trackProgress, setTrackProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  const fetchSpotifyData = async () => {
    try {
      const response = await fetch("/api/spotify-current")
      if (!response.ok) throw new Error("Failed to fetch Spotify data")
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching Spotify data:", error)
      return null
    }
  }

  const loadRepos = async () => {
    setLoading(true)
    try {
      const repoData = await fetchGitHubRepos()
      setRepos(repoData)
      setCurrentRepoIndex(0)
    } catch (error) {
      console.error("Failed to fetch repos:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadSpotifyData = async () => {
    const data = await fetchSpotifyData()
    if (data) {
      setCurrentTrack(data)
      if (data.is_playing && data.progress_ms) {
        setTrackProgress(data.progress_ms)
      }
    }
  }

  useEffect(() => {
    if (currentPage === "featured") {
      loadRepos()
    }
    if (currentPage === "now") {
      loadSpotifyData()
      // Refresh Spotify data every 30 seconds
      const interval = setInterval(loadSpotifyData, 30000)
      return () => clearInterval(interval)
    }
  }, [currentPage])

  // Real-time progress bar animation
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
    const newIndex = Math.max(0, Math.min(repos.length - 1, currentRepoIndex + delta))

    if (newIndex !== currentRepoIndex) {
      setCurrentRepoIndex(newIndex)
    }
  }

  const navigateToPage = (page: Page) => {
    setCurrentPage(page)
    if (page === "featured") {
      setCurrentRepoIndex(0)
    }
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

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const renderNavigation = () => (
    <nav className="w-full bg-[#242424] py-2 border-b border-[#3a3a3a]">
      <div className="max-w-sm mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image src="/avatar.jpeg" alt="VRB" width={32} height={32} className="w-full h-full object-cover" />
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigateToPage("home")}
              className={`retro-button-3d kanit font-medium text-xs px-2 py-1 ${
                currentPage === "home" ? "retro-button-active" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateToPage("about")}
              className={`retro-button-3d kanit font-medium text-xs px-2 py-1 ${
                currentPage === "about" ? "retro-button-active" : ""
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateToPage("now")}
              className={`retro-button-3d kanit font-medium text-xs px-2 py-1 ${
                currentPage === "now" ? "retro-button-active" : ""
              }`}
            >
              Now
            </button>
            <button
              onClick={() => navigateToPage("featured")}
              className={`retro-button-3d kanit font-medium text-xs px-2 py-1 ${
                currentPage === "featured" ? "retro-button-active" : ""
              }`}
            >
              Work
            </button>
          </div>

          {/* Email Icon */}
          <Link
            href="mailto:vinithreddybanda@gmail.com"
            className="text-[#c9c9c9] hover:text-[#ffe895] transition-colors"
          >
            <Mail className="h-4 w-4" />
          </Link>
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
      className="max-w-sm mx-auto px-4 h-full flex flex-col"
    >
      <div className="space-y-2 pt-2 flex-1">
        {/* Main Header */}
        <div className="text-left">
          <h1 className="text-2xl kanit font-bold text-[#c9c9c9]">Vinith Reddy Banda</h1>
          <div className="flex items-center justify-start space-x-3 mt-1">
            <div className="flex items-center space-x-2">
              <span className="text-[#ffe895] text-sm kanit font-medium">Seeking Internships</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <button className="flex items-center space-x-1 text-[#c9c9c9] hover:text-[#ffe895] transition-colors text-sm kanit">
              <Download className="h-3 w-3" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        {/* Profile and Social Section */}
        <div className="flex items-start space-x-4">
          {/* Profile Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#3a3a3a] flex-shrink-0">
            <Image
              src="/avatar.jpeg"
              alt="Vinith Reddy Banda"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Social Links */}
          <div className="flex-1 space-y-2 pt-1">
            <Link
              href="https://github.com/vinithreddybanda"
              className="flex items-center space-x-2 text-[#c9c9c9] hover:text-[#ffe895] transition-colors text-sm kanit"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/vinithreddybanda"
              className="flex items-center space-x-2 text-[#c9c9c9] hover:text-[#ffe895] transition-colors text-sm kanit"
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com/in/vinithreddybanda"
              className="flex items-center space-x-2 text-[#c9c9c9] hover:text-[#ffe895] transition-colors text-sm kanit"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* GitHub Follow Button - Left Aligned */}
        <div className="flex justify-start">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="h-7 px-3 text-xs border-[#3a3a3a] hover:bg-[#2a2a2a] text-[#c9c9c9] kanit font-medium"
          >
            <Link href="https://github.com/vinithreddybanda">
              <Github className="mr-1 h-3 w-3" />
              Follow @vinithreddybanda
              <span className="ml-1 text-[#ffe895]">23</span>
            </Link>
          </Button>
        </div>

        {/* Bio Content */}
        <div className="space-y-2 text-[#c9c9c9] leading-relaxed text-sm kanit">
          <p>
            Final year IT student at <span className="text-[#00abda] font-medium">CBIT, Hyderabad</span>, building
            efficient tools and learning C++ DSA — currently seeking internship opportunities.
          </p>

          <p>
            From building text-to-handwriting converters to student dashboards, it's been a rewarding journey—honored to
            maintain a strong academic record with <span className="text-[#ffe895] font-medium">CGPA: 8.10</span> and a
            passion for <span className="text-[#00abda] font-medium">open-source innovation</span>.
          </p>

          <p>
            Passionate about building event-driven architectures, designing efficient platforms, and scaling
            applications with <span className="font-medium">Node.js</span> and{" "}
            <span className="font-medium">Python</span>. Beyond code, you'll find me solving DSA problems, exploring new
            technologies, and contributing to the developer community.
          </p>

          <div className="flex items-center justify-start space-x-1 text-sm pt-2">
            <span className="font-medium">In a nutshell,</span>
            <span>🎓</span>
            <span>💻</span>
            <span>☕</span>
            <span>👨‍💻</span>
            <span>=</span>
            <span className="text-[#00abda] font-medium">@vinithreddybanda</span>
          </div>
        </div>

        {/* Stats Card */}
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
      className="max-w-sm mx-auto px-4 h-full flex flex-col"
    >
      <div className="pt-2 flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-xl kanit font-bold text-[#c9c9c9] mb-3 text-left">About</h1>
          <div className="space-y-3 text-sm kanit">
            <p className="text-[#c9c9c9] leading-relaxed text-left">
              Final-year IT student at CBIT, Hyderabad with strong academic performance and passion for practical
              solutions.
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
                </div>
              </div>
            </div>

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
          </div>
        </div>

        <div className="pb-4">
          <div className="text-xs text-[#888888] kanit text-left">Always learning, always building. 🚀</div>
        </div>
      </div>
    </motion.div>
  )

  const renderSpotifyWidget = () => {
    if (!currentTrack) return null

    const progressPercentage = currentTrack.duration_ms > 0 ? (trackProgress / currentTrack.duration_ms) * 100 : 0

    return (
      <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md p-3">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-4 h-4 bg-[#1db954] rounded-full flex items-center justify-center">
            {currentTrack.is_playing ? (
              <Play className="h-2 w-2 text-white fill-white" />
            ) : (
              <Pause className="h-2 w-2 text-white" />
            )}
          </div>
          <span className="text-[#ffe895] font-bold text-xs kanit">
            {currentTrack.is_playing ? "Now Playing" : "Last Played"}
          </span>
        </div>

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
      </div>
    )
  }

  const renderNowPage = () => (
    <motion.div
      key="now"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="max-w-sm mx-auto px-4 h-full flex flex-col"
    >
      <div className="pt-2 flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-xl kanit font-bold text-[#c9c9c9] mb-3 text-left">Now</h1>
          <div className="space-y-3 text-sm kanit">
            <p className="text-[#c9c9c9] text-left leading-relaxed">
              <span className="font-bold">TL;DR:</span> Final year student actively seeking internships while mastering
              C++ DSA and building practical projects.
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
          </div>
        </div>

        <div className="pb-4 space-y-3">
          {renderSpotifyWidget()}
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md p-2">
            <p className="text-xs text-[#888888] kanit text-left">
              Inspired by Derek Sivers' /now movement - updated regularly to reflect current priorities and goals.
            </p>
          </div>
          <div className="text-xs text-[#888888] kanit text-left">Last updated: January 2024</div>
        </div>
      </div>
    </motion.div>
  )

  const renderFeaturedPage = () => {
    const currentRepo = repos[currentRepoIndex]
    const remainingRepos = repos.length - currentRepoIndex - 1

    return (
      <motion.div
        key="featured"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        className="max-w-sm mx-auto px-4 h-full flex flex-col"
        onWheel={handleScroll}
      >
        <div className="pt-2 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg kanit font-bold text-[#c9c9c9] text-left">Featured Work</h1>
            <button
              onClick={loadRepos}
              disabled={loading}
              className={`p-1 rounded transition-colors ${
                loading ? "text-[#555555] cursor-not-allowed" : "text-[#c9c9c9] hover:text-[#ffe895] hover:bg-[#3a3a3a]"
              }`}
              title="Refresh repositories"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-[#888888] text-sm kanit">Loading repositories...</div>
            </div>
          ) : currentRepo ? (
            <>
              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRepoIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-3 hover:border-[#ffe895] transition-all duration-300 hover:bg-[#2d2d2d] flex-1 flex flex-col"
                  >
                    {/* Header with name and stats */}
                    <div className="flex items-start justify-between mb-2">
                      <Link
                        href={currentRepo.html_url}
                        className="kanit font-bold text-[#c9c9c9] text-sm text-left hover:text-[#ffe895] transition-colors flex-1 mr-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {currentRepo.name}
                      </Link>
                      <div className="flex items-center space-x-2 text-xs flex-shrink-0">
                        <div className="flex items-center space-x-1">
                          <span className="text-[#ffe895]">⭐</span>
                          <span className="text-[#ffe895]">{currentRepo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-[#888888]">🍴</span>
                          <span className="text-[#888888]">{currentRepo.forks_count}</span>
                        </div>
                      </div>
                    </div>

                    {/* Language indicator */}
                    {currentRepo.language && (
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-[#ffe895] rounded-full mr-2"></div>
                        <span className="text-[#888888] text-xs kanit">{currentRepo.language}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-[#c9c9c9] text-xs kanit mb-3 leading-relaxed text-left flex-1">
                      {currentRepo.description || "No description available"}
                    </p>

                    {/* Topics */}
                    {currentRepo.topics && currentRepo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {currentRepo.topics.slice(0, 5).map((topic: string) => (
                          <span
                            key={topic}
                            className="bg-[#3a3a3a] text-[#c9c9c9] text-xs kanit px-2 py-0.5 rounded-full border border-[#4a4a4a]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer with last commit */}
                    <div className="flex items-center justify-between text-xs text-[#888888] pt-2 border-t border-[#3a3a3a] mt-auto">
                      <span>Updated {formatTimeAgo(currentRepo.pushed_at)}</span>
                      <Link
                        href={currentRepo.html_url}
                        className="text-[#ffe895] hover:text-[#ffed9f] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View →
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation indicators */}
                <div className="flex items-center justify-between mt-3 px-1">
                  <div className="flex items-center space-x-1">
                    {repos.slice(Math.max(0, currentRepoIndex - 2), currentRepoIndex + 3).map((_, index) => {
                      const actualIndex = Math.max(0, currentRepoIndex - 2) + index
                      return (
                        <div
                          key={actualIndex}
                          className={`w-1 h-1 rounded-full transition-all duration-300 ${
                            actualIndex === currentRepoIndex
                              ? "bg-[#ffe895] w-3"
                              : actualIndex < currentRepoIndex
                                ? "bg-[#555555]"
                                : "bg-[#3a3a3a]"
                          }`}
                        />
                      )
                    })}
                  </div>
                  <div className="text-xs text-[#888888] kanit">
                    {currentRepoIndex + 1}/{repos.length}
                  </div>
                </div>

                {/* Scroll hint */}
                {remainingRepos > 0 && (
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center space-x-1 text-xs text-[#555555] kanit">
                      <span>Scroll for more</span>
                      <div className="w-1 h-1 bg-[#555555] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-[#888888] text-sm kanit">No repositories found</div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="h-screen bg-[#242424] flex flex-col overflow-hidden">
      {renderNavigation()}
      <div className="flex-1 overflow-hidden">
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

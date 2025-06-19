import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/users/vinithreddybanda/repos?sort=updated&per_page=50", {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos = await response.json()

    // Filter out forks and private repos, sort by stars and recent activity
    const filteredRepos = repos
      .filter((repo: any) => !repo.fork && !repo.private)
      .sort((a: any, b: any) => {
        // Sort by stars first, then by recent activity
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      })

    return NextResponse.json(filteredRepos)
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 })
  }
}

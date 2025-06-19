import { NextResponse } from "next/server"

async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  })

  const data = await response.json()
  return data.access_token
}

export async function GET() {
  try {
    const access_token = await getAccessToken()

    // Try to get currently playing track
    const currentlyPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (currentlyPlayingResponse.status === 200) {
      const currentlyPlaying = await currentlyPlayingResponse.json()

      if (currentlyPlaying && currentlyPlaying.item) {
        return NextResponse.json({
          name: currentlyPlaying.item.name,
          artists: currentlyPlaying.item.artists,
          album: currentlyPlaying.item.album,
          duration_ms: currentlyPlaying.item.duration_ms,
          progress_ms: currentlyPlaying.progress_ms,
          is_playing: currentlyPlaying.is_playing,
        })
      }
    }

    // If nothing is currently playing, get recently played
    const recentlyPlayedResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (recentlyPlayedResponse.ok) {
      const recentlyPlayed = await recentlyPlayedResponse.json()

      if (recentlyPlayed.items && recentlyPlayed.items.length > 0) {
        const track = recentlyPlayed.items[0].track
        return NextResponse.json({
          name: track.name,
          artists: track.artists,
          album: track.album,
          duration_ms: track.duration_ms,
          is_playing: false,
        })
      }
    }

    return NextResponse.json({ error: "No track data available" }, { status: 404 })
  } catch (error) {
    console.error("Error fetching Spotify data:", error)
    return NextResponse.json({ error: "Failed to fetch Spotify data" }, { status: 500 })
  }
}

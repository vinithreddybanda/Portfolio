import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vinith Reddy Banda - Final Year IT Student & Aspiring Software Engineer",
  description:
    "Portfolio of Vinith Reddy Banda, a final year Information Technology student at CBIT, Hyderabad. Passionate about building efficient, real-world tools and currently seeking internship opportunities.",
  keywords: [
    "Vinith Reddy Banda",
    "Software Engineer",
    "CBIT",
    "Information Technology",
    "Portfolio",
    "Internship",
    "Full Stack Developer",
  ],
  authors: [{ name: "Vinith Reddy Banda", url: "https://github.com/vinithreddybanda" }],
  creator: "Vinith Reddy Banda",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vinithreddybanda.dev",
    title: "Vinith Reddy Banda - Final Year IT Student & Aspiring Software Engineer",
    description:
      "Portfolio of Vinith Reddy Banda, a final year Information Technology student at CBIT, Hyderabad. Passionate about building efficient, real-world tools.",
    siteName: "Vinith Reddy Banda Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinith Reddy Banda - Final Year IT Student & Aspiring Software Engineer",
    description: "Portfolio of Vinith Reddy Banda, a final year Information Technology student at CBIT, Hyderabad.",
    creator: "@vinithreddybanda",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz@9..40&family=Kanit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=KoHo:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

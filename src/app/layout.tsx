import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Plasma from "../components/Plasma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anish's Personal Website",
  description: "Have a conversation with Anish! Ask me anything about my background, skills, experience, projects, and interests. I'm a UT Austin CS & Business student passionate about AI/ML and startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Plasma background */}
        <div 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none'
          }}
        >
          <Plasma 
            color="#00008B"
            speed={0.8}
            direction="forward"
            scale={2.0}
            opacity={1.0}
            mouseInteractive={false}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

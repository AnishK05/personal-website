'use client';

import Link from 'next/link';
import GroupedExperienceCard from '@/components/GroupedExperienceCard';

export default function LeadershipPage() {
  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mt-8 mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back to Chat with Anish
          </Link>
        </div>

        <div className="space-y-8">

          {/* Leadership section heading */}
          <h2 className="text-2xl font-bold text-gray-100 border-b border-gray-600/70 pb-3">Leadership</h2>

          {/* Texas Convergent */}
          <GroupedExperienceCard
            company="Texas Convergent"
            location="Austin, TX"
            roles={[
              {
                title: 'President',
                dateRange: 'May 2026 - Present',
                bullets: [
                  "Lead Texas Convergent, UT Austin's largest CS and entrepreneurship organization with 200+ members and 40+ officers",
                ],
              },
              {
                title: 'Engineering Chair',
                dateRange: 'Jun 2025 - May 2026',
                bullets: [
                  'Oversaw all technical initiatives for Texas Convergent, modernizing curriculum around AI systems, MCP, agents, advanced RAG, and cloud infrastructure',
                  'Built a TypeScript-based web portal serving as a centralized hub for applications, review workflows, analytics, and member resources across hundreds of active members and officers',
                ],
                skills: ['AI', 'MCP', 'Agentic AI', 'RAG', 'Tool Calling', 'AWS', 'TypeScript', 'PostgreSQL'],
              },
              {
                title: 'Forge: Software Lead for REFIND (Local Austin Startup)',
                dateRange: 'Feb 2026 - Apr 2026',
                bullets: [
                  "Led an 8-member technical team in building REFIND's core product, a CRM analytics suite for in-person brand activations",
                  "Architected and shipped the product's entire codebase within a 7-week startup sprint",
                ],
                skills: ['TypeScript', 'PostgreSQL'],
              },
              {
                title: 'Forge: Software Lead and Engineer for Hornslink (Collab. with UT)',
                dateRange: 'Jan 2025 - Dec 2025',
                bullets: [
                  'Rebuilt Hornslink from scratch using React Native and Flask in direct collaboration with UT Austin, modernizing the application used by 50,000+ students to discover campus opportunities',
                  'Scraped and processed data from 3,000+ student organizations using Selenium to populate the platform\'s database and support ML-driven personalizations',
                  'Directed a 12-member technical team across system architecture, database design, and scalability engineering',
                ],
                skills: ['Python', 'Flask', 'Selenium', 'React Native', 'TypeScript', 'AWS', 'PostgreSQL'],
              },
              {
                title: 'Build Teams: Software Engineer for SafeStep',
                dateRange: 'Sep 2024 - Dec 2024',
                bullets: [
                  'Developed SafeStep, a React Native app that helps tourists and new residents find and navigate safer walking routes using Google Maps API and custom real-time safety alerts',
                ],
                skills: ['React Native', 'TypeScript', 'Google Maps API'],
              },
            ]}
          />

          {/* TA / UGCA */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">University of Texas at Austin</h3>
              <span className="text-gray-400 text-sm">August 2025 – December 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Undergraduate Course Assistant — CS 109 (Think Lab)</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Mentored a cohort of 20–30 freshmen students, supporting their transition to college and introduction to computer science</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Facilitated exploratory lessons on emerging CS topics and mental models for problem-solving and academic success</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Chosen as 1 of 30 from 500 applicants</span>
              </li>
            </ul>
          </div>

          {/* Awards section heading */}
          <h2 className="text-2xl font-bold text-gray-100 border-b border-gray-600/70 pb-3">Awards</h2>

          {/* Awards */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="space-y-4">

              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-200 font-semibold">Guinness World Record Holder</p>
                  <p className="text-gray-400 text-sm">Recognized as 1/1,000 authors published in the largest book ever, &quot;I am Texas&quot; (11 feet, 496 pounds)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-200 font-semibold">Pitch Competitions, Hackathons, and Grants</p>
                  <p className="text-gray-400 text-sm">Awarded $250,000 in data/cloud credits and $25,000 in various pitch competitions and hackathons</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

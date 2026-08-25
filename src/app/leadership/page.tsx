'use client';

import Link from 'next/link';
import GroupedExperienceCard from '@/components/GroupedExperienceCard';
import { experiences } from '@/lib/experiences';

const convergent = experiences.find(
  (experience) => experience.type === 'grouped' && experience.company === 'Texas Convergent'
);

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

          {convergent?.type === 'grouped' && (
            <GroupedExperienceCard
              company={convergent.company}
              location={convergent.location}
              roles={convergent.roles.map((role) => ({
                title: role.title,
                dateRange: role.dateRange,
                bullets: role.bullets.technical,
                skills: role.skills?.technical,
              }))}
            />
          )}

          {/* TA / UGCA */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">University of Texas at Austin</h3>
              <span className="text-gray-400 text-sm">August 2025 – Present</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Undergraduate Course Assistant — CS 109 (Think Lab)</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Mentor a cohort of 20–30 freshmen students, supporting their transition to college and introduction to computer science</span>
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
                  <p className="text-gray-400 text-sm">Issued by Guinness World Records</p>
                  <p className="text-gray-400 text-sm">Recognized as 1/1,000 authors published in the largest book ever, &quot;I am Texas&quot; (11 feet wide, 496 pounds)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-200 font-semibold">Pitch Competitions, Hackathons, and Grants</p>
                  <p className="text-gray-400 text-sm">Awarded $250,000 in credits/grants and $25,000 in various pitch competitions and hackathons</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

export default function ProjectsPage() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">EcoReviveTX</h3>
            <p className="text-gray-400 mb-4">
              Partnering with the Texas Parks and Wildlife Department to create a full-stack web-app supporting ecological restoration efforts in Texas.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Flask</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Javascript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">HTML and CSS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Machine Learning</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">C</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/EcoReviveTX"
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">AI Marketing Agent</h3>
            <p className="text-gray-400 mb-4">
              Built an agent that automates lead generation by identifying Instagram client profiles, extracting emails, and running targeted outreach campaigns, achieving 2x higher conversion rates compared to industry averages.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Next.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Node.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">LLM Web Search</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Agentic AI</span>
            </div>
              <div className="flex gap-3">
               <div className="relative group">
                 <a
                   className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium cursor-pointer backdrop-blur-sm"
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                   </svg>
                   See More
                 </a>
                 
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900/90 text-gray-100 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 backdrop-blur-md">
                    This project is currently under acquisition by a company. Additional details are confidential during this process.
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                  </div>
               </div>
             </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">SafeStep</h3>
            <p className="text-gray-400 mb-4">
              Developed a mobile app that helps tourists and new residents find and navigate safer walking routes via custom real-time safety alerts.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React Native</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Google Maps API</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/SafeStep" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">StatSwish</h3>
            <p className="text-gray-400 mb-4">
              Engineered an NBA analytics platform tracking 700+ players with 16,000+ stats, featuring advanced filters and AI-powered game predictions.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Java</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Spring Boot</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Machine Learning</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/StatSwish" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

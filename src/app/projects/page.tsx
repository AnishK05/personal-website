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
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">Pulse: Event Platform</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Designed and implemented a multi-tenant, developer-facing event ingestion and processing platform with API-key authentication, rate limiting, idempotent intake, Kafka-based asynchronous processing, Postgres-backed persistence, dead-letter queues, and an operator dashboard for observability.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Java Spring Boot</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Golang</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Kafka</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Redis</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">PostgreSQL</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Docker</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Next.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/pulse-event-platform" 
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
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">AI Marketing Agent</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Built an agent that automates lead generation by identifying Instagram client profiles, extracting emails, and running targeted outreach campaigns, achieving 2x higher conversion rates compared to industry averages.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Next.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Node.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">MCP</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">LLM Web Search</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Agentic AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Tailwind CSS</span>
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
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-6 py-3 bg-gray-900/90 text-gray-100 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-normal min-w-[320px] max-w-xl z-10 backdrop-blur-md break-words text-center">
                  This project is currently under acquisition by a company. Additional details are confidential during this process.
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">Code as Control</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Engineered a Dockerized control system in which an LLM autonomously generates, validates, and executes low-level Python motion policies for robotic arms in real time, enabling on-the-fly policy execution for unseen tasks via a sandboxed ROS/MoveIt execution layer.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">LLM Code Generation</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">ROS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">MoveIt</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Docker</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/code-as-control" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
              <a 
                href="https://github.com/AnishK05/code-as-control/blob/main/FinalPaper_CodeAsControl.pdf" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See Research Paper
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">TimeDraft</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Created a Chrome extension that eliminates manual scheduling by converting Google Calendar availability into clean, ready-to-send email text with configurable date ranges, meeting durations, and timezone conversion.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">JavaScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Google OAuth 2.0</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Manifest V3</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Google Calendar API</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Service Workers</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/timedraft-chrome-extension" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
              <a 
                href="https://chromewebstore.google.com/detail/timedraft/efhedieleheodmmelckemgfjkjkgflep" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See Extension
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">EcoReviveTX</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Partnered with the Texas Parks and Wildlife Department to create a full-stack web-app supporting ecological restoration efforts in Texas, powered by simulations and machine learning.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Flask</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">JavaScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Machine Learning</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">C</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">HTML and CSS</span>
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
              <a 
                href="https://ecorevive-tx.vercel.app/"
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See Website
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">StatSwish</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Engineered an NBA analytics platform tracking 700+ players with 16,000+ stats, featuring advanced filters and AI-powered game predictions.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Java Spring Boot</span>
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
              <a 
                href="https://statswish.vercel.app/"
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See Website
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">Hornslink</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Rebuilt Hornslink, UT’s premier student org platform, from scratch using React Native and Flask for 50,000+ students.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Flask</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React Native and Expo</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">PostgreSQL</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AWS</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/HerdUp"
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
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">Personal Website</h3>
            </div>
            <p className="text-gray-400 mb-4">
              This site! Built using Next.js and Tailwind CSS.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Next.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Tailwind CSS</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/personal-website"
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
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">
                Inner Speech Recognition Brain-Computer Interface & Integrated Machine Learning Model to Assist Differently Abled and Neuromuscular Disorder Patients in Home Automation</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Co-authored an award-winning research paper on a Brain-Computer Interface for simple home automation.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Machine Learning</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Scikit-learn</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">BCI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">EEG</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Feature Extraction</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Raspberry Pi</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/BCI-ML-Project" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
              <a 
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4836934" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See Research Paper
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">Eye-Dentify: A Nonmydriatic Retinal Imaging Tool Utilizing Biomarker Characteristics for Broad Spectrum Disease Identification via Multi-Disease Diagnosis Deep Learning Models</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Co-authored a research paper on an affordable AI-powered retinal imaging tool for multi-disease diagnosis.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Machine Learning</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Computer Vision</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TensorFlow/Keras</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">OpenCV</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Raspberry Pi</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/EyeDentify-Retinal-Imaging-ML-Project" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
              <a 
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4438594"
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See Research Paper
              </a>
            </div>
          </div>

          {/* Project*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">SafeStep</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Developed a mobile app that helps tourists and new residents find and navigate safer walking routes via custom real-time safety alerts.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React Native</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Google Maps API</span>
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
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">Self-Driving Car Simulator</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Programmed an autonomous self-driving car in the Udacity simulator that uses computer vision–based lane detection and traffic sign recognition to enable real-time vehicle navigation.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Machine Learning</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Computer Vision</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TensorFlow/Keras</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">OpenCV</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/Self-Driving-Car-Project" 
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
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-200">UT Racquetball Official Website</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Built a simple official website for the UT Racquetball team (vibe-coded in a single prompt, lol).
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Next.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Vibe Coding</span>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://github.com/AnishK05/ut-racquetball-website" 
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See More
              </a>
              <a 
                href="https://www.utracquetball.com/"
                className="inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                See Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

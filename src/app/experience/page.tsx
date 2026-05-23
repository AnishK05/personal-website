'use client';

import Link from 'next/link';
import GroupedExperienceCard from '@/components/GroupedExperienceCard';

export default function ExperiencePage() {
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

          {/* Experience */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Amazon</h3>
              <span className="text-gray-400 text-sm">May 2026 - Present</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Software Development Engineer Intern</p>
              <span className="text-gray-400 text-sm">Seattle, WA</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Business Payments Onboarding | Summer 2026</span>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">IBM (Hashicorp)</h3>
              <span className="text-gray-400 text-sm">February 2026 - May 2026</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Software Development Engineer Intern</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Owned the end-to-end development of a 10,000 line production Golang collector service for cloud observability using AWS SQS/SNS</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Architected a distributed collector/core infrastructure powering incident-management workflows for 10,000+ engineers</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Resolved a SEV-1 Terraform outage, mitigating $1M+ in operational risk by fixing frontend regressions bypassing CI/CD</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Golang</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AWS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">JavaScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">CI/CD</span>
            </div>
          </div>

          {/* Experience */}
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

          {/* Experience */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">RobIn: Robot Interactive Intelligence Lab @ University of Texas at Austin</h3>
              <span className="text-gray-400 text-sm">Jan 2025 - Dec 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">ML + Robotics Undergraduate Researcher</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Engineered a Dockerized robotics control system in which an AI agent autonomously generates and validates low-level Python motion policies for robotic arms in real time</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Implemented a sandboxed ROS execution layer that safely executes agent-generated policies, enabling on-the-fly policy execution for unseen tasks</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Agentic AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Tool Calling</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Robot Operating System (ROS)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Docker</span>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">HeyEVA</h3>
              <span className="text-gray-400 text-sm">Oct 2024 - Aug 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Co-Founder & Chief Technology Officer</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Launched an agentic AI assistant for less tech savvy users; 15 enterprise partners, $250,000 awarded in data credits, and $25,000 won in pitch competitions</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Engineered an autonomous, screen-aware mobile agent interpreting live UI state for real-time, step-by-step voice guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Designed the agent runtime coordinating screen perception, LLM tool-calling, and voice I/O using Swift/Java, FastAPI, AWS, and PostgreSQL</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Agentic AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Tool Calling</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Swift</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Java</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">FastAPI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AWS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">PostgreSQL</span>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Anvil Labs</h3>
              <span className="text-gray-400 text-sm">May 2025 - Aug 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Software Engineer Intern</p>
              <span className="text-gray-400 text-sm">New York, NY</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Engineered Python + React systems transforming drone imagery into interactive 3D inspection models for site managers</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Architected AWS Lambda/S3 pipelines processing 5M+ drone images per client for large-scale infrastructure analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Developed an autonomous tool-calling AI agent, reducing order-processing turnaround from 3 days to under 24 hours</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AWS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Agentic AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Tool Calling</span>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Embedded Machine Learning Lab @ University of Texas at Dallas</h3>
              <span className="text-gray-400 text-sm">Jun 2023 - Aug 2024</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">High School Research Intern</p>
              <span className="text-gray-400 text-sm">Richardson, TX</span>
            </div>
            <ul className="text-gray-400 mb-4 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Developed real-time noise generation algorithms for pre-training early-stage generative image models, achieving 0.03s/frame</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Processed and vectorized ~200 clinical reports with RAG + NLP pipelines to train healthcare-tuned LLMs</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Computer Vision</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">LLMs</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">RAG</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">NLP</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

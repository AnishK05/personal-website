'use client';

import Link from 'next/link';

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
          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Software Engineer Intern</h3>
              <span className="text-gray-400 text-sm">May 2025 - Aug 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Anvil Labs</p>
              <span className="text-gray-400 text-sm">New York, NY</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Engineered tools with Python, GDAL, and Cesium to transform imagery from Anvil Labs&apos; autonomous drone fleet into 3D models for construction and defense site monitoring</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Built backend APIs and React.js frontend features to automate hosting, visualization, and sharing of 100+ site models</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Deployed AWS Lambda and S3 pipelines to automate drone image processing, scaling to millions of files per client</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Developed an in-house AI agent with Python and OpenAI APIs to manage client order details, cutting order finalization timelines from several days to under 24 hours</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Django REST Framework</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React.js</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">OpenAI API</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AWS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">API Development</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Co-Founder & Chief Technology Officer</h3>
              <span className="text-gray-400 text-sm">Oct 2024 - Aug 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">HeyEVA</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Built an agentic AI mobile assistant for less tech savvy users; 15 enterprise partners, $250,000 awarded in data credits, $25,000 won in pitch competitions</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Engineered multimodal system delivering stepwise guidance by combining screen context & voice I/O with Gemini LLM</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Developed a Python FastAPI backend deployed on AWS EC2, with Google OAuth and cloud-hosted Postgres databases</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Agentic AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">MCP & Tool Calling</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">FastAPI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Gemini LLM API</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AWS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">PostgresSQL</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Swift & Java (Mobile Dev)</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">ML + Robotics Undergraduate Researcher @ RobIn Lab</h3>
              <span className="text-gray-400 text-sm">Jan 2025 - Dec 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">RobIn Robot Interactive Intelligence Lab</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Engineered a Dockerized control system in which an LLM autonomously generates, validates, and executes low-level Python motion policies for robotic arms in real time</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Implemented a sandboxed ROS/MoveIt execution layer that safely executes newly generated policies, enabling on-the-fly handling of unseen tasks</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">LLM Code Generation</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">ROS</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">MoveIt</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Docker</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Software Lead and Software Engineer</h3>
              <span className="text-gray-400 text-sm">Jan 2025 - Dec 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Hornslink Mobile App (In Collaboration with UT Austin)</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Led all technical endeavors to rebuild and launch Hornslink, UT&apos;s premier student org platform, from scratch using React Native and Flask for 50,000+ students</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Scraped data from 3,000+ clubs via Selenium to populate the platform’s database and support ML personalizations</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Flask</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React Native and Expo</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AWS</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">High School Research Intern</h3>
              <span className="text-gray-400 text-sm">Jun 2023 - Aug 2024</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Embedded Machine Learning Lab @ University of Texas at Dallas</p>
              <span className="text-gray-400 text-sm">Richardson, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Developed real-time noise generation algorithms for pre-training early-stage generative image models, achieving 0.03s/frame</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Processed and vectorized ~200 clinical reports with RAG + NLP pipelines to train early-stage healthcare-tuned LLMs</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Computer Vision</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">RAG</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">NLP</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">LLMs</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

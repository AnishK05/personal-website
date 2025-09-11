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
              <h3 className="text-xl font-semibold text-gray-200">Co-Founder & Chief Technology Officer</h3>
              <span className="text-gray-400 text-sm">Nov 2024 - Present</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">HeyEVA</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Building an agentic AI for less tech savvy users; beta testing in independent living facilities</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Over $250,000 awarded in data credits, $15,000 won in pitch competitions, and 15 enterprise partners</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Agentic AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AI</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Software Project Management</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">ML + Robotics Researcher (Undergraduate)</h3>
              <span className="text-gray-400 text-sm">Jan 2025 - Present</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">RobIn Robot Interactive Intelligence Lab</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Developing LLM-based control system where robotic arms autonomously generate code to perform novel real-time tasks</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Designing containerized execution layer with ROS/MoveIt and Docker to safely deploy autonomous robot programs</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Robot Operating System (ROS)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Large Language Models (LLMs)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Docker</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Robotics</span>
            </div>
          </div>

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
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Amazon Web Services (AWS)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">API Development</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">LLM Training (Contract)</h3>
              <span className="text-gray-400 text-sm">Jul 2025 - Aug 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Uber</p>
              <span className="text-gray-400 text-sm">Dallas, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Developed Python scripts to preprocess, normalize, and format audio/text data into scalable LLM datasets</span>
               </li>
               <li className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>Implemented validation routines using regex and schema checks to enforce data integrity and training pipeline compatibility</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Natural Language Processing (NLP)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Pandas</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Large Language Models (LLMs)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">AI</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Software Engineer</h3>
              <span className="text-gray-400 text-sm">Jan 2025 - May 2025</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-gray-300 font-medium">Hornslink (In Collaboration with UT Austin)</p>
              <span className="text-gray-400 text-sm">Austin, TX</span>
            </div>
              <ul className="text-gray-400 mb-4 space-y-1">
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Rebuilt Hornslink, UT&apos;s premier student org platform, from scratch using React Native and Flask for 50,000+ students</span>
               </li>
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Via Texas Convergent</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Typescript</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Flask</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">React Native</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Mobile Development</span>
            </div>
          </div>

          {/* Experience*/}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Research Intern</h3>
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
               <li className="flex items-start">
                 <span className="text-gray-500 mr-2">•</span>
                 <span>Conducted research under Dr. Kehtarnavaz and Dr. Esau Hervert Hernandez</span>
               </li>
             </ul>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Machine Learning</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Retrival Augmented Generation (RAG)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Natural Language Processing (NLP)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Large Language Models (LLMs)</span>
              <span className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm">Computer Vision</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

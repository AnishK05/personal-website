'use client';

import Link from 'next/link';

export default function SkillsPage() {
  return (
    <div className="min-h-screen text-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mt-8 mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back to Chat with Anish
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Languages */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Languages</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Python</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Java</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">TypeScript</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">JavaScript</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">SQL</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Swift</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">C</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">HTML5</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">SCSS</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">CSS3</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">MATLAB</span>
            </div>
          </div>

          {/* Frameworks and Libraries */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Frameworks & Libraries</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Next.js</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">React.js</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">React Native</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">FastAPI</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Flask</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Node.js</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Django REST</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Spring Boot</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Tailwind CSS</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">jQuery</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Jupyter</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Docker</span>
            </div>
          </div>

          {/* Database & Cloud */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Database & Cloud</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">PostgreSQL</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Supabase</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Firebase</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Amazon Web Services (AWS)</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Google Cloud Platform (GCP)</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Vercel</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Render</span>
            </div>
          </div>

          {/* AI + Analytics */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">AI + Analytics</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Google Gemini & OpenAI APIs</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Claude</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Retrieval Augmented Generation (RAG)</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Chain of Thought</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Voice-First AI Systems</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">PostHog</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Google Analytics</span>
            </div>
          </div>

          {/* Machine Learning */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Machine Learning</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">TensorFlow</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Keras</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">OpenCV</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Scikit Learn</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">NLTK</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Selenium</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Beautiful Soup</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">NumPy</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Pandas</span>
            </div>
          </div>

          {/* Development Tools */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Development Tools</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Git</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Linux</span>
              <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">Ubuntu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mt-8 mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back to Chat with Anish
          </Link>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {/* Languages */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600">
            <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">Languages</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Python</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Java</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">TypeScript</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">JavaScript</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">SQL</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Swift</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">C</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">HTML5</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">SCSS</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">CSS3</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">MATLAB</span>
            </div>
          </div>

          {/* Frameworks and Libraries */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600">
            <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">Frameworks & Libraries</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Next.js</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">React.js</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">React Native</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">FastAPI</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Flask</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Django REST</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Spring Boot</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Tailwind CSS</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">jQuery</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Jupyter</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Docker</span>
            </div>
          </div>

          {/* Database & Cloud */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600">
            <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">Database & Cloud</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">PostgreSQL</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Supabase</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Firebase</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Amazon Web Services (AWS)</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Google Cloud Platform (GCP)</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Vercel</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Render</span>
            </div>
          </div>

          {/* AI + Analytics */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600">
            <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">AI + Analytics</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Google Gemini & OpenAI APIs</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Claude</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Retrieval Augmented Generation (RAG)</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Chain of Thought</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Voice-First AI Systems</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">PostHog</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Google Analytics</span>
            </div>
          </div>

          {/* Machine Learning */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600">
            <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">Machine Learning</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">TensorFlow</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Keras</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">OpenCV</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Scikit Learn</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">NLTK</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Selenium</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Beautiful Soup</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">NumPy</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Pandas</span>
            </div>
          </div>

          {/* Development Tools */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600">
            <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">Development Tools</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Git</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Linux</span>
              <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full border border-gray-600">Ubuntu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

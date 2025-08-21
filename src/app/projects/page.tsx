'use client';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
                 <h1 className="text-3xl font-bold mb-8">My Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Project Name 1</h3>
            <p className="text-gray-400 mb-4">
              Brief description of your first project. What it does, what technologies you used, 
              and what you learned from building it.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">MongoDB</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Project Name 2</h3>
            <p className="text-gray-400 mb-4">
              Brief description of your second project. What it does, what technologies you used, 
              and what you learned from building it.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Next.js</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Tailwind</span>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Project Name 3</h3>
            <p className="text-gray-400 mb-4">
              Brief description of your third project. What it does, what technologies you used, 
              and what you learned from building it.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Django</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">PostgreSQL</span>
            </div>
          </div>

          {/* Project 4 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-200">Project Name 4</h3>
            <p className="text-gray-400 mb-4">
              Brief description of your fourth project. What it does, what technologies you used, 
              and what you learned from building it.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Mobile</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">React Native</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Firebase</span>
            </div>
          </div>
        </div>

                   <div className="mt-8">
             <a 
               href="/" 
               className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors"
             >
               ← Back to Chat with Anish
             </a>
           </div>
      </div>
    </div>
  );
}

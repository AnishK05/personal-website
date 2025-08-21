'use client';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
                 <h1 className="text-3xl font-bold mb-8">My Work Experience</h1>
        
        <div className="space-y-8">
          {/* Experience 1 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Senior Software Engineer</h3>
              <span className="text-gray-400 text-sm">2022 - Present</span>
            </div>
            <p className="text-gray-300 font-medium mb-2">Company Name</p>
            <p className="text-gray-400 mb-4">
              Brief description of your role, responsibilities, and key achievements. 
              What technologies you worked with, what projects you led, and what impact you had.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">AWS</span>
            </div>
          </div>

          {/* Experience 2 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Full Stack Developer</h3>
              <span className="text-gray-400 text-sm">2020 - 2022</span>
            </div>
            <p className="text-gray-300 font-medium mb-2">Company Name</p>
            <p className="text-gray-400 mb-4">
              Brief description of your role, responsibilities, and key achievements. 
              What technologies you worked with, what projects you led, and what impact you had.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Vue.js</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Python</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Docker</span>
            </div>
          </div>

          {/* Experience 3 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Junior Developer</h3>
              <span className="text-gray-400 text-sm">2018 - 2020</span>
            </div>
            <p className="text-gray-300 font-medium mb-2">Company Name</p>
            <p className="text-gray-400 mb-4">
              Brief description of your role, responsibilities, and key achievements. 
              What technologies you worked with, what projects you led, and what impact you had.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">HTML/CSS</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">PHP</span>
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

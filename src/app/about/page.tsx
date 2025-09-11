/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';

export default function AboutPage() {
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
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Box */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Name</p>
                  <p className="text-gray-200 font-medium">Anish Kalra</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <a 
                    href="mailto:anishkalra05@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    anishkalra05@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/kalra-anish/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    linkedin.com/in/kalra-anish
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">GitHub</p>
                  <a 
                    href="https://github.com/AnishK05" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    github.com/AnishK05
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <p className="text-gray-200">+1 (214) 903-2916</p>
                </div>
              </div>
            </div>
          </div>

                                           {/* Photo Area */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70 shadow-lg h-full flex items-center justify-center overflow-hidden">
                <img 
                   src="/AnishKalra.jpg" 
                   alt="Anish Kalra" 
                   className="w-full h-full object-cover rounded-lg"
                   style={{ objectPosition: '40% 50%' }}
                 />
              </div>
            </div>

          {/* Interests & Hobbies */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70 shadow-lg h-full">
              <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Interests</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-200">Software Engineering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-200">AI/ML & Agentic AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-200">Robotics</span>
                </div>
              </div>
              
              <div className="border-t border-gray-600/70 pt-4">
                <h4 className="text-lg font-semibold mb-3 text-gray-200">Hobbies</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-200">Hiking & Outdoors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-200">Basketball & Pickleball</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-200">Food</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="mt-12">
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">Awards</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-200 font-semibold">Guinness World Record Holder</p>
                  <p className="text-gray-400 text-sm">Recognized as 1/1,000 authors published in the largest book ever, &quot;I am Texas&quot;  (11 feet, 496 pounds)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-200 font-semibold">Pitch Competitions</p>
                  <p className="text-gray-400 text-sm">Awarded $250,000 in data credits; secured $15,000+ in pitch competitions; currently a finalist in a $100,000 national challenge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

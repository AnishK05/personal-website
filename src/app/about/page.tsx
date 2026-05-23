/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const carouselImages = [
  { src: '/AnishKalraNature.jpg',    alt: 'Anish Kalra in nature' },
  { src: '/AnishKalraPointing.png',  alt: 'Anish Kalra pointing' },
];

export default function AboutPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

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
            <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70 h-full">
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

          {/* Photo Carousel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/70 backdrop-blur-md rounded-lg border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70 h-full relative overflow-hidden">
              {carouselImages.map((img, idx) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-700 ${
                    idx === current ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
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
                  <span className="text-gray-200">Agentic AI & AI/ML</span>
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
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-200">Hiking, Outdoors, and Gardening</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-200">Basketball, Volleyball, and Pickleball</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-200">Acting, Comedy, and Improv</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-200">Food</span>
                  </div>
             
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-8">
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70">
            <h3 className="text-xl font-bold mb-6 text-gray-100 border-b border-gray-600/70 pb-2">Education</h3>
            <div className="space-y-6">

              {/* UT Austin — BS Computer Science */}
              <div className="pb-6 border-b border-gray-700/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <p className="text-gray-200 font-semibold">The University of Texas at Austin</p>
                </div>
                <p className="text-gray-300 text-sm mb-3">Bachelor of Science - Computer Science</p>
                <p className="text-gray-400 text-sm mb-2">
                  <span className="text-gray-300 font-medium">Activities: </span>
                  Texas Convergent, TA for CS 109 (Think Lab), Comedy and Improv, IM Basketball
                </p>
                <p className="text-gray-400 text-sm mb-2 font-medium">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Software Engineering', 'Cloud Computing', 'Operating Systems', 'Machine Learning',
                    'Robotics', 'Data Warehousing', 'Computer Architecture', 'Advanced Algorithms',
                    'Data Structures & Algorithms', 'AI in Storytelling', 'Discrete Math',
                    'Linear Algebra', 'Probability & Statistics', 'Multivariable Calculus',
                  ].map((course) => (
                    <span key={course} className="bg-gray-700/70 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-600/70 backdrop-blur-sm">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* UT Austin — Minor Business */}
              <div className="pb-6 border-b border-gray-700/50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <p className="text-gray-200 font-semibold">The University of Texas at Austin</p>
                </div>
                <p className="text-gray-300 text-sm mb-3">Minor - Business</p>
                <p className="text-gray-400 text-sm mb-2 font-medium">Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Accounting', 'Management Information Sciences (MIS)', 'Marketing',
                    'Legal Environment of Business (LEB)',
                  ].map((course) => (
                    <span key={course} className="bg-gray-700/70 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-600/70 backdrop-blur-sm">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Coppell High School */}
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <p className="text-gray-200 font-semibold">Coppell High School</p>
                  <span className="text-gray-400 text-sm">Aug 2020 – May 2024</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">Class Rank: 7/976</p>
                <p className="text-gray-400 text-sm mb-2">
                  <span className="text-gray-300 font-medium">Activities: </span>
                  20 AP/IB Classes, Regeneron International Science and Engineering Fair, Science &amp; Research Club (Founder and President), Texas Thespians (State Officer), Theatre (Officer), Technology Student Association (Officer), IB Program
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

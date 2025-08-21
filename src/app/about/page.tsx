'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Me</h1>
        
        <div className="space-y-8">
          {/* Personal Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Name</p>
                <p className="text-gray-200">Your Full Name</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-gray-200">City, Country</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-gray-200">your.email@example.com</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">LinkedIn</p>
                <p className="text-gray-200">linkedin.com/in/yourprofile</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Bio</h3>
            <p className="text-gray-300 leading-relaxed">
              I am a passionate and experienced software developer with a strong foundation in modern web technologies. 
              I love building innovative solutions that solve real-world problems and continuously learning new technologies 
              to stay at the forefront of software development.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              With several years of experience in both frontend and backend development, I specialize in creating 
              scalable, user-friendly applications using cutting-edge technologies. I enjoy collaborating with teams, 
              mentoring junior developers, and contributing to open-source projects.
            </p>
          </div>

          {/* Education */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Education</h3>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-200">Bachelor of Computer Science</h4>
                  <p className="text-gray-400">University Name</p>
                </div>
                <span className="text-gray-400 text-sm">2018 - 2022</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-200">High School Diploma</h4>
                  <p className="text-gray-400">High School Name</p>
                </div>
                <span className="text-gray-400 text-sm">2014 - 2018</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Interests & Hobbies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <span className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-center">Technology</span>
              <span className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-center">Open Source</span>
              <span className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-center">Reading</span>
              <span className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-center">Travel</span>
              <span className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-center">Photography</span>
              <span className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-center">Music</span>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Career Goals</h3>
            <p className="text-gray-300 leading-relaxed">
              I am passionate about advancing my career in software development and technology leadership. 
              My goals include becoming a technical architect, contributing to innovative projects that make 
              a positive impact, and helping to mentor the next generation of developers.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back to Chat
          </a>
        </div>
      </div>
    </div>
  );
}

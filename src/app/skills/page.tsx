'use client';

import Link from 'next/link';

const SKILL_GROUPS: { title: string; skills: string[] }[] = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'Go', 'SQL', 'Swift', 'C', 'HTML/CSS'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      'Next.js',
      'React.js',
      'React Native',
      'FastAPI',
      'Flask',
      'Spring Boot',
      'Node.js',
      'Tailwind CSS',
      'Robot Operating System (ROS)',
    ],
  },
  {
    title: 'Data and Infra',
    skills: [
      'AWS Lambda',
      'Amazon EC2',
      'Amazon S3',
      'Amazon CloudFront',
      'Amazon CloudWatch',
      'Amazon SQS',
      'Amazon SNS',
      'Amazon Aurora',
      'API Gateways',
      'Infrastructure as code (IaC)',
      'gRPC',
      'Apache Kafka',
      'Redis',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'Prometheus',
      'Apache Arrow',
      'Apache Parquet',
    ],
  },
  {
    title: 'Database & Cloud',
    skills: [
      'Amazon Web Services (AWS)',
      'Google Cloud Platform (GCP)',
      'Supabase',
      'Firebase',
      'Vercel',
    ],
  },
  {
    title: 'AI & ML',
    skills: [
      'Agentic AI',
      'Retrieval Augmented Generation (RAG)',
      'Tool Calling',
      'Model Context Protocol (MCP)',
      'TensorFlow',
      'Keras',
      'OpenCV',
      'Computer Vision',
      'NumPy',
      'Pandas',
    ],
  },
  {
    title: 'Development Tools',
    skills: ['Git', 'Linux', 'CI/CD', 'Postman', 'Posthog'],
  },
];

function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full border border-gray-600/70 backdrop-blur-sm">
      {skill}
    </span>
  );
}

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
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-700/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-600/70"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 border-b border-gray-600/70 pb-2">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {group.skills.map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import ExperienceBulletText from '@/components/ExperienceBulletText';

interface ExperienceCardProps {
  company: string;
  title: string;
  dateRange: string;
  location: string;
  bullets: string[];
  skills?: string[];
}

export default function ExperienceCard({
  company,
  title,
  dateRange,
  location,
  bullets,
  skills,
}: ExperienceCardProps) {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-200">{company}</h3>
        <span className="text-gray-400 text-sm">{dateRange}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <p className="text-gray-300 font-medium">{title}</p>
        <span className="text-gray-400 text-sm">{location}</span>
      </div>
      <ul className="text-gray-400 mb-4 space-y-1">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start">
            <span className="text-gray-500 mr-2">•</span>
            <ExperienceBulletText text={bullet} />
          </li>
        ))}
      </ul>
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

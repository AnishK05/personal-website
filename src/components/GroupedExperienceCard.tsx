'use client';

export interface ExperienceRole {
  title: string;
  dateRange: string;
  bullets: string[];
  skills?: string[];
}

export interface GroupedExperienceCardProps {
  company: string;
  location: string;
  roles: ExperienceRole[];
}

function SkillPills({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default function GroupedExperienceCard({
  company,
  location,
  roles,
}: GroupedExperienceCardProps) {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
      {/* Company header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
        <h3 className="text-xl font-semibold text-gray-200">{company}</h3>
        <span className="text-gray-400 text-sm">{location}</span>
      </div>

      {/* Roles timeline */}
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gray-600" />

        <div className="space-y-7">
          {roles.map((role, idx) => (
            <div key={idx} className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute left-0 top-[6px] w-[11px] h-[11px] rounded-full bg-gray-500 border-2 border-gray-400" />

              {/* Role header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <p className="text-gray-200 font-medium">{role.title}</p>
                <span className="text-gray-400 text-sm">{role.dateRange}</span>
              </div>

              {/* Bullets */}
              <ul className="text-gray-400 space-y-1">
                {role.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start">
                    <span className="text-gray-500 mr-2 mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Skills */}
              {role.skills && role.skills.length > 0 && (
                <SkillPills skills={role.skills} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

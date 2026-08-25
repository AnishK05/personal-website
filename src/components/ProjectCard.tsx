import type { Project } from '@/lib/projects';

function ExternalIcon() {
  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

const linkClassName =
  'inline-flex items-center px-3 py-1.5 bg-gray-600/80 text-gray-200 rounded-lg hover:bg-gray-500/80 transition-colors text-xs font-medium backdrop-blur-sm';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-6 border border-gray-700/70">
      <div className="mb-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-xl font-semibold text-gray-200">{project.title}</h3>
          <span className="text-gray-400 text-sm shrink-0">{project.dateRange}</span>
        </div>
        {(project.associated || project.badge) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.associated && (
              <span className="px-2 py-0.5 bg-gray-700/80 text-gray-200 rounded-full text-xs font-semibold backdrop-blur-sm inline-block border border-gray-500/40">
                Associated with Experience
              </span>
            )}
            {project.badge && (
              <span className="px-2 py-0.5 bg-cyan-700/80 text-cyan-100 rounded-full text-xs font-semibold backdrop-blur-sm inline-block border border-cyan-400/30 shadow-sm">
                {project.badge}
              </span>
            )}
          </div>
        )}
      </div>
      <p className="text-gray-400 mb-4">{project.description}</p>
      {project.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-700/70 text-gray-300 rounded-full text-sm backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      {project.links.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {project.links.map((link) =>
            link.tooltip ? (
              <div key={link.label} className="relative group">
                {link.href ? (
                  <a
                    href={link.href}
                    className={linkClassName}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalIcon />
                    {link.label}
                  </a>
                ) : (
                  <button type="button" className={linkClassName}>
                    <ExternalIcon />
                    {link.label}
                  </button>
                )}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-6 py-3 bg-gray-900/90 text-gray-100 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-normal min-w-[320px] max-w-xl z-10 backdrop-blur-md break-words text-center">
                  {link.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90" />
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={linkClassName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

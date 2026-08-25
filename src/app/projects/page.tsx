'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import ProjectSortPicker from '@/components/ProjectSortPicker';
import { projects, sortProjects, type ProjectSort } from '@/lib/projects';

export default function ProjectsPage() {
  const [sort, setSort] = useState<ProjectSort>('relevancy');
  const sortedProjects = useMemo(() => sortProjects(projects, sort), [sort]);

  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mt-8 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back to Chat with Anish
          </Link>
          <ProjectSortPicker current={sort} onChange={setSort} />
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-100 border-b border-gray-600/70 pb-3 mb-6">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

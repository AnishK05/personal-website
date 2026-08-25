'use client';

import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ExperienceCard from '@/components/ExperienceCard';
import ExperienceViewPicker from '@/components/ExperienceViewPicker';
import GroupedExperienceCard from '@/components/GroupedExperienceCard';
import { experiences } from '@/lib/experiences';
import {
  DEFAULT_EXPERIENCE_VIEW,
  EXPERIENCE_VIEW_PARAM,
  isExperienceView,
  parseExperienceView,
  type ExperienceView,
} from '@/lib/experienceViews';

function ExperienceContent({ view }: { view: ExperienceView }) {
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
          <ExperienceViewPicker current={view} />
        </div>

        <div className="space-y-8">
          {experiences.map((experience) =>
            experience.type === 'grouped' ? (
              <GroupedExperienceCard
                key={experience.company}
                company={experience.company}
                location={experience.location}
                roles={experience.roles.map((role) => ({
                  title: role.title,
                  dateRange: role.dateRange,
                  bullets: role.bullets[view],
                  skills: role.skills?.[view],
                }))}
              />
            ) : (
              <ExperienceCard
                key={experience.company}
                company={experience.company}
                title={experience.title}
                dateRange={experience.dateRange}
                location={experience.location}
                bullets={experience.bullets[view]}
                skills={experience.skills?.[view]}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function ExperiencePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawView = searchParams.get(EXPERIENCE_VIEW_PARAM);
  const view = parseExperienceView(rawView);

  useEffect(() => {
    if (!isExperienceView(rawView)) {
      router.replace(`/experience?${EXPERIENCE_VIEW_PARAM}=${DEFAULT_EXPERIENCE_VIEW}`, {
        scroll: false,
      });
    }
  }, [rawView, router]);

  return <ExperienceContent view={view} />;
}

export default function ExperiencePage() {
  return (
    <Suspense fallback={<ExperienceContent view={DEFAULT_EXPERIENCE_VIEW} />}>
      <ExperiencePageInner />
    </Suspense>
  );
}

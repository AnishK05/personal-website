import Link from 'next/link';
import {
  EXPERIENCE_VIEW_OPTIONS,
  EXPERIENCE_VIEW_PARAM,
  type ExperienceView,
} from '@/lib/experienceViews';
import { cn } from '@/lib/utils';

export default function ExperienceViewPicker({ current }: { current: ExperienceView }) {
  return (
    <div
      role="radiogroup"
      aria-label="Experience writing style"
      className="inline-flex w-full sm:w-auto rounded-lg border border-gray-700/70 bg-gray-800/70 p-1 backdrop-blur-md"
    >
      {EXPERIENCE_VIEW_OPTIONS.map((option) => {
        const selected = current === option.id;
        return (
          <Link
            key={option.id}
            href={`/experience?${EXPERIENCE_VIEW_PARAM}=${option.id}`}
            replace
            scroll={false}
            role="radio"
            aria-checked={selected}
            className={cn(
              'flex-1 sm:flex-none text-center px-3 py-1.5 text-sm rounded-md transition-colors',
              selected
                ? 'bg-gray-600/80 text-gray-100'
                : 'text-gray-400 hover:text-gray-200'
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}

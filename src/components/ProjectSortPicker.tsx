import { PROJECT_SORT_OPTIONS, type ProjectSort } from '@/lib/projects';
import { cn } from '@/lib/utils';

export default function ProjectSortPicker({
  current,
  onChange,
}: {
  current: ProjectSort;
  onChange: (sort: ProjectSort) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Project sort"
      className="inline-flex w-full sm:w-auto rounded-lg border border-gray-700/70 bg-gray-800/70 p-1 backdrop-blur-md"
    >
      {PROJECT_SORT_OPTIONS.map((option) => {
        const selected = current === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              'flex-1 sm:flex-none text-center px-3 py-1.5 text-sm rounded-md transition-colors',
              selected ? 'bg-gray-600/80 text-gray-100' : 'text-gray-400 hover:text-gray-200'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

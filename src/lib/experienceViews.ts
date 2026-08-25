export const EXPERIENCE_VIEW_PARAM = 'view';

export const EXPERIENCE_VIEWS = ['technical', 'balanced', 'story-time'] as const;

export type ExperienceView = (typeof EXPERIENCE_VIEWS)[number];

export const DEFAULT_EXPERIENCE_VIEW: ExperienceView = 'technical';

export const EXPERIENCE_VIEW_OPTIONS: { id: ExperienceView; label: string }[] = [
  { id: 'technical', label: 'Technical' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'story-time', label: 'Story Time' },
];

export function isExperienceView(value: string | null | undefined): value is ExperienceView {
  return EXPERIENCE_VIEWS.includes(value as ExperienceView);
}

export function parseExperienceView(
  value: string | string[] | undefined
): ExperienceView {
  const raw = Array.isArray(value) ? value[0] : value;
  return isExperienceView(raw) ? raw : DEFAULT_EXPERIENCE_VIEW;
}

export type ProjectLink = {
  label: string;
  href?: string;
  tooltip?: string;
};

export type ProjectMonth = { year: number; month: number };

export type Project = {
  id: string;
  title: string;
  dateRange: string;
  start: ProjectMonth;
  end: ProjectMonth | 'present';
  description: string;
  skills: string[];
  links: ProjectLink[];
  badge?: string;
  associated?: boolean;
};

export type ProjectSort = 'relevancy' | 'date';

export const PROJECT_SORT_OPTIONS: { id: ProjectSort; label: string }[] = [
  { id: 'relevancy', label: 'Relevancy' },
  { id: 'date', label: 'Date' },
];

/** All projects, in relevancy order. */
export const projects: Project[] = [
  {
    id: 'arbiter',
    title: 'Arbiter: Distributed Scheduler',
    dateRange: 'Jul 2026',
    start: { year: 2026, month: 7 },
    end: { year: 2026, month: 7 },
    description:
      'Built a cluster scheduler sustaining 500+ concurrent tasks across 10 nodes via leader-elected coordination, heartbeat-based failure detection with sub-3s failover, bin-packing allocation, and automatic task reassignment.',
    skills: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Docker', 'Prometheus'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/arbiter-distributed-scheduler' }],
  },
  {
    id: 'pulse',
    title: 'Pulse: Event Platform',
    dateRange: 'Jan 2026',
    start: { year: 2026, month: 1 },
    end: { year: 2026, month: 1 },
    description:
      'Implemented a multi-tenant, developer-facing event ingestion and processing platform sustaining 10,000 RPS, with API-key auth, rate-limited and idempotent intake, asynchronous pipelines, dead-letter isolation, and observability.',
    skills: ['Spring Boot', 'Go', 'Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Next.js', 'Python'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/pulse-event-platform' }],
  },
  {
    id: 'cascade',
    title: 'Cascade: Real-Time Feed Ranking Engine',
    dateRange: 'Jul 2026',
    start: { year: 2026, month: 7 },
    end: { year: 2026, month: 7 },
    description:
      'Engineered a Go and gRPC fanout-on-write feed-ranking service generating personalized timelines for 50,000+ simulated users, then added a Redis caching layer that cut database read load 80% while sustaining 8,000+ requests/sec.',
    skills: ['Go', 'gRPC', 'Kafka', 'Redis', 'PostgreSQL', 'Docker'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/cascade-feed-ranking-engine' }],
  },
  {
    id: 'prism',
    title: 'Prism: Columnar Analytics Engine',
    dateRange: 'Aug 2026',
    start: { year: 2026, month: 8 },
    end: { year: 2026, month: 8 },
    description:
      'Architected a vectorized, single-node OLAP engine in Go querying Parquet via Apache Arrow, with predicate pushdown, column pruning, and row-group skipping, sustaining 100M+ rows/query at 10x a row-at-a-time baseline.',
    skills: ['Go', 'Apache Arrow', 'Apache Parquet'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/prism-columnar-analytics-engine' }],
  },
  {
    id: 'flux',
    title: 'Flux: LLM Inference Engine',
    dateRange: 'Aug 2026',
    start: { year: 2026, month: 8 },
    end: { year: 2026, month: 8 },
    description: 'In progress.',
    skills: [],
    links: [],
  },
  {
    id: 'code-as-control',
    title: 'Code as Control',
    dateRange: 'Sep 2025 - Dec 2025',
    start: { year: 2025, month: 9 },
    end: { year: 2025, month: 12 },
    description:
      'Developed a Dockerized robotics control system that gives an AI agent full control of a robotic arm: the agent generates, validates, and executes low-level Python motion policies in a sandboxed ROS layer, using only minimal motion APIs (no skill library or demos) so it can handle unseen tasks in one continuous loop.',
    skills: ['Agentic AI', 'Python', 'Robot Operating System (ROS)', 'Docker'],
    links: [
      { label: 'See More', href: 'https://github.com/AnishK05/code-as-control' },
      {
        label: 'See Research Paper',
        href: 'https://github.com/AnishK05/code-as-control/blob/main/FinalPaper_CodeAsControl.pdf',
      },
    ],
    badge: 'Research Project',
    associated: true,
  },
  {
    id: 'hornslink',
    title: 'Hornslink',
    dateRange: 'Jan 2025 - Dec 2025',
    start: { year: 2025, month: 1 },
    end: { year: 2025, month: 12 },
    description:
      'Rebuilt Hornslink from scratch using React Native and Flask in direct collaboration with UT Austin, modernizing the application used by 50,000+ students to discover campus opportunities.',
    skills: ['Python', 'Flask', 'React Native', 'PostgreSQL', 'Amazon Aurora'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/HerdUp' }],
    associated: true,
  },
  {
    id: 'personal-site',
    title: 'Personal Website',
    dateRange: 'Always modifying...',
    start: { year: 2025, month: 9 },
    end: { year: 2025, month: 9 },
    description:
      'This site! Next.js and Tailwind CSS, featuring an AI clone of me that you can chat with to learn more about my background and work. You can also ask "me" to schedule a time for a video chat, and "I" will handle the rest!',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Agentic AI'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/personal-website' }],
  },
  {
    id: 'ai-marketing-agent',
    title: 'AI Marketing Agent',
    dateRange: 'Jul 2025',
    start: { year: 2025, month: 7 },
    end: { year: 2025, month: 7 },
    description:
      'Automated lead generation with an AI agent that uses LLM tool-calling to identify Instagram client profiles, extract emails, and run targeted outreach campaigns, achieving 2x higher conversion rates compared to industry averages.',
    skills: ['Next.js', 'TypeScript', 'Node.js', 'Agentic AI', 'Tool Calling', 'Tailwind CSS'],
    links: [
      {
        label: 'See More',
        tooltip:
          'This project is currently under acquisition by a company. Additional details are confidential during this process.',
      },
    ],
  },
  {
    id: 'txconvergent',
    title: 'Texas Convergent: Website & Portal',
    dateRange: 'Mar 2026 - Present',
    start: { year: 2026, month: 3 },
    end: { year: 2026, month: 3 },
    description:
      "Revamped the org's website in Next.js. Replaced a fragmented Google Suite workflow with an internal portal for applications, reviews, attendance, and numerous org-wide logistics.",
    skills: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    links: [
      { label: 'See Website', href: 'https://txconvergent.org' },
      { label: 'See Portal', href: 'https://portal.txconvergent.org' },
    ],
    associated: true,
  },
  {
    id: 'timedraft',
    title: 'TimeDraft',
    dateRange: 'Jan 2026',
    start: { year: 2026, month: 1 },
    end: { year: 2026, month: 1 },
    description:
      'Created a Chrome extension that eliminates manual scheduling by converting Google Calendar availability into clean, ready-to-send email text with configurable date ranges, meeting durations, and timezone conversion.',
    skills: ['JavaScript', 'Google OAuth 2.0', 'Manifest V3', 'Google Calendar API', 'Service Workers'],
    links: [
      { label: 'See More', href: 'https://github.com/AnishK05/timedraft-chrome-extension' },
      {
        label: 'See Extension',
        href: 'https://chromewebstore.google.com/detail/timedraft/efhedieleheodmmelckemgfjkjkgflep',
      },
    ],
  },
  {
    id: 'statswish',
    title: 'StatSwish',
    dateRange: 'Aug 2024',
    start: { year: 2024, month: 8 },
    end: { year: 2024, month: 8 },
    description:
      'Launched an NBA analytics platform tracking 700+ players with 16,000+ stats, featuring advanced filters and ML-powered game predictions.',
    skills: ['React.js', 'Java Spring Boot', 'Python', 'Machine Learning'],
    links: [
      { label: 'See More', href: 'https://github.com/AnishK05/StatSwish' },
      { label: 'See Website', href: 'https://statswish.vercel.app/' },
    ],
  },
  {
    id: 'ecorevive',
    title: 'EcoReviveTX',
    dateRange: 'Sep 2024',
    start: { year: 2024, month: 9 },
    end: { year: 2024, month: 9 },
    description:
      'Partnered with the Texas Parks and Wildlife Department to create a full-stack web-app supporting ecological restoration efforts in Texas, powered by simulations and machine learning.',
    skills: ['Python', 'Flask', 'JavaScript', 'Machine Learning', 'C', 'HTML and CSS'],
    links: [
      { label: 'See More', href: 'https://github.com/AnishK05/EcoReviveTX' },
      { label: 'See Website', href: 'https://ecorevive-tx.vercel.app/' },
    ],
  },
  {
    id: 'safestep',
    title: 'SafeStep',
    dateRange: 'Sep 2024 - Dec 2024',
    start: { year: 2024, month: 9 },
    end: { year: 2024, month: 12 },
    description:
      'Designed a mobile app that helps tourists and new residents find and navigate safer walking routes via custom real-time safety alerts.',
    skills: ['React Native', 'TypeScript', 'Google Maps API'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/SafeStep' }],
    associated: true,
  },
  {
    id: 'self-driving-car',
    title: 'Self-Driving Car Simulator',
    dateRange: 'Jul 2024',
    start: { year: 2024, month: 7 },
    end: { year: 2024, month: 7 },
    description:
      'Programmed an autonomous self-driving car in the Udacity simulator that uses computer vision–based lane detection and traffic sign recognition to enable real-time vehicle navigation. Still kind of gimmicky.',
    skills: ['Python', 'Machine Learning', 'Computer Vision', 'TensorFlow/Keras', 'OpenCV'],
    links: [{ label: 'See More', href: 'https://github.com/AnishK05/Self-Driving-Car-Project' }],
  },
  {
    id: 'ut-racquetball',
    title: 'UT Racquetball Official Website',
    dateRange: 'Sep 2025',
    start: { year: 2025, month: 9 },
    end: { year: 2025, month: 9 },
    description: 'Put together a simple official website for the UT Racquetball team because my friend asked me to (it is fully vibe-coded in a single prompt, lol).',
    skills: ['Next.js', 'TypeScript', 'Vibe Coding'],
    links: [
      { label: 'See More', href: 'https://github.com/AnishK05/ut-racquetball-website' },
      { label: 'See Website', href: 'https://www.utracquetball.com/' },
    ],
  },
];

function monthValue({ year, month }: ProjectMonth): number {
  return year * 12 + month;
}

function endValue(end: Project['end']): number {
  if (end === 'present') {
    const now = new Date();
    return now.getFullYear() * 12 + (now.getMonth() + 1);
  }
  return monthValue(end);
}

export function sortProjects(list: Project[], sort: ProjectSort): Project[] {
  if (sort === 'relevancy') return list;
  return [...list].sort((a, b) => {
    const endDiff = endValue(b.end) - endValue(a.end);
    if (endDiff !== 0) return endDiff;
    return monthValue(b.start) - monthValue(a.start);
  });
}

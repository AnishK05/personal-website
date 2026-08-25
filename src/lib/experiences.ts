import type { ExperienceView } from '@/lib/experienceViews';

export type CopyByView = Record<ExperienceView, string[]>;

export type SingleExperience = {
  type: 'single';
  company: string;
  title: string;
  dateRange: string;
  location: string;
  bullets: CopyByView;
  skills?: CopyByView;
};

export type GroupedExperience = {
  type: 'grouped';
  company: string;
  location: string;
  roles: {
    title: string;
    dateRange: string;
    bullets: CopyByView;
    skills?: CopyByView;
  }[];
};

export type Experience = SingleExperience | GroupedExperience;

const STORY_COMING_SOON = ['Story coming soon!'];

/** Fill all views with the same copy, optionally overriding specific views. */
function copy(defaultItems: string[], overrides?: Partial<CopyByView>): CopyByView {
  return {
    technical: overrides?.technical ?? defaultItems,
    balanced: overrides?.balanced ?? defaultItems,
    'story-time': overrides?.['story-time'] ?? STORY_COMING_SOON,
  };
}

function copySkills(defaultItems: string[]): CopyByView {
  return {
    technical: defaultItems,
    balanced: defaultItems,
    'story-time': [],
  };
}

export const experiences: Experience[] = [
  {
    type: 'single',
    company: 'Amazon',
    title: 'Software Development Engineer Intern',
    dateRange: 'May 2026 - Aug 2026',
    location: 'Seattle, WA',
    bullets: copy(
      [
        'Designed and built 2 payment widgets across 20+ Amazon Business Prime pages, eliminating 30s checkout delays for customers with hundreds of saved payment methods; cutting latency by 70%',
        'Redesigned payment lookups from sequential per-method API calls to one batched query against an Elasticsearch-backed service',
        'Designed a federated architecture (SSR, BFF Lambdas, API gateway, CDK) for independent, zero-downtime team deploys',
        'Built an agent-to-agent pipeline flagging failing integration tests, adopted by 3 teams, cutting time to prod 30%',
      ],
      {
        balanced: [
          "Designed and built 2 payment widgets for Amazon's business checkout flow, owning the full stack (frontend + backend)",
          'Reduced checkout latency by 70% for business customers with hundreds of saved payment methods',
          'Got to sit in on a lot of cool meetings, once a 45-minute debate over 10ms of latency',
          'Also built an agent-to-agent pipeline flagging failing integration tests, adopted by 3 teams',
        ],
      }
    ),
    skills: copySkills([
      'TypeScript',
      'Java',
      'Next.js',
      'Node.js',
      'Amazon Web Services (AWS)',
      'AWS Lambda',
      'Amazon CloudWatch',
      'API Gateways',
      'Infrastructure as code (IaC)',
      'Agentic AI',
    ]),
  },
  {
    type: 'single',
    company: 'IBM (Hashicorp)',
    title: 'Software Development Engineer Intern',
    dateRange: 'February 2026 - May 2026',
    location: 'Austin, TX',
    bullets: copy(
      [
        'Owned end-to-end development of a production Go service for observability using AWS SQS/SNS',
        'Engineered backend infra (core + collector service) to handle alarms and paging for 1,000+ engineers',
        'Helped resolve a SEV-1 Terraform outage, tracing a CI/CD-bypassing UI regression; VP-estimated $1M+ risk mitigated',
      ],
      {
        balanced: [
          'Owned end-to-end development of a production Go service, developing core+collector infra to handle alarms and paging for 1,000+ engineers',
          "Helped resolve a SEV-1 Terraform outage (still not sure I should've been on that call)",
          'Under HashiCorp org',
        ],
      }
    ),
    skills: copySkills(['Go', 'JavaScript', 'Amazon SQS', 'Amazon SNS', 'CI/CD']),
  },
  {
    type: 'grouped',
    company: 'Texas Convergent',
    location: 'Austin, TX',
    roles: [
      {
        title: 'President',
        dateRange: 'May 2026 - Present',
        bullets: copy(
          [
            "Lead Texas Convergent, UT Austin's largest CS and entrepreneurship organization with 150+ members and 50+ officers",
          ],
          {
            balanced: [
              "Lead Texas Convergent, UT Austin's largest CS and entrepreneurship organization with 150+ members and 50+ officers",
              'Not really sure who put me in charge',
            ],
          }
        ),
      },
      {
        title: 'Engineering Chair',
        dateRange: 'Jun 2025 - May 2026',
        bullets: copy(
          [
            'Oversaw all technical initiatives for Texas Convergent, directing curriculum and infrastructure decisions org-wide',
            "Modernized a 3-year-old curriculum around AI systems, MCP, agents, and advanced RAG; rebuilt the org's [website](https://txconvergent.org) in Next.js",
            'Replaced a fragmented Google Suite workflow with [TXConvergentPortal](https://portal.txconvergent.org), a Next.js web app handling applications, reviews, attendance, and numerous other org-wide logistics',
          ],
          {
            balanced: [
              'Oversaw all technical initiatives for Texas Convergent',
              'Modernized a 3-year-old curriculum + revamped the entire website',
              'Our google suite got too messy, so shipped an internal portal now used org-wide to handle applications, reviews, attendance, and everything in between',
            ],
          }
        ),
        skills: copySkills(['Next.js', 'TypeScript', 'Amazon Web Services (AWS)', 'PostgreSQL', 'Agentic AI']),
      },
      {
        title: 'Forge: Software Lead for REFIND (Local Austin Startup)',
        dateRange: 'Feb 2026 - Apr 2026',
        bullets: copy(
          [
            "Led an 8-member technical team in building REFIND's core product, a CRM analytics suite for in-person brand activations",
            "Architected and shipped the product's entire codebase within a 7-week startup sprint",
          ],
          {
            balanced: [
              "Delivered REFIND's entire product in 7 weeks, a full analytics suite for brand pop-up events",
              'Led an 8-person team, again made too many corny jokes',
            ],
          }
        ),
        skills: copySkills(['Next.js', 'TypeScript', 'PostgreSQL']),
      },
      {
        title: 'Forge: Software Lead and Engineer for Hornslink (Collab. with UT)',
        dateRange: 'Jan 2025 - Dec 2025',
        bullets: copy(
          [
            "Rebuilt Hornslink, UT's official student org platform, from scratch using React Native and Flask for 50,000+ students",
            'Added a Redis caching layer tuned for a 20:1 read/write ratio, cutting p95 query latency from 400ms to 90ms',
            'Directed a 12-member technical team across system architecture, database design, and scalability engineering',
          ],
          {
            balanced: [
              "Rebuilt Hornslink, UT Austin's official platform for discovering student organizations, from scratch for 50,000 students",
              'Architected the database for heavy read traffic, obsessed over every UI detail',
              'Led a 12 person team, made too many corny jokes',
            ],
          }
        ),
        skills: copySkills(['Python', 'Flask', 'React Native', 'PostgreSQL', 'Amazon Aurora']),
      },
      {
        title: 'Build Teams: Software Engineer for SafeStep',
        dateRange: 'Sep 2024 - Dec 2024',
        bullets: copy(
          [
            'Developed SafeStep, a React Native app that helps tourists and new residents find and navigate safer walking routes using Google Maps API and custom real-time safety alerts',
          ],
          {
            balanced: [
              'Developed SafeStep, a mobile app that finds safer walking routes for tourists and new residents',
            ],
          }
        ),
        skills: copySkills(['React Native', 'TypeScript']),
      },
    ],
  },
  {
    type: 'single',
    company: 'RobIn: Robot Interactive Intelligence Lab @ University of Texas at Austin',
    title: 'ML + Robotics Undergraduate Researcher',
    dateRange: 'Jan 2025 - Dec 2025',
    location: 'Austin, TX',
    bullets: copy(
      [
        'Built a harness giving an AI agent full control of a robotic arm, evaluated on a 25-trial benchmark at 90% avg. success',
        'Sandboxed agent in Dockerized ROS layer, generating + executing Python policies on unseen tasks in one continuous loop',
        'Exposed only minimal, low-level motion APIs (no skill library, no demos), forcing the model to reason about raw control',
      ],
      {
        balanced: [
          'Gave an AI agent full control over a robotic arm... surely nothing could go wrong, right?',
          'Hand it a plain English command, and the agent writes, checks, and runs the code; fully autonomous',
          '"Trace a figure eight" → the arm does it',
          'https://github.com/AnishK05/code-as-control',
        ],
      }
    ),
    skills: copySkills(['Agentic AI', 'Python', 'Robot Operating System (ROS)', 'Docker']),
  },
  {
    type: 'single',
    company: 'HeyEVA',
    title: 'Co-Founder & Chief Technology Officer',
    dateRange: 'Oct 2024 - Aug 2025',
    location: 'Austin, TX',
    bullets: copy(
      [
        'Launched an agentic AI assistant for less tech savvy users; 15 enterprise partners, $250K in data credits, $25K awards',
        'Engineered an autonomous, screen-aware mobile agent interpreting live UI state for step-by-step voice guidance',
        'Designed agent runtime coordinating LLM tool-calling and voice I/O via Swift/Java, FastAPI, AWS, and PostgreSQL',
      ],
      {
        balanced: [
          'Launched a screen-aware mobile AI assistant that guides you through any task on your phone in real time',
          'Wrote the entire codebase',
          '15 enterprise clients, $250,000 in grants/credits, and $25,000 won in pitch competitions',
        ],
      }
    ),
    skills: copySkills([
      'Agentic AI',
      'Swift',
      'Java',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Model Context Protocol (MCP)',
      'Tool Calling',
      'Amazon EC2',
    ]),
  },
  {
    type: 'single',
    company: 'Anvil Labs',
    title: 'Software Engineer Intern',
    dateRange: 'May 2025 - Aug 2025',
    location: 'New York, NY',
    bullets: copy(
      [
        'Engineered Python + React systems transforming drone imagery into interactive 3D inspection models for site managers',
        'Designed AWS Lambda/S3 pipelines processing 5M+ drone images per client for large-scale infrastructure analysis',
      ],
      {
        balanced: [
          'Built Python + React systems and AWS pipelines, turning 5M+ drone images per client into 3D inspection models',
          'Slept on a couch for 5 weeks',
        ],
      }
    ),
    skills: copySkills(['Python', 'React.js', 'Amazon S3', 'Amazon CloudFront', 'AWS Lambda']),
  },
  {
    type: 'single',
    company: 'Embedded Machine Learning Lab @ University of Texas at Dallas',
    title: 'High School Research Intern',
    dateRange: 'Jun 2023 - Aug 2024',
    location: 'Richardson, TX',
    bullets: copy(
      [
        'Developed real-time noise generation algorithms for pre-training early-stage generative image models, achieving 0.03s/frame',
      ],
      {
        balanced: [
          'Designed algorithms adding noise to images in 0.03s/frame, pre-training early generative image models',
          'Understood, on a good day, 30% of what was going on',
        ],
      }
    ),
    skills: copySkills(['Python', 'Computer Vision', 'OpenCV']),
  },
];

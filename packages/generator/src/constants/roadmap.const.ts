export interface RoadmapEntry {
  title: string
  date: string
  description: string
  delivered: boolean
  milestone: boolean
  tags: string[]
  link?: string
  route?: {
    type: 'integration' | 'usecase'
    id: string
  }
}

export enum ROADMAP_TAGS {
  CONNECTORS = 'connectors',
  EXECUTION = 'execution',
  FLOW = 'flow',
  DESIGNER = 'designer',
  LANDINGPAGE = 'landingpage',
  USECASE = 'usecase',
}

const ITEMS_2022_Q4: RoadmapEntry[] = [
  {
    title: 'Integration Details',
    date: '2022-10-12',
    description: 'Get a detailed view for each integrated connector.',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.LANDINGPAGE],
  },
  {
    title: 'Quick Search',
    date: '2022-10-14',
    description: 'Search the entire page including connectors and more.',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.LANDINGPAGE],
  },
  {
    title: 'Roadmap',
    date: '2022-10-17',
    description:
      'Roadmap for future milestones and features. Also a history of already delivered features.',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.LANDINGPAGE],
  },
  {
    title: 'UTM Parameters',
    date: '2022-10-27',
    description:
      'Finally adding UTM parameters to all links. This will help us to track where our users are coming from.',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.LANDINGPAGE],
  },
  {
    title: 'Secret and Workflow Management',
    date: '2022-11-06',
    description: 'CRUD operations for secrets and workflows.',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.EXECUTION],
  },
  {
    title: 'Refactored Model',
    date: '2022-11-09',
    description: 'Secrets and Workflow Model refactored',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.EXECUTION],
  },
  {
    title: 'Start Workflow Instances',
    date: '2022-11-12',
    description: 'Workflow Instances can be started via API.',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.EXECUTION],
  },
  {
    title: '🚀 Integrate 250 services 🚀',
    date: '2022-12-10',
    description: 'woop woop!',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.CONNECTORS],
  },
  {
    title: 'Decision Models, Kind: none',
    date: '2023-02-24',
    description:
      'Introduction of decision models for conditional flows. Furthermore: nodes do not require an http action anymore.',
    delivered: true,
    milestone: false,
    tags: [ROADMAP_TAGS.EXECUTION, ROADMAP_TAGS.FLOW],
  },
]

const FUTURE_MILESTONES: RoadmapEntry[] = [
  {
    title: '🚀 Integrate 200 services 🚀',
    date: '2022-10-26',
    description:
      "That's a major milestone since an integration of enough services gives us the ability to build a lot of interesting use cases.",
    delivered: true,
    milestone: true,
    tags: [ROADMAP_TAGS.CONNECTORS],
  },
  {
    title: '🚀 Integrate 300 services 🚀',
    date: '2023-01-26',
    description:
      "That's a major milestone since an integration of enough services gives us the ability to build a lot of interesting use cases.",
    delivered: true,
    milestone: true,
    tags: [ROADMAP_TAGS.CONNECTORS],
  },
  {
    title: 'MVP for Cloud Execution',
    date: '2022-12-31',
    description:
      'A minimal version of the cloud execution platform is available.',
    delivered: false,
    milestone: true,
    tags: [ROADMAP_TAGS.EXECUTION],
  },
  {
    title: 'MVP for Flow Designer',
    date: '2022-12-31',
    description: 'A minimal version of the flow designer is available.',
    delivered: false,
    milestone: true,
    tags: [ROADMAP_TAGS.DESIGNER],
  },
]

export const ROADMAP: RoadmapEntry[] = [...ITEMS_2022_Q4, ...FUTURE_MILESTONES]

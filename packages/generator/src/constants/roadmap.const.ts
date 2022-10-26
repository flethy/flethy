export interface RoadmapEntry {
  title: string
  date: string
  description: string
  delivered: boolean
  milestone: boolean
  tags: string[]
  link?: string
  route?: string
}

export enum ROADMAP_TAGS {
  CONNECTORS = 'connectors',
  EXECUTION = 'execution',
  FLOW = 'flow',
  DESIGNER = 'designer',
  LANDINGPAGE = 'landingpage',
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
]

const FUTURE_MILESTONES: RoadmapEntry[] = [
  {
    title: '🚀 Integrate 200 services 🚀',
    date: '2022-10-26',
    description:
      "That's a major milestone since an integration of enough services gives us the ability to build a lot of interesting use cases.",
    delivered: false,
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

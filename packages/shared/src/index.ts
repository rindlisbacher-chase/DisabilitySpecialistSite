export type ResourceType =
  | 'how-to'
  | 'idea'
  | 'presentation'
  | 'printable'
  | 'external-link'
  | 'video'

export type ResourceSetting = 'church' | 'home' | 'community'

export type DisabilityTopic =
  | 'autism'
  | 'chronic-illness'
  | 'hearing'
  | 'intellectual'
  | 'learning'
  | 'memory'
  | 'mental-health'
  | 'physical'
  | 'speech-language'
  | 'vision'
  | 'general'

export type ResourceAudience =
  | 'ward-specialist'
  | 'stake-specialist'
  | 'leaders'
  | 'families'
  | 'caregivers'

export type ResourceStatus = 'draft' | 'published'

export interface Resource {
  id: string
  title: string
  summary: string
  body?: string
  type: ResourceType
  settings: ResourceSetting[]
  topics: DisabilityTopic[]
  audiences: ResourceAudience[]
  externalUrl?: string
  contributorCredit?: string
  status: ResourceStatus
  updatedAt: string
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  'how-to': 'How-to',
  idea: 'Idea',
  presentation: 'Presentation',
  printable: 'Printable',
  'external-link': 'External link',
  video: 'Video',
}

export const SETTING_LABELS: Record<ResourceSetting, string> = {
  church: 'Church',
  home: 'Home',
  community: 'Community',
}

export const TOPIC_LABELS: Record<DisabilityTopic, string> = {
  autism: 'Autism',
  'chronic-illness': 'Chronic illness',
  hearing: 'Hearing loss & deafness',
  intellectual: 'Intellectual disability',
  learning: 'Learning disability',
  memory: 'Memory loss',
  'mental-health': 'Mental health',
  physical: 'Physical disability',
  'speech-language': 'Speech & language',
  vision: 'Vision loss & blindness',
  general: 'General',
}

export const AUDIENCE_LABELS: Record<ResourceAudience, string> = {
  'ward-specialist': 'Ward specialist',
  'stake-specialist': 'Stake specialist',
  leaders: 'Leaders',
  families: 'Families',
  caregivers: 'Caregivers',
}

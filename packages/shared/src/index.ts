export type ResourceType = 'printable' | 'presentation' | 'talk' | 'video'

export type ResourceStatus = 'draft' | 'published'

export interface Disability {
  id: string
  name: string
  description: string
  sortOrder?: number
}

export interface Audience {
  id: string
  name: string
  description?: string
  sortOrder?: number
}

export interface Resource {
  id: string
  name: string
  author?: string
  type: ResourceType
  link?: string
  summary: string
  disabilities: Disability[]
  audiences: Audience[]
  status: ResourceStatus
  updatedAt: string
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  printable: 'Printable',
  presentation: 'Presentation',
  talk: 'Talk',
  video: 'Video',
}

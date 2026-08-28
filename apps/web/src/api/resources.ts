import type {
  Audience,
  Disability,
  Resource,
  ResourceStatus,
  ResourceType,
} from '@cds/shared'
import { pb } from '../lib/pocketbase'

type PBDisability = {
  id: string
  name: string
  description: string
  sortOrder?: number
}

type PBAudience = {
  id: string
  name: string
  description?: string
  sortOrder?: number
}

type PBResource = {
  id: string
  name: string
  author?: string
  type: ResourceType
  link?: string
  summary: string
  status: ResourceStatus
  created?: string
  updated?: string
  expand?: {
    disabilities?: PBDisability[]
    audiences?: PBAudience[]
  }
}

export type ResourceFilters = {
  disabilityId?: string
  audienceId?: string
  type?: ResourceType
  search?: string
}

function mapDisability(record: PBDisability): Disability {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    sortOrder: record.sortOrder,
  }
}

function mapAudience(record: PBAudience): Audience {
  return {
    id: record.id,
    name: record.name,
    description: record.description || undefined,
    sortOrder: record.sortOrder,
  }
}

function mapResource(record: PBResource): Resource {
  return {
    id: record.id,
    name: record.name,
    author: record.author || undefined,
    type: record.type,
    link: record.link || undefined,
    summary: record.summary,
    disabilities: (record.expand?.disabilities ?? []).map(mapDisability),
    audiences: (record.expand?.audiences ?? []).map(mapAudience),
    status: record.status,
    updatedAt: record.updated ?? record.created ?? '',
  }
}

function buildFilter(filters: ResourceFilters): string {
  const parts = ['status = "published"']

  if (filters.type) {
    parts.push(`type = "${filters.type}"`)
  }

  if (filters.disabilityId) {
    parts.push(`disabilities.id ?= "${filters.disabilityId}"`)
  }

  if (filters.audienceId) {
    parts.push(`audiences.id ?= "${filters.audienceId}"`)
  }

  if (filters.search?.trim()) {
    const q = filters.search.trim().replace(/"/g, '\\"')
    parts.push(`(name ~ "${q}" || summary ~ "${q}")`)
  }

  return parts.join(' && ')
}

export async function listResources(
  filters: ResourceFilters = {},
): Promise<Resource[]> {
  const result = await pb.collection('resources').getList<PBResource>(1, 200, {
    filter: buildFilter(filters),
    sort: '-updated',
    expand: 'disabilities,audiences',
  })

  return result.items.map(mapResource)
}

export async function getResource(id: string): Promise<Resource | null> {
  try {
    const record = await pb.collection('resources').getOne<PBResource>(id, {
      expand: 'disabilities,audiences',
    })
    if (record.status !== 'published') return null
    return mapResource(record)
  } catch {
    return null
  }
}

export async function listDisabilities(): Promise<Disability[]> {
  const result = await pb
    .collection('disabilities')
    .getList<PBDisability>(1, 100, { sort: 'sortOrder,name' })

  return result.items.map(mapDisability)
}

export async function listAudiences(): Promise<Audience[]> {
  const result = await pb
    .collection('audiences')
    .getList<PBAudience>(1, 100, { sort: 'sortOrder,name' })

  return result.items.map(mapAudience)
}

import { useEffect, useState } from 'react'
import type { Audience, Disability, Resource } from '@cds/shared'
import {
  getResource,
  listAudiences,
  listDisabilities,
  listResources,
  type ResourceFilters,
} from '../api/resources'
import { seedAudiences, seedDisabilities, seedResources } from '../data/resources'
import { isPocketBaseConfigured } from '../lib/pocketbase'

type AsyncState<T> = {
  data: T
  loading: boolean
  error: string | null
  source: 'api' | 'seed'
}

function filterSeedResources(filters: ResourceFilters): Resource[] {
  const q = filters.search?.trim().toLowerCase() ?? ''

  return seedResources.filter((resource) => {
    if (resource.status !== 'published') return false
    if (filters.type && resource.type !== filters.type) return false
    if (
      filters.disabilityId &&
      !resource.disabilities.some((d) => d.id === filters.disabilityId)
    ) {
      return false
    }
    if (
      filters.audienceId &&
      !resource.audiences.some((a) => a.id === filters.audienceId)
    ) {
      return false
    }
    if (
      q &&
      !resource.name.toLowerCase().includes(q) &&
      !resource.summary.toLowerCase().includes(q)
    ) {
      return false
    }
    return true
  })
}

export function useResources(filters: ResourceFilters = {}): AsyncState<Resource[]> {
  const [state, setState] = useState<AsyncState<Resource[]>>({
    data: [],
    loading: true,
    error: null,
    source: 'api',
  })

  const filterKey = JSON.stringify(filters)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const data = await listResources(filters)
        if (!cancelled) {
          setState({ data, loading: false, error: null, source: 'api' })
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load resources'
          setState({
            data: filterSeedResources(filters),
            loading: false,
            error: isPocketBaseConfigured()
              ? message
              : 'Using sample data — start PocketBase for live resources.',
            source: 'seed',
          })
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [filterKey])

  return state
}

export function useResource(id: string | undefined): AsyncState<Resource | null> {
  const [state, setState] = useState<AsyncState<Resource | null>>({
    data: null,
    loading: true,
    error: null,
    source: 'api',
  })

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: null, source: 'api' })
      return
    }

    let cancelled = false

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const data = await getResource(id!)
        if (!cancelled) {
          setState({ data, loading: false, error: null, source: 'api' })
        }
      } catch (err) {
        if (!cancelled) {
          const fallback =
            seedResources.find((item) => item.id === id) ?? null
          setState({
            data: fallback,
            loading: false,
            error:
              err instanceof Error ? err.message : 'Failed to load resource',
            source: 'seed',
          })
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [id])

  return state
}

export function useTaxonomy(): AsyncState<{
  disabilities: Disability[]
  audiences: Audience[]
}> {
  const [state, setState] = useState<
    AsyncState<{ disabilities: Disability[]; audiences: Audience[] }>
  >({
    data: { disabilities: [], audiences: [] },
    loading: true,
    error: null,
    source: 'api',
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const [disabilities, audiences] = await Promise.all([
          listDisabilities(),
          listAudiences(),
        ])
        if (!cancelled) {
          setState({
            data: { disabilities, audiences },
            loading: false,
            error: null,
            source: 'api',
          })
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            data: {
              disabilities: seedDisabilities,
              audiences: seedAudiences,
            },
            loading: false,
            error:
              err instanceof Error ? err.message : 'Failed to load filters',
            source: 'seed',
          })
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

export function useDisabilities(): AsyncState<Disability[]> {
  const taxonomy = useTaxonomy()
  return {
    ...taxonomy,
    data: taxonomy.data.disabilities,
  }
}

import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RESOURCE_TYPE_LABELS, type ResourceType } from '@cds/shared'
import { ResourceCard } from '../components/ResourceCard'
import { useResources, useTaxonomy } from '../hooks/useResources'

const allTypes = Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[]

export function ResourcesPage() {
  const [searchParams] = useSearchParams()
  const initialDisability = searchParams.get('disability') ?? 'all'

  const [query, setQuery] = useState('')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [disabilityId, setDisabilityId] = useState(initialDisability)
  const [audienceId, setAudienceId] = useState('all')

  const { data: taxonomy, loading: taxonomyLoading } = useTaxonomy()

  const filters = useMemo(
    () => ({
      search: query,
      type: type === 'all' ? undefined : type,
      disabilityId: disabilityId === 'all' ? undefined : disabilityId,
      audienceId: audienceId === 'all' ? undefined : audienceId,
    }),
    [query, type, disabilityId, audienceId],
  )

  const { data: resources, loading, error, source } = useResources(filters)

  return (
    <article>
      <div className="page-intro">
        <h1>Resources</h1>
        <p className="lede">
          Browse community-shared printables, presentations, talks, and videos.
          Adapt what inspires you—and seek local leader approval when you do.
        </p>
      </div>

      {error ? (
        <p className="section__lead" role="status">
          {error}
        </p>
      ) : null}

      {source === 'seed' ? (
        <p className="section__lead" role="status">
          Showing sample data. Start PocketBase locally to manage live resources.
        </p>
      ) : null}

      <div className="resource-filters">
        <div className="field" style={{ flex: '1 1 100%' }}>
          <label htmlFor="resource-search">Search</label>
          <input
            id="resource-search"
            type="search"
            placeholder="Search names, summaries, or authors"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="resource-filters__row">
          <div className="field">
            <label htmlFor="filter-type">Type</label>
            <select
              id="filter-type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as ResourceType | 'all')
              }
            >
              <option value="all">All types</option>
              {allTypes.map((value) => (
                <option key={value} value={value}>
                  {RESOURCE_TYPE_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="filter-disability">Disability</label>
            <select
              id="filter-disability"
              value={disabilityId}
              onChange={(event) => setDisabilityId(event.target.value)}
              disabled={taxonomyLoading}
            >
              <option value="all">All disabilities</option>
              {taxonomy.disabilities.map((disability) => (
                <option key={disability.id} value={disability.id}>
                  {disability.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="filter-audience">Audience</label>
            <select
              id="filter-audience"
              value={audienceId}
              onChange={(event) => setAudienceId(event.target.value)}
              disabled={taxonomyLoading}
            >
              <option value="all">All audiences</option>
              {taxonomy.audiences.map((audience) => (
                <option key={audience.id} value={audience.id}>
                  {audience.name}
                  {audience.description ? ` (${audience.description})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="empty-state" role="status">
          Loading resources…
        </div>
      ) : resources.length === 0 ? (
        <div className="empty-state" role="status">
          No resources match those filters yet. Try clearing search or choosing
          “All.”
        </div>
      ) : (
        <div className="resource-grid">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      <aside className="official-callouts" aria-label="Official Church disability resources">
        <div className="official-callouts__images">
          <a
            className="official-callout__link"
            href="https://disability.ChurchofJesusChrist.org"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/images/resources/church-disability-resources.jpeg"
              alt="Disability resources available at disability.ChurchofJesusChrist.org"
              width={600}
              height={600}
            />
          </a>
          <a
            className="official-callout__link"
            href="https://disability.ChurchofJesusChrist.org"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/images/resources/church-disability-resources-scriptures.jpeg"
              alt="Scripture-focused disability resources at disability.ChurchofJesusChrist.org"
              width={600}
              height={600}
            />
          </a>
        </div>
        <p>
          For official Church disability resources, visit{' '}
          <a
            href="https://disability.ChurchofJesusChrist.org"
            target="_blank"
            rel="noreferrer"
          >
            disability.ChurchofJesusChrist.org
          </a>
          . Linking there does not mean the Church endorses this independent
          site.
        </p>
      </aside>
    </article>
  )
}

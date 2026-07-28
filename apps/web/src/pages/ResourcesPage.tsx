import { useMemo, useState } from 'react'
import {
  RESOURCE_TYPE_LABELS,
  SETTING_LABELS,
  TOPIC_LABELS,
  type DisabilityTopic,
  type ResourceSetting,
  type ResourceType,
} from '@cds/shared'
import { ResourceCard } from '../components/ResourceCard'
import { seedResources } from '../data/resources'

const allSettings = Object.keys(SETTING_LABELS) as ResourceSetting[]
const allTypes = Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[]
const allTopics = Object.keys(TOPIC_LABELS) as DisabilityTopic[]

export function ResourcesPage() {
  const [query, setQuery] = useState('')
  const [setting, setSetting] = useState<ResourceSetting | 'all'>('all')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [topic, setTopic] = useState<DisabilityTopic | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return seedResources.filter((resource) => {
      if (resource.status !== 'published') return false
      if (setting !== 'all' && !resource.settings.includes(setting)) return false
      if (type !== 'all' && resource.type !== type) return false
      if (topic !== 'all' && !resource.topics.includes(topic)) return false
      if (!q) return true
      return (
        resource.title.toLowerCase().includes(q) ||
        resource.summary.toLowerCase().includes(q)
      )
    })
  }, [query, setting, type, topic])

  return (
    <article>
      <div className="page-intro">
        <h1>Resources</h1>
        <p className="lede">
          Browse community-shared how-tos, ideas, and presentations. Adapt what
          inspires you—and seek local leader approval when you do.
        </p>
      </div>

      <div className="resource-filters">
        <div className="field" style={{ flex: '1 1 100%' }}>
          <label htmlFor="resource-search">Search</label>
          <input
            id="resource-search"
            type="search"
            placeholder="Search titles and summaries"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="resource-filters__row">
          <div className="field">
            <label htmlFor="filter-setting">Setting</label>
            <select
              id="filter-setting"
              value={setting}
              onChange={(event) =>
                setSetting(event.target.value as ResourceSetting | 'all')
              }
            >
              <option value="all">All settings</option>
              {allSettings.map((value) => (
                <option key={value} value={value}>
                  {SETTING_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

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
            <label htmlFor="filter-topic">Topic</label>
            <select
              id="filter-topic"
              value={topic}
              onChange={(event) =>
                setTopic(event.target.value as DisabilityTopic | 'all')
              }
            >
              <option value="all">All topics</option>
              {allTopics.map((value) => (
                <option key={value} value={value}>
                  {TOPIC_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state" role="status">
          No resources match those filters yet. Try clearing search or choosing
          “All.”
        </div>
      ) : (
        <div className="resource-grid">
          {filtered.map((resource) => (
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

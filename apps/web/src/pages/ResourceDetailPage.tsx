import { Link, useParams } from 'react-router-dom'
import {
  AUDIENCE_LABELS,
  RESOURCE_TYPE_LABELS,
  SETTING_LABELS,
  TOPIC_LABELS,
} from '@cds/shared'
import { seedResources } from '../data/resources'

export function ResourceDetailPage() {
  const { id } = useParams()
  const resource = seedResources.find((item) => item.id === id)

  if (!resource) {
    return (
      <article className="page-intro">
        <h1>Resource not found</h1>
        <p className="lede">That resource is not in the sample library.</p>
        <Link className="btn btn--secondary" to="/resources">
          Back to resources
        </Link>
      </article>
    )
  }

  return (
    <article className="prose">
      <p>
        <Link to="/resources">← All resources</Link>
      </p>
      <div className="page-intro">
        <div className="resource-card__meta" style={{ marginBottom: '1rem' }}>
          <span className="chip">{RESOURCE_TYPE_LABELS[resource.type]}</span>
          {resource.settings.map((setting) => (
            <span key={setting} className="chip chip--warm">
              {SETTING_LABELS[setting]}
            </span>
          ))}
        </div>
        <h1>{resource.title}</h1>
        <p className="lede">{resource.summary}</p>
      </div>

      {resource.body ? <p>{resource.body}</p> : null}

      <h2>Details</h2>
      <ul>
        <li>
          <strong>Topics:</strong>{' '}
          {resource.topics.map((topic) => TOPIC_LABELS[topic]).join(', ')}
        </li>
        <li>
          <strong>Audience:</strong>{' '}
          {resource.audiences
            .map((audience) => AUDIENCE_LABELS[audience])
            .join(', ')}
        </li>
        {resource.contributorCredit ? (
          <li>
            <strong>Credit:</strong> {resource.contributorCredit}
          </li>
        ) : null}
        <li>
          <strong>Updated:</strong>{' '}
          {new Date(resource.updatedAt).toLocaleDateString()}
        </li>
      </ul>

      {resource.externalUrl ? (
        <p>
          <a
            className="btn btn--primary"
            href={resource.externalUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open linked resource
          </a>
        </p>
      ) : (
        <p className="section__lead">
          File downloads will connect here once PocketBase file storage is
          wired up.
        </p>
      )}

      <p>
        You may adapt ideas that inspire your calling. Please seek approval from
        your local leaders, and respect contributor permissions.
      </p>
    </article>
  )
}

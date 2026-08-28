import { Link, useParams } from 'react-router-dom'
import { RESOURCE_TYPE_LABELS } from '@cds/shared'
import { useResource } from '../hooks/useResources'
import {
  formatResourceDate,
  getYouTubeEmbedUrl,
  isPdfUrl,
  resourceActionLabel,
} from '../lib/resourceLinks'

export function ResourceDetailPage() {
  const { id } = useParams()
  const { data: resource, loading, error } = useResource(id)

  if (loading) {
    return (
      <article className="page-intro">
        <p className="lede" role="status">
          Loading resource…
        </p>
      </article>
    )
  }

  if (!resource) {
    return (
      <article className="page-intro">
        <h1>Resource not found</h1>
        <p className="lede">
          {error ?? 'That resource is not in the library.'}
        </p>
        <Link className="btn btn--secondary" to="/resources">
          Back to resources
        </Link>
      </article>
    )
  }

  const youtubeEmbed = resource.link ? getYouTubeEmbedUrl(resource.link) : null
  const showPdfPreview =
    resource.link && resource.type === 'printable' && isPdfUrl(resource.link)

  return (
    <article className="prose">
      <p>
        <Link to="/resources">← All resources</Link>
      </p>
      <div className="page-intro">
        <div className="resource-card__meta" style={{ marginBottom: '1rem' }}>
          <span className="chip">{RESOURCE_TYPE_LABELS[resource.type]}</span>
          {resource.disabilities.map((disability) => (
            <span key={disability.id} className="chip chip--warm">
              {disability.name}
            </span>
          ))}
        </div>
        <h1>{resource.name}</h1>
        <p className="lede">{resource.summary}</p>
      </div>

      <h2>Details</h2>
      <ul>
        <li>
          <strong>Disabilities:</strong>{' '}
          {resource.disabilities.length > 0
            ? resource.disabilities.map((d) => d.name).join(', ')
            : 'General'}
        </li>
        <li>
          <strong>Audience:</strong>{' '}
          {resource.audiences.length > 0
            ? resource.audiences
                .map((audience) =>
                  audience.description
                    ? `${audience.name} (${audience.description})`
                    : audience.name,
                )
                .join(', ')
            : 'All'}
        </li>
        {resource.author ? (
          <li>
            <strong>Author:</strong> {resource.author}
          </li>
        ) : null}
        {formatResourceDate(resource.updatedAt) ? (
          <li>
            <strong>Updated:</strong> {formatResourceDate(resource.updatedAt)}
          </li>
        ) : null}
      </ul>

      {resource.link ? (
        <>
          <p>
            <a
              className="btn btn--primary"
              href={resource.link}
              target="_blank"
              rel="noreferrer"
            >
              {resourceActionLabel(resource.type)}
            </a>
          </p>

          {youtubeEmbed ? (
            <div className="resource-embed">
              <iframe
                title={`Video: ${resource.name}`}
                src={youtubeEmbed}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          {showPdfPreview ? (
            <div className="resource-embed">
              <iframe
                title={`Preview: ${resource.name}`}
                src={resource.link}
              />
            </div>
          ) : null}
        </>
      ) : (
        <p className="section__lead">
          A download link will appear here once an admin adds one in PocketBase.
        </p>
      )}

      {resource.type === 'video' && resource.link && !youtubeEmbed ? (
        <p className="section__lead">
          This video is hosted externally. Use the button above to open it in a
          new tab.
        </p>
      ) : null}

      <p>
        You may adapt ideas that inspire your calling. Please seek approval from
        your local leaders, and respect contributor permissions.
      </p>
    </article>
  )
}

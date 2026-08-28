import { Link } from 'react-router-dom'
import { RESOURCE_TYPE_LABELS, type Resource } from '@cds/shared'
import { formatResourceDate } from '../lib/resourceLinks'

type Props = {
  resource: Resource
}

export function ResourceCard({ resource }: Props) {
  return (
    <Link to={`/resources/${resource.id}`} className="resource-card">
      <div className="resource-card__meta">
        <span className="chip">{RESOURCE_TYPE_LABELS[resource.type]}</span>
        {resource.disabilities.slice(0, 2).map((disability) => (
          <span key={disability.id} className="chip chip--warm">
            {disability.name}
          </span>
        ))}
      </div>
      <h3>{resource.name}</h3>
      <p>{resource.summary}</p>
      <div className="resource-card__footer">
        {formatResourceDate(resource.updatedAt) ? (
          <>Updated {formatResourceDate(resource.updatedAt)}</>
        ) : (
          <span>{resource.author ?? 'Community resource'}</span>
        )}
      </div>
    </Link>
  )
}

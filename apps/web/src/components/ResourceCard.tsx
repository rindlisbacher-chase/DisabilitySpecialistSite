import { Link } from 'react-router-dom'
import {
  RESOURCE_TYPE_LABELS,
  SETTING_LABELS,
  type Resource,
} from '@cds/shared'

type Props = {
  resource: Resource
}

export function ResourceCard({ resource }: Props) {
  return (
    <Link to={`/resources/${resource.id}`} className="resource-card">
      <div className="resource-card__meta">
        <span className="chip">{RESOURCE_TYPE_LABELS[resource.type]}</span>
        {resource.settings.map((setting) => (
          <span key={setting} className="chip chip--warm">
            {SETTING_LABELS[setting]}
          </span>
        ))}
      </div>
      <h3>{resource.title}</h3>
      <p>{resource.summary}</p>
      <div className="resource-card__footer">
        Updated {new Date(resource.updatedAt).toLocaleDateString()}
      </div>
    </Link>
  )
}

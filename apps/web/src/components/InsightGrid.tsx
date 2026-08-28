import type { Insight } from '../data/insights'
import { CaptionedPhoto } from './CaptionedPhoto'

type InsightGridProps = {
  items: Insight[]
  heading?: string
  lead?: string
}

export function InsightGrid({ items, heading, lead }: InsightGridProps) {
  return (
    <section className="section" aria-labelledby={heading ? 'insight-grid-heading' : undefined}>
      {heading ? (
        <>
          <h2 id="insight-grid-heading">{heading}</h2>
          {lead ? <p className="section__lead">{lead}</p> : null}
        </>
      ) : null}
      <div className="insight-grid">
        {items.map((item) => (
          <CaptionedPhoto
            key={item.id}
            src={item.src}
            alt={item.alt}
            caption={item.caption}
            width={item.width}
            height={item.height}
            variant="insight"
          />
        ))}
      </div>
    </section>
  )
}

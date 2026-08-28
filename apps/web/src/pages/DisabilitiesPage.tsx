import { Link } from 'react-router-dom'
import { CaptionedPhoto } from '../components/CaptionedPhoto'
import { InsightGrid } from '../components/InsightGrid'
import { insights } from '../data/insights'
import { useDisabilities } from '../hooks/useResources'

const neurodiversity = insights.find((item) => item.id === 'neurodiversity')!
const galleryInsights = insights.filter(
  (item) =>
    item.id === 'sensory-1' ||
    item.id === 'sensory-2' ||
    item.id === 'hidden-message-1' ||
    item.id === 'hidden-message-2',
)

export function DisabilitiesPage() {
  const { data: disabilities, loading, error, source } = useDisabilities()

  return (
    <article>
      <div className="page-intro">
        <h1>Understanding disabilities</h1>
        <p className="lede">
          High-level awareness to help specialists serve with empathy. This is
          not medical advice—every person’s experience is unique.
        </p>
      </div>

      <CaptionedPhoto
        src={neurodiversity.src}
        alt={neurodiversity.alt}
        caption={neurodiversity.caption}
        width={neurodiversity.width}
        height={neurodiversity.height}
      />

      <p className="inclusion-callout">
        Many disabilities are invisible. Someone may look like any other member
        in the room and still need understanding, flexibility, or support.
        Looking only for what you can see means missing people the Lord already
        knows.
      </p>

      <InsightGrid
        heading="What you may not see at first"
        lead="These images and reminders highlight experiences that are easy to overlook—especially when disability does not look the way we expect."
        items={galleryInsights}
      />

      {error ? (
        <p className="section__lead" role="status">
          {error}
        </p>
      ) : null}

      {source === 'seed' ? (
        <p className="section__lead" role="status">
          Showing sample disability topics. Start PocketBase for the full list.
        </p>
      ) : null}

      <div className="topic-list">
        {loading ? (
          <p className="section__lead" role="status">
            Loading disability topics…
          </p>
        ) : (
          disabilities.map((disability) => (
            <section key={disability.id} className="topic-item">
              <h2>{disability.name}</h2>
              <p>{disability.description}</p>
              <p>
                <Link to={`/resources?disability=${disability.id}`}>
                  Browse resources for {disability.name}
                </Link>
              </p>
            </section>
          ))
        )}
      </div>

      <p className="section__lead" style={{ marginTop: '2rem' }}>
        Nearly 1 in 5 people have a disability, and many households are
        impacted. Look for the one—and invite belonging.
      </p>
    </article>
  )
}

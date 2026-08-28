import { CaptionedPhoto } from '../components/CaptionedPhoto'
import { InsightGrid } from '../components/InsightGrid'
import { insights } from '../data/insights'

const neurodiversity = insights.find((item) => item.id === 'neurodiversity')!
const galleryInsights = insights.filter(
  (item) =>
    item.id === 'sensory-1' ||
    item.id === 'sensory-2' ||
    item.id === 'hidden-message-1' ||
    item.id === 'hidden-message-2',
)

const topics = [
  {
    title: 'Autism',
    summary:
      'May affect language, behavior, social skills, and communication. Support often includes predictability, sensory awareness, and caregiver partnership.',
  },
  {
    title: 'Chronic illness / medical disabilities',
    summary:
      'May affect health, energy, and quality of life. Flexibility, ministering, and caregiver support matter.',
  },
  {
    title: 'Hearing loss & deafness',
    summary:
      'Affects hearing and verbal communication. Consider seating, microphones, interpreters, and other access tools.',
  },
  {
    title: 'Intellectual disability',
    summary:
      'May affect learning, thinking, problem solving, and self-care. Focus on belonging, clear communication, and meaningful participation.',
  },
  {
    title: 'Learning disability',
    summary:
      'Affects learning by traditional methods alone (for example ADHD or dyslexia). Offer multiple ways to receive and share information.',
  },
  {
    title: 'Memory loss',
    summary:
      'Affects short- and/or long-term memory. Patience, familiar routines, and caregiver support help.',
  },
  {
    title: 'Mental health / mental illness',
    summary:
      'Can affect thoughts, emotions, and behavior. Respond with compassion, confidentiality, and appropriate referrals.',
  },
  {
    title: 'Physical disability',
    summary:
      'May affect mobility and self-care. Check building access, seating, and how callings and activities can include everyone.',
  },
  {
    title: 'Speech & language disorder',
    summary:
      'Affects communication. Allow time, alternative formats, and respectful listening.',
  },
  {
    title: 'Vision loss & blindness',
    summary:
      'Affects sight and visual communication. Offer large print, high contrast, verbal cues, and accessible digital formats.',
  },
]

export function DisabilitiesPage() {
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

      <div className="topic-list">
        {topics.map((topic) => (
          <section key={topic.title} className="topic-item">
            <h2>{topic.title}</h2>
            <p>{topic.summary}</p>
          </section>
        ))}
      </div>

      <p className="section__lead" style={{ marginTop: '2rem' }}>
        Nearly 1 in 5 people have a disability, and many households are
        impacted. Look for the one—and invite belonging.
      </p>
    </article>
  )
}

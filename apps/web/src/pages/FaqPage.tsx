const faqs = [
  {
    question: 'Is this an official Church website?',
    answer:
      'No. This is an independent, community-led effort. It is not provided, approved, or endorsed by Intellectual Reserve, Inc. or The Church of Jesus Christ of Latter-day Saints.',
  },
  {
    question: 'Who can use these resources?',
    answer:
      'Ward and stake Disability Specialists, leaders, families, and others who want to help every person belong. Adapt materials carefully and seek local leader approval.',
  },
  {
    question: 'Are all disabilities visible?',
    answer:
      'No. Many disabilities are invisible—including some related to mental health, chronic illness, learning, memory, and more. Looking only for what you can see means missing people who still need support and belonging.',
  },
  {
    question: 'Do I need to be an expert to serve?',
    answer:
      'No. Many specialists grow in the calling as they serve. Prayer, listening, and partnership with leaders and families matter most.',
  },
  {
    question: 'Can I share something I created?',
    answer:
      'Soon. For now, contact the site maintainers. A moderated submission flow is planned so contributions can be reviewed before publishing.',
  },
  {
    question: 'Where should I start if I am newly called?',
    answer:
      'Visit Getting Started, review the official “My Calling as a Disability Specialist” materials, then browse Resources for practical ideas.',
  },
]

export function FaqPage() {
  return (
    <article>
      <div className="page-intro">
        <h1>FAQ</h1>
        <p className="lede">
          Short answers to common questions about this site and the calling.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((item) => (
          <section key={item.question} className="faq-item">
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </section>
        ))}
      </div>
    </article>
  )
}

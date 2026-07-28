export function GettingStartedPage() {
  return (
    <article>
      <div className="page-intro">
        <h1>Getting started as a Disability Specialist</h1>
        <p className="lede">
          You do not need to be an expert. Grow in the calling through study,
          prayer, and loving relationships—one person and family at a time.
        </p>
      </div>

      <figure className="page-photo">
        <img
          src="/images/getting-started/sunday-school.jpeg"
          alt="Members gathered together for a Sunday class"
          width={1200}
          height={800}
        />
      </figure>

      <div className="steps" aria-label="Getting started steps">
        <div className="step">
          <div>
            <h2>Pray, fast, and be set apart</h2>
            <p>
              Begin with the Lord. Be sustained and set apart, then seek His
              guidance as you serve.
            </p>
          </div>
        </div>
        <div className="step">
          <div>
            <h2>Ask to attend ward council</h2>
            <p>
              Partner with leaders. Help them see how disability may show up in
              your unit and how you can support meaningful inclusion.
            </p>
          </div>
        </div>
        <div className="step">
          <div>
            <h2>Meet individuals and families</h2>
            <p>
              Listen first. Questions like “What is it like being you?” and “What
              is your experience at church like?” open the door to real needs.
            </p>
          </div>
        </div>
        <div className="step">
          <div>
            <h2>Find resources</h2>
            <p>
              Use official Church calling materials, community supports, and
              ideas shared by other specialists—then adapt what fits locally.
            </p>
          </div>
        </div>
        <div className="step">
          <div>
            <h2>Make a plan and act</h2>
            <p>
              Start small: one relationship, one accessibility improvement, one
              training moment. Follow up with love.
            </p>
          </div>
        </div>
      </div>

      <section className="section prose">
        <h2>Helpful official references</h2>
        <p>
          These links are provided for your calling study. Their presence here
          does not mean the Church endorses this website.
        </p>
        <ul>
          <li>
            <a
              href="https://www.churchofjesuschrist.org/study/manual/my-calling-as-a-ward-disability-specialist/welcome"
              target="_blank"
              rel="noreferrer"
            >
              My Calling as a Ward Disability Specialist
            </a>
          </li>
          <li>
            <a
              href="https://www.churchofjesuschrist.org/study/manual/general-handbook/38-church-policies-and-guidelines"
              target="_blank"
              rel="noreferrer"
            >
              General Handbook (disability-related guidance)
            </a>
          </li>
          <li>
            <a
              href="https://www.churchofjesuschrist.org/learn/accessibility-statement"
              target="_blank"
              rel="noreferrer"
            >
              Church accessibility statement
            </a>
          </li>
        </ul>
      </section>
    </article>
  )
}

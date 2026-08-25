import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <>
      <section className="hero hero--photo" aria-labelledby="hero-brand">
        <div className="hero__media" aria-hidden="true">
          <img
            src="/images/home/ward-party.jpeg"
            alt=""
            width={1200}
            height={800}
          />
        </div>
        <div className="hero__copy">
          <h1 id="hero-brand" className="hero__brand">
            Church Disability Specialist Resources
          </h1>
          <p className="hero__headline">
            Helping every person feel they belong.
          </p>
          <p className="hero__support">
            Practical how-tos, presentation ideas, and community-shared tools for
            supporting individuals with disabilities—visible and invisible—at
            church, at home, and in the community.
          </p>
          <div className="btn-row">
            <Link className="btn btn--primary" to="/resources">
              Browse resources
            </Link>
            <Link className="btn btn--secondary" to="/getting-started">
              Getting started
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--split" aria-labelledby="home-purpose">
        <div>
          <h2 id="home-purpose">Built for your calling</h2>
          <p className="section__lead">
            Disability Specialists—ward and stake—serve alongside the Savior to
            help find and support individuals with various disabilities. Many
            disabilities are not obvious. This site gathers materials others have
            shared so you can adapt what fits your local needs and help every
            person participate.
          </p>
          <div className="btn-row">
            <Link className="btn btn--secondary" to="/disabilities">
              Disability basics
            </Link>
            <Link className="btn btn--secondary" to="/about">
              About this site
            </Link>
          </div>
        </div>
        <figure className="section-photo">
          <img
            src="/images/home/inclusion.jpeg"
            alt="People of different ages gathering together in a welcoming church setting"
            width={640}
            height={427}
          />
        </figure>
      </section>

      <section
        className="section section--split section--split--reverse"
        aria-labelledby="home-belonging"
      >
        <div>
          <h2 id="home-belonging">Belonging for every person</h2>
          <p className="section__lead">
            Whether a disability is easy to see or quietly carried, each person
            deserves friendship, meaningful opportunities to contribute, and a
            place in the body of Christ. Leaders, families, and specialists are
            all welcome here.
          </p>
        </div>
        <figure className="section-photo">
          <img
            src="/images/home/visiting-the-elderly.png"
            alt="A specialist greeting an older ward member during a home visit"
            width={640}
            height={414}
          />
        </figure>
      </section>
    </>
  )
}

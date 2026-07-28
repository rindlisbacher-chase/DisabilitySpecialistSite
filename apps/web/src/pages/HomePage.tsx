import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <>
      <section className="hero hero--photo" aria-labelledby="hero-brand">
        <div className="hero__media" aria-hidden="true">
          <img
            src="/images/home/inclusion.jpeg"
            alt=""
            width={1280}
            height={854}
          />
        </div>
        <div className="hero__copy">
          <h1 id="hero-brand" className="hero__brand">
            Church Disability Specialist Resources
          </h1>
          <p className="hero__headline">
            Inspiration for those who help every person belong.
          </p>
          <p className="hero__support">
            Find practical how-tos, presentation ideas, and community-shared tools
            for supporting individuals with disabilities at church, at home, and
            in the community.
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
            help find and support individuals with various disabilities. This site
            gathers materials others have shared so you can adapt what fits your
            local needs.
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

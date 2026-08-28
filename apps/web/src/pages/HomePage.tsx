import { Link } from 'react-router-dom'
import { BlockQuote } from '../components/BlockQuote'
import { CaptionedPhoto } from '../components/CaptionedPhoto'
import { hollandQuote, insights } from '../data/insights'

const socialAnxiety = insights.find((item) => item.id === 'social-anxiety')!
const whichHasDisability = insights.find((item) => item.id === 'which-has-disability')!

export function HomePage() {
  return (
    <>
      <section className="hero hero--photo" aria-labelledby="hero-brand">
        <div className="hero__media" aria-hidden="true">
          <img
            src="/images/home/look-beyond-the-physical.jpg"
            alt=""
            width={738}
            height={391}
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

      <BlockQuote
        quote={hollandQuote.text}
        attribution={hollandQuote.attribution}
      />

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
        <CaptionedPhoto
          src={socialAnxiety.src}
          alt={socialAnxiety.alt}
          caption={socialAnxiety.caption}
          width={socialAnxiety.width}
          height={socialAnxiety.height}
          variant="section"
        />
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
        <CaptionedPhoto
          src={whichHasDisability.src}
          alt={whichHasDisability.alt}
          caption={whichHasDisability.caption}
          width={whichHasDisability.width}
          height={whichHasDisability.height}
          variant="section"
        />
      </section>
    </>
  )
}

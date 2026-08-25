import { useId, useState } from 'react'

export function Footer() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__tagline">
          Church Disability Specialist Resources · Built to inspire, train, and
          equip those who serve.
        </p>

        <div className="disclaimer-disclosure">
          <button
            type="button"
            className="disclaimer-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="disclaimer-toggle__chevron" aria-hidden="true">
              ▶
            </span>
            Not an official Church publication
          </button>

          <div
            id={panelId}
            className="disclaimer-panel"
            role="region"
            aria-label="Acknowledgment regarding Church affiliation"
            hidden={!open}
          >
            <p>
              <strong>Acknowledgment Regarding Church Affiliation</strong>
            </p>
            <p>
              Please understand and acknowledge that this website is
              independently maintained and is not owned, operated, sponsored,
              approved, or endorsed by Intellectual Reserve, Inc. or The Church
              of Jesus Christ of Latter-day Saints.
            </p>
            <p>
              The services offered by this website are neither made, provided,
              approved, nor endorsed by Intellectual Reserve, Inc. or The Church
              of Jesus Christ of Latter-day Saints. Any content or opinions
              expressed, implied, or included in or through the services offered
              by this website are solely those of the individual contributors and
              website administrators and not those of Intellectual Reserve, Inc.
              or The Church of Jesus Christ of Latter-day Saints.
            </p>
            <p>
              Please understand that resources shared on this website represent
              the experiences, perspectives, and suggestions of individual
              contributors and should not be interpreted as official Church
              policy, doctrine, guidance, or training.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

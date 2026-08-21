import Link from "next/link"
import Image from "next/image"
import {
  FaCheckCircle,
  FaTimesCircle,
  FaLink,
  FaImage,
} from "react-icons/fa"

export default function BrokenContent() {
  return (
    <section
      id="broken-content-card"
      data-testid="broken-content-card"
      className="broken-content"
    >
      <header className="broken-content__header">
        <h2
          id="broken-links-title"
          data-testid="broken-links-title"
          className="broken-content__title"
        >
          Broken Links & Images
        </h2>

        <p
          id="broken-links-description"
          data-testid="broken-links-description"
          className="broken-content__description"
        >
          Practice scraping links and images on a page, sending requests, or
          checking properties to detect broken resources (HTTP 404 or image
          errors).
        </p>
      </header>

      <div className="broken-content__sections">
        {/* Links section */}
        <div className="broken-content__section">
          <div className="broken-content__section-heading">
            <FaLink
              className="broken-content__section-icon"
              aria-hidden="true"
            />

            <h3 className="broken-content__section-title">
              Links Check
            </h3>
          </div>

          <ul className="broken-content__list">
            <li className="broken-content__item">
              <div className="broken-content__item-header">
                <span className="broken-content__item-label">
                  Valid Link (200 OK)
                </span>

                <span className="broken-content__status broken-content__status--valid">
                  <FaCheckCircle
                    className="broken-content__status-icon"
                    aria-hidden="true"
                  />
                  Active
                </span>
              </div>

              <Link
                id="valid-link"
                data-testid="valid-link"
                href="/"
                className="broken-content__link"
              >
                Go to Home Page
              </Link>
            </li>

            <li className="broken-content__item">
              <div className="broken-content__item-header">
                <span className="broken-content__item-label">
                  Broken Link (404 Error)
                </span>

                <span className="broken-content__status broken-content__status--broken">
                  <FaTimesCircle
                    className="broken-content__status-icon"
                    aria-hidden="true"
                  />
                  Broken
                </span>
              </div>

              <Link
                id="broken-link"
                data-testid="broken-link"
                href="/non-existent-link-path-practice"
                className="broken-content__link"
              >
                Link to Broken Page
              </Link>
            </li>
          </ul>
        </div>

        {/* Images section */}
        <div className="broken-content__section">
          <div className="broken-content__section-heading">
            <FaImage
              className="broken-content__section-icon"
              aria-hidden="true"
            />

            <h3 className="broken-content__section-title">
              Images Check
            </h3>
          </div>

          <div className="broken-content__images">
            <div className="broken-content__image-item">
              <span className="broken-content__item-label broken-content__item-label--center">
                Valid Image (200)
              </span>

              <div className="broken-content__image-frame">
                <Image
                  id="valid-image"
                  data-testid="valid-image"
                  src="/screenshots/calendar.png"
                  alt="Valid Practice Thumbnail"
                  fill
                  sizes="120px"
                  className="broken-content__image"
                />
              </div>

              <span className="broken-content__status-text broken-content__status-text--valid">
                <FaCheckCircle
                  className="broken-content__status-text-icon"
                  aria-hidden="true"
                />
                Valid
              </span>
            </div>

            <div className="broken-content__image-item">
              <span className="broken-content__item-label broken-content__item-label--center">
                Broken Image (404)
              </span>

              <div className="broken-content__image-frame broken-content__image-frame--broken">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  id="broken-image"
                  data-testid="broken-image"
                  src="/screenshots/non-existent-image-file.png"
                  alt="Broken Practice Thumbnail"
                  className="broken-content__image"
                />
              </div>

              <span className="broken-content__status-text broken-content__status-text--broken">
                <FaTimesCircle
                  className="broken-content__status-text-icon"
                  aria-hidden="true"
                />
                Missing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BrokenContent.displayName = "BrokenContent"
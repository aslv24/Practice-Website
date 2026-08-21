import DashboardBackLink from "@/components/layout/DashboardBackLink"
import NestedFrame from "@/components/modules/frames/NestedFrame"
import SingleFrame from "@/components/modules/frames/SingleFrame"

export default function FramesPage() {
  return (
    <div className="frames-page">
      <h1 className="frames-page__title">Frames Practice Page</h1>

      <p className="frames-page__description">
        Practice handling iframes for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="frames-page__content">
        <SingleFrame />
        <NestedFrame />
      </div>
    </div>
  )
}
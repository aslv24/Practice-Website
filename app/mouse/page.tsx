import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ClickActions from "@/components/modules/mouse/ClickActions"
import DragDropComponent from "@/components/modules/mouse/DragDropComponent"
import MouseHover from "@/components/modules/mouse/MouseHover"
import RangeSlider from "@/components/modules/mouse/RangeSlider"
import Slider from "@/components/modules/mouse/Slider"

export default function MousePage() {
  return (
    <div className="mouse-page">
      <h1 className="mouse-page__title">Mouse Actions Practice Page</h1>

      <p className="mouse-page__description">
        Practice mouse interactions for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mouse-page__content">
        <ClickActions />
        <MouseHover />
        <DragDropComponent variant="simple" />
        <DragDropComponent variant="advanced" />
        <Slider />
        <RangeSlider />
      </div>
    </div>
  )
}
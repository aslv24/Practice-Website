import DashboardBackLink from "@/components/layout/DashboardBackLink"
import ClickActions from "@/components/modules/mouse/ClickActions"
import DragDrop from "@/components/modules/mouse/DragDrop"
import DragAndDrop from "@/components/modules/mouse/DragAndDrop"
import MouseHover from "@/components/modules/mouse/MouseHover"
import Slider from "@/components/modules/mouse/Slider"
import RangeSlider from "@/components/modules/mouse/RangeSlider"

export default function MousePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">Mouse Actions Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice mouse interactions for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-3xl space-y-6">
        <ClickActions />
        <MouseHover />
        <DragDrop />
        <DragAndDrop />
        <Slider />
        <RangeSlider />
      </div>
    </div>
  )
}

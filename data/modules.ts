import {
  FaBell,
  FaCalendarAlt,
  FaCheckSquare,
  FaList,
  FaStopwatch,
  FaUpload,
  FaWindowMaximize,
  FaWpforms
} from "react-icons/fa"
import {
  MdMouse,
  MdOutlineRadioButtonChecked,
  MdOutlineWeb,
  MdTableChart
} from "react-icons/md"

export type PracticeModule = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  link: string
}

export const modules: PracticeModule[] = [
  { name: "Alerts", icon: FaBell, color: "bg-red-100 text-red-600", link: "/alerts" },
  { name: "Calendar", icon: FaCalendarAlt, color: "bg-purple-100 text-purple-600", link: "/calendar" },
  { name: "Checkbox", icon: FaCheckSquare, color: "bg-green-100 text-green-600", link: "/checkbox" },
  { name: "Dropdown", icon: FaList, color: "bg-blue-100 text-blue-600", link: "/dropdown" },
  { name: "File Upload", icon: FaUpload, color: "bg-yellow-100 text-yellow-600", link: "/file-upload" },
  { name: "Forms", icon: FaWpforms, color: "bg-indigo-100 text-indigo-600", link: "/forms" },
  { name: "Frames", icon: MdOutlineWeb, color: "bg-pink-100 text-pink-600", link: "/frames" },
  { name: "Mouse Events", icon: MdMouse, color: "bg-orange-100 text-orange-600", link: "/mouse" },
  { name: "Radio Button", icon: MdOutlineRadioButtonChecked, color: "bg-teal-100 text-teal-600", link: "/radiobutton" },
  { name: "Suggestion List", icon: MdTableChart, color: "bg-cyan-100 text-cyan-600", link: "/suggestion-list" },
  {
    name: "Waits",
    icon: FaStopwatch,
    color: "bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 text-orange-600",
    link: "/waits"
  },
  { name: "Windows", icon: FaWindowMaximize, color: "bg-rose-100 text-rose-600", link: "/windows" }
]

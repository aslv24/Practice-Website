import {
  FaBell,
  FaCalendarAlt,
  FaCheckSquare,
  FaList,
  FaStopwatch,
  FaUpload,
  FaWindowMaximize,
  FaWpforms,
  FaGhost,
  FaLink
} from "react-icons/fa"

import {
  MdMouse,
  MdOutlineRadioButtonChecked,
  MdOutlineWeb,
  MdTableChart
} from "react-icons/md"

export type PracticeModule = {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  link: string
}

export const modules: PracticeModule[] = [
  {
    id: "alerts",
    title: "Alerts",
    icon: FaBell,
    color: "bg-red-100 text-red-600",
    link: "/alerts"
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: FaCalendarAlt,
    color: "bg-purple-100 text-purple-600",
    link: "/calendar"
  },
  {
    id: "checkbox",
    title: "Checkbox",
    icon: FaCheckSquare,
    color: "bg-green-100 text-green-600",
    link: "/checkbox"
  },
  {
    id: "dropdown",
    title: "Dropdown",
    icon: FaList,
    color: "bg-blue-100 text-blue-600",
    link: "/dropdown"
  },
  {
    id: "file-upload",
    title: "File Upload",
    icon: FaUpload,
    color: "bg-yellow-100 text-yellow-600",
    link: "/file-upload"
  },
  {
    id: "forms",
    title: "Forms",
    icon: FaWpforms,
    color: "bg-indigo-100 text-indigo-600",
    link: "/forms"
  },
  {
    id: "frames",
    title: "Frames",
    icon: MdOutlineWeb,
    color: "bg-pink-100 text-pink-600",
    link: "/frames"
  },
  {
    id: "mouse",
    title: "Mouse Events",
    icon: MdMouse,
    color: "bg-orange-100 text-orange-600",
    link: "/mouse"
  },
  {
    id: "radio-button",
    title: "Radio Button",
    icon: MdOutlineRadioButtonChecked,
    color: "bg-teal-100 text-teal-600",
    link: "/radiobutton"
  },
  {
    id: "suggestion-list",
    title: "Suggestion List",
    icon: MdTableChart,
    color: "bg-cyan-100 text-cyan-600",
    link: "/suggestion-list"
  },
  {
    id: "waits",
    title: "Waits",
    icon: FaStopwatch,
    color: "bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 text-orange-600",
    link: "/waits"
  },
  {
    id: "windows",
    title: "Windows",
    icon: FaWindowMaximize,
    color: "bg-rose-100 text-rose-600",
    link: "/windows"
  },
  {
    id: "tables",
    title: "Web Tables",
    icon: MdTableChart,
    color: "bg-amber-100 text-amber-600",
    link: "/tables"
  },
  {
    id: "shadow-dom",
    title: "Shadow DOM",
    icon: FaGhost,
    color: "bg-zinc-100 text-zinc-600",
    link: "/shadow-dom"
  },
  {
    id: "broken-links",
    title: "Broken Links",
    icon: FaLink,
    color: "bg-fuchsia-100 text-fuchsia-600",
    link: "/broken-links"
  }
]
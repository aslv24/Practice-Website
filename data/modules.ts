import {
  FaBell,
  FaCalendarAlt,
  FaCheckSquare,
  FaHourglassHalf,
  FaList,
  FaLock,
  FaShieldAlt,
  FaStopwatch,
  FaUpload,
  FaWindowMaximize,
  FaWpforms,
  FaGhost,
  FaLink,
  FaKeyboard,
} from "react-icons/fa"

import {
  MdMouse,
  MdOutlineRadioButtonChecked,
  MdOutlineWeb,
  MdTableChart,
} from "react-icons/md"

export type ModuleCategory =
  | "dialogs"
  | "inputs"
  | "browser"
  | "interactions"
  | "synchronization"
  | "data"
  | "advanced"
  | "security"

export type PracticeModule = {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  link: string
  category: ModuleCategory
}

// Sorted A → Z by title
export const modules: PracticeModule[] = [
  {
    id: "alerts",
    title: "Alerts",
    description:
      "Handle simple alerts, confirmation dialogs, and prompt workflows with reliable Selenium commands.",
    icon: FaBell,
    color: "module-card__icon--red",
    link: "/alerts",
    category: "dialogs",
  },
  {
    id: "basic-auth",
    title: "Basic Auth Login",
    description:
      "Sign in with username admin and password admin. Each visit opens the browser's Basic Auth prompt.",
    icon: FaLock,
    color: "module-card__icon--rose",
    link: "/basic-auth",
    category: "security",
  },
  {
    id: "broken-links",
    title: "Broken Links",
    description:
      "Detect broken links and missing images by checking HTTP status codes and load failures.",
    icon: FaLink,
    color: "module-card__icon--fuchsia",
    link: "/broken-links",
    category: "advanced",
  },
  {
    id: "calendar",
    title: "Calendar",
    description:
      "Practice date inputs, custom calendar navigation, and web table interactions for scheduling flows.",
    icon: FaCalendarAlt,
    color: "module-card__icon--purple",
    link: "/calendar",
    category: "inputs",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description:
      "Automate single, grouped, and select-all checkbox scenarios with stable selectors.",
    icon: FaCheckSquare,
    color: "module-card__icon--green",
    link: "/checkbox",
    category: "inputs",
  },
  {
    id: "dropdown",
    title: "Dropdown",
    description:
      "Work through single-select, multi-select, and dynamic dropdown practice cases.",
    icon: FaList,
    color: "module-card__icon--blue",
    link: "/dropdown",
    category: "inputs",
  },
  {
    id: "explicit-wait",
    title: "Explicit Wait",
    description:
      "Wait for alerts, text changes, displayed elements, enabled controls, and checkbox state changes.",
    icon: FaStopwatch,
    color: "module-card__icon--waits",
    link: "/explicit-wait",
    category: "synchronization",
  },
  {
    id: "file-upload",
    title: "Files",
    description:
      "Practice single & batch file uploads, dropzones without inputs, and automated file downloads.",
    icon: FaUpload,
    color: "module-card__icon--yellow",
    link: "/file-upload",
    category: "inputs",
  },
  {
    id: "forms",
    title: "Forms",
    description:
      "Practice text inputs, validation, radio groups, checkboxes, dates, and submission assertions.",
    icon: FaWpforms,
    color: "module-card__icon--indigo",
    link: "/forms",
    category: "inputs",
  },
  {
    id: "frames",
    title: "Frames",
    description:
      "Switch into single and nested frames while keeping browser context handling clear.",
    icon: MdOutlineWeb,
    color: "module-card__icon--pink",
    link: "/frames",
    category: "browser",
  },
  {
    id: "https-errors",
    title: "HTTPS Context Errors",
    description:
      "Practice Playwright's ignoreHTTPSErrors context option with real SSL/certificate error pages.",
    icon: FaLock,
    color: "module-card__icon--zinc",
    link: "/https-errors",
    category: "security",
  },
  {
    id: "waits",
    title: "Implicit Wait",
    description:
      "Practice progressive element rendering and delayed form controls with Selenium implicit waits.",
    icon: FaHourglassHalf,
    color: "module-card__icon--waits",
    link: "/waits",
    category: "synchronization",
  },
  {
    id: "keyboard-events",
    title: "Keyboard Events",
    description:
      "Practice key combos (Ctrl+A/C/V/Z), special keys, Tab navigation, and keyboard-driven form interactions.",
    icon: FaKeyboard,
    color: "module-card__icon--indigo",
    link: "/keyboard-events",
    category: "interactions",
  },
  {
    id: "locators",
    title: "Locator Practice",
    description:
      "Target SVG elements and use XPath functions: normalize-space(), string-length(), floor(), and round().",
    icon: FaShieldAlt,
    color: "module-card__icon--teal",
    link: "/locators",
    category: "advanced",
  },
  {
    id: "mouse",
    title: "Mouse Events",
    description:
      "Train click actions, hover states, drag-and-drop, and slider automation.",
    icon: MdMouse,
    color: "module-card__icon--orange",
    link: "/mouse",
    category: "interactions",
  },
  {
    id: "radio-button",
    title: "Radio Button",
    description:
      "Automate individual and grouped radio button selection with accessible labels.",
    icon: MdOutlineRadioButtonChecked,
    color: "module-card__icon--teal",
    link: "/radiobutton",
    category: "inputs",
  },
  {
    id: "shadow-dom",
    title: "Shadow DOM",
    description:
      "Locate and interact with elements encapsulated inside an open Shadow DOM boundary.",
    icon: FaGhost,
    color: "module-card__icon--zinc",
    link: "/shadow-dom",
    category: "advanced",
  },
  {
    id: "suggestion-list",
    title: "Suggestion List",
    description:
      "Practice Selenium autocomplete interactions with static and dynamic suggestion lists.",
    icon: MdTableChart,
    color: "module-card__icon--cyan",
    link: "/suggestion-list",
    category: "inputs",
  },
  {
    id: "tables",
    title: "Web Tables",
    description:
      "Sort, filter, paginate, and delete rows in a dynamic HTML table with stable locators.",
    icon: MdTableChart,
    color: "module-card__icon--amber",
    link: "/tables",
    category: "data",
  },
  {
    id: "windows",
    title: "Windows",
    description:
      "Practice new tabs, popup windows, and multi-window Selenium WebDriver handling.",
    icon: FaWindowMaximize,
    color: "module-card__icon--rose",
    link: "/windows",
    category: "browser",
  },
]
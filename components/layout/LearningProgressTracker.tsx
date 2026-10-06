"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { modules } from "@/data/modules"
import { useModuleContext } from "@/hooks/useModuleContext"

export default function LearningProgressTracker() {
  const pathname = usePathname()
  const { learningProgressLoaded, recordModuleVisit } = useModuleContext()

  useEffect(() => {
    if (!learningProgressLoaded) return

    const currentModule = modules.find((module) => module.link === pathname)
    if (currentModule) recordModuleVisit(currentModule.id)
  }, [learningProgressLoaded, pathname, recordModuleVisit])

  return null
}

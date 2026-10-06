"use client"

import React, { createContext, useCallback, useEffect, useState } from "react"

/**
 * Global preferences for user interactions and notifications
 */
export interface UserPreferences {
  notificationPermission: NotificationPermission | null
  notificationAsked: boolean
  leadPopupShown: boolean
}

/**
 * Module search and filter state for dashboard
 */
export interface ModuleFilter {
  searchQuery: string
  selectedCategory?: string
}

export interface LearningProgress {
  visitedModuleIds: string[]
  completedModuleIds: string[]
  practiceDates: string[]
}

/**
 * Complete context state
 */
export interface ModuleContextType {
  // User Preferences
  userPreferences: UserPreferences
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void
  setNotificationAsked: (asked: boolean) => void
  setNotificationPermission: (permission: NotificationPermission) => void
  setLeadPopupShown: (shown: boolean) => void

  // Module Filtering
  moduleFilter: ModuleFilter
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category?: string) => void
  resetFilters: () => void

  // Learning Progress
  learningProgress: LearningProgress
  learningProgressLoaded: boolean
  recordModuleVisit: (moduleId: string) => void
  setModuleCompleted: (moduleId: string, completed: boolean) => void
}

/**
 * Default preferences
 */
const defaultPreferences: UserPreferences = {
  notificationPermission: null,
  notificationAsked: false,
  leadPopupShown: false,
}

const defaultFilter: ModuleFilter = {
  searchQuery: "",
  selectedCategory: undefined,
}

const defaultLearningProgress: LearningProgress = {
  visitedModuleIds: [],
  completedModuleIds: [],
  practiceDates: [],
}

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function parseLearningProgress(value: string | null): LearningProgress {
  if (!value) return defaultLearningProgress

  const parsed: unknown = JSON.parse(value)
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Stored learning progress must be an object")
  }

  const progress = parsed as Partial<LearningProgress>
  const validDates = (Array.isArray(progress.practiceDates)
    ? progress.practiceDates
    : []
  ).filter(
    (date): date is string =>
      typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
  )

  return {
    visitedModuleIds: Array.isArray(progress.visitedModuleIds)
      ? progress.visitedModuleIds.filter(
          (id): id is string => typeof id === "string"
        )
      : [],
    completedModuleIds: Array.isArray(progress.completedModuleIds)
      ? progress.completedModuleIds.filter(
          (id): id is string => typeof id === "string"
        )
      : [],
    practiceDates: [...new Set(validDates)],
  }
}

/**
 * Create the context
 */
export const ModuleContext = createContext<ModuleContextType | undefined>(
  undefined
)

/**
 * ModuleProvider Component
 * Manages global state for user preferences and module filtering
 * Persists preferences to localStorage
 */
export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences>(defaultPreferences)
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>(defaultFilter)
  const [learningProgress, setLearningProgress] = useState<LearningProgress>(
    defaultLearningProgress
  )
  const [preferencesLoaded, setPreferencesLoaded] = useState(false)
  const [learningProgressLoaded, setLearningProgressLoaded] = useState(false)

  /**
   * Load preferences from localStorage on mount
   */
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = localStorage.getItem("userPreferences")
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserPreferences>
        setUserPreferences((prev) => ({ ...prev, ...parsed }))
      } else {
        // Also check old keys for migration
        const oldNotificationAsked = localStorage.getItem("notificationAsked")
        const oldNotificationPerm = localStorage.getItem("notificationPermission")
        const oldLeadPopupShown = localStorage.getItem("leadPopupShown")

        if (oldNotificationAsked || oldNotificationPerm || oldLeadPopupShown) {
          setUserPreferences((prev) => ({
            ...prev,
            notificationAsked: oldNotificationAsked === "true",
            notificationPermission: oldNotificationPerm as NotificationPermission,
            leadPopupShown: oldLeadPopupShown === "true",
          }))
        }
      }
    } catch (error) {
      console.error("Failed to load preferences from localStorage:", error)
    } finally {
      setPreferencesLoaded(true)
    }
  }, [])

  /**
   * Persist preferences to localStorage when they change
   */
  useEffect(() => {
    if (typeof window === "undefined" || !preferencesLoaded) return

    try {
      localStorage.setItem("userPreferences", JSON.stringify(userPreferences))
    } catch (error) {
      console.error("Failed to save preferences to localStorage:", error)
    }
  }, [preferencesLoaded, userPreferences])

  useEffect(() => {
    try {
      setLearningProgress(
        parseLearningProgress(localStorage.getItem("learningProgress"))
      )
    } catch (error) {
      console.error("Failed to load learning progress from localStorage:", error)
    } finally {
      setLearningProgressLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!learningProgressLoaded) return

    try {
      localStorage.setItem("learningProgress", JSON.stringify(learningProgress))
    } catch (error) {
      console.error("Failed to save learning progress to localStorage:", error)
    }
  }, [learningProgress, learningProgressLoaded])

  /**
   * Update user preferences
   */
  const updateUserPreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setUserPreferences((prev) => ({ ...prev, ...prefs }))
  }, [])

  /**
   * Set notification asked flag
   */
  const setNotificationAsked = useCallback((asked: boolean) => {
    updateUserPreferences({ notificationAsked: asked })
  }, [updateUserPreferences])

  /**
   * Set notification permission
   */
  const setNotificationPermission = useCallback(
    (permission: NotificationPermission) => {
      updateUserPreferences({ notificationPermission: permission })
    },
    [updateUserPreferences]
  )

  /**
   * Set lead popup shown flag
   */
  const setLeadPopupShown = useCallback((shown: boolean) => {
    updateUserPreferences({ leadPopupShown: shown })
  }, [updateUserPreferences])

  /**
   * Update search query
   */
  const setSearchQuery = useCallback((query: string) => {
    setModuleFilter((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  /**
   * Update selected category filter
   */
  const setSelectedCategory = useCallback((category?: string) => {
    setModuleFilter((prev) => ({ ...prev, selectedCategory: category }))
  }, [])

  /**
   * Reset all filters to defaults
   */
  const resetFilters = useCallback(() => {
    setModuleFilter(defaultFilter)
  }, [])

  const recordModuleVisit = useCallback((moduleId: string) => {
    setLearningProgress((previous) =>
      previous.visitedModuleIds.includes(moduleId)
        ? previous
        : {
            ...previous,
            visitedModuleIds: [...previous.visitedModuleIds, moduleId],
          }
    )
  }, [])

  const setModuleCompleted = useCallback(
    (moduleId: string, completed: boolean) => {
      setLearningProgress((previous) => {
        if (
          !previous.visitedModuleIds.includes(moduleId) ||
          previous.completedModuleIds.includes(moduleId) === completed
        ) {
          return previous
        }

        const today = getLocalDateKey(new Date())

        return {
          ...previous,
          completedModuleIds: completed
            ? [...previous.completedModuleIds, moduleId]
            : previous.completedModuleIds.filter((id) => id !== moduleId),
          practiceDates: completed
            ? [...new Set([...previous.practiceDates, today])]
            : previous.practiceDates,
        }
      })
    },
    []
  )

  const value: ModuleContextType = {
    userPreferences,
    updateUserPreferences,
    setNotificationAsked,
    setNotificationPermission,
    setLeadPopupShown,
    moduleFilter,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
    learningProgress,
    learningProgressLoaded,
    recordModuleVisit,
    setModuleCompleted,
  }

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  )
}

ModuleProvider.displayName = "ModuleProvider"

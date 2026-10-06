"use client"

import { modules } from "@/data/modules"
import { useModuleContext } from "@/hooks/useModuleContext"
import { OPEN_LEAD_REGISTRATION_EVENT } from "@/lib/browserEvents"

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function getCurrentStreak(practiceDates: string[]): number {
  const dates = new Set(practiceDates)
  const today = new Date()
  const todayKey = getLocalDateKey(today)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  let currentDate = dates.has(todayKey) ? today : yesterday
  let streak = 0

  while (dates.has(getLocalDateKey(currentDate))) {
    streak += 1
    currentDate = new Date(currentDate)
    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

export default function LearningProgressSummary() {
  const {
    learningProgress,
    setLeadPopupShown,
    userPreferences,
  } = useModuleContext()
  const completedCount = learningProgress.completedModuleIds.length
  const progressPercent = Math.round((completedCount / modules.length) * 100)
  const streak = getCurrentStreak(learningProgress.practiceDates)

  const achievements = [
    { title: "First challenge", earned: completedCount >= 1 },
    { title: "Five modules", earned: completedCount >= 5 },
    { title: "Three-day streak", earned: streak >= 3 },
    { title: "All modules", earned: completedCount >= modules.length },
  ]

  return (
    <section
      className="learning-progress"
      aria-label="Your practice progress"
    >
      <div className="learning-progress__overview">
        <div>
          <p className="learning-progress__eyebrow">Your learning path</p>
          <h3 className="learning-progress__title">
            {completedCount} of {modules.length} modules completed
          </h3>
          <p className="learning-progress__hint">
            Open a module, try its scenarios, then mark it complete here.
            Progress is saved in this browser.
          </p>
        </div>

        <div className="learning-progress__streak">
          <span aria-hidden="true">🔥</span>
          <span>
            <strong>{streak}</strong>
            <span className="learning-progress__streak-label">
              {streak === 1 ? " practice day" : " practice days"}
            </span>
          </span>
        </div>
      </div>

      <div
        className="learning-progress__bar"
        role="progressbar"
        aria-label="Practice modules completed"
        aria-valuemin={0}
        aria-valuemax={modules.length}
        aria-valuenow={completedCount}
        aria-valuetext={`${completedCount} of ${modules.length} modules completed`}
      >
        <span
          className="learning-progress__bar-value"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <ul className="learning-progress__achievements" aria-label="Achievements">
        {achievements.map((achievement) => (
          <li
            key={achievement.title}
            aria-label={`${achievement.title}: ${
              achievement.earned ? "earned" : "not yet earned"
            }`}
            className={`learning-progress__badge${
              achievement.earned ? " learning-progress__badge--earned" : ""
            }`}
          >
            <span aria-hidden="true">{achievement.earned ? "★" : "☆"}</span>
            {achievement.title}
          </li>
        ))}
      </ul>

      {completedCount > 0 && !userPreferences.leadPopupShown && (
        <aside
          className="learning-progress__mobile-prompt"
          aria-label="Optional registration form challenge"
        >
          <div>
            <h4>Ready for one more practice challenge?</h4>
            <p>
              Try the registration form, too. It won&apos;t interrupt your
              practice.
            </p>
          </div>
          <div className="learning-progress__mobile-actions">
            <button
              type="button"
              className="learning-progress__mobile-try"
              onClick={() =>
                window.dispatchEvent(
                  new Event(OPEN_LEAD_REGISTRATION_EVENT)
                )
              }
            >
              Try the form
            </button>
            <button
              type="button"
              className="learning-progress__mobile-dismiss"
              onClick={() => setLeadPopupShown(true)}
            >
              Dismiss
            </button>
          </div>
        </aside>
      )}
    </section>
  )
}

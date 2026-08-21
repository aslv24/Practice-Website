/**
 * Dynamic Style Utilities
 *
 * Tailwind CSS cannot generate arbitrary utility values at runtime because it relies on
 * static class names at build time. For dynamic values (like progress percentages or
 * slider positions), inline styles are necessary and the correct approach.
 *
 * This module provides utilities for safely handling dynamic styles.
 */

/**
 * Create a safe inline style object for dynamic width values
 * Used for progress bars, sliders, and other dynamic width elements
 *
 * @param percentage - Value from 0-100
 * @returns Style object for the component
 *
 * @example
 * ```tsx
 * <div style={dynamicWidth(progress)} />
 * ```
 */
export const dynamicWidth = (percentage: number) => {
  const validated = Math.max(0, Math.min(100, percentage))
  return { width: `${validated}%` }
}

/**
 * Create a safe inline style object for dynamic height values
 * Used for height-based progress indicators
 *
 * @param percentage - Value from 0-100
 * @returns Style object for the component
 */
export const dynamicHeight = (percentage: number) => {
  const validated = Math.max(0, Math.min(100, percentage))
  return { height: `${validated}%` }
}

/**
 * Create a safe inline style object for transforms
 * Used for animations and transitions
 *
 * @param transform - CSS transform value (e.g., "translateX(100px)")
 * @returns Style object for the component
 *
 * @example
 * ```tsx
 * <div style={dynamicTransform(`rotate(${angle}deg)`)} />
 * ```
 */
export const dynamicTransform = (transform: string) => {
  return { transform }
}

/**
 * Merge dynamic style objects with Tailwind-managed classes
 * Ensures proper precedence: inline styles override Tailwind classes
 *
 * @param base - Base style object
 * @param overrides - Additional style overrides
 * @returns Merged style object
 *
 * @example
 * ```tsx
 * const style = mergeStyles(
 *   dynamicWidth(progress),
 *   { backgroundColor: color }
 * )
 * ```
 */
export const mergeStyles = (
  base: React.CSSProperties = {},
  overrides: React.CSSProperties = {}
): React.CSSProperties => {
  return { ...base, ...overrides }
}

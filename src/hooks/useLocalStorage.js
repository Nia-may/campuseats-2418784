import { useEffect, useState } from 'react'

// Like useState, but saves data in localStorage.
export function useLocalStorage(key, initialValue, enabled = true) {

  // Load the saved value when the component first mounts.
  const [stored, setStored] = useState(() => {
    if (!enabled || !key) {
      return { key: null, value: initialValue }
    }

    try {
      const saved = localStorage.getItem(key)

      return {
        key,
        value: saved !== null
          ? JSON.parse(saved)
          : initialValue
      }
    } catch {
      return { key, value: initialValue }
    }
  })

  // Load the correct value when the user or key changes.
  useEffect(() => {
    if (!enabled || !key) {
      setStored(current => {
        if (current.key === null) return current

        return { key: null, value: initialValue }
      })

      return
    }

    setStored(current => {
      // Already using the correct user's data.
      if (current.key === key) return current

      try {
        const saved = localStorage.getItem(key)

        return {
          key,
          value: saved !== null
            ? JSON.parse(saved)
            : initialValue
        }
      } catch {
        return { key, value: initialValue }
      }
    })
  }, [key, enabled])

  // Save only when the data belongs to the current user.
  useEffect(() => {
    if (!enabled || !key || stored.key !== key) return

    try {
      localStorage.setItem(key, JSON.stringify(stored.value))
    } catch {
      // Keep working if localStorage is unavailable.
    }
  }, [key, enabled, stored])

  // Do not display another user's saved preference.
  const value =
    enabled && key && stored.key === key
      ? stored.value
      : initialValue

  // Update the value.
  function setValue(newValue) {
    if (!enabled || !key) return

    setStored(current => {
      const currentValue =
        current.key === key
          ? current.value
          : initialValue

      const updatedValue =
        typeof newValue === 'function'
          ? newValue(currentValue)
          : newValue

      return {
        key,
        value: updatedValue
      }
    })
  }

  return [value, setValue]
}

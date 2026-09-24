import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemePreference = 'dark' | 'light' | 'system'
export type EffectiveTheme = 'dark' | 'light'

interface ThemeContextType {
  theme: ThemePreference
  effectiveTheme: EffectiveTheme
  systemTheme: EffectiveTheme
  setTheme: (theme: ThemePreference) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'ausat_orbit_theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getSystemTheme = (): EffectiveTheme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  }

  const [systemTheme, setSystemTheme] = useState<EffectiveTheme>(getSystemTheme)
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemePreference | null
      if (saved && (saved === 'dark' || saved === 'light' || saved === 'system')) {
        return saved
      }
    }
    // Intelligently defaults to system detection
    return 'system'
  })

  const effectiveTheme: EffectiveTheme = theme === 'system' ? systemTheme : theme

  const applyThemeToDOM = (activeTheme: EffectiveTheme) => {
    const root = document.documentElement
    if (activeTheme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }

  // Listen to OS system color-scheme changes in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystem = (e: MediaQueryListEvent | MediaQueryList) => {
      const current = e.matches ? 'dark' : 'light'
      setSystemTheme(current)
    }

    updateSystem(mediaQuery)

    const listener = (e: MediaQueryListEvent) => updateSystem(e)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // Synchronize DOM classes whenever effective theme updates
  useEffect(() => {
    applyThemeToDOM(effectiveTheme)
  }, [effectiveTheme])

  const setTheme = (newTheme: ThemePreference) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }

  const toggleTheme = () => {
    // If currently dark -> switch to light; if currently light -> switch to dark
    const nextTheme: EffectiveTheme = effectiveTheme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, systemTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

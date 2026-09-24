import { useState, useEffect, useCallback, MouseEvent } from 'react'

export type RoutePath = '/' | '/dashboard' | '/informes' | '/todo'

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/'
  })

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
      setCurrentPath(path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return { currentPath, navigate }
}

export function handleLinkClick(
  e: MouseEvent<HTMLAnchorElement>, 
  path: string, 
  navigate: (p: string) => void
) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return
  }
  e.preventDefault()
  navigate(path)
}

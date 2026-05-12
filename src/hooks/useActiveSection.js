import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = [...sectionIds]
    if (!ids.length) return
    const visible = new Set()
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
          const first = ids.find(s => visible.has(s))
          if (first) setActive(first)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')])

  return active
}

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Home from './pages/Home'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'

function AnimatedRoutes() {
  const location = useLocation()
  const containerRef = useRef(null)
  const didMount = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (!didMount.current) {
      didMount.current = true
      return
    }
    el.style.opacity = '0'
    const t = setTimeout(() => { el.style.opacity = '1' }, 50)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div
      ref={containerRef}
      style={{ transition: 'opacity 200ms ease' }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

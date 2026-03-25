import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll('[data-anim]').forEach(el => {
        (el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }

    const observe = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.01, rootMargin: '0px 0px 50px 0px' }
      )

      document.querySelectorAll('[data-anim]:not(.is-visible)').forEach((el) => observer.observe(el))
      return observer
    }

    // Initial observe
    let obs = observe()

    // Re-observe shortly after mount to catch elements already in viewport
    const t1 = setTimeout(() => { obs?.disconnect(); obs = observe() }, 50)
    const t2 = setTimeout(() => { obs?.disconnect(); obs = observe() }, 300)

    let scrollTimer: number
    const onScroll = () => {
      clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        const hidden = document.querySelectorAll('[data-anim]:not(.is-visible)')
        if (hidden.length > 0) {
          obs?.disconnect()
          obs = observe()
        }
      }, 200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      obs?.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(scrollTimer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [location.pathname])
}

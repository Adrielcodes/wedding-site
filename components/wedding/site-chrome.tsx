"use client"

import { useEffect, useRef } from "react"

/**
 * SiteChrome — ambient page furniture:
 *  • a thin gold scroll-progress bar pinned to the top
 *  • a soft gold glow that trails the cursor (desktop / fine-pointer only)
 *
 * Both are purely decorative and driven by requestAnimationFrame so they
 * never block scrolling.
 */
export function SiteChrome() {
  const barRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  // ── Scroll progress ──────────────────────────────────────────
  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = barRef.current
      if (el) {
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        const p = max > 0 ? h.scrollTop / max : 0
        el.style.setProperty("--progress", String(p))
      }
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // ── Cursor glow ──────────────────────────────────────────────
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    if (!fine.matches) return

    const el = glowRef.current
    if (!el) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let raf = 0
    let visible = false

    const render = () => {
      cx += (tx - cx) * 0.14
      cy += (ty - cy) * 0.14
      el.style.setProperty("--cx", `${cx}px`)
      el.style.setProperty("--cy", `${cy}px`)
      raf = requestAnimationFrame(render)
    }

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!visible) {
        visible = true
        el.classList.add("active")
      }
    }
    const onLeave = () => {
      visible = false
      el.classList.remove("active")
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  )
}

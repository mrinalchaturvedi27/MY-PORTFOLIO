import { useEffect, useRef } from 'react'

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}$#'
const DURATION = 6000

// Easter egg: full-screen matrix rain for a few seconds. Click or Esc to dismiss.
export function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().split(/\s+/).join(',')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const size = 16
    const drops = Array.from({ length: Math.ceil(canvas.width / size) }, () => Math.random() * -50)
    let frame = 0
    const tick = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = `rgb(${accent})`
      ctx.font = `${size}px monospace`
      drops.forEach((y, i) => {
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * size, y * size)
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onDone()
    window.addEventListener('keydown', onKey)
    const timer = setTimeout(onDone, DURATION)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
    }
  }, [onDone])

  return <canvas ref={canvasRef} onClick={onDone} className="fixed inset-0 z-[90] cursor-pointer bg-black" aria-hidden="true" />
}

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

const LABELS = ['n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.', 'n.']

export default function PhysicsTokens({ className = '' }) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const { Engine, Render, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter

    const engine = Engine.create({ gravity: { x: 0, y: 0.72 } })
    const world = engine.world

    const render = Render.create({
      element: host,
      canvas,
      engine,
      options: {
        width: host.clientWidth,
        height: host.clientHeight,
        background: 'transparent',
        wireframes: false,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
    })

    const wallOpts = { isStatic: true, render: { visible: false } }
    let walls = []
    let tokens = []

    const build = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (w < 40 || h < 40) return

      Composite.clear(world, false)
      walls = [
        Bodies.rectangle(w / 2, h + 40, w + 80, 80, wallOpts),
        Bodies.rectangle(w / 2, -40, w + 80, 80, wallOpts),
        Bodies.rectangle(-40, h / 2, 80, h + 80, wallOpts),
        Bodies.rectangle(w + 40, h / 2, 80, h + 80, wallOpts),
      ]
      Composite.add(world, walls)

      const sizes = [42, 54, 64, 48, 72, 58, 50, 68, 44, 60, 52, 76, 46, 56]
      const colors = [
        '#ffffff',
        '#d4c4f7',
        '#1a1a1a',
        '#f0ebf8',
        '#a78bfa',
        '#2a2a2a',
        '#ffffff',
        '#c4b5fd',
        '#111111',
        '#ede9fe',
        '#8b5cf6',
        '#333333',
        '#f5f3ff',
        '#1a1a1a',
      ]
      tokens = sizes.map((r, i) => {
        // Mix drop-ins with mid-air spawns so the hero fills immediately
        const midAir = i % 3 !== 0
        const body = Bodies.circle(
          w * (0.28 + Math.random() * 0.62),
          midAir ? h * (0.25 + Math.random() * 0.55) : -40 - i * 28,
          r / 2,
          {
            restitution: 0.68,
            friction: 0.035,
            frictionAir: 0.016,
            render: {
              fillStyle: colors[i % colors.length],
              strokeStyle: 'rgba(255,255,255,0.15)',
              lineWidth: 1,
            },
            label: LABELS[i % LABELS.length],
          }
        )
        return body
      })
      Composite.add(world, tokens)

      render.options.width = w
      render.options.height = h
      render.canvas.width = w * render.options.pixelRatio
      render.canvas.height = h * render.options.pixelRatio
      render.canvas.style.width = `${w}px`
      render.canvas.style.height = `${h}px`
      Render.setPixelRatio(render, render.options.pixelRatio)
    }

    build()

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.18, render: { visible: false } },
    })
    Composite.add(world, mouseConstraint)
    render.mouse = mouse

    Events.on(engine, 'beforeUpdate', () => {
      if (!mouse.position) return
      const mx = mouse.position.x
      const my = mouse.position.y
      tokens.forEach((body) => {
        const dx = body.position.x - mx
        const dy = body.position.y - my
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        if (dist < 140) {
          const force = ((140 - dist) / 140) * 0.0018
          Body.applyForce(body, body.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          })
        }
      })
    })

    Events.on(render, 'afterRender', () => {
      const ctx = render.context
      const bodies = Composite.allBodies(world)
      bodies.forEach((body) => {
        if (!body.label || body.label.length > 3) return
        const { x, y } = body.position
        const r = body.circleRadius || 24
        const fill = body.render.fillStyle || '#fff'
        const dark = fill === '#1a1a1a' || fill === '#2a2a2a' || fill === '#111111' || fill === '#333333'
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(body.angle)
        ctx.fillStyle = dark ? '#fff' : '#6b3fd4'
        ctx.font = `700 ${Math.max(14, r * 0.55)}px Syne, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(body.label, 0, 1)
        ctx.restore()
      })
    })

    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    const onResize = () => build()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      Render.stop(render)
      Runner.stop(runner)
      Engine.clear(engine)
      if (render.canvas?.parentNode) render.canvas.remove()
    }
  }, [])

  return (
    <div className={`aw-tokens ${className}`} ref={hostRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}

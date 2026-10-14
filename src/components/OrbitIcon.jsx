/** Orbit graphic with multiple moons — Awake service-card accent */
export default function OrbitIcon({ className = '' }) {
  return (
    <svg className={`aw-orbit-icon ${className}`} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="11" fill="none" stroke="currentColor" strokeWidth="1.35" />
      <g className="aw-orbit-spin aw-orbit-spin-a">
        <ellipse
          cx="32"
          cy="32"
          rx="26"
          ry="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          transform="rotate(-28 32 32)"
        />
        <circle cx="54" cy="26" r="2.8" fill="currentColor" />
        <circle cx="12" cy="40" r="2.1" fill="currentColor" opacity="0.7" />
      </g>
      <g className="aw-orbit-spin aw-orbit-spin-b">
        <ellipse
          cx="32"
          cy="32"
          rx="22"
          ry="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.55"
          transform="rotate(38 32 32)"
        />
        <circle cx="48" cy="42" r="1.8" fill="currentColor" opacity="0.8" />
      </g>
    </svg>
  )
}

import { useRef } from 'react'
import useMagnetic from '../hooks/useMagnetic'

export default function Magnetic({ children, className = '', strength = 0.32, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  useMagnetic(ref, { strength })

  return (
    <Tag ref={ref} className={`aw-magnetic ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

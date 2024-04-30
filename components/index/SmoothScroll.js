import { ReactLenis } from '@studio-freight/react-lenis'
import React from 'react'

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  )
}

import '@/styles/globals.css'
import * as React from 'react'

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

import '@/styles/globals.css'
import * as React from 'react'

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react'
import { LoaderProvider } from '@/hooks/use-loader'
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <NextUIProvider>
      <LoaderProvider>
        <Component {...pageProps} />
      </LoaderProvider>
    </NextUIProvider>
  )
}

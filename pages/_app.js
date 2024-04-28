import '@/styles/globals.css'
import * as React from 'react'
import { AuthProvider } from '@/hooks/use-auth'

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react'
import { LoaderProvider } from '@/hooks/use-loader'
// import { RoleProvider } from '@/hooks/use-role'
// import { ColorProvider } from '@/hooks/use-color'
// import { OccProvider } from '@/hooks/use-occ'
import { CartProvider } from '@/context/shop-cart-context'
import { FillOutProvider } from '@/context/fill-out-context'
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <NextUIProvider>
      <AuthProvider>
        <LoaderProvider>
          <CartProvider>
            <FillOutProvider>
              <Component {...pageProps} />
            </FillOutProvider>
          </CartProvider>
        </LoaderProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}

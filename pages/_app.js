import '@/styles/globals.css'
import * as React from 'react'
import { AuthProvider } from '@/hooks/use-auth'
// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react'
import { LoaderProvider } from '@/hooks/use-loader'
import { CourseFavoritesProvider } from '@/hooks/use-course-fav'
import { CartProvider } from '@/context/shop-cart-context'
import { FillOutProvider } from '../context/fill-out-context'
import { FlowerCartProvider } from '@/hooks/use-flowerCart'
import { FillOutProvider } from '@/context/fill-out-context'
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <NextUIProvider>
      <AuthProvider>
        <LoaderProvider>
          <CourseFavoritesProvider>
            <CartProvider>
              <FillOutProvider>
                <FlowerCartProvider>
                  <Component {...pageProps} />
                </FlowerCartProvider>
              </FillOutProvider>
            </CartProvider>
          </CourseFavoritesProvider>
        </LoaderProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}

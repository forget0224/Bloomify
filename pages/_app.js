import '@/styles/globals.css'
import * as React from 'react'
import { AuthProvider } from '@/hooks/use-auth'
// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react'
import { LoaderProvider } from '@/hooks/use-loader'
import { CourseFavoritesProvider } from '@/hooks/use-course-fav'
import { ProductFavoritesProvider } from '@/context/shop-fav-context'
import { CartProvider } from '@/context/shop-cart-context'
import { FillOutProvider } from '../context/fill-out-context'
import { FlowerCartProvider } from '@/hooks/use-flowerCart'
import { CourseCartProvider } from '@/context/course-cart-context'
import { Toaster } from 'react-hot-toast'
import '@/i18n/i18' // Import i18n configuration
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/i18'
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <NextUIProvider>
      <AuthProvider>
        <LoaderProvider>
          <CourseFavoritesProvider>
            <ProductFavoritesProvider>
              <CartProvider>
                <CourseCartProvider>
                  <FillOutProvider>
                    <FlowerCartProvider>
                      <I18nextProvider i18n={i18n}>
                        <Component {...pageProps} />
                      </I18nextProvider>
                    </FlowerCartProvider>
                  </FillOutProvider>
                </CourseCartProvider>
              </CartProvider>
            </ProductFavoritesProvider>
          </CourseFavoritesProvider>
        </LoaderProvider>
      </AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#68A392',
            },
            style: {
              border: '1px solid #68A392',
              padding: '16px',
              color: '#68A392',
            },
          },
          error: {
            iconTheme: {
              primary: '#FFAC9A',
            },
            style: {
              border: '1px solid #FFAC9A',
              padding: '16px',
              color: '#FFAC9A',
            },
          },
        }}
      />
    </NextUIProvider>
  )
}

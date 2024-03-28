import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'

import ProductDetails from '../../../components/shop/details/product-details'
import ProductReview from '../../../components/shop/details/product-reviews'
import ShopSlider from '@/components/shop/shop-slider'

export default function Shop() {
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div className="mx-auto md:px-52 sm:24">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>線上商城</BreadcrumbItem>
              <BreadcrumbItem>商品細節</BreadcrumbItem>
            </Breadcrumbs>
            {/* product information start */}
            {/* product information end */}
            <ProductDetails />
            <hr className="my-16" />
            <ProductReview />
            <hr className="my-16" />
            <ShopSlider />
          </div>
        </>
      }
    </DefaultLayout>
  )
}

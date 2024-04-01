import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import ProductInfo from '../../components/shop/details/product-info'
import ProductDetails from '../../components/shop/details/product-details'
import ProductReview from '../../components/shop/details/product-reviews'
import HistorySlider from '../../components/shop/details/history-slider'

export default function Shop() {
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <Breadcrumbs>
            <BreadcrumbItem>首頁</BreadcrumbItem>
            <BreadcrumbItem>線上商城</BreadcrumbItem>
            <BreadcrumbItem>商品細節</BreadcrumbItem>
          </Breadcrumbs>
          <ProductInfo />
          <ProductDetails />
          <ProductReview />
          <hr className="my-3" />
          <HistorySlider />
        </>
      }
    </DefaultLayout>
  )
}

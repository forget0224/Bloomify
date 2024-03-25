import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Carousel from '../../components/shop/home/Carousel.js'
import Category from '../../components/shop/home/Category.js'
import SearchSort from '../../components/shop/home/SearchSort.js'
import Products from '../../components/shop/home/Products.js'
import { MyButton } from '@/components/btn/mybutton.js'
import ShopSlider from '../../components/shop/home/ShopSlider.js'
import Filter from '../../components/shop/home/Filter.js'

export default function Shop() {
  const [activePage, setActivePage] = useState('shop')
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <Breadcrumbs>
            <BreadcrumbItem>首頁</BreadcrumbItem>
            <BreadcrumbItem>線上商城</BreadcrumbItem>
          </Breadcrumbs>
          <Carousel />
          <Category />
          <SearchSort />
          <div className="flex flex-row">
            <div className="flex-grow">
              <Filter />
            </div>
            <div className="flex-grow-0 flex-shrink">
              <Products />
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="flex flex-col text-center"
              style={{ margin: '40px' }}
            >
              <h1 style={{ paddingBottom: '24px' }}>繼續探索</h1>
              <MyButton color="primary" size="xl">
                查看更多
              </MyButton>
            </div>
          </div>
          <ShopSlider />
        </>
      }
    </DefaultLayout>
  )
}

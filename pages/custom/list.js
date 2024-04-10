import { useState, useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import CustomFilter from '@/components/custom/product/CustomFilter'
import Link from 'next/link'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import DH from '@/components/custom/product/DH'
import { CiGrid41, CiGrid2H, CiBoxList } from 'react-icons/ci'
import { PiSlidersThin } from 'react-icons/pi'
import DraggableProductList from '@/components/custom/product/draggableProductList'
import DraggableCards from '@/components/custom/DraggableCards'
import FilterButton from '@/components/custom/product/filterBtn'
import BottomSheetButton from '@/components/custom/BottomSheetButton'
// import FilterContent from '@/components/custom/product/FilterContent'
import FilterContent from '@/components/custom/product/FilterContent'
const productList = [
  {
    src: '/custom/custom/flowers/03063469700328e035c37f615e1f3d7d.jpg',
    name: '玫瑰花束',
    store: '店家名稱',
    price: '780',
    discount: '',
    colors: [
      'red',
      'yellow',
      'blue',
      'orange',
      'green',
      'purple',
      'brown',
      'pink',
      'black',
      'white',
      'gary',
      'other',
    ],
  },

  {
    src: '/custom/custom/flowers/0c19e718edd2ba4ed62b185ba0d958c8.jpg',
    name: '百合花束',
    store: '店家名稱',
    price: '1320',
    discount: '150',
    colors: ['pink', 'black', 'red'],
  },
  {
    src: '/custom/custom/flowers/5925d3602969b5e1a4e547075168af80.jpg',
    name: '鬱金香花束',
    store: '店家名稱',
    price: '700',
    discount: '100',
    colors: ['pink', 'yellow'],
  },
  {
    src: '/custom/custom/flowers/a04a3b0f8d30f22ca8302eecfcfb9a28.jpg',
    name: '薰衣草花束',
    store: '店家名稱',
    price: '200',
    discount: '',
    colors: ['pink', 'black', 'red', 'purple', 'white'],
  },
  {
    src: '/custom/custom/flowers/cfbf57db29b572fec135cf7f75532d88.jpg',
    name: '小雛菊花束',
    store: '店家名稱',
    price: '350',
    discount: '',
    colors: ['pink', 'yellow', 'red', 'purple', 'white', 'green'],
  },
  {
    src: '/custom/custom/flowers/03063469700328e035c37f615e1f3d7d.jpg',
    name: '玫瑰花束',
    store: '店家名稱',
    price: '780',
    discount: '',
    colors: [
      'red',
      'yellow',
      'blue',
      'orange',
      'green',
      'purple',
      'brown',
      'pink',
      'black',
      'white',
      'gary',
      'other',
    ],
  },

  {
    src: '/custom/custom/flowers/0c19e718edd2ba4ed62b185ba0d958c8.jpg',
    name: '百合花束',
    store: '店家名稱',
    price: '1320',
    discount: '150',
    colors: ['pink', 'black', 'red'],
  },
  {
    src: '/custom/custom/flowers/5925d3602969b5e1a4e547075168af80.jpg',
    name: '鬱金香花束',
    store: '店家名稱',
    price: '700',
    discount: '100',
    colors: ['pink', 'yellow'],
  },
]

export default function List() {
  const [activePage, setActivePage] = useState('custom')
  const [isSheetOpen, setSheetOpen] = useState(false)

  const handleOpen = () => setSheetOpen(true)
  const handleClose = () => setSheetOpen(false)
  const [isHeart, setIsHeart] = useState(true)
  const handleHeartClick = () => {
    setIsHeart(!isHeart)
  }

  const [sortedList, setSortedList] = useState([])

  useEffect(() => {
    //  產品列表加載
    fetchSortedProducts('default')
  }, [])

  const fetchSortedProducts = async (sortType) => {
    try {
      const response = await fetch(`/api/products?sort=${sortType}`)
      setSortedList(response.data)
    } catch (error) {
      console.error('Error fetching sorted products:', error)
    }
  }

  return (
    <DefaultLayout activePage={activePage}>
      <>
        <div className="bg-white  w-screen h-auto overflow-visible">
          <div className="container m-auto">
            <div
              className="flex sm:flex-row flex-col "
              // style={{ minHeight: 'calc(100vh - 64px)' }}
            >
              <div className="h-[600px] w-auto  p-4 sticky top-0  hidden sm:block">
                <CustomFilter />
              </div>
              <div
                style={{ minHeight: 'calc(100vh - 64px)' }}
                className="min-h-full h-full sm:w-10/12 flex flex-col gap-3 sm:p-4 m-auto w-full p-2"
              >
                <div className="hidden sm:block">
                  <Breadcrumbs>
                    <BreadcrumbItem>首頁</BreadcrumbItem>
                    <BreadcrumbItem>代客送花</BreadcrumbItem>
                    <BreadcrumbItem color="primary">快速選購</BreadcrumbItem>
                  </Breadcrumbs>
                </div>

                <div className="w-full flex flex-row justify-end gap-3 text-tertiary-black text-2xl sm:hidden">
                  <BottomSheetButton
                    icon={<PiSlidersThin />}
                    iconClass="text-2xl"
                    label="排序與篩選"
                    // {...(<FilterContent />)}
                    // content={<div>sdfsdf</div>}
                    content={<FilterContent />}
                    isOpen={isSheetOpen}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    showArrows={false}
                    showLabel={false}
                    blocking={true}
                  />
                  <CiGrid41 />
                </div>

                <div className="">
                  <div className="flex flex-col gap-2 ">
                    <div className="flex flex-row justify-between">
                      <p className="sm:text-3xl text-xl text-tertiary-black select-none	">
                        聖誕節
                      </p>
                      <div className="hidden sm:flex flex-row gap-1">
                        {' '}
                        <FilterButton />
                        {/* <button
                          onClick={() => fetchSortedProducts('price_asc')}
                        >
                          按价格低到高排序
                        </button>
                        <button
                          onClick={() => fetchSortedProducts('price_desc')}
                        >
                          按价格高到低排序
                        </button>
                        <button onClick={() => fetchSortedProducts('newest')}>
                          按最新上架排序
                        </button>
                        <button onClick={() => fetchSortedProducts('sales')}>
                          按销量排序
                        </button> */}
                      </div>
                    </div>

                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={productList} className="h-auto" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      情人節
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={productList} className="h-auto" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      母親節
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={productList} className="h-auto" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      生日
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={productList} className="h-auto" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      慰問
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={productList} className="h-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </DefaultLayout>
  )
}

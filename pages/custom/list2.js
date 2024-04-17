import { useState, useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import CustomFilter from '@/components/custom/product/CustomFilter'
import Link from 'next/link'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import DH from '@/components/custom/product/DH'
import { CiGrid41, CiGrid2H, CiBoxList } from 'react-icons/ci'
import { PiSlidersThin } from 'react-icons/pi'
import FilterButton from '@/components/custom/product/filterBtn'
import BottomSheetButton from '@/components/custom/custom/BottomSheetButton'
import FilterContent from '@/components/custom/product/FilterContent'
import { useLoader } from '@/hooks/use-loader'
import Loader from '@/components/common/loader'
export default function List() {
  const [activePage, setActivePage] = useState('custom')
  const [isSheetOpen, setSheetOpen] = useState(false)

  const handleOpen = () => setSheetOpen(true)
  const handleClose = () => setSheetOpen(false)
  const [isHeart, setIsHeart] = useState(true)
  const { close, open, isLoading } = useLoader()
  const handleHeartClick = () => {
    setIsHeart(!isHeart)
  }

  const [sortedList, setSortedList] = useState([])

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const url = 'http://localhost:3005/api/custom'

    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const data = await res.json()
      console.log(data)

      if (Array.isArray(data.data.customTemplateLists)) {
        setProducts(data.data.customTemplateLists)
      }
      close(3)
    } catch (e) {
      console.error('Failed to load products:', e) // 更详细地记录错误
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const fetchSortedProducts = async (sortType) => {
    try {
      const response = await fetch(`/api/products?sort=${sortType}`)
      setSortedList(response.data)
    } catch (error) {
      console.error('Error fetching sorted products:', error)
    }
  }

  const display = (
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
                      <DH productList={products} className="h-auto" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      情人節
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={products} className="h-auto" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      母親節
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={products} className="h-auto" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      生日
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={products} className="h-auto" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <p className="sm:text-3xl text-xl text-tertiary-black">
                      慰問
                    </p>
                    <hr className="w-full" />

                    <div className="w-full h-full relative overflow-hidden">
                      <DH productList={products} className="h-auto" />
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
  return <>{isLoading ? <Loader /> : display}</>
}

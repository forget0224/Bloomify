import { useState, useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import CustomFilter from '@/components/custom/product/CustomFilter'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import DH from '@/components/custom/product/DH'
import { PiSlidersThin } from 'react-icons/pi'
import SortButton from '@/components/custom/product/sortButton'
import BottomSheetButton from '@/components/custom/custom/BottomSheetButton'
import FilterContent from '@/components/custom/product/FilterContent'
import { useLoader } from '@/hooks/use-loader'
import Loader from '@/components/common/loader'
import { ColorProvider } from '@/hooks/use-color'
import { FlowerTypeProvider } from '@/hooks/use-flowerType'
import { OccProvider } from '@/hooks/use-occ'
import { useAuth } from '@/hooks/use-auth'
import Head from 'next/head'
export default function List() {
  const { auth } = useAuth()
  const { isAuth } = auth
  console.log(auth)
  const [activePage, setActivePage] = useState('custom')
  const [isSheetOpen, setSheetOpen] = useState(false)

  const handleOpen = () => setSheetOpen(true)
  const handleClose = () => setSheetOpen(false)

  const { close, open, isLoading } = useLoader()

  const [selectedOccs, setSelectedOccs] = useState([])
  const [selectedflowerType, setSelectedflowerType] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [sortOption, setSortOption] = useState({ field: '', order: '' })
  const [radioSelection, setRadioSelection] = useState('')
  const [products, setProducts] = useState([])
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [filters, setFilters] = useState({})
  const [queryString, setQueryString] = useState('')

  const getProducts = async () => {
    console.log(queryString)
    const url = `http://localhost:3005/api/custom?${queryString}`
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const data = await res.json()
      console.log(data)

      if (Array.isArray(data.data.events)) {
        setProducts(data.data.events)
      }
      close(1)
    } catch (e) {
      console.error('Failed to load products:', e)
    }
  }

  useEffect(() => {
    getProducts()
  }, [queryString])
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSortChange = (field, order) => {
    setSortField(field)
    setSortOrder(order)
  }

  const updateQueryString = () => {
    const queryStringParts = []
    const filterFields = []
    const filterValues = []

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filterFields.push(key)
        filterValues.push(value)
      }
    })

    if (filterFields.length > 0) {
      queryStringParts.push(`filterField=${filterFields.join('&')}`)
      queryStringParts.push(`filterValue=${filterValues.join(';')}`)
    }

    if (sortField && sortOrder) {
      queryStringParts.push(`sortField=${encodeURIComponent(sortField)}`)
      queryStringParts.push(`sortOrder=${encodeURIComponent(sortOrder)}`)
    }

    setQueryString(queryStringParts.join('&'))
  }

  useEffect(() => {
    updateQueryString()
  }, [filters, sortField, sortOrder])

  const display = (
    <ColorProvider>
      <OccProvider>
        <FlowerTypeProvider>
          <Head>
            <title>Bloomify - 快速選購</title>
          </Head>
          <DefaultLayout activePage={activePage}>
            <>
              <div className="bg-white  w-screen h-auto overflow-visible">
                <div className="container m-auto">
                  <div className="flex sm:flex-row flex-col ">
                    <div className="h-[600px] w-auto  p-4 sticky top-0  hidden sm:block">
                      <CustomFilter onFilterChange={handleFilterChange} />
                    </div>
                    <div
                      style={{ minHeight: 'calc(100vh - 64px)' }}
                      className="min-h-full h-full sm:w-10/12 flex flex-col gap-3 sm:p-4 m-auto w-full p-2"
                    >
                      <div className="hidden sm:block">
                        <Breadcrumbs>
                          <BreadcrumbItem>首頁</BreadcrumbItem>
                          <BreadcrumbItem>代客送花</BreadcrumbItem>
                          <BreadcrumbItem color="primary">
                            快速選購
                          </BreadcrumbItem>
                        </Breadcrumbs>
                      </div>

                      <div className="w-full flex flex-row justify-end gap-3 text-tertiary-black text-2xl sm:hidden">
                        <BottomSheetButton
                          icon={<PiSlidersThin />}
                          iconClass="text-2xl"
                          label="排序與篩選"
                          content={
                            <FilterContent
                              onFilterChange={handleFilterChange}
                              onSortChange={handleSortChange}
                              selectedOccs={selectedOccs}
                              setSelectedOccs={setSelectedOccs}
                              selectedflowerType={selectedflowerType}
                              setSelectedflowerType={setSelectedflowerType}
                              selectedColors={selectedColors}
                              setSelectedColors={setSelectedColors}
                              sortOption={sortOption}
                              setSortOption={setSortOption}
                              radioSelection={radioSelection}
                              setRadioSelection={setRadioSelection}
                            />
                          }
                          isOpen={isSheetOpen}
                          onOpen={handleOpen}
                          onClose={handleClose}
                          showArrows={false}
                          showLabel={false}
                          blocking={true}
                        />
                      </div>

                      <div className="">
                        {products.length > 0 ? (
                          products.map(
                            ({ occ_name, products, occ_id }, index) => (
                              <div
                                key={occ_id}
                                className="flex flex-col gap-2 "
                              >
                                <div className="flex flex-row justify-between">
                                  <p className="sm:text-3xl text-xl text-tertiary-black select-none">
                                    {occ_name}
                                  </p>
                                  {index === 0 && (
                                    <div className="hidden sm:flex flex-row gap-1">
                                      <SortButton
                                        onSortChange={handleSortChange}
                                      />
                                    </div>
                                  )}
                                </div>

                                <hr className="w-full" />

                                <div className="w-full h-full relative overflow-hidden">
                                  <DH
                                    productList={products}
                                    className="h-auto"
                                  />
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <h3>請重新選擇查詢條件</h3>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </DefaultLayout>
        </FlowerTypeProvider>
      </OccProvider>
    </ColorProvider>
  )

  return <>{isLoading ? <Loader /> : display}</>
}

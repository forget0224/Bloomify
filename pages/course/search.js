import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Slider } from '@nextui-org/react'
// 小組元件
import { useCourseFavorites } from '@/hooks/use-course-fav'
import DefaultLayout from '@/components/layout/default-layout'
import Title from '@/components/common/title'
import CardGroup from '@/components/course/card-group'
import CoursePagination from '@/components/course/pagination'
import SearchBtn from '@/components/course/search'
import CourseDropdown from '@/components/course/dropdown'
import Head from 'next/head'

export default function CourseSearch() {
  const router = useRouter()
  // 搜尋框條件清空
  const [resetKey, setResetKey] = useState(0)
  const handleReset = () => {
    setResetKey((prevKey) => prevKey + 1)
    router.push('/course/search')
  }

  const [courses, setCourses] = useState([]) // set 課程資料
  const [courseCount, setCourseCount] = useState(0) // set 課程資料筆數
  const [stores, setStores] = useState([]) // set 商家資料
  const [categories, setCategories] = useState([]) // set 分類資料
  const { addFavoritesStatusToCourses } = useCourseFavorites()

  // 分頁 --------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const [totalPages, setTotalPages] = useState() // 總頁數
  const cardsPerPage = 12 // 每頁顯示的卡片數量
  // 頁碼變更處理函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const indexOfLastCourse = currentPage * cardsPerPage
  const indexOfFirstCourse = indexOfLastCourse - cardsPerPage
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)

  // 分類 dropdown menu ------------------------------------------------------------
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [categoryMap, setCategoryMap] = useState({})

  useEffect(() => {
    const map = {}
    categories.forEach((Category) => {
      map[Category.id] = Category.name
    })
    setCategoryMap(map)
  }, [categories])

  useEffect(() => {
    // 檢查 URL 中是否有 category_id 查詢參數
    const queryCategoryId = router.query.category_id

    if (queryCategoryId) {
      // 如果有 category_id 參數，設置 selectedCategoryId
      setSelectedCategoryId(queryCategoryId)
    } else {
      // 如果没有 category_id 參數，重置 selectedCategoryId
      setSelectedCategoryId('')
    }
  }, [router.query])

  // 處理交互，接收新的categoryId並更新selectedCategoryId，並更新路由
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    router.push({
      pathname: '/course/search',
      query: { ...router.query, category_id: categoryId },
    })
  }

  // 生成下拉清單選項，印出分類的value(id)和label(name)
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  // 商家 dropdown menu ------------------------------------------------------------
  const [selectedStoreId, setSelectedStoreId] = useState('')
  const [storeMap, setStoreMap] = useState({})

  useEffect(() => {
    const map = {}
    stores.forEach((store) => {
      map[store.store_id] = store.store_name
    })
    setStoreMap(map)
  }, [stores])

  useEffect(() => {
    // 檢查 URL 中是否有 store_id 查詢參數
    const queryStoreId = router.query.store_id

    if (queryStoreId) {
      // 如果有 store_id 參數，設置 selectedStoreId
      setSelectedStoreId(queryStoreId)
    } else {
      // 如果没有 store_id 參數，重置 selectedStoreId
      setSelectedStoreId('')
    }
  }, [router.query])

  // 處理交互，接收新的storeId並更新selectedStoreId，並更新路由
  const handleStoreChange = (storeId) => {
    setSelectedStoreId(storeId)
    router.push({
      pathname: '/course/search',
      query: { ...router.query, store_id: storeId },
    })
  }

  // 生成下拉清單選項，印出分類的value(id)和label(name)
  const storeOptions = stores.map((store) => ({
    value: store.store_id,
    label: store.store_name,
  }))

  // 價格 range slider -------------------------------------------------------------
  const [priceRange, setPriceRange] = useState([0, 5000]) // 預設值

  // 處理slider值變化的函數
  const handlePriceChange = (value) => {
    setPriceRange(value) // 更新狀態
    updateRoute(value) // 更新路由
  }

  const updateRoute = (priceRange) => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('min_price', priceRange[0])
    queryParams.set('max_price', priceRange[1])
    router.push(`/course/search?${queryParams.toString()}`)
  }

  // 排序 dropdown menu ------------------------------------------------------------
  const [sortOption, setSortOption] = useState('最新上架')
  const sortOptions = [
    { value: 'latest', label: '最新上架' },
    { value: 'highestRated', label: '評價最高' },
    { value: 'cheapest', label: '價格低到高' },
    { value: 'expensive', label: '價格高到低' },
  ]

  const handleSortChange = (value) => {
    // 查找對應的標籤
    const option = sortOptions.find((option) => option.value === value)
    const label = option ? option.label : '最新上架'

    setSortOption(label) // 更新狀態為選中的中文標籤

    // 不需要再次定義sortOptions
    router.push({
      pathname: '/course/search',
      query: { ...router.query, sort: value },
    })
  }

  // fetch 資料
  useEffect(() => {
    async function fetchCourses() {
      try {
        const queryStr = new URLSearchParams(router.query).toString()
        const res = await fetch(
          `http://localhost:3005/api/courses/search?${queryStr}`
        )
        const data = await res.json()
        if (data.status === 'success' && Array.isArray(data.data.courses)) {
          // 使用 addFavoritesStatusToCourses 來整合收藏狀態
          const updatedCourses = addFavoritesStatusToCourses(data.data.courses)
          // 處理全部課程數據
          setCourses(processCourses(updatedCourses))
          // 更新資料筆數
          setCourseCount(updatedCourses.length)
          // 計算並更新總頁數
          setTotalPages(Math.ceil(updatedCourses.length / cardsPerPage))
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    async function fetchStores() {
      try {
        const response = await fetch(
          `http://localhost:3005/api/share-stores?fields=store_id,store_name&exclude_id=1`
        )
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data.stores)) {
          // 處理隨機課程數據
          setStores(data.data.stores)
        }
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch(
          `http://localhost:3005/api/courses/categories`
        )
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data.categories)) {
          // 處理隨機課程數據
          setCategories(data.data.categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCourses()
    fetchStores()
    fetchCategories()
  }, [router.query])

  // 處理主圖函數
  function processCourses(coursesArray) {
    return coursesArray.map((course) => {
      const mainImage =
        (course.images && course.images.find((image) => image.is_main)) ||
        (course.images && course.images[0])
      return {
        ...course,
        course_id: course.id, // 新增字段 course_id 等於原 id 字段的值
        mainImage: mainImage
          ? mainImage.path
          : '/assets/course/img-default.jpg',
      }
    })
  }

  const [activePage, setActivePage] = useState('course')

  return (
    <>
      <Head>
        <title>課程搜尋</title>
      </Head>
      <DefaultLayout
        activePage={activePage}
        className="justify-center flex-col items-center"
      >
        <main className="flex justify-center items-center px-5 bg-white mt-[64px]">
          <div className="container justify-center flex flex-col mb-20 mt-6">
            <div className="flex flex-col items-center gap-6">
              {/* 頁面標題 */}
              <Title text="課程搜尋" />
              {/* 搜尋框 */}
              <div>
                <SearchBtn
                  baseSearchPath="/course/search"
                  resetKey={resetKey}
                />
              </div>
              {/* 篩選與排序 */}
              <div className="flex flex-wrap gap-2 items-center justify-center relative z-20">
                {/* TODO: */}
                {/* 即將額滿 */}
                {/* <Button color="primary" variant="solid">
                即將額滿
              </Button> */}

                {/* 課程分類 */}
                <CourseDropdown
                  label="選擇分類"
                  options={categoryOptions}
                  selectedOption={categoryMap[selectedCategoryId] || '選擇分類'}
                  onChange={handleCategoryChange}
                />

                {/* 開課商家 */}
                <CourseDropdown
                  label="選擇商家"
                  options={storeOptions}
                  selectedOption={storeMap[selectedStoreId] || '選擇商家'}
                  onChange={handleStoreChange}
                />

                {/* 價格範圍 */}
                <Slider
                  label="價格範圍"
                  size="md"
                  step={200}
                  minValue={0}
                  maxValue={5000}
                  value={priceRange} // 綁定狀態
                  onChange={handlePriceChange} // 綁定處理函數
                  formatOptions={{ style: 'currency', currency: 'NTD' }}
                  classNames={{
                    base: 'max-w-xs',
                    filler: '',
                    labelWrapper: '',
                    label: '',
                    value: '',
                  }}
                />

                {/* 排序 */}
                <span className="ml-4">排序</span>
                <CourseDropdown
                  label="預設排序"
                  options={sortOptions}
                  selectedOption={sortOption}
                  onChange={handleSortChange}
                />

                {/* 日期範圍 */}

                <div className="flex flex-row gap-4 mt-2">
                  <span className="text-tertiary-gray-100">
                    {courseCount}筆資料
                  </span>
                  <span
                    className="text-primary-100 hover:text-primary-200 cursor-pointer"
                    onClick={handleReset}
                  >
                    條件清空
                  </span>
                </div>
              </div>
            </div>

            {/* 搜尋結果卡片 */}
            <div className="grid gap-y-16 my-14 w-full">
              <CardGroup courses={currentCourses} />
            </div>

            {/* 頁碼 */}
            <div className="mt-4">
              <CoursePagination
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}

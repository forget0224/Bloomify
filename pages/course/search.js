import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Datepicker from 'react-tailwindcss-datepicker'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import Title from '@/components/common/title'
import CardGroup from '@/components/course/card-group'
import CoursePagination from '@/components/course/pagination'
import SearchBtn from '@/components/course/search'
import CourseDropdown from '@/components/course/dropdown'

export default function CourseSearch() {
  const router = useRouter()
  const [courses, setCourses] = useState([]) // set 課程資料
  const [courseCount, setCourseCount] = useState(0) // set 課程資料筆數
  const [stores, setStores] = useState([]) // set 商家資料
  const [categories, setCategories] = useState([]) // set 商家資料

  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const [totalPages, setTotalPages] = useState(0) // 總頁數
  const cardsPerPage = 12 // 每頁顯示的卡片數量
  // 頁碼變更處理函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  // 分页显示当前课程的逻辑
  const indexOfLastCourse = currentPage * cardsPerPage
  const indexOfFirstCourse = indexOfLastCourse - cardsPerPage
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)

  // datepicker 變數
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  })

  // TODO:
  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  // 分類dropdown menu
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [categoryMap, setCategoryMap] = useState({})
  useEffect(() => {
    const map = {}
    categories.forEach((Category) => {
      map[Category.id] = Category.name
    })
    setCategoryMap(map)
  }, [categories])
  // 分類 query string更新
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    router.push({
      pathname: '/course/search',
      query: { ...router.query, category_id: categoryId },
    })
  }
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  // 商家dropdown menu
  const [selectedStoreId, setSelectedStoreId] = useState('')
  const [storeMap, setStoreMap] = useState({})
  useEffect(() => {
    const map = {}
    stores.forEach((store) => {
      map[store.store_id] = store.store_name
    })
    setStoreMap(map)
  }, [stores])
  // 商家query string更新
  const handleStoreChange = (storeId) => {
    setSelectedStoreId(storeId)
    router.push({
      pathname: '/course/search',
      query: { ...router.query, store_id: storeId },
    })
  }
  const storeOptions = stores.map((store) => ({
    value: store.store_id,
    label: store.store_name,
  }))

  // 排序query string更新
  const [sortOption, setSortOption] = useState('最新上架')
  const sortOptions = [
    { value: 'latest', label: '最新上架' },
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
          // 處理全部課程數據
          setCourses(processCourses(data.data.courses))
          // 更新資料筆數
          setCourseCount(data.data.courses.length)
          // 計算並更新總頁數
          setTotalPages(Math.ceil(data.data.courses.length / cardsPerPage))
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
        mainImage: mainImage
          ? mainImage.path
          : '/assets/course/img-default.jpg',
      }
    })
  }

  const [activePage, setActivePage] = useState('course')

  return (
    <DefaultLayout
      activePage={activePage}
      className="justify-center flex-col items-center"
    >
      <main className="flex justify-center items-center px-5 bg-white">
        <div className="container justify-center flex flex-col mb-20 mt-6">
          <div className="flex flex-col items-center gap-6">
            {/* 頁面標題 */}
            <Title text="課程搜尋" />
            {/* 搜尋框 */}
            <div>
              <SearchBtn baseSearchPath="/course/search" />
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

              {/* 日期範圍 */}
              <Datepicker
                value={value}
                onChange={handleValueChange}
                primaryColor="primary-100"
                inputClassName="z-20 text-sm rounded-xl px-4 py-2 border-0 hover:border-0 focus:ring-0 focus:outline-none focus:border-teal"
                containerClassName="z-20 bg-white pr-3 rounded-xl border-2 hover:border-primary-100 focus:ring-0 focus:outline-none focus:border-teal focus:border-primary-100"
                toggleClassName="z-20 relative top-1"
                placeholder={'選擇日期區間'}
                minDate={new Date('2024-01-01')}
                maxDate={new Date('2025-12-31')}
              />

              {/* 開課商家 */}
              <CourseDropdown
                label="選擇商家"
                options={storeOptions}
                selectedOption={storeMap[selectedStoreId] || '選擇商家'}
                onChange={handleStoreChange}
              />

              {/* 排序 */}
              <span className="ml-4">排序</span>
              <CourseDropdown
                label="預設排序"
                options={sortOptions}
                selectedOption={sortOption}
                onChange={handleSortChange}
              />
              <span className="text-tertiary-gray-100">
                {courseCount}筆資料
              </span>
              <Link href={'/course/search'}>
                <span className="text-primary-100 hover:text-primary-200">
                  條件清空
                </span>
              </Link>
            </div>
          </div>

          {/* 搜尋結果卡片 */}
          <div className="grid gap-y-16 my-14 w-full">
            {/* <CardGroup courses={courses} /> */}
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
  )
}

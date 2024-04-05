import { useState } from 'react'

import DefaultLayout from '@/components/layout/default-layout'
import Title from '@/components/common/title'
import CardGroup from '@/components/course/card-group'
import CoursePagination from '@/components/course/pagination'
import CourseSearchFilter from '@/components/course/filter-search'
import SearchBtn from '@/components/course/search'

export default function CourseSearch() {
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
            <SearchBtn />
            {/* 篩選與排序 */}
            <CourseSearchFilter className="relative" />
          </div>

          {/* 搜尋結果卡片 */}
          <div className="grid gap-y-16 my-14 w-full">
            <CardGroup />
            <CardGroup />
            <CardGroup />
          </div>

          {/* 頁碼 */}
          <CoursePagination />
        </div>
      </main>
    </DefaultLayout>
  )
}

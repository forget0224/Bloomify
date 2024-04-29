import { useState, useEffect } from 'react'
import { useCourseFavorites } from '@/hooks/use-course-fav'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { Pagination } from '@nextui-org/react'
import { useAuth } from '@/hooks/use-auth'
// 日歷元件
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import CourseSearch from '@/components/course/search'
import Title from '@/components/common/title'
import Sidebar from '@/components/layout/sidebar'
import CardGroup from '@/components/course/card-group'
import CourseDropdown from '@/components/course/dropdown'

export default function FavoriteCourses() {
  const [activePage, setActivePage] = useState('course')
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth

  const localizer = momentLocalizer(moment)

  // 假資料
  const myEventsList = [
    {
      title: '數學課',
      start: new Date(2024, 3, 29, 10, 0), // 注意 JavaScript 中月份是從 0 開始的
      end: new Date(2024, 3, 29, 11, 0),
      desc: '第五章節複習',
      // 其他需要的信息
    },
    // ...其他事件
  ]

  return (
    <DefaultLayout activePage={activePage}>
      <>
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 invisible md:visible">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>合作課程</BreadcrumbItem>
              <BreadcrumbItem>收藏課程</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          {/* 主要內容 */}
          <div className="flex flex-row w-full justify-center">
            {/* 側邊欄 */}
            <Sidebar />

            {/* order content start */}
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
              <Title text="我的課表" />

              {/* 主要區域 */}
              <div className="grid gap-y-10 gap-x-6 w-full mt-4">
                {/* 日歷開始 */}
                <div className="min-h-[600px]">
                  <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    // views={['month']}
                    onSelectEvent={(event) => alert(event.title)} // 簡單的示例：點擊事件時顯示 alert
                  />
                </div>
              </div>
            </div>
          </div>
        </CenterLayout>
      </>
    </DefaultLayout>
  )
}

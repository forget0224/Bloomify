import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Image } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import CardGroup from '@/components/course/card-group'

import Title from '@/components/common/title'
import SearchBtn from '@/components/course/btn-search'

export default function CourseSearch() {
  const [activePage, setActivePage] = useState('course')

  return (
    <main className="bg-white flex justify-center items-center">
      <div className="container flex-col justify-center items-center">
        {/* 頁面標題 */}
        <Title text="最新課程" />
        {/* 搜尋框 */}
        <SearchBtn />
        {/* 篩選與排序 */}
        {/* 搜尋結果卡片 */}
        {/* 頁碼 */}
      </div>
    </main>
  )
}

import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
export default function CourseDetails() {
  const [activePage, setActivePage] = useState('CourseForm')
  return (
    <DefaultLayout activePage={activePage} className="justify-center flex-col">
      <div className="container-fluid flex justify-center">
        {/* Input Field 群組 */}
        <div className="flex-grow mx-5">
          {/* 標籤 */}
          <label
            htmlFor="search"
            className="block text-md font-medium leading-6 text-gray-900"
          >
            Search
            <span className="text-danger">{`*`}</span>
          </label>
          {/* 輸入框 */}
          <div className="block relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="price"
              className="block text-base w-full rounded-xl p-4 text-tertiary border-1 border-tertiary-gray-200 hover:border-tertiary-gray-100 focus:ring-0 focus:outline-none focus:border-teal focus:border-primary-100"
              placeholder="search for..."
            />
            <div className="text-sm text-danger pt-1">我是提示訊息</div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

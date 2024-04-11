import React, { useState } from 'react'
import Link from 'next/link'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import Datepicker from 'react-tailwindcss-datepicker'

export default function CourseSearchFilter() {
  // datepicker
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  })

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center relative z-20">
      {/* 即將額滿 */}
      <Button color="primary" variant="solid">
        即將額滿
      </Button>

      {/* 課程分類 */}
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="border-tertiary-gray-200">
            課程分類
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => alert(key)}
        >
          <DropdownItem key="c1">花藝基礎課程</DropdownItem>
          <DropdownItem key="c2">植栽相關課程</DropdownItem>
          <DropdownItem key="c3">節慶主題課程</DropdownItem>
          <DropdownItem key="c4">進階商業課程</DropdownItem>
        </DropdownMenu>
      </Dropdown>

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
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="border-tertiary-gray-200">
            開課商家
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => alert(key)}
        >
          <DropdownItem key="s1">商家1</DropdownItem>
          <DropdownItem key="s2">商家2</DropdownItem>
          <DropdownItem key="s3">商家3</DropdownItem>
          <DropdownItem key="s4">商家4</DropdownItem>
          <DropdownItem key="s4">商家5</DropdownItem>
          <DropdownItem key="s4">商家6</DropdownItem>
          <DropdownItem key="s4">商家7</DropdownItem>
          <DropdownItem key="s4">商家8</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* 排序 */}
      <span className="ml-4">排序</span>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="border-tertiary-gray-200">
            預設排序
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => alert(key)}
        >
          <DropdownItem key="hot">熱賣商品</DropdownItem>
          <DropdownItem key="new">新上架</DropdownItem>
          <DropdownItem key="highRating">高評價</DropdownItem>
          <DropdownItem key="highPrice">價格低到高</DropdownItem>
          <DropdownItem key="lowPrice">價格高到低</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <span className="text-tertiary-gray-100">66筆資料</span>
      <Link href={'/course/search'}>
        <span className="text-primary-100 hover:text-primary-200">
          條件清空
        </span>
      </Link>
    </div>
  )
}

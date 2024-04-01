import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Breadcrumbs, BreadcrumbItem, table } from '@nextui-org/react'
import Sidebar from '@/components/layout/sidebar'
import { Tabs, Tab, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import { Select, SelectItem } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { CiSearch } from 'react-icons/ci'
import Title from '@/components/course/title'
import CenterLayout from '@/components/layout/center-layout'

export default function CenterShop() {
  const imageList = [
    {
      src: '/assets/shop/products/pink_Gladiola_0.jpg',
    },
    {
      src: '/assets/shop/products/pink_Gladiola_0.jpg',
    },
  ]
  const list = [
    {
      title: 'Orange',
    },
    {
      title: 'Tangerine',
    },
    {
      title: 'Raspberry',
    },
  ]

  const [activePage, setActivePage] = useState('course')
  const underlines = ['none']

  return (
    <DefaultLayout activePage={activePage}>
      <CenterLayout>
        <>
          {/* 麵包屑 */}
          <div className="flex flex-col flex-wrap gap-4 py-6 w-full">
            {underlines.map((u) => (
              <div key={u}>
                <Breadcrumbs underline={u}>
                  <BreadcrumbItem>首頁</BreadcrumbItem>
                  <BreadcrumbItem>會員中心</BreadcrumbItem>
                  <BreadcrumbItem>代客送花</BreadcrumbItem>
                  <BreadcrumbItem color="primary">我的訂單</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            ))}
          </div>

          {/* 主要內容 */}
          <div className="flex flex-row w-full">
            {/* 側邊欄 start */}
            <Sidebar className="w-2/12" />
            {/* 側邊欄 end */}
            {/* 訂單明細 start */}
            <div className="w-10/12 pl-10">
              <Title text="我的訂單" />
            </div>
            {/* 訂單明細 end */}
          </div>
        </>
      </CenterLayout>
    </DefaultLayout>
  )
}

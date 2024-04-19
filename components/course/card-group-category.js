import { React, useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'

export default function CardGroupCategory() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('http://localhost:3005/api/courses/categories')
        const data = await res.json()
        if (data.status === 'success') {
          setCategories(data.data.categories)
        }
      } catch (e) {
        console.error('Failed to fetch stores', e)
      }
    }
    fetchCategories()
  }, [])

  // 如果 courses 是 undefined 或者為空數組，就渲染一個提示訊息或者 loading...
  if (!categories || categories.length === 0) {
    return <div>課程資料正在加載中或者沒有可用的課程。</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Card
          shadow="sm"
          key={category.id}
          isPressable
          onPress={() => console.log('item pressed')}
          className="bg-danger"
        >
          <Link
            href={`/course/search?category_id=${category.id}`}
            key={category.id}
            className="w-full"
          >
            <CardBody className="p-0">
              <Image
                isZoomed
                shadow="none"
                radius="none"
                width="100%"
                className="w-full object-cover h-[180px]"
                alt={category.name}
                src={category.path}
              />
            </CardBody>
            <CardFooter className="w-full block text-center bg-white">
              <p className="w-full text-xl">{category.name}</p>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}

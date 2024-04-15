import { React, useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'

export default function CardGroupCategory() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('http://localhost:3005/api/courses/categories')
      const data = await res.json()
      if (data.status === 'success') {
        setCategories(data.data.categories)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Card
          shadow="sm"
          key={category.id}
          isPressable
          onPress={() => console.log('item pressed')}
          className="bg-danger"
        >
          <Link href="/course/search" key={category.id} className="w-full">
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

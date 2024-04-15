import { React, useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'

export default function CardGroupStore() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    async function fetchStores() {
      try {
        const res = await fetch(
          'http://localhost:3005/api/share-stores/course-index'
        )
        const data = await res.json()
        if (data.status === 'success') {
          setStores(data.data.stores)
        }
      } catch (e) {
        console.error('Failed to fetch stores...', e)
      }
    }
    fetchStores()
  }, [])

  // 如果 courses 是 undefined 或者為空數組，就渲染一個提示訊息或者 loading...
  if (!stores || stores.length === 0) {
    return <div>課程資料正在加載中或者沒有可用的課程。</div>
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-8 gap-6">
      {stores.map((store) => (
        <Card
          shadow="sm"
          key={store.id}
          isPressable
          onPress={() => console.log('item pressed')}
          className="bg-danger"
        >
          <Link href="/course/search" key={store.id} className="w-full">
            <CardBody className="p-0">
              <Image
                isZoomed
                shadow="none"
                radius="none"
                width="100%"
                className="w-full object-cover h-[150px]"
                alt={store.store_name}
                src={store.logo_path}
              />
            </CardBody>
            <CardFooter className="w-full block text-center bg-white">
              <p className="w-full text-xl">{store.store_name}</p>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}

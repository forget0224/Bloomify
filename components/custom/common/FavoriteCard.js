import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Breadcrumbs,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import CustomCheckbox from '@/components/custom/common/CustomCheckbox'
import { useColors } from '@/hooks/use-color'
import { useAuth } from '@/hooks/use-auth'

import AddFav from '@/components/custom/common/AddFav'
export default function FavoriteCard() {
  const router = useRouter()
  const { auth } = useAuth()
  const { userData } = auth
  const [customFavorite, setCustomFavorite] = useState([])

  const colors = useColors()
  useEffect(() => {
    async function fetchAllTemplates() {
      if (!userData || !userData.id || userData.id === 0) {
        console.log('Invalid or missing userData id')
        return // 直接返回如果 userData.id 無效或等於 0
      }
      try {
        const response = await fetch(
          `http://localhost:3005/api/custom/custom-favorite/${userData.id}`
        )
        const data = await response.json()
        if (response.ok && data.status === 'success') {
          setCustomFavorite(data.data)
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchAllTemplates()
  }, [userData.id]) // 添加 userData.id 作為依賴
  const handleCardClick = (id) => {
    router.push(`/custom/${id}`)
  }
  return (
    <>
      {customFavorite.map((item, index) => {
        const colorCode = colors.find(
          (colorItem) => colorItem.name === item.color_name
        )?.code

        return (
          <Card
            shadow="sm"
            key={item.template_id}
            className="cursor-pointer sm:w-[300px] sm:h-[300px]"
            isPressable
            onClick={() => handleCardClick(item.template_id)}
          >
            <CardBody
              style={{ backgroundImage: `url(${item.image_url})` }}
              className="bg-cover bg-center aspect-video w-full rounded-t-xl p-0"
            ></CardBody>
            <CardHeader className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-lg">{item.template_name}</h1>
                <div className="cursor-pointer">
                  <AddFav
                    templateId={item.template_id}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <p className="text-xs text-tertiary-gray-100 text-left">
                {item.store_name}
              </p>
              {colorCode && (
                <CustomCheckbox
                  width="w-4"
                  height="h-4"
                  value={item.color_name}
                  bgColor={colorCode}
                />
              )}
            </CardHeader>
            <CardFooter className="justify-end">
              <p className="text-lg">
                {item.discount !== 0 ? (
                  <>
                    <span className="line-through">${item.total_price}</span>
                    <span className="ml-2 text-danger">
                      ${parseInt(item.total_price) - parseInt(item.discount)}
                    </span>
                  </>
                ) : (
                  <>${item.total_price}</>
                )}
              </p>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}

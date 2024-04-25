import { useEffect, useState } from 'react'
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
import { motion, useMotionValue } from 'framer-motion'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { CiShoppingCart } from 'react-icons/ci'
import CustomCheckbox from '@/components/custom/common/CustomCheckbox'
import { useColors } from '@/hooks/use-color'
export default function FavoriteCard() {
  const [customFavorite, setCustomFavorite] = useState([])
  const handleHeartClick = (index) => () => {
    const updatedFavorites = customFavorite.map((item, idx) => {
      if (idx === index) {
        return { ...item, isHearted: !item.isHearted }
      }
      return item
    })
    setCustomFavorite(updatedFavorites)
  }
  const colors = useColors()
  useEffect(() => {
    async function fetchAllTemplates() {
      try {
        const response = await fetch(
          `http://localhost:3005/api/custom/custom-favorite/1`
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
  }, [])
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
          >
            <CardBody
              style={{ backgroundImage: `url(${item.image_url})` }}
              className="bg-cover bg-center aspect-video w-full rounded-t-xl p-0"
            ></CardBody>
            <CardHeader className="flex flex-col items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-lg">{item.template_name}</h1>
                <div
                  className="cursor-pointer"
                  onClick={handleHeartClick(index)}
                >
                  {item.isHearted ? (
                    <IoIosHeartEmpty className="text-danger text-xl" />
                  ) : (
                    <IoIosHeart className="text-danger text-xl" />
                  )}
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
            <CardFooter className="justify-between">
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

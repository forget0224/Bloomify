import { Image } from '@nextui-org/react'

const OrderCardImage = ({ orderDetailId, orderItems }) => {
  const filteredItems = orderItems.filter(
    (item) => String(item.product_order_detail_id) === String(orderDetailId)
  )
  // console.log('filteredItemsImage', filteredItems)

  return (
    <div className="flex gap-2">
      {filteredItems.map((item) => {
        const imageUrl = item.thumbnail_url
          ? `/assets/shop/products/${item.directory}/${item.thumbnail_url}`
          : `/assets/shop/products/default_fallback_image.jpg`
        {
          /* console.log('Image URL:', imageUrl) */
        }

        return (
          <Image
            key={item.id} // Correctly placed `key` prop here
            src={imageUrl}
            alt={item.name}
            className="w-24 h-24 rounded-md md:rounded-xl"
          />
        )
      })}
    </div>
  )
}

export default OrderCardImage

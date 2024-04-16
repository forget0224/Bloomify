// items.js
import {
  PiFlowerTulipLight,
  PiLeafLight,
  PiGiftLight,
  PiPencilLineLight,
} from 'react-icons/pi'
import { IoLayersOutline } from 'react-icons/io5'
import FlowerContent from './FlowerContent'
import LeafContent from './LeafContent'
import PackageContent from './PackageContent'
import GiftCardContent from './GiftCardContent'
import LayerContent from './LayerContent'
// api
// {
//   "status": "success",
//   "data": {
//   "store_id": "2",
//   "store_name": "花姿妍",
//   "products": {
//   "配花": {
//   "category_name": "配花",
//   "items": [
//   {
//   "name": "向日葵",
//   "colors": "橙色"
//   }
//   ]
//   }
//   }
//   }
//   }
const items = [
  {
    icon: <PiFlowerTulipLight />,
    label: '花材',
    content: <FlowerContent />,
    headerContent: '花材標題',
  },
  {
    icon: <PiLeafLight />,
    label: '葉材',
    content: <LeafContent />,
    headerContent: '葉材標題',
  },
  {
    icon: <PiGiftLight />,
    label: '包裝',
    content: <PackageContent />,
    headerContent: '包裝',
  },
  {
    icon: <PiPencilLineLight />,
    label: '賀卡',
    content: <GiftCardContent />,
    headerContent: '賀卡',
  },
  {
    icon: <IoLayersOutline />,
    label: '圖層',
    content: <LayerContent />,
    headerContent: '圖層',
  },
]

export default items

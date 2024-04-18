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

const items = [
  {
    icon: <PiFlowerTulipLight />,
    label: '花材',
    content: <FlowerContent items={data} />,
    headerContent: '花材標題',
  },
  {
    icon: <PiLeafLight />,
    label: '葉材',
    content: <LeafContent items={data} />,
    headerContent: '葉材標題',
  },
  {
    icon: <PiGiftLight />,
    label: '包裝',
    content: <PackageContent items={data} />,
    headerContent: '包裝',
  },
  {
    icon: <PiPencilLineLight />,
    label: '賀卡',
    content: <GiftCardContent items={data} />,
    headerContent: '賀卡',
  },
  {
    icon: <IoLayersOutline />,
    label: '圖層',
    content: <LayerContent items={data} />,
    headerContent: '圖層',
  },
]

export default items

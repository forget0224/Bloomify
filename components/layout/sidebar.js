import Link from 'next/link'
import Image from 'next/image'

export default function Sidebar() {
  return (
    <>
      <div className="hidden md:flex flex-col gap-8 lg:visible w-2/12 h-fit p-10 border-1 rounded-xl border-tertiary-gray-200">
        {/* 會員資訊 start */}
        <div className="flex flex-row gap-2 items-center">
          <Image
            key={''}
            src="/assets/shop/products/pink_Gladiola_0.jpg"
            alt=""
            className="w-8 h-8 md:w-8 md:h-8 rounded-full"
            width={40}
            height={40}
          />
          <p className="text-xl text-tertiary-black font-medium">會員姓名</p>
        </div>
        {/* 會員資訊 end */}

        {/* custom start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-base text-tertiary-gray-100 border-b-1 pb-2">
            代客送花
          </p>
          <Link
            href="/custom/center-custom/"
            className="hover:text-primary-100"
          >
            我的訂單
          </Link>
          <Link
            href="/custom/center-custom/favorite"
            className="hover:text-primary-100"
          >
            收藏花束
          </Link>
        </div>
        {/* custom end */}

        {/* shop start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            線上商城
          </p>
          <Link href="/shop/center-shop/" className="hover:text-primary-100">
            商品訂單
          </Link>
          <Link
            href="/shop/center-shop/favorite"
            className="hover:text-primary-100"
          >
            收藏商品
          </Link>
        </div>
        {/* shop end */}

        {/* course start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            合作課程
          </p>
          <Link
            href="/course/center-course/"
            className="hover:text-primary-100"
          >
            課程訂單
          </Link>
          <Link
            href="/course/center-course/favorite"
            className="hover:text-primary-100"
          >
            收藏課程
          </Link>
          <Link
            href="/course/center-course/calendar"
            className="hover:text-primary-100"
          >
            我的課表
          </Link>
        </div>
        {/* course end */}

        {/* intro start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            花占卜
          </p>
          <Link href="#" className="hover:text-primary-100">
            占卜紀錄
          </Link>
        </div>
        {/* intro end */}

        {/* member start */}
        <div className="flex flex-col gap-4 items-center">
          <p className="w-full text-tertiary-gray-100 border-b-1 pb-2">
            我的帳戶
          </p>
          <Link href="#" className="hover:text-primary-100">
            個人資料
          </Link>
          <Link href="#" className="hover:text-primary-100">
            優惠券
          </Link>
        </div>
        {/* member end */}
      </div>
    </>
  )
}

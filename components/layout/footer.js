import React from 'react'
import Link from 'next/link'
import { CiMail, CiPhone, CiMap, CiChat1 } from 'react-icons/ci'

import Language from '../btn/language'
export default function Footer() {
  return (
    <footer className="bg-secondary-300 h-90 w-screen text-tertiary-black text-xs ">
      <div className="px-5 py-6 gap-3 flex flex-col  ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Link href="#">關於我們</Link>
            <p>|</p>
            <Link href="#">加入我們</Link>
          </div>
          <div className="flex flex-row">
            <Language />
          </div>
        </div>
        <div className="flex flex-col  gap-2">
          <div className="flex flex-row  gap-2 ">
            <CiChat1 className="text-xl" />
            <p>8am-10pm</p>
          </div>
          <div className="flex flex-row  gap-2 ">
            <CiPhone className="text-xl" />
            <p>02-xxxx-xxxx</p>
          </div>
          <div className="flex flex-row  gap-2 ">
            <CiMail className="text-xl" />
            <p>Bloomify@gmail.com</p>
          </div>

          <div className="flex flex-row gap-2  ">
            <CiMap className="text-xl" />
            <p>台北市大安區復興南路一段390號2樓</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div>
            本網站受到 reCAPTCHA 和 Google 隱私政策的保護，且適用服務條款
          </div>
          <div>© 2024 Bloomify Inc. </div>
          <div className="flex flex-row gap-1">
            <div>隱私政策</div>
            <div>價格條款</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

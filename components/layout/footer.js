import React from 'react'
import Link from 'next/link'

import NavLogo from '../index/NavLogo'
import {
  CiMail,
  CiPhone,
  CiMap,
  CiChat1,
  CiFacebook,
  CiInstagram,
} from 'react-icons/ci'
import { FaXTwitter } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import Language from '../btn/language'
export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-secondary-300 h-90 w-screen text-tertiary-black text-xs px-5 py-6  flex flex-col gap-3 ">
      <div className="flex flex-col gap-3 sm:flex-row sm:px-72 sm:justify-around">
        <div className="flex flex-col gap-2 sm:order-last sm:w-36 sm:justify-center ">
          <div className="flex flex-col gap-2 ">
            <Link href="#">{t('footer.followUs')}</Link>

            <div className="flex flex-row text-xl gap-2">
              <Link href="#">
                <CiFacebook />
              </Link>
              <Link href="#">
                <FaXTwitter />
              </Link>
              <Link href="#">
                <CiInstagram />
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-2 ">
            <Link href="#">{t('footer.aboutUs')}</Link>
            <p>|</p>
            <Link href="#">{t('footer.joinUs')}</Link>
          </div>
          <div className="flex flex-row">
            <Language />
          </div>
        </div>

        <div className="flex flex-row sm:items-center sm:gap-3">
          {/* <div className="h-[130px] w-[120px] bg-secondary hidden sm:block">
            <NavLogo />
          </div> */}
          <div className="flex flex-col  gap-2">
            <div className="flex flex-row  gap-2 items-center">
              <CiChat1 className="text-xl" />
              <p>8am-10pm</p>
            </div>
            <div className="flex flex-row  gap-2 items-center">
              <CiPhone className="text-xl" />
              <p>02-xxxx-xxxx</p>
            </div>
            <div className="flex flex-row  gap-2 items-center">
              <CiMail className="text-xl" />
              <p>Bloomify@gmail.com</p>
            </div>

            <div className="flex flex-row gap-2  items-center min-w-[572px]">
              <CiMap className="text-xl" />
              <p>{t('footer.address')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1   sm:items-center">
        <div className="sm:flex sm:flex-row sm:gap-2">
          <div>
            本網站受到 reCAPTCHA 和 Google 隱私政策的保護，且適用服務條款
          </div>
          <div>© 2024 Bloomify Inc. </div>
        </div>

        <div className="flex flex-row gap-1">
          <div>隱私政策</div>
          <div>價格條款</div>
        </div>
      </div>
    </footer>
  )
}

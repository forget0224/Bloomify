import { Fragment } from 'react'
// import { useState } from 'react'

import { useAuth } from '@/hooks/use-auth'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { CiShoppingCart } from 'react-icons/ci'
import { CiUser } from 'react-icons/ci'
import { useCart } from '@/context/shop-cart-context'
import NavLogo from '../index/NavLogo'
export default function HomeNav({ activePage }) {
  const menuItems = [
    {
      name: 'custom',
      chineseName: '代客送花',
      subMenu: [
        { href: 'list', chineseName: '快速選購' },
        { href: 'custom', chineseName: '客製化' },
      ],
    },
    {
      name: 'shop',
      chineseName: '線上商城',
      href: '',
      subMenu: [],
    },
    {
      name: 'course',
      chineseName: '合作課程',
      href: '',
      subMenu: [],
    },
    {
      name: 'intro',
      chineseName: '花與遊戲',
      subMenu: [
        { href: '', chineseName: '花圖鑑' },
        { href: 'game', chineseName: '花占卜' },
      ],
    },
  ]
  const { auth } = useAuth()

  // 商城的購物車筆數計算
  const { cartItems } = useCart()
  const cartItemsArr = Object.values(cartItems)
  const itemsAmount = cartItemsArr.length

  return (
    <Navbar isBordered className="bg-primary-300 fixed top-0">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className=" flex" justify="start">
        <NavLogo />
      </NavbarContent>
      {/* <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
           
            <NavLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent> */}

      <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
        {menuItems.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            {item.subMenu.length > 0 ? (
              <Dropdown>
                <DropdownTrigger>
                  <div
                    className={`bg-transparent cursor-pointer text-base ${
                      activePage === item.name
                        ? ' border-b-1 border-primary'
                        : ''
                    }`}
                  >
                    {item.chineseName}
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sub menu">
                  {item.subMenu.map((subItem, subIndex) => (
                    <DropdownItem key={`${subItem}-${subIndex}`}>
                      {subItem ? (
                        <Link href={`/${item.name}/${subItem.href}`}>
                          <p className="text-black">{subItem.chineseName}</p>
                        </Link>
                      ) : (
                        ''
                      )}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavbarItem>
                <Link color="foreground" href={`/${item.name}/${item.href}`}>
                  {item.chineseName}
                </Link>
              </NavbarItem>
            )}
          </Fragment>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="relative">
          {auth.isAuth && (
            <div
              style={{
                position: 'absolute',
                left: '1.5rem',
                bottom: '1.5rem',
                backgroundColor: 'pink',
                padding: '2px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20px',
                width: '20px',
                color: 'white',
              }}
            >
              {itemsAmount}
            </div>
          )}
          <Link href={auth.isAuth ? '/cart' : '/member/login'}>
            <CiShoppingCart className="w-8 h-8 text-primary" />
          </Link>
        </NavbarItem>
        <NavbarItem className="lg:flex">
          <Link href={auth.isAuth ? '/center' : '/member/login'}>
            <CiUser className="w-8 h-8" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex flex-col items-center">
        {menuItems.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            {item.subMenu.length > 0 ? (
              <Dropdown>
                <DropdownTrigger>
                  <div
                    className={`bg-transparent ${
                      activePage === item.name ? ' ' : ''
                    }`}
                  >
                    {item.chineseName}
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="" className="text-center">
                  {item.subMenu.map((subItem, subIndex) => (
                    <DropdownItem key={`${subItem}-${subIndex}`}>
                      {subItem ? (
                        <Link href={`/${item.name}/${subItem.href}`}>
                          <p className="text-black">{subItem.chineseName}</p>
                        </Link>
                      ) : (
                        ''
                      )}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavbarItem>
                <Link
                  color="foreground"
                  className="flex justify-center"
                  href={`/${item.name}`}
                >
                  {item.chineseName}
                </Link>
              </NavbarItem>
            )}
          </Fragment>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

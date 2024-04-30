import React, { Fragment, forwardRef } from 'react'
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
  svgRef,
} from '@nextui-org/react'
import { CiShoppingCart } from 'react-icons/ci'
import { CiUser } from 'react-icons/ci'
import FlowerIcon from '../index/FlowerIcon'
const IndexNav = forwardRef(
  ({ activePage, bgColor = 'primary-300', showNav = true }, ref) => {
    const menuItems = [
      {
        name: 'custom',
        chineseName: '代客送花',
        subMenu: [
          { href: 'list2', chineseName: '快速選購' },
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

    return (
      <>
        <Navbar
          className={`bg-${bgColor}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${showNav ? '0%' : '-100%'})`,
            opacity: showNav ? 1 : 0,
            transition: 'transform 0.3s, opacity 0.3s',
            zIndex: 1000,
          }}
        >
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {menuItems.map((item, index) => (
              <Fragment key={`${item}-${index}`}>
                {item.subMenu.length > 0 ? (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className={`bg-red-100 ${
                          activePage === item.name
                            ? ' border-b-3  border-red-700'
                            : ''
                        }`}
                      >
                        {item.chineseName}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Sub menu">
                      {item.subMenu.map((subItem, subIndex) => (
                        <DropdownItem key={`${subItem}-${subIndex}`}>
                          {subItem ? (
                            <Link href={`/${item.name}/${subItem.href}`}>
                              <p className="text-black">
                                {subItem.chineseName}
                              </p>
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
                      href={`/${item.name}/${item.href}`}
                    >
                      {item.chineseName}
                    </Link>
                  </NavbarItem>
                )}
              </Fragment>
            ))}
          </NavbarContent>

          <NavbarContent
            justify="end"
            // style={{ backgroundColor: 'blue', padding: '10px' }}
          >
            <NavbarItem>
              <Link href={auth.isAuth ? '/cart' : '/member/login'}>
                <CiShoppingCart className="w-8 h-8 text-tertiary-black" />
              </Link>
            </NavbarItem>
            <NavbarItem className="lg:flex">
              <Link href={auth.isAuth ? '/center' : '/member/login'}>
                <CiUser className="w-8 h-8 text-tertiary-black" />
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <Fragment key={`${item}-${index}`}>
                {item.subMenu.length > 0 ? (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className={`bg-red-100 ${
                          activePage === item.name
                            ? ' border-b-3 border-red-700'
                            : ''
                        }`}
                      >
                        {item.chineseName}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="" className="text-center">
                      {item.subMenu.map((subItem, subIndex) => (
                        <DropdownItem key={`${subItem}-${subIndex}`}>
                          {subItem ? (
                            <Link href={`/${item.name}/${subItem.href}`}>
                              <p className="text-black">
                                {subItem.chineseName}
                              </p>
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

        <div
          className=" h-screen bg-secondary-100 border-r-small m-auto hidden sm:block sm:flex flex-col justify-between "
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100px',
            transform: `translateX(${showNav ? '0%' : '-100%'})`,
            opacity: showNav ? 1 : 0,
            transition: 'transform 0.3s, opacity 0.3s',
            zIndex: 1000,
          }}
        >
          <div
            className="font-bold text-white text-3xl [w-30px] h-[200px] mx-auto"
            style={{ writingMode: 'tb', transform: 'rotate(-180deg)' }}
          >
            {/* <p style={{ transform: 'rotate(-90deg)' }}> Bloomify</p> */}
            Bloomify
          </div>

          <div className="w-full mx-auto">
            <FlowerIcon
              ref={ref}
              className="w-full h-24 text-tertiary-black "
            />
          </div>
        </div>
      </>
    )
  }
)
IndexNav.displayName = 'IndexNav'
export default IndexNav

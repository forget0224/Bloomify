import { Fragment } from 'react'
// import { useState } from 'react'
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

export default function HomeNav({ activePage }) {
  const menuItems = [
    {
      name: 'custom',
      chineseName: '代客送花',
      subMenu: [
        { href: 'custom', chineseName: '快速選購' },
        { href: 'custom2', chineseName: '客製化' },
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
        { href: 'flower', chineseName: '花圖鑑' },
        { href: 'game', chineseName: '花占卜' },
      ],
    },
    {
      name: 'about',
      chineseName: '關於我們',
      href: '',
      subMenu: [],
    },
    {
      name: 'join',
      chineseName: '加入我們',
      href: '',
      subMenu: [],
    },
  ]

  return (
    <Navbar isBordered className="bg-primary-300">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-white">Bloomify</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/template">
            範例
          </Link>
        </NavbarItem>
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

      <NavbarContent
        justify="end"
        // style={{ backgroundColor: 'blue', padding: '10px' }}
      >
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
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
                <Link color="foreground" href={`/custom/${item.name}`}>
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

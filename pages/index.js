import { useState, useEffect, useRef } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import styles from './iindex.module.css'
import cardflip from '@/assets/index_cardflip.png'
import bannerFlower from '@/assets/banner-flower.jpg'
import SmoothScroll from '@/components/index/SmoothScroll'
import ImageList from '@/components/index/ImageList'
import Footer from '@/components/layout/footer'
import IndexNav from '@/components/layout/indexnav'

import { useTranslation } from 'react-i18next'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'
import ChangeCard from '@/components/index/changeCard'
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { t } = useTranslation()
  const [activePage, setActivePage] = useState('home')
  const [showNav, setShowNav] = useState(false)
  const svgRef = useRef(null)
  const options = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  }

  const sectionRef = useRef(null)
  const horizontalRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const boxItems = horizontalRef.current
    if (section && boxItems.length) {
      gsap.to(boxItems, {
        xPercent: -100 * (boxItems.length - 1),
        ease: 'sine.out',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 3,
          snap: 1 / (boxItems.length - 1),
          end: () => '+=' + section.offsetWidth,
          onLeave: () => setShowNav(true),
          onEnterBack: () => setShowNav(false),
        },
      })
    }
    const pathElement = svgRef.current

    if (pathElement) {
      const pathLength = pathElement.getTotalLength()
      pathElement.style.strokeDasharray = pathLength
      pathElement.style.strokeDashoffset = pathLength

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top center',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(pathElement, {
            strokeDashoffset: pathLength * (1 - progress),
            immediateRender: false,
          })
        },
        scrub: true,
      })
    }
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  const addToRefs = (el) => {
    if (el && !horizontalRef.current.includes(el)) {
      horizontalRef.current.push(el)
    }
  }

  const [hoverStates, setHoverStates] = useState(
    Array.from({ length: 12 }, () => false)
  )

  const handleMouseEnter = (index) => {
    setHoverStates((hoverStates) =>
      hoverStates.map((state, i) => (i === index ? true : state))
    )
  }

  const handleMouseLeave = (index) => {
    setHoverStates((hoverStates) =>
      hoverStates.map((state, i) => (i === index ? false : state))
    )
  }
  return (
    <>
      <IndexNav showNav={showNav} bgColor="transparent" ref={svgRef} />
      <ReactLenis root options={options}>
        <section
          className={`flex flex-row overflow-hidden min-h-screen bg-secondary-300`}
          ref={sectionRef}
        >
          <div className="">
            <div className="w-full h-full flex flex-row">
              <div
                className="flex flex-row items-center w-screen"
                style={{
                  backgroundImage: `url(/index/img_index_bg_01.jpg)`,
                }}
                ref={addToRefs}
              >
                <div
                  className="h-full w-[800px] mix-blend-multiply"
                  style={{
                    backgroundImage: `url(/index/flowerstore.jpg)`,
                  }}
                ></div>
                <div className="text-3xl flex-1 text-center">How it works?</div>
              </div>

              <div
                className="flex flex-row items-center w-screen "
                style={{
                  backgroundImage: `url(/index/img_index_bg_02.jpg)`,
                }}
                ref={addToRefs}
              >
                <div className="h-full w-full flex  justify-center relative">
                  <div className="sm:w-[1000px] flex flex-wrap items-center ">
                    {' '}
                    {hoverStates.map((isHovered, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseLeave(i)}
                        className="w-1/6 h-1/4"
                        style={{
                          backgroundImage: `url(/assets/index/img-flower-${String(
                            i + 1
                          ).padStart(2, '0')}-${
                            isHovered ? 'color' : 'gray'
                          }.png)`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          transition: 'background-image 0.3s',
                          backgroundPosition: 'center',
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-4xl absolute top-1/2 ">
                    Pick a flower
                  </div>
                </div>
              </div>

              <div
                className="flex flex-row items-center w-screen "
                style={{
                  backgroundImage: `url(/index/img_index_bg_03.jpg)`,
                }}
                ref={addToRefs}
              >
                <div className="sm:w-[1000px] h-full flex flex-row justify-center items-center mx-auto">
                  <div className="flex flex-col">
                    <div className="text-[100px] flex-1  text-center ">
                      Design
                    </div>
                    <div className="text-[100px] flex-1  text-center ">
                      your
                    </div>
                    <div className="text-[100px] flex-1  text-center ">own</div>
                    <div className="text-[100px] flex-1  text-center ">
                      bouquet
                    </div>
                  </div>

                  <div
                    className="h-[600px] w-[400px]"
                    style={{
                      backgroundImage: `url(/index/bouquet.png)`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center bottom',
                    }}
                  ></div>
                </div>
              </div>

              <div
                className="flex flex-row items-center w-screen "
                style={{
                  backgroundImage: `url(/index/img_index_bg_04.jpg)`,
                }}
                ref={addToRefs}
              >
                <div className="sm:w-[1000px] h-[600px] flex flex-row justify-center items-center mx-auto">
                  <div
                    className="h-[600px] w-[650px] flex items-end justify-start"
                    style={{
                      backgroundImage: `url(/index/car.png)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center bottom',
                    }}
                  >
                    <div className="text-xl pb-10">we delievery for you</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ReactLenis>
      {/* sm:banner */}
      <section className="w-screen h-screen bg-blue-100  text-black sm:flex flex-col  justify-center items-center hidden sm:flex">
        <div className="border-1 border-pink w-[1000px] h-[400px] flex flex-row">
          <div className="w-full flex flex-col bg-white justify-center items-center text-center">
            <h1 className="text-2xl my-3">情人節活動</h1>
            <p className="my-3 px-4">
              無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。
            </p>
            <div className="w-full text-right px-4 my-3">
              <a href="#" className="text-black ">
                More
              </a>
            </div>
          </div>
          <div className="w-full">
            <Image src={bannerFlower} alt="" className="w-[500px] h-full" />
          </div>
        </div>
      </section>
      {/* phone:banner */}
      <section className="w-screen h-60  bg-[url('/index/index_banner.jpg')] bg-cover flex items-center sm:hidden">
        <div className="w-80 h-52 bg-white/80 m-auto text-tertiary-black flex flex-col justify-center items-center rounded-2xl p-6 gap-y-2.5">
          <h1 className="text-[22px]">情人節活動</h1>
          <p className="text-xs">
            無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。無論風雨，無論時節，花店都在為您提供最溫馨的服務。
          </p>
          <Link href="#">More</Link>
        </div>
      </section>

      <div className="w-screen min-h-screen flex-col items-center justify-between relative ">
        <ChangeCard />
      </div>

      {/* cardsection */}
      <section className="bg-secondary-300 w-screen min-h-screen">
        <div className="flex sm:flex-row flex-col justify-center items-center min-h-screen gap-8">
          <div className="sm:w-[580px] h-auto">
            <Card className="col-span-12 sm:col-span-4 h-[750px] bg-secondary-200">
              <CardBody className="flex flex-col justify-center items-center">
                <div
                  className="w-[225px] h-[480px] bg-contain bg-no-repeat"
                  style={{
                    backgroundImage: `url(/index/white_flower.png)`,
                  }}
                ></div>

                <div>
                  <Input
                    radius="full"
                    type="email"
                    label="Email"
                    placeholder="搶先取得最新優惠消息"
                    className="max-w-[450px]"
                    endContent={
                      <MyButton color="secondary" size="md">
                        寄送Email
                      </MyButton>
                    }
                  />
                </div>
                <div className="text-2xl mt-4">輕鬆體驗定製化的購物體驗</div>
              </CardBody>
            </Card>
          </div>
          <div className="sm:w-[580px] h-auto">
            <Card
              className="col-span-12 sm:col-span-4 h-[750px] bg-primary-300 bg-no-repeat"
              style={{
                backgroundImage: `url(/index/plante.png)`,
              }}
            >
              <CardBody className="flex h-[500px] justify-end items-end gap-5 py-16 px-8">
                <div className="text-tertiary-black text-2xl text-right gap-2 flex flex-col">
                  {' '}
                  <div className="">{t('right-green')}</div>
                  <div className="">我們的平台</div>
                  <div className="">成為我們的一部分</div>
                </div>
                <div>
                  <MyButton size="xl" color="primary200" className="px-24 py-6">
                    加入我們
                  </MyButton>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

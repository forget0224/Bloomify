import { useState, useEffect, useRef } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import bannerFlower from '@/assets/banner-flower.jpg'
import Footer from '@/components/layout/footer'
import IndexNav from '@/components/layout/indexnav'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
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
  const bgD1 = '/index/img_index_bg_01.jpg'
  const bgM1 = '/index/img_index_bg_mb_01.jpg'
  const bgD2 = '/index/img_index_bg_02.jpg'
  const bgM2 = '/index/img_index_bg_mb_02.jpg'
  const bgD3 = '/index/img_index_bg_03.jpg'
  const bgM3 = '/index/img_index_bg_mb_03.jpg'
  const bgD4 = '/index/img_index_bg_04.jpg'
  const bgM4 = '/index/img_index_bg_mb_04.jpg'
  const [bgImg1, setBgImage1] = useState(null)
  const [bgImg2, setBgImage2] = useState(null)
  const [bgImg3, setBgImage3] = useState(null)
  const [bgImg4, setBgImage4] = useState(null)
  const [showNav, setShowNav] = useState(false)
  const svgRef = useRef(null)
  const options = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  }
  const sectionRef = useRef(null)
  const horizontalRef = useRef([])
  // const secondRef = useRef(null)
  // const secondBox = useRef(null)
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  })
  const isMobile = useMediaQuery({
    query: '(max-width: 375px)',
  })

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

  // useEffect(() => {
  //   if (secondRef.current && secondBox.current) {
  //     gsap.to(secondBox.current, {
  //       yPercent: -20,
  //       ease: 'none',
  //       scrollTrigger: {
  //         trigger: secondRef.current,
  //         start: 'top bottom',
  //         end: 'bottom top',
  //         scrub: true,
  //       },
  //     })
  //   }
  // }, [])

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

  useEffect(() => {
    setBgImage1(isDesktop ? bgD1 : bgM1)
    setBgImage2(isDesktop ? bgD2 : bgM2)
    setBgImage3(isDesktop ? bgD3 : bgM3)
    setBgImage4(isDesktop ? bgD4 : bgM4)
  }, [isDesktop])

  return (
    <>
      <Head>
        <title>Bloomify</title>
      </Head>
      <IndexNav
        showNav={showNav}
        bgColor="transparent"
        ref={svgRef}
        pref={svgRef}
      />
      <ReactLenis root options={options}>
        <section
          className={`flex flex-row overflow-hidden min-h-screen bg-secondary-300`}
          ref={sectionRef}
        >
          <div className="">
            <div className="w-full h-full flex flex-row">
              <div
                className="flex flex-row items-center w-screen relative object-fit"
                style={{
                  backgroundImage: `url(${bgImg1})`,
                }}
                ref={addToRefs}
              >
                <div
                  className="h-full sm:w-[745px] bg-contain bg-no-repeat bg-bottom w-full mix-blend-multiply"
                  style={{
                    backgroundImage: `url(/index/flowerstore.jpg)`,
                  }}
                ></div>
                <div className="sm:text-3xl flex-1 text-center  text-xl  sm:relative   absolute top-12 right-6">
                  How it works?
                </div>
              </div>

              <div
                className="flex flex-row items-center w-screen "
                style={{
                  backgroundImage: `url(${bgImg2})`,
                }}
                ref={addToRefs}
              >
                <div className="h-full w-full flex  justify-center relative">
                  <div className="sm:w-[1000px] w-[300px]  flex flex-wrap items-center ">
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
                  <div className="sm:text-4xl absolute top-1/2 text-lg">
                    Pick a flower
                  </div>
                </div>
              </div>

              <div
                className="flex flex-row items-center w-screen "
                style={{
                  backgroundImage: `url(${bgImg3})`,
                }}
                ref={addToRefs}
              >
                <div className="sm:w-[1000px] w-[300px]  h-full flex flex-row justify-center items-center mx-auto">
                  <div className="flex flex-col">
                    <div className="sm:text-[100px] text-[48px] flex-1  text-center ">
                      Design
                    </div>
                    <div className="sm:text-[100px] text-[48px] flex-1  text-center ">
                      your
                    </div>
                    <div className="sm:text-[100px] text-[48px] flex-1  text-center ">
                      own
                    </div>
                    <div className="sm:text-[100px] text-[48px] flex-1  text-center ">
                      bouquet
                    </div>
                  </div>

                  <div
                    className="sm:h-[600px] sm:w-[400px]    h-[300px] w-[200px]"
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
                  backgroundImage: `url(${bgImg4})`,
                }}
                ref={addToRefs}
              >
                <div className="sm:w-[1000px] sm:h-[600px]  w-[300px]  h-[200px]  flex flex-row justify-center items-center mx-auto">
                  <div
                    className="sm:h-[600px] sm:w-[650px]   h-[300px] w-[350px]   flex items-end justify-start"
                    style={{
                      backgroundImage: `url(/index/car.png)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center bottom',
                    }}
                  >
                    <div className="text-xl pb-10">We deliver for you</div>
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
            <h1 className="text-2xl my-3">{t('section2.mothersDayTitle')}</h1>
            <p className="my-3 px-4">{t('section2.mothersDayCampaign')}</p>
            <div className="w-full text-right px-4 my-3">
              <a href="#" className="text-black ">
                {t('section2.more')}
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
          <h1 className="text-[22px]">{t('section2.mothersDayTitle')}</h1>
          <p className="text-xs">{t('section2.mothersDayCampaign')}</p>
          <Link href="#">{t('section2.more')}</Link>
        </div>
      </section>

      <div
        className="w-screen min-h-screen flex-col items-center justify-between relative "
        style={{ background: `url(${bgImg2})` }}
      >
        <ChangeCard />
      </div>

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
                    placeholder={t('section4.experience')}
                    className="max-w-[450px]"
                    endContent={
                      <MyButton color="secondary" size="md">
                        {t('section4.subscribe')}
                      </MyButton>
                    }
                  />
                </div>
                <div className="text-2xl mt-4"> {t('section4.experience')}</div>
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
                  <div className="">{t('section4.yourStory')}</div>
                  <div className="">{t('section4.ourPlatform')}</div>
                  <div className="">{t('section4.continue')}</div>
                </div>
                <div>
                  <MyButton size="xl" color="primary200" className="px-24 py-6">
                    {t('section4.joinButton')}
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

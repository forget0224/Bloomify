import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'
gsap.registerPlugin(ScrollTrigger)
const HeroSection = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  })
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    if (!section) return
    const setupAnimation = () => {
      const titles = gsap.utils.toArray('.hero_title_row_text', section)
      const mediaImages = gsap.utils.toArray('.hero_media_image', section)

      const initialPercent100 = isDesktop ? -100 : -50
      const initialYPercent = isDesktop ? -25 : -20
      gsap.set(titles, { autoAlpha: 0, yPercent: initialPercent100 })
      gsap.set(media, {
        autoAlpha: 0,
        xPercent: initialPercent100,
        yPercent: initialYPercent,
      })
      gsap.set(mediaImages, { xPercent: initialPercent100 })

      // 創建時間軸
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: () => `+=${section.offsetHeight}`,
          toggleActions: 'play none none none',
          scrub: true,
        },
        defaults: { duration: isDesktop ? 2 : 4, ease: 'expo.inOut' },
      })
      tl.to(media, {
        autoAlpha: 1,
        xPercent: 0,
      })
        .to(
          mediaImages,
          {
            xPercent: 0,
            stagger: 0.016,
          },
          0.16
        )
        .to(
          titles,
          {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.016,
          },
          1
        )
        .to(
          media,
          {
            yPercent: 0,
          },
          1
        )
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === section) {
          setupAnimation()
        }
      }
    })
    resizeObserver.observe(section)

    return () => {
      resizeObserver.disconnect()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isDesktop])

  function getImageClass(index) {
    const base =
      'object-cover relative bg-contain opacity-90 bg-no-repeat bg-center' // Use Tailwind CSS for styles
    let margin = 'mr-[-1.2rem]' // Default margin for every image
    switch (index) {
      case 1:
        return `${base} w-[10rem] h-[12rem] ${margin}`
      case 2:
        return `${base} w-[20rem] h-[24rem] ${margin}`
      case 3:
        return `${base} w-[16rem] h-[20rem] ${margin}`
      case 4:
        return `${base} w-[24rem] h-[32rem] ${margin}`
      case 5:
        return `${base} w-[12rem] h-[14rem] ${margin}`
      case 6:
        return `${base} w-[24rem] h-[32rem] ${margin}`
      case 7:
        return `${base} w-[16rem] h-[20rem] ${margin}`
      case 8:
        return `${base} w-[10rem] h-[12rem] ${margin}`
      default:
        return base
    }
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="hero   relative w-full h-screen  bg-no-repeat"
      >
        <div className="hero_media absolute top-1/2 -translate-y-1/2  -z-1  sm:scale-100 scale-[0.6]">
          <div
            ref={mediaRef}
            className="hero_media_wrapper w-full flex items-center justify-center "
          >
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`hero_media_image ${getImageClass(index + 1)}`}
                style={{
                  backgroundImage: `url(/index/sec2_img${index + 1}.png)`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className=" hero_wrapper   flex flex-col items-around justify-around gap-24 z-10  h-full">
          <div className=" hero_title  relative w-full text-center text-white text-bold h-[300px]">
            <div className="overflow-hidden  absolute top-16 left-1/2 -translate-x-1/2 w-full">
              <div
                className="hero_title_row_text  text-[60px] font-great-vibes p-4 "
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                {`Happy Mother's Day`}
              </div>
              <div className="overflow-hidden ">
                <div
                  className="hero_title_row_text"
                  style={{
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  A Bouquet of Love,Just for Her
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection

import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import styles from '../custom/custom.module.css'
import Image from 'next/image'
import bannerFlower from '@/assets/banner-flower.jpg'
export default function Custom() {
  const [activePage, setActivePage] = useState('custom')
  return (
    <>
      {
        <>
          {/* main的東西 */}
          <div className="bg-[url('/assets/intro/vintage_speckles.png')]">
            <div className="w-screen h-screen justify-center flex flex-col">
              <div className="text-center text-black mb-11">
                <p>~</p>
                <p>以盛開的雛菊，</p>
                <p>為你解開疑惑。</p>

                <p className="mt-1">In a garden where daisies bloom,</p>
                <p>A fortune teller lifts the gloom.</p>
              </div>
              <div>
                {' '}
                <img
                  className="w-full max-w-xs h-auto"
                  src="/assets/intro/cloud2.png"
                  alt="daisy2"
                />
              </div>
              <div>
                {' '}
                <img
                  className="w-full max-w-xs h-auto"
                  src="/assets/intro/cloud1.png"
                  alt="daisy2"
                />
              </div>
              <div className="flex justify-center items-end mb-0">
                <img
                  className="w-full max-w-xs h-auto"
                  src="/assets/intro/daisy2.png"
                  alt="daisy2"
                />
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

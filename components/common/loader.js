import { useEffect } from 'react'
import loading from '@/assets/loading-css.svg'
import Image from 'next/image'
export default function Loader() {
  // return <Loading />
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-white">
        <Image src={loading} alt="Loading" height={300} />
      </div>
    </>
  )
}

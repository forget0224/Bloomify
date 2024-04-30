import React from 'react'
import Image from 'next/image'
import Parallax from './Parallax'
import { useLenis } from '@studio-freight/react-lenis'

export default function ImageList() {
  const lenis = useLenis((scroll) => {
    console.log(lenis)
  })

  return (
    <>
      <Image
        src={'https://picsum.photos/600/400?random=1'}
        alt="scroll"
        width={600}
        height={400}
      />
      <Parallax className={'self-end overflow-hidden'} speed={1}>
        <Image
          src={'https://picsum.photos/600/400?random=2'}
          alt="scroll"
          width={600}
          height={400}
        />
      </Parallax>
      <Parallax className={'self-center'} speed={1}>
        <Image
          src={'https://picsum.photos/600/400?random=3'}
          alt="scroll"
          width={600}
          height={400}
        />
      </Parallax>
      <Parallax className={'self-end'} speed={21}></Parallax>
      <Image
        src={'https://picsum.photos/600/400?random=4'}
        alt="scroll"
        width={600}
        height={400}
      />

      <Parallax className={'self-start'} speed={-1}>
        {' '}
        <Image
          src={'https://picsum.photos/600/400?random=5'}
          alt="scroll"
          width={600}
          height={400}
        />
      </Parallax>

      <Image
        src={'https://picsum.photos/600/400?random=6'}
        alt="scroll"
        width={600}
        height={400}
      />

      <Parallax className={'self-center'} speed={2}>
        {' '}
        <Image
          src={'https://picsum.photos/600/400?random=7'}
          alt="scroll"
          width={600}
          height={400}
        />
      </Parallax>

      <Image
        src={'https://picsum.photos/600/400?random=8'}
        alt="scroll"
        width={600}
        height={400}
      />
    </>
  )
}

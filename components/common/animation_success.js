import React from 'react'
import Lottie from 'react-lottie'
import animationData from './animation_success.json'

const SuccessAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div>
      <Lottie options={defaultOptions} height={120} width={120} />
    </div>
  )
}

export default SuccessAnimation

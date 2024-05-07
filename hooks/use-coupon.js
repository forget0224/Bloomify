import { useState } from 'react'

const useCouponValidator = (couponCode) => {
  const [discount, setDiscount] = useState(0)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateCoupon = () => {
    setIsSubmitted(true)
    const coupons = {
      FLOWER50: 50,
      FLOWER30: 30,
    }

    const discountValue = coupons[couponCode]
    if (discountValue) {
      setDiscount(discountValue)
      setError('')
    } else {
      setError('無效的優惠碼')
      setDiscount(0)
    }
  }

  return { validateCoupon, discount, error, isSubmitted }
}

export default useCouponValidator

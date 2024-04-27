import { React, useState, Fragment, useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { RadioGroup, Radio } from '@nextui-org/react'
import { FaCcMastercard, FaCcVisa, FaCcApplePay } from 'react-icons/fa6'
import { Stepper } from 'react-dynamic-stepper'
import Link from 'next/link'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
import FormTag from '@/components/common/tag-form'

export default function FillOut() {
  const [activePage, setActivePage] = useState('cart')
  const [payments, setPayments] = useState([])
  const [shippings, setShippings] = useState([])
  const [invoices, setInvoices] = useState([])
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    fetchInvoices()
    fetchShippings()
    fetchPayments()
  }, [])

  // 獲取後端配送選項
  const fetchShippings = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/share-shippings')
      const data = await response.json()
      if (data.status === 'success') {
        setShippings(data.data.shippings)
      } else {
        console.error('Failed to fetch shippings:', data.message)
      }
    } catch (error) {
      console.error('Error fetching shipping data:', error)
    }
  }

  // 獲取後端付款選項
  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/share-payments')
      const data = await response.json()
      if (data.status === 'success') {
        setPayments(data.data.payments)
      } else {
        console.error('Failed to fetch shippings:', data.message)
      }
    } catch (error) {
      console.error('Error fetching shipping data:', error)
    }
  }

  // 獲取後端收據選項
  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/share-invoices')
      const data = await response.json()
      if (data.status === 'success') {
        setInvoices(data.data.invoices)
      } else {
        console.error('Failed to fetch invoices:', data.message)
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error)
    }
  }

  const cities = [
    {
      value: '臺北市',
      label: '臺北市',
    },
    {
      value: '新北市',
      label: '新北市',
    },
  ]
  const townships = [
    {
      value: '大安區',
      label: '大安區',
    },
    {
      value: '淡水區',
      label: '淡水區',
    },
  ]
  const postalCodes = [
    {
      value: '104',
      label: '104',
    },
    {
      value: '110',
      label: '110',
    },
  ]
  // const paymentMethods = [
  //   {
  //     value: 'Line Pay',
  //     icon: '',
  //   },
  //   {
  //     value: '綠界',
  //     icon: '',
  //   },
  //   {
  //     value: 'Apple Pay',
  //     icon: (
  //       <Fragment>
  //         <FaCcApplePay className="h-6 w-6 text-tertiary-black" />
  //       </Fragment>
  //     ),
  //   },
  //   {
  //     value: '藍星',
  //     icon: '',
  //   },
  //   {
  //     value: '現金',
  //     icon: '',
  //   },
  //   {
  //     value: '貨到付款',
  //     icon: '',
  //   },
  // ]

  const handleRadioChange = (value) => {
    setSelectedValue(value)
  }

  // stepper
  const steps = [
    {
      header: {
        label: '購物車',
      },
      // content: <div>First step content</div>,
      isError: false,
      isWarning: false,
      isComplete: true,
    },
    {
      header: {
        label: '填寫資料',
      },
      // content: <div>Second step content</div>,
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: false,
    },
    {
      header: {
        label: '訂單確認',
      },
      // content: <div>Third step content</div>,
      isError: false,
      isComplete: false,
    },
  ]
  // const submitStepper = () => {
  //   console.log('submitted')
  // }

  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg', 'placeholder:text-tertiary-gray-100'],
  }
  // select 樣式
  const selectStyles = {
    label: 'text-base',
    value: ['text-base', 'text-tertiary-gray-100'],
  }
  return (
    <>
      <DefaultLayout activePage={activePage}>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 md:px-0 mb-10">
            {/* steps */}
            <div className="flex flex-col w-full md:w-6/12 lg:w-4/12 gap-14 mt-6 mb-4">
              <Stepper
                steps={steps}
                pallet={{
                  default: '#E4E4E4',
                  warning: '#FF7C7C',
                  danger: '#FF7C7C',
                  success: '#68A392',
                }}
                footerData={{
                  // submitHandler: submitStepper,
                  prevBtnClassName: 'hidden',
                  nextBtnClassName: 'hidden',
                  submitBtnClassName: 'hidden',
                }}
              />
            </div>
            {/* 主要內容 */}
            <div className="flex flex-col w-full md:w-6/12 lg:w-4/12 gap-12">
              {/*  buyer start */}
              {/* <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                <FormTag text="訂購人資訊" />
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                  <Input
                    type="text"
                    label="姓名"
                    placeholder="請輸入姓名"
                    labelPlacement="outside"
                    isRequired
                    classNames={{ ...inputStyles }}
                  />
                  <Input
                    type="text"
                    label="手機號碼"
                    placeholder="09xxxxxxxx"
                    labelPlacement="outside"
                    isRequired
                    classNames={{ ...inputStyles }}
                  />
                  <Input
                    type="text"
                    label="電子信箱"
                    placeholder="123@example.com"
                    labelPlacement="outside"
                    isRequired
                    classNames={{ ...inputStyles }}
                  />
                  <Checkbox defaultSelected>
                    <span className="text-base">同會員資料</span>
                  </Checkbox>
                </div>
              </div> */}
              {/*  buyer end */}

              {/* shipping start */}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                <div className="flex text-black border-b-2 border-primary-300">
                  <FormTag text="運送資訊" />
                </div>
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                  <Select
                    label="配送方式"
                    placeholder="請選擇配送方式"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    isRequired
                    classNames={{ ...selectStyles }}
                  >
                    {shippings.map((shipping) => (
                      <SelectItem key={shipping.id} value={shipping.name}>
                        {shipping.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="text"
                    label="收件人姓名"
                    placeholder="請輸入姓名"
                    labelPlacement="outside"
                    isRequired
                    classNames={{ ...inputStyles }}
                  />
                  <Input
                    type="text"
                    label="收件人手機號碼"
                    placeholder="09xxxxxxxx"
                    labelPlacement="outside"
                    isRequired
                    classNames={{ ...inputStyles }}
                  />
                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="pickup" className="block mb-1 text-base">
                      取貨門市
                    </label>
                    <MyButton
                      color="primary"
                      size="xl"
                      id="pickup"
                      type="button"
                      className="w-full"
                      isOutline
                    >
                      7-ELEVEN
                    </MyButton>
                  </div>
                  {/* address */}
                  <div className="flex flex-col gap-3">
                    <div className="space-y-3 sm:flex sm:gap-3 ">
                      <Select
                        label="配送地址"
                        placeholder="請選擇城市"
                        labelPlacement="outside"
                        disableSelectorIconRotation
                        isRequired
                        classNames={{ ...selectStyles }}
                      >
                        {cities.map((shippingMethod) => (
                          <SelectItem
                            key={shippingMethod.value}
                            value={shippingMethod.value}
                            classNames={{
                              base: 'text-base',
                            }}
                          >
                            {shippingMethod.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        label=""
                        placeholder="請選擇鄉鎮"
                        labelPlacement="outside"
                        disableSelectorIconRotation
                        isRequired
                        classNames={{ ...selectStyles }}
                      >
                        {townships.map((shippingMethod) => (
                          <SelectItem
                            key={shippingMethod.value}
                            value={shippingMethod.value}
                          >
                            {shippingMethod.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        label=""
                        placeholder="郵遞區號"
                        labelPlacement="outside"
                        disableSelectorIconRotation
                        isRequired
                        classNames={{ ...selectStyles }}
                      >
                        {postalCodes.map((shippingMethod) => (
                          <SelectItem
                            key={shippingMethod.value}
                            value={shippingMethod.value}
                          >
                            {shippingMethod.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <Input
                      type="text"
                      labelPlacement="inside"
                      placeholder="請填寫地址"
                      isRequired
                      classNames={{ ...inputStyles }}
                    />
                  </div>
                  <Checkbox defaultSelected>
                    <span className="text-base">同訂購人資料</span>
                  </Checkbox>
                </div>
              </div>
              {/* shipping end */}

              {/* coupon start*/}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                <FormTag text="優惠券" />
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-white border-1 rounded-lg">
                  <div className="w-full">
                    <Input
                      type="text"
                      label="折扣碼"
                      labelPlacement="outside"
                      placeholder="輸入優惠碼"
                      className="w-full mb-1"
                      classNames={{ ...inputStyles }}
                    />
                    <span className="text-primary-100 text-sm">
                      套用優惠券：滿NT$100，折NT$50
                    </span>
                  </div>
                  <MyButton color="primary" size="xl" isOutline>
                    套用
                  </MyButton>
                </div>
              </div>
              {/* coupon end*/}

              {/* payment start*/}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                <div className="flex text-black border-b-2 border-primary-300">
                  <FormTag text="付款方式" />
                </div>
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-white border-1 rounded-lg">
                  <RadioGroup>
                    {payments.map((payment) => (
                      <label
                        key={payment.id}
                        htmlFor={payment.name}
                        className={`border-solid border-1 rounded-xl px-4 py-3 mb-2 cursor-pointer hover:border-tertiary-gray-100 ${
                          selectedValue === payment.name
                            ? 'border-primary-100'
                            : 'border-tertiary-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <Radio
                              id={payment.name}
                              value={payment.name}
                              onChange={() => handleRadioChange(payment.name)}
                              checked={selectedValue === payment.name}
                              color="primary-100"
                              classNames={{ ...inputStyles }}
                            >
                              {payment.name}
                            </Radio>
                          </div>
                          {/* <div className="flex gap-1">{paymentMethod.icon}</div> */}
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              {/* payment end*/}

              {/* invoice start */}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                <div className="flex text-black border-b-2 border-primary-300">
                  <FormTag text="發票種類" />
                </div>
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                  <Select
                    label="發票種類"
                    placeholder="請選擇發票種類"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    isRequired
                    classNames={{ ...selectStyles }}
                  >
                    {invoices.map((invoice) => (
                      <SelectItem
                        key={invoice.id}
                        value={invoice.name}
                        classNames={{ ...selectStyles }}
                      >
                        {invoice.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="text"
                    label="手機條碼"
                    placeholder="/ABC+123"
                    labelPlacement="outside"
                    isRequired
                    classNames={{ ...inputStyles }}
                  />
                </div>
              </div>
              {/* invoice end */}

              {/* button */}
              <div className="flex justify-center gap-2 sm:gap-4 sm:my-10">
                <MyButton color="primary" size="xl" isOutline>
                  <Link href="/">上一步</Link>
                </MyButton>
                <MyButton color="primary" size="xl">
                  <Link href="/cart/checkout">下一步</Link>
                </MyButton>
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}

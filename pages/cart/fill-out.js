import { React, useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Input, Popover, DatePicker, TimeInput } from '@nextui-org/react'
import { Time, parseAbsoluteToLocal, now } from '@internationalized/date'
import { CiClock2 } from 'react-icons/ci'
import { I18nProvider } from '@react-aria/i18n'
import { Checkbox } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { RadioGroup, Radio } from '@nextui-org/react'
import { useAuth } from '@/hooks/use-auth'
import { FaCcMastercard, FaCcVisa, FaCcApplePay } from 'react-icons/fa6'
import { Stepper } from 'react-dynamic-stepper'

import Link from 'next/link'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
import FormTag from '@/components/common/tag-form'
import { useFillOut } from '@/context/fill-out-context'
import { DateFormatter } from '@internationalized/date'
import CustomFillOut from '@/components/custom/CustomFillOut'
import ShopFillOut from '@/components/shop/shop-fillout'

export default function FillOut() {
  const [activePage, setActivePage] = useState('cart')
  const [payments, setPayments] = useState([])
  const [shippings, setShippings] = useState([])
  const [invoices, setInvoices] = useState([])
  const [selectedValue, setSelectedValue] = useState('')
  const { fillOutDetails, setFillOutDetails } = useFillOut()
  const [recipientName, setRecipientName] = useState('')
  const [recipientNumber, setRecipientNumber] = useState('')
  const [deliveryOption, setDeliveryOption] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [senderName, setSenderName] = useState('')
  const [senderNumber, setSenderNumber] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [invoiceOption, setInvoiceOption] = useState('')
  const [deliveryShipping, setDeliveryShipping] = useState(0)
  const [mobileBarcode, setMobileBarcode] = useState('')
  const [syncData, setSyncData] = useState(false)
  const { auth } = useAuth()
  const { userData, isAuth } = auth
  const [city, setCity] = useState('')
  const [township, setTownship] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [date, setDate] = useState(now('Asia/Taipei'))

  const times = ['不指定時間']
  for (let hour = 9; hour <= 21; hour++) {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`
    times.push(formattedHour)
  }

  function updateDeliveryAddress() {
    if (city && township && postalCode && addressDetail) {
      setDeliveryAddress(`${city} ${township} ${postalCode} ${addressDetail}`)
    }
  }
  const handleCityChange = (value) => {
    setCity(value)
    updateDeliveryAddress()
  }

  const handleTownshipChange = (value) => {
    setTownship(value)
    updateDeliveryAddress()
  }

  const handlePostalCodeChange = (value) => {
    setPostalCode(value)
    updateDeliveryAddress()
  }

  const handleAddressDetailChange = (value) => {
    setAddressDetail(value)

    updateDeliveryAddress()

    // updateDeliveryAddress()
  }

  const handleTimeChange = (value) => {
    setDeliveryTime(value)
    console.log(value)
  }

  const handleDateChange = (value) => {
    setDate(value)
    setDeliveryDate(`${value.year}/${value.month}/${value.day}`)
  }
  const [useMemberInfo, setUseMemberInfo] = useState(false)

  const route = useRouter()
  const source = route.query.source

  const handleInputChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case 'recipientName':
        setRecipientName(value)
        break
      case 'recipientNumber':
        setRecipientNumber(value)
        break
      case 'deliveryOption':
        setDeliveryOption(value)
        break
      case 'couponCode':
        setCouponCode(value)
        break
      case 'paymentMethod':
        setPaymentMethod(value)
        break
      case 'invoiceOption':
        setInvoiceOption(value)
        break
      case 'senderName':
        setSenderName(value)
        if (syncData) setRecipientName(value)
        break
      case 'senderNumber':
        setSenderNumber(value)
        if (syncData) setRecipientNumber(value)
        break
      case 'senderEmail':
        setSenderEmail(value)
        break
      case 'deliveryAddress':
        setDeliveryAddress(value)
        break

      default:
        // 可以在这里处理默认情况或者当未匹配到任何键时的情况
        console.log(`Unknown field: ${name}`)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newFormDetails = {
      senderName,
      senderNumber,
      senderEmail,
      recipientName, // 收件人姓名
      recipientNumber, // 聯絡電話
      deliveryDate,
      deliveryTime,
      deliveryOption: selectedDeliveryOption.name,
      deliveryShipping,
      deliveryAddress,
      couponCode,
      paymentMethod,
      invoiceOption: selectedInvoiceOption.name,
      mobileBarcode,
    }
    console.log(newFormDetails)
    await setFillOutDetails(newFormDetails)
    route.push(`/cart/checkout?source=${source}`)
  }

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

  // 點選相對應的運送方式會顯示的東西
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('')
  const handleSelectDeliveryChange = (event) => {
    const shipping = shippings.find(
      (sh) => sh.id === Number(event.target.value)
    )
    if (shipping) {
      setDeliveryShipping(shipping.cost)
      setSelectedDeliveryOption(shipping) // 直接儲存整個shipping對象
    }
  }

  // 點選相對應的發票方式會顯示的東西
  const [selectedInvoiceOption, setSelectedInvoiceOption] = useState('')

  const handleSelectInvoiceChange = (value) => {
    const selectedInvoice = invoices.find(
      (invoice) => invoice.id === Number(value)
    )
    setSelectedInvoiceOption(selectedInvoice)
    setInvoiceOption(value)
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

  const handleRadioChange = (value) => {
    setPaymentMethod(value)
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

  const handleCheckboxChange = () => {
    setUseMemberInfo(!useMemberInfo)
  }
  const handleRecipientChange = (event) => {
    const isChecked = event.target.checked
    setSyncData(isChecked)
    if (isChecked) {
      setRecipientName(senderName)
      setRecipientNumber(senderNumber)
    }
  }

  useEffect(() => {
    if (useMemberInfo && userData) {
      setSenderName(userData.name || '')
      setSenderNumber(userData.phone || '')
      setSenderEmail(userData.username || '')
    }
  }, [useMemberInfo, userData])
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
              {source === 'flower' || source === 'shop' ? (
                <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                  <FormTag text="訂購人資訊" />
                  <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                    <Input
                      type="text"
                      label="姓名"
                      placeholder="請輸入姓名"
                      labelPlacement="outside"
                      isRequired
                      classNames={{ ...inputStyles }}
                      name="senderName"
                      value={senderName}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="text"
                      label="手機號碼"
                      placeholder="09xxxxxxxx"
                      labelPlacement="outside"
                      isRequired
                      classNames={{ ...inputStyles }}
                      name="senderNumber"
                      value={senderNumber}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="text"
                      label="電子信箱"
                      placeholder="123@example.com"
                      labelPlacement="outside"
                      isRequired
                      classNames={{ ...inputStyles }}
                      name="senderEmail"
                      value={senderEmail}
                      onChange={handleInputChange}
                    />
                    <Checkbox
                      checked={useMemberInfo}
                      onChange={handleCheckboxChange}
                    >
                      <span className="text-base">同會員資料</span>
                    </Checkbox>
                  </div>
                </div>
              ) : null}
              {/*  buyer end */}

              {/* shipping 代客送花 start */}
              {source === 'flower' ? (
                <CustomFillOut
                  recipientName={recipientName}
                  recipientNumber={recipientNumber}
                  syncData={syncData}
                  selectedDeliveryOption={selectedDeliveryOption}
                  handleSelectDeliveryChange={handleSelectDeliveryChange}
                  cities={cities}
                  townships={townships}
                  postalCodes={postalCodes}
                  handleCityChange={handleCityChange}
                  handleTownshipChange={handleTownshipChange}
                  handlePostalCodeChange={handlePostalCodeChange}
                  addressDetail={addressDetail}
                  setAddressDetail={setAddressDetail}
                  handleAddressDetailChange={handleAddressDetailChange}
                  date={date}
                  handleDateChange={handleDateChange}
                  inputStyles={inputStyles}
                  selectStyles={selectStyles}
                  handleInputChange={handleInputChange}
                  handleRecipientChange={handleRecipientChange}
                  shippings={shippings}
                  deliveryTime={deliveryTime}
                  times={times}
                  handleTimeChange={handleTimeChange}
                  deliveryAddress={deliveryAddress}
                  setDeliveryShipping={setDeliveryShipping}
                />
              ) : null}
              {/* shipping 代客送花 end */}

              {/* shipping 商城 start */}
              {source === 'shop' ? (
                <ShopFillOut
                  inputStyles={inputStyles}
                  recipientName={recipientName}
                  handleInputChange={handleInputChange}
                  recipientNumber={recipientNumber}
                  syncData={syncData}
                  handleRecipientChange={handleRecipientChange}
                  selectStyles={selectStyles}
                  handleSelectDeliveryChange={handleSelectDeliveryChange}
                  shippings={shippings}
                  selectedDeliveryOption={selectedDeliveryOption}
                  handleCityChange={handleCityChange}
                  cities={cities}
                  handleTownshipChange={handleTownshipChange}
                  townships={townships}
                  handlePostalCodeChange={handlePostalCodeChange}
                  postalCodes={postalCodes}
                  handleAddressDetailChange={handleAddressDetailChange}
                />
              ) : null}
              {/* shipping 商城 end */}

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
                      name="couponCode"
                      onChange={handleInputChange}
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
                        aria-label="請選擇付款方式"
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
                              name="paymentMethod"
                            >
                              {payment.name}
                            </Radio>
                          </div>
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
                    aria-label="請選擇發票種類"
                    placeholder="請選擇發票種類"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    isRequired
                    classNames={{ ...selectStyles }}
                    name="invoiceOption"
                    onChange={(e) => handleSelectInvoiceChange(e.target.value)}
                  >
                    {invoices.map((invoice) => (
                      <SelectItem
                        aria-label="請選擇發票"
                        key={invoice.id}
                        value={invoice.name}
                        classNames={{ ...selectStyles }}
                      >
                        {invoice.name}
                      </SelectItem>
                    ))}
                  </Select>
                  {selectedInvoiceOption &&
                    selectedInvoiceOption.name === '手機條碼載具' && (
                      <Input
                        type="text"
                        label="手機條碼"
                        aria-label="請輸入手機條碼"
                        placeholder="/ABC+123"
                        labelPlacement="outside"
                        isRequired
                        value={mobileBarcode}
                        onChange={(e) => setMobileBarcode(e.target.value)}
                        classNames={{ ...inputStyles }}
                      />
                    )}
                </div>
              </div>
              {/* invoice end */}

              {/* button */}
              <div className="flex justify-center gap-2 sm:gap-4 sm:my-10">
                <MyButton color="primary" size="xl" isOutline>
                  <Link href="/">上一步</Link>
                </MyButton>
                <MyButton color="primary" size="xl" onClick={handleSubmit}>
                  <Link href={`/cart/checkout?source=${source}`}>下一步</Link>
                </MyButton>
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}

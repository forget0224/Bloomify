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
import { Stepper } from 'react-dynamic-stepper'
import Link from 'next/link'
import DefaultLayout from '@/components/layout/default-layout'
import { MyButton } from '@/components/btn/mybutton'
import FormTag from '@/components/common/tag-form'
import { useFillOut } from '@/context/fill-out-context'
import CustomFillOut from '@/components/custom/cart/CustomFillOut'
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store'
import useCouponValidator from '@/hooks/use-coupon'
import Head from 'next/head'

// TODO:
// 縣市區郵遞區號資料引入
import taiwanDistricts from '../../data/taiwan_districts'

export default function FillOut() {
  const [activePage, setActivePage] = useState('cart')
  const { fillOutDetails, setFillOutDetails } = useFillOut()

  const [payments, setPayments] = useState([])
  const [shippings, setShippings] = useState([])
  const [invoices, setInvoices] = useState([])
  const [selectedValue, setSelectedValue] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientNumber, setRecipientNumber] = useState('')
  const [deliveryOption, setDeliveryOption] = useState('')
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
  const [date, setDate] = useState(now('Asia/Taipei'))
  // TODO:
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedTownship, setSelectedTownship] = useState('')
  const [selectedPostalCode, setSelectedPostalCode] = useState('')
  const [addressDetail, setAddressDetail] = useState('')

  // 優惠券驗證
  const [couponCode, setCouponCode] = useState('')
  const { validateCoupon, discount, error, isSubmitted } =
    useCouponValidator(couponCode)

  // 驗證
  const [errors, setErrors] = useState({})

  const times = ['不指定時間']
  for (let hour = 9; hour <= 21; hour++) {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`
    times.push(formattedHour)
  }

  // TODO:
  // 從 taiwanDistricts 抓城市的 value 和 label
  const cities = taiwanDistricts.map((city) => ({
    value: city.name,
    label: city.name,
  }))
  const [townships, setTownships] = useState([])
  const [postalCodes, setPostalCodes] = useState([])

  // TODO:
  // 更新完整地址
  function updateDeliveryAddress() {
    setDeliveryAddress(
      `${selectedCity} ${selectedTownship} ${selectedPostalCode} ${addressDetail}`
    )
  }

  // 當選擇的城市發生變化時
  const handleCityChange = (value) => {
    setSelectedCity(value)
    updateDeliveryAddress()

    const cityData = taiwanDistricts.find((city) => city.name === value)
    if (cityData) {
      const newTownships = cityData.districts.map((district) => ({
        value: district.name,
        label: district.name,
      }))
      setTownships(newTownships)
      setPostalCodes([])
      setSelectedTownship(null)
      setSelectedPostalCode('')
    } else {
      setTownships([])
      setPostalCodes([])
      setSelectedTownship(null)
      setSelectedPostalCode('')
    }
    console.log(selectedCity)
    console.log(selectedTownship)
    console.log(townships)
  }

  // 使用useEffect來檢查狀態更新
  useEffect(() => {
    console.log('Selected city updated to: ', selectedCity)
    console.log('Selected township updated to: ', selectedTownship)
  }, [selectedCity])

  const handleTownshipChange = (value) => {
    setSelectedTownship(value)
    updateDeliveryAddress()

    // Need to find the city first to get the correct district
    const cityData = taiwanDistricts.find((city) => city.name === selectedCity)
    const townshipData = cityData?.districts.find(
      (district) => district.name === value
    )
    console.log(townshipData)
    if (townshipData) {
      setSelectedPostalCode(townshipData.zip)
    } else {
      setSelectedPostalCode('')
    }
  }
  const handlePostalCodeChange = (value) => {
    setSelectedPostalCode(value)
    updateDeliveryAddress()
  }
  const handleAddressDetailChange = (value) => {
    setAddressDetail(value)
  }

  const handleBlur = () => {
    updateDeliveryAddress() // 更新配送地址
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
        // 這裡可以處理默認情況或當未匹配到任何鍵時的情況
        console.log(`Unknown field: ${name}`)
    }

    if (
      value.trim() !== '' ||
      name === 'deliveryOption' ||
      name === 'paymentMethod' ||
      name === 'invoiceOption'
    ) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[name] // 移除這個字段的錯誤消息
        return newErrors
      })
    }
  }

  // 提交填寫項目，存進fill-out-context
  const handleSubmit = async (event) => {
    event.preventDefault()

    let newErrors = {} // 根據不同的業務需求（商城/花店/課程）來收集表單中的錯誤

    // 驗證用，分source不然會無法送出
    switch (source) {
      case 'shop':
        newErrors = {
          ...(senderName.trim() === '' && { senderName: '請填寫姓名' }),
          ...(senderNumber.trim() === '' && {
            senderNumber: '請填寫手機號碼',
          }),
          ...(senderEmail.trim() === '' && {
            senderEmail: '請填寫信箱',
          }),
          ...(recipientName.trim() === '' && {
            recipientName: '請填寫姓名',
          }),
          ...(recipientNumber.trim() === '' && {
            recipientNumber: '請填寫手機號碼',
          }),
          ...(!selectedDeliveryOption && { shipping: '請選擇配送方式' }),
          ...(!paymentMethod && { paymentMethod: '請選擇付款方式' }),
          ...(!selectedInvoiceOption && { invoiceOption: '請選擇發票種類' }),
        }
        break
      case 'flower':
        newErrors = {
          ...(senderName.trim() === '' && { senderName: '請填寫姓名' }),
          ...(senderNumber.trim() === '' && {
            senderNumber: '請填寫手機號碼',
          }),
          ...(senderEmail.trim() === '' && {
            senderEmail: '請填寫信箱',
          }),
          ...(recipientName.trim() === '' && {
            recipientName: '請填寫姓名',
          }),
          ...(recipientNumber.trim() === '' && {
            recipientNumber: '請填寫手機號碼',
          }),
          ...(!selectedDeliveryOption && { shipping: '請選擇配送方式' }),
          ...(!paymentMethod && { paymentMethod: '請選擇付款方式' }),
          ...(!selectedInvoiceOption && { invoiceOption: '請選擇發票種類' }),
        }
        break
      case 'course':
        newErrors = {
          ...(!paymentMethod && { paymentMethod: '請選擇付款方式' }),
          ...(!selectedInvoiceOption && { invoiceOption: '請選擇發票種類' }),
        }
        break
      default:
        break
    }

    // 如果有錯誤存在
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return // 中止提交過程
    }

    // 如果沒有錯誤，創建一個新的表單詳情物件 newFormDetails
    const newFormDetails = {
      senderName,
      senderNumber,
      senderEmail,
      recipientName,
      recipientNumber,
      deliveryDate,
      deliveryTime,
      deliveryOption: selectedDeliveryOption.name,
      deliveryShipping,
      deliveryAddress,
      couponCode,
      discount,
      paymentMethod,
      invoiceOption: selectedInvoiceOption.name,
      mobileBarcode,
    }
    console.log(newFormDetails) // 檢查物件
    await setFillOutDetails(newFormDetails) // 更新 newFormDetails 的這些資訊到 context 中
    route.push(`/cart/checkout?source=${source}`) // 導航到 checkout 頁
  }

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

  useEffect(() => {
    fetchInvoices()
    fetchShippings()
    fetchPayments()
  }, [])

  // 點選相對應的運送方式會顯示的東西
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('')
  const handleSelectDeliveryChange = (event) => {
    const shipping = shippings.find(
      (sh) => sh.id === Number(event.target.value)
    )
    if (shipping) {
      setDeliveryShipping(shipping.cost)
      setSelectedDeliveryOption(shipping) // 直接儲存整個shipping對象
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors.shipping
        return newErrors
      })
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
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors.invoiceOption
      return newErrors
    })
  }

  // 付款方式
  const handleRadioChange = (value) => {
    setPaymentMethod(value)
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors.paymentMethod
      return newErrors
    })
  }

  // 訂購人資料同會員資料
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked
    if (!isChecked) {
      setSenderName('')
      setSenderNumber('')
      setSenderEmail('')
    }

    setUseMemberInfo(!useMemberInfo)
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors.senderName
      delete newErrors.senderNumber
      delete newErrors.senderEmail
      return newErrors
    })
  }

  const handleRecipientChange = (event) => {
    const isChecked = event.target.checked
    setSyncData(isChecked)
    if (isChecked) {
      setRecipientName(senderName)
      setRecipientNumber(senderNumber)
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors.recipientName
        delete newErrors.recipientNumber
        delete newErrors.recipientEmail
        return newErrors
      })
    }
  }

  useEffect(() => {
    if (useMemberInfo && userData) {
      setSenderName(userData.name || '')
      setSenderNumber(userData.phone || '')
      setSenderEmail(userData.username || '')
    }
  }, [useMemberInfo, userData])

  // 7-ELEVEN
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    'http://localhost:3005/api/shipment/711',
    { autoCloseMins: 3 }
  )

  // stepper
  const steps = [
    {
      header: {
        label: '購物車',
      },
      isError: false,
      isWarning: false,
      isComplete: true,
    },
    {
      header: {
        label: '填寫資料',
      },
      onClickHandler: () => console.log('clicked on second step next button'),
      isLoading: false,
      isError: false,
      isComplete: false,
    },
    {
      header: {
        label: '訂單確認',
      },
      isError: false,
      isComplete: false,
    },
  ]
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
      <Head>
        <title>填寫資料</title>
      </Head>
      <DefaultLayout activePage={activePage}>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white mt-[64px]">
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
                    <div>
                      <Input
                        type="text"
                        label="姓名"
                        placeholder="請輸入姓名"
                        labelPlacement="outside"
                        isRequired
                        classNames={{
                          ...inputStyles,
                          error: errors.senderName,
                        }}
                        name="senderName"
                        value={senderName}
                        onChange={handleInputChange}
                      />
                      {errors.senderName && (
                        <p className="text-danger text">{errors.senderName}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="手機號碼"
                        placeholder="09xxxxxxxx"
                        labelPlacement="outside"
                        isRequired
                        classNames={{
                          ...inputStyles,
                          error: errors.senderNumber,
                        }}
                        name="senderNumber"
                        value={senderNumber}
                        onChange={handleInputChange}
                      />
                      {errors.senderNumber && (
                        <p className="text-danger">{errors.senderNumber}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="電子信箱"
                        placeholder="123@example.com"
                        labelPlacement="outside"
                        isRequired
                        classNames={{
                          ...inputStyles,
                          error: errors.senderEmail,
                        }}
                        name="senderEmail"
                        value={senderEmail}
                        onChange={handleInputChange}
                      />
                      {errors.senderEmail && (
                        <p className="text-danger">{errors.senderEmail}</p>
                      )}
                    </div>
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
                  // --------------------------
                  cities={cities}
                  townships={townships}
                  postalCodes={postalCodes}
                  handleCityChange={handleCityChange}
                  handleTownshipChange={handleTownshipChange}
                  handlePostalCodeChange={handlePostalCodeChange}
                  selectedCity={selectedCity}
                  selectedTownship={selectedTownship}
                  selectedPostalCode={selectedPostalCode}
                  setTownships={setTownships}
                  setSelectedPostalCode={setSelectedPostalCode}
                  addressDetail={addressDetail}
                  setAddressDetail={setAddressDetail}
                  handleAddressDetailChange={handleAddressDetailChange}
                  // --------------------------
                  date={date}
                  handleDateChange={handleDateChange}
                  inputStyles={inputStyles}
                  selectStyles={selectStyles}
                  handleInputChange={handleInputChange}
                  handleRecipientChange={handleRecipientChange}
                  shippings={shippings}
                  handleBlur={handleBlur}
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
                <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                  <div className="flex text-black border-b-2 border-primary-300">
                    <FormTag text="運送資訊" />
                  </div>
                  <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                    <div>
                      <Input
                        type="text"
                        label="收件人姓名"
                        placeholder="請輸入姓名"
                        labelPlacement="outside"
                        isRequired
                        classNames={{
                          ...inputStyles,
                          error: errors.recipientName,
                        }}
                        name="recipientName"
                        value={recipientName}
                        onChange={handleInputChange}
                      />
                      {errors.recipientName && (
                        <p className="text-danger">{errors.recipientName}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="收件人手機號碼"
                        placeholder="09xxxxxxxx"
                        labelPlacement="outside"
                        isRequired
                        classNames={{
                          ...inputStyles,
                          error: errors.recipientNumber,
                        }}
                        name="recipientNumber"
                        value={recipientNumber}
                        onChange={handleInputChange}
                      />
                      {errors.recipientNumber && (
                        <p className="text-danger">{errors.recipientNumber}</p>
                      )}
                    </div>
                    <Checkbox
                      checked={syncData}
                      onChange={handleRecipientChange}
                    >
                      <span className="text-base">同訂購人資料</span>
                    </Checkbox>
                    <div>
                      <Select
                        label="配送方式"
                        placeholder="請選擇配送方式"
                        labelPlacement="outside"
                        disableSelectorIconRotation
                        isRequired
                        classNames={{
                          ...selectStyles,
                          error: errors.selectedDeliveryOption,
                        }}
                        onChange={handleSelectDeliveryChange}
                      >
                        {shippings.map((shipping) => (
                          <SelectItem key={shipping.id} value={shipping.id}>
                            {shipping.name}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors.shipping && (
                        <p className="error-message text-danger">
                          {errors.shipping}
                        </p>
                      )}
                    </div>
                    {selectedDeliveryOption &&
                      selectedDeliveryOption.id === 3 && (
                        <div className="w-full flex flex-col gap-1">
                          <label
                            htmlFor="pickup"
                            className="block mb-1 text-base"
                          >
                            取貨門市
                          </label>
                          <MyButton
                            color="primary"
                            size="xl"
                            id="pickup"
                            type="button"
                            className="w-full"
                            isOutline
                            onClick={() => {
                              openWindow()
                            }}
                          >
                            7-ELEVEN
                          </MyButton>
                          門市名稱:{' '}
                          <input
                            type="text"
                            value={store711.storename}
                            disabled
                          />
                          <br />
                          門市地址:{' '}
                          <input
                            type="text"
                            value={store711.storeaddress}
                            disabled
                          />
                        </div>
                      )}
                    {/* address */}
                    {/* TODO: */}
                    {selectedDeliveryOption &&
                      selectedDeliveryOption.id === 1 && (
                        <div className="flex flex-col gap-3">
                          <div className="space-y-3 md:space-y-0 sm:flex sm:gap-3 items-end">
                            {/* 城市選單 */}
                            <Select
                              label="配送地址"
                              placeholder="請選擇城市"
                              labelPlacement="outside"
                              aria-label="配送地址"
                              disableSelectorIconRotation
                              isRequired
                              classNames={{ ...selectStyles }}
                              onChange={(e) => handleCityChange(e.target.value)}
                            >
                              {cities.map((city) => (
                                <SelectItem
                                  key={city.value}
                                  value={city.value}
                                  classNames={{
                                    base: 'text-base',
                                  }}
                                >
                                  {city.label}
                                </SelectItem>
                              ))}
                            </Select>
                            {/* 區選單 */}
                            <Select
                              value={selectedTownship || ''}
                              onChange={(e) =>
                                handleTownshipChange(e.target.value)
                              }
                              placeholder="請選擇區"
                              aria-label="區"
                              labelPlacement="outside"
                              disableSelectorIconRotation
                              isRequired
                              classNames={{ ...selectStyles }}
                            >
                              {townships.length > 0 ? (
                                townships.map((township) => (
                                  <SelectItem
                                    key={township.value}
                                    value={township.value}
                                  >
                                    {township.label}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="" disabled>
                                  {'請先選擇城市'}
                                </SelectItem>
                              )}
                            </Select>
                            {/* 郵遞區號 */}
                            <input
                              label="郵遞區號"
                              aria-label="郵遞區號"
                              type="text"
                              value={selectedPostalCode || '郵遞區號'}
                              readOnly
                              disabled
                              className={`bg-default-100 px-3 rounded-xl h-[40px] focus:ring-0 w-full ${
                                selectedPostalCode
                                  ? 'text-tertiary-black'
                                  : 'text-tertiary-gray-100'
                              }`}
                            />
                          </div>
                          <Input
                            type="text"
                            labelPlacement="inside"
                            aria-label="詳細地址"
                            placeholder="請填寫地址"
                            isRequired
                            classNames={{ ...inputStyles }}
                            onValueChange={handleAddressDetailChange}
                            onBlur={handleBlur}
                            value={addressDetail}
                          />
                        </div>
                      )}
                  </div>
                </div>
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
                    {isSubmitted && (
                      <div>
                        {error ? (
                          <span className="text-danger">{error}</span>
                        ) : (
                          <span className="text-primary">
                            折扣NT${discount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <MyButton
                    color="primary"
                    size="xl"
                    isOutline
                    onClick={validateCoupon}
                  >
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
                  {errors.paymentMethod && (
                    <p className="error-message text-danger">
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>
              </div>
              {/* payment end*/}

              {/* invoice start */}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
                <div className="flex text-black border-b-2 border-primary-300">
                  <FormTag text="發票種類" />
                </div>
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                  <div>
                    <Select
                      label="發票種類"
                      aria-label="請選擇發票種類"
                      placeholder="請選擇發票種類"
                      labelPlacement="outside"
                      disableSelectorIconRotation
                      isRequired
                      classNames={{ ...selectStyles }}
                      name="invoiceOption"
                      onChange={(e) =>
                        handleSelectInvoiceChange(e.target.value)
                      }
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
                    </Select>{' '}
                    {errors.invoiceOption && (
                      <p className="error-message text-danger">
                        {errors.invoiceOption}
                      </p>
                    )}
                  </div>
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
                  <Link href={`/cart?source=${source}`}>上一步</Link>
                </MyButton>
                <MyButton color="primary" size="xl" onClick={handleSubmit}>
                  下一步
                </MyButton>
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}

import { React, useState, Fragment } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { RadioGroup, Radio } from '@nextui-org/react'
import { FaCcMastercard } from 'react-icons/fa6'
import { FaCcVisa } from 'react-icons/fa6'
import { FaCcApplePay } from 'react-icons/fa6'
import { MyButton } from '@/components/btn/mybutton'
import { Stepper } from 'react-dynamic-stepper'

export default function FillOut() {
  // input 樣式
  const inputStyles = {
    label: 'text-base',
    input: ['text-base', 'rounded-lg'],
  }

  const shippingMethods = [
    {
      value: '宅配',
      label: '宅配',
    },
    {
      value: '7-ELEVEN',
      label: '7-ELEVEN',
    },
  ]
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
  const paymentMethods = [
    {
      value: '信用卡',
      icon: (
        <Fragment>
          <FaCcVisa className="h-6 w-6 text-tertiary-black" />
          <FaCcMastercard className="h-6 w-6 text-primary-100 text-tertiary-black" />
        </Fragment>
      ),
    },
    {
      value: 'Line Pay',
      icon: '',
    },
    {
      value: '綠界',
      icon: '',
    },
    {
      value: 'Apple Pay',
      icon: (
        <Fragment>
          <FaCcApplePay className="h-6 w-6 text-tertiary-black" />
        </Fragment>
      ),
    },
    {
      value: '藍星',
      icon: '',
    },
    {
      value: '現金',
      icon: '',
    },
    {
      value: '貨到付款',
      icon: '',
    },
  ]
  const [selectedValue, setSelectedValue] = useState('')

  const handleRadioChange = (value) => {
    setSelectedValue(value)
  }
  const invoiceTypes = [
    {
      value: '載具',
      label: '載具',
    },
    {
      value: '捐慈善機構',
      label: '捐慈善機構',
    },
  ]

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

  const [activePage, setActivePage] = useState('shop')

  return (
    <>
      <DefaultLayout activePage={activePage}>
        {/* 置中 & 背景色 */}
        <main className="flex flex-col justify-center items-center bg-white">
          {/* 主要容器 */}
          <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 md:px-0 mb-10">
            {/* 主要內容 */}
            <div className="flex flex-col w-full md:w-6/12 lg:w-4/12 gap-14">
              {/* steps */}
              <div className="mt-6">
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

              {/*  buyer start */}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-4">
                <div className="flex text-black border-b-2 border-primary-300">
                  <span className="bg-primary-300 p-4 rounded-t-xl text-base">
                    訂購人資訊
                  </span>
                </div>
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
              </div>
              {/*  buyer end */}

              {/* shipping start */}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-4">
                <div className="flex text-black border-b-2 border-primary-300">
                  <span className="bg-primary-300 p-4 rounded-t-xl text-base">
                    運送資訊
                  </span>
                </div>
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                  <Select
                    label="配送方式"
                    placeholder="請選擇配送方式"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    isRequired
                    classNames={{ ...inputStyles }}
                  >
                    {shippingMethods.map((shippingMethod) => (
                      <SelectItem
                        key={shippingMethod.value}
                        value={shippingMethod.value}
                      >
                        {shippingMethod.label}
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
                    <label htmlFor="pickup" className="block mb-1 text-sm">
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
                    <div className="flex gap-3">
                      <Select
                        label="配送地址"
                        placeholder="請選擇城市"
                        labelPlacement="outside"
                        disableSelectorIconRotation
                        isRequired
                        classNames={{ ...inputStyles }}
                      >
                        {shippingMethods.map((shippingMethod) => (
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
                        placeholder="請選擇鄉鎮"
                        labelPlacement="outside"
                        disableSelectorIconRotation
                        isRequired
                        classNames={{ ...inputStyles }}
                      >
                        {shippingMethods.map((shippingMethod) => (
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
                        classNames={{ ...inputStyles }}
                      >
                        {shippingMethods.map((shippingMethod) => (
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
              <div className="w-full justify-center max-w-3xl flex flex-col gap-4">
                <div className="flex text-black border-b-2 border-primary-300">
                  <span className="bg-primary-300 p-4 rounded-t-xl text-base">
                    優惠券
                  </span>
                </div>
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
              <div className="w-full justify-center max-w-3xl flex flex-col gap-4">
                <div className="flex text-black border-b-2 border-primary-300">
                  <span className="bg-primary-300 p-4 rounded-t-xl text-base">
                    付款方式
                  </span>
                </div>
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-white border-1 rounded-lg">
                  <RadioGroup>
                    {paymentMethods.map((paymentMethod, index) => (
                      <label
                        key={index}
                        htmlFor={paymentMethod.value}
                        className={`border-solid border-1 rounded-xl p-4 mb-2 cursor-pointer ${
                          selectedValue === paymentMethod.value
                            ? 'border-tertiary-gray-100'
                            : 'border-tertiary-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <Radio
                              id={paymentMethod.value}
                              value={paymentMethod.value}
                              onChange={() =>
                                handleRadioChange(paymentMethod.value)
                              }
                              checked={selectedValue === paymentMethod.value}
                              color="primary-100"
                              classNames={{ ...inputStyles }}
                            >
                              {paymentMethod.value}
                            </Radio>
                          </div>
                          <div className="flex gap-1">{paymentMethod.icon}</div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              {/* payment end*/}

              {/* invoice start */}
              <div className="w-full justify-center max-w-3xl flex flex-col gap-4">
                <div className="flex text-black border-b-2 border-primary-300">
                  <span className="bg-primary-300 p-4 rounded-t-xl text-base">
                    發票種類
                  </span>
                </div>
                <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
                  <Select
                    label="發票種類"
                    placeholder="請選擇發票種類"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    isRequired
                    classNames={{ ...inputStyles }}
                  >
                    {invoiceTypes.map((invoiceType) => (
                      <SelectItem
                        key={invoiceType.value}
                        value={invoiceType.value}
                        classNames={{ ...inputStyles }}
                      >
                        {invoiceType.label}
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
              <div className="w-full flex justify-center gap-4">
                <MyButton
                  color="primary"
                  size="xl"
                  isOutline
                  className="w-full"
                >
                  上一步
                </MyButton>
                <MyButton color="primary" size="xl" className="w-full">
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

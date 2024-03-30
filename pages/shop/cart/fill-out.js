import { React, useState, Fragment } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { RadioGroup, Radio } from '@nextui-org/react'
import { LiaCcVisa } from 'react-icons/lia'
import { FaCcMastercard } from 'react-icons/fa6'
import { MyButton } from '@/components/btn/mybutton'

export default function FillOut() {
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
          <LiaCcVisa />
          <FaCcMastercard />
        </Fragment>
      ),
    },
    {
      value: 'Line-Pay',
      icon: '',
    },
    {
      value: '綠界',
      icon: '',
    },
    {
      value: 'Apple-Pay',
      icon: '',
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

  const [activePage, setActivePage] = useState('shop')
  return (
    <>
      <DefaultLayout activePage={activePage}>
        <div className="mx-auto md:px-52 sm:24 space-y-10">
          {/* steps */}
          <div>{/* https://github.com/saini-g/react-step-progress */}</div>
          {/* form content - buyer start */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl flex flex-col space-y-4">
              <div className="flex">
                <div className="inline-block p-4 text-black rounded-t-lg bg-primary-300">
                  訂購人資訊
                </div>
              </div>

              <div className="space-y-4 border border-[#E4E4E4] rounded-md px-10 py-8 space-y-10 bg-white">
                <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 space-y-10">
                  <div>
                    <Input
                      type="text"
                      label="姓名"
                      placeholder="請輸入姓名"
                      labelPlacement="outside"
                      isRequired
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="手機號碼"
                      placeholder="09xxxxxxxx"
                      labelPlacement="outside"
                      isRequired
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="電子信箱"
                      placeholder="123@example.com"
                      labelPlacement="outside"
                      isRequired
                    />
                  </div>

                  <div>
                    <Checkbox defaultSelected>同會員資料</Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* form content - buyer end */}
          {/* form content - shipping start */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl flex flex-col space-y-4">
              <div className="flex">
                <div className="inline-block p-4 text-black rounded-t-lg bg-primary-300">
                  運送資訊
                </div>
              </div>
              <div className="space-y-4 border border-[#E4E4E4] rounded-md px-10 py-8 space-y-10 bg-white">
                <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 space-y-10">
                  <div>
                    <Select
                      label="配送方式"
                      placeholder="請選擇配送方式"
                      labelPlacement="outside"
                      disableSelectorIconRotation
                      isRequired
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
                  <div>
                    <Input
                      type="text"
                      label="收件人姓名"
                      placeholder="請輸入姓名"
                      labelPlacement="outside"
                      isRequired
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="收件人手機號碼"
                      placeholder="09xxxxxxxx"
                      labelPlacement="outside"
                      isRequired
                    />
                  </div>
                  <div>
                    <label htmlFor="pickup" className="block mb-1">
                      取貨門市
                    </label>
                    <div className="my-4 flex justify-center">
                      <MyButton
                        color="primary"
                        size="xl"
                        id="pickup"
                        type="button"
                      >
                        7-ELEVEN
                      </MyButton>
                    </div>
                  </div>
                  {/* address */}
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Select
                        label="配送地址"
                        placeholder="請選擇城市"
                        labelPlacement="outside"
                        disableSelectorIconRotation
                        isRequired
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
                    />
                  </div>
                  <div>
                    <Checkbox defaultSelected>同訂購人資料</Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* form content - shipping end */}
          {/* coupon start*/}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl flex flex-col space-y-4">
              <div className="flex">
                <div className="inline-block p-4 text-black rounded-t-lg bg-primary-300">
                  優惠券
                </div>
              </div>

              <div className="space-y-4 border border-[#E4E4E4] rounded-md px-10 py-8 space-y-10 bg-white">
                <div className="flex w-full items-center gap-2">
                  <div className="w-full">
                    <Input
                      type="text"
                      label="折扣碼"
                      labelPlacement="outside"
                      placeholder="輸入優惠碼"
                      className="w-full"
                    />
                    <span className="text-primary">
                      套用優惠券，滿NT$100，折NT$50
                    </span>
                  </div>

                  <MyButton color="primary" size="xl" isOutline>
                    套用
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
          {/* coupon end*/}
          {/* payment start*/}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl flex flex-col space-y-4">
              <div className="flex">
                <div className="inline-block p-4 text-black rounded-t-lg bg-primary-300">
                  付款方式
                </div>
              </div>
              <div className="space-y-4 border border-[#E4E4E4] rounded-md px-10 py-8 space-y-10 bg-white">
                <div className="flex w-full items-center gap-2">
                  <div className="w-full">
                    <RadioGroup>
                      {paymentMethods.map((paymentMethod, index) => (
                        <label
                          key={index}
                          htmlFor={paymentMethod.value}
                          className={`border-solid border-2 rounded-lg p-4 mb-4 cursor-pointer ${
                            selectedValue === paymentMethod.value
                              ? 'border-primary'
                              : 'border-gray'
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
                              >
                                {paymentMethod.value}
                              </Radio>
                            </div>
                            <div className="flex gap-1"> {paymentMethod.icon}</div>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* payment end*/}
          {/* invoice start */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl flex flex-col space-y-4">
              <div className="flex">
                <div className="inline-block p-4 text-black rounded-t-lg bg-primary-300">
                  發票種類
                </div>
              </div>

              <div className="space-y-4 border border-[#E4E4E4] rounded-md px-10 py-8 space-y-10 bg-white">
                <div className="w-full items-center gap-2 space-y-10">
                  <Select
                    label="發票種類"
                    placeholder="請選擇發票種類"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    isRequired
                  >
                    {invoiceTypes.map((invoiceType) => (
                      <SelectItem
                        key={invoiceType.value}
                        value={invoiceType.value}
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
                  />
                </div>
              </div>
            </div>
          </div>
          {/* invoice end */}

          <div className="flex justify-center space-x-10 py-10">
            <MyButton color="primary" size="xl" isOutline>
              上一步
            </MyButton>
            <MyButton color="primary" size="xl">
              下一步
            </MyButton>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

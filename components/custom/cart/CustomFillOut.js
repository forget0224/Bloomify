import { React, useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Input, Popover, DatePicker, TimeInput } from '@nextui-org/react'
import { Time, parseAbsoluteToLocal, now } from '@internationalized/date'
import { CiClock2 } from 'react-icons/ci'
import { I18nProvider } from '@react-aria/i18n'
import { Checkbox } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import CustomGoogleMap from '@/components/custom/cart/CustomGoogleMap'
import { MyButton } from '@/components/btn/mybutton'
import FormTag from '@/components/common/tag-form'
export default function CustomFillOut({
  recipientName,
  recipientNumber,
  syncData,
  selectedDeliveryOption,
  handleSelectDeliveryChange,
  cities,
  townships,
  postalCodes,
  handleCityChange,
  handleTownshipChange,
  handlePostalCodeChange,
  addressDetail,
  setAddressDetail,
  handleAddressDetailChange,
  date,
  handleDateChange,
  inputStyles,
  selectStyles,
  handleInputChange,
  handleRecipientChange,
  shippings,
  deliveryTime,
  times,
  handleTimeChange,
  deliveryAddress,
  setDeliveryShipping,
}) {
  return (
    <>
      {' '}
      <div className="w-full justify-center max-w-3xl flex flex-col gap-3">
        <div className="flex text-black border-b-2 border-primary-300">
          <FormTag text="運送資訊" />
        </div>
        <div className="flex flex-col w-full p-8 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10 bg-white border-1 rounded-lg">
          <Input
            type="text"
            label="收件人姓名"
            placeholder="請輸入姓名"
            labelPlacement="outside"
            isRequired
            classNames={{ ...inputStyles }}
            name="recipientName"
            value={recipientName}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="收件人手機號碼"
            placeholder="09xxxxxxxx"
            labelPlacement="outside"
            isRequired
            classNames={{ ...inputStyles }}
            name="recipientNumber"
            value={recipientNumber}
            onChange={handleInputChange}
          />
          <Checkbox checked={syncData} onChange={handleRecipientChange}>
            <span className="text-base">同訂購人資料</span>
          </Checkbox>
          <Select
            label="配送方式"
            placeholder="請選擇配送方式"
            labelPlacement="outside"
            disableSelectorIconRotation
            isRequired
            classNames={{ ...selectStyles }}
            onChange={handleSelectDeliveryChange}
          >
            {shippings.map((shipping) => (
              <SelectItem key={shipping.id} value={shipping.id}>
                {shipping.name}
              </SelectItem>
            ))}
          </Select>
          {selectedDeliveryOption && selectedDeliveryOption.id === 3 && (
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
          )}
          {/* address */}{' '}
          {selectedDeliveryOption && selectedDeliveryOption.id === 1 && (
            <>
              <div className="flex flex-col gap-3 w-full">
                <div className="space-y-3 sm:flex sm:gap-3 ">
                  <Select
                    label="配送地址"
                    placeholder="請選擇城市"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    isRequired
                    classNames={{ ...selectStyles }}
                    onChange={(e) => handleCityChange(e.target.value)}
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
                    onChange={(e) => handleTownshipChange(e.target.value)}
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
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
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
                  onChange={(e) => setAddressDetail(e.target.value)}
                  onBlur={handleAddressDetailChange}
                />
              </div>
              <div className="sm:w-[400px]   w-[269px] h-auto">
                <CustomGoogleMap
                  destination={`${deliveryAddress}`}
                  setDeliveryShipping={setDeliveryShipping}
                />
              </div>
            </>
          )}
          <div className="flex w-full  gap-4">
            <I18nProvider locale="zh-TW">
              <DatePicker
                showMonthAndYearPickers
                variant="bordered"
                className=""
                calendarProps={{
                  size: 'lg', // 設置為中等尺寸
                }}
                granularity="day"
                label="配送日期"
                value={date}
                onChange={handleDateChange}
              />
            </I18nProvider>
          </div>
          <div className="container">
            <Select
              size="sm"
              clearable
              label="配送時間"
              placeholder="選擇時間"
              value={deliveryTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              startContent={
                <CiClock2 className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            >
              {times.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  )
}

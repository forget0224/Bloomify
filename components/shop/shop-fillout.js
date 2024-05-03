import FormTag from '@/components/common/tag-form'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'

const ShopFillOut = ({
  senderName,
  senderNumber,
  inputStyles,
  recipientName,
  handleCheckboxChange,
  handleInputChange,
  recipientNumber,
  syncData,
  handleRecipientChange,
  selectStyles,
  handleSelectDeliveryChange,
  shippings,
  selectedDeliveryOption,
  handleCityChange,
  cities,
  handleTownshipChange,
  townships,
  handlePostalCodeChange,
  postalCodes,
  handleAddressDetailChange,
  senderEmail,
  useMemberInfo,
}) => {
  return (
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
        <Checkbox checked={useMemberInfo} onChange={handleCheckboxChange}>
          <span className="text-base">同會員資料</span>
        </Checkbox>
      </div>
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
          <div className="flex flex-col gap-3">
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
              onValueChange={handleAddressDetailChange}
              // onBlur={handleAddressDetailChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default ShopFillOut

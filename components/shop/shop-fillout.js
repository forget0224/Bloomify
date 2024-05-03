import FormTag from '@/components/common/tag-form'
import { Input } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'

const ShopFillOut = ({
  inputStyles,
  recipientName,
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
  errors,
}) => {
  return (
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
            classNames={{ ...inputStyles, error: errors.recipientName }}
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
            classNames={{ ...inputStyles, error: errors.recipientNumber }}
            name="recipientNumber"
            value={recipientNumber}
            onChange={handleInputChange}
          />
          {errors.recipientNumber && (
            <p className="text-danger">{errors.recipientNumber}</p>
          )}
        </div>
        <Checkbox checked={syncData} onChange={handleRecipientChange}>
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
            <p className="error-message text-danger">{errors.shipping}</p>
          )}
        </div>
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
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default ShopFillOut

import React, { useState } from 'react'
import {
  Checkbox,
  RadioGroup,
  Radio,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { SlMagnifier } from 'react-icons/sl'
import { IoFilterCircleOutline } from 'react-icons/io5'
import SearchBtn from '@/components/shop/search'
import { MyButton } from '@/components/btn/mybutton'

const ResearchRWD = ({
  handleSearch,
  colors,
  selectedColors,
  resetSelection,
  handleColorClick,
  order,
  setOrder,
}) => {
  const {
    isOpen: isMagnifierOpen,
    onOpen: onMagnifierOpen,
    onOpenChange: onMagnifierOpenChange,
  } = useDisclosure()
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure()
  const [modalPlacement, setModalPlacement] = useState('bottom-center')

  return (
    <div className="flex flex-row space-x-3 sm:hidden">
      <div className="flex gap-2 items-center text-xl hover:text-primary">
        <SlMagnifier
          onClick={onMagnifierOpen}
          style={{ cursor: 'pointer' }}
          className="text-xl"
        />
        <Modal
          isOpen={isMagnifierOpen}
          placement={modalPlacement}
          onOpenChange={onMagnifierOpenChange}
          className="mx-0 my-0 "
          style={{
            borderRadius: '6% 6% 0% 0%',
          }}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                關鍵字搜尋
              </ModalHeader>
              <ModalBody>
                <div className="sm:hidden block mb-20">
                  <SearchBtn onSearch={handleSearch} />
                </div>
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      </div>

      <div className="flex gap-2 items-center text-xl hover:text-primary">
        <IoFilterCircleOutline
          onClick={onFilterOpen}
          style={{ cursor: 'pointer' }}
          className="text-2xl"
        />
        <Modal
          isOpen={isFilterOpen}
          placement={modalPlacement}
          onOpenChange={onFilterOpenChange}
          className="mx-0 my-0"
          style={{ borderRadius: '5% 5% 0% 0%' }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  排序與篩選
                </ModalHeader>
                <ModalBody
                  style={{
                    maxHeight: 'calc(100vh - 200px)',
                    overflowY: 'auto',
                  }}
                >
                  <div>
                    <p className="text-primary text-center py-0.5 bg-primary-300">
                      排序
                    </p>
                    <div className="my-5">
                      <RadioGroup
                        aria-label="排序"
                        placeholder="排序"
                        value={order}
                        onChange={(e) => {
                          setOrder(e.target.value)
                          console.log('Selected value: ', e.target.value)
                        }}
                      >
                        <Radio key="priceAsc" value="priceAsc">
                          價格由低到高
                        </Radio>
                        <Radio key="priceDesc" value="priceDesc">
                          價格由高到低
                        </Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  <div>
                    <p className="text-primary text-center py-0.5 bg-primary-300">
                      篩選
                    </p>
                    <hr />
                    <div className="my-5">
                      <p className="text-tertiary-black my-2">顏色</p>
                      <div className="space-y-0.5 grid grid-cols-2">
                        {colors.map((color) => (
                          <Checkbox
                            key={color.color_id}
                            radius="sm"
                            className="mr-2"
                            isSelected={selectedColors.includes(color.color_id)}
                            onValueChange={(isChecked) =>
                              handleColorClick(color.color_id, isChecked)
                            }
                          >
                            <div className="flex items-center">
                              <p className="mr-2">{color.name}</p>
                              <div
                                className="h-4 w-4 rounded-full"
                                style={{ background: color.code }}
                              ></div>
                            </div>
                          </Checkbox>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="flex gap-2">
                  <MyButton
                    color="primary"
                    size="xl"
                    isOutline
                    className="flex-1"
                    onClick={resetSelection}
                  >
                    清除條件
                  </MyButton>
                  <MyButton
                    color="primary"
                    size="xl"
                    isOutline
                    className="flex-1"
                    onPress={onClose}
                  >
                    確認
                  </MyButton>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
export default ResearchRWD

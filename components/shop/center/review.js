import React, { useState } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { BsStar } from 'react-icons/bs'
import { MyButton } from '@/components/btn/mybutton'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from '@nextui-org/react'

export default function Review({ isOpen, onOpenChange }) {
  const { onOpen, onClose } = useDisclosure()
  // star rating start
  const [selectedStar, setSelectedStar] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleMouseOver = (index) => {
    setHoveredStar(index + 1)
  }

  const handleMouseLeave = () => {
    setHoveredStar(0)
  }

  const handleClick = (index) => {
    setSelectedStar(index + 1)
  }
  // star rating end

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        size="md"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: '',
          backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
          closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
        }}
      >
        <ModalContent className="pb-8">
          {(onClose) => (
            <>
              <ModalHeader className="px-8 pt-8 text-2xl">商品評價</ModalHeader>
              <ModalBody className="px-8 py-0">
                <p>商品名稱：玫瑰花</p>
                <p>訂單編號：C2024010901234567</p>
                <div>
                  <p>評分：</p>
                  <div className="flex items-center space-x-1.5">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`focus:outline-none cursor-pointer ${
                          selectedStar > index || hoveredStar > index
                            ? 'is-selected'
                            : ''
                        }`}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                      >
                        {selectedStar > index || hoveredStar > index ? (
                          <BsFillStarFill className="text-secondary-100" />
                        ) : (
                          <BsStar className="text-secondary-100" />
                        )}
                      </div>
                    ))}
                    <input
                      type="hidden"
                      id="user-selected-star"
                      value={selectedStar}
                    />
                    <p>
                      {selectedStar === 0
                        ? '未評分'
                        : `已評 ${selectedStar} 顆星`}
                    </p>
                  </div>
                </div>
                <div>
                  <p>評論：</p>
                  <Textarea
                    placeholder="請輸入您的評論..."
                    classNames={{
                      base: 'mt-2 mb-1 text-tertiary-black',
                      input: 'text-base',
                    }}
                  ></Textarea>
                  <div className="text-end text-sm">0/500</div>
                </div>
              </ModalBody>
              <ModalFooter className="pb-0 px-8">
                <MyButton
                  onPress={onClose}
                  color="primary"
                  size="xl"
                  className="flex-grow"
                >
                  提交評論
                </MyButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

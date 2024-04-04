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
  Button,
  useDisclosure,
  Textarea,
} from '@nextui-org/react'

export default function Review() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
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
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                商品評價
              </ModalHeader>
              <ModalBody>
                <p>商品名稱：玫瑰花</p>
                <p>訂單編號：C2024010901234567</p>
                <div>
                  <p>
                    評分<span className="text-danger">*</span>：
                  </p>
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
                  <p>
                    評論<span className="text-danger">*</span>：
                  </p>
                  <Textarea placeholder="請輸入您的評論..."></Textarea>
                  <div className="text-end">0/500</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <MyButton
                  onPress={onClose}
                  color="primary"
                  size="xl"
                  isOutline
                  className="flex-1"
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

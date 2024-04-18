import React, { useState } from 'react'
import introData from "../../data/introData.json";
import { MyButton } from '@/components/btn/mybutton'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'

export default function CardGroupClean() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [size, setSize] = React.useState('md')
  const sizes = ['2xl']
  const handleOpen = (size) => {
    setSize(size)
    onOpen()
  }

 
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                詳細介紹
              </ModalHeader>
              <ModalBody className="flex flex-row">
                <div className="max-w-60 mx-auto ">
                  <Image
                    isZoomed
                    removeWrapper
                    alt="FlowerCard"
                    src="/assets/intro/FlowerCard/FlowerCard(1).jpg"
                  />
                </div>
                <div className="flex flex-col m-12 justify-center">
                  <ul>
                    <li>
                      花朵如燃燒的火焰，傳達著堅定的意志，象徵著不屈不撓的精神。
                    </li>

                    <hr className="h-px my-8 border-1 border-secondary-100" />
                    <div className="list-disc">
                      {/* <li>花期:<span className='bg-secondary'>春</span></li>
                      <li>常見顏色:<span className='bg-secondary'>粉色</span></li>
                      <li>適合:<span className='bg-secondary'>親人、新婚夫婦、生日慶祝、新婚喜慶</span></li> */}
                      <li>花期:春</li>
                      <li>常見顏色:粉色</li>
                      <li>適合:親人、新婚夫婦、生日慶祝、新婚喜慶</li>
                    </div>
                  </ul>
                  <div className="justify-center flex m-3">
                    <MyButton color="secondary" size="md">
                      販售店家
                    </MyButton>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {introData.map((item, index) => (
        <Card
        
          key={size}
          onPress={() => handleOpen(size)}
          shadow="none"
          // key={index}
          isPressable
          // onPress={() => console.log('item pressed')}
          className="bg-transparent"
        >
          <CardBody className="static overflow-visible p-0 bg-transparent">
            <div className="bg-transparent">
              <Image
              isZoomed
              removeWrapper
                shadow="none"
                radius="none"
                width="130%"
                alt={item.name}
                className="w-auto object-cover h-auto opacity-100"
                src={item.flower_image_1}
              />
            </div>
          </CardBody>
          <CardHeader className="block text-center bg-transparent">
            <div>
              <p class="text-xl truncate ...">{item.name}</p>
            </div>
            <div>
              <p class="text-base truncate ...">{item.engname}</p>
            </div>
          </CardHeader>
          <CardFooter className="text-small justify-between"></CardFooter>
        </Card>
      ))}
    </div>
  )
}

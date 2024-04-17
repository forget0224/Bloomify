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
  // 修改 handleOpen 函數，使其接收卡片的相關資料
  const handleOpen = (item) => {
    setSize(size)
    onOpen()
    // 將卡片的相關資料傳遞給模態視窗
    setModalData(item);
  }
// useState hook 用於存儲模態視窗中顯示的資料
const [modalData, setModalData] = useState(null);
 
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
    
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
                    alt="flowerCard"
                    src={modalData ? modalData.flower_image_2 : ''}
                  />
                </div>
                <div className="flex flex-col m-12 justify-center">
                  <ul>
                    <li>
                    {modalData ? modalData.intro : ''}
                    </li>

                    <hr className="h-px my-8 border-1 border-secondary-100" />
                    <div className="list-disc">
                      
                      <li>花期:{modalData ? modalData.season : ''}</li>
                      <li>常見顏色:{modalData ? modalData.color : ''}</li>
                      <li>適合對象:{modalData ? modalData.role : ''}</li>
                      <li>適合場合:{modalData ? modalData.occ : ''}</li>
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
        
          key={index}
          onPress={() => handleOpen(item)} // 將卡片的相關資料傳遞給 handleOpen 函數
          shadow="none"
          isPressable
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

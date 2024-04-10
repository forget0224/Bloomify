import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from '@nextui-org/react'

//import { BsFillStarFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'

export default function CardGroup() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 狀態來控制 Modal 的開啟與關閉
  const openModal = () => {
    setIsModalOpen(true); // 打開 Modal
  };
  const closeModal = () => {
    setIsModalOpen(false); // 關閉 Modal
  };
  const list = [
    {
      title: '孤挺花',
      content: 'Amaryllis',
      img: '/assets/intro/01_孤挺花Amaryllis.png',
    },
    {
      title: '銀蓮花',
      content: 'Anemone',
      img: '/assets/intro/02_銀蓮花Anemone.png',
    },
    {
      title: '蘋果花',
      content: 'Apple Blossoms',
      img: '/assets/intro/03_蘋果花Apple_Blossoms.png',
    },
    {
      title: '紫菀',
      content: 'Asters',
      img: '/assets/intro/04_紫菀Asters.png',
    },
  ]

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>孤挺花</ModalHeader>
          <p>創意是用不盡的。你用越多，就有越多。</p>
          <ModalFooter>
            <Button color="primary" onClick={closeModal}>關閉</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {list.map((item, index) => (
        <Card onClick={openModal}
          shadow="none"
          key={index}
          isPressable
          onPress={() => console.log('item pressed')}
          className="bg-transparent"
        >
          <CardBody className="static overflow-visible p-0 bg-transparent">
            <div className="bg-transparent">
              <Image
                shadow="none"
                radius="none"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-auto opacity-100"
                src={item.img}
              />
            </div>
          </CardBody>
          <CardHeader className="block text-center bg-transparent">
            <div>
              <p class="text-xl truncate ...">{item.title}</p>
            </div>
            <div>
              <p class="text-base truncate ...">{item.content}</p>
            </div>
          </CardHeader>
          <CardFooter className="text-small justify-between">
            <p className="text-base flex">
              {/* <BsFillStarFill className="text-secondary-100" /> */}
              {item.star}
            </p>
            <p className="text-base">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

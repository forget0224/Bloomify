import React, { useState } from 'react'
import { MyButton } from '@/components/btn/mybutton'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'

export default function CourseLogin({ isOpen, onOpenChange, toLogin }) {
  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onClose={() => onOpenChange(false)}
      classNames={{
        base: '',
        backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
        closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
      }}
    >
      <ModalContent className="pb-8">
        {(onClose) => (
          <>
            <ModalHeader className="px-8 pt-8 text-2xl">請先登入</ModalHeader>
            <ModalBody className="px-8 py-0">
              <p>如需使用購物車功能，請先登入</p>
            </ModalBody>
            <ModalFooter className="pb-0 px-8">
              <MyButton
                onPress={toLogin}
                color="primary"
                size="xl"
                className="flex-grow"
              >
                登入
              </MyButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

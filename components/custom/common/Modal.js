import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'

import StoreSelector from './SelectCity'
export default function ShareModal({ isModalOpen, onConfirm, onClose }) {
  return (
    <>
      <Modal
        size="md"
        placement={'center'}
        isOpen={isModalOpen}
        onClose={onClose}
        isDismissable={false}
        classNames={{
          base: '',
          backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
          closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
        }}
      >
        <ModalContent className="pb-8">
          <ModalHeader className="px-8 pt-8 pb-4 text-2xl">
            請先選取店家
          </ModalHeader>
          <ModalBody className="flex gap-6 px-8 py-0">
            <StoreSelector
              onConfirm={(selectedStore) => {
                onConfirm(selectedStore)
                onClose() // Close the modal after confirmation
              }}
            />
          </ModalBody>
          <ModalFooter className="p-0"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

import React from 'react'
import {
  Snippet,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import { useLocation } from 'react-use'
import { useRouter } from 'next/router'

export default function ShareModal({ isShareOpen, onShareOpenChange }) {
  const shareStyles = {
    content: 'flex justify-between items-center',
    pre: 'truncate',
    copyButton: 'text-teriary-black ml-1',
    copyIcon: 'text-teriary-black',
    checkIcon: 'text-teriary-black',
  }

  const location = useLocation()
  const router = useRouter()
  const currentUrl = `http://127.0.0.1:3000${router.asPath}`

  return (
    <>
      <Modal
        size="md"
        placement="center"
        isOpen={isShareOpen}
        onOpenChange={onShareOpenChange}
        classNames={{
          base: '',
          backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
          closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
        }}
      >
        <ModalContent className="pb-8">
          <ModalHeader className="px-8 pt-8 pb-4 text-2xl">分享</ModalHeader>
          <ModalBody className="flex gap-6 px-8 py-0">
            <Snippet
              variant="bordered"
              symbol=""
              fullWidth
              classNames={{ ...shareStyles }}
            >
              <span className="truncate">{currentUrl}</span>
            </Snippet>

            <hr />
            <div className="flex flex-row justify-center items-center gap-8">
              <a
                href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-tertiary-black cursor-pointer"
              >
                <FaFacebook className="w-7 h-7" />
                <span className="flex flex-row justify-center text-center items-center select-none">
                  Facebook
                </span>
              </a>
              <a
                href={`https://twitter.com/share?url=${encodeURIComponent(
                  currentUrl
                )}`}
                className="flex flex-col items-center gap-2 text-tertiary-black cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-7 h-7" />
                <span className="flex flex-row justify-center text-center items-center select-none">
                  Twitter
                </span>
              </a>
              <a
                className="flex flex-col items-center gap-2 text-tertiary-black cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-7 h-7" />
                <span className="flex flex-row justify-center text-center items-center select-none">
                  Instagram
                </span>
              </a>
            </div>
          </ModalBody>
          <ModalFooter className="p-0"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

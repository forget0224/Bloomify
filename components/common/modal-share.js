import React from 'react'
import { Snippet } from '@nextui-org/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // useDisclosure,
} from '@nextui-org/react'
import { Link } from '@nextui-org/react'
import { FaXTwitter, FaInstagram } from 'react-icons/fa6'
import { useLocation } from 'react-use'

export default function ShareModal({ isShareOpen, onShareOpenChange }) {
  // const { onShareOpen, onShareClose } = useDisclosure()

  // snippet 樣式
  const shareStyles = {
    content: 'flex justify-between items-center',
    pre: 'truncate',
    copyButton: 'text-tertiary-black ml-1',
    copyIcon: 'text-tertiary-black',
    checkIcon: 'text-tertiary-black',
  }

  const location = useLocation()
  const currentUrl = window.location.origin + location.pathname

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        size="md"
        placement={'center'}
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
            {/* icon 們 */}
            <div className="flex flex-row justify-center items-center gap-8">
              <a
                href={`https://www.facebook.com/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-teriary-black cursor-pointer"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_3256_30674)">
                    <path
                      d="M29 14.9961C29 7.26222 22.7339 0.996094 15 0.996094C7.26613 0.996094 1 7.26222 1 14.9961C1 21.9837 6.1196 27.7756 12.8125 28.8267V19.0431H9.25605V14.9961H12.8125V11.9116C12.8125 8.40311 14.9012 6.46513 18.1003 6.46513C19.6324 6.46513 21.2345 6.73835 21.2345 6.73835V10.1819H19.4687C17.73 10.1819 17.1875 11.2613 17.1875 12.3683V14.9961H21.0702L20.4493 19.0431H17.1875V28.8267C23.8804 27.7756 29 21.9837 29 14.9961Z"
                      stroke="black"
                      stroke-width="1.92688"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3256_30674">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="flex flex-row justify-center text-center items-center select-none">
                  Facebook
                </span>
              </a>
              <Link
                className="flex flex-col items-center gap-2 text-teriary-black cursor-pointer"
                href="#"
              >
                <FaXTwitter className="w-7 h-7" />
                <span className="flex flex-row justify-center text-center items-center select-none">
                  X
                </span>
              </Link>
              <Link
                className="flex flex-col items-center gap-2 text-teriary-black cursor-pointer"
                href="#"
              >
                <FaInstagram className="w-7 h-7" />
                <span className="flex flex-row justify-center text-center items-center select-none">
                  Instagram
                </span>
              </Link>
            </div>
          </ModalBody>
          <ModalFooter className="p-0"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
    // <>
    //   {/* <Button onPress={onOpen}>Open Modal</Button> */}
    //   <Modal
    //     size="md"
    //     placement={'center'}
    //     isOpen={isShareOpen}
    //     onOpenChange={onShareOpenChange}
    //     classNames={{
    //       base: '',
    //       backdrop: 'bg-[#262626]/50 backdrop-opacity-40',
    //       closeButton: 'hover:bg-primary/5 active:bg-primary/10 mr-4 mt-4',
    //     }}
    //   >
    //     <ModalContent className="pb-8">
    //       <ModalHeader className="px-8 pt-8 pb-4 text-2xl">分享</ModalHeader>
    //       <ModalBody className="flex gap-6 px-8 py-0">
    //         <Snippet
    //           variant="bordered"
    //           symbol=""
    //           fullWidth
    //           classNames={{ ...shareStyles }}
    //         >
    //           <span className="truncate">{currentUrl}</span>
    //         </Snippet>

    //         <hr />
    //         {/* icon 們 */}
    //         <div className="flex flex-row justify-center items-center gap-8">
    //           <Link
    //             className="flex flex-col items-center gap-2 text-teriary-black cursor-pointer"
    //             href="#"
    //           >
    //             <svg
    //               width="28"
    //               height="28"
    //               viewBox="0 0 30 30"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <g clip-path="url(#clip0_3256_30674)">
    //                 <path
    //                   d="M29 14.9961C29 7.26222 22.7339 0.996094 15 0.996094C7.26613 0.996094 1 7.26222 1 14.9961C1 21.9837 6.1196 27.7756 12.8125 28.8267V19.0431H9.25605V14.9961H12.8125V11.9116C12.8125 8.40311 14.9012 6.46513 18.1003 6.46513C19.6324 6.46513 21.2345 6.73835 21.2345 6.73835V10.1819H19.4687C17.73 10.1819 17.1875 11.2613 17.1875 12.3683V14.9961H21.0702L20.4493 19.0431H17.1875V28.8267C23.8804 27.7756 29 21.9837 29 14.9961Z"
    //                   stroke="black"
    //                   stroke-width="1.92688"
    //                 />
    //               </g>
    //               <defs>
    //                 <clipPath id="clip0_3256_30674">
    //                   <rect width="30" height="30" fill="white" />
    //                 </clipPath>
    //               </defs>
    //             </svg>
    //             <span className="flex flex-row justify-center text-center items-center select-none">
    //               Facebook
    //             </span>
    //           </Link>
    //           <Link
    //             className="flex flex-col items-center gap-2 text-teriary-black cursor-pointer"
    //             href="#"
    //           >
    //             <FaXTwitter className="w-7 h-7" />
    //             <span className="flex flex-row justify-center text-center items-center select-none">
    //               X
    //             </span>
    //           </Link>
    //           <Link
    //             className="flex flex-col items-center gap-2 text-teriary-black cursor-pointer"
    //             href="#"
    //           >
    //             <FaInstagram className="w-7 h-7" />
    //             <span className="flex flex-row justify-center text-center items-center select-none">
    //               Instagram
    //             </span>
    //           </Link>
    //         </div>
    //       </ModalBody>
    //       <ModalFooter className="p-0"></ModalFooter>
    //     </ModalContent>
    //   </Modal>
    // </>
  )
}

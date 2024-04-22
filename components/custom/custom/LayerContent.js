// import React from 'react'

// import {
//   CiLock,
//   CiUnlock,
//   CiTrash,
//   CiLineHeight,
//   CiSquarePlus,
// } from 'react-icons/ci'

// export default function LayerContent() {
//   return (
//     <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
//       <div className="text-tertiary-gray-100 w-60 text-center py-4">
//         <p className="text-xs">ssdlkfskldhfsldkfhs</p>
//       </div>
//       <div className="h-auto w-full">
//         <div className="px-3 py-2">
//           {/* 整組list */}
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiLock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-around border-b-1 py-2">
//             <div className="text-2xl flex flex-row gap-2">
//               <CiLineHeight />
//               <div className="h-6 w-6 bg-primary"></div>
//             </div>
//             <div>picture</div>
//             <div className="flex flex-row gap-3 text-2xl">
//               <CiUnlock />
//               <CiSquarePlus />
//               <CiTrash />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import React from 'react'

import { useFlower } from '@/hooks/use-flower'
import {
  CiLock,
  CiUnlock,
  CiTrash,
  CiLineHeight,
  CiSquarePlus,
} from 'react-icons/ci'
import Image from 'next/image'
import { IoMdHammer } from 'react-icons/io'

export default function LayerContent() {
  const { imagesInfo, getClipBounds } = useFlower()
  console.log(`imagesInfo,,,,,${imagesInfo}`)
  console.log(getClipBounds)
  return (
    <div className="text-tertiary-black w-full h-full flex flex-col justify-center items-center">
      <div className="text-tertiary-gray-100 w-60 text-center py-4">
        <p className="text-xs">Manage your flower layers below:</p>
      </div>
      <div className="h-auto w-full overflow-auto">
        {imagesInfo &&
          imagesInfo.map((img, index) => (
            <div
              id={img.id}
              key={img.id}
              className="flex flex-row items-center justify-around border-b border-gray-300 py-2"
            >
              <div className="relative h-16 w-24 overflow-hidden border rounded-lg">
                <Image
                  id={img.id}
                  src={img.url}
                  alt={img.name || 'Flower Image'}
                  layout="fill"
                  objectFit="contain"
                  style={{
                    position: 'absolute',
                    left: `${img.left / 3.5}px`,
                    top: `${img.top / 3.5}px`,
                  }}
                />
              </div>
              <div className="text-sm">{img.name}</div>
              <div className="flex flex-row gap-3 text-lg">
                <CiLock />
                <CiSquarePlus />
                <CiTrash />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

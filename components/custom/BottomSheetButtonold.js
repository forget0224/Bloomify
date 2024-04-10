import React, { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import 'react-spring-bottom-sheet/dist/style.css'
function BottomSheetButton({ icon, label, content, headerContent }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center text-tertiary-black w-[50px]">
      <div className="text-4xl" onClick={() => setOpen(true)}>
        {icon}
      </div>
      <p>{label}</p>
      <BottomSheet
        open={open}
        blocking={false}
        onDismiss={() => setOpen(false)}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight / 4,
          maxHeight * 0.6,
        ]}
        header={
          <div className="flex flex-row items-center text-xl justify-center gap-7">
            <GoArrowLeft className="text-tertiary-black " />
            <h1 className="text-xl  font-bold text-gray-800">
              {headerContent}
            </h1>
            <GoArrowRight className="text-tertiary-black " />
          </div>
        }
      >
        {content}
      </BottomSheet>
    </div>
  )
}

export default BottomSheetButton

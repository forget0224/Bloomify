import React from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { IoIosClose } from 'react-icons/io'
function BottomSheetButton({
  icon,
  iconClass = 'text-4xl',
  label,
  content,
  isOpen,
  onOpen,
  onClose,
  onPrev,
  onNext,
  showArrows = true,
  showLabel = true,
  blocking = false,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-tertiary-black z-9">
      <div className={iconClass} onClick={onOpen}>
        {icon}
      </div>
      {showLabel && <p>{label}</p>}
      <BottomSheet
        open={isOpen}
        blocking={blocking}
        onDismiss={onClose}
        defaultSnap={({ snapPoints, lastSnap }) => lastSnap ?? snapPoints[2]}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight / 4,
          maxHeight * 0.6,
        ]}
        header={
          <div className="flex flex-row items-center text-xl justify-center gap-7 relative">
            {showArrows && (
              <GoArrowLeft
                className="text-tertiary-black cursor-pointer"
                onClick={onPrev}
              />
            )}
            <h1 className="text-xl font-bold text-gray-800">{label}</h1>
            {showArrows && (
              <GoArrowRight
                className="text-tertiary-black cursor-pointer"
                onClick={onNext}
              />
            )}
            <div className="absolute right-0">
              <IoIosClose
                className="text-tertiary-black cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
        }
      >
        {content}
      </BottomSheet>
    </div>
  )
}

export default BottomSheetButton

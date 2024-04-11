import React from 'react'
import { Button } from '@nextui-org/react'

export default function CourseRatingFilter() {
  return (
    <div className="flex flex-row gap-2 overflow-x-auto items-center py-4">
      <Button color="primary" variant="solid">
        全部(21)
      </Button>
      <Button color="white" variant="bordered">
        五星(10)
      </Button>
      <Button color="white" variant="bordered">
        四星(10)
      </Button>
      <Button color="white" variant="bordered">
        三星(10)
      </Button>
      <Button color="white" variant="bordered">
        二星(10)
      </Button>
      <Button color="white" variant="bordered">
        一星(10)
      </Button>
    </div>
  )
}

import React from 'react'
import { Button } from '@nextui-org/react'

export default function CourseRatingFilter() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
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

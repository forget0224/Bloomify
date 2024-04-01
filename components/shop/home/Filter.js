import React from 'react'
import { Checkbox } from '@nextui-org/react'
import { Slider } from '@nextui-org/react'
import { MyButton } from '@/components/btn/mybutton'

function Filter() {
  return (
    <>
      <div>
        <h1>篩選</h1>
        <h3 className="my-5">共 100 項結果</h3>
      </div>

      <div>
        <h2>子類</h2>
        <div className="my-4">
          <Checkbox defaultSelected radius="sm">
            鮮花
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            花盆栽
          </Checkbox>
        </div>
        <div>
          <Checkbox defaultSelected radius="sm">
            葉材
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            植盆栽
          </Checkbox>
        </div>
        <div className="mt-4">
          <Checkbox defaultSelected radius="sm">
            器具
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            材料
          </Checkbox>
        </div>
      </div>
      <div className="my-8 h-px" style={{ backgroundColor: '#E4E4E4' }}></div>
      <div>
        <h2>價格</h2>
        <div className="flex items-center my-4">
          <div class="m-3">
            <input
              type="text"
              id="large-input"
              class="block w-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div
            className="h-0.5 w-6"
            style={{ backgroundColor: '#959595' }}
          ></div>
          <div class="m-3">
            <input
              type="text"
              id="large-input"
              class="block w-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <Slider
          label="Price Range"
          step={50}
          minValue={0}
          maxValue={1000}
          defaultValue={[0, 1000]}
          formatOptions={{ style: 'currency', currency: 'USD' }}
          className="max-w-md"
        />
      </div>
      <div className="my-8 h-px" style={{ backgroundColor: '#E4E4E4' }}></div>
      <div>
        <h2>顏色</h2>

        <div className="my-4">
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">红色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#FF0000' }}
              ></div>
            </div>
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">橙色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#FFA500' }}
              ></div>
            </div>
          </Checkbox>
        </div>
        <div>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">黃色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#FFFF00' }}
              ></div>
            </div>
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">綠色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#CFDD81' }}
              ></div>
            </div>
          </Checkbox>
        </div>
        <div className="my-4">
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">藍色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#0000FF' }}
              ></div>
            </div>
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">紫色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#8B00FF' }}
              ></div>
            </div>
          </Checkbox>
        </div>
        <div>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">粉色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#FFC0CB' }}
              ></div>
            </div>
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">褐色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: 'red' }}
              ></div>
            </div>
          </Checkbox>
        </div>
        <div className="my-4">
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">灰色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#704214' }}
              ></div>
            </div>
          </Checkbox>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">黑色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#808080' }}
              ></div>
            </div>
          </Checkbox>
        </div>
        <div>
          <Checkbox defaultSelected radius="sm">
            <div className="flex items-center">
              <p className="mr-2">白色</p>
              <div
                className="h-4 w-4 rounded-full bg-red-500"
                style={{ backgroundColor: '#000000' }}
              ></div>
            </div>
          </Checkbox>
        </div>
      </div>
      <div className="mt-8">
        <MyButton color="primary" size="xs" isOutline>
          清除選項
        </MyButton>
      </div>
    </>
  )
}
export default Filter

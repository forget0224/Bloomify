import { CiSearch } from 'react-icons/ci'

export default function CourseSearch() {
  return (
    <>
      {/* 輸入框群組 */}
      <div className="flex w-full">
        {/* 輸入框 */}
        <div className="flex w-full rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            id="price"
            className="block text-base w-full rounded-l-xl px-4 py-2 text-tertiary placeholder:text-tertiary-gray-100 border-2 border-tertiary-gray-200 hover:border-tertiary-gray-100 focus:ring-0 focus:outline-none focus:border-teal focus:border-primary-100"
            placeholder="輸入關鍵字"
          />
          <button className="bg-primary-100 w-12 flex justify-center items-center rounded-r-xl hover:bg-[#85B5A7]">
            <CiSearch fill="white" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  )
}

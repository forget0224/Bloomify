import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useRouter } from 'next/router'

export default function SearchBtn({ baseSearchPath }) {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  // 獲取網址中的keyword參數
  useEffect(() => {
    const keyword = router.query.keyword
    if (keyword) {
      setSearchTerm(decodeURIComponent(keyword))
    }
  }, [router.query])

  const handleSubmit = (event) => {
    event.preventDefault()
    const searchQuery = `${baseSearchPath}?keyword=${encodeURIComponent(
      searchTerm
    )}`
    // window.location.href = searchQuery
    router.push(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 輸入框群組 */}
      <div className="flex w-full">
        {/* 輸入框 */}
        <div className="flex w-full rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            id="price"
            className="block text-base w-full rounded-l-xl px-4 py-2 text-tertiary placeholder:text-tertiary-gray-100 border-1 border-tertiary-gray-200 focus:ring-0 focus:outline-none focus:border-teal focus:border-primary-100"
            placeholder="輸入關鍵字"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary-100 w-12 flex justify-center items-center rounded-r-xl hover:bg-[#85B5A7]"
          >
            <CiSearch fill="white" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </form>
  )
}

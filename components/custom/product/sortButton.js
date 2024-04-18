import { useState, useEffect } from 'react'
import { Select, SelectItem } from '@nextui-org/react'

export default function SortButton({ onSortChange }) {
  const [selected, setSelected] = useState('') // 預設選項

  const sortOptions = [
    {
      value: 'template_id_asc',
      label: '預設',
      field: 'template_id',
      order: 'asc',
    },
    {
      value: 'created_at_desc',
      label: '依最新上架',
      field: 'created_at',
      order: 'desc',
    },
    {
      value: 'total_price_asc',
      label: '依價格低到高',
      field: 'total_price',
      order: 'asc',
    },
    {
      value: 'total_price_desc',
      label: '依價格高到低',
      field: 'total_price',
      order: 'desc',
    },
  ]
  useEffect(() => {
    const selectedOption = sortOptions.find(
      (option) => option.value === selected
    )
    if (selectedOption) {
      onSortChange(selectedOption.field, selectedOption.order)
    }
  }, [selected, onSortChange])

  return (
    <div className="sm:w-[170px]">
      {/* <Select
        className="rounded-lg border-tertiary-gary-200 px-unit-2 text-xs h-[30px] "
        value={selected}
        variant="bordered"
        aria-label="Sort by "
        defaultSelectedKeys={[0]}
        onChange={setSelected}
      >
        {sortOptions.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select> */}

      <Select
        variant="bordered"
        aria-label="Sort by "
        className="rounded-lg border-tertiary-gary-200 px-unit-2 text-xs h-[30px] "
        onChange={(e) => setSelected(e.target.value)}
        defaultSelectedKeys={[sortOptions[0].value]}
      >
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

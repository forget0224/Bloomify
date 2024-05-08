import { useState, useEffect } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { useAuth } from '@/hooks/use-auth'
// 日歷元件
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
moment.tz.setDefault('Asia/Taiwan')
import 'react-big-calendar/lib/css/react-big-calendar.css'
// 小組元件
import DefaultLayout from '@/components/layout/default-layout'
import CenterLayout from '@/components/layout/center-layout'
import Title from '@/components/common/title'
import Sidebar from '@/components/layout/sidebar'
import { useDisclosure } from '@nextui-org/react'
import CalendarModal from '@/components/course/modal-calendar'
import Head from 'next/head'

export default function CoursesCalendar() {
  const [activePage, setActivePage] = useState('course')
  const { auth } = useAuth() // 判斷會員用
  const { isAuth } = auth

  const localizer = momentLocalizer(moment)

  const [orders, setOrders] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({
    title: '',
    store: '',
    address: '',
    image: '',
    period: '',
    start: '',
    end: '',
    course_id: '',
  })

  // 選中的課程詳細資訊彈窗
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()

  // 生成 Google Calendar URL
  const generateGoogleCalendarUrl = (event) => {
    const startTime = moment(event.start).format('YYYYMMDDTHHmmss')
    const endTime = moment(event.end).format('YYYYMMDDTHHmmss')
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      event.period
    )}&location=${encodeURIComponent(event.address)}`
    console.log(startTime)
    console.log(endTime)
    console.log(url)
    return url
  }

  // 點擊單堂課程
  const handleEventSelect = (event) => {
    console.log(event)
    setSelectedEvent(event) // set選中的事件
    onOpen() // 打開彈窗
  }

  // 處理日期的函數，直接返回 Date 對象
  function combineDateTime(dateStr, timeStr) {
    const date = new Date(dateStr) // 使用 Date 構造函數解析 ISO 日期
    const timeParts = timeStr.split(':')
    date.setHours(parseInt(timeParts[0], 10))
    date.setMinutes(parseInt(timeParts[1], 10))
    date.setSeconds(0) // 設置秒數為0
    return date
  }

  // 處理訂單數據轉成日歷所需要的格式
  const creatEventsList = (orders) => {
    return orders.flatMap((order) =>
      order.items.map((item) => ({
        title: item.course.name,
        store: item.course.store.store_name,
        address: item.course.store.store_address,
        period: item.course.datetimes[0].period,
        start: combineDateTime(
          item.course.datetimes[0].date,
          item.course.datetimes[0].start_time
        ),
        end: combineDateTime(
          item.course.datetimes[0].date,
          item.course.datetimes[0].end_time
        ),
        image: item.course.images[0].path,
        course_id: item.course_id,
      }))
    )
  }

  // TODO:
  const eventPropGetter = (event, start, end, isSelected) => {
    const today = new Date()
    const isPastEvent = start < today
    const backgroundColor = isPastEvent ? '#a6a6a6' : '#68A392' // 灰色或藍色

    return {
      className: '',
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        border: isSelected ? '2px solid #000' : 'none',
      },
    }
  }

  // 訂單資料fetch
  useEffect(() => {
    // open() // 在 API 請求開始前，開啟 loader

    async function fetchOrders() {
      try {
        const response = await fetch(
          `http://localhost:3005/api/course-orders`,
          {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'GET',
          }
        )
        const data = await response.json()
        console.log('API data:', data) // 確認數據已接收
        if (response.ok && data.status === 'success') {
          setOrders(data.data)
          console.log(orders)
        } else {
          throw new Error('Failed to fetch orders or wrong data structure')
        }
        close(1.5) // 設置一個延時來關閉 loader
      } catch (error) {
        console.error('Error fetching all orders:', error)
      }
    }

    fetchOrders()
  }, [])

  // 事件資料狀態
  useEffect(() => {
    if (orders.length > 0) {
      const newEventsList = creatEventsList(orders)
      setEvents(newEventsList)
    }
  }, [orders]) // 依賴於訂單狀態的變化

  const messages = {
    allDay: '整日',
    previous: '後退',
    next: '前進',
    today: '今天',
    month: '月',
    week: '週',
    day: '日',
    agenda: '議程',
    date: '日期',
    time: '時間',
    event: '事件',
    noEventsInRange: '這個範圍內沒有事件。',
    showMore: (total) => `更多 ${total} 個`,
  }

  return (
    <>
      <Head>
        <title>我的課表</title>
      </Head>

      <DefaultLayout activePage={activePage}>
        <CenterLayout>
          {/* 麵包屑 */}
          <div className="w-full py-6 hidden sm:block">
            <Breadcrumbs>
              <BreadcrumbItem>首頁</BreadcrumbItem>
              <BreadcrumbItem>會員中心</BreadcrumbItem>
              <BreadcrumbItem>合作課程</BreadcrumbItem>
              <BreadcrumbItem>我的課表</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          {/* 主要內容 */}
          <div className="flex flex-row w-full justify-center">
            {/* 側邊欄 */}
            <Sidebar />
            {/* 標題 */}
            <div className="w-10/12 md:w-10/12 lg:w-10/12 pl-0 md:pl-10">
              <Title text="我的課表" />

              {/* 主要區域 */}
              <div className="grid gap-y-10 gap-x-6 w-full mt-4">
                {/* 日歷開始 */}
                <div className="min-h-[600px]">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    onSelectEvent={handleEventSelect}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={eventPropGetter}
                    views={['month', 'week', 'day']}
                    messages={messages}
                  />
                </div>
              </div>
            </div>
          </div>
        </CenterLayout>
        {/* 課程詳細內容彈窗 */}
        <CalendarModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          event={selectedEvent}
          selectedEvent={selectedEvent}
          googleCalendarUrl={generateGoogleCalendarUrl(selectedEvent)}
        />
      </DefaultLayout>
    </>
  )
}

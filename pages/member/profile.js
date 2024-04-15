import React from 'react'
import Link from 'next/link'
// import { useAuth } from '@/hooks/use-auth'

export default function Profile() {
  // const { auth } = useAuth()

  return (
    <>
      <h1>會員資料頁</h1>
      <hr />
      {/* <p>id: {auth.userData.id}</p> */}
      {/* <p>username: {auth.userData.username}</p> */}
      <hr />
      <Link href="/member/login">連至 登入頁</Link>
    </>
  )
}

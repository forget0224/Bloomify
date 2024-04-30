// import HomeNav from './navbar'
import Footer from './footer'
import dynamic from 'next/dynamic'

const HomeNav = dynamic(() => import('./navbar'), {
  ssr: false,
})

export default function DefaultLayout({ children, activePage }) {
  return (
    <>
      <HomeNav activePage={activePage} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

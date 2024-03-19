import HomeNav from './navbar'
import Footer from './footer'

export default function DefaultLayout({ children, activePage }) {
  return (
    <>
      <HomeNav activePage={activePage} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

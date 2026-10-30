import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// Wraps every page. <Outlet /> is where the page for the current URL appears.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default Layout
//The Header and Footer stay the same while the content inside <Outlet /> changes depending on the URL.
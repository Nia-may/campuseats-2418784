import logo from '../images/logo.jpg'
function Header({ cartCount }) {
 
  return (
    <header className="header">
      <img src={logo} alt="My logo" className="header-logo"/>
      
      <nav className="nav">
        <a href="#">Vendors</a>
        <a href="#">My Orders</a>
        <a href="#" className="cart">
          Cart <span className="badge">{cartCount}</span>
        </a>
      </nav>
    </header>
  )
}
 
export default Header
import { BrowserRouter, Routes, Route } from 'react-router'
import { CartProvider } from './context/CartProvider.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SeedPage from './pages/SeedPage.jsx'
// App only wires things together: the router, the provider and the route table.
//the vendor ID is dynamic.
//CartProvider wraps the routes, the Header and pages can access useCart().
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="vendor/:id" element={<VendorPage />} />
             <Route path="login" element={<LoginPage />} />
             {import.meta.env.DEV && (
                <Route path="seed" element={<SeedPage />} />
              )}
             <Route path="register" element={<RegisterPage />} />
          {/* Everything inside ProtectedRoute needs a signed-in user */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

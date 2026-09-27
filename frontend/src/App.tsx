import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import OnSale from './pages/OnSale/OnSale'
import NewArrivalsPage from './pages/NewArrivals/NewArrivalsPage'
import BrandsPage from './pages/Brands/BrandsPage'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sale" element={<OnSale />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
      </Routes>
    </CartProvider>
  )
}

export default App
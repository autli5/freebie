import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext' // <-- Импортируем провайдер

import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart' // Убедитесь, что путь правильный

function App() {
  return (
    <CartProvider> {/* <-- Оборачиваем всё приложение */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  )
}

export default App
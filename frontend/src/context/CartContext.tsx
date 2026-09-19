import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartContextType {
  cart: any
  isLoading: boolean
  addToCart: (product_id: number, quantity: number, size: string, color: string) => Promise<void>
  updateQuantity: (item_id: number, quantity: number) => Promise<void>
  removeFromCart: (item_id: number) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCart = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/cart/my_cart/', {
        credentials: 'include',
      })
      const data = await res.json()
      console.log('🛒 [CartContext] Получены новые данные корзины:', data) // <-- ДИАГНОСТИКА
      setCart(data) 
    } catch (error) {
      console.error('❌ [CartContext] Ошибка загрузки корзины:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('🔄 [CartContext] Инициализация провайдера...')
    fetchCart()
  }, [])

  const addToCart = async (product_id: number, quantity: number, size: string, color: string) => {
    console.log('➕ [CartContext] Вызов addToCart для товара:', product_id) // <-- ДИАГНОСТИКА
    try {
      await fetch('http://localhost:8000/api/cart/add_item/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_id, quantity, size, color }),
      })
      await fetchCart() // Перезапрашиваем корзину, чтобы обновить ВСЕ компоненты
    } catch (error) {
      console.error('❌ [CartContext] Ошибка добавления:', error)
    }
  }

  const updateQuantity = async (item_id: number, quantity: number) => {
    console.log('🔄 [CartContext] Вызов updateQuantity для item:', item_id, 'кол-во:', quantity)
    try {
      if (quantity === 0) {
        await removeFromCart(item_id)
        return
      }
      await fetch('http://localhost:8000/api/cart/update_item/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ item_id, quantity }),
      })
      await fetchCart()
    } catch (error) {
      console.error('❌ [CartContext] Ошибка обновления количества:', error)
    }
  }

  const removeFromCart = async (item_id: number) => {
    console.log('🗑️ [CartContext] Вызов removeFromCart для item:', item_id)
    try {
      await fetch('http://localhost:8000/api/cart/remove_item/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ item_id }),
      })
      await fetchCart()
    } catch (error) {
      console.error('❌ [CartContext] Ошибка удаления:', error)
    }
  }

  return (
    <CartContext.Provider value={{ cart, isLoading, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
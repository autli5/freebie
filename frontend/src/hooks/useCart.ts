import { useState, useEffect } from 'react'

// Глобальный кэш корзины
let cachedCart: any = null
let isFetching = false
let lastFetchTime = 0

// Кастомное событие для уведомления всех компонентов
const CART_UPDATED_EVENT = 'cart-updated'

export function refreshCartData() {
  // Не делаем запрос чаще чем раз в 300мс (защита от спама)
  const now = Date.now()
  if (now - lastFetchTime < 300) return
  lastFetchTime = now

  if (isFetching) return
  isFetching = true

  fetch('http://localhost:8000/api/cart/my_cart/', {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      cachedCart = data
      isFetching = false
      // Отправляем событие ВСЕМ компонентам
      window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: data }))
    })
    .catch(err => {
      console.error('Ошибка загрузки корзины:', err)
      isFetching = false
    })
}

export function useCart() {
  const [cart, setCart] = useState(cachedCart)

  useEffect(() => {
    // Если кэша нет — загружаем
    if (!cachedCart) {
      refreshCartData()
    } else {
      setCart(cachedCart)
    }

    // Подписываемся на глобальное событие обновления корзины
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent
      setCart(customEvent.detail)
    }

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate)

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate)
    }
  }, [])

  const addToCart = async (product_id: number, quantity: number, size: string, color: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/cart/add_item/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_id, quantity, size, color }),
      })

      if (response.ok) {
        // После успешного добавления — обновляем корзину для ВСЕХ компонентов
        refreshCartData()
      }
    } catch (error) {
      console.error('Ошибка при добавлении:', error)
    }
  }

  const updateQuantity = async (item_id: number, quantity: number) => {
    try {
      if (quantity === 0) {
        await fetch('http://localhost:8000/api/cart/remove_item/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ item_id }),
        })
      } else {
        await fetch('http://localhost:8000/api/cart/update_item/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ item_id, quantity }),
        })
      }
      // После изменения — обновляем корзину для ВСЕХ компонентов
      refreshCartData()
    } catch (error) {
      console.error('Ошибка при обновлении количества:', error)
    }
  }

  return { cart, addToCart, updateQuantity }
}
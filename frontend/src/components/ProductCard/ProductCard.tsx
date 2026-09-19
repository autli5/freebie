import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext' // <-- ВАЖНО: только этот импорт!
import styles from './ProductCard.module.css'

type Product = {
  id: number
  name: string
  slug: string
  image: string
  rating: number
  price: string
  old_price: string | null
  discount_percent: number | null
  category: number
}

type ProductsCardProps = {
  product: Product
}

function ProductsCard({ product }: ProductsCardProps) {
  // Берем функции из глобального контекста
  const { cart, addToCart, updateQuantity } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  // Ищем этот товар в глобальной корзине
  const cartItem = cart?.items?.find((item: any) => item.product.id === product.id)
  const quantityInCart = cartItem ? cartItem.quantity : 0
  const cartItemId = cartItem ? cartItem.id : null

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsUpdating(true)

    // Вызываем функцию из контекста, она сама обновит всё приложение
    await addToCart(product.id, 1, 'M', 'Default')
    
    setIsUpdating(false)
  }

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!cartItemId) return
    setIsUpdating(true)
    
    // Вызываем функцию из контекста
    await updateQuantity(cartItemId, newQuantity)
    
    setIsUpdating(false)
  }

  return (
    <div className={styles.cardContainer}>
      <Link to={`/product/${product.slug}`} className={styles.cardLink}>
        <article className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.ratingValue}>{product.rating}/5</span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>${Number(product.price).toFixed(0)}</span>
            {product.old_price && (
              <span className={styles.oldPrice}>${Number(product.old_price).toFixed(0)}</span>
            )}
            {product.discount_percent && (
              <span className={styles.discount}>-{product.discount_percent}%</span>
            )}
          </div>
        </article>
      </Link>

      {quantityInCart === 0 ? (
        <button 
          className={styles.quickAddButton}
          onClick={handleAddToCart}
          disabled={isUpdating}
        >
          {isUpdating ? 'Adding...' : 'Add to Cart'}
        </button>
      ) : (
        <div className={styles.quantitySelector}>
          <button
            className={styles.qtyButton}
            onClick={() => handleUpdateQuantity(quantityInCart - 1)}
            disabled={isUpdating}
          >
            −
          </button>
          <span className={styles.quantityValue}>{quantityInCart}</span>
          <button
            className={styles.qtyButton}
            onClick={() => handleUpdateQuantity(quantityInCart + 1)}
            disabled={isUpdating}
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductsCard
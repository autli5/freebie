import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext' // <-- ВАЖНО: импорт из контекста
import styles from './ProductDetail.module.css'
import Header from '../../components/Header/Header'
import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
import Footer from '../../components/Footer/Footer'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: string
  old_price: string | null
  image: string
  rating: string
  reviews_count: number
  discount_percent: number | null
  has_discount: boolean
  category: number
}

interface Review {
  id: number
  customer_name: string
  rating: number
  comment: string
  verified: boolean
  created_at: string
}

function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  
  // 1. Получаем глобальные функции и состояние корзины
  const { cart, addToCart, updateQuantity } = useCart()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  
  const [selectedSize, setSelectedSize] = useState('Large')
  const [selectedColor, setSelectedColor] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false) // Только для анимации кнопки

  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faq'>('reviews')
  const [reviews, setReviews] = useState<Review[]>([])

  const galleryImages = [
    product?.image || '',
    product?.image || '',
    product?.image || '',
  ]

  // 2. Загружаем товар и отзывы
  useEffect(() => {
    if (!slug) return

    fetch(`http://localhost:8000/api/products/${slug}/`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })

    fetch('http://localhost:8000/api/reviews/')
      .then(res => res.json())
      .then(data => setReviews(data.slice(0, 6)))
      .catch(console.error)
  }, [slug])

  // 3. Вычисляем состояние корзины для текущего товара из глобального объекта cart
  const cartItem = cart?.items?.find((item: any) => item.product.id === product?.id)
  const cartQuantity = cartItem ? cartItem.quantity : 0
  const cartItemId = cartItem ? cartItem.id : null

  // 4. Функция добавления товара (использует глобальный addToCart)
  const handleAddToCart = async () => {
    if (!product) return
    setIsUpdating(true)
    try {
      await addToCart(product.id, 1, selectedSize, colors[selectedColor])
    } catch (error) {
      console.error('Ошибка при добавлении:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  // 5. Функция изменения количества (использует глобальный updateQuantity)
  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!cartItemId) return
    setIsUpdating(true)
    try {
      await updateQuantity(cartItemId, newQuantity)
    } catch (error) {
      console.error('Ошибка при обновлении количества:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Ждем загрузки и товара, и корзины
  if (loading || !cart) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/" className={styles.backLink}>← Back to home</Link>
      </div>
    )
  }

  const sizes = ['Small', 'Medium', 'Large', 'X-Large']
  const colors = ['#556B2F', '#2F4F4F', '#2C3E50']

  const renderStars = (rating: number, size: 'small' | 'medium' = 'medium') => {
    const starSize = size === 'small' ? styles.starSmall : styles.starMedium
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`${starSize} ${i < Math.round(rating) ? styles.starFilled : styles.starEmpty}`}
      >
        ★
      </span>
    ))
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link to="/" className={styles.breadcrumbLink}>Shop</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link to="/" className={styles.breadcrumbLink}>Men</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>T-shirts</span>
          </div>

          <div className={styles.productGrid}>
            <div className={styles.gallerySection}>
              <div className={styles.thumbnails}>
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`${styles.thumbnail} ${idx === 0 ? styles.thumbnailActive : ''}`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} />
                  </div>
                ))}
              </div>
              <div className={styles.mainImageLarge}>
                <img src={product.image} alt={product.name} />
              </div>
            </div>

            <div className={styles.productInfo}>
              <h1 className={styles.productTitle}>{product.name}</h1>

              <div className={styles.ratingRow}>
                <div className={styles.starsRow}>
                  {renderStars(Number(product.rating))}
                </div>
                <span className={styles.ratingValue}>
                  {Number(product.rating).toFixed(1)}/5
                </span>
              </div>

              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>
                  ${Number(product.price).toFixed(0)}
                </span>
                {product.old_price && (
                  <>
                    <span className={styles.oldPrice}>
                      ${Number(product.old_price).toFixed(0)}
                    </span>
                    {product.discount_percent && (
                      <span className={styles.discountBadge}>
                        -{product.discount_percent}%
                      </span>
                    )}
                  </>
                )}
              </div>

              <p className={styles.productDescription}>
                {product.description ||
                  'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.'}
              </p>

              <div className={styles.optionSection}>
                <span className={styles.optionLabel}>Select Colors</span>
                <div className={styles.colorOptions}>
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      className={`${styles.colorCircle} ${
                        selectedColor === idx ? styles.colorActive : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(idx)}
                    >
                      {selectedColor === idx && (
                        <span className={styles.checkmark}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.optionSection}>
                <span className={styles.optionLabel}>Choose Size</span>
                <div className={styles.sizeOptions}>
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`${styles.sizePill} ${
                        selectedSize === size ? styles.sizePillActive : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* ===== ДИНАМИЧЕСКАЯ СЕКЦИЯ КОРЗИНЫ ===== */}
              <div className={styles.addToCartSection}>
                {cartQuantity === 0 ? (
                  <button 
                    className={styles.addToCartButton} 
                    onClick={handleAddToCart}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Adding...' : 'Add to Cart'}
                  </button>
                ) : (
                  <div className={styles.quantitySelector}>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleUpdateQuantity(cartQuantity - 1)}
                      disabled={isUpdating}
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>{cartQuantity}</span>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleUpdateQuantity(cartQuantity + 1)}
                      disabled={isUpdating}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              {/* ========================================== */}

            </div>
          </div>

          <div className={styles.tabsSection}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'details' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Rating & Reviews
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'faq' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                FAQs
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'details' && (
                <div className={styles.detailsContent}>
                  <h3>Product Details</h3>
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className={styles.reviewsContent}>
                  <div className={styles.reviewsHeader}>
                    <h3>All Reviews ({product.reviews_count || 451})</h3>
                    <div className={styles.reviewsActions}>
                      <button className={styles.filterButton}>
                        <span></span> Filter
                      </button>
                      <select className={styles.sortSelect}>
                        <option>Latest</option>
                        <option>Oldest</option>
                        <option>Highest Rated</option>
                      </select>
                      <button className={styles.writeReviewButton}>
                        Write a Review
                      </button>
                    </div>
                  </div>

                  <div className={styles.reviewsGrid}>
                    {reviews.map(review => (
                      <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                          <div className={styles.reviewStars}>
                            {renderStars(review.rating, 'small')}
                          </div>
                          <span className={styles.reviewDots}>⋯</span>
                        </div>
                        <div className={styles.reviewAuthor}>
                          <strong>{review.customer_name}</strong>
                          {review.verified && (
                            <span className={styles.verifiedBadge}>✓</span>
                          )}
                        </div>
                        <p className={styles.reviewText}>"{review.comment}"</p>
                        <div className={styles.reviewDate}>
                          Posted on {new Date(review.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className={styles.loadMoreButton}>
                    Load More Reviews
                  </button>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className={styles.faqContent}>
                  <h3>Frequently Asked Questions</h3>
                  <p>No FAQs available for this product yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProductDetail
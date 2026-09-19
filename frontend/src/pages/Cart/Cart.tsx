import { useState } from 'react'
import { useCart } from '../../context/CartContext' // <-- ВАЖНО: только этот импорт!
import styles from './Cart.module.css'
import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

function Cart() {
  // Берем всё из глобального контекста. Никаких своих fetch!
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null)

  // Если корзина еще загружается
  if (!cart) {
    return <div className={styles.loading}>Loading cart...</div>
  }

  const cartItems = cart.items || []

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'sale20') {
      setAppliedDiscount(20)
    } else {
      alert('Invalid promo code. Try "SALE20"')
    }
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  )

  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount) / 100 : 0
  const delivery = subtotal > 0 ? 15 : 0
  const total = subtotal - discountAmount + delivery

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className={styles.cartPage}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <span>Home</span>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span>Cart</span>
          </div>

          <h1 className={styles.title}>YOUR CART</h1>

          <div className={styles.cartLayout}>
            <section className={styles.items}>
              {cartItems.length === 0 ? (
                <div className={styles.empty}>
                  <h2>Your cart is empty</h2>
                  <p>Add some products to your cart to continue.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <article key={item.id} className={styles.item}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className={styles.image}
                      />
                    </div>

                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>{item.product.name}</h3>
                      <div className={styles.itemDetails}>
                        <span>Size: {item.size || 'N/A'}</span>
                        <span className={styles.detailSeparator}>|</span>
                        <span>Color: {item.color || 'N/A'}</span>
                      </div>
                      <p className={styles.price}>
                        ${Number(item.product.price).toFixed(0)}
                      </p>
                    </div>

                    <div className={styles.quantity}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={styles.qtyButton}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={styles.qtyButton}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </article>
                ))
              )}
            </section>

            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span className={styles.summaryValue}>${subtotal.toFixed(0)}</span>
              </div>

              {appliedDiscount && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    Discount (-{appliedDiscount}%)
                  </span>
                  <span className={styles.summaryValueDiscount}>
                    -${discountAmount.toFixed(0)}
                  </span>
                </div>
              )}

              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Delivery Fee</span>
                <span className={styles.summaryValue}>${delivery.toFixed(0)}</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.total}>
                <span>Total</span>
                <strong>${total.toFixed(0)}</strong>
              </div>

              <div className={styles.promoSection}>
                <div className={styles.promoInput}>
                  <input
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={styles.promoCodeInput}
                  />
                </div>
                <button
                  type="button"
                  className={styles.applyButton}
                  onClick={handleApplyPromo}
                >
                  Apply
                </button>
              </div>

              <button
                type="button"
                className={styles.checkoutButton}
                disabled={cartItems.length === 0}
              >
                Go to Checkout
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Cart
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import styles from './Cart.module.css'
import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

// ──────────────────────────────────────────────
// Checkout Modal
// ──────────────────────────────────────────────
interface CheckoutModalProps {
  total: number
  onClose: () => void
}

function CheckoutModal({ total, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    payment: 'card',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.zip.trim()) e.zip = 'Required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStep('success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {step === 'form' ? (
          <>
            <h2 className={styles.modalTitle}>Checkout</h2>
            <p className={styles.modalSubtitle}>
              Order total: <strong>${total.toFixed(0)}</strong>
            </p>

            <form className={styles.checkoutForm} onSubmit={handleSubmit} noValidate>
              {/* Personal */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Personal Info</legend>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>First Name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                      placeholder="John"
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Last Name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>
                </div>
              </fieldset>

              {/* Shipping */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Shipping Address</legend>
                <div className={styles.field}>
                  <label className={styles.label}>Street Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                    placeholder="123 Main St"
                  />
                  {errors.address && <span className={styles.error}>{errors.address}</span>}
                </div>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>City</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                      placeholder="New York"
                    />
                    {errors.city && <span className={styles.error}>{errors.city}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>ZIP Code</label>
                    <input
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.zip ? styles.inputError : ''}`}
                      placeholder="10001"
                    />
                    {errors.zip && <span className={styles.error}>{errors.zip}</span>}
                  </div>
                </div>
              </fieldset>

              {/* Payment */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Payment Method</legend>
                <div className={styles.paymentOptions}>
                  {(['card', 'paypal', 'cash'] as const).map((method) => (
                    <label
                      key={method}
                      className={`${styles.paymentOption} ${form.payment === method ? styles.paymentOptionActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={form.payment === method}
                        onChange={handleChange}
                        className={styles.paymentRadio}
                      />
                      {method === 'card' && '💳 Credit / Debit Card'}
                      {method === 'paypal' && '🅿️ PayPal'}
                      {method === 'cash' && '💵 Cash on Delivery'}
                    </label>
                  ))}
                </div>
              </fieldset>

              <button type="submit" className={styles.submitButton}>
                Place Order — ${total.toFixed(0)}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Order Placed!</h2>
            <p className={styles.successText}>
              Thank you, {form.firstName}! Your order has been placed successfully.
              <br />
              We'll send a confirmation to <strong>{form.email}</strong>.
            </p>
            <button type="button" className={styles.successButton} onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Cart Page
// ──────────────────────────────────────────────
function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

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
    (total: number, item: any) => total + Number(item.product.price) * item.quantity,
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
                cartItems.map((item: any) => (
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
                onClick={() => setIsCheckoutOpen(true)}
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

      {isCheckoutOpen && (
        <CheckoutModal total={total} onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  )
}

export default Cart
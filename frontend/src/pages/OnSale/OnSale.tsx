import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './OnSale.module.css'

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
  description: string
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Biggest Discount' },
]

function OnSale() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/?sale=true')
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false))
  }, [])

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price-asc') return Number(a.price) - Number(b.price)
    if (sort === 'price-desc') return Number(b.price) - Number(a.price)
    if (sort === 'discount') return (b.discount_percent ?? 0) - (a.discount_percent ?? 0)
    return 0
  })

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className={styles.page}>
        {/* ── Hero Banner ── */}
        <div className={styles.heroBanner}>
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <span className={styles.heroBadge}>🔥 Limited Time Offers</span>
              <h1 className={styles.heroTitle}>
                BIG SALE<br />
                <span className={styles.heroHighlight}>Up to 40% Off</span>
              </h1>
              <p className={styles.heroText}>
                Don't miss our hottest deals on premium fashion. New discounts added weekly — shop before they're gone.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <strong>{isLoading ? '—' : products.length}</strong>
                  <span>Items on Sale</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <strong>Up to 40%</strong>
                  <span>Max Discount</span>
                </div>
                <div className={styles.heroStatDivider} />
                <div className={styles.heroStat}>
                  <strong>Free</strong>
                  <span>Returns</span>
                </div>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.discountCircle}>
                <span className={styles.discountCircleNum}>-40%</span>
                <span className={styles.discountCircleText}>TODAY ONLY</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Promo Strips ── */}
        <div className={styles.promoStrips}>
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders over $100' },
            { icon: '↩️', title: 'Easy Returns', sub: '30-day return policy' },
            { icon: '🔒', title: 'Secure Payment', sub: '100% protected checkout' },
            { icon: '💎', title: 'Premium Quality', sub: 'Handpicked items' },
          ].map((p) => (
            <div key={p.title} className={styles.promoStrip}>
              <span className={styles.promoStripIcon}>{p.icon}</span>
              <div>
                <strong>{p.title}</strong>
                <span>{p.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.container}>
          {/* ── Breadcrumbs ── */}
          <div className={styles.breadcrumbs}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.sep}>›</span>
            <span>On Sale</span>
          </div>

          {/* ── Toolbar ── */}
          <div className={styles.toolbar}>
            <h2 className={styles.sectionTitle}>
              Sale Items
              {!isLoading && <span className={styles.count}> ({products.length})</span>}
            </h2>
            <div className={styles.sortRow}>
              <label className={styles.sortLabel}>Sort by:</label>
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Products ── */}
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Loading sale items...</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>😔</div>
              <h3>No sale items right now</h3>
              <p>Check back soon — new deals drop every week!</p>
              <Link to="/" className={styles.emptyBtn}>Browse All Products</Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default OnSale

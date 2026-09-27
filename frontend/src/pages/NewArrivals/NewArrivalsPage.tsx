import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './NewArrivalsPage.module.css'

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

const FILTERS = [
  { key: 'all', label: 'All Items' },
  { key: 'new-arrivals', label: 'New Arrivals' },
  { key: 'top-selling', label: 'Top Selling' },
]

const FEATURES = [
  { icon: '✨', title: 'Fresh Weekly Drops', text: 'New styles added every Monday' },
  { icon: '📦', title: 'Express Shipping', text: 'Get it in 2-3 business days' },
  { icon: '🎯', title: 'Trend Forecast', text: 'Styles curated by our team' },
  { icon: '💯', title: 'Quality Guarantee', text: 'Love it or we replace it' },
]

function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const url = activeFilter === 'all'
      ? 'http://127.0.0.1:8000/api/products/'
      : `http://127.0.0.1:8000/api/products/?category=${activeFilter}`

    setIsLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false))
  }, [activeFilter])

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price-asc') return Number(a.price) - Number(b.price)
    if (sort === 'price-desc') return Number(b.price) - Number(a.price)
    if (sort === 'rating') return Number(b.rating) - Number(a.rating)
    return 0
  })

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className={styles.page}>
        {/* ─── Hero ─── */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>✨ Just Arrived</span>
            <h1 className={styles.heroTitle}>NEW ARRIVALS</h1>
            <p className={styles.heroSub}>
              Discover our freshest styles — meticulously crafted garments that define the season's must-have looks. Be the first to wear what's trending.
            </p>
            <div className={styles.heroActions}>
              <Link to="/sale" className={styles.heroActionOutline}>View Sale →</Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardLabel}>This Season</div>
              <div className={styles.heroCardTitle}>Fresh Drops</div>
              <div className={styles.heroCardSub}>Updated Weekly</div>
            </div>
          </div>
        </div>

        {/* ─── Features Row ─── */}
        <div className={styles.featuresRow}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureItem}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <div>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.container}>
          {/* ─── Breadcrumbs ─── */}
          <div className={styles.breadcrumbs}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.sep}>›</span>
            <span>New Arrivals</span>
          </div>

          {/* ─── Filter & Sort Toolbar ─── */}
          <div className={styles.toolbar}>
            <div className={styles.filterTabs}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`${styles.filterTab} ${activeFilter === f.key ? styles.filterTabActive : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className={styles.sortRow}>
              <span className={styles.resultsCount}>
                {isLoading ? '...' : `${products.length} items`}
              </span>
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* ─── Product Grid ─── */}
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Loading products...</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛍️</div>
              <h3>Nothing here yet</h3>
              <p>We're adding new items soon. Check back later!</p>
              <button type="button" className={styles.emptyBtn} onClick={() => setActiveFilter('all')}>
                Show All Items
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* ─── Trending Tags ─── */}
          <div className={styles.trending}>
            <h3 className={styles.trendingTitle}>Trending Now</h3>
            <div className={styles.tags}>
              {['#StreetStyle', '#CasualFit', '#SummerVibes', '#MinimalistFashion', '#OverSized', '#DenimLove', '#GraphicTees', '#MonoChrome'].map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ─── Lookbook CTA ─── */}
          <div className={styles.lookbookCta}>
            <div className={styles.lookbookCtaLeft}>
              <span className={styles.lookbookBadge}>Style Inspiration</span>
              <h3 className={styles.lookbookTitle}>Browse By Style</h3>
              <p className={styles.lookbookText}>
                Not sure what to pick? Explore curated outfit collections for every occasion — from casual to formal, streetwear to resort.
              </p>
              <Link to="/" className={styles.lookbookBtn}>
                Explore Styles →
              </Link>
            </div>
            <div className={styles.lookbookCtaRight}>
              <div className={styles.styleGrid}>
                {['Casual', 'Formal', 'Party', 'Gym'].map((s, i) => (
                  <div key={s} className={styles.styleChip} style={{ animationDelay: `${i * 0.1}s` }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default NewArrivalsPage

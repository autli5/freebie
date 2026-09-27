import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './BrandsPage.module.css'

const BRANDS = [
  {
    name: 'VERSACE',
    tagline: 'Italian luxury fashion house founded in 1978',
    emoji: '💎',
    bg: '#fdf6e3',
    accent: '#c9a84c',
    items: '120+ items',
    href: '/shop?brand=versace',
    featured: true,
  },
  {
    name: 'ZARA',
    tagline: 'Contemporary fashion for every occasion',
    emoji: '🛍️',
    bg: '#e8f4fd',
    accent: '#2980b9',
    items: '340+ items',
    href: '/shop?brand=zara',
    featured: true,
  },
  {
    name: 'GUCCI',
    tagline: 'The House of Gucci — iconic luxury style',
    emoji: '👑',
    bg: '#fdecea',
    accent: '#c0392b',
    items: '85+ items',
    href: '/shop?brand=gucci',
    featured: true,
  },
  {
    name: 'PRADA',
    tagline: 'Modern elegance and refined Italian craftsmanship',
    emoji: '✨',
    bg: '#eafdf5',
    accent: '#27ae60',
    items: '60+ items',
    href: '/shop?brand=prada',
    featured: false,
  },
  {
    name: 'Calvin Klein',
    tagline: 'Minimal. Modern. Quintessentially American.',
    emoji: '🖤',
    bg: '#f5f0ff',
    accent: '#8e44ad',
    items: '200+ items',
    href: '/shop?brand=calvin-klein',
    featured: false,
  },
  {
    name: 'H&M',
    tagline: 'Fashion & quality at the best price',
    emoji: '🌿',
    bg: '#f0fff4',
    accent: '#16a085',
    items: '500+ items',
    href: '/shop?brand=hm',
    featured: false,
  },
  {
    name: 'Nike',
    tagline: 'Just Do It — performance meets style',
    emoji: '👟',
    bg: '#e8f0fe',
    accent: '#2c3e50',
    items: '280+ items',
    href: '/shop?brand=nike',
    featured: false,
  },
  {
    name: 'Adidas',
    tagline: 'Impossible is Nothing — sportswear icon',
    emoji: '⚡',
    bg: '#fff3e0',
    accent: '#e67e22',
    items: '190+ items',
    href: '/shop?brand=adidas',
    featured: false,
  },
  {
    name: 'Levi\'s',
    tagline: 'The original American denim since 1853',
    emoji: '👖',
    bg: '#e3f2fd',
    accent: '#1565c0',
    items: '150+ items',
    href: '/shop?brand=levis',
    featured: false,
  },
  {
    name: 'Tommy Hilfiger',
    tagline: 'Classic American cool with a preppy twist',
    emoji: '⛵',
    bg: '#fce4ec',
    accent: '#c62828',
    items: '110+ items',
    href: '/shop?brand=tommy',
    featured: false,
  },
  {
    name: 'Ralph Lauren',
    tagline: 'The American dream, tailored to perfection',
    emoji: '🐎',
    bg: '#f3e5f5',
    accent: '#6a1b9a',
    items: '95+ items',
    href: '/shop?brand=ralph-lauren',
    featured: false,
  },
  {
    name: 'Supreme',
    tagline: 'Streetwear royalty — limited, exclusive, iconic',
    emoji: '🔴',
    bg: '#ffebee',
    accent: '#b71c1c',
    items: '40+ items',
    href: '/shop?brand=supreme',
    featured: false,
  },
]

const STATS = [
  { num: '200+', label: 'Global Brands' },
  { num: '50K+', label: 'Products' },
  { num: '2M+', label: 'Happy Customers' },
  { num: '150+', label: 'Countries Shipped' },
]

function BrandsPage() {
  const [search, setSearch] = useState('')

  const filtered = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  const featured = filtered.filter((b) => b.featured)
  const regular = filtered.filter((b) => !b.featured)

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className={styles.page}>
        {/* ─── Hero ─── */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>OUR BRANDS</h1>
            <p className={styles.heroSub}>
              From luxury maisons to streetwear icons — discover the world's most celebrated fashion brands, all in one place.
            </p>
            {/* Stats */}
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.container}>
          {/* ─── Breadcrumbs ─── */}
          <div className={styles.breadcrumbs}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.sep}>›</span>
            <span>Brands</span>
          </div>

          {/* ─── Search ─── */}
          <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <p className={styles.searchCount}>{filtered.length} brands</p>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>No brands found for "{search}"</h3>
              <p>Try a different search term.</p>
              <button type="button" onClick={() => setSearch('')} className={styles.emptyBtn}>
                Clear Search
              </button>
            </div>
          ) : (
            <>
              {/* ─── Featured Brands ─── */}
              {featured.length > 0 && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Featured Brands</h2>
                  <div className={styles.featuredGrid}>
                    {featured.map((brand) => (
                      <Link
                        key={brand.name}
                        to={brand.href}
                        className={styles.featuredCard}
                        style={{
                          '--bg': brand.bg,
                          '--accent': brand.accent,
                        } as React.CSSProperties}
                      >
                        <div className={styles.featuredCardTop}>
                          <span className={styles.cardEmoji}>{brand.emoji}</span>
                          <span className={styles.featuredBadge}>Featured</span>
                        </div>
                        <h3 className={styles.cardName}>{brand.name}</h3>
                        <p className={styles.cardTagline}>{brand.tagline}</p>
                        <div className={styles.cardFooter}>
                          <span className={styles.cardItems}>{brand.items}</span>
                          <span className={styles.cardArrow}>Shop Now →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* ─── All Brands ─── */}
              {regular.length > 0 && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>All Brands</h2>
                  <div className={styles.brandsGrid}>
                    {regular.map((brand) => (
                      <Link
                        key={brand.name}
                        to={brand.href}
                        className={styles.brandCard}
                        style={{
                          '--bg': brand.bg,
                          '--accent': brand.accent,
                        } as React.CSSProperties}
                      >
                        <span className={styles.brandEmoji}>{brand.emoji}</span>
                        <div className={styles.brandInfo}>
                          <h3 className={styles.brandName}>{brand.name}</h3>
                          <p className={styles.brandTagline}>{brand.tagline}</p>
                          <span className={styles.brandItems}>{brand.items}</span>
                        </div>
                        <span className={styles.brandArrow}>→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ─── Partner CTA ─── */}
          <div className={styles.partnerCta}>
            <div className={styles.partnerCtaLeft}>
              <h3 className={styles.partnerTitle}>Are You a Brand?</h3>
              <p className={styles.partnerText}>
                Join thousands of fashion brands on Shop.co. Reach millions of style-conscious shoppers worldwide and grow your business with us.
              </p>
              <div className={styles.partnerActions}>
                <a href="mailto:partners@shop.co" className={styles.partnerBtn}>
                  Become a Partner
                </a>
                <a href="#" className={styles.partnerBtnOutline}>
                  Learn More →
                </a>
              </div>
            </div>
            <div className={styles.partnerCtaRight}>
              <div className={styles.partnerBenefits}>
                {['Global Reach', 'Easy Setup', 'Analytics', 'Support 24/7'].map((b) => (
                  <div key={b} className={styles.partnerBenefit}>
                    <span>✓</span>
                    <span>{b}</span>
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

export default BrandsPage

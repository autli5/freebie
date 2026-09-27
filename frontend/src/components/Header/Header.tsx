import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

import { navigationItems } from '../../shared/navigation/navigation.data'
import styles from './Header.module.css'

function Header() {
  const [isShopOpen, setIsShopOpen] = useState(false)
  const shopRef = useRef<HTMLDivElement>(null)

  // Получаем актуальные данные корзины из глобального контекста
  const { cart } = useCart()

  // Считаем общее количество товаров в реальном времени
  const totalItems = cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) ?? 0

  // Закрываем дропдаун при клике вне его
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setIsShopOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={styles.header}>
      <div className="container">
        <a href="/" className={styles.logoLink}>
          <h1 className={styles.logo}>shop.co</h1>
        </a>

        <nav className={styles.navigation}>
          {navigationItems.map((item) =>
            item.children ? (
              // Shop с выпадающим меню
              <div
                key={item.label}
                className={styles.shopWrapper}
                ref={shopRef}
              >
                <button
                  type="button"
                  className={`${styles.navigationItem} ${isShopOpen ? styles.navigationItemActive : ''}`}
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  aria-haspopup="true"
                  aria-expanded={isShopOpen}
                >
                  {item.label}
                  <span className={`${styles.arrow} ${isShopOpen ? styles.arrowOpen : ''}`}>▼</span>
                </button>

                {isShopOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownGrid}>
                      {/* Категории */}
                      <div className={styles.dropdownSection}>
                        <p className={styles.dropdownSectionTitle}>Categories</p>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href!}
                            className={styles.dropdownLink}
                            onClick={() => setIsShopOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                      {/* Быстрые ссылки */}
                      <div className={styles.dropdownSection}>
                        <p className={styles.dropdownSectionTitle}>Discover</p>
                        <Link to="/new-arrivals" className={styles.dropdownLink} onClick={() => setIsShopOpen(false)}>
                          ✨ New Arrivals
                        </Link>
                        <Link to="/sale" className={styles.dropdownLink} onClick={() => setIsShopOpen(false)}>
                          🔥 On Sale
                        </Link>
                        <Link to="/brands" className={styles.dropdownLink} onClick={() => setIsShopOpen(false)}>
                          🏷️ Brands
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                to={item.href!}
                className={styles.navigationItem}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className={styles.search}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <input
            type="search"
            placeholder="Search for products..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.cart}>
          <Link to="/cart" className={styles.cartButton} aria-label="Shopping cart">
            <svg
              className={styles.cartIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 4H5L7.2 15.2C7.4 16.2 8.3 17 9.3 17H17.5C18.4 17 19.2 16.4 19.5 15.5L21 9H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20" r="1.5" fill="currentColor" />
              <circle cx="17" cy="20" r="1.5" fill="currentColor" />
            </svg>

            {totalItems > 0 && (
              <span className={styles.cartCount}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
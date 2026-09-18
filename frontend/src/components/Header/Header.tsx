import { useState } from 'react'

import { navigationItems } from '../../shared/navigation/navigation.data'
import styles from './Header.module.css'

function Header() {
  const [isShopOpen, setIsShopOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.logo}>shop.co</h1>

        <nav className={styles.navigation}>
          {navigationItems.map((item) =>
            item.children ? (
              <button
                key={item.label}
                type="button"
                className={styles.navigationItem}
                onClick={() => setIsShopOpen(!isShopOpen)}
              >
                {item.label}
                <span className={styles.arrow}>▼</span>
              </button>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className={styles.navigationItem}
              >
                {item.label}
              </a>
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
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16.5 16.5L21 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <input
            type="search"
            placeholder="Search for products..."
            className={styles.searchInput}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
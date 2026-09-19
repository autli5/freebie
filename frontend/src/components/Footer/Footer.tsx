import { useState } from 'react'
import styles from './Footer.module.css'

const footerLinks = {
  company: [
    { name: 'About', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Works', href: '#' },
    { name: 'Career', href: '#' },
  ],
  help: [
    { name: 'Customer Support', href: '#' },
    { name: 'Delivery Details', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  faq: [
    { name: 'Account', href: '#' },
    { name: 'Manage Deliveries', href: '#' },
    { name: 'Orders', href: '#' },
    { name: 'Payments', href: '#' },
  ],
  resources: [
    { name: 'Free eBooks', href: '#' },
    { name: 'Development Tutorial', href: '#' },
    { name: 'How to - Blog', href: '#' },
    { name: 'Youtube Playlist', href: '#' },
  ],
}

function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('http://localhost:8000/api/reviews/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setMessage(data.error || data.message)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <footer className={styles.footer}>
      {/* Newsletter секция */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>
              STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS
            </h2>
          </div>

          <form onSubmit={handleSubmit} className={styles.newsletterForm}>
            <div className={styles.inputWrapper}>
              <svg className={styles.emailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
            
            <button 
              type="submit" 
              className={styles.subscribeButton}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe to Newsletter'}
            </button>

            {message && (
              <div className={`${styles.message} ${status === 'success' ? styles.success : styles.error}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Основной footer */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.mainContent}>
            {/* Бренд */}
            <div className={styles.brand}>
              <h3 className={styles.brandName}>SHOP.CO</h3>
              <p className={styles.brandDescription}>
                We have clothes that suits your style and which you're proud to wear. From women to men.
              </p>
              
              {/* Социальные иконки */}
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Колонки ссылок */}
            <div className={styles.linksGrid}>
              <div className={styles.linksColumn}>
                <h4 className={styles.columnTitle}>COMPANY</h4>
                <ul className={styles.linksList}>
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className={styles.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.linksColumn}>
                <h4 className={styles.columnTitle}>HELP</h4>
                <ul className={styles.linksList}>
                  {footerLinks.help.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className={styles.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.linksColumn}>
                <h4 className={styles.columnTitle}>FAQ</h4>
                <ul className={styles.linksList}>
                  {footerLinks.faq.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className={styles.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.linksColumn}>
                <h4 className={styles.columnTitle}>RESOURCES</h4>
                <ul className={styles.linksList}>
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className={styles.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Нижняя часть */}
          <div className={styles.bottomBar}>
            <p className={styles.copyright}>
              Shop.co © 2000-{currentYear}, All Rights Reserved
            </p>
            
            <div className={styles.paymentMethods}>
              <div className={styles.paymentIcon}>VISA</div>
              <div className={styles.paymentIcon}>Mastercard</div>
              <div className={styles.paymentIcon}>PayPal</div>
              <div className={styles.paymentIcon}>Apple Pay</div>
              <div className={styles.paymentIcon}>Google Pay</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
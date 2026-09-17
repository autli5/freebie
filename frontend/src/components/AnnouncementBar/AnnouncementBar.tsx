import { useState } from 'react'

import styles from './AnnouncementBar.module.css'

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className={styles.announcementBar}>
      <p className={styles.text}>
        Sign up and get 20% off to your first order.{' '}
        <button type="button" className={styles.signUp}>
          Sign Up Now
        </button>
      </p>

      <button
        type="button"
        className={styles.close}
        aria-label="Close announcement"
        onClick={() => setIsVisible(false)}
      >
        ×
      </button>
    </div>
  )
}

export default AnnouncementBar
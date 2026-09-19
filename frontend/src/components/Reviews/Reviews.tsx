import { useEffect, useState } from 'react'
import styles from './Reviews.module.css'

interface Review {
  id: number
  customer_name: string
  rating: number
  comment: string
  verified: boolean
}

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('http://localhost:8000/api/reviews/latest/')
      .then(res => res.json())
      .then(data => {
        setReviews(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching reviews:', err)
        setLoading(false)
      })
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => 
      prev + 3 >= reviews.length ? 0 : prev + 1
    )
  }

  const prevReview = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? Math.max(0, reviews.length - 3) : prev - 1
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ))
  }

  if (loading) return <div className={styles.loading}>Loading reviews...</div>
  if (reviews.length === 0) return <div className={styles.empty}>No reviews yet</div>

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>OUR HAPPY CUSTOMERS</h2>
        <div className={styles.navigation}>
          <button onClick={prevReview} className={styles.navButton}>←</button>
          <button onClick={nextReview} className={styles.navButton}>→</button>
        </div>
      </div>

      <div className={styles.reviewsGrid}>
        {reviews.slice(currentIndex, currentIndex + 3).map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.stars}>
              {renderStars(review.rating)}
            </div>
            <div className={styles.customer}>
              <h3 className={styles.customerName}>{review.customer_name}</h3>
              {review.verified && <span className={styles.verifiedBadge}>✓</span>}
            </div>
            <p className={styles.comment}>"{review.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews
import styles from './Hero.module.css'

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.headline}>
            Find clothes<br />that matches<br />your style
          </h1>
          <p className={styles.description}>
            Browse through our diverse range of meticulously crafted garments, 
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <button className={styles.ctaButton}>Shop Now</button>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>200+</span>
              <span className={styles.statLabel}>International Brands</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2,000+</span>
              <span className={styles.statLabel}>High-Quality Products</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>30,000+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <SparkleIcon className={`${styles.sparkle} ${styles.sparkleTop}`} />
          <SparkleIcon className={`${styles.sparkle} ${styles.sparkleMiddle}`} />
          <img 
            src="../../../public/images/hero_background.png" 
            alt="Fashion models" 
            className={styles.heroImage}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
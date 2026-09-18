import styles from './Brends.module.css'

function Brands() {
  const brands = [
    { name: 'VERSACE', className: styles.versace },
    { name: 'ZARA', className: styles.zara },
    { name: 'GUCCI', className: styles.gucci },
    { name: 'PRADA', className: styles.prada },
    { name: 'Calvin Klein', className: styles.calvinKlein }
  ]

  return (
    <div className={styles.brands}>
      <div className={styles.container}>
        {brands.map((brand, index) => (
          <div key={index} className={`${styles.brandItem} ${brand.className}`}>
            {brand.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Brands
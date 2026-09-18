import styles from './ProductCard.module.css'

type Product = {
  id: number
  name: string
  image: string
  rating: number
  price: string
  old_price: string | null
  discount_percent: number | null
  category: number
}

type ProductsCardProps = {
  product: Product
}

function ProductsCard({ product }: ProductsCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
      </div>

      <h3 className={styles.name}>{product.name}</h3>

      <div className={styles.rating}>
        <span className={styles.stars}>★★★★★</span>
        <span className={styles.ratingValue}>
          {product.rating}/5
        </span>
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>
          ${Number(product.price).toFixed(0)}
        </span>

        {product.old_price && (
          <span className={styles.oldPrice}>
            ${Number(product.old_price).toFixed(0)}
          </span>
        )}

        {product.discount_percent && (
          <span className={styles.discount}>
            -{product.discount_percent}%
          </span>
        )}
      </div>
    </article>
  )
}

export default ProductsCard
import { useEffect, useState } from 'react'

import styles from './NewArrivals.module.css'
import ProductsCard from '../ProductCard/ProductCard'

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

function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>NEW ARRIVALS</h2>

        <div className={styles.products}>
          {products.slice(0, 4).map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <button type="button" className={styles.viewAll}>
          View All
        </button>
      </div>
    </section>
  )
}

export default NewArrivals
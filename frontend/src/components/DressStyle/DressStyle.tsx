import { useEffect, useState } from 'react'

import styles from './DressStyle.module.css'

type DressStyleItem = {
  id: number
  name: string
  image: string
}

function DressStyle() {
  const [dressStyles, setDressStyles] = useState<DressStyleItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dress-styles/')
      .then((response) => response.json())
      .then((data) => {
        setDressStyles(data)
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
        <h2 className={styles.title}>BROWSE BY DRESS STYLE</h2>

        <div className={styles.styles}>
          {dressStyles.map((dressStyle) => (
            <article key={dressStyle.id} className={styles.card}>
              <img
                src={dressStyle.image}
                alt={dressStyle.name}
                className={styles.image}
              />

              <h3 className={styles.name}>{dressStyle.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DressStyle
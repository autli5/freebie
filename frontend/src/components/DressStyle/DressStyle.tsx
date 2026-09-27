import { useEffect, useState } from 'react'
import styles from './DressStyle.module.css'

type DressStyleItem = {
  id: number
  name: string
  image: string
}

// Статические fallback данные если API пустой
const FALLBACK_STYLES: DressStyleItem[] = [
  { id: 1, name: 'Casual', image: '' },
  { id: 2, name: 'Formal', image: '' },
  { id: 3, name: 'Party', image: '' },
  { id: 4, name: 'Gym', image: '' },
]

// Цвета для fallback карточек
const CARD_COLORS = ['#F5E6D3', '#D3E6F5', '#F5D3E6', '#D3F5D3']
const CARD_ICONS = ['☀️', '👔', '🎉', '💪']

function DressStyle() {
  const [dressStyles, setDressStyles] = useState<DressStyleItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dress-styles/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDressStyles(data)
        } else {
          setDressStyles(FALLBACK_STYLES)
        }
      })
      .catch(() => {
        setDressStyles(FALLBACK_STYLES)
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
          {dressStyles.map((dressStyle, idx) => (
            <article
              key={dressStyle.id}
              className={styles.card}
              style={!dressStyle.image ? { backgroundColor: CARD_COLORS[idx % CARD_COLORS.length] } : undefined}
            >
              {dressStyle.image ? (
                <img
                  src={dressStyle.image}
                  alt={dressStyle.name}
                  className={styles.image}
                />
              ) : (
                <div className={styles.placeholderIcon}>
                  {CARD_ICONS[idx % CARD_ICONS.length]}
                </div>
              )}

              <h3 className={styles.name}>{dressStyle.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DressStyle
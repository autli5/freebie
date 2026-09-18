import type { NavigationItem } from './navigation.types'

export const navigationItems: NavigationItem[] = [
  {
    label: 'Shop',
    children: [
      {
        label: 'All',
        href: '/shop',
      },
      {
        label: 'Men',
        href: '/shop/men',
      },
      {
        label: 'Women',
        href: '/shop/women',
      },
    ],
  },
  {
    label: 'On Sale',
    href: '/sale',
  },
  {
    label: 'New Arrivals',
    href: '/new-arrivals',
  },
  {
    label: 'Brands',
    href: '/brands',
  },
]
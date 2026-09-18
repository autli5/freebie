import AnnouncementBar from '../../components/AnnouncementBar/AnnouncementBar'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Brends from '../../components/Brends/Brends'
import Arrivals from '../../components/NewArrivals/NewArrivals'
import TopSelling from '../../components/TopSelling/TopSelling'
import DressStyle from '../../components/DressStyle/DressStyle'

function Home() {
  return (
    <>
      <AnnouncementBar />

      <Header />

      <Hero />

      <Brends />

      <Arrivals />

      <TopSelling />

      <DressStyle />
    </>
  )
}

export default Home
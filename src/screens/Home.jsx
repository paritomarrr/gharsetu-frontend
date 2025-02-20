import { useEffect } from "react"
import CityWiseProperties from "../components/CityWiseProperties"
import FeatutedProperties from "../components/FeatutedProperties"
import SearchTab from "../components/SearchTab"
import useUserAddress from "../helperFunctions/useUserAddress"
import { Link } from "react-router-dom"
import ArticleCarousel from "../components/ArticleCarousel"

const Home = () => {
  const { location, address, error } = useUserAddress();
  const city = 'Ghaziabad';

  useEffect(() => {
    document.title = 'Gharsetu | Buy, Sell & Rent Verified Properties';
  }, []);

  return (
    <div className='flex flex-col gap-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24'>
      <div className="py-6 flex justify-center">
        <SearchTab />
      </div>

      <div className="flex flex-col gap-4 md:gap-7">
        <h1 className="font-bold text-xl sm:text-2xl text-[#222]">Featured Real Estate Projects</h1>
        <FeatutedProperties />
      </div>

      <div className="flex flex-col gap-4 md:gap-7">
        <h1 className="font-bold text-xl sm:text-2xl text-[#222]">Latest Properties in {city}</h1>
        <CityWiseProperties city={city}/>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-base sm:text-lg font-medium">Continue exploring amazing views</div>
        <Link to={'/properties/buy'} className="py-3 px-4 sm:px-6 rounded-lg bg-black text-white">Show More</Link>
      </div>

       {/* Articles Carousel Section */}
       <div className="mb-6 p-2">
       <ArticleCarousel />
       </div>
    </div>
  )
}

export default Home

import { useEffect } from "react"
import CityWiseProperties from "../components/CityWiseProperties"
import FeatutedProperties from "../components/FeatutedProperties"
import SearchTab from "../components/SearchTab"
import useUserAddress from "../helperFunctions/useUserAddress"

const Home = () => {
  const { location, address, error } = useUserAddress();

  console.log({ location, address, error });

  return (
    <div className='flex flex-col gap-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24'>
      <div className="py-6 flex justify-center">
        <SearchTab />
      </div>

      <div className="flex flex-col gap-4 md:gap-7">
        <h2 className="font-bold text-xl sm:text-2xl text-[#222]">Feature Real Estate Projects</h2>
        <FeatutedProperties />
      </div>

      <div className="flex flex-col gap-4 md:gap-7">
        <h2 className="font-bold text-xl sm:text-2xl text-[#222]">Latest Properties on Ghaziabad</h2>
        <CityWiseProperties />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-base sm:text-lg font-medium">Continue exploring amazing views</div>
        <button className="py-3 px-4 sm:px-6 rounded-lg bg-black text-white">Show More</button>
      </div>
    </div>
  )
}

export default Home

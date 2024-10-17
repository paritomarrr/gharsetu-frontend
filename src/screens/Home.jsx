import CityWiseProperties from "../components/CityWiseProperties"
import FeatutedProperties from "../components/FeatutedProperties"
import SearchTab from "../components/SearchTab"


const Home = () => {
  return (
    <div className='px-[70px] flex flex-col gap-[70px]'>
      <div className="py-6 flex justify-center">
        <SearchTab />
      </div>

      <div className="flex flex-col gap-7">
        <div className="font-bold text-2xl text-[#222]"> Feature Real Estate Projects </div>
        <FeatutedProperties />
      </div>

      <div className="flex flex-col gap-7">
        <div className="font-bold text-2xl text-[#222]"> Latest Properties on Ghaziabad </div>
        <CityWiseProperties />
      </div>

      <div className="flex justify-center items-center gap-4 flex-col">
        <div className="text-lg font-medium">Continue exploring amazing views</div>
        <button className="py-[14px] px-6 rounded-lg bg-black text-white"> Show More </button>
      </div>
    </div>
  )
}

export default Home
import { useEffect, useState } from "react"
import PropertyCard from "./common/PropertyCard"
import axios from "axios"
import PropertyCardSkeleton from "./common/Skeleton"
import { backend_url } from "../config"

const CityWiseProperties = ({city}) => {

  const [cityProperties, setCityProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    const getPropertiesInCity = async () => {
      const res = await axios.post(`${backend_url}/api/v1/properties/getProertiesByCity`, {
        city: city
      })
      setCityProperties(res.data.properties)
    }
    getPropertiesInCity()
    setLoading(false)
  },[city])
  

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-4">
        {[...Array(8)].map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-4">
      {
        cityProperties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))
      }
    </div>
  )
}

export default CityWiseProperties
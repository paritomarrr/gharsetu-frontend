import { useEffect, useState } from "react"
import PropertyCard from "./common/PropertyCard"
import { getRecentproperties } from "../helperFunctions/propertyHelpers/getRecentproperties"



const FeatutedProperties = () => {
  const [properties, setProperties] = useState([])

  useEffect(()=>{
    const getData = async () => {
      const res = await getRecentproperties()
      setProperties(res)
    }
    getData()
  },[])

  
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-10">
      {
        properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))
      }
    </div>
  )
}

export default FeatutedProperties
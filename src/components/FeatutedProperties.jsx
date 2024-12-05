import { useEffect, useState } from "react"
import PropertyCard from "./common/PropertyCard"
import { getRecentproperties } from "../helperFunctions/propertyHelpers/getRecentproperties"
import { PropertyCardSkeleton } from '../components/common/Skeleton'

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const res = await getRecentproperties()
        setProperties(res)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-10">
        {[...Array(8)].map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-10">
      {properties.map(property => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  )
}

export default FeaturedProperties
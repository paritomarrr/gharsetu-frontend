import Separator from '../components/Separator'

const PostProperty = () => {
  return (
    <div className="h-[calc(100vh-158px)] flex items-center justify-center">
      <div className='text-5xl font-bold w-1/2 px-28'>
        Get started with posting your property on Gharsetu
      </div>
      <div className='w-1/2 flex flex-col px-28'>
        <div>
          <div className='text-2xl font-semibold'>
            Personal Information
          </div>
          <div>
            Provide your details, including who is listing the property and your contact information. We’ll use this to communicate with potential buyers or renters.
          </div>
        </div>
        <Separator />
        <div>
          <div className='text-2xl font-semibold'>
            Basic Property Details
          </div>
          <div>
            Tell us about the property, whether it’s residential or commercial, and whether you’re looking to sell or rent. This helps us categorize your listing.
          </div>
        </div>
        <Separator />
        <div>
          <div className='text-2xl font-semibold'>
            Property Specific Details
          </div>
          <div>
            Provide more specifics about your property, such as the BHK configuration, locality, and amenities. The more details you add, the better your listing will attract the right buyers or renters.          </div>
        </div>
      </div>
    </div>
  )
}

export default PostProperty
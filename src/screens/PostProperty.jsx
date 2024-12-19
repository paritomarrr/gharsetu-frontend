const PostProperty = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row h-[80vh] md:overflow-hidden overflow-scroll">
      {/* Left Side Heading */}
      <div className="md:w-1/2 w-full py-8 md:py-16 flex items-center justify-center px-6 md:px-20">
        <h1 className="text-3xl md:text-5xl font-bold text-black leading-snug">
          Get Started with Posting Your Property on Gharsetu
        </h1>
      </div>

      {/* Right Side Steps */}
      <div className="md:w-1/2 w-full relative flex flex-col justify-center px-6 md:px-20 py-8 md:py-12">
        <div className="flex flex-col gap-8 md:gap-12">

          {/* Step 1 */}
          <div className="flex items-start relative">
            <div className="flex-shrink-0 relative">
              {/* Circle for Step 1 */}
              <div className="w-8 h-8 bg-gray-100 text-black flex items-center justify-center rounded-full text-sm font-medium border border-gray-300">
                1
              </div>
              {/* Vertical line extending below step 1 circle */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-24 md:h-32 bg-gray-200"></div>
            </div>
            <div className="ml-4">
              <div className="text-lg md:text-xl font-semibold text-black mb-2">Personal Information</div>
              <div className="text-sm md:text-md text-gray-600 leading-relaxed">
                Provide your details, including who is listing the property and your contact information. We’ll use this to communicate with potential buyers or renters.
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start relative">
            <div className="flex-shrink-0 relative">
              {/* Circle for Step 2 */}
              <div className="w-8 h-8 bg-gray-100 text-black flex items-center justify-center rounded-full text-sm font-medium border border-gray-300">
                2
              </div>
              {/* Vertical line extending below step 2 circle */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-24 md:h-32 bg-gray-200"></div>
            </div>
            <div className="ml-4">
              <div className="text-lg md:text-xl font-semibold text-black mb-2">Basic Property Details</div>
              <div className="text-sm md:text-md text-gray-600 leading-relaxed">
                Tell us about the property, whether it’s residential or commercial, and whether you’re looking to sell or rent. This helps us categorize your listing.
              </div>
            </div>
          </div>

          {/* Step 3 (no line after since it's last) */}
          <div className="flex items-start relative">
            <div className="flex-shrink-0 relative">
              {/* Circle for Step 3 */}
              <div className="w-8 h-8 bg-gray-100 text-black flex items-center justify-center rounded-full text-sm font-medium border border-gray-300">
                3
              </div>
              {/* No line here since it's the last step */}
            </div>
            <div className="ml-4">
              <div className="text-lg md:text-xl font-semibold text-black mb-2">Property Specific Details</div>
              <div className="text-sm md:text-md text-gray-600 leading-relaxed">
                Provide more specifics about your property, such as the BHK configuration, locality, and amenities. The more details you add, the better your listing will attract the right buyers or renters.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;

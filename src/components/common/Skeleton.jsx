import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export const PropertyCardSkeleton = () => {
  return (
    <Skeleton height="200px" width="100%" borderRadius="md" />
  )
}

export const ImageGallerySkeleton = () => {
  const renderMainSkeleton = () => (
    <div className="w-1/2">
      <div className="w-full h-[428px] bg-gray-200 animate-pulse rounded-l-xl" />
    </div>
  );

  const renderThumbnailSkeletons = () => (
    <div className="grid grid-cols-2 gap-2 w-1/2">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={`h-[210px] w-full bg-gray-200 animate-pulse ${index === 2 ? "rounded-tr-xl" : index === 4 ? "rounded-br-xl" : ""
            }`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex gap-2 w-full px-36 py-5">
      {renderMainSkeleton()}
      {renderThumbnailSkeletons()}

      <div className='relative'>
        <div className="absolute bottom-5 right-7 bg-white flex gap-2 items-center px-4 py-2 rounded-lg shadow-sm">
          <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export default ImageGallerySkeleton;
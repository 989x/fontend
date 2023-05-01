import { useState } from 'react'

type PostImage = {
  url: string
  alt: string
}

type Post = {
  title: string
  images: PostImage[]
}

type Props = {
  post: Post
}

const IndexPage = ({ post }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    // TODO: Implement modal logic
  }

  return (
    <div className="container mx-auto py-8">
      {/* Post title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Image gallery */}
      <div className="relative mb-4">
        {post.images.map((image: PostImage, index: number) => (
          <div key={index} className="relative">
            <img
              className={`max-h-60 sm:max-h-80 max-w-fit rounded-md border-2 cursor-pointer ${
                index === selectedImageIndex ? 'border-blue-500' : ''
              }`}
              src={image.url}
              alt={image.alt}
              onClick={() => openModal(index)}
            />
            {index === 0 && (
              <div className="absolute bottom-0 left-0 mb-2 ml-2 text-white font-bold rounded-md bg-gray-700 px-2">
                {post.images.length} Images
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndexPage

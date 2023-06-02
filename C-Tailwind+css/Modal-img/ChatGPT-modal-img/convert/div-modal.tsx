import { useState } from 'react';
import axios from 'axios';

const Post = ({ post }:any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: any) => {
    setSelectedImageIndex(index);
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("active");
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("active");
  };

  return (
    <div className="container mx-auto py-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="mb-4 flex overflow-x-scroll space-x-0.5">
          {post.images.map((image:any, index:any) => (
            <div key={index}>
              <img
                className="max-h-60 sm:max-h-80 max-w-fit rounded-md border-2"
                src={image}
                alt={post.title}
                onClick={() => openModal(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="overlay">
        {selectedImageIndex !== null && (
          <img
            src={post.images[selectedImageIndex]}
            alt={post.title}
            onClick={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context:any) {
  const { title } = context.params;
  const response = await axios.get(`http://localhost:5000/estate?title=${title}`)
  const posts = response.data

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  const post = posts[0];

  return {
    props: {
      post: post || null,
    },
  };
}

export default Post;

import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Modal from '../../components/Modal';

interface Post {
  title: string;
  description: string;
  images: string[];
}

interface Props {
  post: Post | null;
}

const PostPage = ({ post }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(0);
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedImageIndex < post?.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="mb-4 flex overflow-x-scroll space-x-0.5">
            {post.images.map((image, index) => (
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
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <div className="relative h-full">
                <button
                  className="absolute top-1/2 left-0 text-white z-10 transform -translate-y-1/2 px-4 py-2 bg-black"
                  onClick={handlePrev}
                >
                  Prev
                </button>
                <button
                  className="absolute top-1/2 right-0 text-white z-10 transform -translate-y-1/2 px-4 py-2 bg-black"
                  onClick={handleNext}
                >
                  Next
                </button>
                <img
                  className="h-full mx-auto"
                  src={post.images[selectedImageIndex]}
                  alt={post.title}
                />
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { title } = context.params!;
  const response = await axios.get(`http://localhost:5000/estate?title=${title}`);
  const posts = response.data;

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
};

export default PostPage;

import { GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  images: string[];
}

interface Props {
  post: Post;
}

const overlayStyles = {
  overlay:
    "fixed z-50 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center",
  active: "block",
  inactive: "hidden",
  "image-container":
    "relative flex justify-center items-center max-w-screen max-h-screen",
  "slice-button":
    "absolute bg-white bg-opacity-50 rounded-full px-2 py-1 text-xl font-bold text-gray-800 z-10",
  left: "left-4",
  right: "right-4",
  close:
    "absolute top-0 right-0 m-4 p-2 text-lg text-white font-bold bg-red-500 rounded-full z-20 cursor-pointer",
};

const PostPage: React.FC<Props> = ({ post }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevImage = () => {
    setSelectedImageIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      {/* Image gallery */}
      <div className="mb-4 flex overflow-x-scroll space-x-0.5">
        {post.images.map((image: any, index: any) => (
          <div key={index}>
            <img
              className="max-h-60 sm:max-h-80 max-w-fit rounded-md border-2 relative"
              src={image}
              alt={post.title}
              onClick={() => openModal(index)}
            />
            <div className="absolute bottom-0 left-0 bg-gray-800 bg-opacity-50 text-white p-2 w-full">
              <div className="flex justify-between">
                <span>Image {index + 1} of {post.images.length}</span>
                <span>{post.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image overlay */}
      {selectedImageIndex !== null && (
        <div className={`${overlayStyles.overlay} ${overlayStyles.active}`}>
          <button
            className={overlayStyles.close}
            onClick={closeModal}
          >
            X
          </button>
          <div className={overlayStyles["image-container"]}>
            <img
              src={post.images[selectedImageIndex]}
              alt={post.title}
              onClick={closeModal}
            />
            <div className={overlayStyles["image-info"]}>
              <div className={overlayStyles["image-number"]}>
                <span>
                  {selectedImageIndex + 1}/{post.images.length}
                </span>
                <span>{post.title}</span>
              </div>
            </div>
            {selectedImageIndex !== 0 && (
              <button
                className={`${overlayStyles["slice-button"]} ${overlayStyles["left"]}`}
                onClick={goToPrevImage}
              >
                &larr;
              </button>
            )}
            {selectedImageIndex !== post.images.length - 1 && (
              <button
                className={`${overlayStyles["slice-button"]} ${overlayStyles["right"]}`}
                onClick={goToNextImage}
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { title } = params;
  const { data: post } = await axios.get<Post>(
      http://localhost:5000/estate?title=${title}
    );
  return { props: { post } };
};
    
export default PostPage;
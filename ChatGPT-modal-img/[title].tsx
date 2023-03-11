import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import styles from '../../styles/Home.module.css';
import overlayStyles from '../../styles/overlay.module.css';

type Props = {
  post: {
    title: string;
    date: string;
    content: string;
    images: string[];
  };
};

const PostPage = ({ post }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const router = useRouter();

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    document.body.classList.add(overlayStyles.noScroll);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    document.body.classList.remove(overlayStyles.noScroll);
  };

  const goToPrevImage = () => {
    if (selectedImageIndex === null || selectedImageIndex === 0) {
      return;
    }

    setSelectedImageIndex(selectedImageIndex - 1);
  };

  const goToNextImage = () => {
    if (selectedImageIndex === null || selectedImageIndex === post.images.length - 1) {
      return;
    }

    setSelectedImageIndex(selectedImageIndex + 1);
  };

  if (!router.isFallback && !post?.title) {
    return <p>404 - Page Not Found</p>;
  }

  return (
    <Layout title={post.title}>
      <article className="mx-auto my-4 max-w-2xl">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <div
          className={styles['markdown']}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        ></div>
        {/* Image gallery */}
        <div className="mb-4 flex overflow-x-scroll space-x-0.5">
          {post.images.map((image: any, index: any) => (
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
      </article>
      {/* Image overlay */}
      {selectedImageIndex !== null && (
        <div className={`${overlayStyles.overlay} ${overlayStyles.active}`}>
          <div className={overlayStyles['image-container']}>
            <img
              src={post.images[selectedImageIndex]}
              alt={post.title}
              onClick={closeModal}
            />
            {selectedImageIndex !== 0 && (
              <button
                className={`${overlayStyles['slice-button']} ${overlayStyles['left']}`}
                onClick={goToPrevImage}
              >
                &larr;
              </button>
            )}
            {selectedImageIndex !== post.images.length - 1 && (
              <button
                className={`${overlayStyles['slice-button']} ${overlayStyles['right']}`}
                onClick={goToNextImage}
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PostPage;

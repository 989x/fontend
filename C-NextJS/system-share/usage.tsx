import React from 'react';
import { BreadcrumbsFull } from './BreadcrumbsFull'; // Adjust the import path based on your file structure

interface PostProps {
  post: {
    // ... (other post properties)
    desc: {
      about: string;
    };
  };
}

export function PostComponent({ post }: PostProps) {
  const truncatedDescription = post.desc.about.substring(0, 60);

  return (
    <div>
      {/* ... (other JSX) */}
      <p>{truncatedDescription}</p>
      {/* ... (other JSX) */}

      {/* Example usage of BreadcrumbsFull */}
      <BreadcrumbsFull
        specialBreadcrumb={{ label: 'Special', url: '/special' }}
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Posts', url: '/posts' },
        ]}
        sharedProperty={{
          imageUrl: '/path/to/image.jpg',
          name: 'Post Name',
          description: truncatedDescription, // Pass the truncated description
          propertyLink: 'http://localhost:3000/post/123',
        }}
      />
    </div>
  );
}

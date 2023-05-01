import React from 'react';

const MyComponent = ({ post }) => {
  const formattedDate = formatDate(post.updatedAt);

  return (
    <div className="text-gray-600 font-medium flex items-center">
      <div className="hidden sm:flex mr-1">Update</div>
      {formattedDate}
    </div>
  );
};

export default MyComponent;

import React from "react";

interface Props {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ pages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const renderDotsStart = currentPage > 3 && pages > 5;
  const renderDotsEnd = pages - currentPage > 2 && pages > 5;
  const dotsStart = <span className="mx-2">...</span>;
  const dotsEnd = <span className="mx-2">...</span>;

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center my-4">
      {currentPage > 1 && (
        <button className="mx-2" onClick={() => handleClick(currentPage - 1)}>
          {"<"}
        </button>
      )}

      {pageNumbers.map((page) => {
        if (page === currentPage) {
          return (
            <span className="mx-2 font-bold" key={page}>
              {page}
            </span>
          );
        } else if (page === 1) {
          return (
            <button className="mx-2" key={page} onClick={() => handleClick(page)}>
              {page}
            </button>
          );
        } else if (page === pages) {
          return (
            <button className="mx-2" key={page} onClick={() => handleClick(page)}>
              {page}
            </button>
          );
        } else if (
          (page >= currentPage - 1 && page <= currentPage + 1) ||
          (page === 2 && currentPage === 1) ||
          (page === pages - 1 && currentPage === pages)
        ) {
          return (
            <button className="mx-2" key={page} onClick={() => handleClick(page)}>
              {page}
            </button>
          );
        } else if (page === currentPage - 2 && renderDotsStart) {
          return dotsStart;
        } else if (page === currentPage + 2 && renderDotsEnd) {
          return dotsEnd;
        } else {
          return null;
        }
      })}

      {currentPage < pages && (
        <button className="mx-2" onClick={() => handleClick(currentPage + 1)}>
          {">"}
        </button>
      )}
    </div>
  );
};

export default Pagination;

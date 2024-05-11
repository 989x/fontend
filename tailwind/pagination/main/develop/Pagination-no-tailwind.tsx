import React from "react";

interface PaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  currentPage,
  onPageChange,
}) => {
  const visiblePages = 5; // number of visible page numbers
  const halfVisiblePages = Math.floor(visiblePages / 2);
  const rangeStart = Math.max(currentPage - halfVisiblePages, 1);
  const rangeEnd = Math.min(currentPage + halfVisiblePages, pages);

  const pagesArray = [];

  // Add ellipsis before the first page if necessary
  if (rangeStart > 1) {
    pagesArray.push(
      <button
        key={1}
        className="pagination-item"
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );
    if (rangeStart > 2) {
      pagesArray.push(<span key="ellipsis-start">...</span>);
    }
  }

  // Add visible pages
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pagesArray.push(
      <button
        key={i}
        className={`pagination-item${i === currentPage ? " active" : ""}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  // Add ellipsis after the last page if necessary
  if (rangeEnd < pages) {
    if (rangeEnd < pages - 1) {
      pagesArray.push(<span key="ellipsis-end">...</span>);
    }
    pagesArray.push(
      <button
        key={pages}
        className="pagination-item"
        onClick={() => onPageChange(pages)}
      >
        {pages}
      </button>
    );
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-item"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pagesArray}
      <button
        className="pagination-item"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

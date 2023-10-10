interface Props {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pages, currentPage, onPageChange }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const renderDotsStart = currentPage > 3 && pages > 5;
  const renderDotsEnd = pages - currentPage > 2 && pages > 5;
  const dotsStart = (
    <span
      className="inline-flex h-10 w-10 items-center justify-center text-gray-600"
      key={"dotsStart"}
    >
      ...
    </span>
  );
  const dotsEnd = (
    <span
      className="inline-flex h-10 w-10 items-center justify-center text-gray-600"
      key={"dotsEnd"}
    >
      ...
    </span>
  );

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="mt-16 flex justify-center gap-1.5 text-base font-medium">
      {currentPage > 1 && (
        <button className="inline-flex h-10 w-10 items-center justify-center text-gray-600" onClick={() => handleClick(currentPage - 1)}>
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
          </svg>
        </button>
      )}

      {pageNumbers.map((page) => {
        if (page === currentPage) {
          return (
            <span 
              className="h-10 w-10 rounded-full flex items-center text-white border-white border-[1.5px] bg-black justify-center px-2 mt-[1px]" 
              key={page}
            >
              {page}
            </span>
          );
        } else if (page === 1) {
          return (
            <button 
              className="inline-flex h-10 w-10 items-center justify-center text-gray-600" 
              key={page} 
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          );
        } else if (page === pages) {
          return (
            <button 
              className="inline-flex h-10 w-10 items-center justify-center text-gray-600" 
              key={page} 
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          );
        } else if (
          (page >= currentPage - 1 && page <= currentPage + 1) ||
          (page === 2 && currentPage === 1) ||
          (page === pages - 1 && currentPage === pages)
        ) {
          return (
            <button 
              className="inline-flex h-10 w-10 items-center justify-center text-gray-600" 
              key={page} 
              onClick={() => handleClick(page)}
            >
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
        <button 
          className="inline-flex h-10 w-10 items-center justify-center text-gray-600" 
          onClick={() => handleClick(currentPage + 1)}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Pagination;

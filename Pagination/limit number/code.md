### How to limit the number of pages shown in pagination in React?
- stackoverflow: https://stackoverflow.com/questions/66169637/how-to-limit-the-number-of-pages-shown-in-pagination-in-react

## Solve
### I had the same problems and I resolved them with this algorithm :
```ts
// section 1
handleClick(event) {
    this.TotalPage();
    this.setState({
        currentPage: Number(event.target.id)
    });
}

// section 2
 const pageNumbers = 10;
 ShowPaginationNumbers(pageNumbers) {

    let paginationNumbers = [];

    if (pageNumbers) {
        let showMax = 3;
        let endPage;
        let startPage;

        if (pageNumbers <= showMax) {
            startPage = 1;
            endPage = pageNumbers.length;
        }
        else {
            startPage = this.state.currentPage;
            if (startPage != pageNumbers.length && (startPage + 1) != pageNumbers.length) {
                endPage = this.state.currentPage + showMax - 1;
            }
            else {
                endPage = pageNumbers.length;
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            paginationNumbers.push(i);
        }
        return this.ShowRenderPageNumbers(paginationNumbers); 
```

---

## Default

### The following are my code snippets. components/Movies.js
```ts
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviesTable from "./MoviesTable";
import { fetchMovies } from "./moviesSlice";
import "./Movies.css";
import Pagination from "./common/Pagination";
import { paginate } from "./../utils/paginate";

const Movies = () => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const { status, movies } = useSelector((state) => state.movies);

  const paginatedMovies = paginate(movies, currentPage, pageSize);

  let content;

  if (status === "loading") {
    content = (
      <div className="spinner">
        <div className="spinner-border text-success">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="row">
        <div className="col-xs-10 col-md-8 mx-auto mt-3">
          {paginatedMovies.length > 0 ? (
            <MoviesTable movies={paginatedMovies} />
          ) : null}
          <Pagination
            itemsCount={movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
          />
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default Movies;
```

### components/pagination.js
```ts
import React from "react";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  onPreviousClick,
  onNextClick,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {currentPage !== 1 && (
          <li class="page-item">
            <a
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={onPreviousClick}
            >
              Previous
            </a>
          </li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              style={{ cursor: "pointer" }}
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        {currentPage !== pageCount && (
          <li class="page-item">
            <a
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={onNextClick}
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
```

### src/utils/paginate.js
```ts
import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
```
### 🙎🏻‍♂️ 💬

want to create paginate, create it at file Pagination.jsx for scrolling posts received from api

The default code is as follows. Code update here pages/market/index.tsx

```tsx
Use nextJS, Typescript, Tailwindcss
Create the pages/market/index.tsx file.

and add this piece of code to the file

import axios from "axios";
import { useState, useEffect } from "react";

import Format from "@/components/index/format/Format";

import SearchEstatePage from "@/components/index/markets/SearchBar";
import MarketSideBar from "@/components/index/markets/MarketSideBar";

import { paginate } from "lib/paginate";
import Pagination from "@/components/index/pagination/Pagination";

export default function ShowMarket({estates}: any) {
  const [estateData, setEstateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [howManyPages, setHowManyPages] = useState(0);
  
  // paginatePosts
  const pageSize = 1;
  
  useEffect(() => {
    setEstateData(estates);
    setHowManyPages(Math.ceil(estates.length / pageSize));
    setCurrentPage(1); // reset the current page when the data changes
  }, [estates]);
  
  const paginatePosts = paginate(estateData, currentPage, pageSize);

  return (
    <div>
        <div className='flex w-full'>
            {/* 
                estate details...
            */}
        </div>
        
        {howManyPages > 1 && (
          <Pagination 
            pages={howManyPages} 
            setCurrentPage={setCurrentPage} 
          />
        )}
    </div>
  );
}

export async function getServerSideProps({ query }: any) {
  try {
    const { title, type } = query;
    const params = new URLSearchParams({ title, type });

    const res = await axios.get(`http://localhost:5000/estate?${params.toString()}`);
    const estates = res.data;

    return { props: { estates } };
  } catch (error) {
    console.error(error);
    return { props: { estates: [] } };
  }
}
```

### ChatGPT

Great! Based on your requirements, here's an updated code for the pages/market/index.tsx file that includes pagination:

```tsx
import axios from "axios";
import { useState, useEffect } from "react";

import Format from "@/components/index/format/Format";

import SearchEstatePage from "@/components/index/markets/SearchBar";
import MarketSideBar from "@/components/index/markets/MarketSideBar";

import { paginate } from "lib/paginate";
import Pagination from "@/components/index/pagination/Pagination";

export default function MarketPage({ estates }: any) {
  const [estateData, setEstateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [howManyPages, setHowManyPages] = useState(0);

  // paginatePosts
  const pageSize = 10;

  useEffect(() => {
    setEstateData(estates);
    setHowManyPages(Math.ceil(estates.length / pageSize));
    setCurrentPage(1); // reset the current page when the data changes
  }, [estates]);

  const paginatePosts = paginate(estateData, currentPage, pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <SearchEstatePage />
      <div className="flex">
        <MarketSideBar />
        <div className="w-full px-4">
          <h1 className="text-4xl font-bold text-gray-800">Market Page</h1>
          {paginatePosts.map((estate: any) => (
            <Format estate={estate} key={estate._id} />
          ))}
          {howManyPages > 1 && (
            <Pagination
              pages={howManyPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: any) {
  try {
    const { title, type } = query;
    const params = new URLSearchParams({ title, type });

    const res = await axios.get(`http://localhost:5000/estate?${params.toString()}`);
    const estates = res.data;

    return { props: { estates } };
  } catch (error) {
    console.error(error);
    return { props: { estates: [] } };
  }
}
```




### 🙎🏻‍♂️ 💬

create Pagination in file Pagination.tsx, 
Must be consistent with MarketPlace files.

<Pagination
    pages={howManyPages}
    currentPage={currentPage}
    onPageChange={handlePageChange}
/>

The pagination must be able to update itself when the estateData changes.

### ChatGPT

Sure! Here's an example implementation of the `Pagination` component that is consistent with the `MarketPage` component you provided:

```tsx
import { useState, useEffect } from "react";

interface PaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ pages, currentPage, onPageChange }: PaginationProps) {
  const [pageButtons, setPageButtons] = useState<number[]>([]);

  useEffect(() => {
    const newPageButtons = [];
    for (let i = 1; i <= pages; i++) {
      newPageButtons.push(i);
    }
    setPageButtons(newPageButtons);
  }, [pages]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex items-center mt-8">
      <button
        className="mr-2 px-3 py-2 border rounded-md"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageButtons.map((page: number) => (
        <button
          key={page}
          className={`mx-1 px-3 py-2 border rounded-md ${
            currentPage === page ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="ml-2 px-3 py-2 border rounded-md"
        onClick={handleNextClick}
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
}
```

This implementation uses the `useState` and `useEffect` hooks to generate an array of page numbers, which is used to render the pagination buttons. The `handlePrevClick`, `handleNextClick`, and `handlePageClick` functions are used to handle the click events for the previous, next, and page buttons, respectively.

Note that this implementation expects the `onPageChange` function to be passed in as a prop, which will be called with the new page number when a pagination button is clicked. It also uses the `currentPage` prop to highlight the current page button.

I hope this helps!



### 🙎🏻‍♂️ 💬

The code can function as intended.
But I want the pagination in  to look like this:

< 1 2 3 4 ... 25 >

< 1 ... 3 4 5 ... 25 >

< 1 ... 22 23 24 25 >

### ChatGPT

Sure, you can modify the `Pagination` component to include those additional features. Here's an updated implementation that should work:

```tsx
import { useState, useEffect } from "react";

interface PaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ pages, currentPage, onPageChange }: PaginationProps) {
  const [pageButtons, setPageButtons] = useState<number[]>([]);

  useEffect(() => {
    const newPageButtons = [];
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        newPageButtons.push(i);
      }
    } else {
      if (currentPage < 4) {
        for (let i = 1; i <= 4; i++) {
          newPageButtons.push(i);
        }
        newPageButtons.push(-1);
        newPageButtons.push(pages);
      } else if (currentPage > pages - 3) {
        newPageButtons.push(1);
        newPageButtons.push(-1);
        for (let i = pages - 3; i <= pages; i++) {
          newPageButtons.push(i);
        }
      } else {
        newPageButtons.push(1);
        newPageButtons.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          newPageButtons.push(i);
        }
        newPageButtons.push(-1);
        newPageButtons.push(pages);
      }
    }
    setPageButtons(newPageButtons);
  }, [pages, currentPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== -1) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex items-center mt-8">
      <button
        className="mr-2 px-3 py-2 border rounded-md"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageButtons.map((page: number) => (
        <button
          key={page}
          className={`mx-1 px-3 py-2 border rounded-md ${
            currentPage === page ? "bg-blue-500 text-white" : ""
          } ${page === -1 ? "opacity-50 pointer-events-none" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page === -1 ? "..." : page}
        </button>
      ))}
      <button
        className="ml-2 px-3 py-2 border rounded-md"
        onClick={handleNextClick}
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
}

```

This implementation uses the `pageButtons` state variable to store an array of page numbers to render as pagination buttons. If there are 5 or fewer pages, it renders all the page numbers. Otherwise, it checks the current page number to decide which page numbers to show.

If the current page number is less than 4, it shows the first 4 pages, followed by a "..." button and the last page.

If the current page number is greater than the last 3 pages, it shows the first page, followed by a "..." button, and the last 4 pages.

Otherwise, it shows the first page, followed



### 🙎🏻‍♂️ 💬

The code is almost correct but has a few problems.
When pressing 1 or the beginning of the index '...' does not disappear, when pressing the next digit '...' is added duplicately.

### ChatGPT

I see, the issues you mentioned are related to the condition for rendering the "..." dots. Here's an updated version of the `Pagination` component that should solve those problems:

<version-2/v.2-tailwind.tsx/>

This version of the component should properly render the "..." dots based on the position of the current page and the total number of pages. Additionally, it includes some minor improvements like bolding the current page number and using a function instead of an inline arrow function for the click handler.

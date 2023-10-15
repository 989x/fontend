import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDictionary } from "@/lib/dictionary";

const SearchBlogs = ({ defaultSearch }: { defaultSearch: string }) => {
  const t = useDictionary();
  const router = useRouter();
  const [searchBlog, setSearchBlog] = useState("");
  const [isSearching, setIsSearching] = useState(false); // New state to track search status
  const [previousSearch, setPreviousSearch] = useState(""); // New state to store the previous search value

  useEffect(() => {
    setSearchBlog(defaultSearch || "");
  }, [defaultSearch]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Limit the number of search words to 80 characters
    const trimmedSearch = searchBlog.trim().slice(0, 80);

    if (isSearching || trimmedSearch === previousSearch) {
      return; // Prevent multiple simultaneous requests and unnecessary requests
    }

    setIsSearching(true);

    const query: any = {};

    if (trimmedSearch !== "") {
      query.searchBlog = trimmedSearch;
    }

    try {
      await router.push({
        pathname: "blogs",
        query: query,
      });
      setPreviousSearch(trimmedSearch); // Update the previous search value after a successful search
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex gap-3">
      {/* search bar */}
      <div className="w-[80%] sm:w-[50%] lg:w-[40%] h-[45px]">
        <form onSubmit={handleSubmit} className="flex h-full border rounded-lg">
          <input
            className="pl-4 w-full rounded-lg text-[15px] text-gray-800 focus:outline-none"
            type="text"
            placeholder={t.localSearchPlaceholder2}
            value={searchBlog}
            onChange={(e) => setSearchBlog(e.target.value)}
          />

          <button
            className="px-4 rounded-r-md"
            type="submit"
            disabled={isSearching} // Disable the button while searching
          >
            {isSearching ? (
              // Show a loading indicator while searching
              <div className="w-4 h-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            ) : (
              <svg
                aria-hidden="true"
                className="w-[22px] h-[22px] text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBlogs;

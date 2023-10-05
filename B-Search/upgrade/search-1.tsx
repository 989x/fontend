import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDictionary } from "@/lib/dictionary";

const SearchBlogs = ({ defaultSearch }: { defaultSearch: string }) => {
  const router = useRouter();
  const [searchBlog, setSearchBlog] = useState("");
  const t = useDictionary();

  useEffect(() => {
    setSearchBlog(defaultSearch || "");
  }, [defaultSearch]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const query: any = {};

    if (searchBlog.trim() !== "") {
      query.searchBlog = searchBlog;
    }

    router.push({
      pathname: "blogs",
      query: query,
    })
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

          <button className="px-4 rounded-r-md" type="submit">
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
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBlogs;

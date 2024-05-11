import axios from "axios";
import { useState, useEffect } from "react";
import { useDictionary } from "@/lib/dictionary";
import { sortingOptionMap } from "@/lib/types/propertyMappings";
import { paginate } from "lib/paginate";

import Pagination from "@/components/tool/Pagination";
import Format from "@/components/layout/Format";
import SearchBlogPage from "@/components/search/SearchBlogs";
import CardBlog from "@/components/card/CardBlog";

interface BlogsProps {
  blogs: any[]; 
  keyword: any; 
}

export default function Blogs({ blogs, keyword }: BlogsProps) {
  const [blogsData, setBlogsData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [howManyPages, setHowManyPages] = useState(0);
  const t = useDictionary();

  const pageSize = 9; 

  useEffect(() => {
    setBlogsData(blogs);
    setHowManyPages(Math.ceil(blogs.length / pageSize));
    setCurrentPage(1);
  }, [blogs]);

  const paginatePosts = paginate(blogsData || [], currentPage, pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Format title="Good Things">
        {/* filter */}
        <SearchBlogPage defaultSearch={keyword} />

        {/* search result */}
        <div className="text-gray-700 flex gap-1 mt-4 mb-7 text-[15px]">
          <div className="font-medium hidden sm:flex">{t.localeSearchFound}</div>
          <div className="font-semibold text-gray-800">
            {blogs?.length ?? 0}{" "}{t.localeSearchResult1}
          </div>

          <div className="flex font-medium">
            <div className="mr-1">{t.localeSearchSortBy}</div>
            <select name="" id="" className="font-semibold text-blue-600">
              {sortingOptionMap
                .filter((option) => option.name === "localeSortingOptionMap1")
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {t[option.name]}
                  </option>
              ))}
            </select>
          </div>
        </div>

        {/* list content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full h-fit">
          {paginatePosts.map((data: any, index: number) => {
            return (
              <div key={index}>
                <CardBlog data={data} />
              </div>
            );
          })}
        </div>

        {howManyPages > 0 && (
          <Pagination
            pages={howManyPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </Format>
    </div>
  );
}

export async function getServerSideProps({ query }: any) {
  try {
    const { keyword } = query;
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);

    const res = await axios.get(
      `http://localhost:5000/api/blog/search?${params.toString()}`
    );
    const blogs = res.data.blogs;

    return { props: { blogs } };
  } catch (error) {
    return { props: { blogs: [], keyword: null } };
  }
}

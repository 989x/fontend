import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDictionary } from "@/lib/dictionary";
import { selectingBLogMap } from "@/lib/types/propertyMappings";

import Pagination from "@/components/tool/Pagination";
import Format from "@/components/layout/Format";
import SearchBlogPage from "@/components/search/SearchBlogs";
import CardBlog from "@/components/card/CardBlog";

interface BlogsProps {
  blogs: any[]; 
  keyword: any; 
  totalRecords: number; 
}

export default function Blogs({ blogs, keyword, totalRecords }: BlogsProps) {
  const router = useRouter();
  const t = useDictionary();
  const [blogsData, setBlogsData] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [howManyPages, setHowManyPages] = useState(0);

  useEffect(() => {
    setBlogsData(blogs);

    const pageSize = 9; 
    const totalPages = Math.ceil(totalRecords / pageSize);

    setHowManyPages(totalPages);
    setCurrentPage(parseInt(router.query.page as string) || 1); 
  }, [blogs, totalRecords, router.query.page]);

  // ________________________________________ page 

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);

    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    })
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
            {/* <div className="mr-1">{t.localeSearchSortBy}</div> */}
            <div className="mr-1">& Selecting</div>
            <select 
              name="sorting" 
              id="sorting" 
              className="font-semibold text-blue-600"
            >
              {selectingBLogMap 
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {/* {t[option.name]} */}
                    {option.name}
                  </option>
              ))}
            </select>
          </div>
        </div>

        {/* list content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full h-fit">
          {blogsData.map((data: any, index: number) => {
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
    const { 
      keyword,
      page,
    } = query;
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (page) params.append("page", page); 

    const res = await axios.get(
      `http://localhost:5000/api/blog/search?${params.toString()}`
    );
    const blogs = res.data.blogs;
    const totalRecords = res.data.totalRecords;

    return { props: { blogs, keyword: keyword || null, totalRecords } };
  } catch (error) {
    return { props: { blogs: [], keyword: null } };
  }
}

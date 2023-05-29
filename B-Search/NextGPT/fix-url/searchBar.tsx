import { useEffect, useRef } from "react";

const SearchEstatePage = ({ defaultSearch }: { defaultSearch: string }) => {
  const [propertySearch, setPropertySearch] = useState(defaultSearch);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // _________________________ Just add this part and it will work.
  useEffect(() => {
    setPropertySearch(defaultSearch);
  }, [defaultSearch]);
  // _________________________ Just add this part and it will work.

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertySearch(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: "/properties",
      query: { propertySearch: propertySearch || undefined, propertyType },
    });
  };

  const handleClearSearch = () => {
    setPropertySearch("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="flex gap-3 text-sm text-gray-700">
      {/* search bar */}
      <div className="w-[80%] sm:w-[50%] lg:w-[40%] h-[43px]">
        <form onSubmit={handleSubmit} className="flex h-full border rounded-lg">
          <input
            ref={searchInputRef}
            className="pl-4 w-full rounded-lg text-[15px] text-gray-800"
            type="text"
            placeholder="ค้นหาด้วยชื่อโครงการ, สถานที่, จังหวัด ?"
            value={propertySearch}
            onChange={handleSearchChange}
          />

          {propertySearch && (
            <button className="px-4 rounded-r-md" type="button" onClick={handleClearSearch}>
              <Image src="/image/icon/searchBar/clear-icon.svg" alt="clear" width={15} height={0} />
            </button>
          )}

          {!propertySearch && (
            <button className="px-4 rounded-r-md" type="submit">
              <Image src="/image/icon/searchBar/icon.svg" alt="search" width={15} height={0} />
            </button>
          )}
        </form>
      </div>
      {/* rest of the component code */}
    </div>
  );
};

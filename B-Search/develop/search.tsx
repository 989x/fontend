import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const propertyTypeMap = [
  { name: "Property Type", value: "" },
  { name: "Land", value: "Land" },
  { name: "Home", value: "Home" },
];

const propertyStatusMap = [
  { name: "Rent & Sale", value: "" },
  { name: "For Rent", value: "Rent" },
  { name: "For Sale", value: "Sale" },
];

const SearchEstatePage = ({ defaultSearch }: { defaultSearch: string }) => {
  const router = useRouter();
  const [propertySearch, setPropertySearch] = useState(defaultSearch || "");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // config input value
  useEffect(() => {
    setPropertySearch(defaultSearch || "");
  }, [defaultSearch]);

  const handleSearchChange = (e: any) => {
    setPropertySearch(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const query: any = {};

    if (propertySearch.trim() !== "") {
      query.propertySearch = propertySearch;
    }
    if (propertyType.trim() !== "") {
      query.propertyType = propertyType;
    }
    if (propertyStatus.trim() !== "") {
      query.propertyStatus = propertyStatus;
    }

    router.push({
      pathname: "/properties",
      query: query,
    });
  };

  const handleStatusChange = (e: any) => {
    setPropertyStatus(e.target.value);
    const query: any = {};

    if (propertySearch.trim() !== "") {
      query.propertySearch = propertySearch;
    }
    if (propertyType.trim() !== "") {
      query.propertyType = propertyType;
    }
    if (e.target.value.trim() !== "") {
      query.propertyStatus = e.target.value;
    }

    router.push({
      pathname: "/properties",
      query: query,
    });
  };

  const handleTypeChange = (e: any) => {
    setPropertyType(e.target.value);
    const query: any = {};

    if (propertySearch.trim() !== "") {
      query.propertySearch = propertySearch;
    }
    if (e.target.value.trim() !== "") {
      query.propertyType = e.target.value;
    }
    if (propertyStatus.trim() !== "") {
      query.propertyStatus = propertyStatus;
    }

    router.push({
      pathname: "/properties",
      query: query,
    });
  };

  return (
    <div className="flex gap-3 text-sm text-gray-700">
      {/* search bar */}
      <div className="w-[80%] sm:w-[50%] lg:w-[40%] h-[43px]">
        <form onSubmit={handleSubmit} className="flex h-full border rounded-lg">
          <input
            className="pl-4 w-full rounded-lg text-[15px] text-gray-800"
            type="text"
            placeholder="ค้นหาด้วยชื่อโครงการ, สถานที่, หรืออะไรก็ได้ ?"
            value={propertySearch}
            onChange={handleSearchChange}
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

      <button className="lg:hidden border rounded-md px-4 flex items-center">
        <div className="w-[15px]">
          <Image
            src="/image/icon/searchBar/filter.svg"
            alt="me"
            width="0"
            height="0"
            style={{ width: "15px", height: "auto" }}
          />
        </div>
        <div className=" font-medium ml-2">Filter</div>
      </button>

      <div className="hidden lg:flex overflow-x-auto mt-4 lg:mt-0 h-[43px]">
        <div className="gap-x-3 flex h-full font-medium">
          {/* propertyStatus */}
          <div className="flex flex-col">
            <select
              value={propertyStatus}
              onChange={handleStatusChange}
              id="status"
              className="py-2 px-3 border rounded-md h-full"
            >
              {propertyStatusMap.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* propertyType */}
          <div className="flex flex-col">
            <select
              value={propertyType}
              onChange={handleTypeChange}
              id="status"
              className="py-2 px-3 border rounded-md h-full"
            >
              {propertyTypeMap.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEstatePage;

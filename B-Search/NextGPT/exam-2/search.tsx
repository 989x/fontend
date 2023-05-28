import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const SearchEstatePage = () => {
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

  const [propertySearch, setPropertySearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");

  const router = useRouter();

  const handleSearchChange = (e: any) => {
    setPropertySearch(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = buildQuery();
    router.push({
      pathname: "/properties",
      query,
    });
  };

  const handleTypeChange = (e: any) => {
    setPropertyType(e.target.value);
    const query = buildQuery();
    router.push({
      pathname: "/properties",
      query,
    });
  };

  const handleStatusChange = (e: any) => {
    setPropertyStatus(e.target.value);
    const query = buildQuery();
    router.push({
      pathname: "/properties",
      query,
    });
  };

  const buildQuery = () => {
    const query = {};

    if (propertySearch.trim() !== "") {
      query.propertySearch = propertySearch.trim();
    }

    if (propertyType.trim() !== "") {
      query.propertyType = propertyType.trim();
    }

    if (propertyStatus.trim() !== "") {
      query.propertyStatus = propertyStatus.trim();
    }

    return query;
  };

  return (
    <div className="flex gap-3 text-sm text-gray-700">
      {/* search bar */}
      <div className="w-[80%] sm:w-[50%] lg:w-[40%] h-[43px]">
        <form onSubmit={handleSubmit} className="flex h-full border rounded-lg">
          <input
            className="pl-4 w-full rounded-lg text-[15px] text-gray-800"
            type="text"
            placeholder="ค้นหาด้วยชื่อโครงการ, สถานที่, จังหวัด ?"
            value={propertySearch}
            onChange={handleSearchChange}
          />

          <button className="px-4 rounded-r-md" type="submit">
            <Image
              src="/image/icon/searchBar/icon.svg"
              alt="me"
              width={15}
              height={0}
            />
          </button>
        </form>
      </div>

      <button className="lg:hidden border rounded-md px-4 flex items-center">
        <div className=" font-medium ml-2">Filter</div>
      </button>

      <div className="hidden lg:flex overflow-x-auto mt-4 lg:mt-0 h-[43px]">
        <div className="gap-x-3 flex h-full font-medium">
          {/* propertyType */}
          <div className="flex flex-col">
            <select
              value={propertyType}
              onChange={handleTypeChange}
              id="status"
              className="py-2 px-3 border rounded-md h-full"
            >
              {propertyTypeMap.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* propertyStatus */}
          <div className="flex flex-col">
            <select
              value={propertyStatus}
              onChange={handleStatusChange}
              id="status"
              className="py-2 px-3 border rounded-md h-full"
            >
              {propertyStatusMap.map((item) => (
                <option key={item.value} value={item.value}>
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

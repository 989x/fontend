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
    router.push({
      pathname: "/properties",
      query: { propertySearch, propertyType, propertyStatus },
    });
  };

  const handleTypeChange = (e: any) => {
    setPropertyType(e.target.value);
    router.push(
      `/properties?propertySearch=${propertySearch}${
        e.target.value ? `&propertyType=${e.target.value}` : ""
      }${propertyStatus ? `&propertyStatus=${propertyStatus}` : ""}`
    );
  };

  const handleStatusChange = (e: any) => {
    setPropertyStatus(e.target.value);
    router.push(
      `/properties?propertySearch=${propertySearch}${
        propertyType ? `&propertyType=${propertyType}` : ""
      }${e.target.value ? `&propertyStatus=${e.target.value}` : ""}`
    );
  };

  return (
    // ...
  )
}
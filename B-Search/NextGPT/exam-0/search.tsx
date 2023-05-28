import { useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";

const SearchEstatePage = () => {
  const propertyTypeMap = [
    { name: "Property Type", value: "" },
    { name: "Land", value: "Land" },
    { name: "Home", value: "Home" },
    { name: "Condo", value: "Condo" },
    { name: "Townhome", value: "Townhome" },
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertySearch(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const query = { propertySearch };
    let query: any = { propertySearch };

    if (propertyType) query.propertyType = propertyType;
    if (propertyStatus) query.propertyStatus = propertyStatus;
    router.push({
      pathname: "/properties",
      query,
    });
  };

  const handleTypeChange = (e: any) => {
    const value = e.target.value;
    setPropertyType(value);
    const query = {
      propertySearch,
      propertyType: value || undefined,
      propertyStatus,
    };
    router.push({
      pathname: "/properties",
      query,
    });
  };

  const handleStatusChange = (e: any) => {
    const value = e.target.value;
    setPropertyStatus(value);
    const query = {
      propertySearch,
      propertyType,
      propertyStatus: value || undefined,
    };
    router.push({
      pathname: "/properties",
      query,
    });
  };


  return (
    // ...
  )
}

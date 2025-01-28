"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import LinkCustom from "@/components/ui/LinkCustom";
import PaginationTable from "@/components/custom/PaginationTable";
import DataTable from "./DataTable";
import { useGetComplaint } from "./api";
import LoadingPage from "@/components/ui/LoadingPage";

const ComplaintTab = () => {
  // Define table headers
  const tableHeaders = ["No", "Judul", "Waktu", "Tanggal", "Status", "Aksi"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  };

  // serach
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to page 1
  };
  // serach

  // Data fetching
  const { data, isLoading } = useGetComplaint(currentPage, search);

  if (isLoading) {
    return <div >
        <LoadingPage />
    </div>;
}

  return (
    <div className="">
      {/* Table */}
      <div className="Table mt-6">
        <DataTable
          headers={tableHeaders}
          data={data?.data}
          currentPage={currentPage}
          search={search}
        />
      </div>
      {/* Pagination */}
      <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
        <PaginationTable
          currentPage={currentPage}
          totalPages={data?.pagination?.totalPages as number}
          onPageChange={onPageChange}
        />
      </div>
      <div>
      </div>
    </div>
  );
};

export default ComplaintTab;

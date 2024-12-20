"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import LinkCustom from "@/components/ui/LinkCustom";
import PaginationTable from "@/components/custom/PaginationTable";
import DataTable from "./DataTable";

const ComplaintTab = () => {
  // Define table headers
  const tableHeaders = ["No", "Waktu", "Tanggal", "Status", "Aksi"];

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

  // 
  const dummyData = [
    {
      id: 1,
      time: "08:30",
      date: "2024-12-20",
      status: "Terkirim",
    },
    {
      id: 2,
      time: "10:45",
      date: "2024-12-19",
      status: "Dibalas",
    },
    {
      id: 3,
      time: "14:15",
      date: "2024-12-18",
      status: "Terkirim",
    },
    {
      id: 4,
      time: "16:00",
      date: "2024-12-17",
      status: "Dibalas",
    },
    {
      id: 5,
      time: "09:30",
      date: "2024-12-16",
      status: "Terkirim",
    },
  ];
  
  return (
    <div className="">
      {/* Table */}
      <div className="Table mt-6">
        <DataTable
          headers={tableHeaders}
          data={dummyData}
          currentPage={currentPage}
          search={search}
        />
      </div>
      {/* Pagination */}
      <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
        <PaginationTable
          currentPage={currentPage}
          totalPages={10}
          onPageChange={onPageChange}
        />
      </div>
      <div>
      </div>
    </div>
  );
};

export default ComplaintTab;

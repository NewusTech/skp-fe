"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import LinkCustom from "@/components/ui/LinkCustom";
import SearchIcon from "@/assets/icon/search";
import Title from "@/components/custom/Title";
import PaginationTable from "@/components/custom/PaginationTable";
import DataTable from "@/components/(admin)/question-survey/DataTable";

const QuestionSurvey = () => {
  // Define table headers
  const tableHeaders = ["No", "Pertanyaan", "Aksi"];

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

  // data
  const dummyData = [
    {
      id: 1,
      question: "Pertanyaan 1",
    },
    {
      id: 2,
      question: "Pertanyaan 2",
    },
    {
      id: 3,
      question: "Pertanyaan 3",
    },
    {
      id: 4,
      question: "Pertanyaan 4",
    },
    {
      id: 5,
      question: "Pertanyaan 5",
    },
  ];

  return (
    <div className="">
      <Title label="Pertanyaan Survey" />
      <div className="head flex gap-3 justify-between mt-7">
        <div className="w-[50%]">
          <Input
            placeholder='Cari Pertanyaan'
            leftIcon={<SearchIcon />}
            className='border-primary placeholder:text-primary/40'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <LinkCustom
          href="/question-survey/create"
          className="flex gap-3 text-white items-center flex-shrink-0 w-[160px] justify-center hover:bg-primary-800 transition-all duration-150"
        >
          Tambah
        </LinkCustom>
      </div>
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

export default QuestionSurvey;

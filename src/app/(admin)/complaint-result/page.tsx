"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/assets/icon/search";
import Title from "@/components/custom/Title";
import PaginationTable from "@/components/custom/PaginationTable";
import InputComponent from "@/components/custom/inputComponent";
import { SelectInput } from "@/components/custom/selectInput";
import { DatePickerWithRange } from "@/components/custom/rangeDate";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import DataTable from "@/components/(admin)/complaint/DataTable";
import { useGetComplaint } from "@/components/(admin)/complaint/api";

const jabatanOptions = [
  { label: "Kepala Puskesmas", value: "kepala_puskesmas" },
  { label: "Dokter Umum", value: "dokter_umum" },
  { label: "Dokter Gigi", value: "dokter_gigi" },
  { label: "Bidan", value: "bidan" },
  { label: "Perawat", value: "perawat" },
  { label: "Apoteker", value: "apoteker" },
  { label: "Administrasi Puskesmas", value: "administrasi_puskesmas" },
  { label: "Kepala Subbagian Umum", value: "kepala_subbagian_umum" },
  { label: "Petugas Laboratorium", value: "petugas_laboratorium" },
  { label: "Petugas Kesehatan Lingkungan", value: "petugas_kesehatan_lingkungan" },
  { label: "Petugas Gizi", value: "petugas_gizi" },
  { label: "Tenaga Kesehatan Masyarakat", value: "tenaga_kesehatan_masyarakat" }
];

const ketenagaanOptions = [
  { label: "ASN", value: "ASN" },
  { label: "Non ASN", value: "NON_ASN" },
];

const ComplaintResult = () => {
  const [selectedJabatan, setSelectedJabatan] = useState<string | undefined>(undefined);
  const [selectedKetenagaan, setSelectedKetenagaan] = useState<string | undefined>(undefined);
  // Define table headers
  const tableHeaders = ["No", "Nama", "Judul Aduan", "Aksi"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  };

  // serach state
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to page 1
  };

  // data fetching
  const { data } = useGetComplaint(currentPage, search,);
  const dummyData = [
    {
      id: 1,
      nama: 'John Doe',
      judul_aduan: 'Pelayanan Tidak Ramah di Puskesmas',
    },
    {
      id: 2,
      nama: 'Jane Smith',
      judul_aduan: 'Antrian Lama untuk Konsultasi Dokter',
    },
    {
      id: 3,
      nama: 'Michael Johnson',
      judul_aduan: 'Fasilitas Kesehatan Tidak Memadai',
    },
    {
      id: 4,
      nama: 'Emily Davis',
      judul_aduan: 'Obat Tidak Tersedia di Apotek Puskesmas',
    },
    {
      id: 5,
      nama: 'David Wilson',
      judul_aduan: 'Jam Operasional Tidak Sesuai Jadwal',
    },
  ];

  const handleJabatanChange = (value: string) => {
    setSelectedJabatan(value);
  };
  const handleKetenagaanChange = (value: string) => {
    setSelectedKetenagaan(value);
  };

  const handleDateChange = (startDate: string, endDate: string) => {
    console.log("Start Date:", startDate)
    console.log("End Date:", endDate)
  }

  return (
    <div className="">
      <Title label="Pengaduan" />
      {/* filter */}
      <div className="head flex flex-col gap-4 mt-7">
        <div className="flex gap-4 w-full">
          <div className="w-1/2">
            <InputComponent title="Jabatan">
              <SelectInput
                label="Jabatan"
                options={jabatanOptions}
                placeholder="Pilih Jabatan"
                value={selectedJabatan}
                onChange={handleJabatanChange}
              />
            </InputComponent>
          </div>
          <div className="w-1/2">
            <InputComponent title="Ketenagaan">
              <SelectInput
                label="Ketenagaan"
                options={ketenagaanOptions}
                placeholder="Pilih Ketenagaan"
                value={selectedKetenagaan}
                onChange={handleKetenagaanChange}
              />
            </InputComponent>
          </div>
        </div>
        {/*  */}
        <div className="flex gap-4 w-full">
          <div className="w-1/2">
            <Input
              placeholder='Cari'
              leftIcon={<SearchIcon />}
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-1/2 flex gap-3 ">
            <DatePickerWithRange onDateChange={handleDateChange} />
            <Button
              variant="outline"
              className="text-primary flex gap-2 items-center"
            >
              <Printer color="#80AC6C" />
              Print
            </Button>
          </div>
        </div>
        {/*  */}
      </div>
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

export default ComplaintResult;

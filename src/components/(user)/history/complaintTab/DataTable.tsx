import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import Link from "next/link";
import { format, addHours } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ComplaintTabs } from "./interface";

const formatWIBDate = (utcDate: string) => {
    const localDate = addHours(new Date(utcDate), 7); // Tambahkan 7 jam untuk WIB
    return format(localDate, "EEEE, dd MMMM yyyy", { locale: idLocale }); // Format tanggal
};

const formatWIBTime = (utcDate: string) => {
    const localDate = addHours(new Date(utcDate), 7); // Tambahkan 7 jam untuk WIB
    return format(localDate, "HH.mm"); // Format jam
};


const DataTable: React.FC<ComplaintTabs> = ({ headers, data, currentPage }) => {
    return (
        <div className="Table mt-3">
            <div className="">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableHead key={index}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="truncate">
                                        {item?.judul || "-"}
                                    </TableCell>
                                    {/* Jam */}
                                    <TableCell className="text-center">
                                        {item?.createdAt ? formatWIBTime(item.createdAt) : "-"}
                                    </TableCell>
                                    {/* Tanggal */}
                                    <TableCell className="text-center">
                                        {item?.createdAt ? formatWIBDate(item.createdAt) : "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className={`p-1 px-3 ${item?.status === 1 ? "bg-green-200 text-green-900" : "bg-blue-200 text-blue-900"}  rounded-full inline-block`}>
                                            {item?.status === 1 ? "Dibalas" : item?.status === 0 ? "Terkirim" : "-"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Link
                                            href={`/history/detail-complaint/${item.id}`}
                                            className="text-white bg-primary rounded-full py-2 px-8 hover:bg-primary-800 transition-all duration-200"
                                        >
                                            Lihat
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Tidak ada data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;

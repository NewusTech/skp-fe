
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import Link from "next/link";
import Cookies from "js-cookie";
import { mutate } from "swr";
import { ComplaintTabs } from "./interface";


const DataTable: React.FC<ComplaintTabs> = ({ headers, data, currentPage, search, }) => {

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
                                <TableRow key={item.id} index={index}>
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * 10 + (index + 1)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item?.time ?? "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item?.date ?? "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="p-1 bg-blue-200 px-3 text-blue-900 rounded-full inline-block">
                                        {item?.status ?? "-"}
                                        </div>
                                    </TableCell>
                                    {/*  */}
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
                                <TableCell colSpan={4} className="text-center">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;

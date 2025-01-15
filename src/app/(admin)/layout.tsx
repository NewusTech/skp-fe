"use client";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2"; // Make sure to import SweetAlert2
import LogoutIcon from "@/assets/icon/logout";
import DashboardIcon from "@/assets/icon/dashboard";
import SurveyIcon from "@/assets/icon/survey";
import ResultSurveyIcon from "@/assets/icon/hasilSurvey";
import ComplaintIcon from "@/assets/icon/complaint";
import ComponentWithAccess from "@/components/Auth/componentWithAccess";


interface LayoutAdminProps {
    children: React.ReactNode;
    title?: string;
}

interface MenuProps {
    icons?: React.ReactNode;
    children: React.ReactNode;
    title?: string;
    link: string;
}

const Menu = (props: MenuProps) => {
    const pathname = usePathname();
    return (
        <Link
            href={props.link}
            className={`nav hover:pl-[15px] transition-all duration-150 flex items-center gap-4 text-left rounded-[8px] py-[13px]  px-[10px] ${pathname.startsWith(props.link) ? "text-primary bg-[#F5F5F5]" : "text-primary"}`} >
            <div className="icon">{props.icons}</div>
            <div className={`nama flex gap-2 items-center ${pathname.startsWith(props.link)
                ? "text-primary font-medium"
                : "text-primary"
                }`}>
                {props.children}
            </div>
        </Link>
    );
};

interface LayProps {
    link?: string;
}


const LayoutAdmin = (props: LayoutAdminProps) => {

    const router = useRouter();
    // 

    const handleLogout = () => {
        // Menghapus semua item di localStorage
        localStorage.clear();
        // Menghapus semua cookie
        document.cookie.split(';').forEach(cookie => {
            const cookieName = cookie.split('=')[0].trim();
            Cookies.remove(cookieName);
        });

        // Tampilkan pop-up sukses tanpa tombol OK, otomatis menghilang setelah 2 detik
        Swal.fire({
            title: 'Logout Berhasil',
            text: 'Anda akan diarahkan ke halaman login.',
            icon: 'success',
            timer: 2000,  // Pop-up akan otomatis tertutup setelah 2 detik
            timerProgressBar: true,  // Menampilkan progress bar waktu
            showConfirmButton: false,  // Tidak menampilkan tombol OK
        }).then(() => {
            // Arahkan ke halaman login setelah pop-up ditutup otomatis
            router.push('/login-admin');
        });
        router.push('/login-admin');
    };

    const [navbar, setNavbar] = useState(false);

    const pathname = usePathname();
    const isProdukActive =
        pathname.startsWith("/admin/cms/kategori") ||
        pathname.startsWith("/admin/cms/unit");
    const [produk, setProduk] = useState(isProdukActive);

    const handleProduk = () => {
        setProduk(!produk);
    };

    const handleNavbar = () => {
        setNavbar(!navbar);
    };
    const handleDropdownOpen = (route: string) => {
        setIsDropdownOpen(isDropdownOpen === route ? null : route);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
    return (
        <div className="wrap w-full min-h-screen bg-[#FFFFFF] relative">
            {/* navbar */}
            <div className="navatas md:px-0 top-0 w-full md:w-full right-0 fixed md:bg-transparent bg-[#F6F6F6] py-4 pr-5 pl-5 md:-z-30 z-10">
                <div className="wra white -z-10 md:ml-[290px] bg-transparent m-auto justify-between md:justify-end md:py-[23px] flex items-center gap-4 text-left">
                    <div className="teks flex-shrink-0 text-primary">
                        <div className="head font-bold text-lg text-primary">
                            SISKP
                        </div>
                        {/* <div className="head text-sm">Super Admin</div> */}
                    </div>
                    <div
                        onClick={handleNavbar}
                        className="icon  flex cursor-pointer md:hidden bg-primary rounded p-2 w-[40px] justify-center items-center px-2 text-white "
                    >
                        {navbar ? "x" : "="}
                    </div>
                </div>
            </div>
            {/* sidebar */}
            <div className={`sidebar border-r-2 border-gray-100 shadow-lg bg-[#FCFBFB] overflow-auto z-50 pt-[10px] md:pt-0 md:z-20 md:block h-screen fixed top-0 ${navbar ? "left-[0%]" : "left-[-100%]"
                } box-border md:w-[310px] md:shadow-none shadow-lg w-[75%] px-[20px] bg-whie transition-all duration-300 md:left-0 `}>
                {/* menu */}
                <div className="wrap-nav mt-[20px] flex bg-red flex-col gap-2 mb-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex-shrink-0">
                            <Image
                                src="/assets/images/logo-pali.png"
                                alt="logo"
                                width={500}
                                height={500}
                                unoptimized
                                className="w-full object-contain h-[70px] "
                            />
                        </div>
                        <div className="flex flex-col text-primary-800">
                            <div className="font-bold text-2xl">
                                SISKP
                            </div>
                            <div className="text-xs">
                                Sistem Informasi Kepuasaan Pegawai
                            </div>
                        </div>
                    </div>
                    {/* <div className="text-primary text-4xl mb-5 font-semibold flex">
                        Admin
                    </div> */}
                    <ComponentWithAccess toLogin>
                        <div className="wrap flex flex-col gap-1 ">
                            <div className=" overflow-auto flex flex-col justify-between">
                                {/* accordion */}
                                <Accordion className="" type="single" collapsible>
                                    {/* dashboard */}
                                    <AccordionItem className="" value="item-1">
                                        <Link
                                            href="/dashboard"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/dashboard")
                                                ? "bg-[#DFEADA] text-primary-800"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <DashboardIcon />
                                            </div>
                                            Dashboard
                                        </Link>
                                    </AccordionItem>
                                    {/* dashboard */}
                                    {/* pertanyaan survei */}
                                    <AccordionItem className="" value="item-2">
                                        <Link
                                            href="/question-survey"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/question-survey")
                                                ? "bg-[#DFEADA] text-primary-800"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <SurveyIcon />
                                            </div>
                                            Pertanyaan Survei
                                        </Link>
                                    </AccordionItem>
                                    {/* pertanyaan survei */}
                                    {/* Hasil Survei */}
                                    <AccordionItem className="" value="item-2">
                                        <Link
                                            href="/result-survey"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/result-survey")
                                                ? "bg-[#DFEADA] text-primary-800"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <ResultSurveyIcon />
                                            </div>
                                            Hasil Survei
                                        </Link>
                                    </AccordionItem>
                                    {/* Hasil Survei */}
                                    {/* Pengaduan */}
                                    <AccordionItem className="" value="item-2">
                                        <Link
                                            href="/complaint-result"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/complaint-result")
                                                ? "bg-[#DFEADA] text-primary-800"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <ComplaintIcon />
                                            </div>
                                            Pengaduan
                                        </Link>
                                    </AccordionItem>
                                    {/* Pengaduan */}
                                </Accordion>
                                {/* accordion */}
                                {/* profile */}
                                <div className="wrap mt-10 flex flex-col gap-3">
                                    <div className="flex gap-3 px-5 items-center">
                                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                            <Image
                                                src="/assets/images/user.png"
                                                alt="logo"
                                                width={1000}
                                                height={1000}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 text-primary">
                                            <div className="font-medium text-sm">Super Admin</div>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div
                                        onClick={handleLogout}
                                        className={`nav cursor-pointer font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] bg-transparent text-primary`} >
                                        <div className="w-[35px]">
                                            <LogoutIcon />
                                        </div>
                                        Log Out
                                    </div>
                                </div>
                                {/* profile */}
                            </div>
                        </div>
                    </ComponentWithAccess>
                </div>
            </div>
            {/* KONTEN */}
            <div className="konten z-10 md:px-0 px-[10px] md:mr-[20px] md:ml-[350px] md:pt-[15px] pt-[70px] h-full pb-5">
                <div className="konten overflow-auto h-[90%] p-3 md:p-6 bg-white rounded-xl">
                    {/* konten */}
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;

"use client";

import SurveyIlustration from "@/assets/ilustration/homepage-survey.svg";
import ModalContainer from "@/components/modals/Wrapper";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="container  mx-auto px-3 md:px-0 min-h-screen flex flex-col justify-center items-center">
            <div className="fixed top-0 w-full">
                <NavbarAdmin />
            </div>
            <div className="mt-[35px]">
                <div className="flex flex-col gap-4 items-center">
                    <Image
                        className="m-auto md:w-[600px]"
                        src={SurveyIlustration}
                        alt="Survey Ilustration"
                    />
                    <h2 className="mt-4 text-center md:text-base text-sm font-poppins font-normal leading-[22.4px] max-w-[823px]">
                        Evaluasi Kepuasan Kerja Pegawai sebagai Langkah Nyata untuk Meningkatkan Kesejahteraan, Produktivitas, dan Hubungan di Tempat Kerja Demi Menciptakan Lingkungan yang Lebih Inklusif dan Nyaman untuk Semua
                    </h2>
                </div>
            </div>
            <ModalContainer />
        </div>
    );
}

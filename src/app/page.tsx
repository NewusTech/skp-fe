"use client";

import SurveyIlustration from "@/assets/ilustration/homepage-survey.svg";
import ModalContainer from "@/components/modals/Wrapper";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container  mx-auto px-3 md:px-0 min-h-screen flex flex-col justify-center items-center">
      <div className="fixed top-0 w-full">
      <Navbar />
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
          {/*  */}
          <div className="flex justify-center items-center gap-4 w-full">
            <Button
              type="button"
              variant="secondary"
              className="mt-8 md:w-[190px] w-full"
              onClick={() => router.push('/complaint')}
            >
              Kirim Pengaduan
            </Button>
            <Button
              type="button"
              variant="default"
              className="mt-8 md:w-[190px] w-full"
              onClick={() => router.push('/survey')}
            >
              Mulai Survey
            </Button>
          </div>
        </div>
      </div>
      <ModalContainer />
    </div>
  );
}

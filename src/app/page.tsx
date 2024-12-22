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
    <div className="mb-10">
      <Navbar />
      <div className="mt-[35px]">
        <div className="flex flex-col gap-4 items-center">
          <Image
            className="m-auto"
            src={SurveyIlustration}
            alt="Survey Ilustration"
          />
          <h2 className="mt-4 text-center font-poppins text-base font-normal leading-[22.4px] w-[823px]">
            Evaluasi Kepuasan Kerja Pegawai sebagai Langkah Nyata untuk Meningkatkan Kesejahteraan, Produktivitas, dan Hubungan di Tempat Kerja Demi Menciptakan Lingkungan yang Lebih Inklusif dan Nyaman untuk Semua
          </h2>
          {/*  */}
          <div className="flex justify-center items-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="mt-8 w-[190px]"
              onClick={() => router.push('/complaint')}
            >
              Kirim Pengaduan
            </Button>
            <Button
              type="button"
              variant="default"
              className="mt-8 w-[190px]"
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

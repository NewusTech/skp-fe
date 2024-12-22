"use client";
import SimuskesLogo from "@/assets/icon/brand/simpuskes.svg";
import Image from "next/image";
import { Button } from "./button";
import { useModal } from "@/hooks/modal";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const modal = useModal();
  const router = useRouter();

  return (
    <div className="h-[59px] bg-white pt-[43px] w-full  flex justify-between items-center container mx-auto">
      <div className="flex items-center gap-3">
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
      <div className="flex space-x-4">
        <Button
          onClick={() => modal.onOpen("login")}
          variant="default"
          className="w-[140px]"
        >
          Masuk
        </Button>
        <Button
          onClick={() => modal.onOpen("register")}
          variant="outlinePrimary"
          className="w-[140px]"
        >
          Daftar
        </Button>
      </div>
    </div>
  );
}

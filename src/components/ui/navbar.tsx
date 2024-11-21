"use client";
import SimuskesLogo from "@/assets/icon/brand/simpuskes.svg";
import Image from "next/image";
import { Button } from "./button";
import { useModal } from "@/hooks/modal";

export default function Navbar() {
  const modal = useModal();

  return (
    <div className="h-[59px] bg-white pt-[43px] w-full px-6 flex justify-between items-center">
      <Image src={SimuskesLogo} alt="Simuskes Logo" />
      <div className="flex space-x-4">
        <Button
          onClick={() => modal.onOpen("login")}
          variant="default"
          size="lg"
          className="rounded-full"
        >
          Masuk
        </Button>
        <Button variant="secondary" size="lg" className="rounded-full">
          Daftar
        </Button>
      </div>
    </div>
  );
}

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
    <div className="h-[59px] bg-white pt-[43px] w-full px-6 flex justify-between items-center">
      <Image
        src={SimuskesLogo}
        alt="Simuskes Logo"
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="flex space-x-4">
        <Button
          onClick={() => modal.onOpen("login")}
          variant="default"
          size="lg"
          className="rounded-full"
        >
          Masuk
        </Button>
        <Button
          onClick={() => modal.onOpen("register")}
          variant="secondary"
          size="lg"
          className="rounded-full"
        >
          Daftar
        </Button>
      </div>
    </div>
  );
}

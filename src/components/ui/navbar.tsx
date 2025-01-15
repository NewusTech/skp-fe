"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { useModal } from "@/hooks/modal";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation";
import ArrowDown from "../../../public/assets/icons/ArrowDown";
import Cookies from "js-cookie";
import Swal from "sweetalert2"; // Make sure to import SweetAlert2

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const modal = useModal();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const router = useRouter();
  const handleLogout = () => {
    // Menghapus semua item di localStorage
    localStorage.clear();
    // Menghapus semua cookie
    document.cookie.split(';').forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      Cookies.remove(cookieName);
    });
    // Cookies.remove("accessToken");
    // Cookies.remove("username");
    window.location.href = "/";

    // Tampilkan pop-up sukses tanpa tombol OK, otomatis menghilang setelah 2 detik
    Swal.fire({
      title: 'Logout Berhasil',
      icon: 'success',
      timer: 1500,  // Pop-up akan otomatis tertutup setelah 2 detik
      showConfirmButton: false,  // Tidak menampilkan tombol OK
    })
  };

  // navbar
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  return (
    <div className="h-auto fixed w-full bg-white px-3 md:px-0 py-4 z-30 flex justify-between items-center container mx-auto">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Image
            src="/assets/images/logo-pali.png"
            alt="logo"
            width={500}
            height={500}
            unoptimized
            className="md:w-14 w-10 object-contain"
          />
        </div>
        <div className="flex flex-col text-primary-800">
          <div className="font-bold text-xl md:text-2xl">SISKP</div>
          <div className="text-[10px] md:text-sm">Sistem Informasi Kepuasaan Pegawai</div>
        </div>
      </div>

      {/* Hamburger Menu Button (Mobile) */}
      <div className="md:hidden">
        <button
          className="focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-primary-800"></span>
            <span className="block w-6 h-0.5 bg-primary-800"></span>
            <span className="block w-6 h-0.5 bg-primary-800"></span>
          </div>
        </button>
      </div>
      {/* Button Section (Desktop) */}
      <div className="hidden md:flex space-x-4">
        {!accessToken ? (
          // Jika tidak ada accessToken, tampilkan Login dan Daftar
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
        ) : (
          // Jika ada accessToken, tampilkan profile
          <div className="wrap ml-4 flex gap-3 items-center cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 text-white">
                  <div className="h-[35px] w-[35px] border border-white rounded-full overflow-hidden">
                    <Image
                      src={"/assets/images/user-profil.png"}
                      alt="logo"
                      width={400}
                      height={400}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-primary">Nama User</div>
                  <div>
                    <ArrowDown />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white mt-2">
                <DropdownMenuItem>
                  <Link
                    className={`w-full cursor-pointer ${pathname === "/profile" ? "font-bold text-primary" : "text-black"}`}
                    href="/profile"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className={`w-full cursor-pointer ${pathname === "/history" ? "font-bold text-primary" : "text-black"}`}
                    href="/history"
                  >
                    Riwayat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div onClick={handleLogout} className="w-full cursor-pointer">
                    Keluar
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Mobile Navbar Drawer */}
      <div
        className={`fixed z-50 top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${menuOpen ? "translate-x-0" : "translate-x-full"
          } w-64 md:hidden`}
        onClick={(e) => e.stopPropagation()} // Prevent overlay from closing menu
      >
        <div className="flex flex-col p-6 space-y-6">
          <button
            className="self-end focus:outline-none"
            onClick={closeMenu}
          >
            ✕
          </button>
          {!accessToken ? (
            <div className="flex flex-col gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation to prevent overlay click
                  modal.onOpen("login");
                  closeMenu();
                }}
                variant="default"
                className="w-full"
              >
                Masuk
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation to prevent overlay click
                  modal.onOpen("register");
                  closeMenu();
                }}
                variant="outlinePrimary"
                className="w-full"
              >
                Daftar
              </Button>
            </div>

          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white">
                <div className="h-[35px] w-[35px] border border-white rounded-full overflow-hidden">
                  <Image
                    src={"/assets/images/user-profil.png"}
                    alt="logo"
                    width={400}
                    height={400}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-primary">Nama User</div>
              </div>
              <Link
                href="/profile"
                className={`p-2 rounded-full w-full text-center ${pathname === "/profile" ? "bg-primary border text-sm border-primary text-white" : "bg-white border text-sm border-primary text-primary"}`}
              >
                Profile
              </Link>
              <Link
                href="/history"
                className={`p-2 rounded-full w-full text-center ${pathname === "/history" ? "bg-primary border text-sm border-primary text-white" : "bg-white border text-sm border-primary text-primary"}`}
              >
                Riwayat
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-sm text-white  p-2 rounded-full w-full text-center"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay when menu is open */}
      {
        menuOpen && (
          <div
            className="fixed z-20 inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={closeMenu}
          ></div>
        )
      }
    </div >
  );
}

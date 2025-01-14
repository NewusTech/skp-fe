"use client";
import { useModal } from "@/hooks/modal";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";

export default function NavbarAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const modal = useModal();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="h-auto px-3 md:px-0 bg-white py-4 w-full flex justify-between items-center container mx-auto relative">
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
                    <div className="font-bold text-xl sm:text-2xl">SISKP</div>
                    <div className="text-[10px] sm:text-sm">Sistem Informasi Kepuasaan Pegawai</div>
                </div>
            </div>

            {/* Hamburger Menu Button (Mobile) */}
            <div className="sm:hidden">
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
            <div className="hidden sm:flex space-x-4">
                <Button
                    onClick={() => modal.onOpen("login-admin")}
                    variant="default"
                    className="w-[140px]"
                >
                    Masuk
                </Button>
            </div>

            {/* Mobile Navbar Drawer */}
            <div
                className={`fixed z-50 top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${menuOpen ? "translate-x-0" : "translate-x-full"
                    } w-64 sm:hidden`}
                onClick={(e) => e.stopPropagation()} // Prevent overlay from closing menu
            >
                <div className="flex flex-col p-6 space-y-6">
                    <button
                        className="self-end focus:outline-none"
                        onClick={closeMenu}
                    >
                        ✕
                    </button>
                    {/* belum login */}
                    <Button
                        onClick={(e) => {
                            e.stopPropagation(); // Stop propagation to prevent overlay click
                            modal.onOpen("login-admin");
                            closeMenu();
                        }}
                        variant="default"
                        className="w-full"
                    >
                        Masuk
                    </Button>
                </div>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    className="fixed z-20 inset-0 bg-black bg-opacity-50 sm:hidden"
                    onClick={closeMenu}
                ></div>
            )}
        </div>
    );
}

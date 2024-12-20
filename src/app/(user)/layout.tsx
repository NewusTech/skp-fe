import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/ui/navbar";
import ModalContainer from "@/components/modals/Wrapper";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <Navbar />
                <div className=""></div>
                <div className="container mx-auto py-[75px]">
                    {children}
                </div>
            </body>
            <ModalContainer />
        </html>
    );
}

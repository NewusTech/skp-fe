import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "SISKP - Sistem Informasi Kepuasaan Pegawai",
  description: "SISKP - Sistem Informasi Kepuasaan Pegawai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader color="#80AC6C" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}

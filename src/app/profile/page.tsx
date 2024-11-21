"use client";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/TextField";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserCircle2 } from "lucide-react";

enum FormFields {
  Email = "email",
  Nama = "nama",
  NIP = "nip",
  Usia = "usia",
  JenisKelamin = "jenisKelamin",
  Jabatan = "jabatan",
  Departemen = "departemen",
  NomorTelepon = "nomorTelepon",
}

const formFields = [
  { name: FormFields.Nama, label: "Nama" },
  { name: FormFields.NIP, label: "NIP" },
  { name: FormFields.Usia, label: "Usia" },
  { name: FormFields.JenisKelamin, label: "Jenis Kelamin" },
  { name: FormFields.Jabatan, label: "Jabatan / Posisi" },
  { name: FormFields.Departemen, label: "Departemen / Divisi" },
  { name: FormFields.Email, label: "Email", type: "email" },
  { name: FormFields.NomorTelepon, label: "Nomor Telepon" },
];

export default function ProfilePage() {
  const form = useForm({
    defaultValues: {
      nama: "Qurrata Aini Dilla Azzahra",
      usia: "20 Tahun",
      jabatan: "Staff",
      email: "dilla@gmail.com",
      nip: "182892981298819",
      jenisKelamin: "Perempuan",
      departemen: "Kesehatan Lingkungan",
      nomorTelepon: "0853-4562617",
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-8 mt-[54px]">
      <div
        className="bg-[#FCFBFB] rounded-2xl p-8 shadow-sm"
        style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="flex flex-col items-center gap-4 mb-8 relative">
          <UserCircle2 className="w-[100px] h-[100px] text-gray-300" />
          <div className="text-center">
            <h1 className="text-base font-semibold text-[#483D3D] mb-2">
              Foto Profil
            </h1>
            <Button
              variant="ghost"
              className="rounded-full absolute left-1/2 -translate-x-1/2 bottom-10 text-[10px] text-[#FCFBFB] hover:bg-transparent opacity-0 hover:opacity-100 transition-opacity"
              disabled
            >
              Edit
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: fieldProps }) => (
                    <FormItem className="space-y-2 w-[387px]">
                      <FormLabel className="w-[387px]">{field.label}</FormLabel>
                      <FormControl>
                        <TextField
                          {...fieldProps}
                          type={field.type || "text"}
                          disabled
                          className="w-[387px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="bg-[#FCFBFB] rounded-lg p-6 mt-4">
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full w-[290px] h-[40px] font-normal"
                >
                  Edit
                </Button>
                <Button
                  type="submit"
                  className="rounded-full w-[290px] h-[40px] font-normal"
                >
                  Ganti Kata Sandi
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

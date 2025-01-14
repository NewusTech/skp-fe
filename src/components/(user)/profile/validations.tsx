import { z } from "zod";

export const profileFormSchema = z.object({
    image_profile: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size > 0, {
            message: "Gambar wajib diisi!",
        }),
    nama: z.string().min(1, "Nama wajib diisi"),
    nip: z.string().min(1, "NIP wajib diisi"),
    usia: z.preprocess(
        (val) => Number(val),
        z.number().min(0, { message: "Jawaban tidak boleh kosong!" })
    ),
    jenisKelamin: z.string().min(1, "Jenis Kelamin wajib diisi"),
    jabatan: z.string().min(1, "Jabatan/Posisi wajib diisi"),
    jenisKetenagaan: z.string().min(1, "Jenis Ketenagaan wajib diisi"),
    pendidikanTerakhir: z.string().min(1, "Pendidikan Terakhir wajib diisi"),
    masaKerja: z.preprocess(
        (val) => Number(val),
        z.number().min(0, { message: "Jawaban tidak boleh kosong!" })
    ),
    email: z.string().email("Email tidak valid"),
    nomorTelepon: z.string().regex(/^\d+$/, "Nomor Telepon harus berupa angka"),
    provinsi: z.string().min(1, "Provinsi wajib diisi"),
    kabupaten: z.string().min(1, "Kabupaten wajib diisi"),
    kecamatan: z.string().min(1, "Kecamatan wajib diisi"),
    desa: z.string().min(1, "Desa wajib diisi"),
    rt: z.string().regex(/^\d*$/, "RT harus berupa angka"),
    rw: z.string().regex(/^\d*$/, "RW harus berupa angka"),
    alamat: z.string().min(1, "Alamat wajib diisi"),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;

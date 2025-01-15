import { z } from "zod";

export const complaint = z.object({
    tanggal: z.string({
        required_error: "Tanggal tidak boleh kosong!",
    }).min(1, { message: "Tanggal tidak boleh kosong!" }),
    judul: z.string().min(1, { message: "Judul tidak boleh kosong!" }),
    aduan: z.string().min(1, { message: "Aduan tidak boleh kosong!" }),
    image: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size > 0, {
            message: "Gambar wajib diisi!",
        }),
});
export type complaintFormData = z.infer<typeof complaint>;
import { z } from "zod";

export const complaint = z.object({
    tanggal_pengaduan: z.string({
        required_error: "Tanggal tidak boleh kosong!",
    }).min(1, { message: "Tanggal tidak boleh kosong!" }),
    puskesmas_id: z.preprocess(
        (val) => Number(val),
        z.number().min(1, { message: "Jawaban tidak boleh kosong!" })
    ),
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
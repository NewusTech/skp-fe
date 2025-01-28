import { z } from "zod";

export const complaintUser = z.object({
    name: z.string().min(1, { message: "Nama tidak boleh kosong!" }),
    telepon: z.string().min(1, { message: "Telepon tidak boleh kosong!" }),
    jabatan: z.string().min(1, { message: "Jabatan tidak boleh kosong!" }),
    pendidikan: z.string().min(1, { message: "Pendidikan tidak boleh kosong!" }),
    jeniskelamin: z.string({
        required_error: "Jenis kelamin tidak boleh kosong!",
    }).min(1, { message: "Jenis kelamin tidak boleh kosong!" }),
    email: z.string().min(1, { message: "Email tidak boleh kosong!" }),
    jenisketenagakerjaan: z.string({
        required_error: "Ketenagakerjaan tidak boleh kosong!",
    }).min(1, { message: "Ketenagakerjaan tidak boleh kosong!" }),
    masakerja: z.string().min(1, { message: "Masa kerja tidak boleh kosong!" }),
    date: z.string({
        required_error: "Tanggal tidak boleh kosong!",
    }).min(1, { message: "Tanggal tidak boleh kosong!" }),
    puskesmas_id: z.preprocess(
        (val) => Number(val),
        z.number().min(1, { message: "Jawaban tidak boleh kosong!" })
    ),
    kritiksaran: z.string().min(1, { message: "Kritik saran tidak boleh kosong!" }),
});
export type complaintUserFormData = z.infer<typeof complaintUser>;
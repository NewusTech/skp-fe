import { z } from "zod";

export const replyComplaint = z
    .object({
        jawaban: z.string().min(1, { message: "Jawaban tidak boleh kosong!" }),
    })
    .required();
export type replyComplaintFormData = z.infer<typeof replyComplaint>;
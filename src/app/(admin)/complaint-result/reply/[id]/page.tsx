"use client"

import TitleLabel from "@/components/custom/TitleHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


interface HeaderProps {
    label?: string;
    value?: string;
}
const HeaderLabel = (props: HeaderProps) => {
    return (
        <div className="flex w-full">
            <div className="font-semibold w-1/3">{props.label}</div>
            <div className="w-2/3">: {props.value}</div>
        </div>
    );
};

const ReplyComplaint = () => {
    const pengaduanData = {
        respondent: {
            nama: "Qurrota Aini Dila Azzahra",
            jenisKelamin: "Perempuan",
            jabatan: "Staff",
            ketenagaan: "ASN",
            tanggal: "20/11/2024",
        },
        judulAduan:
            "Lorem ipsum dolor sit amet consectetur. ",
        aduan:
            "Lorem ipsum dolor sit amet consectetur. Potenti curabitur ut pharetra parturient adipiscing praesent in in nibh. Lorem ipsum dolor sit amet consectetur. Potenti curabitur ut pharetra parturient adipiscing praesent in in nibh. Lorem ipsum dolor sit amet consectetur. Potenti curabitur ut pharetra parturient adipiscing praesent in in nibh.",
        balasan:
            "Lorem ipsum dolor sit amet consectetur. Dolor aliquet scelerisque odio duis donec posuere est. Vitae leo pharetra dictum libero aliquet purus lorem volutpat. Mollis scelerisque vivamus amet tristique mattis auctor. Sit nisi metus placerat dui in lorem est gravida.",
    };

    return (
        <div className="flex flex-col gap-3">
            <TitleLabel label="Balas Pengaduan" />
            <div className="header flex flex-col gap-3 mb-4">
                <HeaderLabel label="Nama" value={pengaduanData.respondent.nama} />
                <HeaderLabel label="Jenis Kelamin" value={pengaduanData.respondent.jenisKelamin} />
                <HeaderLabel label="Jabatan" value={pengaduanData.respondent.jabatan} />
                <HeaderLabel label="Ketenagaan" value={pengaduanData.respondent.ketenagaan} />
                <HeaderLabel label="Tanggal" value={pengaduanData.respondent.tanggal} />
            </div>
            {/* judul */}
            <div className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3">
                <div className="font-semibold text-primary">Judul Aduan</div>
                <div>{pengaduanData.judulAduan}</div>
            </div>
            {/* aduan */}
            <div className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3">
                <div className="font-semibold text-primary">Aduan</div>
                <div>{pengaduanData.aduan}</div>
            </div>
            {/* dokumen */}
            <div className="card rounded-xl flex flex-col gap-3">
                <div className="font-semibold text-primary">Dokumen</div>
                <div className="w-[400px] h-[300px] rounded-lg bg-gray-200"></div>
            </div>
            {/* balasan */}
            <form className="flex flex-col gap-2">
                <div className="font-semibold text-primary">Balasan</div>
                <div>
                    <Textarea
                        placeholder="Balas aduan"
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <Button
                        className="w-[200px]"
                    >
                        Kirim
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ReplyComplaint;

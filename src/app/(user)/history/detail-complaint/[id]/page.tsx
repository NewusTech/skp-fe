"use client"

import TitleLabel from "@/components/custom/TitleHeader";


interface HeaderProps {
    label?: string;
    value?: string;
}
const HeaderLabel = (props: HeaderProps) => {
    return (
        <div className="flex w-full md:text-base text-sm">
            <div className="font-semibold w-1/3">{props.label}</div>
            <div className="w-2/3">: {props.value}</div>
        </div>
    );
};

const DetailComplaint = () => {
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
            <TitleLabel label="Detail Pengaduan" />
            <div className="header flex flex-col gap-3 mb-4">
                <HeaderLabel label="Nama" value={pengaduanData.respondent.nama} />
                <HeaderLabel label="Jenis Kelamin" value={pengaduanData.respondent.jenisKelamin} />
                <HeaderLabel label="Jabatan" value={pengaduanData.respondent.jabatan} />
                <HeaderLabel label="Ketenagaan" value={pengaduanData.respondent.ketenagaan} />
                <HeaderLabel label="Tanggal" value={pengaduanData.respondent.tanggal} />
            </div>
            {/* judul */}
            <div className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3 md:text-base text-sm">
                <div className="font-semibold text-primary">Judul Aduan</div>
                <div>{pengaduanData.judulAduan}</div>
            </div>
            {/* aduan */}
            <div className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3 md:text-base text-sm">
                <div className="font-semibold text-primary">Aduan</div>
                <div>{pengaduanData.aduan}</div>
            </div>
            {/* dokumen */}
            <div className="card rounded-xl flex flex-col gap-3 md:text-base text-sm">
                <div className="font-semibold text-primary">Dokumen</div>
                <div className="md:w-[400px] w-full md:h-[300px] h-[250px] rounded-lg bg-gray-200"></div>
            </div>
            {/* balasan */}
            <div className="flex flex-col gap-2">
                <div className="font-semibold text-primary">Balasan</div>
                <div className="card rounded-xl bg-white border p-4 flex flex-col gap-3 md:text-base text-sm">
                    <div>{pengaduanData.balasan}</div>
                </div>
            </div>
        </div>
    );
};

export default DetailComplaint;

import TitleLabel from "@/components/custom/TitleHeader";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import React from "react";

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

const DetailSurvey = () => {
    const surveyData = {
        respondent: {
            nama: "Qurrota Aini Dila Azzahra",
            jenisKelamin: "Perempuan",
            jabatan: "Staff",
            ketenagaan: "ASN",
            tanggal: "20/11/2024",
        },
        questions: [
            {
                id: 1,
                pertanyaan:
                    "Lorem ipsum dolor sit amet consectetur. Suspendisse eget quis leo semper in nulla risus eu orci.",
                jawaban: "4",
            },
            {
                id: 2,
                pertanyaan:
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
                jawaban: "5",
            },
        ],
        kritikSaran:
            "Lorem ipsum dolor sit amet consectetur. Nulla gravida ut consequat blandit pellentesque nulla integer mauris commodo. Augue etiam sit non felis nulla massa non porttitor ullamcorper. Vitae justo ornare sed aliquam felis senectus. Mattis tincidunt ut suspendisse nulla est mus.",
    };

    return (
        <div className="flex flex-col gap-3">
            <TitleLabel label="Detail Survey" />
            <div className="header flex flex-col gap-3 mb-4">
                <HeaderLabel label="Nama" value={surveyData.respondent.nama} />
                <HeaderLabel label="Jenis Kelamin" value={surveyData.respondent.jenisKelamin} />
                <HeaderLabel label="Jabatan" value={surveyData.respondent.jabatan} />
                <HeaderLabel label="Ketenagaan" value={surveyData.respondent.ketenagaan} />
                <HeaderLabel label="Tanggal" value={surveyData.respondent.tanggal} />
            </div>
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    className="text-primary flex gap-2 items-center"
                >
                    <Printer color="#80AC6C" />
                    Print
                </Button>
            </div>
            {/* question */}
            {surveyData.questions.map((question, index) => (
                <div key={question.id} className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3">
                    <div className="font-semibold text-primary">Pertanyaan {index + 1}</div>
                    <div>{question.pertanyaan}</div>
                    <div className="font-semibold">
                        Jawaban : <span className="ml-3 font-normal">{question.jawaban}</span>
                    </div>
                </div>
            ))}
            {/* kritik saran */}
            <div className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3">
                <div className="font-semibold text-primary">Kritik dan Saran</div>
                <div>{surveyData.kritikSaran}</div>
            </div>
        </div>
    );
};

export default DetailSurvey;

"use client";
import { useState } from "react";
import TitleLabel from "@/components/custom/TitleHeader";
import { DatePicker } from "@/components/custom/dateInput";
import InputComponent from "@/components/custom/inputComponent";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { showAlert } from "@/lib/swalAlert";
import { useRouter } from "next/navigation";
import { useGetPuskesmas } from "@/services/api";
import { SelectInput } from "@/components/custom/selectInput";

export default function SurveyLoginPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedPuskesmasId, setSelectedPuskesmasId] = useState<number | null>();
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [kritiksaran, setKritikSaran] = useState<string>("");
    const axiosPrivate = useAxiosPrivate();
    const navigate = useRouter();
    const [loading, setLoading] = useState(false);

    const dummyQuestions = [
        { id: 1, text: "Bagaimana pendapat Anda tentang pelayanan kami?" },
        { id: 2, text: "Seberapa puas Anda dengan fasilitas yang tersedia?" },
        { id: 3, text: "Apakah Anda merasa informasi yang diberikan jelas?" },
    ];

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    const handleAnswerClick = (questionId: number, value: number) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    // Get Puskesmas
    const { data: dataPuskesmas } = useGetPuskesmas();
    const puskesmas_idOptions = dataPuskesmas?.data.map((category: { name: string; id: number; }) => ({
        label: category.name,
        value: category.id,
    }));

    const handleSubmit = async () => {
        if (!selectedDate) {
            showAlert("error", "Tanggal harus diisi!");
            return;
        }

        if (!selectedPuskesmasId) {
            showAlert("error", "Puskesmas harus dipilih!");
            return;
        }

        const datainput = Object.entries(answers).map(([key, value]) => ({
            surveyform_id: Number(key),
            nilai: value.toString(),
        }));

        const payload = {
            datainput,
            date: selectedDate.toISOString().split("T")[0],
            kritiksaran,
            puskesmas_id: selectedPuskesmasId,
        };

        console.log("payload", payload);

        // setLoading(true);
        // try {
        //     await axiosPrivate.post(`/user/inputsurvey/create`, payload);
        //     showAlert("success", "Data berhasil disimpan!");
        //     navigate.push("/");
        // } catch (error: any) {
        //     const errorMessage =
        //         error?.response?.data?.data?.[0]?.message ||
        //         error?.response?.data?.message ||
        //         "Gagal mengirim survey!";
        //     showAlert("error", errorMessage);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <form className="flex flex-col gap-5">
            <TitleLabel label="Isi Survey" />
            <div className="date p-7 rounded-xl bg-[#F8F7F7] flex md:flex-row flex-col gap-7">
                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <InputComponent title="Tanggal">
                        <DatePicker
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                            placeholder="Pilih Tanggal"
                            className="w-full"
                        />
                    </InputComponent>
                </div>
                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <InputComponent title="Puskesmas">
                        <SelectInput
                            label="Puskesmas"
                            options={puskesmas_idOptions}
                            placeholder="Pilih Puskesmas"
                            value={selectedPuskesmasId}
                            onChange={(value) => setSelectedPuskesmasId(value)}
                            width={`w-full`}
                        />
                    </InputComponent>
                </div>
            </div>
            <div className="space-y-8">
                {dummyQuestions.map((question) => (
                    <div key={question.id} className="space-y-8">
                        <p className="md:text-base text-sm font-semibold text-primary-800">
                            {question.id}. {question.text}
                        </p>
                        <div className="flex justify-between items-center px-12">
                            {[1, 2, 3, 4].map((value) => (
                                <div
                                    key={value}
                                    className="text-center flex justify-center flex-col items-center cursor-pointer text-primary"
                                    onClick={() => handleAnswerClick(question.id, value)}
                                >
                                    <p className="text-sm md:text-base font-normal mb-2">
                                        {value === 1
                                            ? "Tidak"
                                            : value === 2
                                                ? "Kurang Baik"
                                                : value === 3
                                                    ? "Baik"
                                                    : "Sangat Baik"}
                                    </p>
                                    <div
                                        className={`w-[50px] h-[50px] rounded-full flex items-center justify-center ${answers[question.id] === value
                                            ? "bg-primary text-white"
                                            : "border-2 border-primary"
                                            }`}
                                    >
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <p className="text-sm md:text-base font-medium mb-2 text-[#456237]">
                    Kritik dan Saran
                </p>
                <Textarea
                    placeholder="Tulis kritik dan saran Anda di sini..."
                    value={kritiksaran}
                    onChange={(e) => setKritikSaran(e.target.value)}
                />
            </div>
            <div className="flex justify-center gap-4 md:mt-8 mt-4">
                <Button
                    type="button"
                    variant="outlinePrimary"
                    className="rounded-full w-full md:w-[160px]"
                    onClick={() => router.push('/')}
                >
                    Batal
                </Button>
                <Button
                    type="button"
                    variant="default"
                    className="rounded-full w-full md:w-[160px]"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <Loading /> : "Kirim Survey"}
                </Button>
            </div>
        </form>
    );
}

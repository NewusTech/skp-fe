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
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/custom/selectInput";
import { complaintUser, complaintUserFormData } from "./validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HelperError from "@/components/ui/HelperError";
import { useGetPuskesmas } from "@/services/api";
import { format } from 'date-fns';


export default function SurveyNotLoginPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);
    const [selectedKetenagaan, setSelectedKetenagaan] = useState<string | undefined>(undefined);
    const [selectedPuskesmas, setSelectedPuskesmas] = useState<string | undefined>(undefined);
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
    const handleKetenagaanChange = (value: string) => {
        setSelectedKetenagaan(value);
    };


    const handleGenderChange = (value: string) => {
        setSelectedGender(value);
    };
    const handlePuskesmasChange = (value: string) => {
        setSelectedPuskesmas(value);
    };

    const handleAnswerClick = (questionId: number, value: number) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    // 
    const genderOptions = [
        { label: "Laki-Laki", value: "male" },
        { label: "Perempuan", value: "female" },
    ];

    const ketenagaanOptions = [
        { label: "ASN", value: "asn" },
        { label: "Non ASN", value: "non-asn" },
    ];

    // get puskesmas
    const { data: dataPuskesmas } = useGetPuskesmas();
    const puskesmas_idOptions = dataPuskesmas?.data.map((category: { name: string; id: number; }) => ({
        label: category.name,
        value: category.id,
    }));
    // 


    // const handleSubmit = async () => {
    //     if (!selectedDate) {
    //         showAlert("error", "Tanggal harus diisi!");
    //         return;
    //     }

    //     const datainput = Object.entries(answers).map(([key, value]) => ({
    //         surveyform_id: Number(key),
    //         nilai: value.toString(),
    //     }));

    //     const payload = {
    //         datainput,
    //         date: selectedDate.toISOString().split("T")[0],
    //         kritiksaran,
    //     };

    //     console.log("payload", payload);

    //     setLoading(true);
    //     try {
    //         await axiosPrivate.post(`/user/inputsurvey/create`, payload);
    //         showAlert("success", "Data berhasil disimpan!");
    //         navigate.push("/");
    //     } catch (error: any) {
    //         const errorMessage =
    //             error?.response?.data?.data?.[0]?.message ||
    //             error?.response?.data?.message ||
    //             "Gagal mengirim survey!";
    //         showAlert("error", errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // 
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<complaintUserFormData>({
        resolver: zodResolver(complaintUser),
    });

    const onSubmit: SubmitHandler<complaintUserFormData> = async (data) => {
        // setLoading(true); // Set loading to true when the form is submitted
        const datainput = Object.entries(answers).map(([key, value]) => ({
            surveyform_id: Number(key),
            nilai: value.toString(),
        }));

        const formattedDate = format(new Date(data.date), 'yyyy-MM-dd');
        const payload = {
            ...data,
            date: formattedDate,
            datainput
        }

        console.log("payload= ", payload)

        // try {
        //     await axiosPrivate.post(`/user/pengaduan/create`, data, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     // alert
        //     showAlert('success', 'Data berhasil diperbarui!');
        //     // alert
        //     navigate.push('/history');
        //     // reset();
        // } catch (error: any) {
        //     // Extract error message from API response
        //     const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
        //     showAlert('error', errorMessage);
        // } finally {
        //     setLoading(false); // Set loading to false once the process is complete
        // }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <TitleLabel label="Isi Survey" />
            {/* not login */}
            <div className="date p-7 rounded-xl bg-[#F8F7F7] flex md:flex-row flex-col gap-7">
                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <InputComponent title="Nama">
                        <div className="w-full">
                            <Input
                                placeholder="Nama"
                                {...register("name")}
                            />
                            <HelperError>{errors?.name?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Nomor Telepon">
                        <div className="w-full">
                            <Input
                                placeholder="Nomor Telepon"
                                {...register("telepon")}
                            />
                            <HelperError>{errors?.telepon?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Jabatan">
                        <div className="w-full">
                            <Input
                                placeholder="Jabatan"
                                {...register("jabatan")}
                            />
                            <HelperError>{errors?.jabatan?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Pendidikan Terakhir">
                        <div className="w-full">
                            <Input
                                placeholder="Pendidikan Terakhir"
                                {...register("pendidikan")}
                            />
                            <HelperError>{errors?.pendidikan?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Tanggal">
                        <div className="w-full">
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        selectedDate={field.value ? new Date(field.value) : undefined}
                                        onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                                        placeholder="Pilih Tanggal"
                                        className="w-full p-2 border rounded-full px-3"
                                    />
                                )}
                            />
                            <HelperError>{errors?.date?.message}</HelperError>
                        </div>
                    </InputComponent>
                </div>
                {/* right */}
                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <InputComponent title="Jenis Kelamin">
                        <div className="w-full">
                            <Controller
                                name="jeniskelamin"
                                control={control}
                                render={({ field }) => (
                                    <SelectInput
                                        label="Jenis Kelamin"
                                        options={genderOptions}
                                        placeholder="Pilih jenis kelamin"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.puskesmas_id ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            <HelperError>{errors?.jeniskelamin?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Email">
                        <div className="w-full">
                            <Input
                                placeholder="Email"
                                {...register("email")}
                            />
                            <HelperError>{errors?.email?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Jenis Ketenagaan">
                        <div className="w-full">
                            <Controller
                                name="jenisketenagakerjaan"
                                control={control}
                                render={({ field }) => (
                                    <SelectInput
                                        label="Jenis Ketenagaan"
                                        options={ketenagaanOptions}
                                        placeholder="Pilih jenis ketenagaan"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.puskesmas_id ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            <HelperError>{errors?.jenisketenagakerjaan?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Masa Kerja">
                        <div className="w-full">
                            <Input
                                placeholder="Masa Kerja"
                                {...register("masakerja")}
                            />
                            <HelperError>{errors?.masakerja?.message}</HelperError>
                        </div>
                    </InputComponent>
                    <InputComponent title="Puskesmas">
                        <div className="w-full">
                            <Controller
                                name="puskesmas_id"
                                control={control}
                                render={({ field }) => (
                                    <SelectInput
                                        label="Puskesmas"
                                        options={puskesmas_idOptions}
                                        placeholder="Pilih Puskesmas"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.puskesmas_id ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            <HelperError>{errors?.puskesmas_id?.message}</HelperError>
                        </div>
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
                    {...register("kritiksaran")}
                />
                <HelperError>{errors?.kritiksaran?.message}</HelperError>
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
                    type="submit"
                    variant="default"
                    className="rounded-full w-full md:w-[160px]"
                    disabled={loading}
                >
                    {loading ? <Loading /> : "Kirim Survey"}
                </Button>
            </div>
        </form>
    );
}

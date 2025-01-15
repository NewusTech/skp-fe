"use client";
import { putSubmitReplyComplaint, useGetComplaintId } from "@/components/(admin)/complaint/api";
import { replyComplaint, replyComplaintFormData } from "@/components/(admin)/complaint/validation";
import TitleLabel from "@/components/custom/TitleHeader";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/Loading";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    // data fetching
    const { id } = useParams();
    const { data } = useGetComplaintId(id as string);
    const dataUser = data?.data;

    // data put
    const [loading, setLoading] = useState(false);

    // intergasi
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<replyComplaintFormData>({
        resolver: zodResolver(replyComplaint),
        defaultValues: {
            jawaban: "",
        },
    });
    // Dynamically update form values when `dataUser` changes
    useEffect(() => {
        if (dataUser?.jawaban) {
            setValue("jawaban", dataUser.jawaban);
        }
    }, [dataUser, setValue]);
    // update
    const { handlePostSubmit } = putSubmitReplyComplaint(id as string);
    const onSubmit: SubmitHandler<replyComplaintFormData> = (data) => {
        handlePostSubmit(data, setLoading);
    };

    return (
        <div className="flex flex-col gap-3">
            <TitleLabel label="Balas Pengaduan" />
            <div className="header flex flex-col gap-3 mb-4">
                <HeaderLabel label="Nama" value={dataUser?.Userinfo?.name || "-"} />
                <HeaderLabel label="Jenis Kelamin" value={dataUser?.Userinfo?.gender || "-"} />
                <HeaderLabel label="Jabatan" value={dataUser?.Userinfo?.jabatan || "-"} />
                <HeaderLabel label="Ketenagaan" value={dataUser?.Userinfo?.ketenagaan || "-"} />
                <HeaderLabel label="Tanggal" value={dataUser?.createdAt || "-"} />
            </div>
            <div className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3">
                <div className="font-semibold text-primary">Judul Aduan</div>
                <div>{dataUser?.judul || "-"}</div>
            </div>
            <div className="card rounded-xl bg-[#F8F7F7] p-6 flex flex-col gap-3">
                <div className="font-semibold text-primary">Aduan</div>
                <div>{dataUser?.aduan || "-"}</div>
            </div>
            <div className="card rounded-xl flex flex-col gap-3">
                <div className="font-semibold text-primary">Dokumen</div>
                <div
                    className="md:w-[400px] w-full h-[300px] rounded-lg bg-gray-200 overflow-hidden cursor-pointer"
                    onClick={() => setIsModalOpen(true)} // Open modal on click
                >
                    <Image
                        src={dataUser?.image || "/assets/images/no-image.jpg"}
                        alt="logo"
                        width={500}
                        height={500}
                        unoptimized
                        className="h-full object-cover"
                    />
                </div>
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsModalOpen(false)} // Close modal on background click
                >
                    <div
                        className="bg-white p-4 rounded-lg shadow-lg relative"
                        onClick={(e) => e.stopPropagation()} // Prevent close on image click
                    >
                        <button
                            className="absolute top-2 right-2 bg-primary-800 w-6 h-6 rounded-full text-white"
                            onClick={() => setIsModalOpen(false)} // Close modal on button click
                        >
                            ✕
                        </button>
                        <Image
                            src={dataUser?.image || "/assets/images/no-image.jpg"}
                            alt="logo"
                            width={800}
                            height={800}
                            unoptimized
                            className="w-auto h-[500px] object-contain"
                        />
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className="font-semibold text-primary">Balasan</div>
                <div>
                    <Textarea
                        placeholder="Balas aduan"
                        defaultValue={dataUser?.jawaban || ""}
                        {...register('jawaban')}
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <Button
                        disabled={loading}
                        className="w-[200px]">
                        {loading ? <Loading /> : "Kirim"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ReplyComplaint;

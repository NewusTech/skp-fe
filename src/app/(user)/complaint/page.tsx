"use client"
import { complaint, complaintFormData } from '@/components/(user)/complaint/validation'
import { DatePicker } from '@/components/custom/dateInput'
import InputComponent from '@/components/custom/inputComponent'
import { SelectInput } from '@/components/custom/selectInput'
import TitleLabel from '@/components/custom/TitleHeader'
import { Button } from '@/components/ui/button'
import HelperError from '@/components/ui/HelperError'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

const ComplaintPage = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
    const [selectedPuskesmas, setSelectedPuskesmas] = useState<string | undefined>(undefined);
    const puskemasOptions = [
        { label: "Puskesmas Talang Ubi", value: "asn" },
        { label: "Puskesmas Tempirai", value: "non-asn" },
    ];
    const handlePuskesmasChange = (value: string) => {
        setSelectedPuskesmas(value);
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<complaintFormData>({
        resolver: zodResolver(complaint),
    });

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date)
    }

    // main logo
    const [imagePreviewMain, setImagePreviewMain] = useState<string | null>(null);
    const handleImageChangeMain = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('image', file);
            setImagePreviewMain(URL.createObjectURL(file));
        }
    };
    // main logo}

    const router = useRouter();
    // integrasi
    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const axiosPrivate = useAxiosPrivate();
    // Format tanggal dari Date object menjadi string 'YYYY-MM-DD'

    const onSubmit: SubmitHandler<complaintFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        const formattedDate = data.tanggal?.toString().split("T")[0];

        formData.append('tanggal', formattedDate?.toString() || '');
        formData.append('judul', data.judul);
        formData.append('aduan', data.aduan);

        // Memeriksa jika image ada sebelum menambahkannya ke formData
        if (data.image) {
            formData.append('image', data.image);
        }

        // Iterasi untuk menampilkan isi formData
        // console.log("FormData content:");
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        // try {
        //     await axiosPrivate.put(`/user/pengaduan/create`, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     // alert
        //     showAlert('success', 'Data berhasil diperbarui!');
        //     // alert
        //     navigate.push('/data-master/about-company');
        //     // reset();
        // } catch (error: any) {
        //     // Extract error message from API response
        //     const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
        //     showAlert('error', errorMessage);
        // } finally {
        //     setLoading(false); // Set loading to false once the process is complete
        // }
    };

    // token
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    useEffect(() => {
        setAccessToken(Cookies.get("accessToken"));
    }, []);

    return (
        <div>
            <TitleLabel label="Buat Pengaduan" />
            {!accessToken ? (
                <div className="h-[60vh] flex flex-col gap-3 justify-center items-center">
                    <div className="text-center">
                        Untuk Melakukan pengaduan <br /> silahkan login terlebih dahulu!
                    </div>
                    <Link
                        className='p-2 bg-primary text-white px-4 rounded-full'
                        href="/">
                        Beranda
                    </Link>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='md:mt-6 mt-4 flex flex-col gap-7'>
                    {/*  */}
                    <div className="date p-7 rounded-xl bg-[#F8F7F7] flex md:flex-row flex-col gap-7">
                        <div className="md:w-1/2 w-full flex flex-col gap-4">
                            <InputComponent title="Tanggal">
                                <Controller
                                    name="tanggal"
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
                                <HelperError>{errors?.tanggal?.message}</HelperError>
                            </InputComponent>
                        </div>
                        <div className="md:w-1/2 w-full flex flex-col gap-4">
                            <InputComponent title="Puskesmas">
                                <SelectInput
                                    label="Puskesmas"
                                    options={puskemasOptions}
                                    placeholder="Pilih puskesmas"
                                    value={selectedPuskesmas}
                                    onChange={handlePuskesmasChange}
                                />
                            </InputComponent>
                        </div>
                    </div>
                    {/*  */}
                    <InputComponent colorText="text-primary-800" title="Judul Aduan" isVertical>
                        <Input
                            placeholder="Judul Aduan"
                            {...register('judul')}
                        />
                        <HelperError>{errors?.judul?.message}</HelperError>
                    </InputComponent>
                    <InputComponent colorText="text-primary-800" title="Aduan" isVertical>
                        <Textarea
                            placeholder="Aduan"
                            {...register('aduan')}
                        />
                        <HelperError>{errors?.aduan?.message}</HelperError>
                    </InputComponent>
                    <InputComponent colorText="text-primary-800" title="Dokumen" isVertical>
                        <div className="text-editor h-[260px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChangeMain}
                                className="hidden"
                                id="main-logo"
                            />
                            <label
                                htmlFor="main-logo"
                                className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                            >
                                {imagePreviewMain ? (
                                    <Image
                                        src={imagePreviewMain}
                                        alt="Preview"
                                        width={300} // provide a fallback width
                                        height={200} // provide a fallback height
                                        className="rounded"
                                    />
                                ) : (
                                    <p>Click to select file</p>
                                )}
                            </label>
                        </div>
                        {errors.image && (
                            <HelperError>{errors.image.message}</HelperError>
                        )}
                    </InputComponent>
                    {/* button */}
                    <div className="flex justify-center gap-4">
                        <Button
                            type='button'
                            variant="outlineSecondary"
                            className="text-secondary w-full md:w-[120px]"
                            onClick={() => router.push('/')}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full md:w-[220px]"
                        >
                            Kirim Pengaduan
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ComplaintPage

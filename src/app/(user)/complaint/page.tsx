"use client"
import React, { useState } from 'react'
import { DatePicker } from '@/components/custom/dateInput'
import InputComponent from '@/components/custom/inputComponent'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import TitleLabel from '@/components/custom/TitleHeader'

const ComplaintPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [fileName, setFileName] = useState<string>('') // Menyimpan nama file yang dipilih

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name) // Menyimpan nama file yang dipilih
        }
    }

    const router = useRouter();

    return (
        <div>
            <TitleLabel label="Buat Pengaduan" />
            <form className='mt-6 flex flex-col gap-7'>
                <div className="date p-6 rounded-xl bg-[#F8F7F7] flex items-center">
                    <div className="font-semibold w-1/4">Tanggal</div>
                    <div className="w-3/4">
                        <DatePicker
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                            placeholder="Pilih Tanggal"
                            className='w-[500px]'
                        />
                    </div>
                </div>
                <InputComponent colorText="text-primary-800" title="Judul Aduan" isVertical>
                    <Input
                        placeholder="Judul Aduan"
                    />
                </InputComponent>
                <InputComponent colorText="text-primary-800" title="Aduan" isVertical>
                    <Textarea
                        placeholder="Aduan"
                    />
                </InputComponent>
                <InputComponent colorText="text-primary-800" title="Dokumen" isVertical>
                    <div className="text-editor h-[260px] border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            onChange={handleFileChange} // Menangani perubahan file
                        />
                        <label
                            htmlFor="image-upload"
                            className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                        >
                            {fileName ? <p>{fileName}</p> : <p>Click to select file</p>} {/* Menampilkan nama file jika ada */}
                        </label>
                    </div>
                </InputComponent>
                {/* button */}
                <div className="flex justify-center gap-4">
                    <Button
                        type='button'
                        variant="outlineSecondary"
                        className="text-secondary w-[120px]"
                        onClick={() => router.push('/')}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="secondary"
                    >
                        Kirim Pengaduan
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ComplaintPage

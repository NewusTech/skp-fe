"use client";

import TitleLabel from "@/components/custom/TitleHeader";
import { DatePicker } from "@/components/custom/dateInput";
import InputComponent from "@/components/custom/inputComponent";
import { SelectInput } from "@/components/custom/selectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function SurveyPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);
  const [selectedKetenagaan, setSelectedKetenagaan] = useState<string | undefined>(undefined);


  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
  };
  const handleKetenagaanChange = (value: string) => {
    setSelectedKetenagaan(value);
  };

  const handleAnswerClick = (questionId: number, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
    console.log(`Question ${questionId} selected answer: ${value}`);
  };

  // dummy
  const dummyQuestions = [
    { id: 1, text: "Bagaimana pendapat Anda tentang pelayanan kami?" },
    { id: 2, text: "Seberapa puas Anda dengan fasilitas yang tersedia?" },
    { id: 3, text: "Apakah Anda merasa informasi yang diberikan jelas?" },
  ];

  const genderOptions = [
    { label: "Laki-Laki", value: "male" },
    { label: "Perempuan", value: "female" },
  ];

  const ketenagaanOptions = [
    { label: "ASN", value: "asn" },
    { label: "Non ASN", value: "non-asn" },
  ];

  return (
    <form className="flex flex-col gap-5">
      <TitleLabel label="Isi Survey" />
      {/* with login */}
      <div className="date p-7 rounded-xl bg-[#F8F7F7] flex items-center">
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <InputComponent title="Tanggal">
            <DatePicker
              selectedDate={selectedDate}
              onChange={handleDateChange}
              placeholder="Pilih Tanggal"
              className='w-full'
            />
          </InputComponent>
        </div>
      </div>
      {/* not login */}
      <div className="date p-7 rounded-xl bg-[#F8F7F7] flex md:flex-row flex-col gap-7">
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <InputComponent title="Nama">
            <Input
              placeholder="Nama"
            />
          </InputComponent>
          <InputComponent title="Nomor Telepon">
            <Input
              placeholder="Nomor Telepon"
            />
          </InputComponent>
          <InputComponent title="Jabatan">
            <Input
              placeholder="Jabatan"
            />
          </InputComponent>
          <InputComponent title="Pendidikan Terakhir">
            <Input
              placeholder="Pendidikan Terakhir"
            />
          </InputComponent>
          <InputComponent title="Tanggal">
            <DatePicker
              selectedDate={selectedDate}
              onChange={handleDateChange}
              placeholder="Pilih Tanggal"
            />
          </InputComponent>
        </div>
        {/* right */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <InputComponent title="Jenis Kelamin">
            <SelectInput
              label="Jenis Kelamin"
              options={genderOptions}
              placeholder="Pilih jenis kelamin"
              value={selectedGender}
              onChange={handleGenderChange}
            />
          </InputComponent>
          <InputComponent title="Email">
            <Input
              placeholder="Email"
            />
          </InputComponent>
          <InputComponent title="Jenis Ketenagaan">
            <SelectInput
              label="Jenis Ketenagaan"
              options={ketenagaanOptions}
              placeholder="Pilih jenis ketenagaan"
              value={selectedGender}
              onChange={handleKetenagaanChange}
            />
          </InputComponent>
          <InputComponent title="Masa Kerja">
            <Input
              placeholder="Masa Kerja"
            />
          </InputComponent>
        </div>
      </div>
      {/* Questions */}
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
      {/* Kritik dan Saran */}
      <div className="mt-8">
        <p className="text-sm md:text-base font-medium mb-2 text-[#456237]">
          Kritik dan Saran
        </p>
        <Textarea placeholder="Tulis kritik dan saran Anda di sini..." />
      </div>
      {/* Buttons */}
      <div className="flex justify-center gap-4 md:mt-8 mt-4">
        <Button
          variant="outlinePrimary"
          className="rounded-full w-full md:w-[160px]"
          onClick={() => setAnswers({})}
        >
          Reset
        </Button>
        <Button
          variant="default"
          className="rounded-full w-full md:w-[160px]"
          onClick={(e) => {
            e.preventDefault();
            console.log("Survey Answers:", answers);
          }}
        >
          Kirim Survey
        </Button>
      </div>
    </form>
  );
}

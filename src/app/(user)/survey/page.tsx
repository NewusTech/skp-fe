"use client";

import TitleLabel from "@/components/custom/TitleHeader";
import { DatePicker } from "@/components/custom/dateInput";
import InputComponent from "@/components/custom/inputComponent";
import { SelectInput } from "@/components/custom/selectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { showAlert } from "@/lib/swalAlert";
import SurveyLoginPage from "@/components/(user)/survey/SurveyLogin";
import SurveyNotLoginPage from "@/components/(user)/survey/SurveyNotLogin";

export default function SurveyPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);
  const [selectedKetenagaan, setSelectedKetenagaan] = useState<string | undefined>(undefined);
  const [selectedPuskesmas, setSelectedPuskesmas] = useState<string | undefined>(undefined);


  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
  };
  const handleKetenagaanChange = (value: string) => {
    setSelectedKetenagaan(value);
  };
  const handlePuskesmasChange = (value: string) => {
    setSelectedPuskesmas(value);
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

  const puskemasOptions = [
    { label: "Puskesmas Talang Ubi", value: "asn" },
    { label: "Puskesmas Tempirai", value: "non-asn" },
  ];

  // token
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  // post
  const axiosPrivate = useAxiosPrivate();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {

    setLoading(true);
    // 
    const payload = {

    }
    try {
      setLoading(true);
      await axiosPrivate.post(`/user/inputsurvey/create`, payload);
      showAlert("success", "Data berhasil disimpan!");
      navigate.push("/my-package/history");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.data?.[0]?.message ||
        error?.response?.data?.message ||
        "Gagal menyelesaikan tryout!";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {accessToken ? (
        <SurveyLoginPage />
      ) : (
        <SurveyNotLoginPage />
      )}
    </div>
  );
}

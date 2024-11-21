"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TextField from "@/components/inputs/TextField";
import Dropdown from "@/components/inputs/Dropdown";

export default function SurveyPage() {
  const [date, setDate] = useState("");
  const [selectedPuskesmas, setSelectedPuskesmas] = useState("");

  return (
    <div className="w-[1280px] mx-auto p-8">
      <div className="flex justify-between items-center mb-8 bg-[#F8F7F7] p-8 rounded-lg">
        <div className="flex gap-10 items-center">
          <label className=" mb-0 block text-sm font-medium mb-2">
            Tanggal
          </label>
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-32"
          />
        </div>
        <div className="flex gap-10 items-center">
          <label className=" mb-0 block text-sm font-medium mb-2">
            Puskesmas
          </label>
          <Dropdown
            options={[
              { value: "puskesmas-1", label: "Puskesmas 1" },
              { value: "puskesmas-2", label: "Puskesmas 2" },
            ]}
            value={selectedPuskesmas}
            onValueChange={setSelectedPuskesmas}
            className="w-64"
          />
        </div>
      </div>

      <div className="space-y-8">
        {[1, 2, 3].map((questionNum) => (
          <div key={questionNum} className="space-y-8">
            <p className="text-base font-semibold text-[#456237]">
              {questionNum}. Lorem ipsum dolor sit amet consectetur.{" "}
              {questionNum === 2
                ? "Pulvinar sit placerat laoreet vulputate vulputat tempor eget arcu. Sed tristique et neque urna ipsum placerat."
                : "Et ornare duis leo sed dictum tellus ipsum nonuus. Arcu id ornare molestie eu."}
            </p>

            <div className="flex justify-between items-center px-12">
              <div className="text-center">
                <p className="text-base font-normal mb-2">Tidak</p>
                <div className="w-[50px] h-[50px] rounded-full bg-[#8DC63F] flex items-center justify-center text-white">
                  1
                </div>
              </div>
              <div className="text-center">
                <p className="text-base font-normal mb-2">Kurang Baik</p>
                <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-300 flex items-center justify-center">
                  2
                </div>
              </div>
              <div className="text-center">
                <p className="text-base font-normal mb-2">Baik</p>
                <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-300 flex items-center justify-center">
                  3
                </div>
              </div>
              <div className="text-center">
                <p className="text-base font-normal mb-2">Sangat Baik</p>
                <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-300 flex items-center justify-center">
                  4
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-base font-medium mb-2 text-[#456237]">
          Kritik dan Saran
        </p>
        <textarea
          className="w-full h-32 p-3 border rounded-lg resize-none"
          placeholder="Tulis kritik dan saran Anda di sini..."
        />
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" className="rounded-full">
          Reset
        </Button>
        <Button variant="default" className="rounded-full">
          Kirim Survey
        </Button>
      </div>
    </div>
  );
}

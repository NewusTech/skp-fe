"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import SurveyIlustration from "@/assets/ilustration/homepage-survey.svg";
import dynamic from "next/dynamic";
import { useModal } from "@/hooks/modal";

const ModalProvider = dynamic(
  () => import("@/components/modals/Base").then((mod) => mod.ModalProvider),
  {
    ssr: false,
  }
);

export default function Home() {
  const { modalType, onOpen } = useModal();

  return (
    <div className="mt-[85px] mx-auto">
      <div className="m-auto mt-[85px] w-[823px]">
        <Image
          className="m-auto"
          src={SurveyIlustration}
          alt="Survey Ilustration"
        />
        <h2 className="mt-4 text-center font-poppins text-base font-normal leading-[22.4px]">
          Lorem ipsum dolor sit amet consectetur. Urna risus quisque egestas
          nulla id. A placerat ut sit elit viverra. Ut egestas justo massa diam
          platea. Amet consequat cursus egestas proin lacus ullamcorper.
        </h2>

        <Button
          onClick={() => onOpen("login")}
          variant="default"
          size="lg"
          className="mt-8 rounded-full block mx-auto"
        >
          Mulai Survey
        </Button>
      </div>
      {modalType && <ModalProvider />}
    </div>
  );
}

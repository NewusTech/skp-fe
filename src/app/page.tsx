import { Button } from "@/components/ui/button";
import Image from "next/image";
import SurveyIlustration from "@/assets/ilustration/homepage-survey.svg";
export default function Home() {
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
          variant="default"
          size="lg"
          className="mt-8 rounded-full block mx-auto"
        >
          Mulai Survey
        </Button>
      </div>
    </div>
  );
}

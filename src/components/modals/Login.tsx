import Image from "next/image";
import LoginIlustration from "@/assets/ilustration/homepage-modal-login.svg";
import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TextField } from "../ui/TextField";

export default function LoginModal() {
  const form = useForm();

  return (
    <div className="h-[565px] w-[540px] py-[32px] px-[60px] bg-white border-[0.5px] border-primary rounded-[20px]">
      <Image
        src={LoginIlustration}
        alt="Login Ilustration"
        className="m-auto"
      />

      <p className="mb-8 mt-4 text-center text-primary text-[20px]">
        Silahkan <span className="font-bold">Masuk</span> terlebih dahulu
      </p>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    icon={<User2Icon className="text-[#B6B6B6]" />}
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormControl>
                  <TextField
                    type="password"
                    placeholder="Kata sandi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="default"
            className="mt-8 block mx-auto"
            type="submit"
          >
            Masuk
          </Button>
        </form>
      </Form>
    </div>
  );
}

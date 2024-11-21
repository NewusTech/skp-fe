import Image from "next/image";
import ResetPasswordIllustration from "@/assets/ilustration/homepage-modal-login.svg";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import TextField from "../inputs/TextField";

export default function ResetPasswordModal() {
  const form = useForm();

  return (
    <div className=" w-[944px] py-[32px] px-[60px] bg-white border-[0.5px] border-primary rounded-[20px] flex">
      <div className="w-full">
        <h2 className="text-[26px] text-primary font-semibold mb-8">
          Ganti Kata Sandi
        </h2>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px]">Kata sandi lama</FormLabel>
                  <TextField
                    type="password"
                    placeholder="Masukkan kata sandi lama"
                    className="w-full"
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="text-[16px]">Kata sandi baru</FormLabel>
                  <TextField
                    type="password"
                    placeholder="Masukkan kata sandi baru"
                    className="w-full"
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="text-[16px]">
                    Konfirmasi kata sandi baru
                  </FormLabel>
                  <TextField
                    type="password"
                    placeholder="Konfirmasi kata sandi baru"
                    className="w-full"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <Button
              variant="default"
              className="mt-8 block mx-auto w-[208px] rounded-full text-[16px]"
              type="submit"
            >
              Simpan
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

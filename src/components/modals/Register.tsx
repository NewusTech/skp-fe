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
import { useModal } from "@/hooks/modal";

export default function RegisterModal() {
  const form = useForm();
  const { onClose } = useModal();

  return (
    <div className="h-[565px] w-[540px] py-[32px] px-[60px] bg-white border-[0.5px] border-primary rounded-[20px] relative">
      <h2 className="text-primary text-xl font-bold mb-8">Daftar akun baru</h2>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#483D3D]">Username</FormLabel>
                <FormControl>
                  <TextField placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="namaLengkap"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-[#483D3D]">Nama Lengkap</FormLabel>
                <FormControl>
                  <TextField placeholder="Nama Lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-[#483D3D]">Email</FormLabel>
                <FormControl>
                  <TextField placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kataSandi"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-[#483D3D]">Kata sandi</FormLabel>
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

          <div className="flex justify-center gap-8 mt-8">
            <Button
              variant="secondary"
              onClick={() => onClose()}
              type="button"
              className="rounded-full w-[120px] h-[40px]"
            >
              Batal
            </Button>
            <Button
              variant="default"
              type="submit"
              className="rounded-full w-[120px] h-[40px]"
            >
              Daftar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

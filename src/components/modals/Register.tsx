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
import TextField from "../inputs/TextField";
import { useModal } from "@/hooks/modal";

const formFields = [
  { name: "username", label: "Username", placeholder: "Username" },
  { name: "namaLengkap", label: "Nama Lengkap", placeholder: "Nama Lengkap" },
  { name: "email", label: "Email", placeholder: "Email" },
  {
    name: "kataSandi",
    label: "Kata sandi",
    placeholder: "Kata sandi",
    type: "password",
  },
];

export default function RegisterModal() {
  const form = useForm();
  const { onClose } = useModal();

  return (
    <div className="h-[565px] w-[540px] py-[32px] px-[60px] bg-white border-[0.5px] border-primary rounded-[20px] relative">
      <h2 className="text-primary text-xl font-bold mb-8">Daftar akun baru</h2>

      <Form {...form}>
        <form>
          {formFields.map((field, index) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: fieldProps }) => (
                <FormItem className={index !== 0 ? "mt-4" : ""}>
                  <FormLabel className="text-[#483D3D]">
                    {field.label}
                  </FormLabel>
                  <FormControl>
                    <TextField
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-center gap-5 mt-8">
            <Button
              variant="outlinePrimary"
              onClick={onClose}
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

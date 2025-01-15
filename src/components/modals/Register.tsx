import { useModal } from "@/hooks/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "../inputs/TextField";
import { Button } from "../ui/button";
import HelperError from "../ui/HelperError";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axios";
import { showAlert } from "@/lib/swalAlert";
import Loading from "../ui/Loading";
import { Label } from "../ui/label";
// 
const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username wajib diisi" }),
  name: z
    .string()
    .min(1, { message: "Nama lengkap wajib diisi" }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Alamat email tidak valid" }),
  password: z
    .string()
    .min(6, { message: "Password wajib diisi minimal harus 6 karakter" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function RegisterModal() {
  const { onClose } = useModal();
  //  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post("/register", data);

      console.log(response);

      if (response.status === 200) {
        // 
        showAlert('success', 'Berhasil membuat akun!');
        // alert
        reset();
        onClose();
        router.push("/");
      }
    } catch (error: any) {
      // alert
      // Extract error message from API response
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Login gagal. Silakan coba lagi!";
      // 
      showAlert('error', errorMessage);
      console.error("Failed to create user:", error);
      // alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto md:w-[540px] w-[330px] md:py-[32px] py-[20px] md:px-[60px] px-8 bg-white border-[0.5px] border-primary rounded-[20px]">
      <h2 className="text-primary text-xl font-bold mb-8">Daftar akun baru</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label>Username</Label>
        <TextField
          placeholder="Username"
          {...register("username")}
          className="mb-3"
        />
        <HelperError>{errors?.username?.message}</HelperError>
        {/*  */}
        <Label>Nama Lengkap</Label>
        <TextField
          placeholder="Nama Lengkap"
          {...register("name")}
          className="mb-3"
        />
        <HelperError>{errors?.name?.message}</HelperError>
        {/*  */}
        <Label>Email</Label>
        <TextField
          placeholder="Email"
          {...register("email")}
          className="mb-3"
        />
        <HelperError>{errors?.email?.message}</HelperError>
        {/*  */}
        <Label>Password</Label>
        <TextField
          type="password"
          placeholder="Kata sandi"
          {...register("password")}
        />
        <HelperError>{errors?.password?.message}</HelperError>
        {/* button */}
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
            {loading ? <Loading /> : "Daftar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

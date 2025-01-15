import LoginIlustration from "@/assets/ilustration/homepage-modal-login.svg";
import { showAlert } from "@/lib/swalAlert";
import { axiosInstance } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie"; // Import js-cookie
import { User2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; // Make sure to import SweetAlert2
import { z } from "zod";
import TextField from "../inputs/TextField";
import { Button } from "../ui/button";
import HelperError from "../ui/HelperError";
import Loading from "../ui/Loading";

const formSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Username wajib diisi" }),
    // .username({ message: "Alamat username tidak valid" }),
    password: z
        .string()
        .min(6, { message: "Password wajib diisi minimal harus 6 karakter" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function LoginAdminModal() {

    //  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const [loginError, setLoginError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const setAccessToken = (token: string) => {
        // Store token in cookies (with 7 days expiry, you can adjust as needed)
        Cookies.set("accessToken", token,);
    };

    const setSlug = (slug: string) => {
        Cookies.set("slug", slug,);
    };

    const onSubmit = async (data: FormSchemaType) => {
        setLoading(true);
        setLoginError(null); // Reset previous errors

        try {
            const response = await axiosInstance.post("/login", {
                username: data.username,
                password: data.password,
            });

            console.log(response);

            if (response.status === 200) {
                // 
                showAlert('success', 'Berhasil Login!');
                // alert
                setAccessToken(response?.data?.data?.token);
                setSlug(response?.data?.data?.slug);
                // reset();
                await router.prefetch("/dashboard");
                router.push("/dashboard");
            }
        } catch (error: any) {
            // alert
            // Extract error message from API response
            const errorMessage =
                error.response?.data?.data?.[0]?.message ||
                error.response?.data?.message ||
                "Login gagal. Silakan coba lagi!";
            // 
            Swal.fire({
                icon: "error",
                title: "Terjadi kesalahan!",
                text: errorMessage,
                showConfirmButton: false,
                timer: 2500,
                showClass: { popup: "animate__animated animate__fadeInDown" },
                hideClass: { popup: "animate__animated animate__fadeOutUp" },
                customClass: {
                    popup: "rounded-xl",
                    title: "text-2xl font-semibold text-red-600",
                    icon: "text-red-500 animate-bounce",
                },
                backdrop: "rgba(0, 0, 0, 0.4)",
            });
            console.error("Failed to create user:", error);
            // alert
            setLoginError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="h-auto md:w-[540px] w-[330px] md:py-[32px] py-[20px] md:px-[60px] px-8 bg-white border-[0.5px] border-primary rounded-[20px]">
            <Image
                src={LoginIlustration}
                alt="Login Ilustration"
                className="m-auto w-[120px] md:w-[150px]"
            />

            <p className="mb-8 mt-4 text-center text-primary text-base md:text-[20px]">
                <span className="font-bold">Login Admin</span>
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    icon={<User2Icon className="text-[#B6B6B6]" />}
                    placeholder="Username"
                    {...register("username")}
                />
                <HelperError>{errors?.username?.message}</HelperError>
                <TextField
                    type="password"
                    placeholder="Kata sandi"
                    className="mt-4"
                    {...register("password")}
                />
                <HelperError>{errors?.password?.message}</HelperError>
                <Button
                    variant="default"
                    className="mt-8 w-[150px] mx-auto block"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <Loading /> : "Masuk"}
                </Button>
            </form>
        </div>
    );
}

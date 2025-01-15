/* eslint-disable react-hooks/rules-of-hooks */
// api/index.ts
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Cookies from "js-cookie";
import useSWR from "swr";
import { ComplaintResponseOne } from "./interface";
import { showAlert } from "@/lib/swalAlert";
import { useRouter } from "next/navigation";
import { replyComplaintFormData } from "./validation";

// get all
const useGetComplaint = (currentPage: number, search: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/pengaduan/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/pengaduan/get?page=${currentPage}&limit=10&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// get one
const useGetComplaintId = (id: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<ComplaintResponseOne>(
      `/user/pengaduan/get/${id}`,
      () =>
        axiosPrivate
          .get(`/user/pengaduan/get/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return { data, error, mutate, isValidating, isLoading };
};

// update reply
const putSubmitReplyComplaint = (id: string) => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: replyComplaintFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.put(`/user/pengaduan/update/${id}`, data);

      showAlert("success", "Berhasil membalas aduan!");
      navigate.push("/complaint-result");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal membalas aduan!";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handlePostSubmit };
};

export { useGetComplaint, useGetComplaintId, putSubmitReplyComplaint };

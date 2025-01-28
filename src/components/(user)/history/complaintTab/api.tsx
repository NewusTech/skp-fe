import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Cookies from "js-cookie";
import useSWR from "swr";

// Get Pengaduan
const useGetComplaint = (currentPage: number, search: string) => {
    const accessToken = Cookies.get("accessToken");
    const axiosPrivate = useAxiosPrivate();

    const { data, error, mutate, isValidating, isLoading } = useSWR(
        `/user/pengaduan/get?page=${currentPage}&limit=10&search=${search}`,
        () =>
            axiosPrivate
                .get(
                    `/user/pengaduan/get?page=${currentPage}&search=${search}`,
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

// Get one
const useComplaintOne = (slug: string) => {
    const accessToken = Cookies.get("accessToken");
    const axiosPrivate = useAxiosPrivate();
  
    const { data, error, mutate, isValidating, isLoading } = useSWR<any>(
      `/kitchen/admin/detail/${slug}`,
      () =>
        axiosPrivate
          .get(`/kitchen/admin/detail/${slug}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );
  
    return { data, error, mutate, isValidating, isLoading };
  };

export { useGetComplaint };
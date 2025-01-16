/* eslint-disable react-hooks/rules-of-hooks */
// api/index.ts
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Cookies from "js-cookie";
import useSWR from "swr";

// get all
const useGetPuskesmas = () => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/masterpuskesmas/get?limit=999`,
    () =>
      axiosPrivate
        .get(
          `/masterpuskesmas/get?limit=999`,
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

export { useGetPuskesmas };

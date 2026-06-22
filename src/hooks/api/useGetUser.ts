import { useQuery } from "@tanstack/react-query";
import Endpoints from "../../config/endpoints";
import axios from "../../config/axios";
import { getItem } from "../../utils/localstorage";

const useGetUser = () => {
  const token = getItem();
  const url = Endpoints.auth.me;
  const getUser = async () => {
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data } = useQuery({
    queryKey: ["user/me"],
    queryFn: async () => await getUser(),
  });
  return { data };
};
export default useGetUser;

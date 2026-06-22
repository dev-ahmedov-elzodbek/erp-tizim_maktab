import { useEffect } from "react";
import useGetUser from "../../hooks/api/useGetUser";
import useUserStore from "../../store/user.store";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { data } = useGetUser();
  const store = useUserStore();
  const userData = data?.data.data;
  useEffect(() => {
    store.setUser(userData);
  }, [userData]);
  return <Outlet />;
};
export default AuthLayout;

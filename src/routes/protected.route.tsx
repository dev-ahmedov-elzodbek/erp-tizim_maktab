import verifyToken from "../utils/verify.token";
import { Navigate } from "react-router-dom";
interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isTokenValid = verifyToken();
  if (!isTokenValid) {
    return children;
  }
  return <Navigate to={"/dashboard"}></Navigate>;
};

export default ProtectedRoute;

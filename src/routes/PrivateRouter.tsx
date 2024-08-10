import useAuthContext from "@/hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { signed } = useAuthContext();

  return signed ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRouter;

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";

interface IProtectedRoutes {
  children: React.ReactNode;
  allowedRoles: ("admin" | "seller")[]
}

const ProtectedRoutes = ({ children, allowedRoles }: IProtectedRoutes) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated) return <Navigate to="/" />;
  if (!allowedRoles.includes(role!)) return <Navigate to="/unauthorized" />

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoutes
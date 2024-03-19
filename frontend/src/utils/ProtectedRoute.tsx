import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props: {
  role: "ROLE_USER" | "ROLE_MANAGER" | "ROLE_ADMIN";
}) => {
  console.log(sessionStorage.getItem("role"));
  const isAuthenticated = sessionStorage.getItem("roles")?.includes(props.role);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;

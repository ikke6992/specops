import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props: { authenticate: () => boolean }) => {
  return props.authenticate() ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;

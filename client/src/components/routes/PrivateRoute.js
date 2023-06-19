import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ ...props }) => {
  const { user, isLoading } = useAuth();
  console.log(user);

  if (isLoading) {
    return "Loading...";
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

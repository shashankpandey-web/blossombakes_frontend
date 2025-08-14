import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isUserLogin } = useSelector((state) => state.auth);



  return isUserLogin ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import _ from "lodash";
import jwtDecode from "jwt-decode";

export default function PrivateRoute({
  children,
  redirectPath = "/login",
  allowedRoles,
}) {
  const userState = useSelector((state) => state.user);
  if (!userState.userIsLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  try {
    const decryptedToken = jwtDecode(userState.user.token);
    if (_.intersection(decryptedToken.roles, allowedRoles).length === 0) {
      return <Navigate to={"/no-autorizado"} replace />;
    }    
  } catch (error) {
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
}

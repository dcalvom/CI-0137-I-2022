import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import _ from "lodash";

export default function PrivateRoute({
  children,
  redirectPath = "/login",
  allowedRoles,
}) {
  const userState = useSelector((state) => state.user);
  if (!userState.userIsLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  if (_.intersection(userState.user.roles, allowedRoles).length === 0) {
    return <Navigate to={"/no-autorizado"} replace />;
  }

  return children || <Outlet />;
}

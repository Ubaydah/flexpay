import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const location = useLocation();

  const { authorization } = useSelector((state) => state.authStore);

  if (isEmpty(authorization?.access)) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default AuthRoute;

import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const GuestRoute = (props) => {
  const { children } = props;
  const location = useLocation();

  const { authorization } = useSelector((state) => state.authStore);
  if (!isEmpty(authorization?.access)) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return children;
};

export default GuestRoute;

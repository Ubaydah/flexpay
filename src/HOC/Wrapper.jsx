import Sidebar from "../components/Sidebar";

import AuthRoute from "./AuthRoute";

const Wrapper = ({ logout, children }) => {
  return (
    <AuthRoute>
      <div className="flex md:flex-row flex-col gap-3">
        <Sidebar />
        {children}
      </div>
    </AuthRoute>
  );
};

export default Wrapper;

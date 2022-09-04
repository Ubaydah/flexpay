import React, { useEffect, useState } from "react";
import Image02 from "../assets/Rectangle 41.png";
import GuestRoute from "../HOC/GuestRoute";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { toast } from "react-toastify";
import { useLoginCompanyMutation } from "../redux/services";
import { initialSigninValues, signinSchema } from "../schemas/company";
import LoadingModal from "../components/LoadingModal";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/modal/modalRedux";
import { setLoginUser } from "../redux/slices/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState("");
  const [loginCompany, { data, isLoading, isSuccess, isError, error }] = useLoginCompanyMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(openModal());
    }
    if (isSuccess) {
      navigate("/dashboard");
      dispatch(setLoginUser(data));
      dispatch(closeModal());
    }
    if (isError && error) {
      setError(error?.data?.message);
      toast.error(error?.data?.message);
      dispatch(closeModal());
    }
  }, [dispatch, isLoading, isError, error, isSuccess, navigate, data]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const submitHandler = (values) => {
    loginCompany(values);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError("");
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [error]);
  return (
    <GuestRoute>
      <LoadingModal />
      <div className="flex w-full h-full bg-gradient md:bg-none">
        <div className="w-[25%] bg-orange md:flex justify-end fixed h-screen hidden ">
          <img src={Image02} alt="" />
        </div>
        <div className="w-[25%] bg-orange md:flex justify-end h-screen hidden">
          <img src={Image02} alt="" />
        </div>
        <Formik onSubmit={submitHandler} initialValues={initialSigninValues} validationSchema={signinSchema}>
          {({ handleSubmit }) => (
            <div className="w-full h-screen md:w-[65%] flex flex-col items-center justify-center">
              <div>
                <div className="pb-8 md:pb-2">
                  <p className="text-2xl font-extrabold pb-1">
                    Welcome <span className="text-orange">Back!</span>
                  </p>
                  <p className="text-sm">Give your employees more reason to stay</p>
                </div>
                <div className="pt-5">
                  <label>Company Email</label>
                  <div className="mt-1 relative flex md:justify-end">
                    <Field
                      name={"email"}
                      placeholder={"Input company email"}
                      className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2 focus:outline-none "
                    />
                  </div>
                  <ErrorMessage
                    name={"email"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />{" "}
                </div>
                <div className="pt-5">
                  <label>Password</label>
                  <div className="mt-1 relative flex md:justify-end">
                    <Field
                      name={"password"}
                      onKeyDown={(e) => {
                        e.key === "Enter" && handleSubmit();
                      }}
                      placeholder={"XXXXXXXXX"}
                      type={`${showPassword ? "text" : "password"}`}
                      className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                    />
                    {!err && (
                      <i
                        onClick={togglePassword}
                        className={`text-gray-500 top-1/2 -translate-y-1/2 right-2 absolute fa-solid fa-eye${showPassword ? "" : "-slash"}`}
                      ></i>
                    )}
                  </div>
                  <ErrorMessage
                    name={"password"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />{" "}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-[200px] md:w-[500px] h-[50px] bg-orange rounded-lg mt-7 text-white text-base font-semibold hover:text-orange hover:bg-white hover:border-2 hover:border-orange"
              >
                LOGIN
              </button>
              <p className="text-base font-semibold mt-3">
                Don't have an account?
                <Link to="register">
                  {" "}
                  <span className="text-orange cursor-pointer pl-2">Sign up</span>
                </Link>
              </p>
            </div>
          )}
        </Formik>
      </div>
    </GuestRoute>
  );
};

export default Login;

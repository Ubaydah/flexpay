import React, { useEffect, useState } from "react";
import Image01 from "../assets/col2 1.png";
import GuestRoute from "../HOC/GuestRoute";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { CompanyDetailsSchema, initialCompanyDetailsValues } from "../schemas/company";
import { useRegisterCompanyMutation } from "../redux/services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/modal/modalRedux";
import LoadingModal from "../components/LoadingModal";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerCompany, { data, isLoading, isSuccess, isError, err }] = useRegisterCompanyMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(openModal());
    }
    if (isSuccess) {
      navigate("/");
      toast.success(data.message);
      dispatch(closeModal());
    }
    if (isError && err && "status" in err) {
      toast.error(err?.data?.message);
      dispatch(closeModal());
    }
  }, [dispatch, isLoading, isError, err, isSuccess, navigate, data]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const submitHandler = (values) => {
    registerCompany(values);
  };

  return (
    <GuestRoute>
      <LoadingModal />
      <div className="flex w-full h-full bg-gradient md:bg-none pt-[50px] md:pt-0">
        <div className="w-[25%] bg-orange md:flex flex-col justify-end h-screen fixed hidden">
          <img src={Image01} alt="" />
        </div>
        <div className="w-[25%] bg-orange md:flex flex-col justify-end h-screen hidden "></div>
        <Formik onSubmit={submitHandler} initialValues={initialCompanyDetailsValues} validationSchema={CompanyDetailsSchema}>
          {({ handleSubmit }) => (
            <div className=" w-full h-screen flex flex-col items-center justify-center">
              <div className="w-full md:w-auto px-6 md:px-0">
                <div className="pb-3">
                  <p className="text-2xl font-normal">
                    Sign Up on <span className="font-bold">FlexPay</span>
                  </p>
                  <p className="text-sm ">Give your employees more reason to stay</p>
                </div>
                <div className="pt-2">
                  <label>Company Name</label>
                  <div className="mt-1 relative flex justify-end">
                    <Field
                      name={"company_name"}
                      placeholder={"Input company name"}
                      className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                    />
                  </div>
                  <ErrorMessage
                    name={"company_name"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />
                </div>
                <div className="pt-2">
                  <label>Company Email</label>
                  <div className="mt-1 relative flex justify-end">
                    <Field
                      name={"email"}
                      placeholder={"Input company email"}
                      className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                    />
                  </div>
                  <ErrorMessage
                    name={"email"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />{" "}
                </div>
                <div className="pt-2">
                  <label>Address</label>
                  <div className="mt-1 relative flex justify-end">
                    <Field
                      name={"address"}
                      placeholder={"Input address "}
                      className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                    />
                  </div>
                  <ErrorMessage
                    name={"address"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />{" "}
                </div>
                <div className="pt-2">
                  <label>Phone Number</label>
                  <div className="mt-1 relative flex justify-end">
                    <Field
                      name={"phone_number"}
                      placeholder={"Input phone number "}
                      className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                    />
                  </div>
                  <ErrorMessage
                    name={"phone_number"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />{" "}
                </div>
                <div className="pt-2">
                  <label>Password</label>
                  <div className="mt-1 relative flex justify-end">
                    <Field
                      name={"password"}
                      placeholder={"XXXXXXXXX"}
                      type={`${showPassword ? "text" : "password"}`}
                      className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                    />
                    <i
                      onClick={togglePassword}
                      className={`text-gray-500 top-1/2 -translate-y-1/2 right-2 absolute fa-solid fa-eye${showPassword ? "" : "-slash"}`}
                    ></i>
                  </div>
                  <ErrorMessage
                    name={"password"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />{" "}
                </div>
                <div className="pt-2">
                  <label>Confirm Password</label>
                  <div className="mt-1 relative flex justify-end">
                    <Field
                      name={"confirm_password"}
                      onKeyDown={(e) => {
                        e.key === "Enter" && handleSubmit();
                      }}
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder={"XXXXXXXXX"}
                      className="border relative w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                    />

                    <i
                      onClick={togglePassword}
                      className={`text-gray-500 top-1/2 -translate-y-1/2 right-2 absolute fa-solid fa-eye${showPassword ? "" : "-slash"}`}
                    ></i>
                  </div>
                  <ErrorMessage
                    name={"confirm_password"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                  />{" "}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-[200px] md:w-[500px] min-h-[50px] bg-orange rounded-lg mt-7 text-white text-base font-semibold hover:text-orange hover:bg-white hover:border-2 hover:border-orange"
              >
                SIGNUP
              </button>
              <p className="text-base font-semibold mt-3">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-orange cursor-pointer pl-2">Login</span>
                </Link>
              </p>
            </div>
          )}
        </Formik>
      </div>
    </GuestRoute>
  );
};

export default SignUp;

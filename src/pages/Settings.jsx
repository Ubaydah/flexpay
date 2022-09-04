import React from "react";
import Navbar from "../components/Navbar";
import { GoNote } from "react-icons/go";
import { BiUserCircle } from "react-icons/bi";
import Profile from "../assets/profile2.png";
import Visa from "../assets/image 13.png";
import Wrapper from "../HOC/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingsTab } from "../redux/slices/tabs";
import { ErrorMessage, Field, Formik } from "formik";
import { CompanyDetailsSchema, initialCompanyDetailsValues } from "../schemas/company";

const Settings = () => {
  const { settingsTab } = useSelector((state) => state.tabsReducer);
  const dispatch = useDispatch();

  const toggleTab = (tab) => {
    dispatch(toggleSettingsTab(tab));
  };
  return (
    <Wrapper>
      <div className="w-full md:w-[60%] mt-5 p-3 md:p-0 md:mx-5">
        <Navbar navbar="Settings" />
        <p className="font-semibold sm:hidden text-xl mb-3">Settings</p>
        <div className="shadow-3xl px-10 rounded-lg mt-20 pb-10 hidden sm:block">
          <div className="flex justify-between pt-5 mb-5">
            <div
              className={`flex items-center w-[50%] justify-center  cursor-pointer ${
                settingsTab === "personal" ? "text-orange border-b-2 pb-2 border-orange" : "text-[#ACB0B9] "
              }`}
              onClick={() => toggleTab("personal")}
            >
              <GoNote className="text-3xl font-semibold  mr-2" />
              <p className="text-base font-semibold ">Personal</p>
            </div>
            <div
              className={`flex items-center w-[50%] justify-center cursor-pointer  ${
                settingsTab === "account" ? "text-orange border-b-2 pb-2 border-orange" : "text-[#ACB0B9] "
              }`}
              onClick={() => toggleTab("account")}
            >
              <BiUserCircle className="text-3xl font-semibold mr-2" />
              <p className="text-base font-semibold">Account</p>
            </div>
          </div>
          <p className="mb-5 text-[#383B43] text-sm font-semibold">
            Company Name: <span className="text-[#959BA7] ml-3">Jumoke</span>
          </p>
          <p className="mb-5 text-[#383B43] text-sm font-semibold">
            Last Name: <span className="text-[#959BA7] ml-3">Onakoya</span>
          </p>
          <div className="flex justify-between mb-5">
            <p className="text-[#383B43] text-sm font-semibold">
              Email Address: <span className="text-[#959BA7] ml-3">jumokeonakoya@gmail.com</span>
            </p>
            <p className="cursor-pointer text-orange text-sm font-semibold">Edit</p>
          </div>
          <div className="flex justify-between  mb-5">
            <p className="text-[#383B43] text-sm font-semibold">
              Phone Number: <span className="text-[#959BA7] ml-3">+234 (0) 807 909 7547</span>
            </p>
            <p className="cursor-pointer text-orange text-sm font-semibold">Edit</p>
          </div>
          <div className="flex justify-between  mb-5">
            <p className="text-[#383B43] text-sm font-semibold">
              Country: <span className="text-[#959BA7] ml-3">Nigeria</span>
            </p>
            <p className="cursor-pointer text-orange text-sm font-semibold">Edit</p>
          </div>

          <div className="w-full">
            <p className="text-sm text-[#959BA7] font-semibold mb-5">Card Information</p>
            <div className="flex justify-between">
              <div className="w-[45%] bg-[#F8F8F9] p-3 rounded-lg">
                <img src={Visa} alt="" />
                <input type="text" placeholder="**** **** **** 8456" className="bg-[#F8F8F9] focus:outline-none w-full mt-2" />
              </div>
              <div className="w-[45%] bg-[#F8F8F9] p-3 rounded-lg">
                <img src={Visa} alt="" />
                <input type="text" placeholder="**** **** **** 8456" className="bg-[#F8F8F9] focus:outline-none w-full mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:mt-36 w-full md:w-[20%] mr-10">
        <div className="shadow-3xl flex flex-col items-center sm:pb-40 rounded-lg">
          <img src={Profile} alt="" className="pt-5" />
          <p className="pt-5 text-lg font-extrabold text-[#383B43]">Ovalfi Admin</p>
          <p className="pt-3 text-sm font-semibold text-[#959BA7]">admin@ovalfi.com</p>
          <button className="mt-5 py-2 px-4 bg-orange text-white font-semibold text-sm rounded-lg hover:border-2 border-orange hover:bg-white hover:text-orange">
            Change Image
          </button>
          <Formik onSubmit={() => console.log(123)} initialValues={initialCompanyDetailsValues} validationSchema={CompanyDetailsSchema}>
            {({ handleSubmit }) => (
              <div className=" w-full mt-4  flex flex-col items-center justify-center sm:hidden">
                <div className="w-full px-8">
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
                </div>
                <div className="pt-2 w-full px-8">
                  <label>Country</label>
                  <div className="mt-1 relative flex justify-end ">
                    <Field
                      as={"select"}
                      name={"department"}
                      placeholder={"Select department"}
                      className={"w-full placeholder:text-[0.78125rem] border border-[#030729] opacity-50 rounded px-2  focus:outline-none"}
                    >
                      <option value="">Select a country </option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name={"role"}
                    render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-gray"}>{msg}</div>}
                  />{" "}
                </div>
                <div className="mt-10 w-full px-8">
                  <p className="text-sm text-[#959BA7] font-semibold mb-5">Card Information</p>
                  <div className="flex justify-between w-full">
                    <div className="bg-[#F8F8F9] p-3 rounded-lg w-full">
                      <img src={Visa} alt="" />
                      <input type="text" placeholder="**** **** **** 8456" className="bg-[#F8F8F9] focus:outline-none w-full mt-2" />
                    </div>
                  </div>
                </div>
                <div className="mt-10 w-full p-8">
                  <p className="text-sm text-[#959BA7] font-semibold mb-5">Account</p>
                  <div className="flex justify-between w-full">
                    <div className="bg-[#F8F8F9] p-3 rounded-lg w-full">
                      <div className="w-full flex gap-2">
                        <input type="text" placeholder="Zenith Bank" className="bg-[#F8F8F9] min-w-[100px] focus:outline-none mt-2" />
                        <input type="text" placeholder="042264771" className="bg-[#F8F8F9] min-w-[100px] focus:outline-none mt-2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <div className="bg-[#F8F8F9] p-3 rounded-lg w-full">
                      <div className="w-full flex gap-2">
                        <input type="text" placeholder="Zenith Bank" className="bg-[#F8F8F9] min-w-[100px] focus:outline-none mt-2" />
                        <input type="text" placeholder="042264771" className="bg-[#F8F8F9] min-w-[100px] focus:outline-none mt-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-[200px] md:w-[500px] mb-10 h-[50px] bg-orange rounded-lg mt-7 text-white text-base font-semibold hover:text-orange hover:bg-white hover:border-2 hover:border-orange"
                >
                  Update Profile
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;

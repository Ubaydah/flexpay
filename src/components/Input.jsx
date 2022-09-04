import React from "react";
import { BsEyeSlash } from "react-icons/bs";

const Input = ({ label }) => {
  return (
    <div className="pt-5">
      <label>{label}</label>
      <div className="mt-1 relative flex justify-end">
        <input type="text" className="border w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2" />
        {label === "Password" && <BsEyeSlash className="absolute top-3 right-5 cursor-pointer opacity-50" />}
      </div>
      {/* {errors.{label} ? <div className="text-[0.7812rem] text-red-600 text-left font-normal">{errors.bar_code}</div> : null} */}
    </div>
  );
};

export default Input;

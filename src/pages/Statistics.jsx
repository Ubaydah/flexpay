import React from "react";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Wrapper from "../HOC/Wrapper";

const Statistics = () => {
  return (
    <Wrapper>
      <div className="sm:w-[60%] mx-5 mt-5">
        <Navbar navbar="Statistics" />
        <p className="font-semibold sm:hidden text-xl mb-3">Statistics</p>
        <div className="flex md:flex-row flex-col md:flex-wrap gap-10">
          <Overview trans />
          <div className="order-2 sm:w-[350px]">
            <div className="mb-5">
              <p className="text-xl">Total</p>
              <p className="text-[30px] sm:text-[30px] sm:text-[40px]  font-extrabold">$5,000,000.00</p>
            </div>
            <div className="mb-5">
              <p className="text-xl">Earned Interest</p>
              <p className="text-[30px] sm:text-[40px] font-extrabold">$10,000.00</p>
            </div>
            <div className="mb-5">
              <p className="text-xl">Company Expenses </p>
              <p className="text-[30px] sm:text-[40px] font-extrabold">$40,000.00</p>
            </div>
            <div className="mb-5">
              <p className="text-xl">Loans to employees</p>
              <p className="text-[30px] sm:text-[40px] font-extrabold">$500,000.00</p>
            </div>
          </div>
        </div>
        <div className="border-4 border-[#EDEDFE] rounded-lg pt-5 px-5 pb-2 sm:w-[350px]">
          <div className="mb-5">
            <p className="text-xl font-extrabold">Employee Overview</p>
            <p className="text-sm text-[#171717] font-semibold">June 2022</p>
          </div>
          <p className="text-sm font-semibold text-[ #171717] mb-2">Top Earning Employees</p>
          <div className="flex items-center mb-5 flex-wrap ">
            <img src={Image1} alt="" className="mr-2" />
            <img src={Image2} alt="" className="mr-2" />
            <img src={Image3} alt="" className="mr-2" />
            <img src={Image4} alt="" className="mr-2" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Statistics;

import React from "react";
import Ellipse1 from "../assets/circleChart.svg";

const Overview = ({ trans }) => {
  return (
    <div className={`border-4 border-[#EDEDFE] rounded-lg py-5 px-5 mb-5 ${trans && "sm:w-[350px]"}`}>
      <div className="flex justify-between items-center mb-7">
        <p className="font-bold text-xl">Overview</p>
        <select className="bg-[#D9D9D9] p-1 rounded-lg text-sm font-bold opacity-60">
          <option>APY Interest</option>
        </select>
      </div>
      <div className="flex justify-center">
        <img src={Ellipse1} alt="" className="w-[70%] md:w-full" />
      </div>
    </div>
  );
};

export default Overview;

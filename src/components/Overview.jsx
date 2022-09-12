import React from "react";
import { PieChart, Pie, Label } from "recharts";
import { useGetWalletQuery } from "../redux/services";

const Overview = ({ trans }) => {
  const { data } = useGetWalletQuery();

  const graphData = [
    {
      value: data?.balance,
      fill: "#D9D9D9",
    },
    {
      value: 0.1 * data?.balance,
      fill: "#F26722",
    },
  ];

  return (
    <div className={`border-4 border-[#EDEDFE] rounded-lg py-5 px-5 mb-5 ${trans && "sm:w-[350px]"}`}>
      <div className="flex justify-between items-center mb-7">
        <p className="font-bold text-xl">Overview</p>
        <select className="bg-[#D9D9D9] p-1 rounded-lg text-sm font-bold opacity-60">
          <option>APY Interest</option>
        </select>
      </div>
      <div>
        <PieChart width={250} height={250}>
          <Pie data={graphData} dataKey="value" innerRadius={60} outerRadius={90} fill="#F26722">
            <Label value="10%" position="center" />
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default Overview;

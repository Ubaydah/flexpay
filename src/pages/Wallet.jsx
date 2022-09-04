import React from "react";
import DashBalance from "../components/DashBalance";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import Transcation from "../components/Transcation";
import Wrapper from "../HOC/Wrapper";

const Wallet = () => {
  return (
    <Wrapper>
      <div className="w-full md:w-[60%] mt-5 p-3 md:p-0 md:mx-5">
        <Navbar navbar="Wallet" />
        <p className="font-semibold sm:hidden text-xl mb-3">Wallet</p>
        <DashBalance />
        <div>
          <div className="flex justify-between items-center mb-5">
            <p className="flex text-2xl font-extrabold">Recent Transactions</p>
            <p className="md:flex text-base font-semibold hidden">View more</p>
          </div>
          <Transcation />
        </div>
      </div>
      <div className="md:mt-5 mx-3 md:mx-0 md:mr-5">
        <Overview />
      </div>
    </Wrapper>
  );
};

export default Wallet;

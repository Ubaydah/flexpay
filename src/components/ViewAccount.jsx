import React, { useState } from "react";

import Profile from "../assets/profile2.png";

import TransFerFunds from "./TransferFunds";

const AccountView = ({ employee, handleTransferFunds, close, setEmployeeId }) => {
  const [transfer, setTransfer] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center ">
        <img src={Profile} alt="" className="pt-5" />
        <p className="pt-5 text-lg font-extrabold text-[#383B43]">{employee.name}</p>
        <p className="text-sm font-semibold text-[#959BA7]">{employee.role}</p>
        <p className="text-sm font-semibold text-[#959BA7]"></p>
        <div className=" w-full px-4 md:px-8 py-8">
          <p className="text-sm text-[#959BA7] font-semibold mb-2 md:mb-5">Account</p>
          <div className="flex justify-between w-full">
            <div className="bg-[#F8F8F9] p-3 rounded-lg w-full">
              <div className="w-full flex gap-2">
                <input disabled={true} type="text" placeholder="Zenith Bank" className="bg-[#F8F8F9] min-w-[100px] focus:outline-none" />
                <input disabled={true} type="text" placeholder="042264771" className="bg-[#F8F8F9] min-w-[100px] focus:outline-none" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full mx-auto ${!transfer ? "flex justify-center mt-8" : "px-4 md:px-8"}`}
          onClick={() => {
            setTransfer(true);
            setEmployeeId(employee.id);
          }}
        >
          {!transfer ? (
            <button className="px-4 py-2 rounded-xl bg-orange text-white font-bold text-base  hover:border-2 hover:border-orange hover:bg-white hover:text-orange">
              Transfer Funds
            </button>
          ) : (
            <TransFerFunds handleTransferFunds={handleTransferFunds} close={close} />
          )}
        </div>
      </div>
    </>
  );
};

export default AccountView;

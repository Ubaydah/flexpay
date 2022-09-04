import React from "react";
import { BiTransfer, BiDotsHorizontalRounded } from "react-icons/bi";
import Vector from "../assets/Vector.png";

const Transcation = () => {
  return (
    <div>
      <div className="flex justify-between mb-5 rounded-xl border border-gray sm:border-0 sm:p-0  p-2 items-center sm:rounded-none">
        <div className="flex items-center sm:items-stretch">
          <div className=" bg-black h-auto sm:w-14 mr-3 flex justify-center items-center">
            <BiTransfer className=" text-3xl text-white text-center" />
          </div>
          <div className="flex sm:justify-between flex-col w-[50px] sm:w-auto">
            <p className="text-[11px]  sm:text-xl font-extrabold sm:mb-3">Salary Payment</p>
            <p className=" text-[4px] sm:text-sm">To Lock savings</p>
          </div>
        </div>
        <div>
          <p className="text-[15px] sm:text-xl font-extrabold sm:mb-3">-N25,000.00</p>
          <p className="text-sm text-end hidden sm:block">5 hour ago</p>
        </div>
        <p className="text-[10px] sm:hidden text-end  w-[60px]">5 hour ago</p>
      </div>
      <div className="flex justify-between mb-5 rounded-xl border border-gray sm:border-0 sm:p-0  p-2 items-center sm:rounded-none">
        <div className="flex items-center sm:items-stretch">
          <div className=" bg-black h-auto sm:w-14 mr-3 flex justify-center items-center">
            <BiTransfer className=" text-3xl text-white text-center" />
          </div>
          <div className="flex sm:justify-between flex-col w-[50px] sm:w-auto">
            <p className="text-[11px]  sm:text-xl font-extrabold sm:mb-3">Fund Wallet</p>
            <p className=" text-[4px] sm:text-sm  w-[60px]">By card</p>
          </div>
        </div>
        <div>
          <p className="text-[15px] sm:text-xl font-extrabold sm:mb-3">-N20,000.00</p>
          <p className="text-sm text-end hidden sm:block">5 hour ago</p>
        </div>
        <p className="text-[10px] sm:hidden text-end  w-[60px]">5 hour ago</p>
      </div>
      <div className="flex justify-between mb-5 rounded-xl border border-gray sm:border-0 sm:p-0  p-2 items-center sm:rounded-none">
        <div className="flex items-center sm:items-stretch">
          <div className=" bg-black h-auto sm:w-14 mr-3 flex justify-center items-center">
            <img src={Vector} alt="" />
          </div>
          <div className="flex sm:justify-between flex-col w-[50px] sm:w-auto">
            <p className="text-[11px]  sm:text-xl font-extrabold sm:mb-3">Withdraw</p>
            <p className=" text-[4px] sm:text-sm">To your local bank</p>
          </div>
        </div>
        <div>
          <p className="text-[15px] sm:text-xl font-extrabold sm:mb-3">-N20,000.00</p>
          <p className="text-sm text-end hidden sm:block">5 hour ago</p>
        </div>
        <p className="text-[10px] sm:hidden text-end  w-[60px]">5 hour ago</p>
      </div>
      <div className="flex justify-between mb-5 rounded-xl border border-gray sm:border-0 sm:p-0  p-2 items-center sm:rounded-none">
        <div className="flex items-center sm:items-stretch">
          <div className=" bg-black h-auto sm:w-14 mr-3 flex justify-center items-center">
            <img src={Vector} alt="" />
          </div>
          <div className="flex sm:justify-between flex-col w-[50px] sm:w-auto">
            <p className="text-[11px]  sm:text-xl font-extrabold sm:mb-3">Withdraw</p>
            <p className=" text-[4px] sm:text-sm">To your local bank</p>
          </div>
        </div>
        <div>
          <p className="text-[15px] sm:text-xl font-extrabold sm:mb-3">-N20,000.00</p>
          <p className="text-sm text-end hidden sm:block">5 hour ago</p>
        </div>
        <p className="text-[10px] sm:hidden text-end  w-[60px]">5 hour ago</p>
      </div>
      <div className="flex justify-between mb-5 rounded-xl border border-gray sm:border-0 sm:p-0  p-2 items-center sm:rounded-none">
        <div className="flex items-center sm:items-stretch">
          <div className=" bg-black h-auto sm:w-14 mr-3 flex justify-center items-center">
            <BiDotsHorizontalRounded className=" text-3xl text-white text-center" />
          </div>
          <div className="flex sm:justify-between flex-col w-[50px] sm:w-auto">
            <p className="text-[11px]  sm:text-xl font-extrabold sm:mb-3">Electrical Bill</p>
            <p className=" text-[4px] sm:text-sm">PHCN</p>
          </div>
        </div>
        <div>
          <p className="text-[15px] sm:text-xl font-extrabold sm:mb-3">-N12,000.00</p>
          <p className="text-sm text-end hidden sm:block">20th March 2022</p>
        </div>
        <p className="text-[10px] sm:hidden text-end w-[60px]">20th March 2022</p>
      </div>
    </div>
  );
};

export default Transcation;

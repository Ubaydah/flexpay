import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import Transcation from "../components/Transcation";
import Wrapper from "../HOC/Wrapper";
import { toggleTxnsTab } from "../redux/slices/tabs";

const Transactions = () => {
  const { transactionsTab } = useSelector((state) => state.tabsReducer);
  const dispatch = useDispatch();

  const toggleTab = (tab) => {
    dispatch(toggleTxnsTab(tab));
  };
  return (
    <Wrapper>
      <div className="w-full md:w-[60%] mt-5 p-3 md:p-0 md:mx-5">
        <Navbar navbar="Transaction" />
        <p className="font-semibold sm:hidden text-xl mb-3">Transactions</p>
        <select className="border py-2 px-2 border-gray sm:hidden rounded-lg mb-6">
          <option>USD</option>
        </select>
        <div className="sm:flex text-base font-bold text-[#8E8E8E] mb-10 hidden">
          <p className={`mr-10 cursor-pointer ${transactionsTab === "all" && "text-orange underline"}`} onClick={() => toggleTab("all")}>
            All
          </p>
          <p className={`mr-10 cursor-pointer ${transactionsTab === "pending" && "text-orange underline"}`} onClick={() => toggleTab("pending")}>
            Pending
          </p>
          <p className={`mr-10 cursor-pointer ${transactionsTab === "completed" && "text-orange underline"}`} onClick={() => toggleTab("completed")}>
            Completed
          </p>
          <p className={`mr-10 cursor-pointer ${transactionsTab === "cancelled" && "text-orange underline"}`} onClick={() => toggleTab("cancelled")}>
            Cancelled
          </p>
          <p className={`mr-10 cursor-pointer ${transactionsTab === "scheduled" && "text-orange underline"}`} onClick={() => toggleTab("scheduled")}>
            Scheduled
          </p>
        </div>
        <Transcation istransaction={true} />
      </div>
      <div className="md:mt-5 mx-3 md:mx-0 md:mr-5">
        <Overview />
      </div>
    </Wrapper>
  );
};

export default Transactions;

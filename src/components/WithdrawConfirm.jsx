import React from "react";

const WithdrawConfirm = ({ handleSubmit, amount, isTransfer }) => {
  return (
    <div className="px-[24px] pb-[32px] w-[300px] md:w-[480px] h-[auto]">
      <p className="text-[#131221] font-black text-[20px] md:text-[24px] grid justify-center">
        {" "}
        {isTransfer ? "Confirm Transfer" : "Confirm Withdraw"}
      </p>
      <h1 className="font-semibold text-[14px] md:text-[16px] md:mt-4 mb-5 text-center md:text-left text-gray-700">
        {isTransfer ? "Review Transaction Details" : "Review Withdrawal Details"}
      </h1>
      <div className="flex flex-col gap-8 text-[14px] uppercase">
        <div className="flex justify-between items-center uppercase">
          <p>Withdrawal Amount</p>
          <p className="text-right">${amount}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Fee</p>
          <p className="text-right">$0</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Total Amount</p>
          <p className="text-right font-semibold text-[20px] md:text-[24px]">${amount}</p>
        </div>
      </div>
      <hr className="mt-8 mb-6" />
      <p className="text-center text-gray-500">
        Once you click {isTransfer ? "Send funds" : "Withdraw Funds"}, the transaction cannot be reversed. If you have any questions, contact the
        admin.
      </p>
      <div className="flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="text-white bg-orange mt-8 hover:text-orange hover:bg-white text-base font-bold border-2 border-orange p-2 px-6 hover:bg-orange hover:text-white w-auto"
        >
          {isTransfer ? "Send" : "Withdraw"} Funds
        </button>
      </div>
    </div>
  );
};

export default WithdrawConfirm;

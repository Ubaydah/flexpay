import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import Popup from "reactjs-popup";
import { fundWalletFields, FundWalletSchema } from "../schemas/wallet";
import WithdrawConfirm from "./WithdrawConfirm";
import XCancel from "./XCancel";

const WalletForm = ({ handleFundWallet, close, isWithdraw }) => {
  const valuesRef = useRef(null);
  return (
    <Formik
      onSubmit={(values) => handleFundWallet(values, close)}
      innerRef={valuesRef}
      validationSchema={FundWalletSchema}
      initialValues={fundWalletFields}
    >
      {({ handleSubmit }) => (
        <>
          <p className="text-[#131221] font-black text-[16px] md:text-[24px] grid justify-center">{isWithdraw ? "Withdraw Funds" : "Fund Wallet"}</p>
          <div className="pt-5">
            <label>Amount</label>
            <div className="mt-1 relative flex justify-end">
              <Field
                name={"amount"}
                placeholder={"Enter an amount"}
                className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
              />
            </div>
            <ErrorMessage name={"amount"} render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal "}>{msg}</div>} />
          </div>
          <div className="pt-5">
            <label>Description</label>
            <div className="mt-1 relative flex justify-end">
              <Field
                name={"description"}
                placeholder={"Enter description"}
                className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
              />
            </div>
            <ErrorMessage
              name={"description"}
              render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal "}>{msg}</div>}
            />
          </div>

          {!isWithdraw && (
            <button
              onClick={handleSubmit}
              className="text-white bg-orange mt-8 hover:text-orange hover:bg-white text-base font-bold border-2 border-orange rounded-full p-2 hover:bg-orange hover:text-white w-full"
            >
              Submit <i className="fa fa-solid fa-arrow-right ml-2"></i>
            </button>
          )}
          {isWithdraw && (
            <Popup
              trigger={
                <button
                  disabled={
                    valuesRef?.current === null || valuesRef?.current?.values.message === "" || valuesRef?.current?.values.description === ""
                      ? true
                      : false
                  }
                  className={`text-white ${
                    valuesRef?.current === null || valuesRef?.current?.values.message === "" || valuesRef?.current?.values.description === ""
                      ? "bg-gray-500 cursor-not-allowed"
                      : "hover:bg-orange hover:text-white bg-orange hover:text-orange hover:bg-white border-2 border-orange "
                  }  mt-8 text-base font-bold rounded-full p-2 w-full`}
                >
                  Proceed to Withdraw <i className="fa fa-solid fa-arrow-right ml-2"></i>
                </button>
              }
              position="right center"
              modal
              closeOnDocumentClick
              nested
              contentStyle={{
                borderRadius: "12px",
                padding: "16px",
                width: "fit-content",
                backgroundColor: "white",
                fontSize: "0.8rem",
              }}
            >
              {(close) => (
                <>
                  <div className="mt-4 mr-4">
                    <XCancel close={close} />
                  </div>
                  <WithdrawConfirm handleSubmit={handleSubmit} amount={valuesRef?.current?.values.amount} />
                </>
              )}
            </Popup>
          )}
        </>
      )}
    </Formik>
  );
};

export default WalletForm;

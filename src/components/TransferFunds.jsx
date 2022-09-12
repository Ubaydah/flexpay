import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import Popup from "reactjs-popup";
import { fundWalletFields, FundWalletSchema } from "../schemas/wallet";
import WithdrawConfirm from "./WithdrawConfirm";
import XCancel from "./XCancel";

const TransFerFunds = ({ close, handleTransferFunds }) => {
  const valuesRef = useRef(null);
  return (
    <Formik
      onSubmit={(values) => handleTransferFunds(values, close)}
      innerRef={valuesRef}
      validationSchema={FundWalletSchema}
      initialValues={fundWalletFields}
    >
      {({ handleSubmit }) => (
        <>
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
          <Popup
            trigger={
              <div className="flex justify-center">
                <button
                  disabled={valuesRef?.current === null || valuesRef?.current?.values.amount === "" ? true : false}
                  className={`text-white ${
                    valuesRef?.current === null || valuesRef?.current?.values.amount === ""
                      ? "bg-gray-500 cursor-not-allowed"
                      : "hover:bg-orange hover:text-white bg-orange hover:text-orange hover:bg-white border-2 border-orange "
                  }  mt-8 text-base font-bold rounded-md p-2  px-4 w-auto`}
                >
                  Proceed <i className="fa fa-solid fa-arrow-right ml-2"></i>
                </button>
              </div>
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
              height: "75%",
            }}
          >
            {(close) => (
              <>
                <div className="mt-4 mr-4">
                  <XCancel close={close} />
                </div>
                <WithdrawConfirm handleSubmit={handleSubmit} amount={valuesRef?.current?.values.amount} isTransfer />
              </>
            )}
          </Popup>
        </>
      )}
    </Formik>
  );
};

export default TransFerFunds;

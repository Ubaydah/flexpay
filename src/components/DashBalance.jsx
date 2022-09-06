import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { closeModal, openModal } from "../redux/modal/modalRedux";
import { useExchangeCurrencyMutation, useFundWalletMutation, useGetWalletQuery } from "../redux/services";
import { fundWalletFields, FundWalletSchema } from "../schemas/wallet";
import XCancel from "./XCancel";

export const currency = [
  { sign: "$", code: "USD" },
  { sign: "Gh₵", code: "GHS" },
  { sign: "₦", code: "NGN" },
];

const DashBalance = () => {
  const [exchangeCurrency, { data, isLoading: loader, isSuccess, isError, error }] = useExchangeCurrencyMutation();
  const [fundWallet, { isLoading, isSuccess: success, isError: iserror, error: err }] = useFundWalletMutation();
  const { data: wallet, isFetching, isSuccess: issuccess, isError: iserr, error: errorr } = useGetWalletQuery();
  const [balance, setBalance] = useState({ sign: "$", value: wallet?.balance });
  const [sign, setSign] = useState();
  const dispatch = useDispatch();
  let [value, setValue] = useState();

  useEffect(() => {
    if (isSuccess) {
      setBalance({ ...balance, sign: sign, value: data?.amount });
    }
    if (isError && error) {
      toast.error(error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isSuccess, loader]);

  useEffect(() => {
    if (isFetching) {
      dispatch(openModal());
    }
    if (issuccess) {
      dispatch(closeModal());
      setBalance({ ...balance, value: wallet?.balance, sign: "$" });
    }
    if (iserr && errorr) {
      dispatch(closeModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFetching, issuccess, iserr, errorr, wallet]);

  useEffect(() => {
    if (isLoading) {
      dispatch(openModal());
    }
    if (success) {
      toast.success(`Funds deposited successfully`);
      dispatch(closeModal());
    }
    if (iserror && err) {
      toast.error(err?.data?.message);
      dispatch(closeModal());
    }
  }, [isLoading, err, iserror, success, dispatch]);

  const handleExchangeFunds = (e) => {
    setValue(e.target.value);
    if (e.target.value.split(",")[0] === "$") {
      setBalance({ ...balance, sign: "$", value: wallet?.balance });
    } else {
      exchangeCurrency({ amount: Number(wallet?.balance), currency_to: e.target.value.split(",")[1], currency_from: "USD" });
      setSign(e.target.value.split(",")[0]);
    }
  };

  const handleFundWallet = (values, close) => {
    fundWallet({ ...values, amount: Number(values.amount) });
    setValue("$, USD");
    close();
  };

  return (
    <div className="bg-orange rounded-xl mb-10">
      <div className="flex justify-end pt-5 px-4 md:px-10 ">
        <select className="bg-orange border text-white py-2 px-2 border-white rounded-lg" name="select1" onChange={handleExchangeFunds} value={value}>
          {currency.map((item, index) => (
            <option key={index} value={[item.sign, item.code]}>
              {item.code}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center flex-col text-white font-extrabold mb-3">
        <p className="text-base">Wallet Balance</p>
        <p className="text-4xl">
          {balance.sign}
          {balance.value}
        </p>
      </div>
      <div className="flex justify-center items-center pb-10 px-4 md:px-0">
        <button className="py-3 w-40 rounded-lg bg-white hover:bg-orange hover:border-2 hover:text-white hover:border-white font-bold">
          Withdraw
        </button>
        <Popup
          trigger={
            <button className="py-3  w-40 border-2 rounded-lg text-white border-white ml-5 hover:bg-white hover:text-black font-bold">Fund</button>
          }
          position="right center"
          modal
          closeOnDocumentClick
          nested
          contentStyle={{
            borderRadius: "12px",
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
              <div className="px-[24px] pb-[32px] w-[300px] md:w-[500px] h-[auto]">
                <Formik onSubmit={(values) => handleFundWallet(values, close)} validationSchema={FundWalletSchema} initialValues={fundWalletFields}>
                  {({ handleSubmit }) => (
                    <>
                      <p className="text-[#131221] font-black text-[16px] md:text-[24px] grid justify-center">Fund Wallet</p>
                      <div className="pt-5">
                        <label>Amount</label>
                        <div className="mt-1 relative flex justify-end">
                          <Field
                            name={"amount"}
                            placeholder={"Enter an amount"}
                            className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                          />
                        </div>
                        <ErrorMessage
                          name={"amount"}
                          render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal "}>{msg}</div>}
                        />
                      </div>
                      <div className="pt-5">
                        <label>Description</label>
                        <div className="mt-1 relative flex justify-end">
                          <Field
                            name={"description"}
                            placeholder={"Enter description"}
                            onKeyDown={(e) => {
                              e.key === "Enter" && handleSubmit();
                            }}
                            className="border w-full md:w-[500px] h-[40px] border-[#030729] opacity-50 rounded px-2  focus:outline-none "
                          />
                        </div>
                        <ErrorMessage
                          name={"description"}
                          render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal "}>{msg}</div>}
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="text-white bg-orange mt-8 hover:text-orange hover:bg-white text-base font-bold border-2 border-orange rounded-full p-2 hover:bg-orange hover:text-white w-full"
                      >
                        Submit <i className="fa fa-solid fa-arrow-right ml-2"></i>
                      </button>
                    </>
                  )}
                </Formik>
              </div>
            </>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DashBalance;

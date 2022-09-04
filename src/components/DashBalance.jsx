import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useExchangeCurrencyMutation } from "../redux/services";

export const currency = [
  { sign: "$", code: "USD" },
  { sign: "Gh₵", code: "GHS" },
  { sign: "₦", code: "NGN" },
];

const DashBalance = () => {
  const { user } = useSelector((state) => state.authStore);
  const [exchangeCurrency, { data, isSuccess, isError, error }] = useExchangeCurrencyMutation();
  const [balance, setBalance] = useState({ sign: "$", value: user.balance });
  const [sign, setSign] = useState();

  useEffect(() => {
    if (isSuccess) {
      setBalance({ ...balance, sign: sign, value: data?.amount });
    }
    if (isError && error) {
      toast.error(error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isSuccess]);

  const handleSubmit = (e) => {
    if (e.target.value.split(",")[0] === "$") {
      setBalance({ ...balance, sign: "$", value: user.balance });
    } else {
      exchangeCurrency({ amount: Number(user.balance), currency_to: e.target.value.split(",")[1], currency_from: "USD" });
      setSign(e.target.value.split(",")[0]);
    }
  };

  return (
    <div className="bg-orange rounded-xl mb-10">
      <div className="flex justify-end pt-5 px-4 md:px-10 ">
        <select className="bg-orange border text-white py-2 px-2 border-white rounded-lg" onChange={handleSubmit}>
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
        <button className="py-3  w-40 border-2 rounded-lg text-white border-white ml-5 hover:bg-white hover:text-black font-bold">Fund</button>
      </div>
    </div>
  );
};

export default DashBalance;

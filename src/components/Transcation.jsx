import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/modal/modalRedux";
import { useGetTransactionsQuery } from "../redux/services";
import Pagination from "./Pagination";

export const initialTxnQuery = {
  page: 1,
};
const Transcation = ({ istransaction }) => {
  const [query, setQuery] = useState(initialTxnQuery);
  const { data, isFetching, isSuccess: issuccess, isError: iserr, error: errorr } = useGetTransactionsQuery(query);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching) {
      dispatch(openModal());
    }
    if (issuccess) {
      dispatch(closeModal());
    }
    if (iserr && errorr) {
      dispatch(closeModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFetching, issuccess, iserr, errorr, query]);
  return (
    <div>
      {data?.results.map((item, index) => (
        <div key={index} className="flex justify-between mb-5 rounded-xl border border-gray sm:border-0 sm:p-0  p-2 items-center sm:rounded-none">
          <div className="flex items-center sm:items-stretch">
            <div className=" bg-black h-auto sm:w-14 mr-3 flex justify-center items-center">
              <BiTransfer className=" text-3xl text-white text-center" />
            </div>
            <div className="flex sm:justify-between flex-col w-[50px] sm:w-auto">
              <p className="text-[11px]  sm:text-xl font-extrabold sm:mb-3">{item.description}</p>
              <p className=" text-[4px] sm:text-sm">{item.transaction_type}</p>
            </div>
          </div>
          <div>
            <p className="text-[15px] sm:text-xl font-extrabold sm:mb-3 text-right">
              {item.amount[0] !== "-" ? "$" + item.amount : "-$" + item.amount.substring(1)}
            </p>
            <p className="text-sm text-end hidden sm:block">{moment(item.created_at).fromNow()}</p>
          </div>
          <p className="text-[10px] sm:hidden text-end  w-[60px]">{moment(item.created_at).fromNow()}</p>
        </div>
      ))}
      {istransaction && data?.count > 8 && <Pagination query={query} setQuery={setQuery} data={data?.results} count={data?.count} />}
    </div>
  );
};

export default Transcation;

import React from "react";
import Image4 from "../assets/image4.png";
import { useGetEmployeesQuery } from "../redux/services";
import Loading from "./Loading";
import EmptySearch from "./Empty/EmptySearch";
import Pagination from "./Pagination";
import EmptyFetch from "./Empty/EmptyFetch";

const EmployeesList = ({ query, setQuery, data }) => {
  const { isFetching } = useGetEmployeesQuery();

  if (isFetching && query.search === "") {
    return <Loading />;
  }
  return (
    <div>
      {data?.results?.length === 0 && query.search !== "" ? (
        <EmptySearch content={"employees"} />
      ) : (
        <>
          {data?.results?.length === 0 && query.search === "" ? (
            <EmptyFetch content={"No Employees added yet"} />
          ) : (
            data?.results.map((employee, index) => (
              <div className="flex justify-between items-center border-2 border-[rgba(106, 102, 102, 0.51)] rounded-lg p-4 mb-7" key={index}>
                <div className="flex items-start sm:items-center sm:w-auto w-full">
                  <img src={Image4} alt="" />
                  <div className="ml-5 w-full ">
                    <p className="text-[16px] font-bold">{employee?.name}</p>
                    <p className="text-sm font-thin">{employee?.department}</p>
                    <div className="sm:hidden flex  items-end justify-between w-full">
                      <div>
                        <p className="text-sm font-thin mt-3">Salary</p>
                        <p className="text-[16px] font-bold">${employee?.salary}</p>
                      </div>
                      <button className="px-2 py-2 rounded-xl bg-orange text-white font-bold text-base  hover:border-2 hover:border-orange hover:bg-white hover:text-orange">
                        view account
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-thin">Salary</p>
                  <p className="text-base font-bold">${employee?.salary}</p>
                </div>
                <button className=" hidden sm:block py-2 px-4 bg-orange text-white font-bold text-base rounded-lg hover:border-2 hover:border-orange hover:bg-white hover:text-orange">
                  view account
                </button>
              </div>
            ))
          )}
          {data?.results.length > 10 && <Pagination query={query} setQuery={setQuery} data={data?.results} count={data?.count} />}
        </>
      )}
    </div>
  );
};

export default EmployeesList;

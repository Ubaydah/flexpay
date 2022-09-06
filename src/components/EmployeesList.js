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
              <div
                className="w-full md:grid md:grid-cols-5 border-2 border-[rgba(106, 102, 102, 0.51)] rounded-lg p-4 mb-7 md:grid-col-3"
                key={index}
              >
                <div className="flex flex-col items-start sm:items-start break-all sm:w-auto w-full md:col-span-2">
                  <div className="gap-2 items-center hidden md:flex">
                    <img src={Image4} alt="" />
                    <p className="text-[16px] font-bold break-words w-full md:max-w-[250px] w-auto">{employee?.name}</p>
                  </div>
                  <div className="flex gap-2 md:hidden items-start">
                    <img src={Image4} alt="" />
                    <div>
                      <p className="text-[16px] font-bold break-words w-full md:hidden md:max-w-[250px] w-auto">{employee?.name}</p>
                      <p className="text-sm font-thin break-words">{employee?.department}</p>
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
                </div>
                <div className="hidden sm:block md:col-span-2 w-full">
                  <p className="text-sm font-thin">Salary</p>
                  <p className="text-base font-bold">${employee?.salary}</p>
                </div>
                <button className=" hidden sm:block py-2 px-4 bg-orange text-white font-bold text-base rounded-lg hover:border-2 hover:border-orange hover:bg-white hover:text-orange">
                  view account
                </button>
              </div>
            ))
          )}
          {data?.count > 8 && <Pagination query={query} setQuery={setQuery} data={data?.results} count={data?.count} />}
        </>
      )}
    </div>
  );
};

export default EmployeesList;

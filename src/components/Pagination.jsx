import { getPaginationData } from "../utils/utils";

const Pagination = ({ query, setQuery, data, count }) => {
  const { total_pages } = getPaginationData({ data: data, total_records: count, records_per_page: 8 });
  return (
    <div className="grid justify-center mt-5 text-[12px] md:text-[16px] mb-16">
      <div className="flex gap-2 md:gap-4 items-center">
        <span className="md:block hidden">Showing Result page </span>
        {query.page > 1 && (
          <div className="flex items-center cursor-pointer text-orange" onClick={() => setQuery({ ...query, page: query.page - 1 })}>
            <i className="fa-solid fa-arrow-left"></i> <button>Prev</button>
          </div>
        )}
        <p
          className="bg-white px-2 md:px-4 "
          style={{
            border: "1px solid #9796A9",
            borderRadius: "4px",
          }}
        >
          {query.page}
        </p>
        <p> of</p>
        {total_pages} pages
        {query.page < total_pages && (
          <div className="flex items-center cursor-pointer text-orange" onClick={() => setQuery({ ...query, page: query.page + 1 })}>
            <button>Next</button>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;

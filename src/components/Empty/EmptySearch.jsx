const EmptySearch = ({ content }) => {
  return (
    <div className="p-2 pt-0">
      <div>
        <p className="text-[#5E5BA7] text-[16px] mt-4 mb-4"></p>
      </div>
      {/* EMPTY CROUP */}
      <div className="grid justify-center sm:mt-40">
        <i className="fa fa-solid fa-xmark" style={{ fontSize: "36px" }}></i>
      </div>
      <div className="grid justify-center mt-4">
        <p className="text-[28px] grid justify-center text-center"> No {content} matches the query</p>
      </div>

      <div></div>
    </div>
  );
};

export default EmptySearch;

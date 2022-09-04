const EmptyFetch = ({ content }) => {
  return (
    <div>
      <div className="grid justify-center mt-32">
        <i className="fa fa-solid fa-xmark" style={{ fontSize: "36px" }}></i>
      </div>
      <div className="grid justify-center mt-4">
        <p className="text-[28px] grid justify-center text-center"> {content}</p>
      </div>
    </div>
  );
};

export default EmptyFetch;

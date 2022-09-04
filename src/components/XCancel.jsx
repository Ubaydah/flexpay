import React from "react";

const XCancel = ({ close }) => {
  return (
    <div className="flex justify-end ">
      <p onClick={close} className="cursor-pointer">
        <i className="fa-solid fa-xmark text-[20px] text-gray"></i>{" "}
      </p>
    </div>
  );
};

export default XCancel;

import React from "react";
import "./spinner.css"

const Spinner = ({pad,top}) => {
  return (
    <>
      <div className={`flex justify-center text-center items-center ${pad} relative ${top}`}>
        <div className="loader">
        </div>
      </div>
    </>
  );
};

export default Spinner;

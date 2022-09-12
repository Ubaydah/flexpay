import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import HeaderImage from "./HeaderImage";

const Hero = () => {
  const [index, setIndex] = useState(0);

  const content = [
    { content: "Employee payroll management,", span: "with APY Interest" },
    { content: " Build wealth with your", span: "employees" },
  ];

  useInterval(() => {
    if (index === 0) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  }, 5000);

  return (
    <div className="grid lg:grid-cols-2 lg:justify-end justify-center px-6 lg:px-0 font-Inter">
      <div className="lg:w-[670px] flex flex-col gap-[32px]  lg:h-full lg:pl-[70px]">
        <AnimatePresence mode={"wait"} initial={false}>
          <motion.h1
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
            className={`text-[32px] text-center w-full min-h-[172px] lg:h-[300px] lg:text-left lg:text-[64px]  font-bold leading-[42px] lg:leading-[77px] pt-[70px] lg:pt-[80px]`}
          >
            {content[index].content} <span className="text-orange">{content[index].span}</span>
          </motion.h1>
        </AnimatePresence>
        <p className="text-[20px] lg:text-[32px] leading-[26px] lg:leading-[42px] font-[400px] text-center lg:text-left font-DM_sans">
          Give your employees more reason to stay by making their money work for them
        </p>
        <div className="flex gap-[30px] flex-col md:flex-row  justify-center items-center">
          <button className="w-[222px] lg:w-[312px] min-h-[60px] lg:min-h-[84px] bg-orange trans rounded-[15px] text-white text-[17px] lg:text-[24px] font-semibold hover:text-orange hover:bg-white hover:border-2 hover:border-orange">
            <Link to="/register"> Create account</Link>
          </button>
          <button className="w-[222px] lg:w-[312px] min-h-[60px] lg:min-h-[84px] trans rounded-[15px] border border-[#000]  text-[17px] lg:text-[24px] font-semibold hover:text-orange hover:bg-white hover:border-2 hover:border-orange">
            Download App{" "}
          </button>
        </div>
      </div>
      <HeaderImage />
    </div>
  );
};

export default Hero;

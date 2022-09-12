import React, { useState } from "react";
import Man from "../assets/Man.png";
import Woman from "../assets/woman.png";
import Coin from "../assets/money1.svg";
import Money from "../assets/money.svg";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useInterval, useMediaQuery } from "usehooks-ts";

const images = [Woman, Man];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
};

const HeaderImage = () => {
  const swipeConfidenceThreshold = 10000;
  const matches = useMediaQuery("(max-width: 768px)");
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const [[page], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useInterval(() => {
    paginate(1);
  }, 5000);

  return (
    <div className="relative h-[300px] lg:h-[912px] mx-auto lg:mx-0 w-[80%] sm:w-[40%] lg:w-[60%] bg-[#ECFAFF] justify-self-end mt-[55px] lg:mt-0">
      <div className={`absolute -left-6 lg:-left-36 top-4 lg:top-16 h-[80%] sm:h-[100%] `}>
        <div className={`relative h-[120%] lg:h-[70%] w-[100%] sm:w-auto`}>
          <AnimatePresence initial={false}>
            <motion.img
              className="w-auto h-[100%]"
              key={page}
              src={images[imageIndex]}
              custom={matches ? "0" : 1000}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>

          <div className="absolute -left-4 sm:-left-44 bottom-10">
            <div className="z-10 flex gap-2 sm:gap-6 shadow-md w-[178px] sm:w-[292px] bg-white p-3 px-4 sm:px-8 rounded-xl items-center">
              <img src={Money} alt="money" className="h-[35px] sm:h-auto sm:w-[50px] animate-pulse" />
              <p className="text-[11px] sm:text-[17px] text-orange">Your salary earned 9% APY interest</p>
            </div>
          </div>
          <div className="absolute -right-16 sm:-right-36 top-1/2 -translate-y-[50%]">
            <div className="z-10 flex gap-2 sm:gap-6 shadow-md w-[176px] sm:w-[292px] bg-white p-3 px-4 rounded-xl items-center">
              <img src={Coin} alt="money" className="h-[35px] sm:h-auto sm:w-[50px] animate-bounce motion-safe:animate-spin" />
              <p className="text-[11px] sm:text-[17px]">Your savings goal has been reached</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderImage;

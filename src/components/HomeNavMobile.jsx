import React, { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { motion, useAnimation } from "framer-motion";
import { navItem } from "./HomeNav";

const NavMobile = ({ toggleMenu, setToggleMenu }) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const animation = useAnimation();

  const onClick = (name) => {
    document.querySelector(`#${name}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (matches) {
      setToggleMenu(false);
    }
    if (toggleMenu === "open") {
      setTimeout(() => {
        animation.start("visible");
      }, 1);
    } else {
      animation.start("hidden");
    }
  }, [toggleMenu, matches, setToggleMenu, animation]);

  const variants = {
    hidden: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const v = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        stiffness: 70,
      },
    },
    visible: {
      opacity: 1,
      y: -0,
      transition: {
        type: "spring",
        stiffness: 70,
      },
    },
  };

  return (
    <ul
      className={`z-30 mx-auto fixed w-[100vw] top-0 pt-32 md:w-[300px] bg-[#fff] lg:hidden  left-0 p-3 h-screen shadow-2xl list-none flex flex-col justify-start text-white ${
        toggleMenu === "open" ? "animate-slide-in" : toggleMenu === "close" ? " animate-slide-out" : "hidden -w-[100vw]"
      }`}
    >
      <motion.div initial="hidden" animate={animation} variants={variants}>
        {navItem.map((item, index) => (
          <div key={item + index}>
            {/* <Link to={"/" + item}> */}
            <motion.div
              variants={v}
              className={`flex items-center mx-auto text-white text-lg mb-3 font-semibold px-5 cursor-pointer py-3 ${
                item && "text-center rounded-lg text-flex-purple bg-white w-[80%]"
              }`}
              onClick={() => {
                onClick(item);
                setToggleMenu("close");
              }}
            >
              <button className="w-[300px]  mx-auto min-h-[50px] bg-orange trans rounded-full text-white text-base font-semibold hover:text-orange hover:bg-white hover:border-2 hover:border-orange">
                {item}
              </button>{" "}
            </motion.div>
            {/* </Link> */}
          </div>
        ))}
      </motion.div>
    </ul>
  );
};

export default NavMobile;

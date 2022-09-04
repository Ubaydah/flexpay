import React, { useEffect, useState } from "react";
import { MdDashboard, MdNotifications, MdSettings } from "react-icons/md";
import { BsArrowRightShort, BsFillBarChartLineFill, BsPeopleFill } from "react-icons/bs";
import Image03 from "../assets/profile.png";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { BiTransfer } from "react-icons/bi";
import { useDispatch } from "react-redux";

const Navbar = ({ navbar }) => {
  const [toggleMenu, setToggleMenu] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const animation = useAnimation();

  useEffect(() => {
    if (toggleMenu === "open") {
      setTimeout(() => {
        animation.start("visible");
      }, 100);
    } else {
      animation.start("hidden");
    }
  }, [toggleMenu, animation]);

  const variants = {
    hidden: {
      transition: {
        staggerChildren: 0.05,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const v = {
    hidden: {
      opacity: 0,
      x: -50,
      transition: {
        type: "spring",
        stiffness: 70,
      },
    },
    visible: {
      opacity: 1,
      x: -0,
      transition: {
        type: "spring",
        stiffness: 70,
      },
    },
  };
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="flex justify-between items-center mb-5 md:mr-5">
      <div className="flex md:hidden">
        {toggleMenu === "open" ? (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu("close")} />
        ) : (
          <HiMenuAlt4 fontSize={28} className="text-black md:hidden  cursor-pointer" onClick={() => setToggleMenu("open")} />
        )}
        <ul
          className={`z-10 fixed px-10 w-[100vw] md:w-[300px] bg-[#030729] top-0 lg:hidden  left-0 p-3 h-screen shadow-2xl list-none flex flex-col justify-start text-white ${
            toggleMenu === "open" ? "animate-slide-in" : toggleMenu === "close" ? " animate-slide-out" : "hidden -w-[100vw]"
          }`}
        >
          <motion.div initial="hidden" animate={animation} variants={variants}>
            <div className="text-xl my-2 justify-end flex mt-5 mb-8">
              <AiOutlineClose onClick={() => setToggleMenu("close")} className="cursor-pointer" />
            </div>
            {["dashboard", "wallet", "employees", "transactions", "statistics", "settings"].map((item, index) => (
              <div key={item + index}>
                <Link to={"/" + item}>
                  <motion.div
                    variants={v}
                    className={`flex items-center text-white text-lg mb-3 font-semibold px-5 cursor-pointer py-3 ${
                      location.pathname === "/" + item && "text-center rounded-lg text-flex-purple bg-white w-[80%]"
                    }`}
                    onClick={() => setToggleMenu("close")}
                  >
                    {item === "dashboard" ? (
                      <MdDashboard className="text-3xl mr-7" />
                    ) : item === "wallet" ? (
                      <FaWallet className="text-3xl mr-7" />
                    ) : item === "employees" ? (
                      <BsPeopleFill className="text-3xl mr-7" />
                    ) : item === "transactions" ? (
                      <BiTransfer className="text-3xl mr-7" />
                    ) : item === "statistics" ? (
                      <BsFillBarChartLineFill className="text-3xl mr-7" />
                    ) : (
                      <MdSettings className="text-3xl mr-7" />
                    )}
                    <p className="capitalize">{item}</p>
                  </motion.div>
                </Link>
              </div>
            ))}
            <motion.div variants={v} className=" flex items-center py-3 text-lg px-5 font-semibold cursor-pointer" onClick={handleLogout}>
              <BsArrowRightShort className="text-3xl mr-7  bg-white text-flex-purple" />
              <p className="text-white">Logout</p>
            </motion.div>{" "}
          </motion.div>
        </ul>
      </div>
      {navbar === "Dashboard" ? (
        <div className="hidden md:block">
          <p className="font-semibold text-sm">Hello,</p>
          <p className="font-extrabold text-sm">OvalFi HR Admin</p>{" "}
        </div>
      ) : (
        <p className="text-2xl hidden md:block font-extrabold">{navbar}</p>
      )}
      <div className="flex items-center gap-4">
        <MdNotifications className="text-3xl mr-7 " />
        <img src={Image03} alt="" />
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/F1.svg";
import NavMobile from "./HomeNavMobile";

export const navItem = ["Home", "Contact Us", "Download App"];
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState("");

  const toggleNav = () => {
    toggleMenu === "open" ? setToggleMenu("close") : setToggleMenu("open");
  };

  const onClick = (name) => {
    document.querySelector(`#${name}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex items-center md:pl-14 pr-24 pt-8 md:pt-14 z-50 text-[20px] font-Inter">
        <div className="flex items-center w-full gap-6 lg:gap-12">
          <div className="z-50">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-6 lg:gap-12">
              {navItem.map((title, index) => (
                <div key={index} onClick={() => onClick(title)}>
                  <div key={title + index} className="hover:text-orange hover:scale-105 transition-all text-[20px]">
                    <Link to={`#${title}`}>{title}</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center w-full gap-6 lg:gap-12 justify-end ">
          <div className="hover:text-orange hover:scale-105 transition-all">
            <Link to="/login" className="cursor-pointer color-[#64ffda]">
              Sign in
            </Link>
          </div>
          <button className="w-[200px] min-h-[50px] bg-orange trans rounded-full text-white font-semibold hover:text-orange hover:bg-white hover:border-2 hover:border-orange">
            <Link to="/register"> Create account</Link>
          </button>
        </div>
        <div cursor={"pointer"} className="cursor-pointer z-50 right-6 absolute block md:hidden">
          <div onClick={toggleNav} className="hover:scale-110 transition ease-in-out w-12 h-12 flex flex-col items-end justify-center gap-2">
            <div
              className={`duration-200 rounded-full w-[70%] h-[2.5px] bg-gray-900  ${
                toggleMenu === "open" && "translate-x-[4px] translate-y-[5px]  transition ease-in-out rotate-45"
              }`}
            ></div>
            <div
              className={`duration-200 rounded-full ${toggleMenu === "open" ? "w-[70%]" : "w-[50%]"} bg-gray-900 h-[2.5px] ${
                toggleMenu === "open" && "opacity-0"
              }`}
            ></div>
            <div
              className={`duration-200 rounded-full  ${toggleMenu === "open" ? "w-[70%]" : "w-[40%]"} bg-gray-900 h-[2.5px] ${
                toggleMenu === "open" && "-rotate-45 translate-x-[4px] -translate-y-[16px]  transition ease-in-out"
              }`}
            ></div>
          </div>
        </div>
        <NavMobile toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      </div>
    </>
  );
};
export default Navbar;

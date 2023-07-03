import React, { useState } from "react";
import { FaHeart, FaHome, FaStopwatch } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import control from "../../../assets/control.png";
import logo from "../../../assets/logo.png";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/"><div className="flex gap-x-4 items-center border-b pb-10">
          <img
            src={logo}
            className={`cursor-pointer duration-500 h-12 w-12 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            FlixFilm
          </h1>
        </div></Link>
        <ul className="pt-6">
          <li
            className={`  rounded-md p-2 cursor-pointer text-white text-sm items-center gap-x-4 
                `}
          >
            <NavLink
              to="/dashboard/userhome"
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950 rounded-md flex items-center gap-3" : "flex items-center gap-3")}
            >
              <FaHome className="text-2xl" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-xl`}
              >
                Home
              </span>
            </NavLink>
          </li>
          <li
            className={`  rounded-md p-2 my-2 cursor-pointer text-white text-sm items-center gap-x-4 
                `}
          >
            <NavLink
              to="/dashboard/favoritevideos"
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950 p-2 rounded-md flex items-center gap-3" : "flex items-center gap-3")}
            >
              <FaHeart className="text-2xl"  />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-xl`}
              >
                Favorite Videos
              </span>
            </NavLink>
          </li>
          <li
            className={`  rounded-md p-2 cursor-pointer text-white text-sm items-center gap-x-4 
                `}
          >
            <NavLink
              to="/dashboard/watchlater"
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950 p-2 rounded-md flex items-center gap-3" : "flex items-center gap-3")}
            >
              <FaStopwatch className="text-2xl"  />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-xl`}
              >
                Watch Later
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;

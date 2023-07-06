import React, { useState } from "react";
import { BiListPlus } from "react-icons/bi";
import { FaHeart, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import control from "../../../assets/control.png";
import logo from "../../../assets/logo.png";
import useAdmin from "../../../hooks/useAdmin";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  // TODO: do it by data faching
  const [isAdmin] = useAdmin();

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
        <Link to="/"><div className="flex gap-x-4 items-center mb-20">
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
            className={`  rounded-md p-2 cursor-pointer text-white text-sm border-b pb-5 items-center gap-x-4 
                `}
          >
            <NavLink
              to="/dashboard/userprofile"
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950 rounded-md flex items-center gap-3" : "flex items-center gap-3")}
            >
              <FaUser className="text-2xl" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-xl`}
              >
                Profile
              </span>
            </NavLink>
          </li>
          {
            isAdmin ?
            <>
            <li
            className={`  rounded-md p-2 my-2 cursor-pointer text-white text-sm items-center gap-x-4 
                `}
          >
            <NavLink
              to="/dashboard/adminhome"
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950  rounded-md flex items-center gap-3" : "flex items-center gap-3")}
            >
              <FaHome className="text-2xl"  />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-xl`}
              >
                Admin Home
              </span>
            </NavLink>
          </li>
          <li
            className={`  rounded-md p-2 cursor-pointer text-white text-sm items-center gap-x-4 
                `}
          >
            <NavLink
              to="/dashboard/manageusers"
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950  rounded-md flex items-center gap-3" : "flex items-center gap-3")}
            >
              <FaUsers className="text-2xl"  />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-xl`}
              >
                Manage Users
              </span>
            </NavLink>
          </li>
            </>
            : <>
            <li
            className={`  rounded-md p-2 my-2 cursor-pointer text-white text-sm items-center gap-x-4 
                `}
          >
            <NavLink
              to="/dashboard/favoritevideos"
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950  rounded-md flex items-center gap-3" : "flex items-center gap-3")}
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
              className={ ({ isActive }) => (isActive && open ? " bg-gradient-to-r from-red-600 p-2 to-red-950  rounded-md flex items-center gap-3" : "flex items-center gap-3")}
            >
              <BiListPlus className="text-3xl"  />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-xl`}
              >
                Watch Later
              </span>
            </NavLink>
          </li>
            </>
          }
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;

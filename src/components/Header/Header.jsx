import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
       
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
      
        <ul className="menuItems">
        <div className="hidden lg:block md:block">
              <input
              className="border-b border-gray-300 me-5 focus:border-gray-300 outline-none py-3 ps-2 lg:w-[350px] md:w-56 bg-black bg-opacity-0 text-white"
                type="text"
                placeholder="Search for a movie or tv show....."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              </div>
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            <NavLink
              to="/explore/movie"
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              Movies
            </NavLink>
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            
            <NavLink
              to="/explore/tv"
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              TV Shows
            </NavLink>
          </li>
          <li className="menuItem" >
            
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "text-red-600" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          {/* <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li> */}
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;

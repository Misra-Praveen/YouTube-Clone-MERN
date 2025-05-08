import React, { useState, useEffect, useRef } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    navigate("/login");
  };
  // const toggleDropdown = () => {
  //   setShowDropdown((prev) => !prev);
  // };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed content-center top-0 bg-white shadow-md z-50 px-4 py-2 flex items-center justify-between flex-wrap">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-0.5 mt-2 md:gap-4 w-auto">
        <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100">
          <MenuRoundedIcon fontSize="medium" />
        </button>
        <div className="flex items-center gap-1">
          <YouTubeIcon sx={{ color: "red", fontSize: 38 }} />

          <span className="hidden sm:inline text-xl font-semibold">
            YouTube
          </span>
          <sup className="hidden sm:inline text-gray-500 text-sm">IN</sup>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="w-1/2  mt-2 sm:mt-0">
        <div className="flex w-full border border-gray-300 rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search"
            className="w-[80%] border rounded-l-full border-gray-300 px-4 py-1 sm:py-1.5 focus:outline-none"
          />
          <button className="px-4 w-[20%] bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
            <SearchSharpIcon />
          </button>
        </div>
      </div>

      {/* Right: Auth Button */}
      <div className="mt-2 sm:mt-0 flex justify-end">
        {token ? (
          <div ref={dropdownRef} className="relative">
            <img
              src={
                `http://localhost:5000${avatar}` ||
                "https://www.gravatar.com/avatar/?d=mp"
              }
              alt="avatar"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border cursor-pointer "
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen  && (
              <div className="absolute right-0 mt-2 bg-white shadow shadow-gray-700 rounded-md py-2 z-50">
                <div className="px-4 py-2 text-sm font-bold  bg-gradient-to-r from-blue-500 via-rose-400 to-purple-950 text-transparent bg-clip-text border-b-2 border-amber-300">
                  {username}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogoutIcon fontSize="small" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            <AccountCircleIcon />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

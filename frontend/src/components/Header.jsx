import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <header className="w-full fixed content-center top-0 bg-white shadow-md z-50 px-4 py-2 flex items-center justify-between flex-wrap">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-0.5 md:gap-4 w-auto">
        <button className="hidden sm:block p-2 rounded-full hover:bg-gray-100">
          <MenuRoundedIcon fontSize="medium" />
        </button>
        <div className="flex items-center gap-1">
          <YouTubeIcon sx={{ color: "red", fontSize: 36 }} />

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
            className="w-[80%] border rounded-l-full border-gray-300 px-4 py-2 focus:outline-none"
          />
          <button className="px-4 w-[20%] bg-gray-50 hover:bg-gray-100 flex items-center justify-center">
            <SearchSharpIcon />
          </button>
        </div>
      </div>

      {/* Right: Sign In */}
      <div className="w-auto  mt-2 sm:mt-0 flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100">
          <AccountCircleIcon />
          <span>Sign in</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

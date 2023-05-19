import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { removeData } from "../utils";

const NavBar = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    removeData("userToken");
    navigate("/");
  };

  return (
    <nav
      className="flex w-full h-[70px] items-center
      justify-between px-12 bg-white"
    >
      <div className="flex gap-x-6 items-center">
        <a
          href="/home"
          className={`${
            pathname === "/home" ? "text-green" : "text-primary"
          } font-normal`}
        >
          Scanner
        </a>
        <a
          href="/history"
          className={`${
            pathname === "/history" ? "text-green" : "text-primary"
          } font-normal`}
        >
          Historique
        </a>
      </div>
      <button
        onClick={handleLogout}
        className="text-primary hover:text-green
          font-normal"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;

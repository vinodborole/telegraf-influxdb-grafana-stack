import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectComponent } from "../store/store";
import { selectTheme } from "../store/store";
import { ReactComponent as Logo } from "../../logo/logo-2.svg";
import { ReactComponent as Logo_Dark } from "../../logo/logo-2-dark.svg";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import Logout from "../Authentication/Logout";
import "../styles/NavBar.css";
function Navbar() {
  const isDarkTheme = useSelector(selectTheme);
  const isLogin=useSelector(selectComponent)
  return (
    <div class=" overflow-x-hidden relative flex-auto bg-gray-200 dark:bg-simnovous-teal shadow-xl ">
      <header className="inline-flex items-center justify-between p-4 w-screen bg-gray-100 dark:bg-simnovous-teal dark:border dark:border-cyan-700 mx-auto border-orange-500 overflow-hidden shadow-xl">
        {isDarkTheme ? <Logo class="h-8"/> : <Logo_Dark class="h-8"/>}

        <div className="flex items-center relative gap-5">
        <ThemeChanger /> 
        {isLogin.login && <Logout/>}
        </div>
       

    
      </header>
      <Outlet />
    </div>
  );
}

export default Navbar;

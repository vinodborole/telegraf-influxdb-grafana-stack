import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleThemeAction } from "../store/store";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Theme.css";

function ThemeChanger() {
  const isDarkTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    dispatch(toggleThemeAction.toggletheme());
  };

  return (
    <div class="items-right">
      <input
        type="checkbox"
        className="checkbox"
        id="chk"
        checked={isDarkTheme}
        onChange={toggleTheme}
      />
      <label htmlFor="chk" className="label">
        <FontAwesomeIcon icon={faMoon} className="fa-moon" />
        <FontAwesomeIcon icon={faSun} className="fa-sun" />

        <div className="ball"></div>
      </label>
    </div>
  );
}

export default ThemeChanger;

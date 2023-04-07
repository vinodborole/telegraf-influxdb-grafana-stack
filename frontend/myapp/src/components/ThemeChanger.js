import React, { useState } from 'react';
import {faMoon,faSun} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import './Theme.css';

function ThemeChanger({isDarkTheme,toggleTheme}) {


  return (
    <div class="header-right">
      <input
        type="checkbox"
        className="checkbox"
        id="chk"
        checked={isDarkTheme}
        onClick={toggleTheme}
      />
      <label htmlFor="chk" className="label">
        <FontAwesomeIcon icon={faMoon} className='fa-moon'/>
        <FontAwesomeIcon icon={faSun} className='fa-sun'/>


      
        <div className="ball"></div>
      </label>
    </div>
  );
}

export default ThemeChanger;


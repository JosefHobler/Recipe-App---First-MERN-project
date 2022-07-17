import React from "react";
import "./navigation.scss";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { darkModeSliceAction } from "../store/darkModeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
function Navigation() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  const handleChange = () => {
    dispatch(darkModeSliceAction.toggleDarkMode());
  };

  return (
    <div className="navigation-wrapper">
      <div className="container">
        <h2>Recipe App</h2>
        <div>
          {/* <span className="darkMode-icon">
            <FontAwesomeIcon icon={faMoon} />
          </span> */}
          <Switch onChange={handleChange} checked={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default Navigation;

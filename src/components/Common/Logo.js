import React from "react";
import PropTypes from "prop-types";
import logo from "static/logo.png";
import styles from "styles/Logo.module.css";

export const AppLogo = ({ className = "me-2", size = 35 }) => (
  <img
    src={logo}
    alt="Smoquit Logo"
    width={`${size}`}
    height={`${size}`}
    className={className}
  />
);

AppLogo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export const AppTitle = ({ className = "", style = {} }) => (
  <span className={`${styles.GradientTitle} ${className}`} style={style}>
    Smoquit
  </span>
);

AppTitle.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export const AppLogoWithTitle = () => (
  <>
    <AppLogo />
    <AppTitle />
  </>
);

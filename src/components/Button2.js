import React from "react";
import "../css/Button1.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline", "btn--nooutline", "btn--test"];

const SIZES = ["btn--medium", "btn--large"];

export const Button2 = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to="/dangky" className="btn-mobile1">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};

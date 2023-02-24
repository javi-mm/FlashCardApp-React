import React from "react";
import "./Button.scss";

const Button = (props) => {
  const { fontSize, onClick, text, size, iconUrl } = props;
  return (
    <button
      className={`custom_button ${size}`}
      style={{ fontSize }}
      onClick={onClick}
    >
      {!iconUrl && <div>{text}</div>}
      {iconUrl && (
        <div className="inside_button">
          <img src={`${iconUrl}`} alt="Icono" />
          {text}
        </div>
      )}
    </button>
  );
};

export default Button;

import "./DecksWrapper.scss";
import React from "react";

const DecksWrapper = ({ children, titulo }) => {
  return (
    <div className="page_wrapper">
      <h2>{titulo}</h2>
      <div className="decks_wrapper">{children}</div>
    </div>
  );
};

export default DecksWrapper;

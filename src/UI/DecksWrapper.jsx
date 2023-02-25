import "./DecksWrapper.scss";
import React from "react";
import Spinner from "./Spinner";

const DecksWrapper = ({ children, titulo, loading }) => {
  return (
    <div className="page_wrapper">
      <h2>{titulo}</h2>
      {loading ? <Spinner /> : <div className="decks_wrapper">{children}</div>}
    </div>
  );
};

export default DecksWrapper;

import React from "react";
import { Outlet } from "react-router-dom";
import DeckNav from "../UI/DeckNav";

const DeckLayout = () => {
  return (
    <>
      <DeckNav />
      <Outlet />
    </>
  );
};

export default DeckLayout;

import React from "react";
import { useParams, Outlet } from "react-router-dom";
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

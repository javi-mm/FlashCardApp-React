import "./DeckNav.scss";
import React from "react";
import { NavLink } from "react-router-dom";

const DeckNav = () => {
  const activeStyle = {
    textDecoration: "underline",
  };

  return (
    <nav className="deck_nav">
      <ul className="deck_nav_ul">
        <li>
          <NavLink
            className="deck_navlink"
            to={`view`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Ver Deck
          </NavLink>
        </li>
        <li>
          <NavLink
            className="deck_navlink"
            to={`edit`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Deck Completo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DeckNav;

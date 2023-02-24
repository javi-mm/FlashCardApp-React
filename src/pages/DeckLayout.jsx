import React from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";

const DeckLayout = () => {
  const params = useParams();
  return (
    <>
      {/* <h2>{params.deckId}</h2>
      <ul>
        <li>
          <NavLink to={`/decks/${params.deckId}/edit`}>Editar</NavLink>
        </li>
        <li>
          <NavLink to={`/decks/${params.deckId}/view`}>Ver</NavLink>
        </li>
      </ul> */}
      <Outlet />
    </>
  );
};

export default DeckLayout;

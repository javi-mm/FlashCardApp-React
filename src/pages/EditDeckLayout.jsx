import React from "react";
import CardList from "../components/CardList";
import { useParams } from "react-router-dom";

const EditDeckLayout = () => {
  const { deckId } = useParams();

  if (!deckId) return;

  return (
    <>
      <CardList deckID={deckId} />
    </>
  );
};

export default EditDeckLayout;

import React from "react";
import CardCarousel from "../components/CardCarousel";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDocCustom } from "../helpers/functions";
import { useState } from "react";

const ViewDeckLayout = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState();

  const helperFn = async (params) => {
    const response = await getDocCustom("decks", deckId);
    setDeck(response);
  };

  useEffect(() => {
    if (deckId) {
      helperFn();
    }
  }, [deckId]);

  if (!deck) return;
  return (
    <>
      <CardCarousel deck={deck} />
    </>
  );
};

export default ViewDeckLayout;

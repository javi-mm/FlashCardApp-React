import React from "react";
import CardCarousel from "../components/CardCarousel";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDocCustom } from "../helpers/functions";
import { useState } from "react";
import Spinner from "../UI/Spinner";

const ViewDeckLayout = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState();
  const [loading, setLoading] = useState(true);

  const helperFn = async () => {
    const response = await getDocCustom("decks", deckId);
    setDeck(response);
    setLoading(false);
  };

  useEffect(() => {
    if (deckId) {
      helperFn();
    }
  }, [deckId]);

  return (
    <>
      <CardCarousel deck={deck} loading={loading} />
    </>
  );
};

export default ViewDeckLayout;

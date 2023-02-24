import "./AllDecks.scss";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import Deck from "../components/Deck";
import DecksWrapper from "../UI/DecksWrapper";

const AllDecks = () => {
  const [allDecks, setAllDecks] = useState([]);

  const getAllDecks = async () => {
    const querySnapshot = await getDocs(collection(db, "decks"));
    querySnapshot.forEach((doc) => {
      setAllDecks((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    getAllDecks();

    return () => {
      setAllDecks([]);
    };
  }, []);

  if (!allDecks) return;

  return (
    <DecksWrapper titulo={"Todos los Decks"}>
      {allDecks.map((deck) => {
        return (
          <Deck
            key={deck.id}
            id={deck.id}
            userID={deck.user}
            userPhoto={deck.userPhoto}
            userName={deck.userName}
            cards={deck.cards}
            titulo={deck.titulo}
            isDeckOwner={false}
          />
        );
      })}
    </DecksWrapper>
  );
};

export default AllDecks;

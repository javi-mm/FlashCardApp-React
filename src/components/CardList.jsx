import "./CardList.scss";
import { useState, useEffect } from "react";
import CardListElement from "./CardListElement";
import { getDocCustom } from "../helpers/functions";
import CreateNewCard from "./CreateNewCard";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../UI/Button";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import Spinner from "../UI/Spinner";

const CardList = ({ deckID }) => {
  const currenUser = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [deck, setDeck] = useState();

  const deleteCardFromDeck = async (cardID) => {
    const deckRef = doc(db, "decks", deckID);
    await updateDoc(deckRef, {
      cards: arrayRemove(cardID),
    });
  };

  const deleteCard = async (cardID) => {
    await deleteDoc(doc(db, "cards", cardID));
  };

  const deleteCardFromDB = async (cardID) => {
    setLoading(true);
    await deleteCard(cardID);
    await deleteCardFromDeck(cardID);
  };

  const openModal = () => {
    setIsModalShowing(true);
  };

  const getDeck = async () => {
    if (!loading) setLoading(true);
    const response = await getDocCustom("decks", deckID);
    setDeck(response);
    setLoading(false);
  };

  useEffect(() => {
    if (deckID) {
      getDeck();
    }
  }, [deckID]);

  const updateCardList = () => {
    getDeck();
  };

  if (loading)
    return (
      <div className="cards_wrapper">
        <div className="cardlist">
          <Spinner />
        </div>
      </div>
    );

  if (!deck) return;

  const isDeckOwner = currenUser?.uid === deck.user;

  return (
    <div className="cards_wrapper">
      <div className="cardlist">
        {deck &&
          deck.cards.map((cardID) => {
            return (
              <CardListElement
                key={cardID}
                cardID={cardID}
                updateCardList={updateCardList}
                isDeckOwner={isDeckOwner}
                deleteCardFromDB={deleteCardFromDB}
              />
            );
          })}
        {isDeckOwner && (
          <Button
            onClick={openModal}
            text={"Añade una Carta"}
            size={"medium"}
            fontSize={15}
          ></Button>
        )}
      </div>

      {isModalShowing && (
        <CreateNewCard
          deckID={deckID}
          updateCardList={updateCardList}
          onClose={() => setIsModalShowing(false)}
        />
      )}
    </div>
  );
};

export default CardList;

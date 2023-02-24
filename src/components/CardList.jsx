import "./CardList.scss";
import { useState, useEffect } from "react";
import CardListElement from "./CardListElement";
import { getDocCustom } from "../helpers/functions";
import CreateNewCard from "./CreateNewCard";
import DeleteItem from "./DeleteItem";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../UI/Button";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";

const CardList = ({ deckID }) => {
  const currenUser = useContext(UserContext);
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
    await deleteCard(cardID);
    await deleteCardFromDeck(cardID);
  };

  const openModal = () => {
    setIsModalShowing(true);
  };

  const getDeck = async () => {
    const response = await getDocCustom("decks", deckID);
    setDeck(response);
  };

  useEffect(() => {
    if (deckID) {
      getDeck();
    }
  }, [deckID]);

  const updateCardList = () => {
    getDeck();
  };

  if (!deck) return;

  const isDeckOwner = currenUser?.uid === deck.user;

  return (
    <div className="cards_wrapper">
      <div className="cardlist">
        {deck &&
          deck.cards.map((cardID) => {
            return (
              <div key={cardID} className="card_with_delete_button">
                <CardListElement
                  cardID={cardID}
                  updateCardList={updateCardList}
                  isDeckOwner={isDeckOwner}
                />
                {isDeckOwner && (
                  <DeleteItem
                    id={cardID}
                    update={updateCardList}
                    onClick={deleteCardFromDB}
                  />
                )}
              </div>
            );
          })}
        {isDeckOwner && (
          <Button
            onClick={openModal}
            text={"Add New Card"}
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

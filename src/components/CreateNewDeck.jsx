import "./CreateNewDeck.scss";
import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { getDocCustom } from "../helpers/functions";

const CreateNewDeck = ({ onClose, updateDecks, userID }) => {
  const [deckTitle, setDeckTitle] = useState("");

  const getUserInfo = async (userID) => {
    const userInfo = await getDocCustom("users", userID);
    return userInfo;
  };

  useEffect(() => {
    if (!userID) return;
    getUserInfo(userID);
  }, [userID]);

  const handleInputChange = (event) => {
    setDeckTitle(event.target.value);
  };

  const handleCreateDeck = async () => {
    onClose();
    await createDeck();
  };

  const createDeck = async () => {
    const userInfo = await getUserInfo(userID);
    const deckRef = doc(collection(db, "decks"));
    const id = deckRef.id;
    if (deckTitle) {
      await setDoc(deckRef, {
        titulo: deckTitle,
        cards: [],
        user: userID,
        userName: userInfo.name,
        userPhoto: userInfo.photoURL,
        id,
      });
    }
    await updateDecks();
  };

  return (
    <Modal>
      <div className="deck_container">
        <div className="deck_title">
          <input
            type="text"
            placeholder="Escribe el título de tu deck"
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons">
          <Button
            size={"medium"}
            fontSize={16}
            text={"Create Deck"}
            onClick={handleCreateDeck}
          ></Button>
          <Button
            size={"medium"}
            fontSize={16}
            text={"Close"}
            onClick={onClose}
          ></Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNewDeck;

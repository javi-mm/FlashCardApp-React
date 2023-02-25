import "./CreateNewCard.scss";
import React from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState } from "react";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";

const CreateNewCard = ({ onClose, updateCardList, deckID }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const addCardToDeck = async (cardID) => {
    const deckRef = doc(db, "decks", deckID);
    await updateDoc(deckRef, {
      cards: arrayUnion(cardID),
    });
  };

  const createCard = async () => {
    const cardRef = doc(collection(db, "cards"));
    const cardID = cardRef.id;
    if (answer || question) {
      await setDoc(cardRef, {
        question,
        answer,
      });
      await addCardToDeck(cardID);
      updateCardList();
      onClose();
    } else {
      setError(true);
    }
  };

  const handleCreateCard = async () => {
    await createCard();
  };
  const handleQuestion = (event) => {
    setError(false);
    setQuestion(event.target.value);
  };

  const handleAnswer = (event) => {
    setError(false);
    setAnswer(event.target.value);
  };

  return (
    <Modal>
      <div className="inputs">
        <h3>Crea una Carta</h3>
        <div className="input">
          <textarea
            placeholder="Introduce la pregunta"
            onChange={handleQuestion}
          />
        </div>
        <div className="input">
          <textarea
            placeholder="Introduce la respuesta"
            onChange={handleAnswer}
          />
        </div>
        {error && <p style={{ color: "red" }}>Los dos campos están vacíos.</p>}

        <div className="buttons">
          <Button
            size={"medium"}
            fontSize={16}
            text={"Crea una Carta"}
            disabled={error ? true : false}
            onClick={handleCreateCard}
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

export default CreateNewCard;

import "./CardListElement.scss";
import { useState } from "react";
import { getCard } from "../helpers/functions";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRef } from "react";
import useAutosizeTextArea from "../hooks/useAutoSizeArea";
import DeleteItem from "./DeleteItem";

const CardListElement = ({
  cardID,
  updateCardList,
  isDeckOwner,
  deleteCardFromDB,
}) => {
  const questionTextAreaRef = useRef();
  const answerTextAreaRef = useRef();
  const [card, setCard] = useState();
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  useAutosizeTextArea(questionTextAreaRef.current, question);
  useAutosizeTextArea(answerTextAreaRef.current, answer);

  const updateCard = async () => {
    const cardRef = doc(db, "cards", cardID);
    await updateDoc(cardRef, {
      question,
      answer,
    });
    updateCardList();
  };

  const getCardInfo = async () => {
    const cardInfo = await getCard(cardID);
    setCard(cardInfo);
  };

  useEffect(() => {
    if (!cardID) return;
    getCardInfo();
  }, [cardID]);

  useEffect(() => {
    if (!card) return;
    setAnswer(card.answer);
    setQuestion(card.question);
  }, [card]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };
  const handleCardOnBlur = () => {
    if (!isDeckOwner) return;
    updateCard();
  };

  if (!card) return;

  return (
    <div key={cardID} className="card_with_delete_button">
      <div onBlur={handleCardOnBlur} className="card_element">
        <div className="card_element_side card_element_left">
          <div className="card_element_letter">
            <p>Q</p>
          </div>
          <div className="card_element_textarea">
            <textarea
              ref={questionTextAreaRef}
              readOnly={!isDeckOwner ? true : false}
              cols="30"
              rows="1"
              value={question}
              onChange={handleQuestionChange}
              placeholder="Pregunta"
            ></textarea>
          </div>
        </div>
        <div className="card_element_side card_element_right">
          <div className="card_element_letter">
            <p>A</p>
          </div>
          <div className="card_element_textarea">
            <textarea
              ref={answerTextAreaRef}
              readOnly={!isDeckOwner ? true : false}
              placeholder="Respuesta"
              onChange={handleAnswerChange}
              value={answer}
            ></textarea>
          </div>
        </div>
      </div>
      {isDeckOwner && (
        <DeleteItem
          id={cardID}
          update={updateCardList}
          onClick={deleteCardFromDB}
        />
      )}
    </div>
  );
};

export default CardListElement;

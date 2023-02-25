import "./Card.scss";
import React from "react";
import { useState } from "react";
import { getCard } from "../helpers/functions";
import { useEffect } from "react";

const Card = ({ id, cardNumber, totalNumberOfCards }) => {
  const [flip, setFlip] = useState(false);
  const [cardInfo, setCardInfo] = useState();

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handlerAsyncFn = async () => {
    const card = await getCard(id);
    setCardInfo(card);
  };

  useEffect(() => {
    if (!id) return;
    handlerAsyncFn();
  }, [id]);

  if (!cardInfo) return;

  return (
    <div className="card">
      <div onClick={handleFlip} className={`${flip ? "flipped" : ""} `}>
        <div className="front">
          <div className="card_content">
            <div className="top_card">
              <p>{"Tarjeta " + cardNumber + " de " + totalNumberOfCards}</p>
            </div>
            <div className="mid_bottom_card">
              <div className="card_type">
                <p>Q</p>
              </div>
              <div className="card_text">
                <div className="card_text_content">{cardInfo.question}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="back">
          <div className="card_content">
            <div className="top_card">
              <p>{"Tarjeta " + cardNumber + " de " + totalNumberOfCards}</p>
            </div>
            <div className="mid_bottom_card">
              <div className="card_type">
                <p>A</p>
              </div>
              <div className="card_text">
                <div className="card_text_content">{cardInfo.answer}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
